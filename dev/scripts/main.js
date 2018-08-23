const MinHeap = require("fastpriorityqueue");

// Create an object representing our travel app (NAMESPACE)
const travelApp = {};
travelApp.userStat = "";

travelApp.statArray = [
  {
    id: "button-vacation",
    stat: "density",
    direction: "min",
    statName: "Population Density",
    description: "Measured in per km². World Average: [insert average]"
  },
  {
    id: "button-visit-visa",
    stat: "tourist_arrivals",
    direction: "max",
    statName: "Tourist Arrivals",
    description:
      "Based on UN data, this number represents foreign citizens that stayed at least one night in the country. This includes hotel stays, transfers, conference visits, etc. World Average: [insert average]"
  },
  {
    id: "button-education",
    stat: "education_expenditure",
    direction: "max",
    statName: "Education Expenditure",
    description:
      "Education expenditure represents government spending in % of GDP. World Average: [insert average]"
  },
  {
    id: "button-work-holiday",
    stat: "jobless_rate",
    direction: "min",
    statName: "Jobless Rate",
    description:
      "The number of unemployed people in relation to the labor force for a country. World Average: [insert average]"
  },
  {
    id: "button-perm-solo",
    stat: "gini",
    direction: "min",
    statName: "Gini Coefficient",
    description:
      "The Gini coefficient states how uniformly assets are distributed in a country (scale: 0-100; 0 = equal distribution. 100 = unequal distribution). World Average: [insert average]"
  },
  {
    id: "button-perm-couple",
    stat: "happiness_index",
    direction: "max",
    statName: "Happiness Index",
    description:
      "The Happiness Index is based on factors such as GDP per capita, social support, healthy life expectancy, social freedom, generosity and absence of corruption. The higher the value, the happier the country. World Average: [insert average]"
  },
  {
    id: "button-perm-family",
    stats: [
      {
        stat: "hdi",
        direction: "max",
        statName: "Human Development Index",
        description:
          "The HDI is a statistic of life expectancy, education, and per capita income indicators. Scale: 0-1; 0 = low development. 1 = high development. World Average: [insert average]"
      },
      {
        stat: "happiness_index",
        direction: "max",
        statName: "Happiness Index",
        description:
          "The Happiness Index is based on factors such as GDP per capita, social support, healthy life expectancy, social freedom, generosity and absence of corruption. The higher the value, the happier the country. World Average: [insert average]"
      },
      {
        stat: "gini",
        direction: "min",
        statName: "Gini Coefficient",
        description:
          "The Gini coefficient states how uniformly assets are distributed in a country (scale: 0-100; 0 = equal distribution. 100 = unequal distribution). World Average: [insert average]"
      },
      {
        stat: "jobless_rate",
        direction: "min",
        statName: "Jobless Rate",
        description:
          "The number of unemployed people in relation to the labor force for a country. World Average: [insert average]"
      }
    ]
  }
];
// This function holds all our events funtions
travelApp.eventsFunction = () => {
  // This calls the event function to get user input (purpose of travel)
  travelApp.getUserPurpose();
};

