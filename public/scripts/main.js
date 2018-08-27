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
  var markUpButton = "<li><button class=\"user-submit btn\">Submit Ranking</button></li>";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIiwibm9kZV9tb2R1bGVzL2Zhc3Rwcmlvcml0eXF1ZXVlL0Zhc3RQcmlvcml0eVF1ZXVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0EsSUFBTSxVQUFVLFFBQVEsbUJBQVIsQ0FBaEI7O0FBRUE7QUFDQSxJQUFNLFlBQVksRUFBbEI7O0FBRUE7QUFDQSxVQUFVLFNBQVYsR0FBc0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0UsTUFBSSxpQkFETjtBQUVFLFNBQU8sQ0FDTDtBQUNFLFVBQU0sU0FEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsMEJBSFo7QUFJRSxpQkFBYTtBQUpmLEdBREssRUFPTDtBQUNFLFVBQU0saUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGlCQUhaO0FBSUUsaUJBQ0U7QUFMSixHQVBLLEVBY0w7QUFDRSxVQUFNLGtCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxrQkFIWjtBQUlFLGlCQUNFO0FBTEosR0FkSyxFQXFCTDtBQUNFLFVBQU0scUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLHFCQUhaO0FBSUUsaUJBQ0U7QUFMSixHQXJCSyxFQTRCTDtBQUNFLFVBQU0sa0JBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLHlCQUhaO0FBSUUsaUJBQWE7QUFKZixHQTVCSyxFQWtDTDtBQUNFLFVBQU0scUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGFBSFo7QUFJRSxpQkFBYTtBQUpmLEdBbENLO0FBRlQsQ0FIb0I7QUErQ3BCO0FBQ0E7QUFDQTtBQUNFLE1BQUksa0JBRE47QUFFRSxTQUFPLENBQ0w7QUFDRSxVQUFNLHVCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSx1QkFIWjtBQUlFLGlCQUNFO0FBTEosR0FESyxFQVFMO0FBQ0UsVUFBTSxlQURSO0FBRUUs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIElNUE9SVCBIRUFQIE1PRFVMRSBGUk9NIE5QTVxuY29uc3QgTWluSGVhcCA9IHJlcXVpcmUoXCJmYXN0cHJpb3JpdHlxdWV1ZVwiKTtcblxuLy8gQ3JlYXRlIGFuIG9iamVjdCByZXByZXNlbnRpbmcgb3VyIHRyYXZlbCBhcHAgKE5BTUVTUEFDRSlcbmNvbnN0IHRyYXZlbEFwcCA9IHt9O1xuXG4vLyBBUlJBWSBXSVRIIEFMTCBSRUxFVkFOVCBTVEFUUyBGT1IgRUFDSCBQVVJQT1NFXG50cmF2ZWxBcHAuc3RhdEFycmF5ID0gW1xuICAvLyBWQUNBVElPTiBCVVRUT05cbiAgLy8gPT09PT09PT09PT09PT09XG4gIHtcbiAgICBpZDogXCJidXR0b24tdmFjYXRpb25cIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImRlbnNpdHlcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJQb3B1bGF0aW9uIERlbnNpdHkgKGxvdylcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHBvcHVsYXRpb24gZGVuc2l0eSBpcyBtZWFzdXJlZCBpbiBwZXIga23Csi5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoYXBwaW5lc3NfaW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIYXBwaW5lc3MgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJCYXNlZCBvbiBmYWN0b3JzIHN1Y2ggYXMgR0RQIHBlciBjYXBpdGEsIHNvY2lhbCBzdXBwb3J0LCBsaWZlIGV4cGVjdGFuY3kuIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgaGFwcGllciB0aGUgY291bnRyeS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJ0b3VyaXN0X2Fycml2YWxzXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiVG91cmlzdCBBcnJpdmFsc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIlJlcHJlc2VudHMgZm9yZWlnbiBjaXRpemVucyB0aGF0IHN0YXllZCBhdCBsZWFzdCBvbmUgbmlnaHQuIEluY2x1ZGVzIGhvdGVsIHN0YXlzLCB0cmFuc2ZlcnMsIGNvbmZlcmVuY2UgdmlzaXRzLCBldGMuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidG91cmlzbV9leHBlbmRpdHVyZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlRvdXJpc3QgRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJUaGUgYW1vdW50IG9mIGdvdmVybm1lbnQgc3BlbmRpbmcgZGVkaWNhdGVkIGZvciB0b3VyaXNtIChpbiAlIG9mIHRoZSBHRFAgZm9yIGEgY291bnRyeSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidXJiYW5fcG9wdWxhdGlvblwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlVyYmFuIFBvcHVsYXRpb24gKGhpZ2gpXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwZXJjZW50YWdlIG9mIHBlb3BsZSB3aG8gbGl2ZSBpbiBhIGNpdHkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZm9yZXN0X2FyZWFfcGVyY2VudFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkZvcmVzdCBBcmVhXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSB0b3RhbCBhbW91bnQgb2YgZm9yZXN0IGFyZWEgaW4gYSBjb3VudHJ5IChpbiBrbcKyKVwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICAvLyBFRFVDQVRJT04gQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1lZHVjYXRpb25cIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImVkdWNhdGlvbl9leHBlbmRpdHVyZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkVkdWNhdGlvbiBFeHBlbmRpdHVyZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkVkdWNhdGlvbiBleHBlbmRpdHVyZSByZXByZXNlbnRzIGdvdmVybm1lbnQgc3BlbmRpbmcgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiY28yX2VtaXNzaW9uc1wiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkNPMiBFbWlzc2lvbnNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ08yIGVtaXNzaW9ucyBpbiBtZXRyaWMgdG9ucyBwZXIgcGVyc29uIHBlciB5ZWFyLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImNvcnJ1cHRpb25faW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJDb3JydXB0aW9uIEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQ29ycnVwdGlvbiBQZXJjZXB0aW9ucyBJbmRleCAoQ1BJKS4gKFNjYWxlOiAwLTEwMDsgMCA9IGhpZ2ggY29ycnVwdGlvbi4gMTAwID0gbG93IGNvcnJ1cHRpb24pLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhhcHBpbmVzc19pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkhhcHBpbmVzcyBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkJhc2VkIG9uIGZhY3RvcnMgc3VjaCBhcyBHRFAgcGVyIGNhcGl0YSwgc29jaWFsIHN1cHBvcnQsIGxpZmUgZXhwZWN0YW5jeS4gVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoYXBwaWVyIHRoZSBjb3VudHJ5LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhkaVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkh1bWFuIERldmVsb3BtZW50IEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiSW5kaWNhdG9yIG9mIGxpZmUgZXhwZWN0YW5jeSwgZWR1Y2F0aW9uLCBhbmQgcGVyIGNhcGl0YSBpbmNvbWUuIChTY2FsZTogMC0xOyAwID0gbG93IHNjb3JlLiAxID0gaGlnaCBzY29yZSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGVhbHRoX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGVhbHRoIEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlB1YmxpYyBzcGVuZGluZyBvbiBoZWFsdGgsIG1lYXN1cmVkIGluICUgb2YgR0RQLlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICAvLyBWSVNJVE9SIFZJU0EgQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi12aXNpdC12aXNhXCIsXG4gICAgc3RhdHM6IFtcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoYXBwaW5lc3NfaW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIYXBwaW5lc3MgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJCYXNlZCBvbiBmYWN0b3JzIHN1Y2ggYXMgR0RQIHBlciBjYXBpdGEsIHNvY2lhbCBzdXBwb3J0LCBsaWZlIGV4cGVjdGFuY3kuIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgaGFwcGllciB0aGUgY291bnRyeS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZWFsdGhfZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIZWFsdGggRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIHNwZW5kaW5nIG9uIGhlYWx0aCwgbWVhc3VyZWQgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidG91cmlzdF9hcnJpdmFsc1wiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlRvdXJpc3QgQXJyaXZhbHNcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJSZXByZXNlbnRzIGZvcmVpZ24gY2l0aXplbnMgdGhhdCBzdGF5ZWQgYXQgbGVhc3Qgb25lIG5pZ2h0LiBJbmNsdWRlcyBob3RlbCBzdGF5cywgdHJhbnNmZXJzLCBjb25mZXJlbmNlIHZpc2l0cywgZXRjLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImRlbnNpdHlcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJQb3B1bGF0aW9uIERlbnNpdHkgKGxvdylcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHBvcHVsYXRpb24gZGVuc2l0eSBpcyBtZWFzdXJlZCBpbiBwZXIga23Csi5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJjbzJfZW1pc3Npb25zXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiQ08yIEVtaXNzaW9uc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDTzIgZW1pc3Npb25zIGluIG1ldHJpYyB0b25zIHBlciBwZXJzb24gcGVyIHllYXIuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaW5mbGF0aW9uXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSW5mbGF0aW9uXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhbm51YWwgY2hhbmdlIG9mIGNvbnN1bWVyIHByaWNlcyAodW5pdDogJSkuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIFdPUktJTkcgSE9MSURBWSBCVVRUT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuICB7XG4gICAgaWQ6IFwiYnV0dG9uLXdvcmstaG9saWRheVwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVuc2l0eVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlBvcHVsYXRpb24gRGVuc2l0eSAobG93KVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgcG9wdWxhdGlvbiBkZW5zaXR5IGlzIG1lYXN1cmVkIGluIHBlciBrbcKyLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcInRvdXJpc3RfYXJyaXZhbHNcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJUb3VyaXN0IEFycml2YWxzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiUmVwcmVzZW50cyBmb3JlaWduIGNpdGl6ZW5zIHRoYXQgc3RheWVkIGF0IGxlYXN0IG9uZSBuaWdodC4gSW5jbHVkZXMgaG90ZWwgc3RheXMsIHRyYW5zZmVycywgY29uZmVyZW5jZSB2aXNpdHMsIGV0Yy5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IFwiYnV0dG9uLXBlcm0tc29sb1wiLFxuICAgICAgICBzdGF0OiBcImdpbmlcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJHaW5pIENvZWZmaWNpZW50XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiU3RhdGVzIGhvdyB1bmlmb3JtbHkgYXNzZXRzIGFyZSBkaXN0cmlidXRlZC4gKHNjYWxlOiAwLTEwMDsgMCA9IGVxdWFsIGRpc3RyaWJ1dGlvbi4gMTAwID0gdW5lcXVhbCBkaXN0cmlidXRpb24pLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhhcHBpbmVzc19pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkhhcHBpbmVzcyBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkJhc2VkIG9uIGZhY3RvcnMgc3VjaCBhcyBHRFAgcGVyIGNhcGl0YSwgc29jaWFsIHN1cHBvcnQsIGxpZmUgZXhwZWN0YW5jeS4gVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoYXBwaWVyIHRoZSBjb3VudHJ5LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImpvYmxlc3NfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkpvYmxlc3MgUmF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgdW5lbXBsb3llZCBwZW9wbGUgaW4gcmVsYXRpb24gdG8gdGhlIGxhYm9yIGZvcmNlIGZvciBhIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibWVkaWFud2FnZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIk1lZGlhbiBXYWdlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQSBtZWFzdXJlIG9mIHRoZSBtb250aGx5IG1lZGlhbiB3YWdlIGJlZm9yZSB0YXhlcywgaW5jbHVkaW5nIHB1YmxpYyBiZW5lZml0cyAoZS5nIGNoaWxkIGFsbG93YW5jZSk7IHVuaXQ6IFVTRC5cIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgLy8gUEVSTUFORU5ULVNPTE8gQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1wZXJtLXNvbG9cIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImhkaVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkh1bWFuIERldmVsb3BtZW50IEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiSW5kaWNhdG9yIG9mIGxpZmUgZXhwZWN0YW5jeSwgZWR1Y2F0aW9uLCBhbmQgcGVyIGNhcGl0YSBpbmNvbWUuIChTY2FsZTogMC0xOyAwID0gbG93IHNjb3JlLiAxID0gaGlnaCBzY29yZSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiY29ycnVwdGlvbl9pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkNvcnJ1cHRpb24gSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJDb3JydXB0aW9uIFBlcmNlcHRpb25zIEluZGV4IChDUEkpLiAoU2NhbGU6IDAtMTAwOyAwID0gaGlnaCBjb3JydXB0aW9uLiAxMDAgPSBsb3cgY29ycnVwdGlvbikuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibWVkaWFud2FnZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIk1lZGlhbiBXYWdlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQSBtZWFzdXJlIG9mIHRoZSBtb250aGx5IG1lZGlhbiB3YWdlIGJlZm9yZSB0YXhlcywgaW5jbHVkaW5nIHB1YmxpYyBiZW5lZml0cyAoZS5nIGNoaWxkIGFsbG93YW5jZSk7IHVuaXQ6IFVTRC5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJpbmZsYXRpb25cIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJJbmZsYXRpb25cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIGFubnVhbCBjaGFuZ2Ugb2YgY29uc3VtZXIgcHJpY2VzICh1bml0OiAlKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZWFsdGhfZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIZWFsdGggRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIHNwZW5kaW5nIG9uIGhlYWx0aCwgbWVhc3VyZWQgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidXJiYW5fcG9wdWxhdGlvblwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlVyYmFuIFBvcHVsYXRpb24gKGhpZ2gpXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwZXJjZW50YWdlIG9mIHBlb3BsZSB3aG8gbGl2ZSBpbiBhIGNpdHkuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIFBFUk1BTkVOVC1DT1VQTEUgQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1wZXJtLWNvdXBsZVwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGRpXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSHVtYW4gRGV2ZWxvcG1lbnQgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJJbmRpY2F0b3Igb2YgbGlmZSBleHBlY3RhbmN5LCBlZHVjYXRpb24sIGFuZCBwZXIgY2FwaXRhIGluY29tZS4gKFNjYWxlOiAwLTE7IDAgPSBsb3cgc2NvcmUuIDEgPSBoaWdoIHNjb3JlKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJqb2JsZXNzX3JhdGVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJKb2JsZXNzIFJhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJUaGUgbnVtYmVyIG9mIHVuZW1wbG95ZWQgcGVvcGxlIGluIHJlbGF0aW9uIHRvIHRoZSBsYWJvciBmb3JjZSBmb3IgYSBjb3VudHJ5LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogXCJidXR0b24tcGVybS1zb2xvXCIsXG4gICAgICAgIHN0YXQ6IFwiZ2luaVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkdpbmkgQ29lZmZpY2llbnRcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJTdGF0ZXMgaG93IHVuaWZvcm1seSBhc3NldHMgYXJlIGRpc3RyaWJ1dGVkLiAoc2NhbGU6IDAtMTAwOyAwID0gZXF1YWwgZGlzdHJpYnV0aW9uLiAxMDAgPSB1bmVxdWFsIGRpc3RyaWJ1dGlvbikuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGFwcGluZXNzX2luZGV4XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGFwcGluZXNzIEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQmFzZWQgb24gZmFjdG9ycyBzdWNoIGFzIEdEUCBwZXIgY2FwaXRhLCBzb2NpYWwgc3VwcG9ydCwgbGlmZSBleHBlY3RhbmN5LiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGhhcHBpZXIgdGhlIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVhdGhfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlJhdGUgb2YgRGVhdGhzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhdmVyYWdlIG51bWJlciBvZiBkZWF0aHMgcGVyIHllYXIgcGVyIDEsMDAwIHBlb3BsZS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJkZWJ0c19wZXJjZW50XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiR292ZXJubWVudCBEZWJ0XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiVGhlIHBlcmNlbnRhZ2Ugb2YgZ292ZXJubWVudCBib3Jyb3dpbmdzIGluIHJlbGF0aW9uIHRvIHRoZSBHRFAuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIFBFUk1BTkVOVC1GQU1JTFkgQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1wZXJtLWZhbWlseVwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZWR1Y2F0aW9uX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiRWR1Y2F0aW9uIEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiRWR1Y2F0aW9uIGV4cGVuZGl0dXJlIHJlcHJlc2VudHMgZ292ZXJubWVudCBzcGVuZGluZyBpbiAlIG9mIEdEUC5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZWFsdGhfZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIZWFsdGggRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIHNwZW5kaW5nIG9uIGhlYWx0aCwgbWVhc3VyZWQgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibGl0ZXJhY3lfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkxpdGVyYWN5IFJhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJUaGUgcGVyY2VudGFnZSBvZiBwZW9wbGUgdGhhdCBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlYWQgYW5kIHdyaXRlIGJ5IGFnZSAxNS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJsaWZlX2V4cGVjdGFuY3lcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJMaWZlIEV4cGVjdGFuY3lcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJUaGUgYXZlcmFnZSBudW1iZXIgb2YgeWVhcnMgYSBwZXJzb24gd2lsbCBsaXZlIChhdCBiaXJ0aCkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVhdGhfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlJhdGUgb2YgRGVhdGhzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhdmVyYWdlIG51bWJlciBvZiBkZWF0aHMgcGVyIHllYXIgcGVyIDEsMDAwIHBlb3BsZS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJtZWRpYW53YWdlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiTWVkaWFuIFdhZ2VcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJBIG1lYXN1cmUgb2YgdGhlIG1vbnRobHkgbWVkaWFuIHdhZ2UgYmVmb3JlIHRheGVzLCBpbmNsdWRpbmcgcHVibGljIGJlbmVmaXRzIChlLmcgY2hpbGQgYWxsb3dhbmNlKTsgdW5pdDogVVNELlwiXG4gICAgICB9XG4gICAgXVxuICB9XG5dO1xuXG4vKiAwLiBHRVQgU1RBUlRFRCAqL1xudHJhdmVsQXBwLmdldFN0YXJ0ZWQgPSAoKSA9PiB7XG4gIC8vIExpc3RlbnMgZm9yIGNsaWNrIG9uIEdFVCBTVEFSVEVEIEJVVFRPTlxuICAkKFwiLndlbGNvbWVfX2J1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFNtb290aCBzY3JvbGwgdG8gbmV4dCBzZWN0aW9uXG4gICAgJChcImh0bWwsIGJvZHlcIilcbiAgICAgIC5zdG9wKClcbiAgICAgIC5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkKFwiLnB1cnBvc2Utc2VjdGlvblwiKS5vZmZzZXQoKS50b3AgfSwgOTAwLCBcInN3aW5nXCIpO1xuICB9KTtcbn07XG5cbi8qIDEuIEdFVCBVU0VSIElOUFVUICovXG50cmF2ZWxBcHAuZ2V0VXNlclB1cnBvc2UgPSAoKSA9PiB7XG4gICQoXCIudHJhdmVsLWZvcm1fX2J1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFN0b3JlIHVzZXIgaW5wdXQgaW4gdmFyaWFibGVcbiAgICBjb25zdCBpbnB1dElEID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgdHJhdmVsQXBwLnVzZXJQdXJwb3NlID0gaW5wdXRJRDtcblxuICAgIC8vIENhbGwgdGhlIGRpc3BsYXkgc3RhdHMgZnVuY3Rpb25cbiAgICB0cmF2ZWxBcHAuZGlzcGxheVN0YXRzKHRyYXZlbEFwcC51c2VyUHVycG9zZSk7XG5cbiAgICAvLyBEaXNwbGF5IHRoZSBjcml0ZXJpYXMgdG8gYmUgY2hvc2VuXG4gICAgJChcIi5jcml0ZXJpYXNcIikuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIik7XG5cbiAgICAvLyBTbW9vdGggU2Nyb2xsIHRvIGNyaXRlcmlhJ3Mgc2VjdGlvblxuICAgICQoXCJodG1sLCBib2R5XCIpXG4gICAgICAuc3RvcCgpXG4gICAgICAuYW5pbWF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvcDogJChcIi5jcml0ZXJpYXNcIikub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sXG4gICAgICAgIDkwMCxcbiAgICAgICAgXCJzd2luZ1wiXG4gICAgICApO1xuICB9KTtcbn07XG5cbi8qIDIuIERJU1BMQVkgQUxMIFNUQVRTIEZPUiBUSEUgU0VMRUNURUQgUFVSUE9TRSBPTiBTQ1JFRU4gKi9cbnRyYXZlbEFwcC5kaXNwbGF5U3RhdHMgPSBwdXJwb3NlSUQgPT4ge1xuICAkKFwiLmNob2ljZXNcIikuZW1wdHkoKTtcbiAgLy8gSGVhZGVyIGZvciB0aGUgY2hvb3NlIENyaXRlcmlhIHNlY3Rpb25cbiAgJChcIi5jcml0ZXJpYS1oZWFkZXJcIikudGV4dChcbiAgICBcIlBsZWFzZSByYW5rIHRoZSBmb2xsb3dpbmcgY3JpdGVyaWEgaW4gb3JkZXIgb2YgaW1wb3J0YW5jZSBmcm9tIHRvcCB0byBib3R0b20uIFVzZSB5b3VyIGN1cnNvciB0byBkcmFnIGFuZCBkcm9wIHRoZSBpdGVtcy5cIlxuICApO1xuICAvLyBBZGQgY3NzIHBvc2l0aW9uIHRvIGNyaXRlcmlhIGNvbnRhaW5lclxuICAkKFwiLmNob2ljZXMtbGlzdC1jb250YWluZXJcIikuY3NzKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKTtcblxuICAvLyBHbyB0aHJvdWdoIGVhY2ggcHVycG9zZSBvYmplY3QgaW4gdGhlIFN0YXQgQXJyYXlcbiAgdHJhdmVsQXBwLnN0YXRBcnJheS5mb3JFYWNoKHB1cnBvc2VPYmogPT4ge1xuICAgIC8vIElmIHRoZSBwdXJwb3NlIElEIG1hdGNoZXMgdGhlIHB1cnBvc2UgT2JqZWN0IGlkXG4gICAgaWYgKHB1cnBvc2VJRCA9PT0gcHVycG9zZU9iai5pZCkge1xuICAgICAgLy8gR28gdGhyb3VnaCBldmVyeSBzdGF0IGZvciB0aGlzIHB1cnBvc2VcbiAgICAgIHB1cnBvc2VPYmouc3RhdHMuZm9yRWFjaChzdGF0ID0+IHtcbiAgICAgICAgLy8gQXBwZW5kIGVhY2ggb2YgdGhlIHN0YXQgbmFtZSBvbiBzY3JlZW4gZm9yIHRoZSB1c2VyIHRvIHJhbmtcbiAgICAgICAgbGV0IG1hcmtVcEl0ZW0gPSAkKFwiPGxpPlwiKVxuICAgICAgICAgIC5hdHRyKFwiaWRcIiwgc3RhdC5zdGF0KVxuICAgICAgICAgIC5hZGRDbGFzcyhcImNyaXRlcmlhXCIpXG4gICAgICAgICAgLnRleHQoc3RhdC5zdGF0TmFtZSk7XG4gICAgICAgICQoXCIuY2hvaWNlc1wiKS5hcHBlbmQobWFya1VwSXRlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGFwcGVuZCBzdWJtaXQgYnV0dG9uXG4gIGxldCBtYXJrVXBCdXR0b24gPSBgPGxpPjxidXR0b24gY2xhc3M9XCJ1c2VyLXN1Ym1pdCBidG5cIj5TdWJtaXQgUmFua2luZzwvYnV0dG9uPjwvbGk+YDtcbiAgJChcIi5jaG9pY2VzXCIpLmFwcGVuZChtYXJrVXBCdXR0b24pO1xuXG4gIHRyYXZlbEFwcC5nZXRVc2VyUmFua2luZ3MoKTtcbn07XG5cbi8qIDMuIE9CVEFJTiBUSEUgUkFOS0lORyBPRiBUSEUgU1RBVFMgRlJPTSBVU0VSICovXG50cmF2ZWxBcHAuZ2V0VXNlclJhbmtpbmdzID0gKCkgPT4ge1xuICAkKFwiLmNob2ljZXNcIikub24oXCJjbGlja1wiLCBcIi51c2VyLXN1Ym1pdFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyByZW1vdmUgc3VibWl0IGJ1dHRvbiBhbmQgcHV0IGEgbG9hZGVyIHVudGlsIHRoZSByZXN1bHRzIGNvbWUgYmFja1xuICAgIC8vIC5odG1sKGA8aW1nIGNsYXNzPVwibG9hZGVyXCIgc3JjPVwiLi4vLi4vYXNzZXRzL3NwaW5uZXItMXMtMTAwcHguc3ZnXCI+YCk7XG4gICAgJChcIi5jaG9pY2VzXCIpLmZpbmQoXG4gICAgICBcImxpOmxhc3QtY2hpbGRcIlxuICAgICkuaHRtbChgPHN2ZyBjbGFzcz1cImxkcy1zcGlubmVyIGxvYWRlclwiIHdpZHRoPVwiMTAwcHhcIiAgaGVpZ2h0PVwiMTAwcHhcIiAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZFwiIHN0eWxlPVwiYmFja2dyb3VuZDogbm9uZTtcIj48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoMCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjkxNjY2NjY2NjY2NjY2NjZzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDMwIDUwIDUwKVwiPlxuICA8cmVjdCB4PVwiNDdcIiB5PVwiMjRcIiByeD1cIjkuNFwiIHJ5PVwiNC44XCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMTJcIiBmaWxsPVwiI2E1YjQ1MlwiPlxuICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJvcGFjaXR5XCIgdmFsdWVzPVwiMTswXCIga2V5VGltZXM9XCIwOzFcIiBkdXI9XCIxc1wiIGJlZ2luPVwiLTAuODMzMzMzMzMzMzMzMzMzNHNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoNjAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC43NXNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoOTAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC42NjY2NjY2NjY2NjY2NjY2c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgxMjAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC41ODMzMzMzMzMzMzMzMzM0c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgxNTAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC41c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC40MTY2NjY2NjY2NjY2NjY3c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgyMTAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC4zMzMzMzMzMzMzMzMzMzMzc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgyNDAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC4yNXNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoMjcwIDUwIDUwKVwiPlxuICA8cmVjdCB4PVwiNDdcIiB5PVwiMjRcIiByeD1cIjkuNFwiIHJ5PVwiNC44XCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMTJcIiBmaWxsPVwiI2E1YjQ1MlwiPlxuICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJvcGFjaXR5XCIgdmFsdWVzPVwiMTswXCIga2V5VGltZXM9XCIwOzFcIiBkdXI9XCIxc1wiIGJlZ2luPVwiLTAuMTY2NjY2NjY2NjY2NjY2NjZzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDMwMCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNhNWI0NTJcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjA4MzMzMzMzMzMzMzMzMzMzc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgzMzAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjYTViNDUyXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCIwc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjwvc3ZnPmApO1xuXG4gICAgLy8gZ2V0IHRoZSB1c2VyIHJhbmtpbmdzIGZyb20gaGlzIG9yZGVyaW5nIG9mIHN0YXRzIGFuZCBzdG9yZSBpbiBhIHZhcmlhYmxlXG4gICAgbGV0IHVzZXJSYW5raW5ncyA9ICQoXCIuY2hvaWNlc1wiKVswXS5jaGlsZHJlbjtcblxuICAgIC8vIGluaXRpYWxpemUgYW4gZW1wdHkgYXJyYXkgdG8gc3RvcmUgdGhlIHRvcCAzIHJhbmtpbmdzXG4gICAgbGV0IHN0YXRzRm9yQVBJQ2FsbCA9IFtdO1xuXG4gICAgLy8gZ2V0IGZpcnN0IHRvcCAzIHJhbmtpbmdzIChzdGF0cyBpbiAxc3QsIDJuZCBhbmQgM3JkIHBvc2l0aW9ucylcbiAgICAvLyBhbmQgc3RvcmUgdGhlbSBpbnNpZGUgYW4gYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgc3RhdHNGb3JBUElDYWxsLnB1c2godXNlclJhbmtpbmdzW2ldLmlkKTtcbiAgICB9XG5cbiAgICAvLyBJTklUSUFMSVpFIEFMTCBHTE9CQUwgVkFSSUFCTEVTIEZPUiBESVNQTEFZIEFUIFRIRSBFTkRcbiAgICB0cmF2ZWxBcHAud2lraUV4dHJhY3QgPSBbXTtcbiAgICB0cmF2ZWxBcHAuc3RhdE5hbWVzQXJyYXkgPSBbXTtcbiAgICB0cmF2ZWxBcHAuc3RhdERlc2NyaXB0aW9uQXJyYXkgPSBbXTtcbiAgICB0cmF2ZWxBcHAuc3RhdENvZGVBcnJheSA9IFtdO1xuICAgIHRyYXZlbEFwcC53aWtpUHJvbWlzZUFycmF5ID0gW107XG4gICAgdHJhdmVsQXBwLnBpeGFQcm9taXNlQXJyYXkgPSBbXTtcbiAgICB0cmF2ZWxBcHAuaW1hZ2VBcnJheSA9IFtdO1xuICAgIHRyYXZlbEFwcC5pbWFnZVRleHRBcnJheSA9IFtdO1xuXG4gICAgdHJhdmVsQXBwLmdldFN0YXQoLi4uc3RhdHNGb3JBUElDYWxsKTtcbiAgfSk7XG59O1xuXG4vKiA0LiBTRU5EIEFKQVggUkVRVUVTVCBUTyBJTlFTVEFUUyBBUEkgKi9cblxuLy8gU3RvcmUgaW1wb3J0YW50IGluZm8gZm9yIGNhbGxzIHRvIHRoZSBJTlFTdGF0cyBBUEkuXG50cmF2ZWxBcHAuc3RhdEtleSA9IFwiNWQzNjg3YzdjMTc4OGQ1ZlwiO1xudHJhdmVsQXBwLnN0YXRVUkwgPSBcImh0dHA6Ly9pbnFzdGF0c2FwaS5pbnF1YnUuY29tXCI7XG50cmF2ZWxBcHAuZ2V0U3RhdCA9IChzdGF0VHlwZTEsIHN0YXRUeXBlMiwgc3RhdFR5cGUzKSA9PiB7XG4gICQuYWpheCh7XG4gICAgdXJsOiB0cmF2ZWxBcHAuc3RhdFVSTCxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIGRhdGE6IHtcbiAgICAgIGFwaV9rZXk6IHRyYXZlbEFwcC5zdGF0S2V5LFxuICAgICAgZGF0YTogYGhkaSwke3N0YXRUeXBlMX0sJHtzdGF0VHlwZTJ9LCR7c3RhdFR5cGUzfWAsXG4gICAgICBjbWQ6IFwiZ2V0V29ybGREYXRhXCJcbiAgICB9XG4gIH0pLnRoZW4ocmVzID0+IHtcbiAgICAvLyBjYWxsaW5nIHRoZSBjYWxjdWxhdGlvbiBmdW5jdGlvbiB0byBnZXQgdGhlIHRvcCBuIC8gYm90dG9tIG4gY291bnRyaWVzXG5cbiAgICAvL2ZpbmFsUmVzdWx0cyBob2xkcyB0aGUgZmluYWwgMyBjb3V0cmllcyBhbmQgYWxsIG9mIHRoZWlyIHN0YXRzXG4gICAgbGV0IGZpbmFsUmVzdWx0cyA9IHRyYXZlbEFwcC5nZXRSZWNvbW1lbmRhdGlvbnMoXG4gICAgICByZXMsXG4gICAgICBzdGF0VHlwZTEsXG4gICAgICBzdGF0VHlwZTIsXG4gICAgICBzdGF0VHlwZTNcbiAgICApO1xuXG4gICAgLy8gR2V0IHdpa2kgYW5kIHBpeGEgZXh0cmFjdHMgZm9yIGVhY2ggY291bnRyeVxuICAgIGZpbmFsUmVzdWx0cy5mb3JFYWNoKGNvdW50cnlPYmogPT4ge1xuICAgICAgLy8gZ2V0IHdpa2kgZXh0cmFjdHMgYW5kIHB1dCBwcm9taXNlcyBpbnRvIGFycmF5XG4gICAgICB0cmF2ZWxBcHAud2lraVByb21pc2VBcnJheS5wdXNoKFxuICAgICAgICB0cmF2ZWxBcHAuZ2V0V2lraShjb3VudHJ5T2JqLmNvdW50cnlOYW1lKVxuICAgICAgKTtcblxuICAgICAgLy8gZ2V0IHBpeGEgZXh0cmFjdHMgYW5kIHB1dCBwcm9taXNlcyBpbnRvIGFycmF5XG4gICAgICB0cmF2ZWxBcHAucGl4YVByb21pc2VBcnJheS5wdXNoKFxuICAgICAgICB0cmF2ZWxBcHAuZ2V0UGl4YShjb3VudHJ5T2JqLmNvdW50cnlOYW1lKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIHdoZW4gYWxsIHdpa2kgYW5kIHBpeGEgcHJvbWlzZXMgYXJlIGZ1bGZpbGxlZCwgc3RvcmUgdGhlIHJlc3VsdHNcbiAgICAvLyB0byBwcmVwYXJlIHRoZW0gZm9yIGRpc3BsYXlcbiAgICAkLndoZW4oLi4udHJhdmVsQXBwLndpa2lQcm9taXNlQXJyYXksIC4uLnRyYXZlbEFwcC5waXhhUHJvbWlzZUFycmF5KS50aGVuKFxuICAgICAgKC4uLndpa2lQaXhhUmVzdWx0cykgPT4ge1xuICAgICAgICAvLyBnbyB0aHJvdWdoIHRoZSB3aWtpUGl4YSByZXN1bHRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lraVBpeGFSZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gZmlyc3QgdGhyZWUgYXJlIHdpa2ksIHB1c2ggKHN0b3JlKSBpbnRvIGFycmF5XG4gICAgICAgICAgaWYgKGkgPCAzKSB7XG4gICAgICAgICAgICB0cmF2ZWxBcHAuc3RvcmVXaWtpKHdpa2lQaXhhUmVzdWx0c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGxhc3QgdGhyZWUgYXJlIHBpeGEsIHB1c2ggKHN0b3JlKSBpbnRvIGFycmF5XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmF2ZWxBcHAuc3RvcmVQaXhhKHdpa2lQaXhhUmVzdWx0c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25jZSByZXN1bHRzIGFsbCBzdG9yZWQsIGRpc3BsYXkgYWxsIGluZm8gb24gc2NyZWVuICgzIGNvdW50cmllcywgd2lraSBhbmQgcGl4YSlcbiAgICAgICAgdHJhdmVsQXBwLmRpc3BsYXlEZXN0aW5hdGlvbnMoZmluYWxSZXN1bHRzLCBbXG4gICAgICAgICAgc3RhdFR5cGUxLFxuICAgICAgICAgIHN0YXRUeXBlMixcbiAgICAgICAgICBzdGF0VHlwZTNcbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgKTtcbiAgfSk7XG59O1xuXG4vKiA1LiBTVEFSVCBDQUxDVUxBVElPTiBGT1IgMyBSRUNPTU1FTkRFRCBDT1VOVFJJRVMgKi9cbnRyYXZlbEFwcC5nZXRSZWNvbW1lbmRhdGlvbnMgPSAocmVzLCBzdGF0VHlwZTEsIHN0YXRUeXBlMiwgc3RhdFR5cGUzKSA9PiB7XG4gIC8vIEZpbmQgZGlyZWN0aW9uIG9mIGVhY2ggc3RhdCB0eXBlIGFuZCByZXR1cm4gaXQgaW4gYW4gYXJyYXlcbiAgbGV0IGFyckRpcmVjdGlvbnMgPSB0cmF2ZWxBcHAuZmluZERpcmVjdGlvbnMoc3RhdFR5cGUxLCBzdGF0VHlwZTIsIHN0YXRUeXBlMyk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBhcnJheXMgYW5kIG51bWJlcnMgZm9yIGVhY2ggcm91bmQgb2YgaXRlcmF0aW9uL2ZpbHRlcmluZ1xuICBsZXQgaW5pdGlhbEFyciA9IFtdO1xuICBsZXQgYXJyMSA9IFtdO1xuICBsZXQgYXJyMiA9IFtdO1xuICBsZXQgYXJyMyA9IFtdO1xuICBsZXQgaW5pdGlhbEl0ZXIgPSA2MDtcbiAgbGV0IGl0ZXJhdGlvbjEgPSAxMDtcbiAgbGV0IGl0ZXJhdGlvbjIgPSA1O1xuICBsZXQgaXRlcmF0aW9uMyA9IDM7XG5cbiAgLy9Jbml0aWFsIGZpbHRlciB0byBhY2NvdW50IGZvciByZWFsaXN0aWMgcmVzdWx0cyAoYmFzZWQgb24gSERJKVxuICBpbml0aWFsQXJyID0gdHJhdmVsQXBwLmRldGVybWluZVJlc3VsdHMocmVzLCBcImhkaVwiLCBcIm1heFwiLCBpbml0aWFsSXRlcik7XG5cbiAgLy8gSVRFUkFUSU9OIDFcbiAgYXJyMSA9IHRyYXZlbEFwcC5kZXRlcm1pbmVSZXN1bHRzKFxuICAgIGluaXRpYWxBcnIsXG4gICAgc3RhdFR5cGUxLFxuICAgIGFyckRpcmVjdGlvbnNbMF0sXG4gICAgaXRlcmF0aW9uMVxuICApO1xuXG4gIC8vIElURVJBVElPTiAyXG4gIGFycjIgPSB0cmF2ZWxBcHAuZGV0ZXJtaW5lUmVzdWx0cyhcbiAgICBhcnIxLFxuICAgIHN0YXRUeXBlMixcbiAgICBhcnJEaXJlY3Rpb25zWzFdLFxuICAgIGl0ZXJhdGlvbjJcbiAgKTtcblxuICAvLyBJVEVSQVRJT04gM1xuICBhcnIzID0gdHJhdmVsQXBwLmRldGVybWluZVJlc3VsdHMoXG4gICAgYXJyMixcbiAgICBzdGF0VHlwZTMsXG4gICAgYXJyRGlyZWN0aW9uc1syXSxcbiAgICBpdGVyYXRpb24zXG4gICk7XG5cbiAgLy8gcmV0dXJuIHRoZSBhcnJheSB3aXRoIHRoZSBmaW5hbCByZXN1bHRzXG4gIHJldHVybiBhcnIzO1xufTtcblxuLyogNS4xIEZJTkQgTUlOL01BWCBGT1IgRUFDSCBTVEFUIFRZUEUgKi9cbnRyYXZlbEFwcC5maW5kRGlyZWN0aW9ucyA9IChzdGF0VHlwZTEsIHN0YXRUeXBlMiwgc3RhdFR5cGUzKSA9PiB7XG4gIC8vIEZpbmQgd2hldGhlciBlYWNoIHN0YXR0eXBlIGlzIG1heCBvciBtaW5cbiAgbGV0IHN0YXQxRGlyZWN0aW9uID0gXCJcIjtcbiAgbGV0IHN0YXQyRGlyZWN0aW9uID0gXCJcIjtcbiAgbGV0IHN0YXQzRGlyZWN0aW9uID0gXCJcIjtcblxuICAvLyBMb29wIHRocm91Z2ggdGhlIFN0YXQgQXJyYXkgdG8gZmluZCBkaXJlY3Rpb24gb2Ygc3RhdHR5cGVzXG4gIHRyYXZlbEFwcC5zdGF0QXJyYXkuZm9yRWFjaChwdXJwb3NlID0+IHtcbiAgICAvLyBpZiB0aGUgY3VycmVudCBwdXJwb3NlIG1hdGNoZXMgdGhlIHVzZXIgcHVycG9zZSxcbiAgICBpZiAocHVycG9zZS5pZCA9PT0gdHJhdmVsQXBwLnVzZXJQdXJwb3NlKSB7XG4gICAgICAvLyBnbyB0aHJvdWdoIHRoZSBzdGF0cyBhcnJheSBvZiB0aGF0IHB1cnBvc2Ugb2JqZWN0XG4gICAgICBwdXJwb3NlLnN0YXRzLmZvckVhY2goc3RhdCA9PiB7XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHN0YXQgaW4gdGhlIHN0YXRzIGFycmF5IGlzIHN0YXR0eXBlMSwgZ2V0IHRoaXMgZGlyZWN0aW9uXG4gICAgICAgIGlmIChzdGF0LnN0YXQgPT09IHN0YXRUeXBlMSkge1xuICAgICAgICAgIHN0YXQxRGlyZWN0aW9uID0gc3RhdC5kaXJlY3Rpb247XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXRDb2RlQXJyYXkucHVzaChzdGF0LnN0YXQpO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0TmFtZXNBcnJheS5wdXNoKHN0YXQuc3RhdE5hbWUpO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0RGVzY3JpcHRpb25BcnJheS5wdXNoKHN0YXQuZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHN0YXQgaW4gdGhlIHN0YXRzIGFycmF5IGlzIHN0YXR0eXBlMiwgZ2V0IHRoaXMgZGlyZWN0aW9uXG4gICAgICAgIGVsc2UgaWYgKHN0YXQuc3RhdCA9PT0gc3RhdFR5cGUyKSB7XG4gICAgICAgICAgc3RhdDJEaXJlY3Rpb24gPSBzdGF0LmRpcmVjdGlvbjtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdENvZGVBcnJheS5wdXNoKHN0YXQuc3RhdCk7XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXROYW1lc0FycmF5LnB1c2goc3RhdC5zdGF0TmFtZSk7XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXREZXNjcmlwdGlvbkFycmF5LnB1c2goc3RhdC5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgc3RhdCBpbiB0aGUgc3RhdHMgYXJyYXkgaXMgc3RhdHR5cGUzLCBnZXQgdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgZWxzZSBpZiAoc3RhdC5zdGF0ID09PSBzdGF0VHlwZTMpIHtcbiAgICAgICAgICBzdGF0M0RpcmVjdGlvbiA9IHN0YXQuZGlyZWN0aW9uO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0Q29kZUFycmF5LnB1c2goc3RhdC5zdGF0KTtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdE5hbWVzQXJyYXkucHVzaChzdGF0LnN0YXROYW1lKTtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdERlc2NyaXB0aW9uQXJyYXkucHVzaChzdGF0LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gW3N0YXQxRGlyZWN0aW9uLCBzdGF0MkRpcmVjdGlvbiwgc3RhdDNEaXJlY3Rpb25dO1xufTtcblxuLyogNS4yIEZVTkNUSU9OIFRPIERFVEVSTUlORSBXSEVUSEVSIFRIRSBUT1AgT1IgQk9UVE9NIFNDT1JFUyBTSE9VTEQgQkUgRk9VTkQgKi9cbnRyYXZlbEFwcC5kZXRlcm1pbmVSZXN1bHRzID0gKGFycmF5LCBzdGF0VHlwZSwgZGlyZWN0aW9uLCBpdGVyYXRpb25OdW1iZXIpID0+IHtcbiAgbGV0IHJlc3VsdEFycmF5ID0gW107XG4gIC8vIGlmIHdlIHdhbnQgVE9QIG51bWJlcnNcbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJtYXhcIikge1xuICAgIHJlc3VsdEFycmF5ID0gdHJhdmVsQXBwLmRldGVybWluZU5Db3VudHJpZXMoXG4gICAgICBhcnJheSxcbiAgICAgIHN0YXRUeXBlLFxuICAgICAgaXRlcmF0aW9uTnVtYmVyLFxuICAgICAgMVxuICAgICk7XG4gIH1cbiAgLy8gaWYgd2Ugd2FudCBCT1QgbnVtYmVyc1xuICBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwibWluXCIpIHtcbiAgICByZXN1bHRBcnJheSA9IHRyYXZlbEFwcC5kZXRlcm1pbmVOQ291bnRyaWVzKFxuICAgICAgYXJyYXksXG4gICAgICBzdGF0VHlwZSxcbiAgICAgIGl0ZXJhdGlvbk51bWJlcixcbiAgICAgIC0xXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0QXJyYXk7XG59O1xuXG4vKiA1LjMgQ0FMQ1VMQVRFIFRIRSBOIENPVU5UUklFUyAqL1xudHJhdmVsQXBwLmRldGVybWluZU5Db3VudHJpZXMgPSAocmVzdWx0LCBzdGF0VHlwZSwgbiwgZGlyZWN0aW9uKSA9PiB7XG4gIC8vIGluaXRpYWxpemUgYSBoZWFwIGFycmF5IHRvIGtlZXAgdHJhY2sgb2YgdGhlIG4gbGFyZ2VzdC9zbWFsbGVzdCBzdGF0IHNjb3Jlc1xuICBsZXQgaGVhcCA9IG5ldyBNaW5IZWFwKCk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBhIHNlY29uZGFyeSBhcnJheSB0byBrZWVwIHRyYWNrIG9mIHRoZSBuIHNjb3JlcyBBTkRcbiAgLy8gdGhlIGFzc29jaWF0ZWQgY291bnRyeSB0byBlYWNoIHNjb3JlXG4gIGxldCBuQ291bnRyaWVzID0gW107XG5cbiAgLy8gc3RvcmUgdGhlIHN0YXQgdHlwZSBpbnRvIGEgcHJvcGVydHkgdmFyaWFibGUgZm9yIGVhc2llciB1c2VcbiAgbGV0IHByb3BlcnR5ID0gc3RhdFR5cGU7XG5cbiAgLy8gc3RhcnQgYSBjb3VudHJ5IGNvdW50ZXIgYXQgMCBqdXN0IGZvciB0aGUgc2FrZSBvZiBhZGRpbmcgdGhlIGZpcnN0IG4gY291bnRyaWVzIGludG8gdGhlIGhlYXBcbiAgbGV0IGNvdW50cnlDb3VudGVyID0gMDtcblxuICAvLyBnbyB0aHJvdWdoIGVhY2ggY291bnRyeSBmcm9tIHRoZSByZXN1bHRzIG9mIHRoZSBBSkFYIGNhbGwgdG8gSU5RU3RhdHNcbiAgcmVzdWx0Lm1hcChjb3VudHJ5ID0+IHtcbiAgICAvLyBzdG9yZSB0aGUgc3RhdCBzY29yZSBhbmQgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgY291bnRyeSBpbiB2YXJpYWJsZXMuXG4gICAgLy8gSU1QT1JUQU5UOiBtdWx0aXBseSBieSBkaXJlY3Rpb24gdG8gaW1wbGVtZW50IG1heC9taW4gaGVhcFxuICAgIC8vIGEgZGlyZWN0aW9uIG9mIDEgPSB3ZSB3YW50IG1heGltdW0gc2NvcmVzXG4gICAgLy8gYSBkaXJlY3Rpb24gb2YgLTEgPSB3ZSB3YW50IG1pbmltdW0gc2NvcmVzXG4gICAgbGV0IHN0YXQgPSBOdW1iZXIoY291bnRyeVtwcm9wZXJ0eV0pICogZGlyZWN0aW9uO1xuXG4gICAgLy8gaWYgaXQncyB0aGUgZmlyc3QgbiBjb3VudHJpZXMgZnJvbSB0aGUgcmVzdWx0LCBubyB3b3JrIHJlcXVpcmVkLiBKdXN0IGFkZCB0aGVtIGRpcmVjdGx5IGludG8gYm90aCB0aGUgaGVhcCBhbmQgbkNvdW50cmllcyB2YXJpYWJsZXNcbiAgICBpZiAoY291bnRyeUNvdW50ZXIgPCBuKSB7XG4gICAgICBoZWFwLmFkZChzdGF0KTtcbiAgICAgIG5Db3VudHJpZXMucHVzaChjb3VudHJ5KTtcblxuICAgICAgLy8gaW5jcmVtZW50IGNvdW50cnlDb3VudGVyIHRvIGtub3cgd2hlbiB3ZSdyZSBwYXN0IHRoZSBmaXJzdCBuIGNvdW50cmllc1xuICAgICAgY291bnRyeUNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ09ORElUSU9OIFRPIENIRUNLIElGIHRoZSBjdXJyZW50IGNvdW50cnkgc3RhdCBpcyBncmVhdGVyL3NtYWxsZXIgdGhhbiBhbnkgb2YgdGhlIGN1cnJlbnQgc3RhdHMgaW4gdGhlIGN1cnJlbnQgbiBjb3VudHJpZXNcbiAgICAgIGlmIChzdGF0ID4gaGVhcC5wZWVrKCkpIHtcbiAgICAgICAgLy8gaWYgc28sIGZpbmQgdGhlIGxvY2F0aW9uIG9mIHRoZSBzbWFsbGVzdC9sYXJnZXN0IHN0YXQgc2NvcmUgaW4gdGhlIGN1cnJlbnQgbkNvdW50cmllcyBhcnJheSBhbmQgcmVwbGFjZSBpdCB3aXRoIHRoZSBuZXcgc3RhdCBhbmQgaXRzIGFzc29jaWF0ZWQgY291bnRyeVxuICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IG5Db3VudHJpZXMubGVuZ3RoOyBtKyspIHtcbiAgICAgICAgICAvLyBtdWx0aXBseSBieSBkaXJlY3Rpb24gYWdhaW4gdG8gY29tcGFyZSBwcm9wZXJseSB3aXRoIHRoZSBoZWFwXG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGF0ID0gTnVtYmVyKG5Db3VudHJpZXNbbV1bcHJvcGVydHldKSAqIGRpcmVjdGlvbjtcbiAgICAgICAgICBpZiAoY3VycmVudFN0YXQgPT09IGhlYXAucGVlaygpKSB7XG4gICAgICAgICAgICAvLyByZXBsYWNlIGNvdW50cnlcbiAgICAgICAgICAgIG5Db3VudHJpZXMuc3BsaWNlKG0sIDEsIGNvdW50cnkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBzbWFsbGVzdC9sYXJnZXN0IHN0YXQgc2NvcmUgZnJvbSB0aGUgaGVhcCBhcyB3ZWxsXG4gICAgICAgIGhlYXAucG9sbCgpO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgbmV3IHNtYWxsZXN0L2xhcmdlc3Qgc2NvcmUgb250byB0aGUgaGVhcFxuICAgICAgICBoZWFwLmFkZChzdGF0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAvLyByZXR1cm4gbiBjb3VudHJpZXNcbiAgcmV0dXJuIG5Db3VudHJpZXM7XG59O1xuXG4vKiA2LiBTRU5EIEFQSSBSRVFVRVNUUyBUTyBXSUtJIEFORCBQSVhBICovXG5cbi8vIDYuMSBXSUtJUEVESUEgQVBJOiBHRVQgQU5EIFNUT1JFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFN0b3JlIGltcG9ydGFudCBpbmZvIGZvciBjYWxscyB0byB0aGUgV2lraSBBUEkuXG50cmF2ZWxBcHAud2lraVVSTCA9IFwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3cvYXBpLnBocFwiO1xuLy8gR2V0IGluZm8gZnJvbSBXaWtpcGVkaWEgKEFKQVgpXG50cmF2ZWxBcHAuZ2V0V2lraSA9IGNvdW50cnkgPT4ge1xuICAvLyBnZXQgZXh0cmFjdFxuICByZXR1cm4gJC5hamF4KHtcbiAgICB1cmw6IHRyYXZlbEFwcC53aWtpVVJMLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxuICAgIGRhdGE6IHtcbiAgICAgIGFjdGlvbjogXCJxdWVyeVwiLFxuICAgICAgcHJvcDogXCJleHRyYWN0c1wiLFxuICAgICAgdGl0bGVzOiBjb3VudHJ5LFxuICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgIGV4bGltaXQ6IDEsXG4gICAgICBleGNoYXJzOiAyODAsXG4gICAgICBleGludHJvOiB0cnVlLFxuICAgICAgZXhwbGFpbnRleHQ6IHRydWUsXG4gICAgICByZWRpcmVjdHM6IDFcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gU3RvcmUgV2lraXBlZGlhIGNvdW50cnkgZXh0cmFjdFxudHJhdmVsQXBwLnN0b3JlV2lraSA9IHJlc3VsdCA9PiB7XG4gIC8vIFRoaXMgdmFyaWFibGUgc3RvcmVzIHRoZSBvYmplY3QgdGhhdCBob2xkcyBhIGtleSBuYW1lIHVuaXF1ZSB0byBldmVyeSBjb3VudHJ5LiBUaGUgdmFsdWUgb2YgdGhpcyBrZXkgaXMgYW4gb2JqZWN0IHRoYXQgaG9sZHMgdGhlIGV4dGFjdC5cbiAgY29uc3Qgd2lraUV4dHJhY3RPYmplY3QgPSByZXN1bHRbMF0ucXVlcnkucGFnZXM7XG4gIC8vIElmIHdlIGNvbnZlcnQgdGhlIGFib3ZlIG9iamVjdCBpbnRvIGFuIGFycmF5LCB0aGUgZXh0cmFjdCBjYW4gYmUgYWNjZXNzZWQgb24gdGhlIGZpcnN0IHZhbHVlIG9mIHRoZSBhcnJheS4gVGhpcyB2YXJpYWJsZSBob2xkcyB0aGUgd2lraSBleHRyYWN0LlxuICB0cmF2ZWxBcHAud2lraUV4dHJhY3QucHVzaChPYmplY3QudmFsdWVzKHdpa2lFeHRyYWN0T2JqZWN0KVswXS5leHRyYWN0KTtcbn07XG5cbi8vIDYuMiBQSVhBQkFZIEFQSTogR0VUIEFORCBTVE9SRVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU3RvcmUgaW1wb3J0YW50IGluZm8gZm9yIGNhbGxzIHRvIHRoZSBQaXhhYmF5IEFQSS5cbnRyYXZlbEFwcC5waXhhS2V5ID0gXCI5ODc5NTcxLWU0Y2JiZWYzZTY5MmFhMTVhMjRhNzExOWJcIjtcbnRyYXZlbEFwcC5waXhhVVJMID0gXCJodHRwczovL3d3dy5waXhhYmF5LmNvbS9hcGkvXCI7XG4vLyBHZXQgaW5mbyBmcm9tIFdpa2lwZWRpYSAoQUpBWClcbnRyYXZlbEFwcC5nZXRQaXhhID0gY291bnRyeSA9PiB7XG4gIC8vIEdldCBpbWFnZSBVUkxcbiAgcmV0dXJuICQuYWpheCh7XG4gICAgdXJsOiB0cmF2ZWxBcHAucGl4YVVSTCxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgZGF0YVR5cGU6IFwianNvbnBcIixcbiAgICBkYXRhOiB7XG4gICAgICBrZXk6IHRyYXZlbEFwcC5waXhhS2V5LFxuICAgICAgcTogY291bnRyeSxcbiAgICAgIHBlcl9wYWdlOiAxNVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBTdG9yZSBQaXhhYmF5IGNvdW50cnkgaW1hZ2VzIG9uIHRoZSBwYWdlXG50cmF2ZWxBcHAuc3RvcmVQaXhhID0gcmVzdWx0cyA9PiB7XG4gIC8vIFN0b3JlIHRoZSBhcnJheSB0aGF0IGhvbGRzIHRoZSBpbWFnZSBVUkxzIGluIGFuIGFycmF5XG4gIGNvbnN0IHJlc3VsdHNBcnJheSA9IHJlc3VsdHNbMF0uaGl0cztcbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSByZXN1bHRzIGFycmF5IGFuZCBwdXNoIGFsbCBpbWFnZXMgaW50byB0aGUgaW1hZ2VBcnJheVxuICByZXN1bHRzQXJyYXkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAvLyBBcnJheSBvZiBpbWFnZXMgZm9yIGVhY2ggY291bnRyeVxuICAgIHRyYXZlbEFwcC5pbWFnZUFycmF5LnB1c2goaXRlbS5sYXJnZUltYWdlVVJMKTtcbiAgICAvLyBBcnJheSBvZiBpbWFnZSBpbmZvcm1hdGlvbiBmcm9tIGVhY2ggY291bnRyeSB0byBiZSB1c2VkIGZvciBBbHQgdGV4dFxuICAgIHRyYXZlbEFwcC5pbWFnZVRleHRBcnJheS5wdXNoKGl0ZW0udGFncyk7XG4gIH0pO1xufTtcblxuLyogNy4gRElTUExBWSBERVNUSU9OQVRJT05TIE9OIFNDUkVFTiBXSVRIIFdJS0kgKyBQSVhBIFJFU1VMVFMgKi9cbnRyYXZlbEFwcC5kaXNwbGF5RGVzdGluYXRpb25zID0gKHJlc3VsdHMsIHN0YXRDaG9pY2VzKSA9PiB7XG4gIC8vIEdldCByaWQgb2YgcHJldmlvdXMgY2xpY2tlZCByZXN1bHRzXG4gICQoXCIucmVzdWx0c1wiKS5lbXB0eSgpO1xuICAvLyBHbyB0aHJvdWdoIGVhY2ggY291bnRyeSByZXN1bHQgYW5kIGJ1aWxkIHRoZSBzdHJpbmcgbGl0ZXJhbCB0byBhcHBlbmQgdG8gdGhlIHBhZ2VcbiAgbGV0IGNvdW50cnlDb3VudGVyID0gMDtcbiAgbGV0IGltYWdlQ291bnRlciA9IDA7XG4gIHJlc3VsdHMuZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgaG9sZHMgYWxsIGVsZW1lbnRzIGZvciBvbmUgY291bnRyeSByZXN1bHRcbiAgICBsZXQgY291bnRyeUNvbnRhaW5lckVsZW1lbnQgPSAkKFwiPGRpdj5cIilcbiAgICAgIC5hZGRDbGFzcyhcInJlc3VsdC1jb250YWluZXJcIilcbiAgICAgIC8vIGFzc2lnbiByYW5kb20gcGl4YSBpbWFnZSBvZiBjb3VudHJ5IHRvIHRoZSByZXN1bHQgYmFja2dyb3VuZFxuICAgICAgLmNzcyhcbiAgICAgICAgXCJiYWNrZ3JvdW5kLWltYWdlXCIsXG4gICAgICAgIGB1cmwoXCIke1xuICAgICAgICAgIHRyYXZlbEFwcC5pbWFnZUFycmF5W1xuICAgICAgICAgICAgdHJhdmVsQXBwLnJhbmRvbWl6ZShpbWFnZUNvdW50ZXIsIGltYWdlQ291bnRlciArIDE1KVxuICAgICAgICAgIF1cbiAgICAgICAgfVwiKWBcbiAgICAgICk7XG4gICAgLy8gVGhpcyBlbGVtZW50IHdpbGwgaG9sZCBhbGwgdGV4dCBhbmQgaW1hZ2UocykgcmVmZXJyaW5nIHRvIHRoZSBjb3VudHJ5IHJlc3VsdFxuICAgIGxldCBjb3VudHJ5Q2FyZEVsZW1lbnQgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJjYXJkXCIpO1xuICAgIC8vIFRoaXMgZWxlbWVudCBob2xkcyB0aGUgbmFtZSBvZiB0aGUgY291bnRyeVxuICAgIGxldCBjb3VudHJ5TmFtZUVsZW1lbnQgPSAkKFwiPGgyPlwiKVxuICAgICAgLmFkZENsYXNzKFwiY291bnRyeS1uYW1lXCIpXG4gICAgICAudGV4dChgJHtjb3VudHJ5LmNvdW50cnlOYW1lfWApO1xuICAgIC8vIFRoaXMgZWxlbWVudCBob2xkcyB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGNvdW50cnksIHRha2VuIGZyb20gdGhlIHdpa2kgQVBJXG4gICAgbGV0IGNvdW50cnlEZXNjcmlwdGlvbkVsZW1lbnQgPSAkKFwiPHA+XCIpXG4gICAgICAuYWRkQ2xhc3MoXCJ3aWtpLXRleHRcIilcbiAgICAgIC50ZXh0KHRyYXZlbEFwcC53aWtpRXh0cmFjdFtjb3VudHJ5Q291bnRlcl0pO1xuICAgIGNvdW50cnlDb3VudGVyKys7XG4gICAgLy8gVGhpcyBlbGVtZW50IGhvbGRzIHRoZSB0ZXh0IGZvciBlYWNoIG9mIHRoZSB0aHJlZSBzdGF0cyB3ZSdyZSBkaXNwbGF5aW5nXG4gICAgbGV0IHN0YXRMaXN0RWxlbWVudCA9ICQoXCI8dWw+XCIpLmFkZENsYXNzKFwic3RhdC1saXN0XCIpO1xuICAgIC8vIFRoaXMgZWxlbWVudCBob2xkcyB0aGUgY29udGFpbmVyIHRoYXQgd2lsbCBob2xkIHRoZSBzbWFsbCBwaXhhIGNvdW50cnkgaW1hZ2VcbiAgICBsZXQgc21hbGxQaXhhQ29udGFpbmVyRWxlbWVudCA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcbiAgICAgIFwiY291bnRyeS1pbWFnZS1jb250YWluZXJcIlxuICAgICk7XG4gICAgLy8gVGhpcyBuZXcgaW1hZ2UgY291bnRlciBnZXRzIHRoZSBpbWFnZSBpbiB0aGUgYXJyYXkgdGhhdCBmb2xsb3dzIHRoZSBmaXJzdCBpbWFnZSBiZWluZyB1c2VkIGFzIGEgYmFja2dyb3VuZCBpbWFnZSBmb3IgdGhlIGNhcmRcbiAgICAvLyBUaGlzIGltYWdlIGVsZW1lbnQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGUgaW1hZ2UgY29udGFpbmVyXG4gICAgbGV0IHNtYWxsUGl4YUltYWdlID0gJChcIjxpbWc+XCIpXG4gICAgICAuYWRkQ2xhc3MoXCJjb3VudHJ5LWltYWdlXCIpXG4gICAgICAuYXR0cih7XG4gICAgICAgIHNyYzogYCR7XG4gICAgICAgICAgdHJhdmVsQXBwLmltYWdlQXJyYXlbXG4gICAgICAgICAgICB0cmF2ZWxBcHAucmFuZG9taXplKGltYWdlQ291bnRlciwgaW1hZ2VDb3VudGVyICsgMTUpXG4gICAgICAgICAgXVxuICAgICAgICB9YCxcbiAgICAgICAgYWx0OiBgU2NlbmljIGltYWdlIG9mICR7Y291bnRyeS5jb3VudHJ5TmFtZX0uIEltYWdlIHRhZ3MgaW5jbHVkZSAke1xuICAgICAgICAgIHRyYXZlbEFwcC5pbWFnZVRleHRBcnJheVxuICAgICAgICB9LmBcbiAgICAgIH0pO1xuICAgIC8vIEFkZCAxNSB0byB0aGUgaW1hZ2UgY291bnRlciBlbnN1cmVzIHRoYXQgZXZlcnkgaXRlcmF0aW9uIHRocm91Z2ggdGhlIGZvckVhY2ggd2lsbCBhZGQgaW1hZ2VzIHRvIHRoZSBhc3NvY2lhdGVkIGNvdXRyaWVzXG4gICAgaW1hZ2VDb3VudGVyICs9IDE1O1xuICAgIC8vQXBwZW5kIHRoZSBjb3VudHJ5IGltYWdlIHRvIGl0cyBjb250YWluZXJcbiAgICBzbWFsbFBpeGFDb250YWluZXJFbGVtZW50LmFwcGVuZChzbWFsbFBpeGFJbWFnZSk7XG4gICAgLy8gQXBwZW5kIHRoZSBjb3VudHJ5IG5hbWUgPGgyPiwgd2lraSB0ZXh0IDxwPiwgc3RhdCBsaXN0IDx1bD4gYW5kIGltYWdlIGNvbnRhaW5lciA8ZGl2PiB0byB0aGUgY2FyZCA8ZGl2Pi5cbiAgICBjb3VudHJ5Q2FyZEVsZW1lbnQuYXBwZW5kKFxuICAgICAgY291bnRyeU5hbWVFbGVtZW50LFxuICAgICAgY291bnRyeURlc2NyaXB0aW9uRWxlbWVudCxcbiAgICAgIHN0YXRMaXN0RWxlbWVudCxcbiAgICAgIHNtYWxsUGl4YUNvbnRhaW5lckVsZW1lbnRcbiAgICApO1xuICAgIC8vIEFwcGVuZCB0aGUgY2FyZCBkaXYgdG8gdGhlIHJlc3VsdC1jb250YWluZXJcbiAgICBjb3VudHJ5Q29udGFpbmVyRWxlbWVudC5hcHBlbmQoY291bnRyeUNhcmRFbGVtZW50KTtcbiAgICAvL0FwcGVuZCB0aGUgcmVzdWx0LWNvbnRhaW5lciB0byB0aGUgcmVzdWx0cyBzZWN0aW9uIGVsZW1lbnQgb24gb3VyIHBhZ2VcbiAgICAkKFwiLnJlc3VsdHNcIikuYXBwZW5kKGNvdW50cnlDb250YWluZXJFbGVtZW50KTtcblxuICAgIC8vIEdvIHRocm91Z2ggdGhlIGFycmF5IFwic3RhdENob2ljZXNcIiBhbmQgc2V0IHVwIDMgaW5mb3JtYXRpb246XG4gICAgLy8gMS4gdGl0bGUgb2Ygc3RhdCAodGFrZW4gZnJvbSB0cmF2ZWxBcHAuc3RhdE5hbWVzQXJyYXkpXG4gICAgLy8gMi4gdmFsdWUgb2Ygc3RhdCAodGFrZW4gZnJvbSByZXN1bHRzIG9iamVjdClcbiAgICAvLyAzLiBkZXNjcmlwdGlvbiBvZiBzdGF0ICh0YWtlbiBmcm9tIHRyYXZlbEFwcC5zdGF0RGVzY3JpcHRpb25BcnJheSlcbiAgICBsZXQgc3RhdENvdW50ZXIgPSAwO1xuICAgIHN0YXRDaG9pY2VzLmZvckVhY2goc3RhdCA9PiB7XG4gICAgICBsZXQgc3RhdFRpdGxlID0gdHJhdmVsQXBwLnN0YXROYW1lc0FycmF5W3N0YXRDb3VudGVyXTtcbiAgICAgIGxldCBzdGF0VmFsdWUgPSBjb3VudHJ5W3RyYXZlbEFwcC5zdGF0Q29kZUFycmF5W3N0YXRDb3VudGVyXV07XG4gICAgICBsZXQgc3RhdERlc2NyaXB0aW9uID0gdHJhdmVsQXBwLnN0YXREZXNjcmlwdGlvbkFycmF5W3N0YXRDb3VudGVyXTtcbiAgICAgIHN0YXRDb3VudGVyKys7XG4gICAgICAvLyBUaGlzIGxpc3QgaXRlbSBlbGVtZW50IHdpbGwgaG9sZCBzdGF0IGluZm9ybWF0aW9uXG4gICAgICBsZXQgc3RhdExpc3RJdGVtRWxlbWVudCA9ICQoXCI8bGk+XCIpLmFkZENsYXNzKFwic3RhdC1saXN0X19pdGVtXCIpO1xuICAgICAgLy8gVGhpcyBkaXYgd2lsbCBob2xkIHRoZSBzdGF0IHRpdGxlIGFuZCBxdWVzdGlvbiBtYXJrIGljb25cbiAgICAgIGxldCBzdGF0VGl0bGVJY29uQ29udGFpbmVyRWxlbWVudCA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcbiAgICAgICAgXCJzdGF0LWxpc3RfX2l0ZW1fX3RpdGxlLWljb24tY29udGFpbmVyXCJcbiAgICAgICk7XG4gICAgICAvLyBUaGlzIGVsZW1lbnQgaG9sZHMgdGhlIHN0YXQgdGl0bGUgYW5kIHZhbHVlXG4gICAgICBsZXQgc3RhdFRpdGxlRWxlbWVudCA9ICQoXCI8aDQ+XCIpXG4gICAgICAgIC5hZGRDbGFzcyhcInN0YXQtbGlzdF9faXRlbV9fdGl0bGUtaWNvbi1jb250YWluZXJfX3RpdGxlLW51bWJlclwiKVxuICAgICAgICAudGV4dChgJHtzdGF0VGl0bGV9OiAke3RyYXZlbEFwcC5udW1iZXJXaXRoQ29tbWFzKHN0YXRWYWx1ZSl9YCk7XG4gICAgICAvLyBUaGlzIHF1ZXN0aW9uIG1hcmsgaWNvbiB3aWxsIHNpdCBuZXh0IHRvIHRoZSBzdGF0VGl0bGVFbGVtZW50IGFuZCB3aGVuIGNsaWNrZWQvaG92ZXJvdmVyLCB3aWxsIGRpc3BsYXkgdGhlIHN0YXQgZGVzY3JpcHRpb25cbiAgICAgIGxldCBzdGF0SG92ZXJJY29uRWxlbWVudCA9IGA8aSBjbGFzcz1cInN0YXQtbGlzdF9faXRlbV9fdGl0bGUtaWNvbi1jb250YWluZXJfX2ljb24gZmFyIGZhLXF1ZXN0aW9uLWNpcmNsZVwiPjwvaT5gO1xuICAgICAgLy8gYXBwZW5kIHRoZSBzdGF0IHRpdGxlIGFuZCBpY29uIHRvIHRoZSBzdGF0VGl0bGVJY29uQ29udGFpbmVyRWxlbWVudFxuICAgICAgc3RhdFRpdGxlSWNvbkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kKFxuICAgICAgICBzdGF0VGl0bGVFbGVtZW50LFxuICAgICAgICBzdGF0SG92ZXJJY29uRWxlbWVudFxuICAgICAgKTtcbiAgICAgIC8vIFRoaXMgZGl2IHdpbGwgaG9sZCB0aGUgc3RhdCBkZXNjcmlwdGlvbiBhbmQgaXMgYSBzaWJsaW5nIG9mIHRoZSBzdGF0VGl0bGVJY29uQ29udGFpbmVyLlxuICAgICAgbGV0IHN0YXREZXNjcmlwdGlvbkNvbnRhaW5lckVsZW1lbnQgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoXG4gICAgICAgIFwic3RhdC1saXN0X19pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXIgZGlzcGxheS1ub25lXCJcbiAgICAgICk7XG4gICAgICAvLyBUaGlzIGVsZW1lbnQgaG9sZHMgdGhlIHN0YXQgZGVzY3JpcHRpb25cbiAgICAgIGxldCBzdGF0RGVzY3JpcHRpb25FbGVtZW50ID0gJChcIjxwPlwiKVxuICAgICAgICAuYWRkQ2xhc3MoXCJzdGF0LWxpc3RfX2l0ZW1fX2Rlc2NyaXB0aW9uLWNvbnRhaW5lcl9fZGVzY3JpcHRpb25cIilcbiAgICAgICAgLnRleHQoc3RhdERlc2NyaXB0aW9uKTtcbiAgICAgIC8vIEFwcGVuZCB0aGUgc3RhdERlc2NyaXB0aW9uRWxlbWVudCB0byB0aGUgc3RhdERlc2NyaXB0aW9uQ29udGFpbmVyRWxlbWVudFxuICAgICAgc3RhdERlc2NyaXB0aW9uQ29udGFpbmVyRWxlbWVudC5hcHBlbmQoc3RhdERlc2NyaXB0aW9uRWxlbWVudCk7XG4gICAgICAvLyBBcHBlbmQgdGhlIHR3byBzdGF0IGRpdiBjb250YWluZXJzIHRvIHRoZSA8bGk+XG4gICAgICBzdGF0TGlzdEl0ZW1FbGVtZW50LmFwcGVuZChcbiAgICAgICAgc3RhdFRpdGxlSWNvbkNvbnRhaW5lckVsZW1lbnQsXG4gICAgICAgIHN0YXREZXNjcmlwdGlvbkNvbnRhaW5lckVsZW1lbnRcbiAgICAgICk7XG4gICAgICAvLyBBcHBlbmQgdGhlIDxsaT5zIHRvIHRoZSA8dWw+XG4gICAgICBzdGF0TGlzdEVsZW1lbnQuYXBwZW5kKHN0YXRMaXN0SXRlbUVsZW1lbnQpO1xuICAgIH0pO1xuICB9KTtcblxuICB0cmF2ZWxBcHAuZmluYWxEaXNwbGF5KCk7XG59O1xuXG4vKiAgNy4xIE9uY2UgYWxsIGltYWdlcyBhcmUgbG9hZGVkIGFzIGJhY2tncm91bmQgaW1hZ2VzIG9yIHJlZ3VsYXIgaW1hZ2VzLCBkaXNwbGF5IHRoZSBmaW5hbCByZXN1bHRzIHdpdGhvdXQgXCJsYWdcIiovXG50cmF2ZWxBcHAuZmluYWxEaXNwbGF5ID0gKCkgPT4ge1xuICAkKFwiLnJlc3VsdHNcIikud2FpdEZvckltYWdlcyhmdW5jdGlvbigpIHtcbiAgICAkKFwiLnJlc3VsdHNcIikuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIik7XG5cbiAgICBsZXQgZmxpY2tpdHlPck5vdCA9IFwiZmxleFwiO1xuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDExMDBweClcIikubWF0Y2hlcykge1xuICAgICAgLyogdGhlIHZpZXdwb3J0IGlzIGF0IG1vc3QgMTEwMCBwaXhlbHMgd2lkZSAqL1xuICAgICAgZmxpY2tpdHlPck5vdCA9IFwiYmxvY2tcIjtcbiAgICB9XG5cbiAgICAkKFwiLnJlc3VsdHNcIikuY3NzKFwiZGlzcGxheVwiLCBmbGlja2l0eU9yTm90KTtcbiAgICAkKFwiaHRtbCwgYm9keVwiKVxuICAgICAgLnN0b3AoKVxuICAgICAgLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoXCIucmVzdWx0c1wiKS5vZmZzZXQoKS50b3AgfSwgOTAwLCBcInN3aW5nXCIpO1xuXG4gICAgLy8gcmVtb3ZlIGxvYWRlciBhbmQgZGlzcGxheSBzdWJtaXQgcmFua2luZyBidXR0b24gYWdhaW5cbiAgICBsZXQgbWFya1VwQnV0dG9uID0gYDxsaT48YnV0dG9uIGNsYXNzPVwidXNlci1zdWJtaXQgYnRuXCI+U3VibWl0IFJhbmtpbmc8L2J1dHRvbj48L2xpPmA7XG4gICAgJChcIi5jaG9pY2VzXCIpXG4gICAgICAuZmluZChcImxpOmxhc3QtY2hpbGRcIilcbiAgICAgIC5odG1sKG1hcmtVcEJ1dHRvbik7XG5cbiAgICAvKiBGTElDS0lUWSAqL1xuICAgICQoXCIucmVzdWx0c1wiKS5mbGlja2l0eSh7XG4gICAgICAvLyBvcHRpb25zXG4gICAgICBjZWxsQWxpZ246IFwibGVmdFwiLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIGF1dG9QbGF5OiA1MDAwLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgd2F0Y2hDU1M6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vLyA3LjIgT24gaG92ZXIgb3IgY2xpY2sgb3ZlciB0aGUgcXVlc3Rpb24gbWFyayBpY29uLCBkaXNwbGF5IHRoZSBzdGF0IGRlc2NyaXB0aW9uXG50cmF2ZWxBcHAuZGlzcGxheVN0YXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAkKFwiLnJlc3VsdHNcIikub24oXG4gICAgXCJjbGlja1wiLFxuICAgIFwiLnN0YXQtbGlzdF9faXRlbV9fdGl0bGUtaWNvbi1jb250YWluZXJfX2ljb25cIixcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgIC5wYXJlbnRzKFwiLnN0YXQtbGlzdF9faXRlbVwiKVxuICAgICAgICAgIC5maW5kKFwiLnN0YXQtbGlzdF9faXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyXCIpXG4gICAgICAgICAgLmhhc0NsYXNzKFwiZGlzcGxheS1ub25lXCIpID09PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgICQoXCIucmVzdWx0c1wiKVxuICAgICAgICAgIC5maW5kKFwiLnN0YXQtbGlzdF9faXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyXCIpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKFwiZGlzcGxheS1ub25lXCIpXG4gICAgICAgICAgLmFkZENsYXNzKFwiZGlzcGxheS1ub25lXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChcIi5yZXN1bHRzXCIpXG4gICAgICAgICAgLmZpbmQoXCIuc3RhdC1saXN0X19pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXJcIilcbiAgICAgICAgICAuYWRkQ2xhc3MoXCJkaXNwbGF5LW5vbmVcIik7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAucGFyZW50cyhcIi5zdGF0LWxpc3RfX2l0ZW1cIilcbiAgICAgICAgICAuZmluZChcIi5zdGF0LWxpc3RfX2l0ZW1fX2Rlc2NyaXB0aW9uLWNvbnRhaW5lclwiKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImRpc3BsYXktbm9uZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59O1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGhvbGRzIGFsbCBvdXIgZXZlbnRzIGZ1bnRpb25zXG50cmF2ZWxBcHAuZXZlbnRzRnVuY3Rpb24gPSAoKSA9PiB7XG4gIHRyYXZlbEFwcC5nZXRVc2VyUHVycG9zZSgpO1xuICB0cmF2ZWxBcHAuZ2V0U3RhcnRlZCgpO1xuICB0cmF2ZWxBcHAudHJhbnNmb3JtU1ZHKCk7XG4gIHRyYXZlbEFwcC5kaXNwbGF5U3RhdERlc2NyaXB0aW9uKCk7XG59O1xuXG4vLyBJbml0IGZ1bmN0aW9uIHRvIGhvbGQgYWxsIG91ciBmdW5jdGlvbnMgaW4gb3JkZXJcbnRyYXZlbEFwcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIHRyYXZlbEFwcC5ldmVudHNGdW5jdGlvbigpO1xuICB0cmF2ZWxBcHAuc2xpZGVEcmFnKCk7XG59O1xuXG4vLyBEb2N1bWVudCBSZWFkeSB0byBjYWxsIG91ciBpbml0KCkgZnVuY3Rpb24gYW5kIHN0YXJ0IHRoZSBhcHBcbiQoZnVuY3Rpb24oKSB7XG4gIHRyYXZlbEFwcC5pbml0KCk7XG59KTtcblxuLyogOC4gRVhUUkEgRlVOQ1RJT05TIFVTRUQgVEhST1VHSE9VVCBBUFAgKi9cblxuLy8gOC4xIFNvcnRhYmxlIGZ1bmN0aW9uYWxpdHkgZm9yIGNyaXRlcmlhc1xudHJhdmVsQXBwLnNsaWRlRHJhZyA9ICgpID0+IHtcbiAgJChcIi5jaG9pY2VzXCIpXG4gICAgLnNvcnRhYmxlKHtcbiAgICAgIGNvbm5lY3RXaXRoOiBcIi5zb3J0YWJsZVwiLFxuICAgICAgc2Nyb2xsOiBmYWxzZSxcbiAgICAgIHJldmVydDogdHJ1ZSxcbiAgICAgIGhlbHBlcjogXCJjbG9uZVwiLFxuICAgICAgY29udGFpbm1lbnQ6IFwiLmNyaXRlcmlhcy1jb250YWluZXJcIlxuICAgIH0pXG4gICAgLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIik7XG4gICQoXCJ1bCwgbGlcIikuZGlzYWJsZVNlbGVjdGlvbigpO1xufTtcblxuLy8gOC4yIFJhbmRvbWl6ZXIgZnVuY3Rpb24gdG8gc2VsZWN0IHJhbmRvbSBpbWFnZXMgdG8gZGlzcGxheVxudHJhdmVsQXBwLnJhbmRvbWl6ZSA9IChzdGFydGluZ051bSwgZW5kaW5nTnVtKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoZW5kaW5nTnVtIC0gc3RhcnRpbmdOdW0pKSArIHN0YXJ0aW5nTnVtO1xufTtcblxuLy8gOC4zIEV2ZW50IGxpc3RlbmVyIHRvIHRyYW5zZm9ybSBTVkdzIGludG8gaW5saW5lIFNWR1MgdG8gYmUgYWJsZSB0byBjaGFuZ2UgdGhlaXIgY29sb3JzIHdpdGggY3NzIGZpbGxcbnRyYXZlbEFwcC50cmFuc2Zvcm1TVkcgPSAoKSA9PiB7XG4gIGpRdWVyeShcImltZy5zdmdcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgJGltZyA9IGpRdWVyeSh0aGlzKTtcbiAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoXCJpZFwiKTtcbiAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoXCJjbGFzc1wiKTtcbiAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKFwic3JjXCIpO1xuXG4gICAgalF1ZXJ5LmdldChcbiAgICAgIGltZ1VSTCxcbiAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBTVkcgdGFnLCBpZ25vcmUgdGhlIHJlc3RcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZChcInN2Z1wiKTtcblxuICAgICAgICAvLyBBZGQgcmVwbGFjZWQgaW1hZ2UncyBJRCB0byB0aGUgbmV3IFNWR1xuICAgICAgICBpZiAodHlwZW9mIGltZ0lEICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cihcImlkXCIsIGltZ0lEKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgcmVwbGFjZWQgaW1hZ2UncyBjbGFzc2VzIHRvIHRoZSBuZXcgU1ZHXG4gICAgICAgIGlmICh0eXBlb2YgaW1nQ2xhc3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKFwiY2xhc3NcIiwgaW1nQ2xhc3MgKyBcIiByZXBsYWNlZC1zdmdcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgYW55IGludmFsaWQgWE1MIHRhZ3MgYXMgcGVyIGh0dHA6Ly92YWxpZGF0b3IudzMub3JnXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoXCJ4bWxuczphXCIpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2aWV3cG9ydCBpcyBzZXQsIGlmIHRoZSB2aWV3cG9ydCBpcyBub3Qgc2V0IHRoZSBTVkcgd29udCd0IHNjYWxlLlxuICAgICAgICBpZiAoXG4gICAgICAgICAgISRzdmcuYXR0cihcInZpZXdCb3hcIikgJiZcbiAgICAgICAgICAkc3ZnLmF0dHIoXCJoZWlnaHRcIikgJiZcbiAgICAgICAgICAkc3ZnLmF0dHIoXCJ3aWR0aFwiKVxuICAgICAgICApIHtcbiAgICAgICAgICAkc3ZnLmF0dHIoXG4gICAgICAgICAgICBcInZpZXdCb3hcIixcbiAgICAgICAgICAgIFwiMCAwIFwiICsgJHN2Zy5hdHRyKFwiaGVpZ2h0XCIpICsgXCIgXCIgKyAkc3ZnLmF0dHIoXCJ3aWR0aFwiKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXBsYWNlIGltYWdlIHdpdGggbmV3IFNWR1xuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xuICAgICAgfSxcbiAgICAgIFwieG1sXCJcbiAgICApO1xuICB9KTtcbn07XG5cbi8qIDguNCBUUkFOU0ZPUk0gU1RSSU5HIE5VTUJFUlMgSU5UTyBTRVBBUkFURUQgU1RSSU5HUyBXSVRIIFBST1BFUiBDT01NQVMgRk9SIEVBQ0ggVEhPVVNBTkQgVU5JVCAqL1xudHJhdmVsQXBwLm51bWJlcldpdGhDb21tYXMgPSBzdGF0ID0+IHtcbiAgcmV0dXJuIHN0YXQudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XG59O1xuIiwiLyoqXG4gKiBGYXN0UHJpb3JpdHlRdWV1ZS5qcyA6IGEgZmFzdCBoZWFwLWJhc2VkIHByaW9yaXR5IHF1ZXVlICBpbiBKYXZhU2NyaXB0LlxuICogKGMpIHRoZSBhdXRob3JzXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLlxuICpcbiAqIFNwZWVkLW9wdGltaXplZCBoZWFwLWJhc2VkIHByaW9yaXR5IHF1ZXVlIGZvciBtb2Rlcm4gYnJvd3NlcnMgYW5kIEphdmFTY3JpcHQgZW5naW5lcy5cbiAqXG4gKiBVc2FnZSA6XG4gICAgICAgICBJbnN0YWxsYXRpb24gKGluIHNoZWxsLCBpZiB5b3UgdXNlIG5vZGUpOlxuICAgICAgICAgJCBucG0gaW5zdGFsbCBmYXN0cHJpb3JpdHlxdWV1ZVxuXG4gICAgICAgICBSdW5uaW5nIHRlc3QgcHJvZ3JhbSAoaW4gSmF2YVNjcmlwdCk6XG5cbiAgICAgICAgIC8vIHZhciBGYXN0UHJpb3JpdHlRdWV1ZSA9IHJlcXVpcmUoXCJmYXN0cHJpb3JpdHlxdWV1ZVwiKTsvLyBpbiBub2RlXG4gICAgICAgICB2YXIgeCA9IG5ldyBGYXN0UHJpb3JpdHlRdWV1ZSgpO1xuICAgICAgICAgeC5hZGQoMSk7XG4gICAgICAgICB4LmFkZCgwKTtcbiAgICAgICAgIHguYWRkKDUpO1xuICAgICAgICAgeC5hZGQoNCk7XG4gICAgICAgICB4LmFkZCgzKTtcbiAgICAgICAgIHgucGVlaygpOyAvLyBzaG91bGQgcmV0dXJuIDAsIGxlYXZlcyB4IHVuY2hhbmdlZFxuICAgICAgICAgeC5zaXplOyAvLyBzaG91bGQgcmV0dXJuIDUsIGxlYXZlcyB4IHVuY2hhbmdlZFxuICAgICAgICAgd2hpbGUoIXguaXNFbXB0eSgpKSB7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKHgucG9sbCgpKTtcbiAgICAgICAgIH0gLy8gd2lsbCBwcmludCAwIDEgMyA0IDVcbiAgICAgICAgIHgudHJpbSgpOyAvLyAob3B0aW9uYWwpIG9wdGltaXplcyBtZW1vcnkgdXNhZ2VcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdGNvbXBhcmF0b3IgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhIDwgYjtcbn07XG5cbi8vIHRoZSBwcm92aWRlZCBjb21wYXJhdG9yIGZ1bmN0aW9uIHNob3VsZCB0YWtlIGEsIGIgYW5kIHJldHVybiAqdHJ1ZSogd2hlbiBhIDwgYlxuZnVuY3Rpb24gRmFzdFByaW9yaXR5UXVldWUoY29tcGFyYXRvcikge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRmFzdFByaW9yaXR5UXVldWUpKSByZXR1cm4gbmV3IEZhc3RQcmlvcml0eVF1ZXVlKGNvbXBhcmF0b3IpO1xuICB0aGlzLmFycmF5ID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG4gIHRoaXMuY29tcGFyZSA9IGNvbXBhcmF0b3IgfHwgZGVmYXVsdGNvbXBhcmF0b3I7XG59XG5cbi8vIGNvcHkgdGhlIHByaW9yaXR5IHF1ZXVlIGludG8gYW5vdGhlciwgYW5kIHJldHVybiBpdC4gUXVldWUgaXRlbXMgYXJlIHNoYWxsb3ctY29waWVkLlxuLy8gUnVucyBpbiBgTyhuKWAgdGltZS5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZnBxID0gbmV3IEZhc3RQcmlvcml0eVF1ZXVlKHRoaXMuY29tcGFyZSk7XG4gIGZwcS5zaXplID0gdGhpcy5zaXplO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgaSsrKSB7XG4gICAgZnBxLmFycmF5LnB1c2godGhpcy5hcnJheVtpXSk7XG4gIH1cbiAgcmV0dXJuIGZwcTtcbn07XG5cbi8vIEFkZCBhbiBlbGVtZW50IGludG8gdGhlIHF1ZXVlXG4vLyBydW5zIGluIE8obG9nIG4pIHRpbWVcbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihteXZhbCkge1xuICB2YXIgaSA9IHRoaXMuc2l6ZTtcbiAgdGhpcy5hcnJheVt0aGlzLnNpemVdID0gbXl2YWw7XG4gIHRoaXMuc2l6ZSArPSAxO1xuICB2YXIgcDtcbiAgdmFyIGFwO1xuICB3aGlsZSAoaSA+IDApIHtcbiAgICBwID0gKGkgLSAxKSA+PiAxO1xuICAgIGFwID0gdGhpcy5hcnJheVtwXTtcbiAgICBpZiAoIXRoaXMuY29tcGFyZShteXZhbCwgYXApKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5hcnJheVtpXSA9IGFwO1xuICAgIGkgPSBwO1xuICB9XG4gIHRoaXMuYXJyYXlbaV0gPSBteXZhbDtcbn07XG5cbi8vIHJlcGxhY2UgdGhlIGNvbnRlbnQgb2YgdGhlIGhlYXAgYnkgcHJvdmlkZWQgYXJyYXkgYW5kIFwiaGVhcGlmeSBpdFwiXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuaGVhcGlmeSA9IGZ1bmN0aW9uKGFycikge1xuICB0aGlzLmFycmF5ID0gYXJyO1xuICB0aGlzLnNpemUgPSBhcnIubGVuZ3RoO1xuICB2YXIgaTtcbiAgZm9yIChpID0gdGhpcy5zaXplID4+IDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdGhpcy5fcGVyY29sYXRlRG93bihpKTtcbiAgfVxufTtcblxuLy8gZm9yIGludGVybmFsIHVzZVxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLl9wZXJjb2xhdGVVcCA9IGZ1bmN0aW9uKGksIGZvcmNlKSB7XG4gIHZhciBteXZhbCA9IHRoaXMuYXJyYXlbaV07XG4gIHZhciBwO1xuICB2YXIgYXA7XG4gIHdoaWxlIChpID4gMCkge1xuICAgIHAgPSAoaSAtIDEpID4+IDE7XG4gICAgYXAgPSB0aGlzLmFycmF5W3BdO1xuICAgIC8vIGZvcmNlIHdpbGwgc2tpcCB0aGUgY29tcGFyZVxuICAgIGlmICghZm9yY2UgJiYgIXRoaXMuY29tcGFyZShteXZhbCwgYXApKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5hcnJheVtpXSA9IGFwO1xuICAgIGkgPSBwO1xuICB9XG4gIHRoaXMuYXJyYXlbaV0gPSBteXZhbDtcbn07XG5cbi8vIGZvciBpbnRlcm5hbCB1c2VcbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5fcGVyY29sYXRlRG93biA9IGZ1bmN0aW9uKGkpIHtcbiAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gIHZhciBoc2l6ZSA9IHRoaXMuc2l6ZSA+Pj4gMTtcbiAgdmFyIGFpID0gdGhpcy5hcnJheVtpXTtcbiAgdmFyIGw7XG4gIHZhciByO1xuICB2YXIgYmVzdGM7XG4gIHdoaWxlIChpIDwgaHNpemUpIHtcbiAgICBsID0gKGkgPDwgMSkgKyAxO1xuICAgIHIgPSBsICsgMTtcbiAgICBiZXN0YyA9IHRoaXMuYXJyYXlbbF07XG4gICAgaWYgKHIgPCBzaXplKSB7XG4gICAgICBpZiAodGhpcy5jb21wYXJlKHRoaXMuYXJyYXlbcl0sIGJlc3RjKSkge1xuICAgICAgICBsID0gcjtcbiAgICAgICAgYmVzdGMgPSB0aGlzLmFycmF5W3JdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuY29tcGFyZShiZXN0YywgYWkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5hcnJheVtpXSA9IGJlc3RjO1xuICAgIGkgPSBsO1xuICB9XG4gIHRoaXMuYXJyYXlbaV0gPSBhaTtcbn07XG5cbi8vIGludGVybmFsXG4vLyBfcmVtb3ZlQXQoaW5kZXgpIHdpbGwgcmVtb3ZlIHRoZSBpdGVtIGF0IHRoZSBnaXZlbiBpbmRleCBmcm9tIHRoZSBxdWV1ZSxcbi8vIHJldGFpbmluZyBiYWxhbmNlLiByZXR1cm5zIHRoZSByZW1vdmVkIGl0ZW0sIG9yIHVuZGVmaW5lZCBpZiBub3RoaW5nIGlzIHJlbW92ZWQuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuX3JlbW92ZUF0ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgaWYgKGluZGV4ID4gdGhpcy5zaXplIC0gMSB8fCBpbmRleCA8IDApIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgLy8gaW1wbDE6XG4gIC8vdGhpcy5hcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAvL3RoaXMuaGVhcGlmeSh0aGlzLmFycmF5KTtcbiAgLy8gaW1wbDI6XG4gIHRoaXMuX3BlcmNvbGF0ZVVwKGluZGV4LCB0cnVlKTtcbiAgcmV0dXJuIHRoaXMucG9sbCgpO1xufTtcblxuLy8gcmVtb3ZlKG15dmFsKSB3aWxsIHJlbW92ZSBhbiBpdGVtIG1hdGNoaW5nIHRoZSBwcm92aWRlZCB2YWx1ZSBmcm9tIHRoZVxuLy8gcXVldWUsIGNoZWNrZWQgZm9yIGVxdWFsaXR5IGJ5IHVzaW5nIHRoZSBxdWV1ZSdzIGNvbXBhcmF0b3IuXG4vLyByZXR1cm4gdHJ1ZSBpZiByZW1vdmVkLCBmYWxzZSBvdGhlcndpc2UuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24obXl2YWwpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkrKykge1xuICAgIGlmICghdGhpcy5jb21wYXJlKHRoaXMuYXJyYXlbaV0sIG15dmFsKSAmJiAhdGhpcy5jb21wYXJlKG15dmFsLCB0aGlzLmFycmF5W2ldKSkge1xuICAgICAgLy8gaXRlbXMgbWF0Y2gsIGNvbXBhcmF0b3IgcmV0dXJucyBmYWxzZSBib3RoIHdheXMsIHJlbW92ZSBpdGVtXG4gICAgICB0aGlzLl9yZW1vdmVBdChpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBpbnRlcm5hbFxuLy8gcmVtb3ZlcyBhbmQgcmV0dXJucyBpdGVtcyBmb3Igd2hpY2ggdGhlIGNhbGxiYWNrIHJldHVybnMgdHJ1ZS5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5fYmF0Y2hSZW1vdmUgPSBmdW5jdGlvbihjYWxsYmFjaywgbGltaXQpIHtcbiAgLy8gaW5pdGlhbGl6ZSByZXR1cm4gYXJyYXkgd2l0aCBtYXggc2l6ZSBvZiB0aGUgbGltaXQgb3IgY3VycmVudCBxdWV1ZSBzaXplXG4gIHZhciByZXRBcnIgPSBuZXcgQXJyYXkobGltaXQgPyBsaW1pdCA6IHRoaXMuc2l6ZSk7XG4gIHZhciBjb3VudCA9IDA7XG5cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLnNpemUpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCB0aGlzLnNpemUgJiYgY291bnQgPCByZXRBcnIubGVuZ3RoKSB7XG4gICAgICBpZiAoY2FsbGJhY2sodGhpcy5hcnJheVtpXSkpIHtcbiAgICAgICAgcmV0QXJyW2NvdW50XSA9IHRoaXMuX3JlbW92ZUF0KGkpO1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICAvLyBtb3ZlIHVwIGEgbGV2ZWwgaW4gdGhlIGhlYXAgaWYgd2UgcmVtb3ZlIGFuIGl0ZW1cbiAgICAgICAgaSA9IGkgPj4gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9IFxuICB9XG4gIHJldEFyci5sZW5ndGggPSBjb3VudDtcbiAgcmV0dXJuIHJldEFycjtcbn1cblxuLy8gcmVtb3ZlT25lKGNhbGxiYWNrKSB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0gb2YgdGhlIHF1ZXVlXG4vLyBhbmQgd2lsbCByZW1vdmUgdGhlIGZpcnN0IGl0ZW0gZm9yIHdoaWNoIHRoZSBjYWxsYmFjayB3aWxsIHJldHVybiB0cnVlLlxuLy8gcmV0dXJuIHRoZSByZW1vdmVkIGl0ZW0sIG9yIHVuZGVmaW5lZCBpZiBub3RoaW5nIGlzIHJlbW92ZWQuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucmVtb3ZlT25lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIGFyciA9IHRoaXMuX2JhdGNoUmVtb3ZlKGNhbGxiYWNrLCAxKTtcbiAgcmV0dXJuIGFyci5sZW5ndGggPiAwID8gYXJyWzBdIDogdW5kZWZpbmVkO1xufTtcblxuLy8gcmVtb3ZlKGNhbGxiYWNrWywgbGltaXRdKSB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0gb2Zcbi8vIHRoZSBxdWV1ZSBhbmQgd2lsbCByZW1vdmUgZWFjaCBpdGVtIGZvciB3aGljaCB0aGUgY2FsbGJhY2sgcmV0dXJucyB0cnVlLCB1cCB0b1xuLy8gYSBtYXggbGltaXQgb2YgcmVtb3ZlZCBpdGVtcyBpZiBzcGVjaWZpZWQgb3Igbm8gbGltaXQgaWYgdW5zcGVjaWZpZWQuXG4vLyByZXR1cm4gYW4gYXJyYXkgY29udGFpbmluZyB0aGUgcmVtb3ZlZCBpdGVtcy5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5yZW1vdmVNYW55ID0gZnVuY3Rpb24oY2FsbGJhY2ssIGxpbWl0KSB7XG4gIHJldHVybiB0aGlzLl9iYXRjaFJlbW92ZShjYWxsYmFjaywgbGltaXQpO1xufTtcblxuLy8gTG9vayBhdCB0aGUgdG9wIG9mIHRoZSBxdWV1ZSAob25lIG9mIHRoZSBzbWFsbGVzdCBlbGVtZW50cykgd2l0aG91dCByZW1vdmluZyBpdFxuLy8gZXhlY3V0ZXMgaW4gY29uc3RhbnQgdGltZVxuLy9cbi8vIENhbGxpbmcgcGVlayBvbiBhbiBlbXB0eSBwcmlvcml0eSBxdWV1ZSByZXR1cm5zXG4vLyB0aGUgXCJ1bmRlZmluZWRcIiB2YWx1ZS5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL3VuZGVmaW5lZFxuLy9cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnNpemUgPT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgcmV0dXJuIHRoaXMuYXJyYXlbMF07XG59O1xuXG4vLyByZW1vdmUgdGhlIGVsZW1lbnQgb24gdG9wIG9mIHRoZSBoZWFwIChvbmUgb2YgdGhlIHNtYWxsZXN0IGVsZW1lbnRzKVxuLy8gcnVucyBpbiBsb2dhcml0aG1pYyB0aW1lXG4vL1xuLy8gSWYgdGhlIHByaW9yaXR5IHF1ZXVlIGlzIGVtcHR5LCB0aGUgZnVuY3Rpb24gcmV0dXJucyB0aGVcbi8vIFwidW5kZWZpbmVkXCIgdmFsdWUuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy91bmRlZmluZWRcbi8vXG4vLyBGb3IgbG9uZy1ydW5uaW5nIGFuZCBsYXJnZSBwcmlvcml0eSBxdWV1ZXMsIG9yIHByaW9yaXR5IHF1ZXVlc1xuLy8gc3RvcmluZyBsYXJnZSBvYmplY3RzLCB5b3UgbWF5ICB3YW50IHRvIGNhbGwgdGhlIHRyaW0gZnVuY3Rpb25cbi8vIGF0IHN0cmF0ZWdpYyB0aW1lcyB0byByZWNvdmVyIGFsbG9jYXRlZCBtZW1vcnkuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zaXplID09IDApIHJldHVybiB1bmRlZmluZWQ7XG4gIHZhciBhbnMgPSB0aGlzLmFycmF5WzBdO1xuICBpZiAodGhpcy5zaXplID4gMSkge1xuICAgIHRoaXMuYXJyYXlbMF0gPSB0aGlzLmFycmF5Wy0tdGhpcy5zaXplXTtcbiAgICB0aGlzLl9wZXJjb2xhdGVEb3duKDApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc2l6ZSAtPSAxO1xuICB9XG4gIHJldHVybiBhbnM7XG59O1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGFkZHMgdGhlIHByb3ZpZGVkIHZhbHVlIHRvIHRoZSBoZWFwLCB3aGlsZSByZW1vdmluZ1xuLy8gYW5kIHJldHVybmluZyBvbmUgb2YgdGhlIHNtYWxsZXN0IGVsZW1lbnRzIChsaWtlIHBvbGwpLiBUaGUgc2l6ZSBvZiB0aGUgcXVldWVcbi8vIHRodXMgcmVtYWlucyB1bmNoYW5nZWQuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucmVwbGFjZVRvcCA9IGZ1bmN0aW9uKG15dmFsKSB7XG4gIGlmICh0aGlzLnNpemUgPT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdmFyIGFucyA9IHRoaXMuYXJyYXlbMF07XG4gIHRoaXMuYXJyYXlbMF0gPSBteXZhbDtcbiAgdGhpcy5fcGVyY29sYXRlRG93bigwKTtcbiAgcmV0dXJuIGFucztcbn07XG5cbi8vIHJlY292ZXIgdW51c2VkIG1lbW9yeSAoZm9yIGxvbmctcnVubmluZyBwcmlvcml0eSBxdWV1ZXMpXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFycmF5ID0gdGhpcy5hcnJheS5zbGljZSgwLCB0aGlzLnNpemUpO1xufTtcblxuLy8gQ2hlY2sgd2hldGhlciB0aGUgaGVhcCBpcyBlbXB0eVxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gMDtcbn07XG5cbi8vIGl0ZXJhdGUgb3ZlciB0aGUgaXRlbXMgaW4gb3JkZXIsIHBhc3MgYSBjYWxsYmFjayB0aGF0IHJlY2VpdmVzIChpdGVtLCBpbmRleCkgYXMgYXJncy5cbi8vIFRPRE8gb25jZSB3ZSB0cmFuc3BpbGUsIHVuY29tbWVudFxuLy8gaWYgKFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3IpIHtcbi8vICAgRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiooKSB7XG4vLyAgICAgaWYgKHRoaXMuaXNFbXB0eSgpKSByZXR1cm47XG4vLyAgICAgdmFyIGZwcSA9IHRoaXMuY2xvbmUoKTtcbi8vICAgICB3aGlsZSAoIWZwcS5pc0VtcHR5KCkpIHtcbi8vICAgICAgIHlpZWxkIGZwcS5wb2xsKCk7XG4vLyAgICAgfVxuLy8gICB9O1xuLy8gfVxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBpZiAodGhpcy5pc0VtcHR5KCkgfHwgdHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHJldHVybjtcbiAgdmFyIGkgPSAwO1xuICB2YXIgZnBxID0gdGhpcy5jbG9uZSgpO1xuICB3aGlsZSAoIWZwcS5pc0VtcHR5KCkpIHtcbiAgICBjYWxsYmFjayhmcHEucG9sbCgpLCBpKyspO1xuICB9XG59O1xuXG4vLyByZXR1cm4gdGhlIGsgJ3NtYWxsZXN0JyBlbGVtZW50cyBvZiB0aGUgcXVldWVcbi8vIHJ1bnMgaW4gTyhrIGxvZyBrKSB0aW1lXG4vLyB0aGlzIGlzIHRoZSBlcXVpdmFsZW50IG9mIHJlcGVhdGVkbHkgY2FsbGluZyBwb2xsLCBidXRcbi8vIGl0IGhhcyBhIGJldHRlciBjb21wdXRhdGlvbmFsIGNvbXBsZXhpdHksIHdoaWNoIGNhbiBiZVxuLy8gaW1wb3J0YW50IGZvciBsYXJnZSBkYXRhIHNldHMuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUua1NtYWxsZXN0ID0gZnVuY3Rpb24oaykge1xuICBpZiAodGhpcy5zaXplID09IDApIHJldHVybiBbXTtcbiAgdmFyIGNvbXBhcmF0b3IgPSB0aGlzLmNvbXBhcmU7XG4gIHZhciBhcnIgPSB0aGlzLmFycmF5XG4gIHZhciBmcHEgPSBuZXcgRmFzdFByaW9yaXR5UXVldWUoZnVuY3Rpb24oYSxiKXtcbiAgIHJldHVybiBjb21wYXJhdG9yKGFyclthXSxhcnJbYl0pO1xuICB9KTtcbiAgayA9IE1hdGgubWluKHRoaXMuc2l6ZSwgayk7XG4gIHZhciBzbWFsbGVzdCA9IG5ldyBBcnJheShrKTtcbiAgdmFyIGogPSAwO1xuICBmcHEuYWRkKDApO1xuICB3aGlsZSAoaiA8IGspIHtcbiAgICB2YXIgc21hbGwgPSBmcHEucG9sbCgpO1xuICAgIHNtYWxsZXN0W2orK10gPSB0aGlzLmFycmF5W3NtYWxsXTtcbiAgICB2YXIgbCA9IChzbWFsbCA8PCAxKSArIDE7XG4gICAgdmFyIHIgPSBsICsgMTtcbiAgICBpZiAobCA8IHRoaXMuc2l6ZSkgZnBxLmFkZChsKTtcbiAgICBpZiAociA8IHRoaXMuc2l6ZSkgZnBxLmFkZChyKTtcbiAgfVxuICByZXR1cm4gc21hbGxlc3Q7XG59XG5cbi8vIGp1c3QgZm9yIGlsbHVzdHJhdGlvbiBwdXJwb3Nlc1xudmFyIG1haW4gPSBmdW5jdGlvbigpIHtcbiAgLy8gbWFpbiBjb2RlXG4gIHZhciB4ID0gbmV3IEZhc3RQcmlvcml0eVF1ZXVlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYSA8IGI7XG4gIH0pO1xuICB4LmFkZCgxKTtcbiAgeC5hZGQoMCk7XG4gIHguYWRkKDUpO1xuICB4LmFkZCg0KTtcbiAgeC5hZGQoMyk7XG4gIHdoaWxlICgheC5pc0VtcHR5KCkpIHtcbiAgICBjb25zb2xlLmxvZyh4LnBvbGwoKSk7XG4gIH1cbn07XG5cbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICBtYWluKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmFzdFByaW9yaXR5UXVldWU7XG4iXX0=
