(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// IMPORT HEAP MODULE FROM NPM
var MinHeap = require("fastpriorityqueue");

// Create an object representing our travel app (NAMESPACE)
var travelApp = {};

// ARRAY WITH ALL RELEVANT STATS FOR EACH PURPOSE
travelApp.statArray = [
// VACATION BUTTON
// ===============
{
  id: "button-vacation",
  stats: [{
    stat: "density",
    direction: "min",
    statName: "Population Density (low)",
    description: "The population density is measured in per km²."
  }, {
    stat: "happiness_index",
    direction: "max",
    statName: "Happiness Index",
    description: "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
  }, {
    stat: "tourist_arrivals",
    direction: "max",
    statName: "Tourist Arrivals",
    description: "Represents foreign citizens that stayed at least one night. Includes hotel stays, transfers, conference visits, etc."
  }, {
    stat: "tourism_expenditure",
    direction: "max",
    statName: "Tourist Expenditure",
    description: "The amount of government spending dedicated for tourism (in % of the GDP for a country)."
  }, {
    stat: "urban_population",
    direction: "max",
    statName: "Urban Population (high)",
    description: "The percentage of people who live in a city."
  }, {
    stat: "forest_area_percent",
    direction: "max",
    statName: "Forest Area",
    description: "The total amount of forest area in a country (in km²)"
  }]
},
// EDUCATION BUTTON
// ================
{
  id: "button-education",
  stats: [{
    stat: "education_expenditure",
    direction: "max",
    statName: "Education Expenditure",
    description: "Education expenditure represents government spending in % of GDP."
  }, {
    stat: "co2_emissions",
    direction: "min",
    statName: "CO2 Emissions",
    description: "CO2 emissions in metric tons per person per year."
  }, {
    stat: "corruption_index",
    direction: "min",
    statName: "Corruption Index",
    description: "Corruption Perceptions Index (CPI). (Scale: 0-100; 0 = high corruption. 100 = low corruption)."
  }, {
    stat: "happiness_index",
    direction: "max",
    statName: "Happiness Index",
    description: "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
  }, {
    stat: "hdi",
    direction: "max",
    statName: "Human Development Index",
    description: "Indicator of life expectancy, education, and per capita income. (Scale: 0-1; 0 = low score. 1 = high score)."
  }, {
    stat: "health_expenditure",
    direction: "max",
    statName: "Health Expenditure",
    description: "Public spending on health, measured in % of GDP."
  }]
},
// VISITOR VISA BUTTON
// ===================
{
  id: "button-visit-visa",
  stats: [{
    stat: "happiness_index",
    direction: "max",
    statName: "Happiness Index",
    description: "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
  }, {
    stat: "health_expenditure",
    direction: "max",
    statName: "Health Expenditure",
    description: "Public spending on health, measured in % of GDP."
  }, {
    stat: "tourist_arrivals",
    direction: "max",
    statName: "Tourist Arrivals",
    description: "Represents foreign citizens that stayed at least one night. Includes hotel stays, transfers, conference visits, etc."
  }, {
    stat: "density",
    direction: "min",
    statName: "Population Density (low)",
    description: "The population density is measured in per km²."
  }, {
    stat: "co2_emissions",
    direction: "min",
    statName: "CO2 Emissions",
    description: "CO2 emissions in metric tons per person per year."
  }, {
    stat: "inflation",
    direction: "min",
    statName: "Inflation",
    description: "The annual change of consumer prices (unit: %)."
  }]
},
// WORKING HOLIDAY BUTTON
// ======================
{
  id: "button-work-holiday",
  stats: [{
    stat: "density",
    direction: "min",
    statName: "Population Density (low)",
    description: "The population density is measured in per km²."
  }, {
    stat: "tourist_arrivals",
    direction: "max",
    statName: "Tourist Arrivals",
    description: "Represents foreign citizens that stayed at least one night. Includes hotel stays, transfers, conference visits, etc."
  }, {
    id: "button-perm-solo",
    stat: "gini",
    direction: "min",
    statName: "Gini Coefficient",
    description: "States how uniformly assets are distributed. (scale: 0-100; 0 = equal distribution. 100 = unequal distribution)."
  }, {
    stat: "happiness_index",
    direction: "max",
    statName: "Happiness Index",
    description: "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
  }, {
    stat: "jobless_rate",
    direction: "min",
    statName: "Jobless Rate",
    description: "The number of unemployed people in relation to the labor force for a country."
  }, {
    stat: "medianwage",
    direction: "max",
    statName: "Median Wage",
    description: "A measure of the monthly median wage before taxes, including public benefits (e.g child allowance); unit: USD."
  }]
},
// PERMANENT-SOLO BUTTON
// ======================
{
  id: "button-perm-solo",
  stats: [{
    stat: "hdi",
    direction: "max",
    statName: "Human Development Index",
    description: "Indicator of life expectancy, education, and per capita income. (Scale: 0-1; 0 = low score. 1 = high score)."
  }, {
    stat: "corruption_index",
    direction: "min",
    statName: "Corruption Index",
    description: "Corruption Perceptions Index (CPI). (Scale: 0-100; 0 = high corruption. 100 = low corruption)."
  }, {
    stat: "medianwage",
    direction: "max",
    statName: "Median Wage",
    description: "A measure of the monthly median wage before taxes, including public benefits (e.g child allowance); unit: USD."
  }, {
    stat: "inflation",
    direction: "min",
    statName: "Inflation",
    description: "The annual change of consumer prices (unit: %)."
  }, {
    stat: "health_expenditure",
    direction: "max",
    statName: "Health Expenditure",
    description: "Public spending on health, measured in % of GDP."
  }, {
    stat: "urban_population",
    direction: "max",
    statName: "Urban Population (high)",
    description: "The percentage of people who live in a city."
  }]
},
// PERMANENT-COUPLE BUTTON
// ======================
{
  id: "button-perm-couple",
  stats: [{
    stat: "hdi",
    direction: "max",
    statName: "Human Development Index",
    description: "Indicator of life expectancy, education, and per capita income. (Scale: 0-1; 0 = low score. 1 = high score)."
  }, {
    stat: "jobless_rate",
    direction: "min",
    statName: "Jobless Rate",
    description: "The number of unemployed people in relation to the labor force for a country."
  }, {
    id: "button-perm-solo",
    stat: "gini",
    direction: "min",
    statName: "Gini Coefficient",
    description: "States how uniformly assets are distributed. (scale: 0-100; 0 = equal distribution. 100 = unequal distribution)."
  }, {
    stat: "happiness_index",
    direction: "max",
    statName: "Happiness Index",
    description: "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
  }, {
    stat: "death_rate",
    direction: "min",
    statName: "Rate of Deaths",
    description: "The average number of deaths per year per 1,000 people."
  }, {
    stat: "debts_percent",
    direction: "min",
    statName: "Government Debt",
    description: "The percentage of government borrowings in relation to the GDP."
  }]
},
// PERMANENT-FAMILY BUTTON
// ======================
{
  id: "button-perm-family",
  stats: [{
    stat: "education_expenditure",
    direction: "max",
    statName: "Education Expenditure",
    description: "Education expenditure represents government spending in % of GDP."
  }, {
    stat: "health_expenditure",
    direction: "max",
    statName: "Health Expenditure",
    description: "Public spending on health, measured in % of GDP."
  }, {
    stat: "literacy_rate",
    direction: "max",
    statName: "Literacy Rate",
    description: "The percentage of people that have the ability to read and write by age 15."
  }, {
    stat: "life_expectancy",
    direction: "max",
    statName: "Life Expectancy",
    description: "The average number of years a person will live (at birth)."
  }, {
    stat: "death_rate",
    direction: "min",
    statName: "Rate of Deaths",
    description: "The average number of deaths per year per 1,000 people."
  }, {
    stat: "medianwage",
    direction: "max",
    statName: "Median Wage",
    description: "A measure of the monthly median wage before taxes, including public benefits (e.g child allowance); unit: USD."
  }]
}];

/* 0. GET STARTED */
travelApp.getStarted = function () {
  // Listens for click on GET STARTED BUTTON
  $(".welcome__button").on("click", function () {
    // Smooth scroll to next section
    $("html, body").stop().animate({ scrollTop: $(".purpose-section").offset().top }, 900, "swing");
  });
};

/* 1. GET USER INPUT */
travelApp.getUserPurpose = function () {
  $(".travel-form__button").on("click", function () {
    // Store user input in variable
    var inputID = $(this).attr("id");
    travelApp.userPurpose = inputID;

    // Call the display stats function
    travelApp.displayStats(travelApp.userPurpose);

    // Display the criterias to be chosen
    $(".criterias").css("display", "flex");

    // Smooth Scroll to criteria's section
    $("html, body").stop().animate({
      scrollTop: $(".criterias").offset().top
    }, 900, "swing");
  });
};

/* 2. DISPLAY ALL STATS FOR THE SELECTED PURPOSE ON SCREEN */
travelApp.displayStats = function (purposeID) {
  $(".choices").empty();
  // Header for the choose Criteria section
  $(".criteria-header").text("Please rank the following criteria in order of importance from top to bottom. Use your cursor to drag and drop the items.");
  // Add css position to criteria container
  $(".choices-list-container").css("position", "relative");

  // Go through each purpose object in the Stat Array
  travelApp.statArray.forEach(function (purposeObj) {
    // If the purpose ID matches the purpose Object id
    if (purposeID === purposeObj.id) {
      // Go through every stat for this purpose
      purposeObj.stats.forEach(function (stat) {
        // Append each of the stat name on screen for the user to rank
        var markUpItem = $("<li>").attr("id", stat.stat).addClass("criteria").text(stat.statName);
        $(".choices").append(markUpItem);
      });
    }
  });

  // append submit button
  var markUpButton = "<li><button class=\"user-submit\">Submit Ranking</button></li>";
  $(".choices").append(markUpButton);

  travelApp.getUserRankings();
};

/* 3. OBTAIN THE RANKING OF THE STATS FROM USER */
travelApp.getUserRankings = function () {
  $(".choices").on("click", ".user-submit", function () {
    // remove submit button and put a loader until the results come back
    // .html(`<img class="loader" src="../../assets/spinner-1s-100px.svg">`);
    $(".choices").find("li:last-child").html("<svg class=\"lds-spinner loader\" width=\"100px\"  height=\"100px\"  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" style=\"background: none;\"><g transform=\"rotate(0 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.9166666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(30 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.8333333333333334s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(60 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(90 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(120 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5833333333333334s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(150 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(180 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.4166666666666667s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(210 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(240 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.25s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(270 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.16666666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(300 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.08333333333333333s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(330 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#a5b452\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"0s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g></svg>");

    // get the user rankings from his ordering of stats and store in a variable
    var userRankings = $(".choices")[0].children;

    // initialize an empty array to store the top 3 rankings
    var statsForAPICall = [];

    // get first top 3 rankings (stats in 1st, 2nd and 3rd positions)
    // and store them inside an array
    for (var i = 0; i < 3; i++) {
      statsForAPICall.push(userRankings[i].id);
    }

    // INITIALIZE ALL GLOBAL VARIABLES FOR DISPLAY AT THE END
    travelApp.wikiExtract = [];
    travelApp.statNamesArray = [];
    travelApp.statDescriptionArray = [];
    travelApp.statCodeArray = [];
    travelApp.wikiPromiseArray = [];
    travelApp.pixaPromiseArray = [];
    travelApp.imageArray = [];
    travelApp.imageTextArray = [];

    travelApp.getStat.apply(travelApp, statsForAPICall);
  });
};

/* 4. SEND AJAX REQUEST TO INQSTATS API */

// Store important info for calls to the INQStats API.
travelApp.statKey = "5d3687c7c1788d5f";
travelApp.statURL = "http://inqstatsapi.inqubu.com";
travelApp.getStat = function (statType1, statType2, statType3) {
  $.ajax({
    url: travelApp.statURL,
    method: "GET",
    dataType: "json",
    data: {
      api_key: travelApp.statKey,
      data: "hdi," + statType1 + "," + statType2 + "," + statType3,
      cmd: "getWorldData"
    }
  }).then(function (res) {
    var _$;

    // calling the calculation function to get the top n / bottom n countries

    //finalResults holds the final 3 coutries and all of their stats
    var finalResults = travelApp.getRecommendations(res, statType1, statType2, statType3);

    // Get wiki and pixa extracts for each country
    finalResults.forEach(function (countryObj) {
      // get wiki extracts and put promises into array
      travelApp.wikiPromiseArray.push(travelApp.getWiki(countryObj.countryName));

      // get pixa extracts and put promises into array
      travelApp.pixaPromiseArray.push(travelApp.getPixa(countryObj.countryName));
    });

    // when all wiki and pixa promises are fulfilled, store the results
    // to prepare them for display
    (_$ = $).when.apply(_$, _toConsumableArray(travelApp.wikiPromiseArray).concat(_toConsumableArray(travelApp.pixaPromiseArray))).then(function () {
      // go through the wikiPixa results
      for (var i = 0; i < arguments.length; i++) {
        // first three are wiki, push (store) into array
        if (i < 3) {
          travelApp.storeWiki(arguments.length <= i ? undefined : arguments[i]);
        }
        // last three are pixa, push (store) into array
        else {
            travelApp.storePixa(arguments.length <= i ? undefined : arguments[i]);
          }
      }

      // Once results all stored, display all info on screen (3 countries, wiki and pixa)
      travelApp.displayDestinations(finalResults, [statType1, statType2, statType3]);
    });
  });
};

/* 5. START CALCULATION FOR 3 RECOMMENDED COUNTRIES */
travelApp.getRecommendations = function (res, statType1, statType2, statType3) {
  // Find direction of each stat type and return it in an array
  var arrDirections = travelApp.findDirections(statType1, statType2, statType3);

  // Initialize arrays and numbers for each round of iteration/filtering
  var initialArr = [];
  var arr1 = [];
  var arr2 = [];
  var arr3 = [];
  var initialIter = 60;
  var iteration1 = 10;
  var iteration2 = 5;
  var iteration3 = 3;

  //Initial filter to account for realistic results (based on HDI)
  initialArr = travelApp.determineResults(res, "hdi", "max", initialIter);

  // ITERATION 1
  arr1 = travelApp.determineResults(initialArr, statType1, arrDirections[0], iteration1);

  // ITERATION 2
  arr2 = travelApp.determineResults(arr1, statType2, arrDirections[1], iteration2);

  // ITERATION 3
  arr3 = travelApp.determineResults(arr2, statType3, arrDirections[2], iteration3);

  // return the array with the final results
  return arr3;
};

/* 5.1 FIND MIN/MAX FOR EACH STAT TYPE */
travelApp.findDirections = function (statType1, statType2, statType3) {
  // Find whether each stattype is max or min
  var stat1Direction = "";
  var stat2Direction = "";
  var stat3Direction = "";

  // Loop through the Stat Array to find direction of stattypes
  travelApp.statArray.forEach(function (purpose) {
    // if the current purpose matches the user purpose,
    if (purpose.id === travelApp.userPurpose) {
      // go through the stats array of that purpose object
      purpose.stats.forEach(function (stat) {
        // if the current stat in the stats array is stattype1, get this direction
        if (stat.stat === statType1) {
          stat1Direction = stat.direction;
          travelApp.statCodeArray.push(stat.stat);
          travelApp.statNamesArray.push(stat.statName);
          travelApp.statDescriptionArray.push(stat.description);
        }
        // if the current stat in the stats array is stattype2, get this direction
        else if (stat.stat === statType2) {
            stat2Direction = stat.direction;
            travelApp.statCodeArray.push(stat.stat);
            travelApp.statNamesArray.push(stat.statName);
            travelApp.statDescriptionArray.push(stat.description);
          }
          // if the current stat in the stats array is stattype3, get this direction
          else if (stat.stat === statType3) {
              stat3Direction = stat.direction;
              travelApp.statCodeArray.push(stat.stat);
              travelApp.statNamesArray.push(stat.statName);
              travelApp.statDescriptionArray.push(stat.description);
            }
      });
    }
  });

  return [stat1Direction, stat2Direction, stat3Direction];
};

/* 5.2 FUNCTION TO DETERMINE WHETHER THE TOP OR BOTTOM SCORES SHOULD BE FOUND */
travelApp.determineResults = function (array, statType, direction, iterationNumber) {
  var resultArray = [];
  // if we want TOP numbers
  if (direction === "max") {
    resultArray = travelApp.determineNCountries(array, statType, iterationNumber, 1);
  }
  // if we want BOT numbers
  else if (direction === "min") {
      resultArray = travelApp.determineNCountries(array, statType, iterationNumber, -1);
    }
  return resultArray;
};

/* 5.3 CALCULATE THE N COUNTRIES */
travelApp.determineNCountries = function (result, statType, n, direction) {
  // initialize a heap array to keep track of the n largest/smallest stat scores
  var heap = new MinHeap();

  // initialize a secondary array to keep track of the n scores AND
  // the associated country to each score
  var nCountries = [];

  // store the stat type into a property variable for easier use
  var property = statType;

  // start a country counter at 0 just for the sake of adding the first n countries into the heap
  var countryCounter = 0;

  // go through each country from the results of the AJAX call to INQStats
  result.map(function (country) {
    // store the stat score and the name of the current country in variables.
    // IMPORTANT: multiply by direction to implement max/min heap
    // a direction of 1 = we want maximum scores
    // a direction of -1 = we want minimum scores
    var stat = Number(country[property]) * direction;

    // if it's the first n countries from the result, no work required. Just add them directly into both the heap and nCountries variables
    if (countryCounter < n) {
      heap.add(stat);
      nCountries.push(country);

      // increment countryCounter to know when we're past the first n countries
      countryCounter++;
    } else {
      // CONDITION TO CHECK IF the current country stat is greater/smaller than any of the current stats in the current n countries
      if (stat > heap.peek()) {
        // if so, find the location of the smallest/largest stat score in the current nCountries array and replace it with the new stat and its associated country
        for (var m = 0; m < nCountries.length; m++) {
          // multiply by direction again to compare properly with the heap
          var currentStat = Number(nCountries[m][property]) * direction;
          if (currentStat === heap.peek()) {
            // replace country
            nCountries.splice(m, 1, country);
            break;
          }
        }

        // remove the smallest/largest stat score from the heap as well
        heap.poll();

        // add the new smallest/largest score onto the heap
        heap.add(stat);
      }
    }
  });
  // return n countries
  return nCountries;
};

/* 6. SEND API REQUESTS TO WIKI AND PIXA */

// 6.1 WIKIPEDIA API: GET AND STORE
// ==============================
// Store important info for calls to the Wiki API.
travelApp.wikiURL = "https://en.wikipedia.org/w/api.php";
// Get info from Wikipedia (AJAX)
travelApp.getWiki = function (country) {
  // get extract
  return $.ajax({
    url: travelApp.wikiURL,
    method: "GET",
    dataType: "jsonp",
    data: {
      action: "query",
      prop: "extracts",
      titles: country,
      format: "json",
      exlimit: 1,
      exchars: 280,
      exintro: true,
      explaintext: true,
      redirects: 1
    }
  });
};

// Store Wikipedia country extract
travelApp.storeWiki = function (result) {
  // This variable stores the object that holds a key name unique to every country. The value of this key is an object that holds the extact.
  var wikiExtractObject = result[0].query.pages;
  // If we convert the above object into an array, the extract can be accessed on the first value of the array. This variable holds the wiki extract.
  travelApp.wikiExtract.push(Object.values(wikiExtractObject)[0].extract);
};

// 6.2 PIXABAY API: GET AND STORE
// ============================
// Store important info for calls to the Pixabay API.
travelApp.pixaKey = "9879571-e4cbbef3e692aa15a24a7119b";
travelApp.pixaURL = "https://www.pixabay.com/api/";
// Get info from Wikipedia (AJAX)
travelApp.getPixa = function (country) {
  // Get image URL
  return $.ajax({
    url: travelApp.pixaURL,
    method: "GET",
    dataType: "jsonp",
    data: {
      key: travelApp.pixaKey,
      q: country,
      per_page: 15
    }
  });
};

// Store Pixabay country images on the page
travelApp.storePixa = function (results) {
  // Store the array that holds the image URLs in an array
  var resultsArray = results[0].hits;
  // Loop through the results array and push all images into the imageArray
  resultsArray.forEach(function (item) {
    // Array of images for each country
    travelApp.imageArray.push(item.largeImageURL);
    // Array of image information from each country to be used for Alt text
    travelApp.imageTextArray.push(item.tags);
  });
};

/* 7. DISPLAY DESTIONATIONS ON SCREEN WITH WIKI + PIXA RESULTS */
travelApp.displayDestinations = function (results, statChoices) {
  // Get rid of previous clicked results
  $(".results").empty();
  // Go through each country result and build the string literal to append to the page
  var countryCounter = 0;
  var imageCounter = 0;
  results.forEach(function (country) {
    // This element holds all elements for one country result
    var countryContainerElement = $("<div>").addClass("result-container")
    // assign random pixa image of country to the result background
    .css("background-image", "url(\"" + travelApp.imageArray[travelApp.randomize(imageCounter, imageCounter + 15)] + "\")");
    // This element will hold all text and image(s) referring to the country result
    var countryCardElement = $("<div>").addClass("card");
    // This element holds the name of the country
    var countryNameElement = $("<h2>").addClass("country-name").text("" + country.countryName);
    // This element holds the description of the country, taken from the wiki API
    var countryDescriptionElement = $("<p>").addClass("wiki-text").text(travelApp.wikiExtract[countryCounter]);
    countryCounter++;
    // This element holds the text for each of the three stats we're displaying
    var statListElement = $("<ul>").addClass("stat-list");
    // This element holds the container that will hold the small pixa country image
    var smallPixaContainerElement = $("<div>").addClass("country-image-container");
    // This new image counter gets the image in the array that follows the first image being used as a background image for the card
    // This image element will be appended to the image container
    var smallPixaImage = $("<img>").addClass("country-image").attr({
      src: "" + travelApp.imageArray[travelApp.randomize(imageCounter, imageCounter + 15)],
      alt: "Scenic image of " + country.countryName + ". Image tags include " + travelApp.imageTextArray + "."
    });
    // Add 15 to the image counter ensures that every iteration through the forEach will add images to the associated coutries
    imageCounter += 15;
    //Append the country image to its container
    smallPixaContainerElement.append(smallPixaImage);
    // Append the country name <h2>, wiki text <p>, stat list <ul> and image container <div> to the card <div>.
    countryCardElement.append(countryNameElement, countryDescriptionElement, statListElement, smallPixaContainerElement);
    // Append the card div to the result-container
    countryContainerElement.append(countryCardElement);
    //Append the result-container to the results section element on our page
    $(".results").append(countryContainerElement);

    // Go through the array "statChoices" and set up 3 information:
    // 1. title of stat (taken from travelApp.statNamesArray)
    // 2. value of stat (taken from results object)
    // 3. description of stat (taken from travelApp.statDescriptionArray)
    var statCounter = 0;
    statChoices.forEach(function (stat) {
      var statTitle = travelApp.statNamesArray[statCounter];
      var statValue = country[travelApp.statCodeArray[statCounter]];
      var statDescription = travelApp.statDescriptionArray[statCounter];
      statCounter++;
      // This list item element will hold stat information
      var statListItemElement = $("<li>").addClass("stat-list__item");
      // This div will hold the stat title and question mark icon
      var statTitleIconContainerElement = $("<div>").addClass("stat-list__item__title-icon-container");
      // This element holds the stat title and value
      var statTitleElement = $("<h4>").addClass("stat-list__item__title-icon-container__title-number").text(statTitle + ": " + travelApp.numberWithCommas(statValue));
      // This question mark icon will sit next to the statTitleElement and when clicked/hoverover, will display the stat description
      var statHoverIconElement = "<i class=\"stat-list__item__title-icon-container__icon far fa-question-circle\"></i>";
      // append the stat title and icon to the statTitleIconContainerElement
      statTitleIconContainerElement.append(statTitleElement, statHoverIconElement);
      // This div will hold the stat description and is a sibling of the statTitleIconContainer.
      var statDescriptionContainerElement = $("<div>").addClass("stat-list__item__description-container display-none");
      // This element holds the stat description
      var statDescriptionElement = $("<p>").addClass("stat-list__item__description-container__description").text(statDescription);
      // Append the statDescriptionElement to the statDescriptionContainerElement
      statDescriptionContainerElement.append(statDescriptionElement);
      // Append the two stat div containers to the <li>
      statListItemElement.append(statTitleIconContainerElement, statDescriptionContainerElement);
      // Append the <li>s to the <ul>
      statListElement.append(statListItemElement);
    });
  });

  travelApp.finalDisplay();
};

/*  7.1 Once all images are loaded as background images or regular images, display the final results without "lag"*/
travelApp.finalDisplay = function () {
  $(".results").waitForImages(function () {
    $(".results").css("display", "flex");

    var flickityOrNot = "flex";
    if (window.matchMedia("(max-width: 1100px)").matches) {
      /* the viewport is at most 1100 pixels wide */
      flickityOrNot = "block";
    }

    $(".results").css("display", flickityOrNot);
    $("html, body").stop().animate({ scrollTop: $(".results").offset().top }, 900, "swing");

    // remove loader and display submit ranking button again
    var markUpButton = "<li><button class=\"user-submit btn\">Submit Ranking</button></li>";
    $(".choices").find("li:last-child").html(markUpButton);

    /* FLICKITY */
    $(".results").flickity({
      // options
      cellAlign: "left",
      contain: true,
      autoPlay: 5000,
      pageDots: false,
      watchCSS: true
    });
  });
};

// 7.2 On hover or click over the question mark icon, display the stat description
travelApp.displayStatDescription = function () {
  $(".results").on("click", ".stat-list__item__title-icon-container__icon", function () {
    if ($(this).parents(".stat-list__item").find(".stat-list__item__description-container").hasClass("display-none") === false) {
      $(".results").find(".stat-list__item__description-container").removeClass("display-none").addClass("display-none");
    } else {
      $(".results").find(".stat-list__item__description-container").addClass("display-none");
      $(this).parents(".stat-list__item").find(".stat-list__item__description-container").removeClass("display-none");
    }
  });
};

// This function holds all our events funtions
travelApp.eventsFunction = function () {
  travelApp.getUserPurpose();
  travelApp.getStarted();
  travelApp.transformSVG();
  travelApp.displayStatDescription();
};

// Init function to hold all our functions in order
travelApp.init = function () {
  travelApp.eventsFunction();
  travelApp.slideDrag();
};

// Document Ready to call our init() function and start the app
$(function () {
  travelApp.init();
});

/* 8. EXTRA FUNCTIONS USED THROUGHOUT APP */

// 8.1 Sortable functionality for criterias
travelApp.slideDrag = function () {
  $(".choices").sortable({
    connectWith: ".sortable",
    scroll: false,
    revert: true,
    helper: "clone",
    containment: ".criterias-container"
  }).css("position", "absolute");
  $("ul, li").disableSelection();
};

// 8.2 Randomizer function to select random images to display
travelApp.randomize = function (startingNum, endingNum) {
  return Math.floor(Math.random() * (endingNum - startingNum)) + startingNum;
};

// 8.3 Event listener to transform SVGs into inline SVGS to be able to change their colors with css fill
travelApp.transformSVG = function () {
  jQuery("img.svg").each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find("svg");

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr("xmlns:a");

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
        $svg.attr("viewBox", "0 0 " + $svg.attr("height") + " " + $svg.attr("width"));
      }

      // Replace image with new SVG
      $img.replaceWith($svg);
    }, "xml");
  });
};