/* 1. GET USER INPUT */
// This event function gets the user input by the id attribute and loops it into the traveApp.userStat array. When the id from the user matches the id in oneof the objects, we can target other properties from that object. I.e. stat, direction, description.
travelApp.getUserPurpose = () => {
  $(".travel-form__button").on("click", function() {
    // Store user input in variable
    const inputID = $(this).attr("id");
    // Loop through array and match object to user input
    travelApp.statArray.forEach(item => {
      if (item.id === inputID) {
        // Store user stat in a variable
        travelApp.userStat = item.stat;
        // Call the travelApp.getStat function and pass in the stat and direction values.
        travelApp.getStat(item.stat, item.direction);
      }
    });
  });
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
travelApp.displayDestinations = results => {
  // Get rid of previous clicked results
  $(".results").empty();

  // Go through each country result and build the string literal to append to the page
  results.forEach(country => {
    let countryContainer = $("<div>").addClass("country-result");
    let countryName = $("<h2>")
      .addClass("country-name")
      .text(`${country.countryName}`);
    console.log(country);

    // Get stat number and description from statArrray
    let description = "";
    let statNumberText = "";
    travelApp.statArray.forEach(item => {
      if (travelApp.userStat === item.stat) {
        // This variable has the string of stat type, followed by the stat number. Later this can be appended right before the description so that it looks something like:
        // <p>Population Density: 3.01</p>
        // <p>The population density is measured in KM2 blah blah blah</p>
        statNumberText = `${item.statName}: ${country.stat}`;
        console.log(statNumberText);
        description = item.description;
      }
    });
    // This variable holds the paragraph element for the stat name and number.
    let statNumberElement = $("<p>")
      .addClass("stat-number")
      .text(statNumberText);
    // This variable holds the paragraph element for the stat description
    let statDescription = $("<p>")
      .addClass("stat-description")
      .text(`${description}`);

    // append all HTML tags together to the container div
    countryContainer.append(countryName, statNumberElement, statDescription);

    // append container div to screen under results sections
    $(".results").append(countryContainer);
  });
};

/* 5. Reset if needed */
travelApp.reset = () => {
  // reset travelApp
};

/* ====================
EXTRA STUFF
=============*/

// Store important info for calls to the INQStats API.
travelApp.statKey = "5d3687c7c1788d5f";
travelApp.statURL = "http://inqstatsapi.inqubu.com";

// The getStat function is used to get a single statistic from the API for all countries. It returns the return value from $.ajax().
travelApp.getStat = (statType1, statType2, statType3) => {
  $.ajax({
    url: travelApp.statURL,
    method: "GET",
    dataType: "json",
    data: {
      api_key: travelApp.statKey,
      data: `hdi,${statType1},${statType2},${statType3}`,
      cmd: "getWorldData"
    }
  }).then(res => {
    console.log(res);

    // calling the calculation function to get the top n / bottom n countries

    let finalResults = travelApp.getRecommendations(
      res,
      statType1,
      statType2,
      statType3
    );
    // travelApp.displayDestinations(finalResults);
  });
};

// Store important info for calls to the Wiki API.
travelApp.wikiURL = "https://en.wikipedia.org/w/api.php";
// Get info from Wikipedia (AJAX)
travelApp.getWiki = country => {
  // get extract
  $.ajax({
    url: travelApp.wikiURL,
    method: "GET",
    dataType: "jsonp",
    data: {
      action: "query",
      prop: "extracts",
      titles: country,
      format: "json",
      exlimit: 1,
      exsentences: 4,
      exintro: true,
      explaintext: true
    }
  }).then(res => {
    console.log(res);
  });
};
// Wiki Ajax request TEST
travelApp.getWiki("italy");

// Store important info for calls to the Pixabay API.
travelApp.pixaKey = "9879571-e4cbbef3e692aa15a24a7119b";
travelApp.pixaURL = "https://www.pixabay.com/api/";
// Get info from Wikipedia (AJAX)
travelApp.getPixa = country => {
  // get extract
  $.ajax({
    url: travelApp.pixaURL,
    method: "GET",
    dataType: "jsonp",
    data: {
      key: travelApp.pixaKey,
      q: country
    }
  }).then(res => {
    console.log(res);
  });
};
// Pixabay Ajax request TEST
travelApp.getPixa("italy");

// Init function to hold all our functions in order
travelApp.init = function() {
  // This function calls all our apps events: 1. Inputs for travel types
  travelApp.eventsFunction();
  travelApp.slideDrag();
  // travelApp.getUserInput();
  // travelApp.displayStats();
};

// Document Ready to call our init() function and start the app
$(function() {
  travelApp.init();
});

// Determine whether we want the top n or bottom n rankings
travelApp.getRecommendations = (res, statType1, statType2, statType3) => {
  // Find direction of each stat type and return it in an array
  let arrDirections = travelApp.findDirections(statType1, statType2, statType3);

  // Initialize arrays and numbers for each round of iteration/filtering
  let initialArr = [];
  let arr1 = [];
  let arr2 = [];
  let arr3 = [];
  let initialIter = 60;
  let iteration1 = 10;
  let iteration2 = 5;
  let iteration3 = 3;

  //Initial filter to account for realistic results (based on HDI)
  initialArr = travelApp.determineResults(res, "hdi", "max", initialIter);
  console.log(initialArr);

  // ITERATION 1
  arr1 = travelApp.determineResults(
    initialArr,
    statType1,
    arrDirections[0],
    iteration1
  );
  console.log(arr1);

  // ITERATION 2
  arr2 = travelApp.determineResults(
    arr1,
    statType2,
    arrDirections[1],
    iteration2
  );
  console.log(arr2);

  // ITERATION 3
  arr3 = travelApp.determineResults(
    arr2,
    statType3,
    arrDirections[2],
    iteration3
  );
  console.log(arr3);

  // return the array with the final results
  return arr3;
};

travelApp.determineResults = (array, statType, direction, iterationNumber) => {
  let resultArray = [];
  // if we want TOP numbers
  if (direction === "max") {
    resultArray = travelApp.determineTopN(array, statType, iterationNumber);
  }
  // if we want BOT numbers
  else if (direction === "min") {
    resultArray = travelApp.determineBotN(array, statType, iterationNumber);
  }
  return resultArray;
};

/* CALCULATE TOP N RANKINGS */
travelApp.determineTopN = (result, statType, n) => {
  // initialize a heap array to keep track of the n largest stat scores
  let heap = new MinHeap();

  // initialize a secondary array to keep track of the n lowest scores AND
  // the associated country to each score
  let topN = [];

  // store the stat type into a property variable for easier use
  let property = statType;

  // start a country counter at 0 just for the sake of adding the first n countries into the heap
  let countryCounter = 0;

  // go through each country from the results of the AJAX call to INQStats
  result.map(country => {
    // store the stat score and the name of the current country in variables
    let stat = Number(country[property]);

    // if it's the first n countries from the result, no work required. Just add them directly into both the heap and top3 variables
    if (countryCounter < n) {
      heap.add(stat);
      topN.push(country);

      // increment countryCounter to know when we're past the first n countries
      countryCounter++;
    } else {
      // CONDITION TO CHECK IF the current country stat is greater than any of the current stats in the current top n countries
      if (stat > heap.peek()) {
        // if so, find the location of the smallest stat score in the current top n array and replace it with the new stat and its associated country
        for (let m = 0; m < topN.length; m++) {
          let currentStat = Number(topN[m][property]);
          if (currentStat === heap.peek()) {
            topN.splice(m, 1, country);
            break;
          }
        }

        // remove the smallest stat score from the heap as well
        heap.poll();

        // add the new smallest score onto the heap
        heap.add(stat);
      }
    }
  });
  // return top n scores with countries
  return topN;
};

/* CALCULATE BOTTOM N RANKINGS */
travelApp.determineBotN = (result, statType, n) => {
  // initialize a heap array to keep track of the n lowest stat scores
  let heap = new MinHeap();

  // initialize a secondary array to keep track of the n lowest scores AND
  // the associated country to each score
  let botN = [];

  // store the stat type into a property variable for easier use
  let property = statType;

  // start a country counter at 0 just for the sake of adding the first n countries into the heap
  let countryCounter = 0;

  // go through each country from the results of the AJAX call to INQStats
  result.map(country => {
    // calculate a NEGATIVE score of the stat type in order to implement a MAX HEAP for the bottom n calculation
    let stat = Number(country[property]) * -1;

    // if it's the first n countries from the result, no work required. Just add them directly into both the heap and bot3 variables
    if (countryCounter < n) {
      heap.add(stat);
      botN.push(country);

      // increment countryCounter to know when we're past the first n countries
      countryCounter++;
    } else {
      // CONDITION TO CHECK IF the current country stat is smaller than any of the current stats in the current bottom n countries
      if (stat > heap.peek()) {
        // if so, find the location of the largest stat score in the current bottom n array and replace it with the new stat and its associated country
        for (let m = 0; m < botN.length; m++) {
          let currentStat = Number(botN[m][property]) * -1;
          if (currentStat === heap.peek()) {
            botN.splice(m, 1, country);
            break;
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
  botN.forEach(country => {
    country.stat *= -1;
  });

  // return bottom n scores with countries
  return botN;
};

travelApp.slideDrag = () => {
  $("ul").sortable({
    connectWith: ".sortable",
    revert: true
    // containment: "#drag-container"
  });
  $("ul, li").disableSelection();
};

travelApp.userPurpose = "button-perm-family";

/* DISPLAY ALL STATS FOR THE SELECTED PURPOSE ON SCREEN */
travelApp.displayStats = purposeID => {
  // Go through each purpose object in the Stat Array
  travelApp.statArray.forEach(purposeObj => {
    // If the purpose ID matches the purpose Object id
    if (purposeID === purposeObj.id) {
      $(".test").append($("<ul>").addClass("choices", "sortable"));
      // Go through every stat for this purpose
      purposeObj.stats.forEach(stat => {
        // Append each of the stat name on screen for the user to rank
        let markUpItem = $("<li>")
          .attr("id", stat.stat)
          .text(stat.statName);
        $(".choices").append(markUpItem);
      });
    }
  });
};

/* OBTAIN THE RANKING OF THE STATS FROM USER */
travelApp.getUserRankings = () => {
  $(".userSubmit").on("click", function() {
    // get the user rankings from his ordering of stats and store in a variable
    let userRankings = $(".choices")[0].children;

    // initialize an empty array to store the top 3 rankings
    let statsForAPICall = [];

    // get first top 3 rankings (stats in 1st, 2nd and 3rd positions)
    // and store them inside an array
    for (let i = 0; i < 3; i++) {
      statsForAPICall.push(userRankings[i].id);
    }

    console.log(statsForAPICall);
    travelApp.getStat(...statsForAPICall);
  });
};

/* FIND MAX/MIN DIRECTIONS OF STAT TYPES */
travelApp.findDirections = (statType1, statType2, statType3) => {
  // Find whether each stattype is max or min
  let stat1Direction = "";
  let stat2Direction = "";
  let stat3Direction = "";

  // Loop through the Stat Array to find direction of stattypes
  travelApp.statArray.forEach(purpose => {
    // if the current purpose matches the user purpose,
    if (purpose.id === travelApp.userPurpose) {
      // go through the stats array of that purpose object
      purpose.stats.forEach(stat => {
        // if the current stat in the stats array is stattype1, get this direction
        if (stat.stat === statType1) {
          stat1Direction = stat.direction;
        }
        // if the current stat in the stats array is stattype2, get this direction
        else if (stat.stat === statType2) {
          stat2Direction = stat.direction;
        }
        // if the current stat in the stats array is stattype2, get this direction
        else if (stat.stat === statType3) {
          stat3Direction = stat.direction;
        }
      });
    }
  });

  return [stat1Direction, stat2Direction, stat3Direction];
};

travelApp.userPurpose = "button-perm-family";
travelApp.displayStats(travelApp.userPurpose);
travelApp.getUserRankings();
