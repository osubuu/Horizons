const MinHeap = require("fastpriorityqueue");
const MaxHeap = require("heap-min-max").MaxHeap;

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
    console.log(travelApp.getRecommendations(res, statType, "max"));
  });
};
// Eventually this will be called in our display function
travelApp.getStat(travelApp.userPermCouple);

// Init function to hold all our functions in order
travelApp.init = function() {
  // travelApp.getUserInput();
  // travelApp.displayStats();
};

// Document Ready to call our init() function and start the app
$(function() {
  // travelApp.init();
});

// Determine whether we want the top 3 or bottom 3 rankings
travelApp.getRecommendations = (res, statType, direction) => {
  if (direction === "max") {
    travelApp.determineTop3(res, statType);
  } else if (direction === "min") {
    travelApp.determineBot3(res, statType);
  }
};

// Calculate Top 3 Rankings
travelApp.determineTop3 = (result, stat) => {
  let heap = new MinHeap();

  let top3 = [];
  let property = stat;

  let countryCounter = 0;

  result.map(country => {
    let stat = Number(country[property]);
    console.log(stat);
    let countryName = country.countryName;
    let countryObj = { name: countryName, stat: stat };

    if (countryCounter < 3) {
      console.log("first three: " + stat);
      heap.add(stat);
      top3.push(countryObj);
      countryCounter++;
    } else {
      console.log(heap.peek() + " vs " + stat);

      if (stat > heap.peek()) {
        console.log(
          "bigger than " + heap.peek() + ", " + stat + " being added"
        );

        for (let n = 0; n < top3.length; n++) {
          if (top3[n].stat === heap.peek()) {
            top3.splice(n, 1, countryObj);
          }
        }

        heap.poll();
        heap.add(stat);
      }
    }
  });
  return top3;
};

// Calculate Bottom 3 Rankings
travelApp.determineBot3 = (result, stat) => {
  let heap = new MinHeap();

  let bot3 = [];
  let property = stat;

  let countryCounter = 0;

  result.map(country => {
    let stat = Number(country[property]) * -1;
    console.log(stat);
    let countryName = country.countryName;
    let countryObj = { name: countryName, stat: stat };

    if (countryCounter < 3) {
      console.log("first three: " + stat);
      heap.add(stat);
      bot3.push(countryObj);
      countryCounter++;
    } else {
      console.log(heap.peek() + " vs " + stat);

      if (stat > heap.peek()) {
        console.log(
          "bigger than " + heap.peek() + ", " + stat + " being added"
        );

        for (let n = 0; n < bot3.length; n++) {
          if (bot3[n].stat === heap.peek()) {
            bot3.splice(n, 1, countryObj);
          }
        }

        heap.poll();
        heap.add(stat);
      }
    }
  });
  return bot3;
};
