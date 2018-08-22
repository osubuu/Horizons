const MinHeap = require("fastpriorityqueue");

// Create an object representing our travel app (NAMESPACE)
const travelApp = {};

/* 1. GET USER INPUT */
// Purpose of travel
travelApp.getUserPurpose = () => {
  // display stats question
  // listen for the user click
};

/* 2. MAKE THE INQSTATS API REQUEST */
travelApp.getStatsAPIInfo = () => {
  // based on click from user, send the predetermined statistic in the API request
  // send ajax request to inqstats
};

/* 3. Calculate top 3 countries */
travelApp.calculateDestinations = () => {
  //Filter through API response based on the top criteria
};

/* 4. Display destinations */
travelApp.displayDestinations = () => {
  // travelAppend top 3 countries to screen
  // Explain briefly reasoning for the top destinations
};

/* 5. Reset if needed */
travelApp.reset = () => {
  // reset travelApp
};

/* ====================
EXTRA STUFF

/* 1. MAKE MAP */
travelApp.generateMap = () => {
  // use JVQ library
};

// Selection and ranking of stats
travelApp.getUserRanking = () => {
  // listen for user inputs
};

// Get info from Wikipedia (AJAX)
travelApp.getWiki = () => {
  // get extract
};

// Get image
travelApp.getPixabay = () => {
  // get country image(s)
};

// change color of three destination on map
// append information cards to the countries in the map
// append wiki + pixabay results

// (To be done) Listen for user click event to select purpose of travel
// Insert event-listener function here

// (To be done) Store value of user input in a variable
// something something.val() or .text() depending on what our inputs are.

// Store in a variable, the query parameters for each travel type
travelApp.userVacation = "density"; // Returns the population density of a country (per km²).
travelApp.userWorkHoliday = "jobless_rate"; // The number of unemployed people in relation to the labor force for a country.
travelApp.userEducation = "education_expenditure"; // Returns the public expenditure on education (in % of the GDP for a country).
travelApp.userPermFamily = "hdi"; // Human Development Index (HDI). Combines several parameters (e.g. life expectancy or GDP). Scale: 0-1; 0 = low development. 1 = high development.
travelApp.userPermSolo = "gini"; // The Gini coefficient states how uniformly assets are distributed in a country (scale: 0-100; 0 = equal distribution. 100 = unequal distribution)
travelApp.userPermCouple = "happiness_index"; // Returns the values of the world happiness survey of the UNSDSN. The higher the value, the happier the country.
travelApp.userVisitVisa = "tourist_arrivals"; // The number of foreign citizens that stayed at least one night in the country. This includes hotel stays, transfers, conference visits, etc.

// Store important info for the API calls into variables
travelApp.statKey = "5d3687c7c1788d5f";
travelApp.statURL = "http://inqstatsapi.inqubu.com";

// The getStat function is used to get a single statistic from the API for all countries. It returns the return value from $.ajax().
travelApp.getStat = statType => {
  $.ajax({
    url: travelApp.statURL,
    method: "GET",
    dataType: "json",
    data: {
      api_key: travelApp.statKey,
      data: statType,
      cmd: "getWorldData"
    }
  }).then(res => {
    console.log(res);

    // calling the calculation function to get the top3/bottom3 countries
    // must find a way to store whether we want a "min" or "max" value
    console.log(travelApp.getRecommendations(res, statType, "min"));
  });
};
// Eventually this will be called in our display function
travelApp.getStat(travelApp.userPermCouple);

// Init function to hold all our functions in order
travelApp.init = function () {
  // travelApp.getUserInput();
  // travelApp.displayStats();
};

// Document Ready to call our init() function and start the app
$(function () {
  // travelApp.init();
});

// Determine whether we want the top 3 or bottom 3 rankings
travelApp.getRecommendations = (res, statType, direction) => {
  if (direction === "max") {
    return travelApp.determineTop3(res, statType);
  } else if (direction === "min") {
    return travelApp.determineBot3(res, statType);
  }
};

/* CALCULATE TOP 3 RANKINGS */
travelApp.determineTop3 = (result, stat) => {
  // initialize a heap array to keep track of the 3 largest stat scores
  let heap = new MinHeap();

  // initialize a secondary array to keep track of the 3 lowest scores AND
  // the associated country to each score
  let top3 = [];

  // store the stat type into a property variable for easier use
  let property = stat;

  // start a country counter at 0 just for the sake of adding the first 3 countries into the heap
  let countryCounter = 0;

  // go through each country from the results of the AJAX call to INQStats
  result.map(country => {
    // store the stat score and the name of the current country in variables
    let stat = Number(country[property]);
    let countryName = country.countryName;

    // store both stat and country name into an object to be added into the top 3 if needed
    let countryObj = {
      name: countryName,
      stat: stat
    };

    // if it's the first 3 countries from the result, no work required. Just add them directly into both the heap and top3 variables
    if (countryCounter < 3) {
      heap.add(stat);
      top3.push(countryObj);

      // increment countryCounter to know when we're past the first 3 countries
      countryCounter++;
    } else {
      // CONDITION TO CHECK IF the current country stat is greater than any of the current stats in the current top 3 countries
      if (stat > heap.peek()) {
        // if so, find the location of the smallest stat score in the current top 3 array and replace it with the new stat and its associated country
        for (let n = 0; n < top3.length; n++) {
          if (top3[n].stat === heap.peek()) {
            top3.splice(n, 1, countryObj);
          }
        }

        // remove the smallest stat score from the heap as well
        heap.poll();

        // add the new smallest score onto the heap
        heap.add(stat);
      }
    }
  });
  // return top 3 scores with countries
  return top3;
};

/* CALCULATE BOTTOM 3 RANKINGS */
travelApp.determineBot3 = (result, stat) => {
  // initialize a heap array to keep track of the 3 lowest stat scores
  let heap = new MinHeap();

  // initialize a secondary array to keep track of the 3 lowest scores AND
  // the associated country to each score
  let bot3 = [];

  // store the stat type into a property variable for easier use
  let property = stat;

  // start a country counter at 0 just for the sake of adding the first 3 countries into the heap
  let countryCounter = 0;

  // go through each country from the results of the AJAX call to INQStats
  result.map(country => {
    // calculate a NEGATIVE score of the stat type in order to implement a MAX HEAP for the bottom 3 calculation
    let stat = Number(country[property]) * -1;

    // store country name in a country name variable
    let countryName = country.countryName;

    // store both stat and country name into an object to be added into the bottom 3 if needed
    let countryObj = { name: countryName, stat: stat };

    // if it's the first 3 countries from the result, no work required. Just add them directly into both the heap and bot3 variables
    if (countryCounter < 3) {
      heap.add(stat);
      bot3.push(countryObj);

      // increment countryCounter to know when we're past the first 3 countries
      countryCounter++;
    } else {
      // CONDITION TO CHECK IF the current country stat is smaller than any of the current stats in the current bottom 3 countries
      if (stat > heap.peek()) {
        // if so, find the location of the largest stat score in the current bottom 3 array and replace it with the new stat and its associated country
        for (let n = 0; n < bot3.length; n++) {
          if (bot3[n].stat === heap.peek()) {
            bot3.splice(n, 1, countryObj);
          }
        }

        // remove the largest stat score from the heap as well
        heap.poll();

        // add the new smallest score onto the heap
        heap.add(stat);
      }
    }
  });

  // Turn numbers in array back to positive by multiplying by -1
  bot3.forEach(country => {
    country.stat *= -1;
  });

  // return bottom 3 scores with countries
  return bot3;
};
