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
    $(".choices").find("li:last-child").html("<svg class=\"lds-spinner loader\" width=\"100px\"  height=\"100px\"  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" style=\"background: none;\"><g transform=\"rotate(0 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.9166666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(30 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.8333333333333334s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(60 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(90 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(120 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5833333333333334s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(150 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(180 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.4166666666666667s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(210 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(240 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.25s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(270 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.16666666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(300 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.08333333333333333s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(330 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"0s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g></svg>");

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

    // $(".results").flickity("destroy");

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
    $(".results").css("display", "block");

    // let flickityOrNot = "flex";
    // if (window.matchMedia("(max-width: 1920px)").matches) {
    //   /* the viewport is at most 1100 pixels wide */
    //   flickityOrNot = "block";
    // }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIiwibm9kZV9tb2R1bGVzL2Zhc3Rwcmlvcml0eXF1ZXVlL0Zhc3RQcmlvcml0eVF1ZXVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0EsSUFBTSxVQUFVLFFBQVEsbUJBQVIsQ0FBaEI7O0FBRUE7QUFDQSxJQUFNLFlBQVksRUFBbEI7O0FBRUE7QUFDQSxVQUFVLFNBQVYsR0FBc0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0UsTUFBSSxpQkFETjtBQUVFLFNBQU8sQ0FDTDtBQUNFLFVBQU0sU0FEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsMEJBSFo7QUFJRSxpQkFBYTtBQUpmLEdBREssRUFPTDtBQUNFLFVBQU0saUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGlCQUhaO0FBSUUsaUJBQ0U7QUFMSixHQVBLLEVBY0w7QUFDRSxVQUFNLGtCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxrQkFIWjtBQUlFLGlCQUNFO0FBTEosR0FkSyxFQXFCTDtBQUNFLFVBQU0scUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLHFCQUhaO0FBSUUsaUJBQWE7QUFKZixHQXJCSyxFQTJCTDtBQUNFLFVBQU0sa0JBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLHlCQUhaO0FBSUUsaUJBQWE7QUFKZixHQTNCSyxFQWlDTDtBQUNFLFVBQU0scUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGFBSFo7QUFJRSxpQkFBYTtBQUpmLEdBakNLO0FBRlQsQ0FIb0I7QUE4Q3BCO0FBQ0E7QUFDQTtBQUNFLE1BQUksa0JBRE47QUFFRSxTQUFPLENBQ0w7QUFDRSxVQUFNLHVCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSx1QkFIWjtBQUlFLGlCQUFhO0FBSmYsR0FESyxFQU9MO0FBQ0UsVUFBTSxlQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxlQUhaO0FBSUUsaUJBQWE7QUFKZixHQVBLLEVBYUw7QUFDRSxVQUFNLGtCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxrQkFIWjtBQUlFLGlCQUFhO0FBSmYsR0FiSyxFQW1CTDtBQUNFLFVBQU0saUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGlCQUhaO0FBSUUsaUJBQ0U7QUFMSixHQW5CSyxFQTBCTDtBQUNFLFVBQU0sS0FEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUseUJBSFo7QUFJRSxpQkFDRTtBQUxKLEdBMUJLLEVBaUNMO0FBQ0UsVUFBTSxvQkFEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsb0JBSFo7QUFJRSxpQkFBYTtBQUpmLEdBakNLO0FBRlQsQ0FoRG9CO0FBMkZwQjtBQUNBO0FBQ0E7QUFDRSxNQUFJLG1CQUROO0FBRUUsU0FBTyxDQUNMO0FBQ0UsVUFBTSxpQkFEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsaUJBSFo7QUFJRSxpQkFDRTtBQUxKLEdBREssRUFRTDtBQUNFLFVBQU0sb0JBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLG9CQUhaO0FBSUUsaUJBQWE7QUFKZixHQVJLLEVBY0w7QUFDRSxVQUFNLGtCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxrQkFIWjtBQUlFLGlCQUNFO0FBTEosR0FkSyxFQXFCTDtBQUNFLFVBQU0sU0FEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsMEJBSFo7QUFJRSxpQkFBYTtBQUpmLEdBckJLLEVBMkJMO0FBQ0UsVUFBTSxlQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxlQUhaO0FBSUUsaUJBQWE7QUFKZixHQTNCSyxFQWlDTDtBQUNFLFVBQU0sV0FEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsV0FIWjtBQUlFLGlCQUFhO0FBSmYsR0FqQ0s7QUFGVCxDQTdGb0I7QUF3SXBCO0FBQ0E7QUFDQTtBQUNFLE1BQUkscUJBRE47QUFFRSxTQUFPLENBQ0w7QUFDRSxVQUFNLFNBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLDBCQUhaO0FBSUUsaUJBQWE7QUFKZixHQURLLEVBT0w7QUFDRSxVQUFNLGtCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxrQkFIWjtBQUlFLGlCQUNFO0FBTEosR0FQSyxFQWNMO0FBQ0UsUUFBSSxrQkFETjtBQUVFLFVBQU0sTUFGUjtBQUdFLGVBQVcsS0FIYjtBQUlFLGNBQVUsa0JBSlo7QUFLRSxpQkFDRTtBQU5KLEdBZEssRUFzQkw7QUFDRSxVQUFNLGlCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxpQkFIWjtBQUlFLGlCQUNFO0FBTEosR0F0QkssRUE2Qkw7QUFDRSxVQUFNLGNBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGNBSFo7QUFJRSxpQkFBYTtBQUpmLEdBN0JLLEVBbUNMO0FBQ0UsVUFBTSxZQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxhQUhaO0FBSUUsaUJBQ0U7QUFMSixHQW5DSztBQUZULENBMUlvQjtBQXdMcEI7QUFDQTtBQUNBO0FBQ0UsTUFBSSxrQkFETjtBQUVFLFNBQU8sQ0FDTDtBQUNFLFVBQU0sS0FEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUseUJBSFo7QUFJRSxpQkFDRTtBQUxKLEdBREssRUFRTDtBQUNFLFVBQU0sa0JBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGtCQUhaO0FBSUUsaUJBQWE7QUFKZixHQVJLLEVBY0w7QUFDRSxVQUFNLFlBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGFBSFo7QUFJRSxpQkFDRTtBQUxKLEdBZEssRUFxQkw7QUFDRSxVQUFNLFdBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLFdBSFo7QUFJRSxpQkFBYTtBQUpmLEdBckJLLEVBMkJMO0FBQ0UsVUFBTSxvQkFEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsb0JBSFo7QUFJRSxpQkFBYTtBQUpmLEdBM0JLLEVBaUNMO0FBQ0UsVUFBTSxrQkFEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUseUJBSFo7QUFJRSxpQkFBYTtBQUpmLEdBakNLO0FBRlQsQ0ExTG9CO0FBcU9wQjtBQUNBO0FBQ0E7QUFDRSxNQUFJLG9CQUROO0FBRUUsU0FBTyxDQUNMO0FBQ0UsVUFBTSxLQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSx5QkFIWjtBQUlFLGlCQUNFO0FBTEosR0FESyxFQVFMO0FBQ0UsVUFBTSxjQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxjQUhaO0FBSUUsaUJBQWE7QUFKZixHQVJLLEVBY0w7QUFDRSxRQUFJLGtCQUROO0FBRUUsVUFBTSxNQUZSO0FBR0UsZUFBVyxLQUhiO0FBSUUsY0FBVSxrQkFKWjtBQUtFLGlCQUNFO0FBTkosR0FkSyxFQXNCTDtBQUNFLFVBQU0saUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGlCQUhaO0FBSUUsaUJBQ0U7QUFMSixHQXRCSyxFQTZCTDtBQUNFLFVBQU0sWUFEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsZ0JBSFo7QUFJRSxpQkFBYTtBQUpmLEdBN0JLLEVBbUNMO0FBQ0UsVUFBTSxlQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxpQkFIWjtBQUlFLGlCQUFhO0FBSmYsR0FuQ0s7QUFGVCxDQXZPb0I7QUFvUnBCO0FBQ0E7QUFDQTtBQUNFLE1BQUksb0JBRE47QUFFRSxTQUFPLENBQ0w7QUFDRSxVQUFNLHVCQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSx1QkFIWjtBQUlFLGlCQUFhO0FBSmYsR0FESyxFQU9MO0FBQ0UsVUFBTSxvQkFEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsb0JBSFo7QUFJRSxpQkFBYTtBQUpmLEdBUEssRUFhTDtBQUNFLFVBQU0sZUFEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsZUFIWjtBQUlFLGlCQUFhO0FBSmYsR0FiSyxFQW1CTDtBQUNFLFVBQU0saUJBRFI7QUFFRSxlQUFXLEtBRmI7QUFHRSxjQUFVLGlCQUhaO0FBSUUsaUJBQWE7QUFKZixHQW5CSyxFQXlCTDtBQUNFLFVBQU0sWUFEUjtBQUVFLGVBQVcsS0FGYjtBQUdFLGNBQVUsZ0JBSFo7QUFJRSxpQkFBYTtBQUpmLEdBekJLLEVBK0JMO0FBQ0UsVUFBTSxZQURSO0FBRUUsZUFBVyxLQUZiO0FBR0UsY0FBVSxhQUhaO0FBSUUsaUJBQ0U7QUFMSixHQS9CSztBQUZULENBdFJvQixDQUF0Qjs7QUFrVUE7QUFDQSxVQUFVLFVBQVYsR0FBdUIsWUFBTTtBQUMzQjtBQUNBLElBQUUsa0JBQUYsRUFBc0IsRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsWUFBVztBQUMzQztBQUNBLE1BQUUsWUFBRixFQUNHLElBREgsR0FFRyxPQUZILENBRVcsRUFBRSxXQUFXLEVBQUUsa0JBQUYsRUFBc0IsTUFBdEIsR0FBK0IsR0FBNUMsRUFGWCxFQUU4RCxHQUY5RCxFQUVtRSxPQUZuRTtBQUdELEdBTEQ7QUFNRCxDQVJEOztBQVVBO0FBQ0EsVUFBVSxjQUFWLEdBQTJCLFlBQU07QUFDL0IsSUFBRSxzQkFBRixFQUEwQixFQUExQixDQUE2QixPQUE3QixFQUFzQyxZQUFXO0FBQy9DO0FBQ0EsUUFBTSxVQUFVLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxJQUFiLENBQWhCO0FBQ0EsY0FBVSxXQUFWLEdBQXdCLE9BQXhCOztBQUVBO0FBQ0EsY0FBVSxZQUFWLENBQXVCLFVBQVUsV0FBakM7O0FBRUE7QUFDQSxNQUFFLFlBQUYsRUFBZ0IsR0FBaEIsQ0FBb0IsU0FBcEIsRUFBK0IsTUFBL0I7O0FBRUE7QUFDQSxNQUFFLFlBQUYsRUFDRyxJQURILEdBRUcsT0FGSCxDQUdJO0FBQ0UsaUJBQVcsRUFBRSxZQUFGLEVBQWdCLE1BQWhCLEdBQXlCO0FBRHRDLEtBSEosRUFNSSxHQU5KLEVBT0ksT0FQSjtBQVNELEdBckJEO0FBc0JELENBdkJEOztBQXlCQTtBQUNBLFVBQVUsWUFBVixHQUF5QixxQkFBYTtBQUNwQyxJQUFFLFVBQUYsRUFBYyxLQUFkO0FBQ0E7QUFDQSxJQUFFLGtCQUFGLEVBQXNCLElBQXRCLENBQ0UsMkhBREY7QUFHQTtBQUNBLElBQUUseUJBQUYsRUFBNkIsR0FBN0IsQ0FBaUMsVUFBakMsRUFBNkMsVUFBN0M7O0FBRUE7QUFDQSxZQUFVLFNBQVYsQ0FBb0IsT0FBcEIsQ0FBNEIsc0JBQWM7QUFDeEM7QUFDQSxRQUFJLGNBQWMsV0FBVyxFQUE3QixFQUFpQztBQUMvQjtBQUNBLGlCQUFXLEtBQVgsQ0FBaUIsT0FBakIsQ0FBeUIsZ0JBQVE7QUFDL0I7QUFDQSxZQUFJLGFBQWEsRUFBRSxNQUFGLEVBQ2QsSUFEYyxDQUNULElBRFMsRUFDSCxLQUFLLElBREYsRUFFZCxRQUZjLENBRUwsVUFGSyxFQUdkLElBSGMsQ0FHVCxLQUFLLFFBSEksQ0FBakI7QUFJQSxVQUFFLFVBQUYsRUFBYyxNQUFkLENBQXFCLFVBQXJCO0FBQ0QsT0FQRDtBQVFEO0FBQ0YsR0FiRDs7QUFlQTtBQUNBLE1BQUksbUZBQUo7QUFDQSxJQUFFLFVBQUYsRUFBYyxNQUFkLENBQXFCLFlBQXJCOztBQUVBLFlBQVUsZUFBVjtBQUNELENBOUJEOztBQWdDQTtBQUNBLFVBQVUsZUFBVixHQUE0QixZQUFNO0FBQ2hDLElBQUUsVUFBRixFQUFjLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsY0FBMUIsRUFBMEMsWUFBVztBQUNuRDtBQUNBO0FBQ0EsTUFBRSxVQUFGLEVBQWMsSUFBZCxDQUNFLGVBREYsRUFFRSxJQUZGOztBQW9EQTtBQUNBLFFBQUksZUFBZSxFQUFFLFVBQUYsRUFBYyxDQUFkLEVBQWlCLFFBQXBDOztBQUVBO0FBQ0EsUUFBSSxrQkFBa0IsRUFBdEI7O0FBRUE7QUFDQTtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixHQUF2QixFQUE0QjtBQUMxQixzQkFBZ0IsSUFBaEIsQ0FBcUIsYUFBYSxDQUFiLEVBQWdCLEVBQXJDO0FBQ0Q7O0FBRUQ7QUFDQSxjQUFVLFdBQVYsR0FBd0IsRUFBeEI7QUFDQSxjQUFVLGNBQVYsR0FBMkIsRUFBM0I7QUFDQSxjQUFVLG9CQUFWLEdBQWlDLEVBQWpDO0FBQ0EsY0FBVSxhQUFWLEdBQTBCLEVBQTFCO0FBQ0EsY0FBVSxnQkFBVixHQUE2QixFQUE3QjtBQUNBLGNBQVUsZ0JBQVYsR0FBNkIsRUFBN0I7QUFDQSxjQUFVLFVBQVYsR0FBdUIsRUFBdkI7QUFDQSxjQUFVLGNBQVYsR0FBMkIsRUFBM0I7O0FBRUE7O0FBRUEsY0FBVSxPQUFWLGtCQUFxQixlQUFyQjtBQUNELEdBaEZEO0FBaUZELENBbEZEOztBQW9GQTs7QUFFQTtBQUNBLFVBQVUsT0FBVixHQUFvQixrQkFBcEI7QUFDQSxVQUFVLE9BQVYsR0FBb0IsK0JBQXBCO0FBQ0EsVUFBVSxPQUFWLEdBQW9CLFVBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBcUM7QUFDdkQsSUFBRSxJQUFGLENBQU87QUFDTCxTQUFLLFVBQVUsT0FEVjtBQUVMLFlBQVEsS0FGSDtBQUdMLGNBQVUsTUFITDtBQUlMLFVBQU07QUFDSixlQUFTLFVBQVUsT0FEZjtBQUVKLHFCQUFhLFNBQWIsU0FBMEIsU0FBMUIsU0FBdUMsU0FGbkM7QUFHSixXQUFLO0FBSEQ7QUFKRCxHQUFQLEVBU0csSUFUSCxDQVNRLGVBQU87QUFBQTs7QUFDYjs7QUFFQTtBQUNBLFFBQUksZUFBZSxVQUFVLGtCQUFWLENBQTZCLEdBQTdCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdELFNBQXhELENBQW5COztBQUVBO0FBQ0EsaUJBQWEsT0FBYixDQUFxQixzQkFBYztBQUNqQztBQUNBLGdCQUFVLGdCQUFWLENBQTJCLElBQTNCLENBQWdDLFVBQVUsT0FBVixDQUFrQixXQUFXLFdBQTdCLENBQWhDOztBQUVBO0FBQ0EsZ0JBQVUsZ0JBQVYsQ0FBMkIsSUFBM0IsQ0FBZ0MsVUFBVSxPQUFWLENBQWtCLFdBQVcsV0FBN0IsQ0FBaEM7QUFDRCxLQU5EOztBQVFBO0FBQ0E7QUFDQSxhQUFFLElBQUYsOEJBQVUsVUFBVSxnQkFBcEIsNEJBQXlDLFVBQVUsZ0JBQW5ELElBQXFFLElBQXJFLENBQTBFLFlBQXdCO0FBQ2hHO0FBQ0EsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFVBQWdCLE1BQXBDLEVBQTRDLEdBQTVDLEVBQWlEO0FBQy9DO0FBQ0EsWUFBSSxJQUFJLENBQVIsRUFBVztBQUNULG9CQUFVLFNBQVYscUJBQW9DLENBQXBDLHlCQUFvQyxDQUFwQztBQUNEO0FBQ0Q7QUFIQSxhQUlLO0FBQ0gsc0JBQVUsU0FBVixxQkFBb0MsQ0FBcEMseUJBQW9DLENBQXBDO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLGdCQUFVLG1CQUFWLENBQThCLFlBQTlCLEVBQTRDLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsQ0FBNUM7QUFDRCxLQWZEO0FBZ0JELEdBMUNEO0FBMkNELENBNUNEOztBQThDQTtBQUNBLFVBQVUsa0JBQVYsR0FBK0IsVUFBQyxHQUFELEVBQU0sU0FBTixFQUFpQixTQUFqQixFQUE0QixTQUE1QixFQUEwQztBQUN2RTtBQUNBLE1BQUksZ0JBQWdCLFVBQVUsY0FBVixDQUF5QixTQUF6QixFQUFvQyxTQUFwQyxFQUErQyxTQUEvQyxDQUFwQjs7QUFFQTtBQUNBLE1BQUksYUFBYSxFQUFqQjtBQUNBLE1BQUksT0FBTyxFQUFYO0FBQ0EsTUFBSSxPQUFPLEVBQVg7QUFDQSxNQUFJLE9BQU8sRUFBWDtBQUNBLE1BQUksY0FBYyxFQUFsQjtBQUNBLE1BQUksYUFBYSxFQUFqQjtBQUNBLE1BQUksYUFBYSxDQUFqQjtBQUNBLE1BQUksYUFBYSxDQUFqQjs7QUFFQTtBQUNBLGVBQWEsVUFBVSxnQkFBVixDQUEyQixHQUEzQixFQUFnQyxLQUFoQyxFQUF1QyxLQUF2QyxFQUE4QyxXQUE5QyxDQUFiOztBQUVBO0FBQ0EsU0FBTyxVQUFVLGdCQUFWLENBQTJCLFVBQTNCLEVBQXVDLFNBQXZDLEVBQWtELGNBQWMsQ0FBZCxDQUFsRCxFQUFvRSxVQUFwRSxDQUFQOztBQUVBO0FBQ0EsU0FBTyxVQUFVLGdCQUFWLENBQTJCLElBQTNCLEVBQWlDLFNBQWpDLEVBQTRDLGNBQWMsQ0FBZCxDQUE1QyxFQUE4RCxVQUE5RCxDQUFQOztBQUVBO0FBQ0EsU0FBTyxVQUFVLGdCQUFWLENBQTJCLElBQTNCLEVBQWlDLFNBQWpDLEVBQTRDLGNBQWMsQ0FBZCxDQUE1QyxFQUE4RCxVQUE5RCxDQUFQOztBQUVBO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0E1QkQ7O0FBOEJBO0FBQ0EsVUFBVSxjQUFWLEdBQTJCLFVBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBcUM7QUFDOUQ7QUFDQSxNQUFJLGlCQUFpQixFQUFyQjtBQUNBLE1BQUksaUJBQWlCLEVBQXJCO0FBQ0EsTUFBSSxpQkFBaUIsRUFBckI7O0FBRUE7QUFDQSxZQUFVLFNBQVYsQ0FBb0IsT0FBcEIsQ0FBNEIsbUJBQVc7QUFDckM7QUFDQSxRQUFJLFFBQVEsRUFBUixLQUFlLFVBQVUsV0FBN0IsRUFBMEM7QUFDeEM7QUFDQSxjQUFRLEtBQVIsQ0FBYyxPQUFkLENBQXNCLGdCQUFRO0FBQzVCO0FBQ0EsWUFBSSxLQUFLLElBQUwsS0FBYyxTQUFsQixFQUE2QjtBQUMzQiwyQkFBaUIsS0FBSyxTQUF0QjtBQUNBLG9CQUFVLGFBQVYsQ0FBd0IsSUFBeEIsQ0FBNkIsS0FBSyxJQUFsQztBQUNBLG9CQUFVLGNBQVYsQ0FBeUIsSUFBekIsQ0FBOEIsS0FBSyxRQUFuQztBQUNBLG9CQUFVLG9CQUFWLENBQStCLElBQS9CLENBQW9DLEtBQUssV0FBekM7QUFDRDtBQUNEO0FBTkEsYUFPSyxJQUFJLEtBQUssSUFBTCxLQUFjLFNBQWxCLEVBQTZCO0FBQ2hDLDZCQUFpQixLQUFLLFNBQXRCO0FBQ0Esc0JBQVUsYUFBVixDQUF3QixJQUF4QixDQUE2QixLQUFLLElBQWxDO0FBQ0Esc0JBQVUsY0FBVixDQUF5QixJQUF6QixDQUE4QixLQUFLLFFBQW5DO0FBQ0Esc0JBQVUsb0JBQVYsQ0FBK0IsSUFBL0IsQ0FBb0MsS0FBSyxXQUF6QztBQUNEO0FBQ0Q7QUFOSyxlQU9BLElBQUksS0FBSyxJQUFMLEtBQWMsU0FBbEIsRUFBNkI7QUFDaEMsK0JBQWlCLEtBQUssU0FBdEI7QUFDQSx3QkFBVSxhQUFWLENBQXdCLElBQXhCLENBQTZCLEtBQUssSUFBbEM7QUFDQSx3QkFBVSxjQUFWLENBQXlCLElBQXpCLENBQThCLEtBQUssUUFBbkM7QUFDQSx3QkFBVSxvQkFBVixDQUErQixJQUEvQixDQUFvQyxLQUFLLFdBQXpDO0FBQ0Q7QUFDRixPQXRCRDtBQXVCRDtBQUNGLEdBNUJEOztBQThCQSxTQUFPLENBQUMsY0FBRCxFQUFpQixjQUFqQixFQUFpQyxjQUFqQyxDQUFQO0FBQ0QsQ0F0Q0Q7O0FBd0NBO0FBQ0EsVUFBVSxnQkFBVixHQUE2QixVQUFDLEtBQUQsRUFBUSxRQUFSLEVBQWtCLFNBQWxCLEVBQTZCLGVBQTdCLEVBQWlEO0FBQzVFLE1BQUksY0FBYyxFQUFsQjtBQUNBO0FBQ0EsTUFBSSxjQUFjLEtBQWxCLEVBQXlCO0FBQ3ZCLGtCQUFjLFVBQVUsbUJBQVYsQ0FBOEIsS0FBOUIsRUFBcUMsUUFBckMsRUFBK0MsZUFBL0MsRUFBZ0UsQ0FBaEUsQ0FBZDtBQUNEO0FBQ0Q7QUFIQSxPQUlLLElBQUksY0FBYyxLQUFsQixFQUF5QjtBQUM1QixvQkFBYyxVQUFVLG1CQUFWLENBQThCLEtBQTlCLEVBQXFDLFFBQXJDLEVBQStDLGVBQS9DLEVBQWdFLENBQUMsQ0FBakUsQ0FBZDtBQUNEO0FBQ0QsU0FBTyxXQUFQO0FBQ0QsQ0FYRDs7QUFhQTtBQUNBLFVBQVUsbUJBQVYsR0FBZ0MsVUFBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixDQUFuQixFQUFzQixTQUF0QixFQUFvQztBQUNsRTtBQUNBLE1BQUksT0FBTyxJQUFJLE9BQUosRUFBWDs7QUFFQTtBQUNBO0FBQ0EsTUFBSSxhQUFhLEVBQWpCOztBQUVBO0FBQ0EsTUFBSSxXQUFXLFFBQWY7O0FBRUE7QUFDQSxNQUFJLGlCQUFpQixDQUFyQjs7QUFFQTtBQUNBLFNBQU8sR0FBUCxDQUFXLG1CQUFXO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBSSxPQUFPLE9BQU8sUUFBUSxRQUFSLENBQVAsSUFBNEIsU0FBdkM7O0FBRUE7QUFDQSxRQUFJLGlCQUFpQixDQUFyQixFQUF3QjtBQUN0QixXQUFLLEdBQUwsQ0FBUyxJQUFUO0FBQ0EsaUJBQVcsSUFBWCxDQUFnQixPQUFoQjs7QUFFQTtBQUNBO0FBQ0QsS0FORCxNQU1PO0FBQ0w7QUFDQSxVQUFJLE9BQU8sS0FBSyxJQUFMLEVBQVgsRUFBd0I7QUFDdEI7QUFDQSxhQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksV0FBVyxNQUEvQixFQUF1QyxHQUF2QyxFQUE0QztBQUMxQztBQUNBLGNBQUksY0FBYyxPQUFPLFdBQVcsQ0FBWCxFQUFjLFFBQWQsQ0FBUCxJQUFrQyxTQUFwRDtBQUNBLGNBQUksZ0JBQWdCLEtBQUssSUFBTCxFQUFwQixFQUFpQztBQUMvQjtBQUNBLHVCQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsT0FBeEI7QUFDQTtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQSxhQUFLLElBQUw7O0FBRUE7QUFDQSxhQUFLLEdBQUwsQ0FBUyxJQUFUO0FBQ0Q7QUFDRjtBQUNGLEdBbkNEO0FBb0NBO0FBQ0EsU0FBTyxVQUFQO0FBQ0QsQ0FyREQ7O0FBdURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBVixHQUFvQixvQ0FBcEI7QUFDQTtBQUNBLFVBQVUsT0FBVixHQUFvQixtQkFBVztBQUM3QjtBQUNBLFNBQU8sRUFBRSxJQUFGLENBQU87QUFDWixTQUFLLFVBQVUsT0FESDtBQUVaLFlBQVEsS0FGSTtBQUdaLGNBQVUsT0FIRTtBQUlaLFVBQU07QUFDSixjQUFRLE9BREo7QUFFSixZQUFNLFVBRkY7QUFHSixjQUFRLE9BSEo7QUFJSixjQUFRLE1BSko7QUFLSixlQUFTLENBTEw7QUFNSixlQUFTLEdBTkw7QUFPSixlQUFTLElBUEw7QUFRSixtQkFBYSxJQVJUO0FBU0osaUJBQVc7QUFUUDtBQUpNLEdBQVAsQ0FBUDtBQWdCRCxDQWxCRDs7QUFvQkE7QUFDQSxVQUFVLFNBQVYsR0FBc0Isa0JBQVU7QUFDOUI7QUFDQSxNQUFNLG9CQUFvQixPQUFPLENBQVAsRUFBVSxLQUFWLENBQWdCLEtBQTFDO0FBQ0E7QUFDQSxZQUFVLFdBQVYsQ0FBc0IsSUFBdEIsQ0FBMkIsT0FBTyxNQUFQLENBQWMsaUJBQWQsRUFBaUMsQ0FBakMsRUFBb0MsT0FBL0Q7QUFDRCxDQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBVixHQUFvQixtQ0FBcEI7QUFDQSxVQUFVLE9BQVYsR0FBb0IsOEJBQXBCO0FBQ0E7QUFDQSxVQUFVLE9BQVYsR0FBb0IsbUJBQVc7QUFDN0I7QUFDQSxTQUFPLEVBQUUsSUFBRixDQUFPO0FBQ1osU0FBSyxVQUFVLE9BREg7QUFFWixZQUFRLEtBRkk7QUFHWixjQUFVLE9BSEU7QUFJWixVQUFNO0FBQ0osV0FBSyxVQUFVLE9BRFg7QUFFSixTQUFHLE9BRkM7QUFHSixnQkFBVTtBQUhOO0FBSk0sR0FBUCxDQUFQO0FBVUQsQ0FaRDs7QUFjQTtBQUNBLFVBQVUsU0FBVixHQUFzQixtQkFBVztBQUMvQjtBQUNBLE1BQU0sZUFBZSxRQUFRLENBQVIsRUFBVyxJQUFoQztBQUNBO0FBQ0EsZUFBYSxPQUFiLENBQXFCLGdCQUFRO0FBQzNCO0FBQ0EsY0FBVSxVQUFWLENBQXFCLElBQXJCLENBQTBCLEtBQUssYUFBL0I7QUFDQTtBQUNBLGNBQVUsY0FBVixDQUF5QixJQUF6QixDQUE4QixLQUFLLElBQW5DO0FBQ0QsR0FMRDtBQU1ELENBVkQ7O0FBWUE7QUFDQSxVQUFVLG1CQUFWLEdBQWdDLFVBQUMsT0FBRCxFQUFVLFdBQVYsRUFBMEI7QUFDeEQ7QUFDQSxJQUFFLFVBQUYsRUFBYyxLQUFkO0FBQ0E7QUFDQSxNQUFJLGlCQUFpQixDQUFyQjtBQUNBLE1BQUksZUFBZSxDQUFuQjtBQUNBLFVBQVEsT0FBUixDQUFnQixtQkFBVztBQUN6QjtBQUNBLFFBQUksMEJBQTBCLEVBQUUsT0FBRixFQUMzQixRQUQyQixDQUNsQixrQkFEa0I7QUFFNUI7QUFGNEIsS0FHM0IsR0FIMkIsQ0FHdkIsa0JBSHVCLGFBR0ssVUFBVSxVQUFWLENBQXFCLFVBQVUsU0FBVixDQUFvQixZQUFwQixFQUFrQyxlQUFlLEVBQWpELENBQXJCLENBSEwsU0FBOUI7QUFJQTtBQUNBLFFBQUkscUJBQXFCLEVBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0IsTUFBcEIsQ0FBekI7QUFDQTtBQUNBLFFBQUkscUJBQXFCLEVBQUUsTUFBRixFQUN0QixRQURzQixDQUNiLGNBRGEsRUFFdEIsSUFGc0IsTUFFZCxRQUFRLFdBRk0sQ0FBekI7QUFHQTtBQUNBLFFBQUksNEJBQTRCLEVBQUUsS0FBRixFQUM3QixRQUQ2QixDQUNwQixXQURvQixFQUU3QixJQUY2QixDQUV4QixVQUFVLFdBQVYsQ0FBc0IsY0FBdEIsQ0FGd0IsQ0FBaEM7QUFHQTtBQUNBO0FBQ0EsUUFBSSxrQkFBa0IsRUFBRSxNQUFGLEVBQVUsUUFBVixDQUFtQixXQUFuQixDQUF0QjtBQUNBO0FBQ0EsUUFBSSw0QkFBNEIsRUFBRSxPQUFGLEVBQVcsUUFBWCxDQUFvQix5QkFBcEIsQ0FBaEM7QUFDQTtBQUNBO0FBQ0EsUUFBSSxpQkFBaUIsRUFBRSxPQUFGLEVBQ2xCLFFBRGtCLENBQ1QsZUFEUyxFQUVsQixJQUZrQixDQUViO0FBQ0osZ0JBQVEsVUFBVSxVQUFWLENBQXFCLFVBQVUsU0FBVixDQUFvQixZQUFwQixFQUFrQyxlQUFlLEVBQWpELENBQXJCLENBREo7QUFFSixnQ0FBd0IsUUFBUSxXQUFoQyw2QkFBbUUsVUFBVSxjQUE3RTtBQUZJLEtBRmEsQ0FBckI7QUFNQTtBQUNBLG9CQUFnQixFQUFoQjtBQUNBO0FBQ0EsOEJBQTBCLE1BQTFCLENBQWlDLGNBQWpDO0FBQ0E7QUFDQSx1QkFBbUIsTUFBbkIsQ0FDRSxrQkFERixFQUVFLHlCQUZGLEVBR0UsZUFIRixFQUlFLHlCQUpGO0FBTUE7QUFDQSw0QkFBd0IsTUFBeEIsQ0FBK0Isa0JBQS9CO0FBQ0E7QUFDQSxNQUFFLFVBQUYsRUFBYyxNQUFkLENBQXFCLHVCQUFyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUksY0FBYyxDQUFsQjtBQUNBLGdCQUFZLE9BQVosQ0FBb0IsZ0JBQVE7QUFDMUIsVUFBSSxZQUFZLFVBQVUsY0FBVixDQUF5QixXQUF6QixDQUFoQjtBQUNBLFVBQUksWUFBWSxRQUFRLFVBQVUsYUFBVixDQUF3QixXQUF4QixDQUFSLENBQWhCO0FBQ0EsVUFBSSxrQkFBa0IsVUFBVSxvQkFBVixDQUErQixXQUEvQixDQUF0QjtBQUNBO0FBQ0E7QUFDQSxVQUFJLHNCQUFzQixFQUFFLE1BQUYsRUFBVSxRQUFWLENBQW1CLGlCQUFuQixDQUExQjtBQUNBO0FBQ0EsVUFBSSxnQ0FBZ0MsRUFBRSxPQUFGLEVBQVcsUUFBWCxDQUFvQix1Q0FBcEIsQ0FBcEM7QUFDQTtBQUNBLFVBQUksbUJBQW1CLEVBQUUsTUFBRixFQUNwQixRQURvQixDQUNYLHFEQURXLEVBRXBCLElBRm9CLENBRVosU0FGWSxVQUVFLFVBQVUsZ0JBQVYsQ0FBMkIsU0FBM0IsQ0FGRixDQUF2QjtBQUdBO0FBQ0EsVUFBSSw2R0FBSjtBQUNBO0FBQ0Esb0NBQThCLE1BQTlCLENBQXFDLGdCQUFyQyxFQUF1RCxvQkFBdkQ7QUFDQTtBQUNBLFVBQUksa0NBQWtDLEVBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0IscURBQXBCLENBQXRDO0FBQ0E7QUFDQSxVQUFJLHlCQUF5QixFQUFFLEtBQUYsRUFDMUIsUUFEMEIsQ0FDakIscURBRGlCLEVBRTFCLElBRjBCLENBRXJCLGVBRnFCLENBQTdCO0FBR0E7QUFDQSxzQ0FBZ0MsTUFBaEMsQ0FBdUMsc0JBQXZDO0FBQ0E7QUFDQSwwQkFBb0IsTUFBcEIsQ0FBMkIsNkJBQTNCLEVBQTBELCtCQUExRDtBQUNBO0FBQ0Esc0JBQWdCLE1BQWhCLENBQXVCLG1CQUF2QjtBQUNELEtBN0JEO0FBOEJELEdBaEZEOztBQWtGQSxZQUFVLFlBQVY7QUFDRCxDQXpGRDs7QUEyRkE7QUFDQSxVQUFVLFlBQVYsR0FBeUIsWUFBTTtBQUM3QixJQUFFLFVBQUYsRUFBYyxhQUFkLENBQTRCLFlBQVc7QUFDckMsTUFBRSxVQUFGLEVBQWMsR0FBZCxDQUFrQixTQUFsQixFQUE2QixPQUE3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUUsWUFBRixFQUNHLElBREgsR0FFRyxPQUZILENBRVcsRUFBRSxXQUFXLEVBQUUsVUFBRixFQUFjLE1BQWQsR0FBdUIsR0FBcEMsRUFGWCxFQUVzRCxHQUZ0RCxFQUUyRCxPQUYzRDs7QUFJQTtBQUNBLFFBQUksbUZBQUo7QUFDQSxNQUFFLFVBQUYsRUFDRyxJQURILENBQ1EsZUFEUixFQUVHLElBRkgsQ0FFUSxZQUZSOztBQUlBO0FBQ0EsTUFBRSxVQUFGLEVBQWMsUUFBZCxDQUF1QjtBQUNyQjtBQUNBLGlCQUFXLE1BRlU7QUFHckIsZUFBUyxJQUhZO0FBSXJCLGdCQUFVLElBSlc7QUFLckIsZ0JBQVUsS0FMVztBQU1yQixnQkFBVTtBQU5XLEtBQXZCO0FBUUQsR0E1QkQ7QUE2QkQsQ0E5QkQ7O0FBZ0NBO0FBQ0EsVUFBVSxzQkFBVixHQUFtQyxZQUFXO0FBQzVDLElBQUUsVUFBRixFQUFjLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsOENBQTFCLEVBQTBFLFlBQVc7QUFDbkYsUUFDRSxFQUFFLElBQUYsRUFDRyxPQURILENBQ1csa0JBRFgsRUFFRyxJQUZILENBRVEseUNBRlIsRUFHRyxRQUhILENBR1ksY0FIWixNQUdnQyxLQUpsQyxFQUtFO0FBQ0EsUUFBRSxVQUFGLEVBQ0csSUFESCxDQUNRLHlDQURSLEVBRUcsV0FGSCxDQUVlLGNBRmYsRUFHRyxRQUhILENBR1ksY0FIWjtBQUlELEtBVkQsTUFVTztBQUNMLFFBQUUsVUFBRixFQUNHLElBREgsQ0FDUSx5Q0FEUixFQUVHLFFBRkgsQ0FFWSxjQUZaO0FBR0EsUUFBRSxJQUFGLEVBQ0csT0FESCxDQUNXLGtCQURYLEVBRUcsSUFGSCxDQUVRLHlDQUZSLEVBR0csV0FISCxDQUdlLGNBSGY7QUFJRDtBQUNGLEdBcEJEO0FBcUJELENBdEJEOztBQXdCQTtBQUNBLFVBQVUsY0FBVixHQUEyQixZQUFNO0FBQy9CLFlBQVUsY0FBVjtBQUNBLFlBQVUsVUFBVjtBQUNBLFlBQVUsWUFBVjtBQUNBLFlBQVUsc0JBQVY7QUFDRCxDQUxEOztBQU9BO0FBQ0EsVUFBVSxJQUFWLEdBQWlCLFlBQVc7QUFDMUIsWUFBVSxjQUFWO0FBQ0EsWUFBVSxTQUFWO0FBQ0QsQ0FIRDs7QUFLQTtBQUNBLEVBQUUsWUFBVztBQUNYLFlBQVUsSUFBVjtBQUNELENBRkQ7O0FBSUE7O0FBRUE7QUFDQSxVQUFVLFNBQVYsR0FBc0IsWUFBTTtBQUMxQixJQUFFLFVBQUYsRUFDRyxRQURILENBQ1k7QUFDUixpQkFBYSxXQURMO0FBRVIsWUFBUSxLQUZBO0FBR1IsWUFBUSxJQUhBO0FBSVIsWUFBUSxPQUpBO0FBS1IsaUJBQWE7QUFMTCxHQURaLEVBUUcsR0FSSCxDQVFPLFVBUlAsRUFRbUIsVUFSbkI7QUFTQSxJQUFFLFFBQUYsRUFBWSxnQkFBWjtBQUNELENBWEQ7O0FBYUE7QUFDQSxVQUFVLFNBQVYsR0FBc0IsVUFBQyxXQUFELEVBQWMsU0FBZCxFQUE0QjtBQUNoRCxTQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxNQUFpQixZQUFZLFdBQTdCLENBQVgsSUFBd0QsV0FBL0Q7QUFDRCxDQUZEOztBQUlBO0FBQ0EsVUFBVSxZQUFWLEdBQXlCLFlBQU07QUFDN0IsU0FBTyxTQUFQLEVBQWtCLElBQWxCLENBQXVCLFlBQVc7QUFDaEMsUUFBSSxPQUFPLE9BQU8sSUFBUCxDQUFYO0FBQ0EsUUFBSSxRQUFRLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBWjtBQUNBLFFBQUksV0FBVyxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQWY7QUFDQSxRQUFJLFNBQVMsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFiOztBQUVBLFdBQU8sR0FBUCxDQUNFLE1BREYsRUFFRSxVQUFTLElBQVQsRUFBZTtBQUNiO0FBQ0EsVUFBSSxPQUFPLE9BQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsS0FBbEIsQ0FBWDs7QUFFQTtBQUNBLFVBQUksT0FBTyxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO0FBQ2hDLGVBQU8sS0FBSyxJQUFMLENBQVUsSUFBVixFQUFnQixLQUFoQixDQUFQO0FBQ0Q7QUFDRDtBQUNBLFVBQUksT0FBTyxRQUFQLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ25DLGVBQU8sS0FBSyxJQUFMLENBQVUsT0FBVixFQUFtQixXQUFXLGVBQTlCLENBQVA7QUFDRDs7QUFFRDtBQUNBLGFBQU8sS0FBSyxVQUFMLENBQWdCLFNBQWhCLENBQVA7O0FBRUE7QUFDQSxVQUFJLENBQUMsS0FBSyxJQUFMLENBQVUsU0FBVixDQUFELElBQXlCLEtBQUssSUFBTCxDQUFVLFFBQVYsQ0FBekIsSUFBZ0QsS0FBSyxJQUFMLENBQVUsT0FBVixDQUFwRCxFQUF3RTtBQUN0RSxhQUFLLElBQUwsQ0FBVSxTQUFWLEVBQXFCLFNBQVMsS0FBSyxJQUFMLENBQVUsUUFBVixDQUFULEdBQStCLEdBQS9CLEdBQXFDLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBMUQ7QUFDRDs7QUFFRDtBQUNBLFdBQUssV0FBTCxDQUFpQixJQUFqQjtBQUNELEtBekJILEVBMEJFLEtBMUJGO0FBNEJELEdBbENEO0FBbUNELENBcENEOztBQXNDQTtBQUNBLFVBQVUsZ0JBQVYsR0FBNkIsZ0JBQVE7QUFDbkMsU0FBTyxLQUFLLFFBQUwsR0FBZ0IsT0FBaEIsQ0FBd0IsdUJBQXhCLEVBQWlELEdBQWpELENBQVA7QUFDRCxDQUZEOzs7QUMvOEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gSU1QT1JUIEhFQVAgTU9EVUxFIEZST00gTlBNXG5jb25zdCBNaW5IZWFwID0gcmVxdWlyZShcImZhc3Rwcmlvcml0eXF1ZXVlXCIpO1xuXG4vLyBDcmVhdGUgYW4gb2JqZWN0IHJlcHJlc2VudGluZyBvdXIgdHJhdmVsIGFwcCAoTkFNRVNQQUNFKVxuY29uc3QgdHJhdmVsQXBwID0ge307XG5cbi8vIEFSUkFZIFdJVEggQUxMIFJFTEVWQU5UIFNUQVRTIEZPUiBFQUNIIFBVUlBPU0VcbnRyYXZlbEFwcC5zdGF0QXJyYXkgPSBbXG4gIC8vIFZBQ0FUSU9OIEJVVFRPTlxuICAvLyA9PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi12YWNhdGlvblwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVuc2l0eVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlBvcHVsYXRpb24gRGVuc2l0eSAobG93KVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgcG9wdWxhdGlvbiBkZW5zaXR5IGlzIG1lYXN1cmVkIGluIHBlciBrbcKyLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhhcHBpbmVzc19pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkhhcHBpbmVzcyBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkJhc2VkIG9uIGZhY3RvcnMgc3VjaCBhcyBHRFAgcGVyIGNhcGl0YSwgc29jaWFsIHN1cHBvcnQsIGxpZmUgZXhwZWN0YW5jeS4gVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoYXBwaWVyIHRoZSBjb3VudHJ5LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcInRvdXJpc3RfYXJyaXZhbHNcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJUb3VyaXN0IEFycml2YWxzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiUmVwcmVzZW50cyBmb3JlaWduIGNpdGl6ZW5zIHRoYXQgc3RheWVkIGF0IGxlYXN0IG9uZSBuaWdodC4gSW5jbHVkZXMgaG90ZWwgc3RheXMsIHRyYW5zZmVycywgY29uZmVyZW5jZSB2aXNpdHMsIGV0Yy5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJ0b3VyaXNtX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiVG91cmlzdCBFeHBlbmRpdHVyZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgYW1vdW50IG9mIGdvdmVybm1lbnQgc3BlbmRpbmcgZGVkaWNhdGVkIGZvciB0b3VyaXNtIChpbiAlIG9mIHRoZSBHRFAgZm9yIGEgY291bnRyeSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidXJiYW5fcG9wdWxhdGlvblwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlVyYmFuIFBvcHVsYXRpb24gKGhpZ2gpXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwZXJjZW50YWdlIG9mIHBlb3BsZSB3aG8gbGl2ZSBpbiBhIGNpdHkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZm9yZXN0X2FyZWFfcGVyY2VudFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkZvcmVzdCBBcmVhXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSB0b3RhbCBhbW91bnQgb2YgZm9yZXN0IGFyZWEgaW4gYSBjb3VudHJ5IChpbiBrbcKyKVwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICAvLyBFRFVDQVRJT04gQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1lZHVjYXRpb25cIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImVkdWNhdGlvbl9leHBlbmRpdHVyZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkVkdWNhdGlvbiBFeHBlbmRpdHVyZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJFZHVjYXRpb24gZXhwZW5kaXR1cmUgcmVwcmVzZW50cyBnb3Zlcm5tZW50IHNwZW5kaW5nIGluICUgb2YgR0RQLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImNvMl9lbWlzc2lvbnNcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJDTzIgRW1pc3Npb25zXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNPMiBlbWlzc2lvbnMgaW4gbWV0cmljIHRvbnMgcGVyIHBlcnNvbiBwZXIgeWVhci5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJjb3JydXB0aW9uX2luZGV4XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiQ29ycnVwdGlvbiBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDb3JydXB0aW9uIFBlcmNlcHRpb25zIEluZGV4IChDUEkpLiAoU2NhbGU6IDAtMTAwOyAwID0gaGlnaCBjb3JydXB0aW9uLiAxMDAgPSBsb3cgY29ycnVwdGlvbikuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGFwcGluZXNzX2luZGV4XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGFwcGluZXNzIEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQmFzZWQgb24gZmFjdG9ycyBzdWNoIGFzIEdEUCBwZXIgY2FwaXRhLCBzb2NpYWwgc3VwcG9ydCwgbGlmZSBleHBlY3RhbmN5LiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGhhcHBpZXIgdGhlIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGRpXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSHVtYW4gRGV2ZWxvcG1lbnQgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJJbmRpY2F0b3Igb2YgbGlmZSBleHBlY3RhbmN5LCBlZHVjYXRpb24sIGFuZCBwZXIgY2FwaXRhIGluY29tZS4gKFNjYWxlOiAwLTE7IDAgPSBsb3cgc2NvcmUuIDEgPSBoaWdoIHNjb3JlKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZWFsdGhfZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIZWFsdGggRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIHNwZW5kaW5nIG9uIGhlYWx0aCwgbWVhc3VyZWQgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIFZJU0lUT1IgVklTQSBCVVRUT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PVxuICB7XG4gICAgaWQ6IFwiYnV0dG9uLXZpc2l0LXZpc2FcIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImhhcHBpbmVzc19pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkhhcHBpbmVzcyBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkJhc2VkIG9uIGZhY3RvcnMgc3VjaCBhcyBHRFAgcGVyIGNhcGl0YSwgc29jaWFsIHN1cHBvcnQsIGxpZmUgZXhwZWN0YW5jeS4gVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoYXBwaWVyIHRoZSBjb3VudHJ5LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhlYWx0aF9leHBlbmRpdHVyZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkhlYWx0aCBFeHBlbmRpdHVyZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJQdWJsaWMgc3BlbmRpbmcgb24gaGVhbHRoLCBtZWFzdXJlZCBpbiAlIG9mIEdEUC5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJ0b3VyaXN0X2Fycml2YWxzXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiVG91cmlzdCBBcnJpdmFsc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIlJlcHJlc2VudHMgZm9yZWlnbiBjaXRpemVucyB0aGF0IHN0YXllZCBhdCBsZWFzdCBvbmUgbmlnaHQuIEluY2x1ZGVzIGhvdGVsIHN0YXlzLCB0cmFuc2ZlcnMsIGNvbmZlcmVuY2UgdmlzaXRzLCBldGMuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVuc2l0eVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlBvcHVsYXRpb24gRGVuc2l0eSAobG93KVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgcG9wdWxhdGlvbiBkZW5zaXR5IGlzIG1lYXN1cmVkIGluIHBlciBrbcKyLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImNvMl9lbWlzc2lvbnNcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJDTzIgRW1pc3Npb25zXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNPMiBlbWlzc2lvbnMgaW4gbWV0cmljIHRvbnMgcGVyIHBlcnNvbiBwZXIgeWVhci5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJpbmZsYXRpb25cIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJJbmZsYXRpb25cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIGFubnVhbCBjaGFuZ2Ugb2YgY29uc3VtZXIgcHJpY2VzICh1bml0OiAlKS5cIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgLy8gV09SS0lORyBIT0xJREFZIEJVVFRPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XG4gIHtcbiAgICBpZDogXCJidXR0b24td29yay1ob2xpZGF5XCIsXG4gICAgc3RhdHM6IFtcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJkZW5zaXR5XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiUG9wdWxhdGlvbiBEZW5zaXR5IChsb3cpXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwb3B1bGF0aW9uIGRlbnNpdHkgaXMgbWVhc3VyZWQgaW4gcGVyIGttwrIuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidG91cmlzdF9hcnJpdmFsc1wiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlRvdXJpc3QgQXJyaXZhbHNcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJSZXByZXNlbnRzIGZvcmVpZ24gY2l0aXplbnMgdGhhdCBzdGF5ZWQgYXQgbGVhc3Qgb25lIG5pZ2h0LiBJbmNsdWRlcyBob3RlbCBzdGF5cywgdHJhbnNmZXJzLCBjb25mZXJlbmNlIHZpc2l0cywgZXRjLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogXCJidXR0b24tcGVybS1zb2xvXCIsXG4gICAgICAgIHN0YXQ6IFwiZ2luaVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkdpbmkgQ29lZmZpY2llbnRcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJTdGF0ZXMgaG93IHVuaWZvcm1seSBhc3NldHMgYXJlIGRpc3RyaWJ1dGVkLiAoc2NhbGU6IDAtMTAwOyAwID0gZXF1YWwgZGlzdHJpYnV0aW9uLiAxMDAgPSB1bmVxdWFsIGRpc3RyaWJ1dGlvbikuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGFwcGluZXNzX2luZGV4XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGFwcGluZXNzIEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQmFzZWQgb24gZmFjdG9ycyBzdWNoIGFzIEdEUCBwZXIgY2FwaXRhLCBzb2NpYWwgc3VwcG9ydCwgbGlmZSBleHBlY3RhbmN5LiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGhhcHBpZXIgdGhlIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiam9ibGVzc19yYXRlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSm9ibGVzcyBSYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBudW1iZXIgb2YgdW5lbXBsb3llZCBwZW9wbGUgaW4gcmVsYXRpb24gdG8gdGhlIGxhYm9yIGZvcmNlIGZvciBhIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibWVkaWFud2FnZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIk1lZGlhbiBXYWdlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQSBtZWFzdXJlIG9mIHRoZSBtb250aGx5IG1lZGlhbiB3YWdlIGJlZm9yZSB0YXhlcywgaW5jbHVkaW5nIHB1YmxpYyBiZW5lZml0cyAoZS5nIGNoaWxkIGFsbG93YW5jZSk7IHVuaXQ6IFVTRC5cIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgLy8gUEVSTUFORU5ULVNPTE8gQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1wZXJtLXNvbG9cIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImhkaVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkh1bWFuIERldmVsb3BtZW50IEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiSW5kaWNhdG9yIG9mIGxpZmUgZXhwZWN0YW5jeSwgZWR1Y2F0aW9uLCBhbmQgcGVyIGNhcGl0YSBpbmNvbWUuIChTY2FsZTogMC0xOyAwID0gbG93IHNjb3JlLiAxID0gaGlnaCBzY29yZSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiY29ycnVwdGlvbl9pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkNvcnJ1cHRpb24gSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ29ycnVwdGlvbiBQZXJjZXB0aW9ucyBJbmRleCAoQ1BJKS4gKFNjYWxlOiAwLTEwMDsgMCA9IGhpZ2ggY29ycnVwdGlvbi4gMTAwID0gbG93IGNvcnJ1cHRpb24pLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcIm1lZGlhbndhZ2VcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJNZWRpYW4gV2FnZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkEgbWVhc3VyZSBvZiB0aGUgbW9udGhseSBtZWRpYW4gd2FnZSBiZWZvcmUgdGF4ZXMsIGluY2x1ZGluZyBwdWJsaWMgYmVuZWZpdHMgKGUuZyBjaGlsZCBhbGxvd2FuY2UpOyB1bml0OiBVU0QuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaW5mbGF0aW9uXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSW5mbGF0aW9uXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhbm51YWwgY2hhbmdlIG9mIGNvbnN1bWVyIHByaWNlcyAodW5pdDogJSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGVhbHRoX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGVhbHRoIEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlB1YmxpYyBzcGVuZGluZyBvbiBoZWFsdGgsIG1lYXN1cmVkIGluICUgb2YgR0RQLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcInVyYmFuX3BvcHVsYXRpb25cIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJVcmJhbiBQb3B1bGF0aW9uIChoaWdoKVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgcGVyY2VudGFnZSBvZiBwZW9wbGUgd2hvIGxpdmUgaW4gYSBjaXR5LlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICAvLyBQRVJNQU5FTlQtQ09VUExFIEJVVFRPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XG4gIHtcbiAgICBpZDogXCJidXR0b24tcGVybS1jb3VwbGVcIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImhkaVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkh1bWFuIERldmVsb3BtZW50IEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiSW5kaWNhdG9yIG9mIGxpZmUgZXhwZWN0YW5jeSwgZWR1Y2F0aW9uLCBhbmQgcGVyIGNhcGl0YSBpbmNvbWUuIChTY2FsZTogMC0xOyAwID0gbG93IHNjb3JlLiAxID0gaGlnaCBzY29yZSkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiam9ibGVzc19yYXRlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSm9ibGVzcyBSYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBudW1iZXIgb2YgdW5lbXBsb3llZCBwZW9wbGUgaW4gcmVsYXRpb24gdG8gdGhlIGxhYm9yIGZvcmNlIGZvciBhIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBcImJ1dHRvbi1wZXJtLXNvbG9cIixcbiAgICAgICAgc3RhdDogXCJnaW5pXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiR2luaSBDb2VmZmljaWVudFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIlN0YXRlcyBob3cgdW5pZm9ybWx5IGFzc2V0cyBhcmUgZGlzdHJpYnV0ZWQuIChzY2FsZTogMC0xMDA7IDAgPSBlcXVhbCBkaXN0cmlidXRpb24uIDEwMCA9IHVuZXF1YWwgZGlzdHJpYnV0aW9uKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoYXBwaW5lc3NfaW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIYXBwaW5lc3MgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJCYXNlZCBvbiBmYWN0b3JzIHN1Y2ggYXMgR0RQIHBlciBjYXBpdGEsIHNvY2lhbCBzdXBwb3J0LCBsaWZlIGV4cGVjdGFuY3kuIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgaGFwcGllciB0aGUgY291bnRyeS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJkZWF0aF9yYXRlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiUmF0ZSBvZiBEZWF0aHNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIGF2ZXJhZ2UgbnVtYmVyIG9mIGRlYXRocyBwZXIgeWVhciBwZXIgMSwwMDAgcGVvcGxlLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImRlYnRzX3BlcmNlbnRcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJHb3Zlcm5tZW50IERlYnRcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHBlcmNlbnRhZ2Ugb2YgZ292ZXJubWVudCBib3Jyb3dpbmdzIGluIHJlbGF0aW9uIHRvIHRoZSBHRFAuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIFBFUk1BTkVOVC1GQU1JTFkgQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1wZXJtLWZhbWlseVwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZWR1Y2F0aW9uX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiRWR1Y2F0aW9uIEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkVkdWNhdGlvbiBleHBlbmRpdHVyZSByZXByZXNlbnRzIGdvdmVybm1lbnQgc3BlbmRpbmcgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGVhbHRoX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGVhbHRoIEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlB1YmxpYyBzcGVuZGluZyBvbiBoZWFsdGgsIG1lYXN1cmVkIGluICUgb2YgR0RQLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImxpdGVyYWN5X3JhdGVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJMaXRlcmFjeSBSYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwZXJjZW50YWdlIG9mIHBlb3BsZSB0aGF0IGhhdmUgdGhlIGFiaWxpdHkgdG8gcmVhZCBhbmQgd3JpdGUgYnkgYWdlIDE1LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImxpZmVfZXhwZWN0YW5jeVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkxpZmUgRXhwZWN0YW5jeVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgYXZlcmFnZSBudW1iZXIgb2YgeWVhcnMgYSBwZXJzb24gd2lsbCBsaXZlIChhdCBiaXJ0aCkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVhdGhfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlJhdGUgb2YgRGVhdGhzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhdmVyYWdlIG51bWJlciBvZiBkZWF0aHMgcGVyIHllYXIgcGVyIDEsMDAwIHBlb3BsZS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJtZWRpYW53YWdlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiTWVkaWFuIFdhZ2VcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJBIG1lYXN1cmUgb2YgdGhlIG1vbnRobHkgbWVkaWFuIHdhZ2UgYmVmb3JlIHRheGVzLCBpbmNsdWRpbmcgcHVibGljIGJlbmVmaXRzIChlLmcgY2hpbGQgYWxsb3dhbmNlKTsgdW5pdDogVVNELlwiXG4gICAgICB9XG4gICAgXVxuICB9XG5dO1xuXG4vKiAwLiBHRVQgU1RBUlRFRCAqL1xudHJhdmVsQXBwLmdldFN0YXJ0ZWQgPSAoKSA9PiB7XG4gIC8vIExpc3RlbnMgZm9yIGNsaWNrIG9uIEdFVCBTVEFSVEVEIEJVVFRPTlxuICAkKFwiLndlbGNvbWVfX2J1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFNtb290aCBzY3JvbGwgdG8gbmV4dCBzZWN0aW9uXG4gICAgJChcImh0bWwsIGJvZHlcIilcbiAgICAgIC5zdG9wKClcbiAgICAgIC5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkKFwiLnB1cnBvc2Utc2VjdGlvblwiKS5vZmZzZXQoKS50b3AgfSwgOTAwLCBcInN3aW5nXCIpO1xuICB9KTtcbn07XG5cbi8qIDEuIEdFVCBVU0VSIElOUFVUICovXG50cmF2ZWxBcHAuZ2V0VXNlclB1cnBvc2UgPSAoKSA9PiB7XG4gICQoXCIudHJhdmVsLWZvcm1fX2J1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFN0b3JlIHVzZXIgaW5wdXQgaW4gdmFyaWFibGVcbiAgICBjb25zdCBpbnB1dElEID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgdHJhdmVsQXBwLnVzZXJQdXJwb3NlID0gaW5wdXRJRDtcblxuICAgIC8vIENhbGwgdGhlIGRpc3BsYXkgc3RhdHMgZnVuY3Rpb25cbiAgICB0cmF2ZWxBcHAuZGlzcGxheVN0YXRzKHRyYXZlbEFwcC51c2VyUHVycG9zZSk7XG5cbiAgICAvLyBEaXNwbGF5IHRoZSBjcml0ZXJpYXMgdG8gYmUgY2hvc2VuXG4gICAgJChcIi5jcml0ZXJpYXNcIikuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIik7XG5cbiAgICAvLyBTbW9vdGggU2Nyb2xsIHRvIGNyaXRlcmlhJ3Mgc2VjdGlvblxuICAgICQoXCJodG1sLCBib2R5XCIpXG4gICAgICAuc3RvcCgpXG4gICAgICAuYW5pbWF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvcDogJChcIi5jcml0ZXJpYXNcIikub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sXG4gICAgICAgIDkwMCxcbiAgICAgICAgXCJzd2luZ1wiXG4gICAgICApO1xuICB9KTtcbn07XG5cbi8qIDIuIERJU1BMQVkgQUxMIFNUQVRTIEZPUiBUSEUgU0VMRUNURUQgUFVSUE9TRSBPTiBTQ1JFRU4gKi9cbnRyYXZlbEFwcC5kaXNwbGF5U3RhdHMgPSBwdXJwb3NlSUQgPT4ge1xuICAkKFwiLmNob2ljZXNcIikuZW1wdHkoKTtcbiAgLy8gSGVhZGVyIGZvciB0aGUgY2hvb3NlIENyaXRlcmlhIHNlY3Rpb25cbiAgJChcIi5jcml0ZXJpYS1oZWFkZXJcIikudGV4dChcbiAgICBcIlBsZWFzZSByYW5rIHRoZSBmb2xsb3dpbmcgY3JpdGVyaWEgaW4gb3JkZXIgb2YgaW1wb3J0YW5jZSBmcm9tIHRvcCB0byBib3R0b20uIFVzZSB5b3VyIGN1cnNvciB0byBkcmFnIGFuZCBkcm9wIHRoZSBpdGVtcy5cIlxuICApO1xuICAvLyBBZGQgY3NzIHBvc2l0aW9uIHRvIGNyaXRlcmlhIGNvbnRhaW5lclxuICAkKFwiLmNob2ljZXMtbGlzdC1jb250YWluZXJcIikuY3NzKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKTtcblxuICAvLyBHbyB0aHJvdWdoIGVhY2ggcHVycG9zZSBvYmplY3QgaW4gdGhlIFN0YXQgQXJyYXlcbiAgdHJhdmVsQXBwLnN0YXRBcnJheS5mb3JFYWNoKHB1cnBvc2VPYmogPT4ge1xuICAgIC8vIElmIHRoZSBwdXJwb3NlIElEIG1hdGNoZXMgdGhlIHB1cnBvc2UgT2JqZWN0IGlkXG4gICAgaWYgKHB1cnBvc2VJRCA9PT0gcHVycG9zZU9iai5pZCkge1xuICAgICAgLy8gR28gdGhyb3VnaCBldmVyeSBzdGF0IGZvciB0aGlzIHB1cnBvc2VcbiAgICAgIHB1cnBvc2VPYmouc3RhdHMuZm9yRWFjaChzdGF0ID0+IHtcbiAgICAgICAgLy8gQXBwZW5kIGVhY2ggb2YgdGhlIHN0YXQgbmFtZSBvbiBzY3JlZW4gZm9yIHRoZSB1c2VyIHRvIHJhbmtcbiAgICAgICAgbGV0IG1hcmtVcEl0ZW0gPSAkKFwiPGxpPlwiKVxuICAgICAgICAgIC5hdHRyKFwiaWRcIiwgc3RhdC5zdGF0KVxuICAgICAgICAgIC5hZGRDbGFzcyhcImNyaXRlcmlhXCIpXG4gICAgICAgICAgLnRleHQoc3RhdC5zdGF0TmFtZSk7XG4gICAgICAgICQoXCIuY2hvaWNlc1wiKS5hcHBlbmQobWFya1VwSXRlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGFwcGVuZCBzdWJtaXQgYnV0dG9uXG4gIGxldCBtYXJrVXBCdXR0b24gPSBgPGxpPjxidXR0b24gY2xhc3M9XCJ1c2VyLXN1Ym1pdCBidG5cIj5TdWJtaXQgUmFua2luZzwvYnV0dG9uPjwvbGk+YDtcbiAgJChcIi5jaG9pY2VzXCIpLmFwcGVuZChtYXJrVXBCdXR0b24pO1xuXG4gIHRyYXZlbEFwcC5nZXRVc2VyUmFua2luZ3MoKTtcbn07XG5cbi8qIDMuIE9CVEFJTiBUSEUgUkFOS0lORyBPRiBUSEUgU1RBVFMgRlJPTSBVU0VSICovXG50cmF2ZWxBcHAuZ2V0VXNlclJhbmtpbmdzID0gKCkgPT4ge1xuICAkKFwiLmNob2ljZXNcIikub24oXCJjbGlja1wiLCBcIi51c2VyLXN1Ym1pdFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyByZW1vdmUgc3VibWl0IGJ1dHRvbiBhbmQgcHV0IGEgbG9hZGVyIHVudGlsIHRoZSByZXN1bHRzIGNvbWUgYmFja1xuICAgIC8vIC5odG1sKGA8aW1nIGNsYXNzPVwibG9hZGVyXCIgc3JjPVwiLi4vLi4vYXNzZXRzL3NwaW5uZXItMXMtMTAwcHguc3ZnXCI+YCk7XG4gICAgJChcIi5jaG9pY2VzXCIpLmZpbmQoXG4gICAgICBcImxpOmxhc3QtY2hpbGRcIlxuICAgICkuaHRtbChgPHN2ZyBjbGFzcz1cImxkcy1zcGlubmVyIGxvYWRlclwiIHdpZHRoPVwiMTAwcHhcIiAgaGVpZ2h0PVwiMTAwcHhcIiAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZFwiIHN0eWxlPVwiYmFja2dyb3VuZDogbm9uZTtcIj48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoMCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNmZDkzNDFcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjkxNjY2NjY2NjY2NjY2NjZzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDMwIDUwIDUwKVwiPlxuICA8cmVjdCB4PVwiNDdcIiB5PVwiMjRcIiByeD1cIjkuNFwiIHJ5PVwiNC44XCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMTJcIiBmaWxsPVwiI2ZkOTM0MVwiPlxuICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJvcGFjaXR5XCIgdmFsdWVzPVwiMTswXCIga2V5VGltZXM9XCIwOzFcIiBkdXI9XCIxc1wiIGJlZ2luPVwiLTAuODMzMzMzMzMzMzMzMzMzNHNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoNjAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC43NXNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoOTAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC42NjY2NjY2NjY2NjY2NjY2c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgxMjAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC41ODMzMzMzMzMzMzMzMzM0c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgxNTAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC41c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC40MTY2NjY2NjY2NjY2NjY3c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgyMTAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC4zMzMzMzMzMzMzMzMzMzMzc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgyNDAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC4yNXNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoMjcwIDUwIDUwKVwiPlxuICA8cmVjdCB4PVwiNDdcIiB5PVwiMjRcIiByeD1cIjkuNFwiIHJ5PVwiNC44XCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMTJcIiBmaWxsPVwiI2ZkOTM0MVwiPlxuICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJvcGFjaXR5XCIgdmFsdWVzPVwiMTswXCIga2V5VGltZXM9XCIwOzFcIiBkdXI9XCIxc1wiIGJlZ2luPVwiLTAuMTY2NjY2NjY2NjY2NjY2NjZzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDMwMCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNmZDkzNDFcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjA4MzMzMzMzMzMzMzMzMzMzc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgzMzAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCIwc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjwvc3ZnPmApO1xuXG4gICAgLy8gZ2V0IHRoZSB1c2VyIHJhbmtpbmdzIGZyb20gaGlzIG9yZGVyaW5nIG9mIHN0YXRzIGFuZCBzdG9yZSBpbiBhIHZhcmlhYmxlXG4gICAgbGV0IHVzZXJSYW5raW5ncyA9ICQoXCIuY2hvaWNlc1wiKVswXS5jaGlsZHJlbjtcblxuICAgIC8vIGluaXRpYWxpemUgYW4gZW1wdHkgYXJyYXkgdG8gc3RvcmUgdGhlIHRvcCAzIHJhbmtpbmdzXG4gICAgbGV0IHN0YXRzRm9yQVBJQ2FsbCA9IFtdO1xuXG4gICAgLy8gZ2V0IGZpcnN0IHRvcCAzIHJhbmtpbmdzIChzdGF0cyBpbiAxc3QsIDJuZCBhbmQgM3JkIHBvc2l0aW9ucylcbiAgICAvLyBhbmQgc3RvcmUgdGhlbSBpbnNpZGUgYW4gYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgc3RhdHNGb3JBUElDYWxsLnB1c2godXNlclJhbmtpbmdzW2ldLmlkKTtcbiAgICB9XG5cbiAgICAvLyBJTklUSUFMSVpFIEFMTCBHTE9CQUwgVkFSSUFCTEVTIEZPUiBESVNQTEFZIEFUIFRIRSBFTkRcbiAgICB0cmF2ZWxBcHAud2lraUV4dHJhY3QgPSBbXTtcbiAgICB0cmF2ZWxBcHAuc3RhdE5hbWVzQXJyYXkgPSBbXTtcbiAgICB0cmF2ZWxBcHAuc3RhdERlc2NyaXB0aW9uQXJyYXkgPSBbXTtcbiAgICB0cmF2ZWxBcHAuc3RhdENvZGVBcnJheSA9IFtdO1xuICAgIHRyYXZlbEFwcC53aWtpUHJvbWlzZUFycmF5ID0gW107XG4gICAgdHJhdmVsQXBwLnBpeGFQcm9taXNlQXJyYXkgPSBbXTtcbiAgICB0cmF2ZWxBcHAuaW1hZ2VBcnJheSA9IFtdO1xuICAgIHRyYXZlbEFwcC5pbWFnZVRleHRBcnJheSA9IFtdO1xuXG4gICAgLy8gJChcIi5yZXN1bHRzXCIpLmZsaWNraXR5KFwiZGVzdHJveVwiKTtcblxuICAgIHRyYXZlbEFwcC5nZXRTdGF0KC4uLnN0YXRzRm9yQVBJQ2FsbCk7XG4gIH0pO1xufTtcblxuLyogNC4gU0VORCBBSkFYIFJFUVVFU1QgVE8gSU5RU1RBVFMgQVBJICovXG5cbi8vIFN0b3JlIGltcG9ydGFudCBpbmZvIGZvciBjYWxscyB0byB0aGUgSU5RU3RhdHMgQVBJLlxudHJhdmVsQXBwLnN0YXRLZXkgPSBcIjVkMzY4N2M3YzE3ODhkNWZcIjtcbnRyYXZlbEFwcC5zdGF0VVJMID0gXCJodHRwOi8vaW5xc3RhdHNhcGkuaW5xdWJ1LmNvbVwiO1xudHJhdmVsQXBwLmdldFN0YXQgPSAoc3RhdFR5cGUxLCBzdGF0VHlwZTIsIHN0YXRUeXBlMykgPT4ge1xuICAkLmFqYXgoe1xuICAgIHVybDogdHJhdmVsQXBwLnN0YXRVUkwsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICBkYXRhOiB7XG4gICAgICBhcGlfa2V5OiB0cmF2ZWxBcHAuc3RhdEtleSxcbiAgICAgIGRhdGE6IGBoZGksJHtzdGF0VHlwZTF9LCR7c3RhdFR5cGUyfSwke3N0YXRUeXBlM31gLFxuICAgICAgY21kOiBcImdldFdvcmxkRGF0YVwiXG4gICAgfVxuICB9KS50aGVuKHJlcyA9PiB7XG4gICAgLy8gY2FsbGluZyB0aGUgY2FsY3VsYXRpb24gZnVuY3Rpb24gdG8gZ2V0IHRoZSB0b3AgbiAvIGJvdHRvbSBuIGNvdW50cmllc1xuXG4gICAgLy9maW5hbFJlc3VsdHMgaG9sZHMgdGhlIGZpbmFsIDMgY291dHJpZXMgYW5kIGFsbCBvZiB0aGVpciBzdGF0c1xuICAgIGxldCBmaW5hbFJlc3VsdHMgPSB0cmF2ZWxBcHAuZ2V0UmVjb21tZW5kYXRpb25zKHJlcywgc3RhdFR5cGUxLCBzdGF0VHlwZTIsIHN0YXRUeXBlMyk7XG5cbiAgICAvLyBHZXQgd2lraSBhbmQgcGl4YSBleHRyYWN0cyBmb3IgZWFjaCBjb3VudHJ5XG4gICAgZmluYWxSZXN1bHRzLmZvckVhY2goY291bnRyeU9iaiA9PiB7XG4gICAgICAvLyBnZXQgd2lraSBleHRyYWN0cyBhbmQgcHV0IHByb21pc2VzIGludG8gYXJyYXlcbiAgICAgIHRyYXZlbEFwcC53aWtpUHJvbWlzZUFycmF5LnB1c2godHJhdmVsQXBwLmdldFdpa2koY291bnRyeU9iai5jb3VudHJ5TmFtZSkpO1xuXG4gICAgICAvLyBnZXQgcGl4YSBleHRyYWN0cyBhbmQgcHV0IHByb21pc2VzIGludG8gYXJyYXlcbiAgICAgIHRyYXZlbEFwcC5waXhhUHJvbWlzZUFycmF5LnB1c2godHJhdmVsQXBwLmdldFBpeGEoY291bnRyeU9iai5jb3VudHJ5TmFtZSkpO1xuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBhbGwgd2lraSBhbmQgcGl4YSBwcm9taXNlcyBhcmUgZnVsZmlsbGVkLCBzdG9yZSB0aGUgcmVzdWx0c1xuICAgIC8vIHRvIHByZXBhcmUgdGhlbSBmb3IgZGlzcGxheVxuICAgICQud2hlbiguLi50cmF2ZWxBcHAud2lraVByb21pc2VBcnJheSwgLi4udHJhdmVsQXBwLnBpeGFQcm9taXNlQXJyYXkpLnRoZW4oKC4uLndpa2lQaXhhUmVzdWx0cykgPT4ge1xuICAgICAgLy8gZ28gdGhyb3VnaCB0aGUgd2lraVBpeGEgcmVzdWx0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWtpUGl4YVJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZmlyc3QgdGhyZWUgYXJlIHdpa2ksIHB1c2ggKHN0b3JlKSBpbnRvIGFycmF5XG4gICAgICAgIGlmIChpIDwgMykge1xuICAgICAgICAgIHRyYXZlbEFwcC5zdG9yZVdpa2kod2lraVBpeGFSZXN1bHRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsYXN0IHRocmVlIGFyZSBwaXhhLCBwdXNoIChzdG9yZSkgaW50byBhcnJheVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RvcmVQaXhhKHdpa2lQaXhhUmVzdWx0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gT25jZSByZXN1bHRzIGFsbCBzdG9yZWQsIGRpc3BsYXkgYWxsIGluZm8gb24gc2NyZWVuICgzIGNvdW50cmllcywgd2lraSBhbmQgcGl4YSlcbiAgICAgIHRyYXZlbEFwcC5kaXNwbGF5RGVzdGluYXRpb25zKGZpbmFsUmVzdWx0cywgW3N0YXRUeXBlMSwgc3RhdFR5cGUyLCBzdGF0VHlwZTNdKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKiA1LiBTVEFSVCBDQUxDVUxBVElPTiBGT1IgMyBSRUNPTU1FTkRFRCBDT1VOVFJJRVMgKi9cbnRyYXZlbEFwcC5nZXRSZWNvbW1lbmRhdGlvbnMgPSAocmVzLCBzdGF0VHlwZTEsIHN0YXRUeXBlMiwgc3RhdFR5cGUzKSA9PiB7XG4gIC8vIEZpbmQgZGlyZWN0aW9uIG9mIGVhY2ggc3RhdCB0eXBlIGFuZCByZXR1cm4gaXQgaW4gYW4gYXJyYXlcbiAgbGV0IGFyckRpcmVjdGlvbnMgPSB0cmF2ZWxBcHAuZmluZERpcmVjdGlvbnMoc3RhdFR5cGUxLCBzdGF0VHlwZTIsIHN0YXRUeXBlMyk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBhcnJheXMgYW5kIG51bWJlcnMgZm9yIGVhY2ggcm91bmQgb2YgaXRlcmF0aW9uL2ZpbHRlcmluZ1xuICBsZXQgaW5pdGlhbEFyciA9IFtdO1xuICBsZXQgYXJyMSA9IFtdO1xuICBsZXQgYXJyMiA9IFtdO1xuICBsZXQgYXJyMyA9IFtdO1xuICBsZXQgaW5pdGlhbEl0ZXIgPSA2MDtcbiAgbGV0IGl0ZXJhdGlvbjEgPSAxMDtcbiAgbGV0IGl0ZXJhdGlvbjIgPSA1O1xuICBsZXQgaXRlcmF0aW9uMyA9IDM7XG5cbiAgLy9Jbml0aWFsIGZpbHRlciB0byBhY2NvdW50IGZvciByZWFsaXN0aWMgcmVzdWx0cyAoYmFzZWQgb24gSERJKVxuICBpbml0aWFsQXJyID0gdHJhdmVsQXBwLmRldGVybWluZVJlc3VsdHMocmVzLCBcImhkaVwiLCBcIm1heFwiLCBpbml0aWFsSXRlcik7XG5cbiAgLy8gSVRFUkFUSU9OIDFcbiAgYXJyMSA9IHRyYXZlbEFwcC5kZXRlcm1pbmVSZXN1bHRzKGluaXRpYWxBcnIsIHN0YXRUeXBlMSwgYXJyRGlyZWN0aW9uc1swXSwgaXRlcmF0aW9uMSk7XG5cbiAgLy8gSVRFUkFUSU9OIDJcbiAgYXJyMiA9IHRyYXZlbEFwcC5kZXRlcm1pbmVSZXN1bHRzKGFycjEsIHN0YXRUeXBlMiwgYXJyRGlyZWN0aW9uc1sxXSwgaXRlcmF0aW9uMik7XG5cbiAgLy8gSVRFUkFUSU9OIDNcbiAgYXJyMyA9IHRyYXZlbEFwcC5kZXRlcm1pbmVSZXN1bHRzKGFycjIsIHN0YXRUeXBlMywgYXJyRGlyZWN0aW9uc1syXSwgaXRlcmF0aW9uMyk7XG5cbiAgLy8gcmV0dXJuIHRoZSBhcnJheSB3aXRoIHRoZSBmaW5hbCByZXN1bHRzXG4gIHJldHVybiBhcnIzO1xufTtcblxuLyogNS4xIEZJTkQgTUlOL01BWCBGT1IgRUFDSCBTVEFUIFRZUEUgKi9cbnRyYXZlbEFwcC5maW5kRGlyZWN0aW9ucyA9IChzdGF0VHlwZTEsIHN0YXRUeXBlMiwgc3RhdFR5cGUzKSA9PiB7XG4gIC8vIEZpbmQgd2hldGhlciBlYWNoIHN0YXR0eXBlIGlzIG1heCBvciBtaW5cbiAgbGV0IHN0YXQxRGlyZWN0aW9uID0gXCJcIjtcbiAgbGV0IHN0YXQyRGlyZWN0aW9uID0gXCJcIjtcbiAgbGV0IHN0YXQzRGlyZWN0aW9uID0gXCJcIjtcblxuICAvLyBMb29wIHRocm91Z2ggdGhlIFN0YXQgQXJyYXkgdG8gZmluZCBkaXJlY3Rpb24gb2Ygc3RhdHR5cGVzXG4gIHRyYXZlbEFwcC5zdGF0QXJyYXkuZm9yRWFjaChwdXJwb3NlID0+IHtcbiAgICAvLyBpZiB0aGUgY3VycmVudCBwdXJwb3NlIG1hdGNoZXMgdGhlIHVzZXIgcHVycG9zZSxcbiAgICBpZiAocHVycG9zZS5pZCA9PT0gdHJhdmVsQXBwLnVzZXJQdXJwb3NlKSB7XG4gICAgICAvLyBnbyB0aHJvdWdoIHRoZSBzdGF0cyBhcnJheSBvZiB0aGF0IHB1cnBvc2Ugb2JqZWN0XG4gICAgICBwdXJwb3NlLnN0YXRzLmZvckVhY2goc3RhdCA9PiB7XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHN0YXQgaW4gdGhlIHN0YXRzIGFycmF5IGlzIHN0YXR0eXBlMSwgZ2V0IHRoaXMgZGlyZWN0aW9uXG4gICAgICAgIGlmIChzdGF0LnN0YXQgPT09IHN0YXRUeXBlMSkge1xuICAgICAgICAgIHN0YXQxRGlyZWN0aW9uID0gc3RhdC5kaXJlY3Rpb247XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXRDb2RlQXJyYXkucHVzaChzdGF0LnN0YXQpO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0TmFtZXNBcnJheS5wdXNoKHN0YXQuc3RhdE5hbWUpO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0RGVzY3JpcHRpb25BcnJheS5wdXNoKHN0YXQuZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHN0YXQgaW4gdGhlIHN0YXRzIGFycmF5IGlzIHN0YXR0eXBlMiwgZ2V0IHRoaXMgZGlyZWN0aW9uXG4gICAgICAgIGVsc2UgaWYgKHN0YXQuc3RhdCA9PT0gc3RhdFR5cGUyKSB7XG4gICAgICAgICAgc3RhdDJEaXJlY3Rpb24gPSBzdGF0LmRpcmVjdGlvbjtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdENvZGVBcnJheS5wdXNoKHN0YXQuc3RhdCk7XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXROYW1lc0FycmF5LnB1c2goc3RhdC5zdGF0TmFtZSk7XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXREZXNjcmlwdGlvbkFycmF5LnB1c2goc3RhdC5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgc3RhdCBpbiB0aGUgc3RhdHMgYXJyYXkgaXMgc3RhdHR5cGUzLCBnZXQgdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgZWxzZSBpZiAoc3RhdC5zdGF0ID09PSBzdGF0VHlwZTMpIHtcbiAgICAgICAgICBzdGF0M0RpcmVjdGlvbiA9IHN0YXQuZGlyZWN0aW9uO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0Q29kZUFycmF5LnB1c2goc3RhdC5zdGF0KTtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdE5hbWVzQXJyYXkucHVzaChzdGF0LnN0YXROYW1lKTtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdERlc2NyaXB0aW9uQXJyYXkucHVzaChzdGF0LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gW3N0YXQxRGlyZWN0aW9uLCBzdGF0MkRpcmVjdGlvbiwgc3RhdDNEaXJlY3Rpb25dO1xufTtcblxuLyogNS4yIEZVTkNUSU9OIFRPIERFVEVSTUlORSBXSEVUSEVSIFRIRSBUT1AgT1IgQk9UVE9NIFNDT1JFUyBTSE9VTEQgQkUgRk9VTkQgKi9cbnRyYXZlbEFwcC5kZXRlcm1pbmVSZXN1bHRzID0gKGFycmF5LCBzdGF0VHlwZSwgZGlyZWN0aW9uLCBpdGVyYXRpb25OdW1iZXIpID0+IHtcbiAgbGV0IHJlc3VsdEFycmF5ID0gW107XG4gIC8vIGlmIHdlIHdhbnQgVE9QIG51bWJlcnNcbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJtYXhcIikge1xuICAgIHJlc3VsdEFycmF5ID0gdHJhdmVsQXBwLmRldGVybWluZU5Db3VudHJpZXMoYXJyYXksIHN0YXRUeXBlLCBpdGVyYXRpb25OdW1iZXIsIDEpO1xuICB9XG4gIC8vIGlmIHdlIHdhbnQgQk9UIG51bWJlcnNcbiAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcIm1pblwiKSB7XG4gICAgcmVzdWx0QXJyYXkgPSB0cmF2ZWxBcHAuZGV0ZXJtaW5lTkNvdW50cmllcyhhcnJheSwgc3RhdFR5cGUsIGl0ZXJhdGlvbk51bWJlciwgLTEpO1xuICB9XG4gIHJldHVybiByZXN1bHRBcnJheTtcbn07XG5cbi8qIDUuMyBDQUxDVUxBVEUgVEhFIE4gQ09VTlRSSUVTICovXG50cmF2ZWxBcHAuZGV0ZXJtaW5lTkNvdW50cmllcyA9IChyZXN1bHQsIHN0YXRUeXBlLCBuLCBkaXJlY3Rpb24pID0+IHtcbiAgLy8gaW5pdGlhbGl6ZSBhIGhlYXAgYXJyYXkgdG8ga2VlcCB0cmFjayBvZiB0aGUgbiBsYXJnZXN0L3NtYWxsZXN0IHN0YXQgc2NvcmVzXG4gIGxldCBoZWFwID0gbmV3IE1pbkhlYXAoKTtcblxuICAvLyBpbml0aWFsaXplIGEgc2Vjb25kYXJ5IGFycmF5IHRvIGtlZXAgdHJhY2sgb2YgdGhlIG4gc2NvcmVzIEFORFxuICAvLyB0aGUgYXNzb2NpYXRlZCBjb3VudHJ5IHRvIGVhY2ggc2NvcmVcbiAgbGV0IG5Db3VudHJpZXMgPSBbXTtcblxuICAvLyBzdG9yZSB0aGUgc3RhdCB0eXBlIGludG8gYSBwcm9wZXJ0eSB2YXJpYWJsZSBmb3IgZWFzaWVyIHVzZVxuICBsZXQgcHJvcGVydHkgPSBzdGF0VHlwZTtcblxuICAvLyBzdGFydCBhIGNvdW50cnkgY291bnRlciBhdCAwIGp1c3QgZm9yIHRoZSBzYWtlIG9mIGFkZGluZyB0aGUgZmlyc3QgbiBjb3VudHJpZXMgaW50byB0aGUgaGVhcFxuICBsZXQgY291bnRyeUNvdW50ZXIgPSAwO1xuXG4gIC8vIGdvIHRocm91Z2ggZWFjaCBjb3VudHJ5IGZyb20gdGhlIHJlc3VsdHMgb2YgdGhlIEFKQVggY2FsbCB0byBJTlFTdGF0c1xuICByZXN1bHQubWFwKGNvdW50cnkgPT4ge1xuICAgIC8vIHN0b3JlIHRoZSBzdGF0IHNjb3JlIGFuZCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBjb3VudHJ5IGluIHZhcmlhYmxlcy5cbiAgICAvLyBJTVBPUlRBTlQ6IG11bHRpcGx5IGJ5IGRpcmVjdGlvbiB0byBpbXBsZW1lbnQgbWF4L21pbiBoZWFwXG4gICAgLy8gYSBkaXJlY3Rpb24gb2YgMSA9IHdlIHdhbnQgbWF4aW11bSBzY29yZXNcbiAgICAvLyBhIGRpcmVjdGlvbiBvZiAtMSA9IHdlIHdhbnQgbWluaW11bSBzY29yZXNcbiAgICBsZXQgc3RhdCA9IE51bWJlcihjb3VudHJ5W3Byb3BlcnR5XSkgKiBkaXJlY3Rpb247XG5cbiAgICAvLyBpZiBpdCdzIHRoZSBmaXJzdCBuIGNvdW50cmllcyBmcm9tIHRoZSByZXN1bHQsIG5vIHdvcmsgcmVxdWlyZWQuIEp1c3QgYWRkIHRoZW0gZGlyZWN0bHkgaW50byBib3RoIHRoZSBoZWFwIGFuZCBuQ291bnRyaWVzIHZhcmlhYmxlc1xuICAgIGlmIChjb3VudHJ5Q291bnRlciA8IG4pIHtcbiAgICAgIGhlYXAuYWRkKHN0YXQpO1xuICAgICAgbkNvdW50cmllcy5wdXNoKGNvdW50cnkpO1xuXG4gICAgICAvLyBpbmNyZW1lbnQgY291bnRyeUNvdW50ZXIgdG8ga25vdyB3aGVuIHdlJ3JlIHBhc3QgdGhlIGZpcnN0IG4gY291bnRyaWVzXG4gICAgICBjb3VudHJ5Q291bnRlcisrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDT05ESVRJT04gVE8gQ0hFQ0sgSUYgdGhlIGN1cnJlbnQgY291bnRyeSBzdGF0IGlzIGdyZWF0ZXIvc21hbGxlciB0aGFuIGFueSBvZiB0aGUgY3VycmVudCBzdGF0cyBpbiB0aGUgY3VycmVudCBuIGNvdW50cmllc1xuICAgICAgaWYgKHN0YXQgPiBoZWFwLnBlZWsoKSkge1xuICAgICAgICAvLyBpZiBzbywgZmluZCB0aGUgbG9jYXRpb24gb2YgdGhlIHNtYWxsZXN0L2xhcmdlc3Qgc3RhdCBzY29yZSBpbiB0aGUgY3VycmVudCBuQ291bnRyaWVzIGFycmF5IGFuZCByZXBsYWNlIGl0IHdpdGggdGhlIG5ldyBzdGF0IGFuZCBpdHMgYXNzb2NpYXRlZCBjb3VudHJ5XG4gICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgbkNvdW50cmllcy5sZW5ndGg7IG0rKykge1xuICAgICAgICAgIC8vIG11bHRpcGx5IGJ5IGRpcmVjdGlvbiBhZ2FpbiB0byBjb21wYXJlIHByb3Blcmx5IHdpdGggdGhlIGhlYXBcbiAgICAgICAgICBsZXQgY3VycmVudFN0YXQgPSBOdW1iZXIobkNvdW50cmllc1ttXVtwcm9wZXJ0eV0pICogZGlyZWN0aW9uO1xuICAgICAgICAgIGlmIChjdXJyZW50U3RhdCA9PT0gaGVhcC5wZWVrKCkpIHtcbiAgICAgICAgICAgIC8vIHJlcGxhY2UgY291bnRyeVxuICAgICAgICAgICAgbkNvdW50cmllcy5zcGxpY2UobSwgMSwgY291bnRyeSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlIHNtYWxsZXN0L2xhcmdlc3Qgc3RhdCBzY29yZSBmcm9tIHRoZSBoZWFwIGFzIHdlbGxcbiAgICAgICAgaGVhcC5wb2xsKCk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBuZXcgc21hbGxlc3QvbGFyZ2VzdCBzY29yZSBvbnRvIHRoZSBoZWFwXG4gICAgICAgIGhlYXAuYWRkKHN0YXQpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8vIHJldHVybiBuIGNvdW50cmllc1xuICByZXR1cm4gbkNvdW50cmllcztcbn07XG5cbi8qIDYuIFNFTkQgQVBJIFJFUVVFU1RTIFRPIFdJS0kgQU5EIFBJWEEgKi9cblxuLy8gNi4xIFdJS0lQRURJQSBBUEk6IEdFVCBBTkQgU1RPUkVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU3RvcmUgaW1wb3J0YW50IGluZm8gZm9yIGNhbGxzIHRvIHRoZSBXaWtpIEFQSS5cbnRyYXZlbEFwcC53aWtpVVJMID0gXCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvdy9hcGkucGhwXCI7XG4vLyBHZXQgaW5mbyBmcm9tIFdpa2lwZWRpYSAoQUpBWClcbnRyYXZlbEFwcC5nZXRXaWtpID0gY291bnRyeSA9PiB7XG4gIC8vIGdldCBleHRyYWN0XG4gIHJldHVybiAkLmFqYXgoe1xuICAgIHVybDogdHJhdmVsQXBwLndpa2lVUkwsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGRhdGFUeXBlOiBcImpzb25wXCIsXG4gICAgZGF0YToge1xuICAgICAgYWN0aW9uOiBcInF1ZXJ5XCIsXG4gICAgICBwcm9wOiBcImV4dHJhY3RzXCIsXG4gICAgICB0aXRsZXM6IGNvdW50cnksXG4gICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgZXhsaW1pdDogMSxcbiAgICAgIGV4Y2hhcnM6IDI4MCxcbiAgICAgIGV4aW50cm86IHRydWUsXG4gICAgICBleHBsYWludGV4dDogdHJ1ZSxcbiAgICAgIHJlZGlyZWN0czogMVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBTdG9yZSBXaWtpcGVkaWEgY291bnRyeSBleHRyYWN0XG50cmF2ZWxBcHAuc3RvcmVXaWtpID0gcmVzdWx0ID0+IHtcbiAgLy8gVGhpcyB2YXJpYWJsZSBzdG9yZXMgdGhlIG9iamVjdCB0aGF0IGhvbGRzIGEga2V5IG5hbWUgdW5pcXVlIHRvIGV2ZXJ5IGNvdW50cnkuIFRoZSB2YWx1ZSBvZiB0aGlzIGtleSBpcyBhbiBvYmplY3QgdGhhdCBob2xkcyB0aGUgZXh0YWN0LlxuICBjb25zdCB3aWtpRXh0cmFjdE9iamVjdCA9IHJlc3VsdFswXS5xdWVyeS5wYWdlcztcbiAgLy8gSWYgd2UgY29udmVydCB0aGUgYWJvdmUgb2JqZWN0IGludG8gYW4gYXJyYXksIHRoZSBleHRyYWN0IGNhbiBiZSBhY2Nlc3NlZCBvbiB0aGUgZmlyc3QgdmFsdWUgb2YgdGhlIGFycmF5LiBUaGlzIHZhcmlhYmxlIGhvbGRzIHRoZSB3aWtpIGV4dHJhY3QuXG4gIHRyYXZlbEFwcC53aWtpRXh0cmFjdC5wdXNoKE9iamVjdC52YWx1ZXMod2lraUV4dHJhY3RPYmplY3QpWzBdLmV4dHJhY3QpO1xufTtcblxuLy8gNi4yIFBJWEFCQVkgQVBJOiBHRVQgQU5EIFNUT1JFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTdG9yZSBpbXBvcnRhbnQgaW5mbyBmb3IgY2FsbHMgdG8gdGhlIFBpeGFiYXkgQVBJLlxudHJhdmVsQXBwLnBpeGFLZXkgPSBcIjk4Nzk1NzEtZTRjYmJlZjNlNjkyYWExNWEyNGE3MTE5YlwiO1xudHJhdmVsQXBwLnBpeGFVUkwgPSBcImh0dHBzOi8vd3d3LnBpeGFiYXkuY29tL2FwaS9cIjtcbi8vIEdldCBpbmZvIGZyb20gV2lraXBlZGlhIChBSkFYKVxudHJhdmVsQXBwLmdldFBpeGEgPSBjb3VudHJ5ID0+IHtcbiAgLy8gR2V0IGltYWdlIFVSTFxuICByZXR1cm4gJC5hamF4KHtcbiAgICB1cmw6IHRyYXZlbEFwcC5waXhhVVJMLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxuICAgIGRhdGE6IHtcbiAgICAgIGtleTogdHJhdmVsQXBwLnBpeGFLZXksXG4gICAgICBxOiBjb3VudHJ5LFxuICAgICAgcGVyX3BhZ2U6IDE1XG4gICAgfVxuICB9KTtcbn07XG5cbi8vIFN0b3JlIFBpeGFiYXkgY291bnRyeSBpbWFnZXMgb24gdGhlIHBhZ2VcbnRyYXZlbEFwcC5zdG9yZVBpeGEgPSByZXN1bHRzID0+IHtcbiAgLy8gU3RvcmUgdGhlIGFycmF5IHRoYXQgaG9sZHMgdGhlIGltYWdlIFVSTHMgaW4gYW4gYXJyYXlcbiAgY29uc3QgcmVzdWx0c0FycmF5ID0gcmVzdWx0c1swXS5oaXRzO1xuICAvLyBMb29wIHRocm91Z2ggdGhlIHJlc3VsdHMgYXJyYXkgYW5kIHB1c2ggYWxsIGltYWdlcyBpbnRvIHRoZSBpbWFnZUFycmF5XG4gIHJlc3VsdHNBcnJheS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIC8vIEFycmF5IG9mIGltYWdlcyBmb3IgZWFjaCBjb3VudHJ5XG4gICAgdHJhdmVsQXBwLmltYWdlQXJyYXkucHVzaChpdGVtLmxhcmdlSW1hZ2VVUkwpO1xuICAgIC8vIEFycmF5IG9mIGltYWdlIGluZm9ybWF0aW9uIGZyb20gZWFjaCBjb3VudHJ5IHRvIGJlIHVzZWQgZm9yIEFsdCB0ZXh0XG4gICAgdHJhdmVsQXBwLmltYWdlVGV4dEFycmF5LnB1c2goaXRlbS50YWdzKTtcbiAgfSk7XG59O1xuXG4vKiA3LiBESVNQTEFZIERFU1RJT05BVElPTlMgT04gU0NSRUVOIFdJVEggV0lLSSArIFBJWEEgUkVTVUxUUyAqL1xudHJhdmVsQXBwLmRpc3BsYXlEZXN0aW5hdGlvbnMgPSAocmVzdWx0cywgc3RhdENob2ljZXMpID0+IHtcbiAgLy8gR2V0IHJpZCBvZiBwcmV2aW91cyBjbGlja2VkIHJlc3VsdHNcbiAgJChcIi5yZXN1bHRzXCIpLmVtcHR5KCk7XG4gIC8vIEdvIHRocm91Z2ggZWFjaCBjb3VudHJ5IHJlc3VsdCBhbmQgYnVpbGQgdGhlIHN0cmluZyBsaXRlcmFsIHRvIGFwcGVuZCB0byB0aGUgcGFnZVxuICBsZXQgY291bnRyeUNvdW50ZXIgPSAwO1xuICBsZXQgaW1hZ2VDb3VudGVyID0gMDtcbiAgcmVzdWx0cy5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgIC8vIFRoaXMgZWxlbWVudCBob2xkcyBhbGwgZWxlbWVudHMgZm9yIG9uZSBjb3VudHJ5IHJlc3VsdFxuICAgIGxldCBjb3VudHJ5Q29udGFpbmVyRWxlbWVudCA9ICQoXCI8ZGl2PlwiKVxuICAgICAgLmFkZENsYXNzKFwicmVzdWx0LWNvbnRhaW5lclwiKVxuICAgICAgLy8gYXNzaWduIHJhbmRvbSBwaXhhIGltYWdlIG9mIGNvdW50cnkgdG8gdGhlIHJlc3VsdCBiYWNrZ3JvdW5kXG4gICAgICAuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLCBgdXJsKFwiJHt0cmF2ZWxBcHAuaW1hZ2VBcnJheVt0cmF2ZWxBcHAucmFuZG9taXplKGltYWdlQ291bnRlciwgaW1hZ2VDb3VudGVyICsgMTUpXX1cIilgKTtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2lsbCBob2xkIGFsbCB0ZXh0IGFuZCBpbWFnZShzKSByZWZlcnJpbmcgdG8gdGhlIGNvdW50cnkgcmVzdWx0XG4gICAgbGV0IGNvdW50cnlDYXJkRWxlbWVudCA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImNhcmRcIik7XG4gICAgLy8gVGhpcyBlbGVtZW50IGhvbGRzIHRoZSBuYW1lIG9mIHRoZSBjb3VudHJ5XG4gICAgbGV0IGNvdW50cnlOYW1lRWxlbWVudCA9ICQoXCI8aDI+XCIpXG4gICAgICAuYWRkQ2xhc3MoXCJjb3VudHJ5LW5hbWVcIilcbiAgICAgIC50ZXh0KGAke2NvdW50cnkuY291bnRyeU5hbWV9YCk7XG4gICAgLy8gVGhpcyBlbGVtZW50IGhvbGRzIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY291bnRyeSwgdGFrZW4gZnJvbSB0aGUgd2lraSBBUElcbiAgICBsZXQgY291bnRyeURlc2NyaXB0aW9uRWxlbWVudCA9ICQoXCI8cD5cIilcbiAgICAgIC5hZGRDbGFzcyhcIndpa2ktdGV4dFwiKVxuICAgICAgLnRleHQodHJhdmVsQXBwLndpa2lFeHRyYWN0W2NvdW50cnlDb3VudGVyXSk7XG4gICAgY291bnRyeUNvdW50ZXIrKztcbiAgICAvLyBUaGlzIGVsZW1lbnQgaG9sZHMgdGhlIHRleHQgZm9yIGVhY2ggb2YgdGhlIHRocmVlIHN0YXRzIHdlJ3JlIGRpc3BsYXlpbmdcbiAgICBsZXQgc3RhdExpc3RFbGVtZW50ID0gJChcIjx1bD5cIikuYWRkQ2xhc3MoXCJzdGF0LWxpc3RcIik7XG4gICAgLy8gVGhpcyBlbGVtZW50IGhvbGRzIHRoZSBjb250YWluZXIgdGhhdCB3aWxsIGhvbGQgdGhlIHNtYWxsIHBpeGEgY291bnRyeSBpbWFnZVxuICAgIGxldCBzbWFsbFBpeGFDb250YWluZXJFbGVtZW50ID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwiY291bnRyeS1pbWFnZS1jb250YWluZXJcIik7XG4gICAgLy8gVGhpcyBuZXcgaW1hZ2UgY291bnRlciBnZXRzIHRoZSBpbWFnZSBpbiB0aGUgYXJyYXkgdGhhdCBmb2xsb3dzIHRoZSBmaXJzdCBpbWFnZSBiZWluZyB1c2VkIGFzIGEgYmFja2dyb3VuZCBpbWFnZSBmb3IgdGhlIGNhcmRcbiAgICAvLyBUaGlzIGltYWdlIGVsZW1lbnQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGUgaW1hZ2UgY29udGFpbmVyXG4gICAgbGV0IHNtYWxsUGl4YUltYWdlID0gJChcIjxpbWc+XCIpXG4gICAgICAuYWRkQ2xhc3MoXCJjb3VudHJ5LWltYWdlXCIpXG4gICAgICAuYXR0cih7XG4gICAgICAgIHNyYzogYCR7dHJhdmVsQXBwLmltYWdlQXJyYXlbdHJhdmVsQXBwLnJhbmRvbWl6ZShpbWFnZUNvdW50ZXIsIGltYWdlQ291bnRlciArIDE1KV19YCxcbiAgICAgICAgYWx0OiBgU2NlbmljIGltYWdlIG9mICR7Y291bnRyeS5jb3VudHJ5TmFtZX0uIEltYWdlIHRhZ3MgaW5jbHVkZSAke3RyYXZlbEFwcC5pbWFnZVRleHRBcnJheX0uYFxuICAgICAgfSk7XG4gICAgLy8gQWRkIDE1IHRvIHRoZSBpbWFnZSBjb3VudGVyIGVuc3VyZXMgdGhhdCBldmVyeSBpdGVyYXRpb24gdGhyb3VnaCB0aGUgZm9yRWFjaCB3aWxsIGFkZCBpbWFnZXMgdG8gdGhlIGFzc29jaWF0ZWQgY291dHJpZXNcbiAgICBpbWFnZUNvdW50ZXIgKz0gMTU7XG4gICAgLy9BcHBlbmQgdGhlIGNvdW50cnkgaW1hZ2UgdG8gaXRzIGNvbnRhaW5lclxuICAgIHNtYWxsUGl4YUNvbnRhaW5lckVsZW1lbnQuYXBwZW5kKHNtYWxsUGl4YUltYWdlKTtcbiAgICAvLyBBcHBlbmQgdGhlIGNvdW50cnkgbmFtZSA8aDI+LCB3aWtpIHRleHQgPHA+LCBzdGF0IGxpc3QgPHVsPiBhbmQgaW1hZ2UgY29udGFpbmVyIDxkaXY+IHRvIHRoZSBjYXJkIDxkaXY+LlxuICAgIGNvdW50cnlDYXJkRWxlbWVudC5hcHBlbmQoXG4gICAgICBjb3VudHJ5TmFtZUVsZW1lbnQsXG4gICAgICBjb3VudHJ5RGVzY3JpcHRpb25FbGVtZW50LFxuICAgICAgc3RhdExpc3RFbGVtZW50LFxuICAgICAgc21hbGxQaXhhQ29udGFpbmVyRWxlbWVudFxuICAgICk7XG4gICAgLy8gQXBwZW5kIHRoZSBjYXJkIGRpdiB0byB0aGUgcmVzdWx0LWNvbnRhaW5lclxuICAgIGNvdW50cnlDb250YWluZXJFbGVtZW50LmFwcGVuZChjb3VudHJ5Q2FyZEVsZW1lbnQpO1xuICAgIC8vQXBwZW5kIHRoZSByZXN1bHQtY29udGFpbmVyIHRvIHRoZSByZXN1bHRzIHNlY3Rpb24gZWxlbWVudCBvbiBvdXIgcGFnZVxuICAgICQoXCIucmVzdWx0c1wiKS5hcHBlbmQoY291bnRyeUNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLy8gR28gdGhyb3VnaCB0aGUgYXJyYXkgXCJzdGF0Q2hvaWNlc1wiIGFuZCBzZXQgdXAgMyBpbmZvcm1hdGlvbjpcbiAgICAvLyAxLiB0aXRsZSBvZiBzdGF0ICh0YWtlbiBmcm9tIHRyYXZlbEFwcC5zdGF0TmFtZXNBcnJheSlcbiAgICAvLyAyLiB2YWx1ZSBvZiBzdGF0ICh0YWtlbiBmcm9tIHJlc3VsdHMgb2JqZWN0KVxuICAgIC8vIDMuIGRlc2NyaXB0aW9uIG9mIHN0YXQgKHRha2VuIGZyb20gdHJhdmVsQXBwLnN0YXREZXNjcmlwdGlvbkFycmF5KVxuICAgIGxldCBzdGF0Q291bnRlciA9IDA7XG4gICAgc3RhdENob2ljZXMuZm9yRWFjaChzdGF0ID0+IHtcbiAgICAgIGxldCBzdGF0VGl0bGUgPSB0cmF2ZWxBcHAuc3RhdE5hbWVzQXJyYXlbc3RhdENvdW50ZXJdO1xuICAgICAgbGV0IHN0YXRWYWx1ZSA9IGNvdW50cnlbdHJhdmVsQXBwLnN0YXRDb2RlQXJyYXlbc3RhdENvdW50ZXJdXTtcbiAgICAgIGxldCBzdGF0RGVzY3JpcHRpb24gPSB0cmF2ZWxBcHAuc3RhdERlc2NyaXB0aW9uQXJyYXlbc3RhdENvdW50ZXJdO1xuICAgICAgc3RhdENvdW50ZXIrKztcbiAgICAgIC8vIFRoaXMgbGlzdCBpdGVtIGVsZW1lbnQgd2lsbCBob2xkIHN0YXQgaW5mb3JtYXRpb25cbiAgICAgIGxldCBzdGF0TGlzdEl0ZW1FbGVtZW50ID0gJChcIjxsaT5cIikuYWRkQ2xhc3MoXCJzdGF0LWxpc3RfX2l0ZW1cIik7XG4gICAgICAvLyBUaGlzIGRpdiB3aWxsIGhvbGQgdGhlIHN0YXQgdGl0bGUgYW5kIHF1ZXN0aW9uIG1hcmsgaWNvblxuICAgICAgbGV0IHN0YXRUaXRsZUljb25Db250YWluZXJFbGVtZW50ID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwic3RhdC1saXN0X19pdGVtX190aXRsZS1pY29uLWNvbnRhaW5lclwiKTtcbiAgICAgIC8vIFRoaXMgZWxlbWVudCBob2xkcyB0aGUgc3RhdCB0aXRsZSBhbmQgdmFsdWVcbiAgICAgIGxldCBzdGF0VGl0bGVFbGVtZW50ID0gJChcIjxoND5cIilcbiAgICAgICAgLmFkZENsYXNzKFwic3RhdC1saXN0X19pdGVtX190aXRsZS1pY29uLWNvbnRhaW5lcl9fdGl0bGUtbnVtYmVyXCIpXG4gICAgICAgIC50ZXh0KGAke3N0YXRUaXRsZX06ICR7dHJhdmVsQXBwLm51bWJlcldpdGhDb21tYXMoc3RhdFZhbHVlKX1gKTtcbiAgICAgIC8vIFRoaXMgcXVlc3Rpb24gbWFyayBpY29uIHdpbGwgc2l0IG5leHQgdG8gdGhlIHN0YXRUaXRsZUVsZW1lbnQgYW5kIHdoZW4gY2xpY2tlZC9ob3Zlcm92ZXIsIHdpbGwgZGlzcGxheSB0aGUgc3RhdCBkZXNjcmlwdGlvblxuICAgICAgbGV0IHN0YXRIb3Zlckljb25FbGVtZW50ID0gYDxpIGNsYXNzPVwic3RhdC1saXN0X19pdGVtX190aXRsZS1pY29uLWNvbnRhaW5lcl9faWNvbiBmYXIgZmEtcXVlc3Rpb24tY2lyY2xlXCI+PC9pPmA7XG4gICAgICAvLyBhcHBlbmQgdGhlIHN0YXQgdGl0bGUgYW5kIGljb24gdG8gdGhlIHN0YXRUaXRsZUljb25Db250YWluZXJFbGVtZW50XG4gICAgICBzdGF0VGl0bGVJY29uQ29udGFpbmVyRWxlbWVudC5hcHBlbmQoc3RhdFRpdGxlRWxlbWVudCwgc3RhdEhvdmVySWNvbkVsZW1lbnQpO1xuICAgICAgLy8gVGhpcyBkaXYgd2lsbCBob2xkIHRoZSBzdGF0IGRlc2NyaXB0aW9uIGFuZCBpcyBhIHNpYmxpbmcgb2YgdGhlIHN0YXRUaXRsZUljb25Db250YWluZXIuXG4gICAgICBsZXQgc3RhdERlc2NyaXB0aW9uQ29udGFpbmVyRWxlbWVudCA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInN0YXQtbGlzdF9faXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyIGRpc3BsYXktbm9uZVwiKTtcbiAgICAgIC8vIFRoaXMgZWxlbWVudCBob2xkcyB0aGUgc3RhdCBkZXNjcmlwdGlvblxuICAgICAgbGV0IHN0YXREZXNjcmlwdGlvbkVsZW1lbnQgPSAkKFwiPHA+XCIpXG4gICAgICAgIC5hZGRDbGFzcyhcInN0YXQtbGlzdF9faXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyX19kZXNjcmlwdGlvblwiKVxuICAgICAgICAudGV4dChzdGF0RGVzY3JpcHRpb24pO1xuICAgICAgLy8gQXBwZW5kIHRoZSBzdGF0RGVzY3JpcHRpb25FbGVtZW50IHRvIHRoZSBzdGF0RGVzY3JpcHRpb25Db250YWluZXJFbGVtZW50XG4gICAgICBzdGF0RGVzY3JpcHRpb25Db250YWluZXJFbGVtZW50LmFwcGVuZChzdGF0RGVzY3JpcHRpb25FbGVtZW50KTtcbiAgICAgIC8vIEFwcGVuZCB0aGUgdHdvIHN0YXQgZGl2IGNvbnRhaW5lcnMgdG8gdGhlIDxsaT5cbiAgICAgIHN0YXRMaXN0SXRlbUVsZW1lbnQuYXBwZW5kKHN0YXRUaXRsZUljb25Db250YWluZXJFbGVtZW50LCBzdGF0RGVzY3JpcHRpb25Db250YWluZXJFbGVtZW50KTtcbiAgICAgIC8vIEFwcGVuZCB0aGUgPGxpPnMgdG8gdGhlIDx1bD5cbiAgICAgIHN0YXRMaXN0RWxlbWVudC5hcHBlbmQoc3RhdExpc3RJdGVtRWxlbWVudCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHRyYXZlbEFwcC5maW5hbERpc3BsYXkoKTtcbn07XG5cbi8qICA3LjEgT25jZSBhbGwgaW1hZ2VzIGFyZSBsb2FkZWQgYXMgYmFja2dyb3VuZCBpbWFnZXMgb3IgcmVndWxhciBpbWFnZXMsIGRpc3BsYXkgdGhlIGZpbmFsIHJlc3VsdHMgd2l0aG91dCBcImxhZ1wiKi9cbnRyYXZlbEFwcC5maW5hbERpc3BsYXkgPSAoKSA9PiB7XG4gICQoXCIucmVzdWx0c1wiKS53YWl0Rm9ySW1hZ2VzKGZ1bmN0aW9uKCkge1xuICAgICQoXCIucmVzdWx0c1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG5cbiAgICAvLyBsZXQgZmxpY2tpdHlPck5vdCA9IFwiZmxleFwiO1xuICAgIC8vIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDE5MjBweClcIikubWF0Y2hlcykge1xuICAgIC8vICAgLyogdGhlIHZpZXdwb3J0IGlzIGF0IG1vc3QgMTEwMCBwaXhlbHMgd2lkZSAqL1xuICAgIC8vICAgZmxpY2tpdHlPck5vdCA9IFwiYmxvY2tcIjtcbiAgICAvLyB9XG5cbiAgICAkKFwiaHRtbCwgYm9keVwiKVxuICAgICAgLnN0b3AoKVxuICAgICAgLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoXCIucmVzdWx0c1wiKS5vZmZzZXQoKS50b3AgfSwgOTAwLCBcInN3aW5nXCIpO1xuXG4gICAgLy8gcmVtb3ZlIGxvYWRlciBhbmQgZGlzcGxheSBzdWJtaXQgcmFua2luZyBidXR0b24gYWdhaW5cbiAgICBsZXQgbWFya1VwQnV0dG9uID0gYDxsaT48YnV0dG9uIGNsYXNzPVwidXNlci1zdWJtaXQgYnRuXCI+U3VibWl0IFJhbmtpbmc8L2J1dHRvbj48L2xpPmA7XG4gICAgJChcIi5jaG9pY2VzXCIpXG4gICAgICAuZmluZChcImxpOmxhc3QtY2hpbGRcIilcbiAgICAgIC5odG1sKG1hcmtVcEJ1dHRvbik7XG5cbiAgICAvKiBGTElDS0lUWSAqL1xuICAgICQoXCIucmVzdWx0c1wiKS5mbGlja2l0eSh7XG4gICAgICAvLyBvcHRpb25zXG4gICAgICBjZWxsQWxpZ246IFwibGVmdFwiLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIGF1dG9QbGF5OiA1MDAwLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgd2F0Y2hDU1M6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vLyA3LjIgT24gaG92ZXIgb3IgY2xpY2sgb3ZlciB0aGUgcXVlc3Rpb24gbWFyayBpY29uLCBkaXNwbGF5IHRoZSBzdGF0IGRlc2NyaXB0aW9uXG50cmF2ZWxBcHAuZGlzcGxheVN0YXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAkKFwiLnJlc3VsdHNcIikub24oXCJjbGlja1wiLCBcIi5zdGF0LWxpc3RfX2l0ZW1fX3RpdGxlLWljb24tY29udGFpbmVyX19pY29uXCIsIGZ1bmN0aW9uKCkge1xuICAgIGlmIChcbiAgICAgICQodGhpcylcbiAgICAgICAgLnBhcmVudHMoXCIuc3RhdC1saXN0X19pdGVtXCIpXG4gICAgICAgIC5maW5kKFwiLnN0YXQtbGlzdF9faXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyXCIpXG4gICAgICAgIC5oYXNDbGFzcyhcImRpc3BsYXktbm9uZVwiKSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgICQoXCIucmVzdWx0c1wiKVxuICAgICAgICAuZmluZChcIi5zdGF0LWxpc3RfX2l0ZW1fX2Rlc2NyaXB0aW9uLWNvbnRhaW5lclwiKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5LW5vbmVcIilcbiAgICAgICAgLmFkZENsYXNzKFwiZGlzcGxheS1ub25lXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiLnJlc3VsdHNcIilcbiAgICAgICAgLmZpbmQoXCIuc3RhdC1saXN0X19pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXJcIilcbiAgICAgICAgLmFkZENsYXNzKFwiZGlzcGxheS1ub25lXCIpO1xuICAgICAgJCh0aGlzKVxuICAgICAgICAucGFyZW50cyhcIi5zdGF0LWxpc3RfX2l0ZW1cIilcbiAgICAgICAgLmZpbmQoXCIuc3RhdC1saXN0X19pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXJcIilcbiAgICAgICAgLnJlbW92ZUNsYXNzKFwiZGlzcGxheS1ub25lXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGhvbGRzIGFsbCBvdXIgZXZlbnRzIGZ1bnRpb25zXG50cmF2ZWxBcHAuZXZlbnRzRnVuY3Rpb24gPSAoKSA9PiB7XG4gIHRyYXZlbEFwcC5nZXRVc2VyUHVycG9zZSgpO1xuICB0cmF2ZWxBcHAuZ2V0U3RhcnRlZCgpO1xuICB0cmF2ZWxBcHAudHJhbnNmb3JtU1ZHKCk7XG4gIHRyYXZlbEFwcC5kaXNwbGF5U3RhdERlc2NyaXB0aW9uKCk7XG59O1xuXG4vLyBJbml0IGZ1bmN0aW9uIHRvIGhvbGQgYWxsIG91ciBmdW5jdGlvbnMgaW4gb3JkZXJcbnRyYXZlbEFwcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIHRyYXZlbEFwcC5ldmVudHNGdW5jdGlvbigpO1xuICB0cmF2ZWxBcHAuc2xpZGVEcmFnKCk7XG59O1xuXG4vLyBEb2N1bWVudCBSZWFkeSB0byBjYWxsIG91ciBpbml0KCkgZnVuY3Rpb24gYW5kIHN0YXJ0IHRoZSBhcHBcbiQoZnVuY3Rpb24oKSB7XG4gIHRyYXZlbEFwcC5pbml0KCk7XG59KTtcblxuLyogOC4gRVhUUkEgRlVOQ1RJT05TIFVTRUQgVEhST1VHSE9VVCBBUFAgKi9cblxuLy8gOC4xIFNvcnRhYmxlIGZ1bmN0aW9uYWxpdHkgZm9yIGNyaXRlcmlhc1xudHJhdmVsQXBwLnNsaWRlRHJhZyA9ICgpID0+IHtcbiAgJChcIi5jaG9pY2VzXCIpXG4gICAgLnNvcnRhYmxlKHtcbiAgICAgIGNvbm5lY3RXaXRoOiBcIi5zb3J0YWJsZVwiLFxuICAgICAgc2Nyb2xsOiBmYWxzZSxcbiAgICAgIHJldmVydDogdHJ1ZSxcbiAgICAgIGhlbHBlcjogXCJjbG9uZVwiLFxuICAgICAgY29udGFpbm1lbnQ6IFwiLmNyaXRlcmlhcy1jb250YWluZXJcIlxuICAgIH0pXG4gICAgLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIik7XG4gICQoXCJ1bCwgbGlcIikuZGlzYWJsZVNlbGVjdGlvbigpO1xufTtcblxuLy8gOC4yIFJhbmRvbWl6ZXIgZnVuY3Rpb24gdG8gc2VsZWN0IHJhbmRvbSBpbWFnZXMgdG8gZGlzcGxheVxudHJhdmVsQXBwLnJhbmRvbWl6ZSA9IChzdGFydGluZ051bSwgZW5kaW5nTnVtKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoZW5kaW5nTnVtIC0gc3RhcnRpbmdOdW0pKSArIHN0YXJ0aW5nTnVtO1xufTtcblxuLy8gOC4zIEV2ZW50IGxpc3RlbmVyIHRvIHRyYW5zZm9ybSBTVkdzIGludG8gaW5saW5lIFNWR1MgdG8gYmUgYWJsZSB0byBjaGFuZ2UgdGhlaXIgY29sb3JzIHdpdGggY3NzIGZpbGxcbnRyYXZlbEFwcC50cmFuc2Zvcm1TVkcgPSAoKSA9PiB7XG4gIGpRdWVyeShcImltZy5zdmdcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgJGltZyA9IGpRdWVyeSh0aGlzKTtcbiAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoXCJpZFwiKTtcbiAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoXCJjbGFzc1wiKTtcbiAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKFwic3JjXCIpO1xuXG4gICAgalF1ZXJ5LmdldChcbiAgICAgIGltZ1VSTCxcbiAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBTVkcgdGFnLCBpZ25vcmUgdGhlIHJlc3RcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZChcInN2Z1wiKTtcblxuICAgICAgICAvLyBBZGQgcmVwbGFjZWQgaW1hZ2UncyBJRCB0byB0aGUgbmV3IFNWR1xuICAgICAgICBpZiAodHlwZW9mIGltZ0lEICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cihcImlkXCIsIGltZ0lEKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgcmVwbGFjZWQgaW1hZ2UncyBjbGFzc2VzIHRvIHRoZSBuZXcgU1ZHXG4gICAgICAgIGlmICh0eXBlb2YgaW1nQ2xhc3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKFwiY2xhc3NcIiwgaW1nQ2xhc3MgKyBcIiByZXBsYWNlZC1zdmdcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgYW55IGludmFsaWQgWE1MIHRhZ3MgYXMgcGVyIGh0dHA6Ly92YWxpZGF0b3IudzMub3JnXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoXCJ4bWxuczphXCIpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2aWV3cG9ydCBpcyBzZXQsIGlmIHRoZSB2aWV3cG9ydCBpcyBub3Qgc2V0IHRoZSBTVkcgd29udCd0IHNjYWxlLlxuICAgICAgICBpZiAoISRzdmcuYXR0cihcInZpZXdCb3hcIikgJiYgJHN2Zy5hdHRyKFwiaGVpZ2h0XCIpICYmICRzdmcuYXR0cihcIndpZHRoXCIpKSB7XG4gICAgICAgICAgJHN2Zy5hdHRyKFwidmlld0JveFwiLCBcIjAgMCBcIiArICRzdmcuYXR0cihcImhlaWdodFwiKSArIFwiIFwiICsgJHN2Zy5hdHRyKFwid2lkdGhcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVwbGFjZSBpbWFnZSB3aXRoIG5ldyBTVkdcbiAgICAgICAgJGltZy5yZXBsYWNlV2l0aCgkc3ZnKTtcbiAgICAgIH0sXG4gICAgICBcInhtbFwiXG4gICAgKTtcbiAgfSk7XG59O1xuXG4vKiA4LjQgVFJBTlNGT1JNIFNUUklORyBOVU1CRVJTIElOVE8gU0VQQVJBVEVEIFNUUklOR1MgV0lUSCBQUk9QRVIgQ09NTUFTIEZPUiBFQUNIIFRIT1VTQU5EIFVOSVQgKi9cbnRyYXZlbEFwcC5udW1iZXJXaXRoQ29tbWFzID0gc3RhdCA9PiB7XG4gIHJldHVybiBzdGF0LnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xufTtcbiIsIi8qKlxuICogRmFzdFByaW9yaXR5UXVldWUuanMgOiBhIGZhc3QgaGVhcC1iYXNlZCBwcmlvcml0eSBxdWV1ZSAgaW4gSmF2YVNjcmlwdC5cbiAqIChjKSB0aGUgYXV0aG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC5cbiAqXG4gKiBTcGVlZC1vcHRpbWl6ZWQgaGVhcC1iYXNlZCBwcmlvcml0eSBxdWV1ZSBmb3IgbW9kZXJuIGJyb3dzZXJzIGFuZCBKYXZhU2NyaXB0IGVuZ2luZXMuXG4gKlxuICogVXNhZ2UgOlxuICAgICAgICAgSW5zdGFsbGF0aW9uIChpbiBzaGVsbCwgaWYgeW91IHVzZSBub2RlKTpcbiAgICAgICAgICQgbnBtIGluc3RhbGwgZmFzdHByaW9yaXR5cXVldWVcblxuICAgICAgICAgUnVubmluZyB0ZXN0IHByb2dyYW0gKGluIEphdmFTY3JpcHQpOlxuXG4gICAgICAgICAvLyB2YXIgRmFzdFByaW9yaXR5UXVldWUgPSByZXF1aXJlKFwiZmFzdHByaW9yaXR5cXVldWVcIik7Ly8gaW4gbm9kZVxuICAgICAgICAgdmFyIHggPSBuZXcgRmFzdFByaW9yaXR5UXVldWUoKTtcbiAgICAgICAgIHguYWRkKDEpO1xuICAgICAgICAgeC5hZGQoMCk7XG4gICAgICAgICB4LmFkZCg1KTtcbiAgICAgICAgIHguYWRkKDQpO1xuICAgICAgICAgeC5hZGQoMyk7XG4gICAgICAgICB4LnBlZWsoKTsgLy8gc2hvdWxkIHJldHVybiAwLCBsZWF2ZXMgeCB1bmNoYW5nZWRcbiAgICAgICAgIHguc2l6ZTsgLy8gc2hvdWxkIHJldHVybiA1LCBsZWF2ZXMgeCB1bmNoYW5nZWRcbiAgICAgICAgIHdoaWxlKCF4LmlzRW1wdHkoKSkge1xuICAgICAgICAgICBjb25zb2xlLmxvZyh4LnBvbGwoKSk7XG4gICAgICAgICB9IC8vIHdpbGwgcHJpbnQgMCAxIDMgNCA1XG4gICAgICAgICB4LnRyaW0oKTsgLy8gKG9wdGlvbmFsKSBvcHRpbWl6ZXMgbWVtb3J5IHVzYWdlXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRjb21wYXJhdG9yID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA8IGI7XG59O1xuXG4vLyB0aGUgcHJvdmlkZWQgY29tcGFyYXRvciBmdW5jdGlvbiBzaG91bGQgdGFrZSBhLCBiIGFuZCByZXR1cm4gKnRydWUqIHdoZW4gYSA8IGJcbmZ1bmN0aW9uIEZhc3RQcmlvcml0eVF1ZXVlKGNvbXBhcmF0b3IpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEZhc3RQcmlvcml0eVF1ZXVlKSkgcmV0dXJuIG5ldyBGYXN0UHJpb3JpdHlRdWV1ZShjb21wYXJhdG9yKTtcbiAgdGhpcy5hcnJheSA9IFtdO1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLmNvbXBhcmUgPSBjb21wYXJhdG9yIHx8IGRlZmF1bHRjb21wYXJhdG9yO1xufVxuXG4vLyBjb3B5IHRoZSBwcmlvcml0eSBxdWV1ZSBpbnRvIGFub3RoZXIsIGFuZCByZXR1cm4gaXQuIFF1ZXVlIGl0ZW1zIGFyZSBzaGFsbG93LWNvcGllZC5cbi8vIFJ1bnMgaW4gYE8obilgIHRpbWUuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGZwcSA9IG5ldyBGYXN0UHJpb3JpdHlRdWV1ZSh0aGlzLmNvbXBhcmUpO1xuICBmcHEuc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkrKykge1xuICAgIGZwcS5hcnJheS5wdXNoKHRoaXMuYXJyYXlbaV0pO1xuICB9XG4gIHJldHVybiBmcHE7XG59O1xuXG4vLyBBZGQgYW4gZWxlbWVudCBpbnRvIHRoZSBxdWV1ZVxuLy8gcnVucyBpbiBPKGxvZyBuKSB0aW1lXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24obXl2YWwpIHtcbiAgdmFyIGkgPSB0aGlzLnNpemU7XG4gIHRoaXMuYXJyYXlbdGhpcy5zaXplXSA9IG15dmFsO1xuICB0aGlzLnNpemUgKz0gMTtcbiAgdmFyIHA7XG4gIHZhciBhcDtcbiAgd2hpbGUgKGkgPiAwKSB7XG4gICAgcCA9IChpIC0gMSkgPj4gMTtcbiAgICBhcCA9IHRoaXMuYXJyYXlbcF07XG4gICAgaWYgKCF0aGlzLmNvbXBhcmUobXl2YWwsIGFwKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuYXJyYXlbaV0gPSBhcDtcbiAgICBpID0gcDtcbiAgfVxuICB0aGlzLmFycmF5W2ldID0gbXl2YWw7XG59O1xuXG4vLyByZXBsYWNlIHRoZSBjb250ZW50IG9mIHRoZSBoZWFwIGJ5IHByb3ZpZGVkIGFycmF5IGFuZCBcImhlYXBpZnkgaXRcIlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLmhlYXBpZnkgPSBmdW5jdGlvbihhcnIpIHtcbiAgdGhpcy5hcnJheSA9IGFycjtcbiAgdGhpcy5zaXplID0gYXJyLmxlbmd0aDtcbiAgdmFyIGk7XG4gIGZvciAoaSA9IHRoaXMuc2l6ZSA+PiAxOyBpID49IDA7IGktLSkge1xuICAgIHRoaXMuX3BlcmNvbGF0ZURvd24oaSk7XG4gIH1cbn07XG5cbi8vIGZvciBpbnRlcm5hbCB1c2VcbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5fcGVyY29sYXRlVXAgPSBmdW5jdGlvbihpLCBmb3JjZSkge1xuICB2YXIgbXl2YWwgPSB0aGlzLmFycmF5W2ldO1xuICB2YXIgcDtcbiAgdmFyIGFwO1xuICB3aGlsZSAoaSA+IDApIHtcbiAgICBwID0gKGkgLSAxKSA+PiAxO1xuICAgIGFwID0gdGhpcy5hcnJheVtwXTtcbiAgICAvLyBmb3JjZSB3aWxsIHNraXAgdGhlIGNvbXBhcmVcbiAgICBpZiAoIWZvcmNlICYmICF0aGlzLmNvbXBhcmUobXl2YWwsIGFwKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuYXJyYXlbaV0gPSBhcDtcbiAgICBpID0gcDtcbiAgfVxuICB0aGlzLmFycmF5W2ldID0gbXl2YWw7XG59O1xuXG4vLyBmb3IgaW50ZXJuYWwgdXNlXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuX3BlcmNvbGF0ZURvd24gPSBmdW5jdGlvbihpKSB7XG4gIHZhciBzaXplID0gdGhpcy5zaXplO1xuICB2YXIgaHNpemUgPSB0aGlzLnNpemUgPj4+IDE7XG4gIHZhciBhaSA9IHRoaXMuYXJyYXlbaV07XG4gIHZhciBsO1xuICB2YXIgcjtcbiAgdmFyIGJlc3RjO1xuICB3aGlsZSAoaSA8IGhzaXplKSB7XG4gICAgbCA9IChpIDw8IDEpICsgMTtcbiAgICByID0gbCArIDE7XG4gICAgYmVzdGMgPSB0aGlzLmFycmF5W2xdO1xuICAgIGlmIChyIDwgc2l6ZSkge1xuICAgICAgaWYgKHRoaXMuY29tcGFyZSh0aGlzLmFycmF5W3JdLCBiZXN0YykpIHtcbiAgICAgICAgbCA9IHI7XG4gICAgICAgIGJlc3RjID0gdGhpcy5hcnJheVtyXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvbXBhcmUoYmVzdGMsIGFpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuYXJyYXlbaV0gPSBiZXN0YztcbiAgICBpID0gbDtcbiAgfVxuICB0aGlzLmFycmF5W2ldID0gYWk7XG59O1xuXG4vLyBpbnRlcm5hbFxuLy8gX3JlbW92ZUF0KGluZGV4KSB3aWxsIHJlbW92ZSB0aGUgaXRlbSBhdCB0aGUgZ2l2ZW4gaW5kZXggZnJvbSB0aGUgcXVldWUsXG4vLyByZXRhaW5pbmcgYmFsYW5jZS4gcmV0dXJucyB0aGUgcmVtb3ZlZCBpdGVtLCBvciB1bmRlZmluZWQgaWYgbm90aGluZyBpcyByZW1vdmVkLlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLl9yZW1vdmVBdCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gIGlmIChpbmRleCA+IHRoaXMuc2l6ZSAtIDEgfHwgaW5kZXggPCAwKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIC8vIGltcGwxOlxuICAvL3RoaXMuYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgLy90aGlzLmhlYXBpZnkodGhpcy5hcnJheSk7XG4gIC8vIGltcGwyOlxuICB0aGlzLl9wZXJjb2xhdGVVcChpbmRleCwgdHJ1ZSk7XG4gIHJldHVybiB0aGlzLnBvbGwoKTtcbn07XG5cbi8vIHJlbW92ZShteXZhbCkgd2lsbCByZW1vdmUgYW4gaXRlbSBtYXRjaGluZyB0aGUgcHJvdmlkZWQgdmFsdWUgZnJvbSB0aGVcbi8vIHF1ZXVlLCBjaGVja2VkIGZvciBlcXVhbGl0eSBieSB1c2luZyB0aGUgcXVldWUncyBjb21wYXJhdG9yLlxuLy8gcmV0dXJuIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKG15dmFsKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zaXplOyBpKyspIHtcbiAgICBpZiAoIXRoaXMuY29tcGFyZSh0aGlzLmFycmF5W2ldLCBteXZhbCkgJiYgIXRoaXMuY29tcGFyZShteXZhbCwgdGhpcy5hcnJheVtpXSkpIHtcbiAgICAgIC8vIGl0ZW1zIG1hdGNoLCBjb21wYXJhdG9yIHJldHVybnMgZmFsc2UgYm90aCB3YXlzLCByZW1vdmUgaXRlbVxuICAgICAgdGhpcy5fcmVtb3ZlQXQoaSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy8gaW50ZXJuYWxcbi8vIHJlbW92ZXMgYW5kIHJldHVybnMgaXRlbXMgZm9yIHdoaWNoIHRoZSBjYWxsYmFjayByZXR1cm5zIHRydWUuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuX2JhdGNoUmVtb3ZlID0gZnVuY3Rpb24oY2FsbGJhY2ssIGxpbWl0KSB7XG4gIC8vIGluaXRpYWxpemUgcmV0dXJuIGFycmF5IHdpdGggbWF4IHNpemUgb2YgdGhlIGxpbWl0IG9yIGN1cnJlbnQgcXVldWUgc2l6ZVxuICB2YXIgcmV0QXJyID0gbmV3IEFycmF5KGxpbWl0ID8gbGltaXQgOiB0aGlzLnNpemUpO1xuICB2YXIgY291bnQgPSAwO1xuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgdGhpcy5zaXplKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgdGhpcy5zaXplICYmIGNvdW50IDwgcmV0QXJyLmxlbmd0aCkge1xuICAgICAgaWYgKGNhbGxiYWNrKHRoaXMuYXJyYXlbaV0pKSB7XG4gICAgICAgIHJldEFycltjb3VudF0gPSB0aGlzLl9yZW1vdmVBdChpKTtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgLy8gbW92ZSB1cCBhIGxldmVsIGluIHRoZSBoZWFwIGlmIHdlIHJlbW92ZSBhbiBpdGVtXG4gICAgICAgIGkgPSBpID4+IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfSBcbiAgfVxuICByZXRBcnIubGVuZ3RoID0gY291bnQ7XG4gIHJldHVybiByZXRBcnI7XG59XG5cbi8vIHJlbW92ZU9uZShjYWxsYmFjaykgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtIG9mIHRoZSBxdWV1ZVxuLy8gYW5kIHdpbGwgcmVtb3ZlIHRoZSBmaXJzdCBpdGVtIGZvciB3aGljaCB0aGUgY2FsbGJhY2sgd2lsbCByZXR1cm4gdHJ1ZS5cbi8vIHJldHVybiB0aGUgcmVtb3ZlZCBpdGVtLCBvciB1bmRlZmluZWQgaWYgbm90aGluZyBpcyByZW1vdmVkLlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLnJlbW92ZU9uZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBhcnIgPSB0aGlzLl9iYXRjaFJlbW92ZShjYWxsYmFjaywgMSk7XG4gIHJldHVybiBhcnIubGVuZ3RoID4gMCA/IGFyclswXSA6IHVuZGVmaW5lZDtcbn07XG5cbi8vIHJlbW92ZShjYWxsYmFja1ssIGxpbWl0XSkgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtIG9mXG4vLyB0aGUgcXVldWUgYW5kIHdpbGwgcmVtb3ZlIGVhY2ggaXRlbSBmb3Igd2hpY2ggdGhlIGNhbGxiYWNrIHJldHVybnMgdHJ1ZSwgdXAgdG9cbi8vIGEgbWF4IGxpbWl0IG9mIHJlbW92ZWQgaXRlbXMgaWYgc3BlY2lmaWVkIG9yIG5vIGxpbWl0IGlmIHVuc3BlY2lmaWVkLlxuLy8gcmV0dXJuIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbW92ZWQgaXRlbXMuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucmVtb3ZlTWFueSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBsaW1pdCkge1xuICByZXR1cm4gdGhpcy5fYmF0Y2hSZW1vdmUoY2FsbGJhY2ssIGxpbWl0KTtcbn07XG5cbi8vIExvb2sgYXQgdGhlIHRvcCBvZiB0aGUgcXVldWUgKG9uZSBvZiB0aGUgc21hbGxlc3QgZWxlbWVudHMpIHdpdGhvdXQgcmVtb3ZpbmcgaXRcbi8vIGV4ZWN1dGVzIGluIGNvbnN0YW50IHRpbWVcbi8vXG4vLyBDYWxsaW5nIHBlZWsgb24gYW4gZW1wdHkgcHJpb3JpdHkgcXVldWUgcmV0dXJuc1xuLy8gdGhlIFwidW5kZWZpbmVkXCIgdmFsdWUuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy91bmRlZmluZWRcbi8vXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zaXplID09IDApIHJldHVybiB1bmRlZmluZWQ7XG4gIHJldHVybiB0aGlzLmFycmF5WzBdO1xufTtcblxuLy8gcmVtb3ZlIHRoZSBlbGVtZW50IG9uIHRvcCBvZiB0aGUgaGVhcCAob25lIG9mIHRoZSBzbWFsbGVzdCBlbGVtZW50cylcbi8vIHJ1bnMgaW4gbG9nYXJpdGhtaWMgdGltZVxuLy9cbi8vIElmIHRoZSBwcmlvcml0eSBxdWV1ZSBpcyBlbXB0eSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgdGhlXG4vLyBcInVuZGVmaW5lZFwiIHZhbHVlLlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvdW5kZWZpbmVkXG4vL1xuLy8gRm9yIGxvbmctcnVubmluZyBhbmQgbGFyZ2UgcHJpb3JpdHkgcXVldWVzLCBvciBwcmlvcml0eSBxdWV1ZXNcbi8vIHN0b3JpbmcgbGFyZ2Ugb2JqZWN0cywgeW91IG1heSAgd2FudCB0byBjYWxsIHRoZSB0cmltIGZ1bmN0aW9uXG4vLyBhdCBzdHJhdGVnaWMgdGltZXMgdG8gcmVjb3ZlciBhbGxvY2F0ZWQgbWVtb3J5LlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuc2l6ZSA9PSAwKSByZXR1cm4gdW5kZWZpbmVkO1xuICB2YXIgYW5zID0gdGhpcy5hcnJheVswXTtcbiAgaWYgKHRoaXMuc2l6ZSA+IDEpIHtcbiAgICB0aGlzLmFycmF5WzBdID0gdGhpcy5hcnJheVstLXRoaXMuc2l6ZV07XG4gICAgdGhpcy5fcGVyY29sYXRlRG93bigwKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNpemUgLT0gMTtcbiAgfVxuICByZXR1cm4gYW5zO1xufTtcblxuLy8gVGhpcyBmdW5jdGlvbiBhZGRzIHRoZSBwcm92aWRlZCB2YWx1ZSB0byB0aGUgaGVhcCwgd2hpbGUgcmVtb3Zpbmdcbi8vIGFuZCByZXR1cm5pbmcgb25lIG9mIHRoZSBzbWFsbGVzdCBlbGVtZW50cyAobGlrZSBwb2xsKS4gVGhlIHNpemUgb2YgdGhlIHF1ZXVlXG4vLyB0aHVzIHJlbWFpbnMgdW5jaGFuZ2VkLlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLnJlcGxhY2VUb3AgPSBmdW5jdGlvbihteXZhbCkge1xuICBpZiAodGhpcy5zaXplID09IDApIHJldHVybiB1bmRlZmluZWQ7XG4gIHZhciBhbnMgPSB0aGlzLmFycmF5WzBdO1xuICB0aGlzLmFycmF5WzBdID0gbXl2YWw7XG4gIHRoaXMuX3BlcmNvbGF0ZURvd24oMCk7XG4gIHJldHVybiBhbnM7XG59O1xuXG4vLyByZWNvdmVyIHVudXNlZCBtZW1vcnkgKGZvciBsb25nLXJ1bm5pbmcgcHJpb3JpdHkgcXVldWVzKVxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hcnJheSA9IHRoaXMuYXJyYXkuc2xpY2UoMCwgdGhpcy5zaXplKTtcbn07XG5cbi8vIENoZWNrIHdoZXRoZXIgdGhlIGhlYXAgaXMgZW1wdHlcbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNpemUgPT09IDA7XG59O1xuXG4vLyBpdGVyYXRlIG92ZXIgdGhlIGl0ZW1zIGluIG9yZGVyLCBwYXNzIGEgY2FsbGJhY2sgdGhhdCByZWNlaXZlcyAoaXRlbSwgaW5kZXgpIGFzIGFyZ3MuXG4vLyBUT0RPIG9uY2Ugd2UgdHJhbnNwaWxlLCB1bmNvbW1lbnRcbi8vIGlmIChTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yKSB7XG4vLyAgIEZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24qKCkge1xuLy8gICAgIGlmICh0aGlzLmlzRW1wdHkoKSkgcmV0dXJuO1xuLy8gICAgIHZhciBmcHEgPSB0aGlzLmNsb25lKCk7XG4vLyAgICAgd2hpbGUgKCFmcHEuaXNFbXB0eSgpKSB7XG4vLyAgICAgICB5aWVsZCBmcHEucG9sbCgpO1xuLy8gICAgIH1cbi8vICAgfTtcbi8vIH1cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgaWYgKHRoaXMuaXNFbXB0eSgpIHx8IHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSByZXR1cm47XG4gIHZhciBpID0gMDtcbiAgdmFyIGZwcSA9IHRoaXMuY2xvbmUoKTtcbiAgd2hpbGUgKCFmcHEuaXNFbXB0eSgpKSB7XG4gICAgY2FsbGJhY2soZnBxLnBvbGwoKSwgaSsrKTtcbiAgfVxufTtcblxuLy8gcmV0dXJuIHRoZSBrICdzbWFsbGVzdCcgZWxlbWVudHMgb2YgdGhlIHF1ZXVlXG4vLyBydW5zIGluIE8oayBsb2cgaykgdGltZVxuLy8gdGhpcyBpcyB0aGUgZXF1aXZhbGVudCBvZiByZXBlYXRlZGx5IGNhbGxpbmcgcG9sbCwgYnV0XG4vLyBpdCBoYXMgYSBiZXR0ZXIgY29tcHV0YXRpb25hbCBjb21wbGV4aXR5LCB3aGljaCBjYW4gYmVcbi8vIGltcG9ydGFudCBmb3IgbGFyZ2UgZGF0YSBzZXRzLlxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLmtTbWFsbGVzdCA9IGZ1bmN0aW9uKGspIHtcbiAgaWYgKHRoaXMuc2l6ZSA9PSAwKSByZXR1cm4gW107XG4gIHZhciBjb21wYXJhdG9yID0gdGhpcy5jb21wYXJlO1xuICB2YXIgYXJyID0gdGhpcy5hcnJheVxuICB2YXIgZnBxID0gbmV3IEZhc3RQcmlvcml0eVF1ZXVlKGZ1bmN0aW9uKGEsYil7XG4gICByZXR1cm4gY29tcGFyYXRvcihhcnJbYV0sYXJyW2JdKTtcbiAgfSk7XG4gIGsgPSBNYXRoLm1pbih0aGlzLnNpemUsIGspO1xuICB2YXIgc21hbGxlc3QgPSBuZXcgQXJyYXkoayk7XG4gIHZhciBqID0gMDtcbiAgZnBxLmFkZCgwKTtcbiAgd2hpbGUgKGogPCBrKSB7XG4gICAgdmFyIHNtYWxsID0gZnBxLnBvbGwoKTtcbiAgICBzbWFsbGVzdFtqKytdID0gdGhpcy5hcnJheVtzbWFsbF07XG4gICAgdmFyIGwgPSAoc21hbGwgPDwgMSkgKyAxO1xuICAgIHZhciByID0gbCArIDE7XG4gICAgaWYgKGwgPCB0aGlzLnNpemUpIGZwcS5hZGQobCk7XG4gICAgaWYgKHIgPCB0aGlzLnNpemUpIGZwcS5hZGQocik7XG4gIH1cbiAgcmV0dXJuIHNtYWxsZXN0O1xufVxuXG4vLyBqdXN0IGZvciBpbGx1c3RyYXRpb24gcHVycG9zZXNcbnZhciBtYWluID0gZnVuY3Rpb24oKSB7XG4gIC8vIG1haW4gY29kZVxuICB2YXIgeCA9IG5ldyBGYXN0UHJpb3JpdHlRdWV1ZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEgPCBiO1xuICB9KTtcbiAgeC5hZGQoMSk7XG4gIHguYWRkKDApO1xuICB4LmFkZCg1KTtcbiAgeC5hZGQoNCk7XG4gIHguYWRkKDMpO1xuICB3aGlsZSAoIXguaXNFbXB0eSgpKSB7XG4gICAgY29uc29sZS5sb2coeC5wb2xsKCkpO1xuICB9XG59O1xuXG5pZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcbiAgbWFpbigpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZhc3RQcmlvcml0eVF1ZXVlO1xuIl19