/* 8.4 TRANSFORM STRING NUMBERS INTO SEPARATED STRINGS WITH PROPER COMMAS FOR EACH THOUSAND UNIT */
travelApp.numberWithCommas = function (stat) {
  return stat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

},{"fastpriorityqueue":2}],2:[function(require,module,exports){
/**
 * FastPriorityQueue.js : a fast heap-based priority queue  in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized heap-based priority queue for modern browsers and JavaScript engines.
 *
 * Usage :
         Installation (in shell, if you use node):
         $ npm install fastpriorityqueue

         Running test program (in JavaScript):

         // var FastPriorityQueue = require("fastpriorityqueue");// in node
         var x = new FastPriorityQueue();
         x.add(1);
         x.add(0);
         x.add(5);
         x.add(4);
         x.add(3);
         x.peek(); // should return 0, leaves x unchanged
         x.size; // should return 5, leaves x unchanged
         while(!x.isEmpty()) {
           console.log(x.poll());
         } // will print 0 1 3 4 5
         x.trim(); // (optional) optimizes memory usage
 */
'use strict';

var defaultcomparator = function(a, b) {
  return a < b;
};

// the provided comparator function should take a, b and return *true* when a < b
function FastPriorityQueue(comparator) {
  if (!(this instanceof FastPriorityQueue)) return new FastPriorityQueue(comparator);
  this.array = [];
  this.size = 0;
  this.compare = comparator || defaultcomparator;
}

// copy the priority queue into another, and return it. Queue items are shallow-copied.
// Runs in `O(n)` time.
FastPriorityQueue.prototype.clone = function() {
  var fpq = new FastPriorityQueue(this.compare);
  fpq.size = this.size;
  for (var i = 0; i < this.size; i++) {
    fpq.array.push(this.array[i]);
  }
  return fpq;
};

// Add an element into the queue
// runs in O(log n) time
FastPriorityQueue.prototype.add = function(myval) {
  var i = this.size;
  this.array[this.size] = myval;
  this.size += 1;
  var p;
  var ap;
  while (i > 0) {
    p = (i - 1) >> 1;
    ap = this.array[p];
    if (!this.compare(myval, ap)) {
      break;
    }
    this.array[i] = ap;
    i = p;
  }
  this.array[i] = myval;
};

// replace the content of the heap by provided array and "heapify it"
FastPriorityQueue.prototype.heapify = function(arr) {
  this.array = arr;
  this.size = arr.length;
  var i;
  for (i = this.size >> 1; i >= 0; i--) {
    this._percolateDown(i);
  }
};

// for internal use
FastPriorityQueue.prototype._percolateUp = function(i, force) {
  var myval = this.array[i];
  var p;
  var ap;
  while (i > 0) {
    p = (i - 1) >> 1;
    ap = this.array[p];
    // force will skip the compare
    if (!force && !this.compare(myval, ap)) {
      break;
    }
    this.array[i] = ap;
    i = p;
  }
  this.array[i] = myval;
};

// for internal use
FastPriorityQueue.prototype._percolateDown = function(i) {
  var size = this.size;
  var hsize = this.size >>> 1;
  var ai = this.array[i];
  var l;
  var r;
  var bestc;
  while (i < hsize) {
    l = (i << 1) + 1;
    r = l + 1;
    bestc = this.array[l];
    if (r < size) {
      if (this.compare(this.array[r], bestc)) {
        l = r;
        bestc = this.array[r];
      }
    }
    if (!this.compare(bestc, ai)) {
      break;
    }
    this.array[i] = bestc;
    i = l;
  }
  this.array[i] = ai;
};

// internal
// _removeAt(index) will remove the item at the given index from the queue,
// retaining balance. returns the removed item, or undefined if nothing is removed.
FastPriorityQueue.prototype._removeAt = function(index) {
  if (index > this.size - 1 || index < 0) return undefined;

  // impl1:
  //this.array.splice(index, 1);
  //this.heapify(this.array);
  // impl2:
  this._percolateUp(index, true);
  return this.poll();
};

// remove(myval) will remove an item matching the provided value from the
// queue, checked for equality by using the queue's comparator.
// return true if removed, false otherwise.
FastPriorityQueue.prototype.remove = function(myval) {
  for (var i = 0; i < this.size; i++) {
    if (!this.compare(this.array[i], myval) && !this.compare(myval, this.array[i])) {
      // items match, comparator returns false both ways, remove item
      this._removeAt(i);
      return true;
    }
  }
  return false;
};

// internal
// removes and returns items for which the callback returns true.
FastPriorityQueue.prototype._batchRemove = function(callback, limit) {
  // initialize return array with max size of the limit or current queue size
  var retArr = new Array(limit ? limit : this.size);
  var count = 0;

  if (typeof callback === 'function' && this.size) {
    var i = 0;
    while (i < this.size && count < retArr.length) {
      if (callback(this.array[i])) {
        retArr[count] = this._removeAt(i);
        count++;
        // move up a level in the heap if we remove an item
        i = i >> 1;
      } else {
        i++;
      }
    } 
  }
  retArr.length = count;
  return retArr;
}

// removeOne(callback) will execute the callback function for each item of the queue
// and will remove the first item for which the callback will return true.
// return the removed item, or undefined if nothing is removed.
FastPriorityQueue.prototype.removeOne = function(callback) {
  var arr = this._batchRemove(callback, 1);
  return arr.length > 0 ? arr[0] : undefined;
};

// remove(callback[, limit]) will execute the callback function for each item of
// the queue and will remove each item for which the callback returns true, up to
// a max limit of removed items if specified or no limit if unspecified.
// return an array containing the removed items.
FastPriorityQueue.prototype.removeMany = function(callback, limit) {
  return this._batchRemove(callback, limit);
};

// Look at the top of the queue (one of the smallest elements) without removing it
// executes in constant time
//
// Calling peek on an empty priority queue returns
// the "undefined" value.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
//
FastPriorityQueue.prototype.peek = function() {
  if (this.size == 0) return undefined;
  return this.array[0];
};

// remove the element on top of the heap (one of the smallest elements)
// runs in logarithmic time
//
// If the priority queue is empty, the function returns the
// "undefined" value.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
//
// For long-running and large priority queues, or priority queues
// storing large objects, you may  want to call the trim function
// at strategic times to recover allocated memory.
FastPriorityQueue.prototype.poll = function() {
  if (this.size == 0) return undefined;
  var ans = this.array[0];
  if (this.size > 1) {
    this.array[0] = this.array[--this.size];
    this._percolateDown(0);
  } else {
    this.size -= 1;
  }
  return ans;
};

// This function adds the provided value to the heap, while removing
// and returning one of the smallest elements (like poll). The size of the queue
// thus remains unchanged.
FastPriorityQueue.prototype.replaceTop = function(myval) {
  if (this.size == 0) return undefined;
  var ans = this.array[0];
  this.array[0] = myval;
  this._percolateDown(0);
  return ans;
};

// recover unused memory (for long-running priority queues)
FastPriorityQueue.prototype.trim = function() {
  this.array = this.array.slice(0, this.size);
};

// Check whether the heap is empty
FastPriorityQueue.prototype.isEmpty = function() {
  return this.size === 0;
};

// iterate over the items in order, pass a callback that receives (item, index) as args.
// TODO once we transpile, uncomment
// if (Symbol && Symbol.iterator) {
//   FastPriorityQueue.prototype[Symbol.iterator] = function*() {
//     if (this.isEmpty()) return;
//     var fpq = this.clone();
//     while (!fpq.isEmpty()) {
//       yield fpq.poll();
//     }
//   };
// }
FastPriorityQueue.prototype.forEach = function(callback) {
  if (this.isEmpty() || typeof callback != 'function') return;
  var i = 0;
  var fpq = this.clone();
  while (!fpq.isEmpty()) {
    callback(fpq.poll(), i++);
  }
};

// return the k 'smallest' elements of the queue
// runs in O(k log k) time
// this is the equivalent of repeatedly calling poll, but
// it has a better computational complexity, which can be
// important for large data sets.
FastPriorityQueue.prototype.kSmallest = function(k) {
  if (this.size == 0) return [];
  var comparator = this.compare;
  var arr = this.array
  var fpq = new FastPriorityQueue(function(a,b){
   return comparator(arr[a],arr[b]);
  });
  k = Math.min(this.size, k);
  var smallest = new Array(k);
  var j = 0;
  fpq.add(0);
  while (j < k) {
    var small = fpq.poll();
    smallest[j++] = this.array[small];
    var l = (small << 1) + 1;
    var r = l + 1;
    if (l < this.size) fpq.add(l);
    if (r < this.size) fpq.add(r);
  }
  return smallest;
}

// just for illustration purposes
var main = function() {
  // main code
  var x = new FastPriorityQueue(function(a, b) {
    return a < b;
  });
  x.add(1);
  x.add(0);
  x.add(5);
  x.add(4);
  x.add(3);
  while (!x.isEmpty()) {
    console.log(x.poll());
  }
};

if (require.main === module) {
  main();
}

module.exports = FastPriorityQueue;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIiwibm9kZV9tb2R1bGVzL2Zhc3Rwcmlvcml0eXF1ZXVlL0Zhc3RQcmlvcml0eVF1ZXVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0EsSUFBTSxVQUFVLFFBQVEsbUJBQVIsQ0FBaEI7O0FBRUE7QUFDQSxJQUFNLFlBQVksRUFBbEI7O0FBRUE7QUFDQSxVQUFVLFNBQVYsR0FBc0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0UsTUFBSSxpQkFETjtBQUVFLFNBQU8sQ0FDTDtBQUNFLFVBQU0sU0FEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsMEJBSFo7QUFJRSxpQkFBYTtBQUpmLEdBREssRUFPTDtBQUNFLFVBQU0saUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGlCQUhaO0FBSUUsaUJBQ0U7QUFMSixHQVBLLEVBY0w7QUFDRSxVQUFNLGtCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxrQkFIWjtBQUlFLGlCQUNFO0FBTEosR0FkSyxFQXFCTDtBQUNFLFVBQU0scUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLHFCQUhaO0FBSUUsaUJBQ0U7QUFMSixHQXJCSyxFQTRCTDtBQUNFLFVBQU0sa0JBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLHlCQUhaO0FBSUUsaUJBQWE7QUFKZixHQTVCSyxFQWtDTDtBQUNFLFVBQU0scUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGFBSFo7QUFJRSxpQkFBYTtBQUpmLEdBbENLO0FBRlQsQ0FIb0I7QUErQ3BCO0FBQ0E7QUFDQTtBQUNFLE1BQUksa0JBRE47QUFFRSxTQUFPLENBQ0w7QUFDRSxVQUFNLHVCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSx1QkFIWjtBQUlFLGlCQUNFO0FBTEosR0FESyxFQVFMO0FBQ0UsVUFBTSxlQURSO0FBRUUs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIElNUE9SVCBIRUFQIE1PRFVMRSBGUk9NIE5QTVxuY29uc3QgTWluSGVhcCA9IHJlcXVpcmUoXCJmYXN0cHJpb3JpdHlxdWV1ZVwiKTtcblxuLy8gQ3JlYXRlIGFuIG9iamVjdCByZXByZXNlbnRpbmcgb3VyIHRyYXZlbCBhcHAgKE5BTUVTUEFDRSlcbmNvbnN0IHRyYXZlbEFwcCA9IHt9O1xuXG4vLyBBUlJBWSBXSVRIIEFMTCBSRUxFVkFOVCBTVEFUUyBGT1IgRUFDSCBQVVJQT1NFXG50cmF2ZWxBcHAuc3RhdEFycmF5ID0gW1xuICAvLyBWQUNBVElPTiBCVVRUT05cbiAgLy8gPT09PT09PT09PT09PT09XG4gIHtcbiAgICBpZDogXCJidXR0b24tdmFjYXRpb25cIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImRlbnNpdHlcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJQb3B1bGF0aW9uIERlbnNpdHkgKGxvdylcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHBvcHVsYXRpb24gZGVuc2l0eSBpcyBtZWFzdXJlZCBpbiBwZXIga23Csi5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoYXBwaW5lc3NfaW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIYXBwaW5lc3MgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJCYXNlZCBvbiBmYWN0b3JzIHN1Y2ggYXMgR0RQIHBlciBjYXBpdGEsIHNvY2lhbCBzdXBwb3J0LCBsaWZlIGV4cGVjdGFuY3kuIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgaGFwcGllciB0aGUgY291bnRyeS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJ0b3VyaXN0X2Fycml2YWxzXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiVG91cmlzdCBBcnJpdmFsc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIlJlcHJlc2VudHMgZm9yZWlnbiBjaXRpemVucyB0aGF0IHN0YXllZCBhdCBsZWFzdCBvbmUgbmlnaHQuIEluY2x1ZGVzIGhvdGVsIHN0YXlzLCB0cmFuc2ZlcnMsIGNvbmZlcmVuY2UgdmlzaXRzLCBldGMuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidG91cmlzbV9leHBlbmRpdHVyZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlRvdXJpc3QgRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJUaGUgYW1vdW50IG9mIGdvdmVybm1lbnQgc3BlbmRpbmcgZGVkaWNhdGVkIGZvciB0b3VyaXNtIChpbiAlIG9mIHRoZSBHRFAgZm9yIGEgY291bnRyeSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidXJiYW5fcG9wdWxhdGlvblwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlVyYmFuIFBvcHVsYXRpb24gKGhpZ2gpXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwZXJjZW50YWdlIG9mIHBlb3BsZSB3aG8gbGl2ZSBpbiBhIGNpdHkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZm9yZXN0X2FyZWFfcGVyY2VudFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkZvcmVzdCBBcmVhXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSB0b3RhbCBhbW91bnQgb2YgZm9yZXN0IGFyZWEgaW4gYSBjb3VudHJ5IChpbiBrbcKyKVwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICAvLyBFRFVDQVRJT04gQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1lZHVjYXRpb25cIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImVkdWNhdGlvbl9leHBlbmRpdHVyZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkVkdWNhdGlvbiBFeHBlbmRpdHVyZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkVkdWNhdGlvbiBleHBlbmRpdHVyZSByZXByZXNlbnRzIGdvdmVybm1lbnQgc3BlbmRpbmcgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiY28yX2VtaXNzaW9uc1wiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkNPMiBFbWlzc2lvbnNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ08yIGVtaXNzaW9ucyBpbiBtZXRyaWMgdG9ucyBwZXIgcGVyc29uIHBlciB5ZWFyLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImNvcnJ1cHRpb25faW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJDb3JydXB0aW9uIEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQ29ycnVwdGlvbiBQZXJjZXB0aW9ucyBJbmRleCAoQ1BJKS4gKFNjYWxlOiAwLTEwMDsgMCA9IGhpZ2ggY29ycnVwdGlvbi4gMTAwID0gbG93IGNvcnJ1cHRpb24pLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhhcHBpbmVzc19pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkhhcHBpbmVzcyBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkJhc2VkIG9uIGZhY3RvcnMgc3VjaCBhcyBHRFAgcGVyIGNhcGl0YSwgc29jaWFsIHN1cHBvcnQsIGxpZmUgZXhwZWN0YW5jeS4gVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoYXBwaWVyIHRoZSBjb3VudHJ5LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhkaVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkh1bWFuIERldmVsb3BtZW50IEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiSW5kaWNhdG9yIG9mIGxpZmUgZXhwZWN0YW5jeSwgZWR1Y2F0aW9uLCBhbmQgcGVyIGNhcGl0YSBpbmNvbWUuIChTY2FsZTogMC0xOyAwID0gbG93IHNjb3JlLiAxID0gaGlnaCBzY29yZSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGVhbHRoX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGVhbHRoIEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlB1YmxpYyBzcGVuZGluZyBvbiBoZWFsdGgsIG1lYXN1cmVkIGluICUgb2YgR0RQLlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICAvLyBWSVNJVE9SIFZJU0EgQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi12aXNpdC12aXNhXCIsXG4gICAgc3RhdHM6IFtcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoYXBwaW5lc3NfaW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIYXBwaW5lc3MgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJCYXNlZCBvbiBmYWN0b3JzIHN1Y2ggYXMgR0RQIHBlciBjYXBpdGEsIHNvY2lhbCBzdXBwb3J0LCBsaWZlIGV4cGVjdGFuY3kuIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgaGFwcGllciB0aGUgY291bnRyeS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZWFsdGhfZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIZWFsdGggRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIHNwZW5kaW5nIG9uIGhlYWx0aCwgbWVhc3VyZWQgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidG91cmlzdF9hcnJpdmFsc1wiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlRvdXJpc3QgQXJyaXZhbHNcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJSZXByZXNlbnRzIGZvcmVpZ24gY2l0aXplbnMgdGhhdCBzdGF5ZWQgYXQgbGVhc3Qgb25lIG5pZ2h0LiBJbmNsdWRlcyBob3RlbCBzdGF5cywgdHJhbnNmZXJzLCBjb25mZXJlbmNlIHZpc2l0cywgZXRjLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImRlbnNpdHlcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJQb3B1bGF0aW9uIERlbnNpdHkgKGxvdylcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHBvcHVsYXRpb24gZGVuc2l0eSBpcyBtZWFzdXJlZCBpbiBwZXIga23Csi5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJjbzJfZW1pc3Npb25zXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiQ08yIEVtaXNzaW9uc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDTzIgZW1pc3Npb25zIGluIG1ldHJpYyB0b25zIHBlciBwZXJzb24gcGVyIHllYXIuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaW5mbGF0aW9uXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSW5mbGF0aW9uXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhbm51YWwgY2hhbmdlIG9mIGNvbnN1bWVyIHByaWNlcyAodW5pdDogJSkuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIFdPUktJTkcgSE9MSURBWSBCVVRUT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuICB7XG4gICAgaWQ6IFwiYnV0dG9uLXdvcmstaG9saWRheVwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVuc2l0eVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlBvcHVsYXRpb24gRGVuc2l0eSAobG93KVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgcG9wdWxhdGlvbiBkZW5zaXR5IGlzIG1lYXN1cmVkIGluIHBlciBrbcKyLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcInRvdXJpc3RfYXJyaXZhbHNcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJUb3VyaXN0IEFycml2YWxzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiUmVwcmVzZW50cyBmb3JlaWduIGNpdGl6ZW5zIHRoYXQgc3RheWVkIGF0IGxlYXN0IG9uZSBuaWdodC4gSW5jbHVkZXMgaG90ZWwgc3RheXMsIHRyYW5zZmVycywgY29uZmVyZW5jZSB2aXNpdHMsIGV0Yy5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IFwiYnV0dG9uLXBlcm0tc29sb1wiLFxuICAgICAgICBzdGF0OiBcImdpbmlcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJHaW5pIENvZWZmaWNpZW50XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiU3RhdGVzIGhvdyB1bmlmb3JtbHkgYXNzZXRzIGFyZSBkaXN0cmlidXRlZC4gKHNjYWxlOiAwLTEwMDsgMCA9IGVxdWFsIGRpc3RyaWJ1dGlvbi4gMTAwID0gdW5lcXVhbCBkaXN0cmlidXRpb24pLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhhcHBpbmVzc19pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkhhcHBpbmVzcyBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkJhc2VkIG9uIGZhY3RvcnMgc3VjaCBhcyBHRFAgcGVyIGNhcGl0YSwgc29jaWFsIHN1cHBvcnQsIGxpZmUgZXhwZWN0YW5jeS4gVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoYXBwaWVyIHRoZSBjb3VudHJ5LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImpvYmxlc3NfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkpvYmxlc3MgUmF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgdW5lbXBsb3llZCBwZW9wbGUgaW4gcmVsYXRpb24gdG8gdGhlIGxhYm9yIGZvcmNlIGZvciBhIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibWVkaWFud2FnZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIk1lZGlhbiBXYWdlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQSBtZWFzdXJlIG9mIHRoZSBtb250aGx5IG1lZGlhbiB3YWdlIGJlZm9yZSB0YXhlcywgaW5jbHVkaW5nIHB1YmxpYyBiZW5lZml0cyAoZS5nIGNoaWxkIGFsbG93YW5jZSk7IHVuaXQ6IFVTRC5cIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgLy8gUEVSTUFORU5ULVNPTE8gQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1wZXJtLXNvbG9cIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImhkaVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkh1bWFuIERldmVsb3BtZW50IEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiSW5kaWNhdG9yIG9mIGxpZmUgZXhwZWN0YW5jeSwgZWR1Y2F0aW9uLCBhbmQgcGVyIGNhcGl0YSBpbmNvbWUuIChTY2FsZTogMC0xOyAwID0gbG93IHNjb3JlLiAxID0gaGlnaCBzY29yZSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiY29ycnVwdGlvbl9pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkNvcnJ1cHRpb24gSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJDb3JydXB0aW9uIFBlcmNlcHRpb25zIEluZGV4IChDUEkpLiAoU2NhbGU6IDAtMTAwOyAwID0gaGlnaCBjb3JydXB0aW9uLiAxMDAgPSBsb3cgY29ycnVwdGlvbikuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibWVkaWFud2FnZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIk1lZGlhbiBXYWdlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQSBtZWFzdXJlIG9mIHRoZSBtb250aGx5IG1lZGlhbiB3YWdlIGJlZm9yZSB0YXhlcywgaW5jbHVkaW5nIHB1YmxpYyBiZW5lZml0cyAoZS5nIGNoaWxkIGFsbG93YW5jZSk7IHVuaXQ6IFVTRC5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJpbmZsYXRpb25cIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJJbmZsYXRpb25cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIGFubnVhbCBjaGFuZ2Ugb2YgY29uc3VtZXIgcHJpY2VzICh1bml0OiAlKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZWFsdGhfZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIZWFsdGggRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIHNwZW5kaW5nIG9uIGhlYWx0aCwgbWVhc3VyZWQgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidXJiYW5fcG9wdWxhdGlvblwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlVyYmFuIFBvcHVsYXRpb24gKGhpZ2gpXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwZXJjZW50YWdlIG9mIHBlb3BsZSB3aG8gbGl2ZSBpbiBhIGNpdHkuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIFBFUk1BTkVOVC1DT1VQTEUgQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1wZXJtLWNvdXBsZVwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGRpXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSHVtYW4gRGV2ZWxvcG1lbnQgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJJbmRpY2F0b3Igb2YgbGlmZSBleHBlY3RhbmN5LCBlZHVjYXRpb24sIGFuZCBwZXIgY2FwaXRhIGluY29tZS4gKFNjYWxlOiAwLTE7IDAgPSBsb3cgc2NvcmUuIDEgPSBoaWdoIHNjb3JlKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJqb2JsZXNzX3JhdGVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJKb2JsZXNzIFJhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJUaGUgbnVtYmVyIG9mIHVuZW1wbG95ZWQgcGVvcGxlIGluIHJlbGF0aW9uIHRvIHRoZSBsYWJvciBmb3JjZSBmb3IgYSBjb3VudHJ5LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogXCJidXR0b24tcGVybS1zb2xvXCIsXG4gICAgICAgIHN0YXQ6IFwiZ2luaVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkdpbmkgQ29lZmZpY2llbnRcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJTdGF0ZXMgaG93IHVuaWZvcm1seSBhc3NldHMgYXJlIGRpc3RyaWJ1dGVkLiAoc2NhbGU6IDAtMTAwOyAwID0gZXF1YWwgZGlzdHJpYnV0aW9uLiAxMDAgPSB1bmVxdWFsIGRpc3RyaWJ1dGlvbikuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGFwcGluZXNzX2luZGV4XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGFwcGluZXNzIEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQmFzZWQgb24gZmFjdG9ycyBzdWNoIGFzIEdEUCBwZXIgY2FwaXRhLCBzb2NpYWwgc3VwcG9ydCwgbGlmZSBleHBlY3RhbmN5LiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGhhcHBpZXIgdGhlIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVhdGhfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlJhdGUgb2YgRGVhdGhzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhdmVyYWdlIG51bWJlciBvZiBkZWF0aHMgcGVyIHllYXIgcGVyIDEsMDAwIHBlb3BsZS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJkZWJ0c19wZXJjZW50XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiR292ZXJubWVudCBEZWJ0XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiVGhlIHBlcmNlbnRhZ2Ugb2YgZ292ZXJubWVudCBib3Jyb3dpbmdzIGluIHJlbGF0aW9uIHRvIHRoZSBHRFAuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIFBFUk1BTkVOVC1GQU1JTFkgQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1wZXJtLWZhbWlseVwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZWR1Y2F0aW9uX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiRWR1Y2F0aW9uIEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiRWR1Y2F0aW9uIGV4cGVuZGl0dXJlIHJlcHJlc2VudHMgZ292ZXJubWVudCBzcGVuZGluZyBpbiAlIG9mIEdEUC5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZWFsdGhfZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIZWFsdGggRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIHNwZW5kaW5nIG9uIGhlYWx0aCwgbWVhc3VyZWQgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibGl0ZXJhY3lfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkxpdGVyYWN5IFJhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJUaGUgcGVyY2VudGFnZSBvZiBwZW9wbGUgdGhhdCBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlYWQgYW5kIHdyaXRlIGJ5IGFnZSAxNS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJsaWZlX2V4cGVjdGFuY3lcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJMaWZlIEV4cGVjdGFuY3lcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJUaGUgYXZlcmFnZSBudW1iZXIgb2YgeWVhcnMgYSBwZXJzb24gd2lsbCBsaXZlIChhdCBiaXJ0aCkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVhdGhfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlJhdGUgb2YgRGVhdGhzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhdmVyYWdlIG51bWJlciBvZiBkZWF0aHMgcGVyIHllYXIgcGVyIDEsMDAwIHBlb3BsZS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJtZWRpYW53YWdlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiTWVkaWFuIFdhZ2VcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJBIG1lYXN1cmUgb2YgdGhlIG1vbnRobHkgbWVkaWFuIHdhZ2UgYmVmb3JlIHRheGVzLCBpbmNsdWRpbmcgcHVibGljIGJlbmVmaXRzIChlLmcgY2hpbGQgYWxsb3dhbmNlKTsgdW5pdDogVVNELlwiXG4gICAgICB9XG4gICAgXVxuICB9XG5dO1xuXG4vKiAwLiBHRVQgU1RBUlRFRCAqL1xudHJhdmVsQXBwLmdldFN0YXJ0ZWQgPSAoKSA9PiB7XG4gIC8vIExpc3RlbnMgZm9yIGNsaWNrIG9uIEdFVCBTVEFSVEVEIEJVVFRPTlxuICAkKFwiLndlbGNvbWVfX2J1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFNtb290aCBzY3JvbGwgdG8gbmV4dCBzZWN0aW9uXG4gICAgJChcImh0bWwsIGJvZHlcIilcbiAgICAgIC5zdG9wKClcbiAgICAgIC5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkKFwiLnB1cnBvc2Utc2VjdGlvblwiKS5vZmZzZXQoKS50b3AgfSwgOTAwLCBcInN3aW5nXCIpO1xuICB9KTtcbn07XG5cbi8qIDEuIEdFVCBVU0VSIElOUFVUICovXG50cmF2ZWxBcHAuZ2V0VXNlclB1cnBvc2UgPSAoKSA9PiB7XG4gICQoXCIudHJhdmVsLWZvcm1fX2J1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFN0b3JlIHVzZXIgaW5wdXQgaW4gdmFyaWFibGVcbiAgICBjb25zdCBpbnB1dElEID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgdHJhdmVsQXBwLnVzZXJQdXJwb3NlID0gaW5wdXRJRDtcblxuICAgIC8vIENhbGwgdGhlIGRpc3BsYXkgc3RhdHMgZnVuY3Rpb25cbiAgICB0cmF2ZWxBcHAuZGlzcGxheVN0YXRzKHRyYXZlbEFwcC51c2VyUHVycG9zZSk7XG5cbiAgICAvLyBEaXNwbGF5IHRoZSBjcml0ZXJpYXMgdG8gYmUgY2hvc2VuXG4gICAgJChcIi5jcml0ZXJpYXNcIikuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIik7XG5cbiAgICAvLyBTbW9vdGggU2Nyb2xsIHRvIGNyaXRlcmlhJ3Mgc2VjdGlvblxuICAgICQoXCJodG1sLCBib2R5XCIpXG4gICAgICAuc3RvcCgpXG4gICAgICAuYW5pbWF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvcDogJChcIi5jcml0ZXJpYXNcIikub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sXG4gICAgICAgIDkwMCxcbiAgICAgICAgXCJzd2luZ1wiXG4gICAgICApO1xuICB9KTtcbn07XG5cbi8qIDIuIERJU1BMQVkgQUxMIFNUQVRTIEZPUiBUSEUgU0VMRUNURUQgUFVSUE9TRSBPTiBTQ1JFRU4gKi9cbnRyYXZlbEFwcC5kaXNwbGF5U3RhdHMgPSBwdXJwb3NlSUQgPT4ge1xuICAkKFwiLmNob2ljZXNcIikuZW1wdHkoKTtcbiAgLy8gSGVhZGVyIGZvciB0aGUgY2hvb3NlIENyaXRlcmlhIHNlY3Rpb25cbiAgJChcIi5jcml0ZXJpYS1oZWFkZXJcIikudGV4dChcbiAgICBcIlBsZWFzZSByYW5rIHRoZSBmb2xsb3dpbmcgY3JpdGVyaWEgaW4gb3JkZXIgb2YgaW1wb3J0YW5jZSBmcm9tIHRvcCB0byBib3R0b20uIFVzZSB5b3VyIGN1cnNvciB0byBkcmFnIGFuZCBkcm9wIHRoZSBpdGVtcy5cIlxuICApO1xuICAvLyBBZGQgY3NzIHBvc2l0aW9uIHRvIGNyaXRlcmlhIGNvbnRhaW5lclxuICAkKFwiLmNob2ljZXMtbGlzdC1jb250YWluZXJcIikuY3NzKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKTtcblxuICAvLyBHbyB0aHJvdWdoIGVhY2ggcHVycG9zZSBvYmplY3QgaW4gdGhlIFN0YXQgQXJyYXlcbiAgdHJhdmVsQXBwLnN0YXRBcnJheS5mb3JFYWNoKHB1cnBvc2VPYmogPT4ge1xuICAgIC8vIElmIHRoZSBwdXJwb3NlIElEIG1hdGNoZXMgdGhlIHB1cnBvc2UgT2JqZWN0IGlkXG4gICAgaWYgKHB1cnBvc2VJRCA9PT0gcHVycG9zZU9iai5pZCkge1xuICAgICAgLy8gR28gdGhyb3VnaCBldmVyeSBzdGF0IGZvciB0aGlzIHB1cnBvc2VcbiAgICAgIHB1cnBvc2VPYmouc3RhdHMuZm9yRWFjaChzdGF0ID0+IHtcbiAgICAgICAgLy8gQXBwZW5kIGVhY2ggb2YgdGhlIHN0YXQgbmFtZSBvbiBzY3JlZW4gZm9yIHRoZSB1c2VyIHRvIHJhbmtcbiAgICAgICAgbGV0IG1hcmtVcEl0ZW0gPSAkKFwiPGxpPlwiKVxuICAgICAgICAgIC5hdHRyKFwiaWRcIiwgc3RhdC5zdGF0KVxuICAgICAgICAgIC5hZGRDbGFzcyhcImNyaXRlcmlhXCIpXG4gICAgICAgICAgLnRleHQoc3RhdC5zdGF0TmFtZSk7XG4gICAgICAgICQoXCIuY2hvaWNlc1wiKS5hcHBlbmQobWFya1VwSXRlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGFwcGVuZCBzdWJtaXQgYnV0dG9uXG4gIGxldCBtYXJrVXBCdXR0b24gPSBgPGxpPjxidXR0b24gY2xhc3M9XCJ1c2VyLXN1Ym1pdFwiPlN1Ym1pdCBSYW5raW5nPC9idXR0b24+PC9saT5gO1xuICAkKFwiLmNob2ljZXNcIikuYXBwZW5kKG1hcmtVcEJ1dHRvbik7XG5cbiAgdHJhdmVsQXBwLmdldFVzZXJSYW5raW5ncygpO1xufTtcblxuLyogMy4gT0JUQUlOIFRIRSBSQU5LSU5HIE9GIFRIRSBTVEFUUyBGUk9NIFVTRVIgKi9cbnRyYXZlbEFwcC5nZXRVc2VyUmFua2luZ3MgPSAoKSA9PiB7XG4gICQoXCIuY2hvaWNlc1wiKS5vbihcImNsaWNrXCIsIFwiLnVzZXItc3VibWl0XCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIHJlbW92ZSBzdWJtaXQgYnV0dG9uIGFuZCBwdXQgYSBsb2FkZXIgdW50aWwgdGhlIHJlc3VsdHMgY29tZSBiYWNrXG4gICAgLy8gLmh0bWwoYDxpbWcgY2xhc3M9XCJsb2FkZXJcIiBzcmM9XCIuLi8uLi9hc3NldHMvc3Bpbm5lci0xcy0xMDBweC5zdmdcIj5gKTtcbiAgICAkKFwiLmNob2ljZXNcIikuZmluZChcbiAgICAgIFwibGk6bGFzdC1jaGlsZFwiXG4gICAgKS5odG1sKGA8c3ZnIGNsYXNzPVwibGRzLXNwaW5uZXIgbG9hZGVyXCIgd2lkdGg9XCIxMDBweFwiICBoZWlnaHQ9XCIxMDBweFwiICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiBub25lO1wiPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgwIDUwIDUwKVwiPlxuICA8cmVjdCB4PVwiNDdcIiB5PVwiMjRcIiByeD1cIjkuNFwiIHJ5PVwiNC44XCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMTJcIiBmaWxsPVwiI2E1YjQ1MlwiPlxuICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJvcGFjaXR5XCIgdmFsdWVzPVwiMTswXCIga2V5VGltZXM9XCIwOzFcIiBkdXI9XCIxc1wiIGJlZ2luPVwiLTAuOTE2NjY2NjY2NjY2NjY2NnNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoMzAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC44MzMzMzMzMzMzMzMzMzM0c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSg2MCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjc1c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSg5MCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjY2NjY2NjY2NjY2NjY2NjZzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDEyMCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjU4MzMzMzMzMzMzMzMzMzRzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDE1MCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjVzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDE4MCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjQxNjY2NjY2NjY2NjY2NjdzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDIxMCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjMzMzMzMzMzMzMzMzMzMzNzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDI0MCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjI1c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgyNzAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC4xNjY2NjY2NjY2NjY2NjY2NnNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoMzAwIDUwIDUwKVwiPlxuICA8cmVjdCB4PVwiNDdcIiB5PVwiMjRcIiByeD1cIjkuNFwiIHJ5PVwiNC44XCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMTJcIiBmaWxsPVwiI2E1YjQ1MlwiPlxuICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJvcGFjaXR5XCIgdmFsdWVzPVwiMTswXCIga2V5VGltZXM9XCIwOzFcIiBkdXI9XCIxc1wiIGJlZ2luPVwiLTAuMDgzMzMzMzMzMzMzMzMzMzNzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDMzMCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIjBzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PC9zdmc+YCk7XG5cbiAgICAvLyBnZXQgdGhlIHVzZXIgcmFua2luZ3MgZnJvbSBoaXMgb3JkZXJpbmcgb2Ygc3RhdHMgYW5kIHN0b3JlIGluIGEgdmFyaWFibGVcbiAgICBsZXQgdXNlclJhbmtpbmdzID0gJChcIi5jaG9pY2VzXCIpWzBdLmNoaWxkcmVuO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBhbiBlbXB0eSBhcnJheSB0byBzdG9yZSB0aGUgdG9wIDMgcmFua2luZ3NcbiAgICBsZXQgc3RhdHNGb3JBUElDYWxsID0gW107XG5cbiAgICAvLyBnZXQgZmlyc3QgdG9wIDMgcmFua2luZ3MgKHN0YXRzIGluIDFzdCwgMm5kIGFuZCAzcmQgcG9zaXRpb25zKVxuICAgIC8vIGFuZCBzdG9yZSB0aGVtIGluc2lkZSBhbiBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBzdGF0c0ZvckFQSUNhbGwucHVzaCh1c2VyUmFua2luZ3NbaV0uaWQpO1xuICAgIH1cblxuICAgIC8vIElOSVRJQUxJWkUgQUxMIEdMT0JBTCBWQVJJQUJMRVMgRk9SIERJU1BMQVkgQVQgVEhFIEVORFxuICAgIHRyYXZlbEFwcC53aWtpRXh0cmFjdCA9IFtdO1xuICAgIHRyYXZlbEFwcC5zdGF0TmFtZXNBcnJheSA9IFtdO1xuICAgIHRyYXZlbEFwcC5zdGF0RGVzY3JpcHRpb25BcnJheSA9IFtdO1xuICAgIHRyYXZlbEFwcC5zdGF0Q29kZUFycmF5ID0gW107XG4gICAgdHJhdmVsQXBwLndpa2lQcm9taXNlQXJyYXkgPSBbXTtcbiAgICB0cmF2ZWxBcHAucGl4YVByb21pc2VBcnJheSA9IFtdO1xuICAgIHRyYXZlbEFwcC5pbWFnZUFycmF5ID0gW107XG4gICAgdHJhdmVsQXBwLmltYWdlVGV4dEFycmF5ID0gW107XG5cbiAgICB0cmF2ZWxBcHAuZ2V0U3RhdCguLi5zdGF0c0ZvckFQSUNhbGwpO1xuICB9KTtcbn07XG5cbi8qIDQuIFNFTkQgQUpBWCBSRVFVRVNUIFRPIElOUVNUQVRTIEFQSSAqL1xuXG4vLyBTdG9yZSBpbXBvcnRhbnQgaW5mbyBmb3IgY2FsbHMgdG8gdGhlIElOUVN0YXRzIEFQSS5cbnRyYXZlbEFwcC5zdGF0S2V5ID0gXCI1ZDM2ODdjN2MxNzg4ZDVmXCI7XG50cmF2ZWxBcHAuc3RhdFVSTCA9IFwiaHR0cDovL2lucXN0YXRzYXBpLmlucXVidS5jb21cIjtcbnRyYXZlbEFwcC5nZXRTdGF0ID0gKHN0YXRUeXBlMSwgc3RhdFR5cGUyLCBzdGF0VHlwZTMpID0+IHtcbiAgJC5hamF4KHtcbiAgICB1cmw6IHRyYXZlbEFwcC5zdGF0VVJMLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgZGF0YToge1xuICAgICAgYXBpX2tleTogdHJhdmVsQXBwLnN0YXRLZXksXG4gICAgICBkYXRhOiBgaGRpLCR7c3RhdFR5cGUxfSwke3N0YXRUeXBlMn0sJHtzdGF0VHlwZTN9YCxcbiAgICAgIGNtZDogXCJnZXRXb3JsZERhdGFcIlxuICAgIH1cbiAgfSkudGhlbihyZXMgPT4ge1xuICAgIC8vIGNhbGxpbmcgdGhlIGNhbGN1bGF0aW9uIGZ1bmN0aW9uIHRvIGdldCB0aGUgdG9wIG4gLyBib3R0b20gbiBjb3VudHJpZXNcblxuICAgIC8vZmluYWxSZXN1bHRzIGhvbGRzIHRoZSBmaW5hbCAzIGNvdXRyaWVzIGFuZCBhbGwgb2YgdGhlaXIgc3RhdHNcbiAgICBsZXQgZmluYWxSZXN1bHRzID0gdHJhdmVsQXBwLmdldFJlY29tbWVuZGF0aW9ucyhcbiAgICAgIHJlcyxcbiAgICAgIHN0YXRUeXBlMSxcbiAgICAgIHN0YXRUeXBlMixcbiAgICAgIHN0YXRUeXBlM1xuICAgICk7XG5cbiAgICAvLyBHZXQgd2lraSBhbmQgcGl4YSBleHRyYWN0cyBmb3IgZWFjaCBjb3VudHJ5XG4gICAgZmluYWxSZXN1bHRzLmZvckVhY2goY291bnRyeU9iaiA9PiB7XG4gICAgICAvLyBnZXQgd2lraSBleHRyYWN0cyBhbmQgcHV0IHByb21pc2VzIGludG8gYXJyYXlcbiAgICAgIHRyYXZlbEFwcC53aWtpUHJvbWlzZUFycmF5LnB1c2goXG4gICAgICAgIHRyYXZlbEFwcC5nZXRXaWtpKGNvdW50cnlPYmouY291bnRyeU5hbWUpXG4gICAgICApO1xuXG4gICAgICAvLyBnZXQgcGl4YSBleHRyYWN0cyBhbmQgcHV0IHByb21pc2VzIGludG8gYXJyYXlcbiAgICAgIHRyYXZlbEFwcC5waXhhUHJvbWlzZUFycmF5LnB1c2goXG4gICAgICAgIHRyYXZlbEFwcC5nZXRQaXhhKGNvdW50cnlPYmouY291bnRyeU5hbWUpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBhbGwgd2lraSBhbmQgcGl4YSBwcm9taXNlcyBhcmUgZnVsZmlsbGVkLCBzdG9yZSB0aGUgcmVzdWx0c1xuICAgIC8vIHRvIHByZXBhcmUgdGhlbSBmb3IgZGlzcGxheVxuICAgICQud2hlbiguLi50cmF2ZWxBcHAud2lraVByb21pc2VBcnJheSwgLi4udHJhdmVsQXBwLnBpeGFQcm9taXNlQXJyYXkpLnRoZW4oXG4gICAgICAoLi4ud2lraVBpeGFSZXN1bHRzKSA9PiB7XG4gICAgICAgIC8vIGdvIHRocm91Z2ggdGhlIHdpa2lQaXhhIHJlc3VsdHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWtpUGl4YVJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBmaXJzdCB0aHJlZSBhcmUgd2lraSwgcHVzaCAoc3RvcmUpIGludG8gYXJyYXlcbiAgICAgICAgICBpZiAoaSA8IDMpIHtcbiAgICAgICAgICAgIHRyYXZlbEFwcC5zdG9yZVdpa2kod2lraVBpeGFSZXN1bHRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbGFzdCB0aHJlZSBhcmUgcGl4YSwgcHVzaCAoc3RvcmUpIGludG8gYXJyYXlcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYXZlbEFwcC5zdG9yZVBpeGEod2lraVBpeGFSZXN1bHRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPbmNlIHJlc3VsdHMgYWxsIHN0b3JlZCwgZGlzcGxheSBhbGwgaW5mbyBvbiBzY3JlZW4gKDMgY291bnRyaWVzLCB3aWtpIGFuZCBwaXhhKVxuICAgICAgICB0cmF2ZWxBcHAuZGlzcGxheURlc3RpbmF0aW9ucyhmaW5hbFJlc3VsdHMsIFtcbiAgICAgICAgICBzdGF0VHlwZTEsXG4gICAgICAgICAgc3RhdFR5cGUyLFxuICAgICAgICAgIHN0YXRUeXBlM1xuICAgICAgICBdKTtcbiAgICAgIH1cbiAgICApO1xuICB9KTtcbn07XG5cbi8qIDUuIFNUQVJUIENBTENVTEFUSU9OIEZPUiAzIFJFQ09NTUVOREVEIENPVU5UUklFUyAqL1xudHJhdmVsQXBwLmdldFJlY29tbWVuZGF0aW9ucyA9IChyZXMsIHN0YXRUeXBlMSwgc3RhdFR5cGUyLCBzdGF0VHlwZTMpID0+IHtcbiAgLy8gRmluZCBkaXJlY3Rpb24gb2YgZWFjaCBzdGF0IHR5cGUgYW5kIHJldHVybiBpdCBpbiBhbiBhcnJheVxuICBsZXQgYXJyRGlyZWN0aW9ucyA9IHRyYXZlbEFwcC5maW5kRGlyZWN0aW9ucyhzdGF0VHlwZTEsIHN0YXRUeXBlMiwgc3RhdFR5cGUzKTtcblxuICAvLyBJbml0aWFsaXplIGFycmF5cyBhbmQgbnVtYmVycyBmb3IgZWFjaCByb3VuZCBvZiBpdGVyYXRpb24vZmlsdGVyaW5nXG4gIGxldCBpbml0aWFsQXJyID0gW107XG4gIGxldCBhcnIxID0gW107XG4gIGxldCBhcnIyID0gW107XG4gIGxldCBhcnIzID0gW107XG4gIGxldCBpbml0aWFsSXRlciA9IDYwO1xuICBsZXQgaXRlcmF0aW9uMSA9IDEwO1xuICBsZXQgaXRlcmF0aW9uMiA9IDU7XG4gIGxldCBpdGVyYXRpb24zID0gMztcblxuICAvL0luaXRpYWwgZmlsdGVyIHRvIGFjY291bnQgZm9yIHJlYWxpc3RpYyByZXN1bHRzIChiYXNlZCBvbiBIREkpXG4gIGluaXRpYWxBcnIgPSB0cmF2ZWxBcHAuZGV0ZXJtaW5lUmVzdWx0cyhyZXMsIFwiaGRpXCIsIFwibWF4XCIsIGluaXRpYWxJdGVyKTtcblxuICAvLyBJVEVSQVRJT04gMVxuICBhcnIxID0gdHJhdmVsQXBwLmRldGVybWluZVJlc3VsdHMoXG4gICAgaW5pdGlhbEFycixcbiAgICBzdGF0VHlwZTEsXG4gICAgYXJyRGlyZWN0aW9uc1swXSxcbiAgICBpdGVyYXRpb24xXG4gICk7XG5cbiAgLy8gSVRFUkFUSU9OIDJcbiAgYXJyMiA9IHRyYXZlbEFwcC5kZXRlcm1pbmVSZXN1bHRzKFxuICAgIGFycjEsXG4gICAgc3RhdFR5cGUyLFxuICAgIGFyckRpcmVjdGlvbnNbMV0sXG4gICAgaXRlcmF0aW9uMlxuICApO1xuXG4gIC8vIElURVJBVElPTiAzXG4gIGFycjMgPSB0cmF2ZWxBcHAuZGV0ZXJtaW5lUmVzdWx0cyhcbiAgICBhcnIyLFxuICAgIHN0YXRUeXBlMyxcbiAgICBhcnJEaXJlY3Rpb25zWzJdLFxuICAgIGl0ZXJhdGlvbjNcbiAgKTtcblxuICAvLyByZXR1cm4gdGhlIGFycmF5IHdpdGggdGhlIGZpbmFsIHJlc3VsdHNcbiAgcmV0dXJuIGFycjM7XG59O1xuXG4vKiA1LjEgRklORCBNSU4vTUFYIEZPUiBFQUNIIFNUQVQgVFlQRSAqL1xudHJhdmVsQXBwLmZpbmREaXJlY3Rpb25zID0gKHN0YXRUeXBlMSwgc3RhdFR5cGUyLCBzdGF0VHlwZTMpID0+IHtcbiAgLy8gRmluZCB3aGV0aGVyIGVhY2ggc3RhdHR5cGUgaXMgbWF4IG9yIG1pblxuICBsZXQgc3RhdDFEaXJlY3Rpb24gPSBcIlwiO1xuICBsZXQgc3RhdDJEaXJlY3Rpb24gPSBcIlwiO1xuICBsZXQgc3RhdDNEaXJlY3Rpb24gPSBcIlwiO1xuXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgU3RhdCBBcnJheSB0byBmaW5kIGRpcmVjdGlvbiBvZiBzdGF0dHlwZXNcbiAgdHJhdmVsQXBwLnN0YXRBcnJheS5mb3JFYWNoKHB1cnBvc2UgPT4ge1xuICAgIC8vIGlmIHRoZSBjdXJyZW50IHB1cnBvc2UgbWF0Y2hlcyB0aGUgdXNlciBwdXJwb3NlLFxuICAgIGlmIChwdXJwb3NlLmlkID09PSB0cmF2ZWxBcHAudXNlclB1cnBvc2UpIHtcbiAgICAgIC8vIGdvIHRocm91Z2ggdGhlIHN0YXRzIGFycmF5IG9mIHRoYXQgcHVycG9zZSBvYmplY3RcbiAgICAgIHB1cnBvc2Uuc3RhdHMuZm9yRWFjaChzdGF0ID0+IHtcbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgc3RhdCBpbiB0aGUgc3RhdHMgYXJyYXkgaXMgc3RhdHR5cGUxLCBnZXQgdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgaWYgKHN0YXQuc3RhdCA9PT0gc3RhdFR5cGUxKSB7XG4gICAgICAgICAgc3RhdDFEaXJlY3Rpb24gPSBzdGF0LmRpcmVjdGlvbjtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdENvZGVBcnJheS5wdXNoKHN0YXQuc3RhdCk7XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXROYW1lc0FycmF5LnB1c2goc3RhdC5zdGF0TmFtZSk7XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXREZXNjcmlwdGlvbkFycmF5LnB1c2goc3RhdC5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgc3RhdCBpbiB0aGUgc3RhdHMgYXJyYXkgaXMgc3RhdHR5cGUyLCBnZXQgdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgZWxzZSBpZiAoc3RhdC5zdGF0ID09PSBzdGF0VHlwZTIpIHtcbiAgICAgICAgICBzdGF0MkRpcmVjdGlvbiA9IHN0YXQuZGlyZWN0aW9uO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0Q29kZUFycmF5LnB1c2goc3RhdC5zdGF0KTtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdE5hbWVzQXJyYXkucHVzaChzdGF0LnN0YXROYW1lKTtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdERlc2NyaXB0aW9uQXJyYXkucHVzaChzdGF0LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBzdGF0IGluIHRoZSBzdGF0cyBhcnJheSBpcyBzdGF0dHlwZTMsIGdldCB0aGlzIGRpcmVjdGlvblxuICAgICAgICBlbHNlIGlmIChzdGF0LnN0YXQgPT09IHN0YXRUeXBlMykge1xuICAgICAgICAgIHN0YXQzRGlyZWN0aW9uID0gc3RhdC5kaXJlY3Rpb247XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXRDb2RlQXJyYXkucHVzaChzdGF0LnN0YXQpO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0TmFtZXNBcnJheS5wdXNoKHN0YXQuc3RhdE5hbWUpO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0RGVzY3JpcHRpb25BcnJheS5wdXNoKHN0YXQuZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBbc3RhdDFEaXJlY3Rpb24sIHN0YXQyRGlyZWN0aW9uLCBzdGF0M0RpcmVjdGlvbl07XG59O1xuXG4vKiA1LjIgRlVOQ1RJT04gVE8gREVURVJNSU5FIFdIRVRIRVIgVEhFIFRPUCBPUiBCT1RUT00gU0NPUkVTIFNIT1VMRCBCRSBGT1VORCAqL1xudHJhdmVsQXBwLmRldGVybWluZVJlc3VsdHMgPSAoYXJyYXksIHN0YXRUeXBlLCBkaXJlY3Rpb24sIGl0ZXJhdGlvbk51bWJlcikgPT4ge1xuICBsZXQgcmVzdWx0QXJyYXkgPSBbXTtcbiAgLy8gaWYgd2Ugd2FudCBUT1AgbnVtYmVyc1xuICBpZiAoZGlyZWN0aW9uID09PSBcIm1heFwiKSB7XG4gICAgcmVzdWx0QXJyYXkgPSB0cmF2ZWxBcHAuZGV0ZXJtaW5lTkNvdW50cmllcyhcbiAgICAgIGFycmF5LFxuICAgICAgc3RhdFR5cGUsXG4gICAgICBpdGVyYXRpb25OdW1iZXIsXG4gICAgICAxXG4gICAgKTtcbiAgfVxuICAvLyBpZiB3ZSB3YW50IEJPVCBudW1iZXJzXG4gIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJtaW5cIikge1xuICAgIHJlc3VsdEFycmF5ID0gdHJhdmVsQXBwLmRldGVybWluZU5Db3VudHJpZXMoXG4gICAgICBhcnJheSxcbiAgICAgIHN0YXRUeXBlLFxuICAgICAgaXRlcmF0aW9uTnVtYmVyLFxuICAgICAgLTFcbiAgICApO1xuICB9XG4gIHJldHVybiByZXN1bHRBcnJheTtcbn07XG5cbi8qIDUuMyBDQUxDVUxBVEUgVEhFIE4gQ09VTlRSSUVTICovXG50cmF2ZWxBcHAuZGV0ZXJtaW5lTkNvdW50cmllcyA9IChyZXN1bHQsIHN0YXRUeXBlLCBuLCBkaXJlY3Rpb24pID0+IHtcbiAgLy8gaW5pdGlhbGl6ZSBhIGhlYXAgYXJyYXkgdG8ga2VlcCB0cmFjayBvZiB0aGUgbiBsYXJnZXN0L3NtYWxsZXN0IHN0YXQgc2NvcmVzXG4gIGxldCBoZWFwID0gbmV3IE1pbkhlYXAoKTtcblxuICAvLyBpbml0aWFsaXplIGEgc2Vjb25kYXJ5IGFycmF5IHRvIGtlZXAgdHJhY2sgb2YgdGhlIG4gc2NvcmVzIEFORFxuICAvLyB0aGUgYXNzb2NpYXRlZCBjb3VudHJ5IHRvIGVhY2ggc2NvcmVcbiAgbGV0IG5Db3VudHJpZXMgPSBbXTtcblxuICAvLyBzdG9yZSB0aGUgc3RhdCB0eXBlIGludG8gYSBwcm9wZXJ0eSB2YXJpYWJsZSBmb3IgZWFzaWVyIHVzZVxuICBsZXQgcHJvcGVydHkgPSBzdGF0VHlwZTtcblxuICAvLyBzdGFydCBhIGNvdW50cnkgY291bnRlciBhdCAwIGp1c3QgZm9yIHRoZSBzYWtlIG9mIGFkZGluZyB0aGUgZmlyc3QgbiBjb3VudHJpZXMgaW50byB0aGUgaGVhcFxuICBsZXQgY291bnRyeUNvdW50ZXIgPSAwO1xuXG4gIC8vIGdvIHRocm91Z2ggZWFjaCBjb3VudHJ5IGZyb20gdGhlIHJlc3VsdHMgb2YgdGhlIEFKQVggY2FsbCB0byBJTlFTdGF0c1xuICByZXN1bHQubWFwKGNvdW50cnkgPT4ge1xuICAgIC8vIHN0b3JlIHRoZSBzdGF0IHNjb3JlIGFuZCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBjb3VudHJ5IGluIHZhcmlhYmxlcy5cbiAgICAvLyBJTVBPUlRBTlQ6IG11bHRpcGx5IGJ5IGRpcmVjdGlvbiB0byBpbXBsZW1lbnQgbWF4L21pbiBoZWFwXG4gICAgLy8gYSBkaXJlY3Rpb24gb2YgMSA9IHdlIHdhbnQgbWF4aW11bSBzY29yZXNcbiAgICAvLyBhIGRpcmVjdGlvbiBvZiAtMSA9IHdlIHdhbnQgbWluaW11bSBzY29yZXNcbiAgICBsZXQgc3RhdCA9IE51bWJlcihjb3VudHJ5W3Byb3BlcnR5XSkgKiBkaXJlY3Rpb247XG5cbiAgICAvLyBpZiBpdCdzIHRoZSBmaXJzdCBuIGNvdW50cmllcyBmcm9tIHRoZSByZXN1bHQsIG5vIHdvcmsgcmVxdWlyZWQuIEp1c3QgYWRkIHRoZW0gZGlyZWN0bHkgaW50byBib3RoIHRoZSBoZWFwIGFuZCBuQ291bnRyaWVzIHZhcmlhYmxlc1xuICAgIGlmIChjb3VudHJ5Q291bnRlciA8IG4pIHtcbiAgICAgIGhlYXAuYWRkKHN0YXQpO1xuICAgICAgbkNvdW50cmllcy5wdXNoKGNvdW50cnkpO1xuXG4gICAgICAvLyBpbmNyZW1lbnQgY291bnRyeUNvdW50ZXIgdG8ga25vdyB3aGVuIHdlJ3JlIHBhc3QgdGhlIGZpcnN0IG4gY291bnRyaWVzXG4gICAgICBjb3VudHJ5Q291bnRlcisrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDT05ESVRJT04gVE8gQ0hFQ0sgSUYgdGhlIGN1cnJlbnQgY291bnRyeSBzdGF0IGlzIGdyZWF0ZXIvc21hbGxlciB0aGFuIGFueSBvZiB0aGUgY3VycmVudCBzdGF0cyBpbiB0aGUgY3VycmVudCBuIGNvdW50cmllc1xuICAgICAgaWYgKHN0YXQgPiBoZWFwLnBlZWsoKSkge1xuICAgICAgICAvLyBpZiBzbywgZmluZCB0aGUgbG9jYXRpb24gb2YgdGhlIHNtYWxsZXN0L2xhcmdlc3Qgc3RhdCBzY29yZSBpbiB0aGUgY3VycmVudCBuQ291bnRyaWVzIGFycmF5IGFuZCByZXBsYWNlIGl0IHdpdGggdGhlIG5ldyBzdGF0IGFuZCBpdHMgYXNzb2NpYXRlZCBjb3VudHJ5XG4gICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgbkNvdW50cmllcy5sZW5ndGg7IG0rKykge1xuICAgICAgICAgIC8vIG11bHRpcGx5IGJ5IGRpcmVjdGlvbiBhZ2FpbiB0byBjb21wYXJlIHByb3Blcmx5IHdpdGggdGhlIGhlYXBcbiAgICAgICAgICBsZXQgY3VycmVudFN0YXQgPSBOdW1iZXIobkNvdW50cmllc1ttXVtwcm9wZXJ0eV0pICogZGlyZWN0aW9uO1xuICAgICAgICAgIGlmIChjdXJyZW50U3RhdCA9PT0gaGVhcC5wZWVrKCkpIHtcbiAgICAgICAgICAgIC8vIHJlcGxhY2UgY291bnRyeVxuICAgICAgICAgICAgbkNvdW50cmllcy5zcGxpY2UobSwgMSwgY291bnRyeSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlIHNtYWxsZXN0L2xhcmdlc3Qgc3RhdCBzY29yZSBmcm9tIHRoZSBoZWFwIGFzIHdlbGxcbiAgICAgICAgaGVhcC5wb2xsKCk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBuZXcgc21hbGxlc3QvbGFyZ2VzdCBzY29yZSBvbnRvIHRoZSBoZWFwXG4gICAgICAgIGhlYXAuYWRkKHN0YXQpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8vIHJldHVybiBuIGNvdW50cmllc1xuICByZXR1cm4gbkNvdW50cmllcztcbn07XG5cbi8qIDYuIFNFTkQgQVBJIFJFUVVFU1RTIFRPIFdJS0kgQU5EIFBJWEEgKi9cblxuLy8gNi4xIFdJS0lQRURJQSBBUEk6IEdFVCBBTkQgU1RPUkVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU3RvcmUgaW1wb3J0YW50IGluZm8gZm9yIGNhbGxzIHRvIHRoZSBXaWtpIEFQSS5cbnRyYXZlbEFwcC53aWtpVVJMID0gXCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvdy9hcGkucGhwXCI7XG4vLyBHZXQgaW5mbyBmcm9tIFdpa2lwZWRpYSAoQUpBWClcbnRyYXZlbEFwcC5nZXRXaWtpID0gY291bnRyeSA9PiB7XG4gIC8vIGdldCBleHRyYWN0XG4gIHJldHVybiAkLmFqYXgoe1xuICAgIHVybDogdHJhdmVsQXBwLndpa2lVUkwsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGRhdGFUeXBlOiBcImpzb25wXCIsXG4gICAgZGF0YToge1xuICAgICAgYWN0aW9uOiBcInF1ZXJ5XCIsXG4gICAgICBwcm9wOiBcImV4dHJhY3RzXCIsXG4gICAgICB0aXRsZXM6IGNvdW50cnksXG4gICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgZXhsaW1pdDogMSxcbiAgICAgIGV4Y2hhcnM6IDI4MCxcbiAgICAgIGV4aW50cm86IHRydWUsXG4gICAgICBleHBsYWludGV4dDogdHJ1ZSxcbiAgICAgIHJlZGlyZWN0czogMVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBTdG9yZSBXaWtpcGVkaWEgY291bnRyeSBleHRyYWN0XG50cmF2ZWxBcHAuc3RvcmVXaWtpID0gcmVzdWx0ID0+IHtcbiAgLy8gVGhpcyB2YXJpYWJsZSBzdG9yZXMgdGhlIG9iamVjdCB0aGF0IGhvbGRzIGEga2V5IG5hbWUgdW5pcXVlIHRvIGV2ZXJ5IGNvdW50cnkuIFRoZSB2YWx1ZSBvZiB0aGlzIGtleSBpcyBhbiBvYmplY3QgdGhhdCBob2xkcyB0aGUgZXh0YWN0LlxuICBjb25zdCB3aWtpRXh0cmFjdE9iamVjdCA9IHJlc3VsdFswXS5xdWVyeS5wYWdlcztcbiAgLy8gSWYgd2UgY29udmVydCB0aGUgYWJvdmUgb2JqZWN0IGludG8gYW4gYXJyYXksIHRoZSBleHRyYWN0IGNhbiBiZSBhY2Nlc3NlZCBvbiB0aGUgZmlyc3QgdmFsdWUgb2YgdGhlIGFycmF5LiBUaGlzIHZhcmlhYmxlIGhvbGRzIHRoZSB3aWtpIGV4dHJhY3QuXG4gIHRyYXZlbEFwcC53aWtpRXh0cmFjdC5wdXNoKE9iamVjdC52YWx1ZXMod2lraUV4dHJhY3RPYmplY3QpWzBdLmV4dHJhY3QpO1xufTtcblxuLy8gNi4yIFBJWEFCQVkgQVBJOiBHRVQgQU5EIFNUT1JFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTdG9yZSBpbXBvcnRhbnQgaW5mbyBmb3IgY2FsbHMgdG8gdGhlIFBpeGFiYXkgQVBJLlxudHJhdmVsQXBwLnBpeGFLZXkgPSBcIjk4Nzk1NzEtZTRjYmJlZjNlNjkyYWExNWEyNGE3MTE5YlwiO1xudHJhdmVsQXBwLnBpeGFVUkwgPSBcImh0dHBzOi8vd3d3LnBpeGFiYXkuY29tL2FwaS9cIjtcbi8vIEdldCBpbmZvIGZyb20gV2lraXBlZGlhIChBSkFYKVxudHJhdmVsQXBwLmdldFBpeGEgPSBjb3VudHJ5ID0+IHtcbiAgLy8gR2V0IGltYWdlIFVSTFxuICByZXR1cm4gJC5hamF4KHtcbiAgICB1cmw6IHRyYXZlbEFwcC5waXhhVVJMLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxuICAgIGRhdGE6IHtcbiAgICAgIGtleTogdHJhdmVsQXBwLnBpeGFLZXksXG4gICAgICBxOiBjb3VudHJ5LFxuICAgICAgcGVyX3BhZ2U6IDE1XG4gICAgfVxuICB9KTtcbn07XG5cbi8vIFN0b3JlIFBpeGFiYXkgY291bnRyeSBpbWFnZXMgb24gdGhlIHBhZ2VcbnRyYXZlbEFwcC5zdG9yZVBpeGEgPSByZXN1bHRzID0+IHtcbiAgLy8gU3RvcmUgdGhlIGFycmF5IHRoYXQgaG9sZHMgdGhlIGltYWdlIFVSTHMgaW4gYW4gYXJyYXlcbiAgY29uc3QgcmVzdWx0c0FycmF5ID0gcmVzdWx0c1swXS5oaXRzO1xuICAvLyBMb29wIHRocm91Z2ggdGhlIHJlc3VsdHMgYXJyYXkgYW5kIHB1c2ggYWxsIGltYWdlcyBpbnRvIHRoZSBpbWFnZUFycmF5XG4gIHJlc3VsdHNBcnJheS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIC8vIEFycmF5IG9mIGltYWdlcyBmb3IgZWFjaCBjb3VudHJ5XG4gICAgdHJhdmVsQXBwLmltYWdlQXJyYXkucHVzaChpdGVtLmxhcmdlSW1hZ2VVUkwpO1xuICAgIC8vIEFycmF5IG9mIGltYWdlIGluZm9ybWF0aW9uIGZyb20gZWFjaCBjb3VudHJ5IHRvIGJlIHVzZWQgZm9yIEFsdCB0ZXh0XG4gICAgdHJhdmVsQXBwLmltYWdlVGV4dEFycmF5LnB1c2goaXRlbS50YWdzKTtcbiAgfSk7XG59O1xuXG4vKiA3LiBESVNQTEFZIERFU1RJT05BVElPTlMgT04gU0NSRUVOIFdJVEggV0lLSSArIFBJWEEgUkVTVUxUUyAqL1xudHJhdmVsQXBwLmRpc3BsYXlEZXN0aW5hdGlvbnMgPSAocmVzdWx0cywgc3RhdENob2ljZXMpID0+IHtcbiAgLy8gR2V0IHJpZCBvZiBwcmV2aW91cyBjbGlja2VkIHJlc3VsdHNcbiAgJChcIi5yZXN1bHRzXCIpLmVtcHR5KCk7XG4gIC8vIEdvIHRocm91Z2ggZWFjaCBjb3VudHJ5IHJlc3VsdCBhbmQgYnVpbGQgdGhlIHN0cmluZyBsaXRlcmFsIHRvIGFwcGVuZCB0byB0aGUgcGFnZVxuICBsZXQgY291bnRyeUNvdW50ZXIgPSAwO1xuICBsZXQgaW1hZ2VDb3VudGVyID0gMDtcbiAgcmVzdWx0cy5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgIC8vIFRoaXMgZWxlbWVudCBob2xkcyBhbGwgZWxlbWVudHMgZm9yIG9uZSBjb3VudHJ5IHJlc3VsdFxuICAgIGxldCBjb3VudHJ5Q29udGFpbmVyRWxlbWVudCA9ICQoXCI8ZGl2PlwiKVxuICAgICAgLmFkZENsYXNzKFwicmVzdWx0LWNvbnRhaW5lclwiKVxuICAgICAgLy8gYXNzaWduIHJhbmRvbSBwaXhhIGltYWdlIG9mIGNvdW50cnkgdG8gdGhlIHJlc3VsdCBiYWNrZ3JvdW5kXG4gICAgICAuY3NzKFxuICAgICAgICBcImJhY2tncm91bmQtaW1hZ2VcIixcbiAgICAgICAgYHVybChcIiR7XG4gICAgICAgICAgdHJhdmVsQXBwLmltYWdlQXJyYXlbXG4gICAgICAgICAgICB0cmF2ZWxBcHAucmFuZG9taXplKGltYWdlQ291bnRlciwgaW1hZ2VDb3VudGVyICsgMTUpXG4gICAgICAgICAgXVxuICAgICAgICB9XCIpYFxuICAgICAgKTtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2lsbCBob2xkIGFsbCB0ZXh0IGFuZCBpbWFnZShzKSByZWZlcnJpbmcgdG8gdGhlIGNvdW50cnkgcmVzdWx0XG4gICAgbGV0IGNvdW50cnlDYXJkRWxlbWVudCA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImNhcmRcIik7XG4gICAgLy8gVGhpcyBlbGVtZW50IGhvbGRzIHRoZSBuYW1lIG9mIHRoZSBjb3VudHJ5XG4gICAgbGV0IGNvdW50cnlOYW1lRWxlbWVudCA9ICQoXCI8aDI+XCIpXG4gICAgICAuYWRkQ2xhc3MoXCJjb3VudHJ5LW5hbWVcIilcbiAgICAgIC50ZXh0KGAke2NvdW50cnkuY291bnRyeU5hbWV9YCk7XG4gICAgLy8gVGhpcyBlbGVtZW50IGhvbGRzIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY291bnRyeSwgdGFrZW4gZnJvbSB0aGUgd2lraSBBUElcbiAgICBsZXQgY291bnRyeURlc2NyaXB0aW9uRWxlbWVudCA9ICQoXCI8cD5cIilcbiAgICAgIC5hZGRDbGFzcyhcIndpa2ktdGV4dFwiKVxuICAgICAgLnRleHQodHJhdmVsQXBwLndpa2lFeHRyYWN0W2NvdW50cnlDb3VudGVyXSk7XG4gICAgY291bnRyeUNvdW50ZXIrKztcbiAgICAvLyBUaGlzIGVsZW1lbnQgaG9sZHMgdGhlIHRleHQgZm9yIGVhY2ggb2YgdGhlIHRocmVlIHN0YXRzIHdlJ3JlIGRpc3BsYXlpbmdcbiAgICBsZXQgc3RhdExpc3RFbGVtZW50ID0gJChcIjx1bD5cIikuYWRkQ2xhc3MoXCJzdGF0LWxpc3RcIik7XG4gICAgLy8gVGhpcyBlbGVtZW50IGhvbGRzIHRoZSBjb250YWluZXIgdGhhdCB3aWxsIGhvbGQgdGhlIHNtYWxsIHBpeGEgY291bnRyeSBpbWFnZVxuICAgIGxldCBzbWFsbFBpeGFDb250YWluZXJFbGVtZW50ID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFxuICAgICAgXCJjb3VudHJ5LWltYWdlLWNvbnRhaW5lclwiXG4gICAgKTtcbiAgICAvLyBUaGlzIG5ldyBpbWFnZSBjb3VudGVyIGdldHMgdGhlIGltYWdlIGluIHRoZSBhcnJheSB0aGF0IGZvbGxvd3MgdGhlIGZpcnN0IGltYWdlIGJlaW5nIHVzZWQgYXMgYSBiYWNrZ3JvdW5kIGltYWdlIGZvciB0aGUgY2FyZFxuICAgIC8vIFRoaXMgaW1hZ2UgZWxlbWVudCB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoZSBpbWFnZSBjb250YWluZXJcbiAgICBsZXQgc21hbGxQaXhhSW1hZ2UgPSAkKFwiPGltZz5cIilcbiAgICAgIC5hZGRDbGFzcyhcImNvdW50cnktaW1hZ2VcIilcbiAgICAgIC5hdHRyKHtcbiAgICAgICAgc3JjOiBgJHtcbiAgICAgICAgICB0cmF2ZWxBcHAuaW1hZ2VBcnJheVtcbiAgICAgICAgICAgIHRyYXZlbEFwcC5yYW5kb21pemUoaW1hZ2VDb3VudGVyLCBpbWFnZUNvdW50ZXIgKyAxNSlcbiAgICAgICAgICBdXG4gICAgICAgIH1gLFxuICAgICAgICBhbHQ6IGBTY2VuaWMgaW1hZ2Ugb2YgJHtjb3VudHJ5LmNvdW50cnlOYW1lfS4gSW1hZ2UgdGFncyBpbmNsdWRlICR7XG4gICAgICAgICAgdHJhdmVsQXBwLmltYWdlVGV4dEFycmF5XG4gICAgICAgIH0uYFxuICAgICAgfSk7XG4gICAgLy8gQWRkIDE1IHRvIHRoZSBpbWFnZSBjb3VudGVyIGVuc3VyZXMgdGhhdCBldmVyeSBpdGVyYXRpb24gdGhyb3VnaCB0aGUgZm9yRWFjaCB3aWxsIGFkZCBpbWFnZXMgdG8gdGhlIGFzc29jaWF0ZWQgY291dHJpZXNcbiAgICBpbWFnZUNvdW50ZXIgKz0gMTU7XG4gICAgLy9BcHBlbmQgdGhlIGNvdW50cnkgaW1hZ2UgdG8gaXRzIGNvbnRhaW5lclxuICAgIHNtYWxsUGl4YUNvbnRhaW5lckVsZW1lbnQuYXBwZW5kKHNtYWxsUGl4YUltYWdlKTtcbiAgICAvLyBBcHBlbmQgdGhlIGNvdW50cnkgbmFtZSA8aDI+LCB3aWtpIHRleHQgPHA+LCBzdGF0IGxpc3QgPHVsPiBhbmQgaW1hZ2UgY29udGFpbmVyIDxkaXY+IHRvIHRoZSBjYXJkIDxkaXY+LlxuICAgIGNvdW50cnlDYXJkRWxlbWVudC5hcHBlbmQoXG4gICAgICBjb3VudHJ5TmFtZUVsZW1lbnQsXG4gICAgICBjb3VudHJ5RGVzY3JpcHRpb25FbGVtZW50LFxuICAgICAgc3RhdExpc3RFbGVtZW50LFxuICAgICAgc21hbGxQaXhhQ29udGFpbmVyRWxlbWVudFxuICAgICk7XG4gICAgLy8gQXBwZW5kIHRoZSBjYXJkIGRpdiB0byB0aGUgcmVzdWx0LWNvbnRhaW5lclxuICAgIGNvdW50cnlDb250YWluZXJFbGVtZW50LmFwcGVuZChjb3VudHJ5Q2FyZEVsZW1lbnQpO1xuICAgIC8vQXBwZW5kIHRoZSByZXN1bHQtY29udGFpbmVyIHRvIHRoZSByZXN1bHRzIHNlY3Rpb24gZWxlbWVudCBvbiBvdXIgcGFnZVxuICAgICQoXCIucmVzdWx0c1wiKS5hcHBlbmQoY291bnRyeUNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLy8gR28gdGhyb3VnaCB0aGUgYXJyYXkgXCJzdGF0Q2hvaWNlc1wiIGFuZCBzZXQgdXAgMyBpbmZvcm1hdGlvbjpcbiAgICAvLyAxLiB0aXRsZSBvZiBzdGF0ICh0YWtlbiBmcm9tIHRyYXZlbEFwcC5zdGF0TmFtZXNBcnJheSlcbiAgICAvLyAyLiB2YWx1ZSBvZiBzdGF0ICh0YWtlbiBmcm9tIHJlc3VsdHMgb2JqZWN0KVxuICAgIC8vIDMuIGRlc2NyaXB0aW9uIG9mIHN0YXQgKHRha2VuIGZyb20gdHJhdmVsQXBwLnN0YXREZXNjcmlwdGlvbkFycmF5KVxuICAgIGxldCBzdGF0Q291bnRlciA9IDA7XG4gICAgc3RhdENob2ljZXMuZm9yRWFjaChzdGF0ID0+IHtcbiAgICAgIGxldCBzdGF0VGl0bGUgPSB0cmF2ZWxBcHAuc3RhdE5hbWVzQXJyYXlbc3RhdENvdW50ZXJdO1xuICAgICAgbGV0IHN0YXRWYWx1ZSA9IGNvdW50cnlbdHJhdmVsQXBwLnN0YXRDb2RlQXJyYXlbc3RhdENvdW50ZXJdXTtcbiAgICAgIGxldCBzdGF0RGVzY3JpcHRpb24gPSB0cmF2ZWxBcHAuc3RhdERlc2NyaXB0aW9uQXJyYXlbc3RhdENvdW50ZXJdO1xuICAgICAgc3RhdENvdW50ZXIrKztcbiAgICAgIC8vIFRoaXMgbGlzdCBpdGVtIGVsZW1lbnQgd2lsbCBob2xkIHN0YXQgaW5mb3JtYXRpb25cbiAgICAgIGxldCBzdGF0TGlzdEl0ZW1FbGVtZW50ID0gJChcIjxsaT5cIikuYWRkQ2xhc3MoXCJzdGF0LWxpc3RfX2l0ZW1cIik7XG4gICAgICAvLyBUaGlzIGRpdiB3aWxsIGhvbGQgdGhlIHN0YXQgdGl0bGUgYW5kIHF1ZXN0aW9uIG1hcmsgaWNvblxuICAgICAgbGV0IHN0YXRUaXRsZUljb25Db250YWluZXJFbGVtZW50ID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFxuICAgICAgICBcInN0YXQtbGlzdF9faXRlbV9fdGl0bGUtaWNvbi1jb250YWluZXJcIlxuICAgICAgKTtcbiAgICAgIC8vIFRoaXMgZWxlbWVudCBob2xkcyB0aGUgc3RhdCB0aXRsZSBhbmQgdmFsdWVcbiAgICAgIGxldCBzdGF0VGl0bGVFbGVtZW50ID0gJChcIjxoND5cIilcbiAgICAgICAgLmFkZENsYXNzKFwic3RhdC1saXN0X19pdGVtX190aXRsZS1pY29uLWNvbnRhaW5lcl9fdGl0bGUtbnVtYmVyXCIpXG4gICAgICAgIC50ZXh0KGAke3N0YXRUaXRsZX06ICR7dHJhdmVsQXBwLm51bWJlcldpdGhDb21tYXMoc3RhdFZhbHVlKX1gKTtcbiAgICAgIC8vIFRoaXMgcXVlc3Rpb24gbWFyayBpY29uIHdpbGwgc2l0IG5leHQgdG8gdGhlIHN0YXRUaXRsZUVsZW1lbnQgYW5kIHdoZW4gY2xpY2tlZC9ob3Zlcm92ZXIsIHdpbGwgZGlzcGxheSB0aGUgc3RhdCBkZXNjcmlwdGlvblxuICAgICAgbGV0IHN0YXRIb3Zlckljb25FbGVtZW50ID0gYDxpIGNsYXNzPVwic3RhdC1saXN0X19pdGVtX190aXRsZS1pY29uLWNvbnRhaW5lcl9faWNvbiBmYXIgZmEtcXVlc3Rpb24tY2lyY2xlXCI+PC9pPmA7XG4gICAgICAvLyBhcHBlbmQgdGhlIHN0YXQgdGl0bGUgYW5kIGljb24gdG8gdGhlIHN0YXRUaXRsZUljb25Db250YWluZXJFbGVtZW50XG4gICAgICBzdGF0VGl0bGVJY29uQ29udGFpbmVyRWxlbWVudC5hcHBlbmQoXG4gICAgICAgIHN0YXRUaXRsZUVsZW1lbnQsXG4gICAgICAgIHN0YXRIb3Zlckljb25FbGVtZW50XG4gICAgICApO1xuICAgICAgLy8gVGhpcyBkaXYgd2lsbCBob2xkIHRoZSBzdGF0IGRlc2NyaXB0aW9uIGFuZCBpcyBhIHNpYmxpbmcgb2YgdGhlIHN0YXRUaXRsZUljb25Db250YWluZXIuXG4gICAgICBsZXQgc3RhdERlc2NyaXB0aW9uQ29udGFpbmVyRWxlbWVudCA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcbiAgICAgICAgXCJzdGF0LWxpc3RfX2l0ZW1fX2Rlc2NyaXB0aW9uLWNvbnRhaW5lciBkaXNwbGF5LW5vbmVcIlxuICAgICAgKTtcbiAgICAgIC8vIFRoaXMgZWxlbWVudCBob2xkcyB0aGUgc3RhdCBkZXNjcmlwdGlvblxuICAgICAgbGV0IHN0YXREZXNjcmlwdGlvbkVsZW1lbnQgPSAkKFwiPHA+XCIpXG4gICAgICAgIC5hZGRDbGFzcyhcInN0YXQtbGlzdF9faXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyX19kZXNjcmlwdGlvblwiKVxuICAgICAgICAudGV4dChzdGF0RGVzY3JpcHRpb24pO1xuICAgICAgLy8gQXBwZW5kIHRoZSBzdGF0RGVzY3JpcHRpb25FbGVtZW50IHRvIHRoZSBzdGF0RGVzY3JpcHRpb25Db250YWluZXJFbGVtZW50XG4gICAgICBzdGF0RGVzY3JpcHRpb25Db250YWluZXJFbGVtZW50LmFwcGVuZChzdGF0RGVzY3JpcHRpb25FbGVtZW50KTtcbiAgICAgIC8vIEFwcGVuZCB0aGUgdHdvIHN0YXQgZGl2IGNvbnRhaW5lcnMgdG8gdGhlIDxsaT5cbiAgICAgIHN0YXRMaXN0SXRlbUVsZW1lbnQuYXBwZW5kKFxuICAgICAgICBzdGF0VGl0bGVJY29uQ29udGFpbmVyRWxlbWVudCxcbiAgICAgICAgc3RhdERlc2NyaXB0aW9uQ29udGFpbmVyRWxlbWVudFxuICAgICAgKTtcbiAgICAgIC8vIEFwcGVuZCB0aGUgPGxpPnMgdG8gdGhlIDx1bD5cbiAgICAgIHN0YXRMaXN0RWxlbWVudC5hcHBlbmQoc3RhdExpc3RJdGVtRWxlbWVudCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHRyYXZlbEFwcC5maW5hbERpc3BsYXkoKTtcbn07XG5cbi8qICA3LjEgT25jZSBhbGwgaW1hZ2VzIGFyZSBsb2FkZWQgYXMgYmFja2dyb3VuZCBpbWFnZXMgb3IgcmVndWxhciBpbWFnZXMsIGRpc3BsYXkgdGhlIGZpbmFsIHJlc3VsdHMgd2l0aG91dCBcImxhZ1wiKi9cbnRyYXZlbEFwcC5maW5hbERpc3BsYXkgPSAoKSA9PiB7XG4gICQoXCIucmVzdWx0c1wiKS53YWl0Rm9ySW1hZ2VzKGZ1bmN0aW9uKCkge1xuICAgICQoXCIucmVzdWx0c1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwiZmxleFwiKTtcblxuICAgIGxldCBmbGlja2l0eU9yTm90ID0gXCJmbGV4XCI7XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogMTEwMHB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAvKiB0aGUgdmlld3BvcnQgaXMgYXQgbW9zdCAxMTAwIHBpeGVscyB3aWRlICovXG4gICAgICBmbGlja2l0eU9yTm90ID0gXCJibG9ja1wiO1xuICAgIH1cblxuICAgICQoXCIucmVzdWx0c1wiKS5jc3MoXCJkaXNwbGF5XCIsIGZsaWNraXR5T3JOb3QpO1xuICAgICQoXCJodG1sLCBib2R5XCIpXG4gICAgICAuc3RvcCgpXG4gICAgICAuYW5pbWF0ZSh7IHNjcm9sbFRvcDogJChcIi5yZXN1bHRzXCIpLm9mZnNldCgpLnRvcCB9LCA5MDAsIFwic3dpbmdcIik7XG5cbiAgICAvLyByZW1vdmUgbG9hZGVyIGFuZCBkaXNwbGF5IHN1Ym1pdCByYW5raW5nIGJ1dHRvbiBhZ2FpblxuICAgIGxldCBtYXJrVXBCdXR0b24gPSBgPGxpPjxidXR0b24gY2xhc3M9XCJ1c2VyLXN1Ym1pdCBidG5cIj5TdWJtaXQgUmFua2luZzwvYnV0dG9uPjwvbGk+YDtcbiAgICAkKFwiLmNob2ljZXNcIilcbiAgICAgIC5maW5kKFwibGk6bGFzdC1jaGlsZFwiKVxuICAgICAgLmh0bWwobWFya1VwQnV0dG9uKTtcblxuICAgIC8qIEZMSUNLSVRZICovXG4gICAgJChcIi5yZXN1bHRzXCIpLmZsaWNraXR5KHtcbiAgICAgIC8vIG9wdGlvbnNcbiAgICAgIGNlbGxBbGlnbjogXCJsZWZ0XCIsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgYXV0b1BsYXk6IDUwMDAsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICB3YXRjaENTUzogdHJ1ZVxuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vIDcuMiBPbiBob3ZlciBvciBjbGljayBvdmVyIHRoZSBxdWVzdGlvbiBtYXJrIGljb24sIGRpc3BsYXkgdGhlIHN0YXQgZGVzY3JpcHRpb25cbnRyYXZlbEFwcC5kaXNwbGF5U3RhdERlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICQoXCIucmVzdWx0c1wiKS5vbihcbiAgICBcImNsaWNrXCIsXG4gICAgXCIuc3RhdC1saXN0X19pdGVtX190aXRsZS1pY29uLWNvbnRhaW5lcl9faWNvblwiLFxuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKFxuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgLnBhcmVudHMoXCIuc3RhdC1saXN0X19pdGVtXCIpXG4gICAgICAgICAgLmZpbmQoXCIuc3RhdC1saXN0X19pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXJcIilcbiAgICAgICAgICAuaGFzQ2xhc3MoXCJkaXNwbGF5LW5vbmVcIikgPT09IGZhbHNlXG4gICAgICApIHtcbiAgICAgICAgJChcIi5yZXN1bHRzXCIpXG4gICAgICAgICAgLmZpbmQoXCIuc3RhdC1saXN0X19pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXJcIilcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5LW5vbmVcIilcbiAgICAgICAgICAuYWRkQ2xhc3MoXCJkaXNwbGF5LW5vbmVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiLnJlc3VsdHNcIilcbiAgICAgICAgICAuZmluZChcIi5zdGF0LWxpc3RfX2l0ZW1fX2Rlc2NyaXB0aW9uLWNvbnRhaW5lclwiKVxuICAgICAgICAgIC5hZGRDbGFzcyhcImRpc3BsYXktbm9uZVwiKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgIC5wYXJlbnRzKFwiLnN0YXQtbGlzdF9faXRlbVwiKVxuICAgICAgICAgIC5maW5kKFwiLnN0YXQtbGlzdF9faXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyXCIpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKFwiZGlzcGxheS1ub25lXCIpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn07XG5cbi8vIFRoaXMgZnVuY3Rpb24gaG9sZHMgYWxsIG91ciBldmVudHMgZnVudGlvbnNcbnRyYXZlbEFwcC5ldmVudHNGdW5jdGlvbiA9ICgpID0+IHtcbiAgdHJhdmVsQXBwLmdldFVzZXJQdXJwb3NlKCk7XG4gIHRyYXZlbEFwcC5nZXRTdGFydGVkKCk7XG4gIHRyYXZlbEFwcC50cmFuc2Zvcm1TVkcoKTtcbiAgdHJhdmVsQXBwLmRpc3BsYXlTdGF0RGVzY3JpcHRpb24oKTtcbn07XG5cbi8vIEluaXQgZnVuY3Rpb24gdG8gaG9sZCBhbGwgb3VyIGZ1bmN0aW9ucyBpbiBvcmRlclxudHJhdmVsQXBwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgdHJhdmVsQXBwLmV2ZW50c0Z1bmN0aW9uKCk7XG4gIHRyYXZlbEFwcC5zbGlkZURyYWcoKTtcbn07XG5cbi8vIERvY3VtZW50IFJlYWR5IHRvIGNhbGwgb3VyIGluaXQoKSBmdW5jdGlvbiBhbmQgc3RhcnQgdGhlIGFwcFxuJChmdW5jdGlvbigpIHtcbiAgdHJhdmVsQXBwLmluaXQoKTtcbn0pO1xuXG4vKiA4LiBFWFRSQSBGVU5DVElPTlMgVVNFRCBUSFJPVUdIT1VUIEFQUCAqL1xuXG4vLyA4LjEgU29ydGFibGUgZnVuY3Rpb25hbGl0eSBmb3IgY3JpdGVyaWFzXG50cmF2ZWxBcHAuc2xpZGVEcmFnID0gKCkgPT4ge1xuICAkKFwiLmNob2ljZXNcIilcbiAgICAuc29ydGFibGUoe1xuICAgICAgY29ubmVjdFdpdGg6IFwiLnNvcnRhYmxlXCIsXG4gICAgICBzY3JvbGw6IGZhbHNlLFxuICAgICAgcmV2ZXJ0OiB0cnVlLFxuICAgICAgaGVscGVyOiBcImNsb25lXCIsXG4gICAgICBjb250YWlubWVudDogXCIuY3JpdGVyaWFzLWNvbnRhaW5lclwiXG4gICAgfSlcbiAgICAuY3NzKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKTtcbiAgJChcInVsLCBsaVwiKS5kaXNhYmxlU2VsZWN0aW9uKCk7XG59O1xuXG4vLyA4LjIgUmFuZG9taXplciBmdW5jdGlvbiB0byBzZWxlY3QgcmFuZG9tIGltYWdlcyB0byBkaXNwbGF5XG50cmF2ZWxBcHAucmFuZG9taXplID0gKHN0YXJ0aW5nTnVtLCBlbmRpbmdOdW0pID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChlbmRpbmdOdW0gLSBzdGFydGluZ051bSkpICsgc3RhcnRpbmdOdW07XG59O1xuXG4vLyA4LjMgRXZlbnQgbGlzdGVuZXIgdG8gdHJhbnNmb3JtIFNWR3MgaW50byBpbmxpbmUgU1ZHUyB0byBiZSBhYmxlIHRvIGNoYW5nZSB0aGVpciBjb2xvcnMgd2l0aCBjc3MgZmlsbFxudHJhdmVsQXBwLnRyYW5zZm9ybVNWRyA9ICgpID0+IHtcbiAgalF1ZXJ5KFwiaW1nLnN2Z1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciAkaW1nID0galF1ZXJ5KHRoaXMpO1xuICAgIHZhciBpbWdJRCA9ICRpbWcuYXR0cihcImlkXCIpO1xuICAgIHZhciBpbWdDbGFzcyA9ICRpbWcuYXR0cihcImNsYXNzXCIpO1xuICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoXCJzcmNcIik7XG5cbiAgICBqUXVlcnkuZ2V0KFxuICAgICAgaW1nVVJMLFxuICAgICAgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvLyBHZXQgdGhlIFNWRyB0YWcsIGlnbm9yZSB0aGUgcmVzdFxuICAgICAgICB2YXIgJHN2ZyA9IGpRdWVyeShkYXRhKS5maW5kKFwic3ZnXCIpO1xuXG4gICAgICAgIC8vIEFkZCByZXBsYWNlZCBpbWFnZSdzIElEIHRvIHRoZSBuZXcgU1ZHXG4gICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKFwiaWRcIiwgaW1nSUQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCByZXBsYWNlZCBpbWFnZSdzIGNsYXNzZXMgdG8gdGhlIG5ldyBTVkdcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdDbGFzcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoXCJjbGFzc1wiLCBpbWdDbGFzcyArIFwiIHJlcGxhY2VkLXN2Z1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbW92ZSBhbnkgaW52YWxpZCBYTUwgdGFncyBhcyBwZXIgaHR0cDovL3ZhbGlkYXRvci53My5vcmdcbiAgICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cihcInhtbG5zOmFcIik7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZpZXdwb3J0IGlzIHNldCwgaWYgdGhlIHZpZXdwb3J0IGlzIG5vdCBzZXQgdGhlIFNWRyB3b250J3Qgc2NhbGUuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAhJHN2Zy5hdHRyKFwidmlld0JveFwiKSAmJlxuICAgICAgICAgICRzdmcuYXR0cihcImhlaWdodFwiKSAmJlxuICAgICAgICAgICRzdmcuYXR0cihcIndpZHRoXCIpXG4gICAgICAgICkge1xuICAgICAgICAgICRzdmcuYXR0cihcbiAgICAgICAgICAgIFwidmlld0JveFwiLFxuICAgICAgICAgICAgXCIwIDAgXCIgKyAkc3ZnLmF0dHIoXCJoZWlnaHRcIikgKyBcIiBcIiArICRzdmcuYXR0cihcIndpZHRoXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlcGxhY2UgaW1hZ2Ugd2l0aCBuZXcgU1ZHXG4gICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XG4gICAgICB9LFxuICAgICAgXCJ4bWxcIlxuICAgICk7XG4gIH0pO1xufTtcblxuLyogOC40IFRSQU5TRk9STSBTVFJJTkcgTlVNQkVSUyBJTlRPIFNFUEFSQVRFRCBTVFJJTkdTIFdJVEggUFJPUEVSIENPTU1BUyBGT1IgRUFDSCBUSE9VU0FORCBVTklUICovXG50cmF2ZWxBcHAubnVtYmVyV2l0aENvbW1hcyA9IHN0YXQgPT4ge1xuICByZXR1cm4gc3RhdC50b1N0cmluZygpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLFwiKTtcbn07XG4iLCIvKipcbiAqIEZhc3RQcmlvcml0eVF1ZXVlLmpzIDogYSBmYXN0IGhlYXAtYmFzZWQgcHJpb3JpdHkgcXVldWUgIGluIEphdmFTY3JpcHQuXG4gKiAoYykgdGhlIGF1dGhvcnNcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuXG4gKlxuICogU3BlZWQtb3B0aW1pemVkIGhlYXAtYmFzZWQgcHJpb3JpdHkgcXVldWUgZm9yIG1vZGVybiBicm93c2VycyBhbmQgSmF2YVNjcmlwdCBlbmdpbmVzLlxuICpcbiAqIFVzYWdlIDpcbiAgICAgICAgIEluc3RhbGxhdGlvbiAoaW4gc2hlbGwsIGlmIHlvdSB1c2Ugbm9kZSk6XG4gICAgICAgICAkIG5wbSBpbnN0YWxsIGZhc3Rwcmlvcml0eXF1ZXVlXG5cbiAgICAgICAgIFJ1bm5pbmcgdGVzdCBwcm9ncmFtIChpbiBKYXZhU2NyaXB0KTpcblxuICAgICAgICAgLy8gdmFyIEZhc3RQcmlvcml0eVF1ZXVlID0gcmVxdWlyZShcImZhc3Rwcmlvcml0eXF1ZXVlXCIpOy8vIGluIG5vZGVcbiAgICAgICAgIHZhciB4ID0gbmV3IEZhc3RQcmlvcml0eVF1ZXVlKCk7XG4gICAgICAgICB4LmFkZCgxKTtcbiAgICAgICAgIHguYWRkKDApO1xuICAgICAgICAgeC5hZGQoNSk7XG4gICAgICAgICB4LmFkZCg0KTtcbiAgICAgICAgIHguYWRkKDMpO1xuICAgICAgICAgeC5wZWVrKCk7IC8vIHNob3VsZCByZXR1cm4gMCwgbGVhdmVzIHggdW5jaGFuZ2VkXG4gICAgICAgICB4LnNpemU7IC8vIHNob3VsZCByZXR1cm4gNSwgbGVhdmVzIHggdW5jaGFuZ2VkXG4gICAgICAgICB3aGlsZSgheC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgY29uc29sZS5sb2coeC5wb2xsKCkpO1xuICAgICAgICAgfSAvLyB3aWxsIHByaW50IDAgMSAzIDQgNVxuICAgICAgICAgeC50cmltKCk7IC8vIChvcHRpb25hbCkgb3B0aW1pemVzIG1lbW9yeSB1c2FnZVxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0Y29tcGFyYXRvciA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIGEgPCBiO1xufTtcblxuLy8gdGhlIHByb3ZpZGVkIGNvbXBhcmF0b3IgZnVuY3Rpb24gc2hvdWxkIHRha2UgYSwgYiBhbmQgcmV0dXJuICp0cnVlKiB3aGVuIGEgPCBiXG5mdW5jdGlvbiBGYXN0UHJpb3JpdHlRdWV1ZShjb21wYXJhdG9yKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBGYXN0UHJpb3JpdHlRdWV1ZSkpIHJldHVybiBuZXcgRmFzdFByaW9yaXR5UXVldWUoY29tcGFyYXRvcik7XG4gIHRoaXMuYXJyYXkgPSBbXTtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5jb21wYXJlID0gY29tcGFyYXRvciB8fCBkZWZhdWx0Y29tcGFyYXRvcjtcbn1cblxuLy8gY29weSB0aGUgcHJpb3JpdHkgcXVldWUgaW50byBhbm90aGVyLCBhbmQgcmV0dXJuIGl0LiBRdWV1ZSBpdGVtcyBhcmUgc2hhbGxvdy1jb3BpZWQuXG4vLyBSdW5zIGluIGBPKG4pYCB0aW1lLlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmcHEgPSBuZXcgRmFzdFByaW9yaXR5UXVldWUodGhpcy5jb21wYXJlKTtcbiAgZnBxLnNpemUgPSB0aGlzLnNpemU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zaXplOyBpKyspIHtcbiAgICBmcHEuYXJyYXkucHVzaCh0aGlzLmFycmF5W2ldKTtcbiAgfVxuICByZXR1cm4gZnBxO1xufTtcblxuLy8gQWRkIGFuIGVsZW1lbnQgaW50byB0aGUgcXVldWVcbi8vIHJ1bnMgaW4gTyhsb2cgbikgdGltZVxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG15dmFsKSB7XG4gIHZhciBpID0gdGhpcy5zaXplO1xuICB0aGlzLmFycmF5W3RoaXMuc2l6ZV0gPSBteXZhbDtcbiAgdGhpcy5zaXplICs9IDE7XG4gIHZhciBwO1xuICB2YXIgYXA7XG4gIHdoaWxlIChpID4gMCkge1xuICAgIHAgPSAoaSAtIDEpID4+IDE7XG4gICAgYXAgPSB0aGlzLmFycmF5W3BdO1xuICAgIGlmICghdGhpcy5jb21wYXJlKG15dmFsLCBhcCkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmFycmF5W2ldID0gYXA7XG4gICAgaSA9IHA7XG4gIH1cbiAgdGhpcy5hcnJheVtpXSA9IG15dmFsO1xufTtcblxuLy8gcmVwbGFjZSB0aGUgY29udGVudCBvZiB0aGUgaGVhcCBieSBwcm92aWRlZCBhcnJheSBhbmQgXCJoZWFwaWZ5IGl0XCJcbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5oZWFwaWZ5ID0gZnVuY3Rpb24oYXJyKSB7XG4gIHRoaXMuYXJyYXkgPSBhcnI7XG4gIHRoaXMuc2l6ZSA9IGFyci5sZW5ndGg7XG4gIHZhciBpO1xuICBmb3IgKGkgPSB0aGlzLnNpemUgPj4gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB0aGlzLl9wZXJjb2xhdGVEb3duKGkpO1xuICB9XG59O1xuXG4vLyBmb3IgaW50ZXJuYWwgdXNlXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuX3BlcmNvbGF0ZVVwID0gZnVuY3Rpb24oaSwgZm9yY2UpIHtcbiAgdmFyIG15dmFsID0gdGhpcy5hcnJheVtpXTtcbiAgdmFyIHA7XG4gIHZhciBhcDtcbiAgd2hpbGUgKGkgPiAwKSB7XG4gICAgcCA9IChpIC0gMSkgPj4gMTtcbiAgICBhcCA9IHRoaXMuYXJyYXlbcF07XG4gICAgLy8gZm9yY2Ugd2lsbCBza2lwIHRoZSBjb21wYXJlXG4gICAgaWYgKCFmb3JjZSAmJiAhdGhpcy5jb21wYXJlKG15dmFsLCBhcCkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmFycmF5W2ldID0gYXA7XG4gICAgaSA9IHA7XG4gIH1cbiAgdGhpcy5hcnJheVtpXSA9IG15dmFsO1xufTtcblxuLy8gZm9yIGludGVybmFsIHVzZVxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLl9wZXJjb2xhdGVEb3duID0gZnVuY3Rpb24oaSkge1xuICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgdmFyIGhzaXplID0gdGhpcy5zaXplID4+PiAxO1xuICB2YXIgYWkgPSB0aGlzLmFycmF5W2ldO1xuICB2YXIgbDtcbiAgdmFyIHI7XG4gIHZhciBiZXN0YztcbiAgd2hpbGUgKGkgPCBoc2l6ZSkge1xuICAgIGwgPSAoaSA8PCAxKSArIDE7XG4gICAgciA9IGwgKyAxO1xuICAgIGJlc3RjID0gdGhpcy5hcnJheVtsXTtcbiAgICBpZiAociA8IHNpemUpIHtcbiAgICAgIGlmICh0aGlzLmNvbXBhcmUodGhpcy5hcnJheVtyXSwgYmVzdGMpKSB7XG4gICAgICAgIGwgPSByO1xuICAgICAgICBiZXN0YyA9IHRoaXMuYXJyYXlbcl07XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5jb21wYXJlKGJlc3RjLCBhaSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmFycmF5W2ldID0gYmVzdGM7XG4gICAgaSA9IGw7XG4gIH1cbiAgdGhpcy5hcnJheVtpXSA9IGFpO1xufTtcblxuLy8gaW50ZXJuYWxcbi8vIF9yZW1vdmVBdChpbmRleCkgd2lsbCByZW1vdmUgdGhlIGl0ZW0gYXQgdGhlIGdpdmVuIGluZGV4IGZyb20gdGhlIHF1ZXVlLFxuLy8gcmV0YWluaW5nIGJhbGFuY2UuIHJldHVybnMgdGhlIHJlbW92ZWQgaXRlbSwgb3IgdW5kZWZpbmVkIGlmIG5vdGhpbmcgaXMgcmVtb3ZlZC5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5fcmVtb3ZlQXQgPSBmdW5jdGlvbihpbmRleCkge1xuICBpZiAoaW5kZXggPiB0aGlzLnNpemUgLSAxIHx8IGluZGV4IDwgMCkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAvLyBpbXBsMTpcbiAgLy90aGlzLmFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gIC8vdGhpcy5oZWFwaWZ5KHRoaXMuYXJyYXkpO1xuICAvLyBpbXBsMjpcbiAgdGhpcy5fcGVyY29sYXRlVXAoaW5kZXgsIHRydWUpO1xuICByZXR1cm4gdGhpcy5wb2xsKCk7XG59O1xuXG4vLyByZW1vdmUobXl2YWwpIHdpbGwgcmVtb3ZlIGFuIGl0ZW0gbWF0Y2hpbmcgdGhlIHByb3ZpZGVkIHZhbHVlIGZyb20gdGhlXG4vLyBxdWV1ZSwgY2hlY2tlZCBmb3IgZXF1YWxpdHkgYnkgdXNpbmcgdGhlIHF1ZXVlJ3MgY29tcGFyYXRvci5cbi8vIHJldHVybiB0cnVlIGlmIHJlbW92ZWQsIGZhbHNlIG90aGVyd2lzZS5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihteXZhbCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgaSsrKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBhcmUodGhpcy5hcnJheVtpXSwgbXl2YWwpICYmICF0aGlzLmNvbXBhcmUobXl2YWwsIHRoaXMuYXJyYXlbaV0pKSB7XG4gICAgICAvLyBpdGVtcyBtYXRjaCwgY29tcGFyYXRvciByZXR1cm5zIGZhbHNlIGJvdGggd2F5cywgcmVtb3ZlIGl0ZW1cbiAgICAgIHRoaXMuX3JlbW92ZUF0KGkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8vIGludGVybmFsXG4vLyByZW1vdmVzIGFuZCByZXR1cm5zIGl0ZW1zIGZvciB3aGljaCB0aGUgY2FsbGJhY2sgcmV0dXJucyB0cnVlLlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLl9iYXRjaFJlbW92ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBsaW1pdCkge1xuICAvLyBpbml0aWFsaXplIHJldHVybiBhcnJheSB3aXRoIG1heCBzaXplIG9mIHRoZSBsaW1pdCBvciBjdXJyZW50IHF1ZXVlIHNpemVcbiAgdmFyIHJldEFyciA9IG5ldyBBcnJheShsaW1pdCA/IGxpbWl0IDogdGhpcy5zaXplKTtcbiAgdmFyIGNvdW50ID0gMDtcblxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmIHRoaXMuc2l6ZSkge1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHRoaXMuc2l6ZSAmJiBjb3VudCA8IHJldEFyci5sZW5ndGgpIHtcbiAgICAgIGlmIChjYWxsYmFjayh0aGlzLmFycmF5W2ldKSkge1xuICAgICAgICByZXRBcnJbY291bnRdID0gdGhpcy5fcmVtb3ZlQXQoaSk7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIC8vIG1vdmUgdXAgYSBsZXZlbCBpbiB0aGUgaGVhcCBpZiB3ZSByZW1vdmUgYW4gaXRlbVxuICAgICAgICBpID0gaSA+PiAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH0gXG4gIH1cbiAgcmV0QXJyLmxlbmd0aCA9IGNvdW50O1xuICByZXR1cm4gcmV0QXJyO1xufVxuXG4vLyByZW1vdmVPbmUoY2FsbGJhY2spIHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbSBvZiB0aGUgcXVldWVcbi8vIGFuZCB3aWxsIHJlbW92ZSB0aGUgZmlyc3QgaXRlbSBmb3Igd2hpY2ggdGhlIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRydWUuXG4vLyByZXR1cm4gdGhlIHJlbW92ZWQgaXRlbSwgb3IgdW5kZWZpbmVkIGlmIG5vdGhpbmcgaXMgcmVtb3ZlZC5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5yZW1vdmVPbmUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgYXJyID0gdGhpcy5fYmF0Y2hSZW1vdmUoY2FsbGJhY2ssIDEpO1xuICByZXR1cm4gYXJyLmxlbmd0aCA+IDAgPyBhcnJbMF0gOiB1bmRlZmluZWQ7XG59O1xuXG4vLyByZW1vdmUoY2FsbGJhY2tbLCBsaW1pdF0pIHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbSBvZlxuLy8gdGhlIHF1ZXVlIGFuZCB3aWxsIHJlbW92ZSBlYWNoIGl0ZW0gZm9yIHdoaWNoIHRoZSBjYWxsYmFjayByZXR1cm5zIHRydWUsIHVwIHRvXG4vLyBhIG1heCBsaW1pdCBvZiByZW1vdmVkIGl0ZW1zIGlmIHNwZWNpZmllZCBvciBubyBsaW1pdCBpZiB1bnNwZWNpZmllZC5cbi8vIHJldHVybiBhbiBhcnJheSBjb250YWluaW5nIHRoZSByZW1vdmVkIGl0ZW1zLlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLnJlbW92ZU1hbnkgPSBmdW5jdGlvbihjYWxsYmFjaywgbGltaXQpIHtcbiAgcmV0dXJuIHRoaXMuX2JhdGNoUmVtb3ZlKGNhbGxiYWNrLCBsaW1pdCk7XG59O1xuXG4vLyBMb29rIGF0IHRoZSB0b3Agb2YgdGhlIHF1ZXVlIChvbmUgb2YgdGhlIHNtYWxsZXN0IGVsZW1lbnRzKSB3aXRob3V0IHJlbW92aW5nIGl0XG4vLyBleGVjdXRlcyBpbiBjb25zdGFudCB0aW1lXG4vL1xuLy8gQ2FsbGluZyBwZWVrIG9uIGFuIGVtcHR5IHByaW9yaXR5IHF1ZXVlIHJldHVybnNcbi8vIHRoZSBcInVuZGVmaW5lZFwiIHZhbHVlLlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvdW5kZWZpbmVkXG4vL1xuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuc2l6ZSA9PSAwKSByZXR1cm4gdW5kZWZpbmVkO1xuICByZXR1cm4gdGhpcy5hcnJheVswXTtcbn07XG5cbi8vIHJlbW92ZSB0aGUgZWxlbWVudCBvbiB0b3Agb2YgdGhlIGhlYXAgKG9uZSBvZiB0aGUgc21hbGxlc3QgZWxlbWVudHMpXG4vLyBydW5zIGluIGxvZ2FyaXRobWljIHRpbWVcbi8vXG4vLyBJZiB0aGUgcHJpb3JpdHkgcXVldWUgaXMgZW1wdHksIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRoZVxuLy8gXCJ1bmRlZmluZWRcIiB2YWx1ZS5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL3VuZGVmaW5lZFxuLy9cbi8vIEZvciBsb25nLXJ1bm5pbmcgYW5kIGxhcmdlIHByaW9yaXR5IHF1ZXVlcywgb3IgcHJpb3JpdHkgcXVldWVzXG4vLyBzdG9yaW5nIGxhcmdlIG9iamVjdHMsIHlvdSBtYXkgIHdhbnQgdG8gY2FsbCB0aGUgdHJpbSBmdW5jdGlvblxuLy8gYXQgc3RyYXRlZ2ljIHRpbWVzIHRvIHJlY292ZXIgYWxsb2NhdGVkIG1lbW9yeS5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnNpemUgPT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdmFyIGFucyA9IHRoaXMuYXJyYXlbMF07XG4gIGlmICh0aGlzLnNpemUgPiAxKSB7XG4gICAgdGhpcy5hcnJheVswXSA9IHRoaXMuYXJyYXlbLS10aGlzLnNpemVdO1xuICAgIHRoaXMuX3BlcmNvbGF0ZURvd24oMCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zaXplIC09IDE7XG4gIH1cbiAgcmV0dXJuIGFucztcbn07XG5cbi8vIFRoaXMgZnVuY3Rpb24gYWRkcyB0aGUgcHJvdmlkZWQgdmFsdWUgdG8gdGhlIGhlYXAsIHdoaWxlIHJlbW92aW5nXG4vLyBhbmQgcmV0dXJuaW5nIG9uZSBvZiB0aGUgc21hbGxlc3QgZWxlbWVudHMgKGxpa2UgcG9sbCkuIFRoZSBzaXplIG9mIHRoZSBxdWV1ZVxuLy8gdGh1cyByZW1haW5zIHVuY2hhbmdlZC5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5yZXBsYWNlVG9wID0gZnVuY3Rpb24obXl2YWwpIHtcbiAgaWYgKHRoaXMuc2l6ZSA9PSAwKSByZXR1cm4gdW5kZWZpbmVkO1xuICB2YXIgYW5zID0gdGhpcy5hcnJheVswXTtcbiAgdGhpcy5hcnJheVswXSA9IG15dmFsO1xuICB0aGlzLl9wZXJjb2xhdGVEb3duKDApO1xuICByZXR1cm4gYW5zO1xufTtcblxuLy8gcmVjb3ZlciB1bnVzZWQgbWVtb3J5IChmb3IgbG9uZy1ydW5uaW5nIHByaW9yaXR5IHF1ZXVlcylcbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXJyYXkgPSB0aGlzLmFycmF5LnNsaWNlKDAsIHRoaXMuc2l6ZSk7XG59O1xuXG4vLyBDaGVjayB3aGV0aGVyIHRoZSBoZWFwIGlzIGVtcHR5XG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zaXplID09PSAwO1xufTtcblxuLy8gaXRlcmF0ZSBvdmVyIHRoZSBpdGVtcyBpbiBvcmRlciwgcGFzcyBhIGNhbGxiYWNrIHRoYXQgcmVjZWl2ZXMgKGl0ZW0sIGluZGV4KSBhcyBhcmdzLlxuLy8gVE9ETyBvbmNlIHdlIHRyYW5zcGlsZSwgdW5jb21tZW50XG4vLyBpZiAoU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcikge1xuLy8gICBGYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKigpIHtcbi8vICAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHJldHVybjtcbi8vICAgICB2YXIgZnBxID0gdGhpcy5jbG9uZSgpO1xuLy8gICAgIHdoaWxlICghZnBxLmlzRW1wdHkoKSkge1xuLy8gICAgICAgeWllbGQgZnBxLnBvbGwoKTtcbi8vICAgICB9XG4vLyAgIH07XG4vLyB9XG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGlmICh0aGlzLmlzRW1wdHkoKSB8fCB0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuICB2YXIgaSA9IDA7XG4gIHZhciBmcHEgPSB0aGlzLmNsb25lKCk7XG4gIHdoaWxlICghZnBxLmlzRW1wdHkoKSkge1xuICAgIGNhbGxiYWNrKGZwcS5wb2xsKCksIGkrKyk7XG4gIH1cbn07XG5cbi8vIHJldHVybiB0aGUgayAnc21hbGxlc3QnIGVsZW1lbnRzIG9mIHRoZSBxdWV1ZVxuLy8gcnVucyBpbiBPKGsgbG9nIGspIHRpbWVcbi8vIHRoaXMgaXMgdGhlIGVxdWl2YWxlbnQgb2YgcmVwZWF0ZWRseSBjYWxsaW5nIHBvbGwsIGJ1dFxuLy8gaXQgaGFzIGEgYmV0dGVyIGNvbXB1dGF0aW9uYWwgY29tcGxleGl0eSwgd2hpY2ggY2FuIGJlXG4vLyBpbXBvcnRhbnQgZm9yIGxhcmdlIGRhdGEgc2V0cy5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5rU21hbGxlc3QgPSBmdW5jdGlvbihrKSB7XG4gIGlmICh0aGlzLnNpemUgPT0gMCkgcmV0dXJuIFtdO1xuICB2YXIgY29tcGFyYXRvciA9IHRoaXMuY29tcGFyZTtcbiAgdmFyIGFyciA9IHRoaXMuYXJyYXlcbiAgdmFyIGZwcSA9IG5ldyBGYXN0UHJpb3JpdHlRdWV1ZShmdW5jdGlvbihhLGIpe1xuICAgcmV0dXJuIGNvbXBhcmF0b3IoYXJyW2FdLGFycltiXSk7XG4gIH0pO1xuICBrID0gTWF0aC5taW4odGhpcy5zaXplLCBrKTtcbiAgdmFyIHNtYWxsZXN0ID0gbmV3IEFycmF5KGspO1xuICB2YXIgaiA9IDA7XG4gIGZwcS5hZGQoMCk7XG4gIHdoaWxlIChqIDwgaykge1xuICAgIHZhciBzbWFsbCA9IGZwcS5wb2xsKCk7XG4gICAgc21hbGxlc3RbaisrXSA9IHRoaXMuYXJyYXlbc21hbGxdO1xuICAgIHZhciBsID0gKHNtYWxsIDw8IDEpICsgMTtcbiAgICB2YXIgciA9IGwgKyAxO1xuICAgIGlmIChsIDwgdGhpcy5zaXplKSBmcHEuYWRkKGwpO1xuICAgIGlmIChyIDwgdGhpcy5zaXplKSBmcHEuYWRkKHIpO1xuICB9XG4gIHJldHVybiBzbWFsbGVzdDtcbn1cblxuLy8ganVzdCBmb3IgaWxsdXN0cmF0aW9uIHB1cnBvc2VzXG52YXIgbWFpbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBtYWluIGNvZGVcbiAgdmFyIHggPSBuZXcgRmFzdFByaW9yaXR5UXVldWUoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhIDwgYjtcbiAgfSk7XG4gIHguYWRkKDEpO1xuICB4LmFkZCgwKTtcbiAgeC5hZGQoNSk7XG4gIHguYWRkKDQpO1xuICB4LmFkZCgzKTtcbiAgd2hpbGUgKCF4LmlzRW1wdHkoKSkge1xuICAgIGNvbnNvbGUubG9nKHgucG9sbCgpKTtcbiAgfVxufTtcblxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIG1haW4oKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGYXN0UHJpb3JpdHlRdWV1ZTtcbiJdfQ==
