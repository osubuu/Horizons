(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _fastpriorityqueue = require('fastpriorityqueue');

var _fastpriorityqueue2 = _interopRequireDefault(_fastpriorityqueue);

var _metadata = require('./utils/metadata');

var _metadata2 = _interopRequireDefault(_metadata);

var _utils = require('./utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _constants = require('./utils/constants');

var _constants2 = _interopRequireDefault(_constants);

var _ui = require('./utils/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var travelApp = {};

travelApp.getStarted = function () {
  $(".welcome__button").on("click", function () {
    $("html, body").stop().animate({ scrollTop: $(".purpose-section").offset().top }, 900, "swing");
  });
};

travelApp.getUserPurpose = function () {
  $(".travel-form__button").on("click", function () {
    var inputID = $(this).attr("id");
    travelApp.userPurpose = inputID;

    travelApp.displayStats(travelApp.userPurpose);

    $(".criterias").css("display", "flex");

    $("html, body").stop().animate({ scrollTop: $(".criterias").offset().top }, 900, "swing");
  });
};

travelApp.displayStats = function (purposeID) {
  $(".choices").empty();
  $(".criteria-header").text("Please rank the following criteria in order of importance from top to bottom. Use your cursor to drag and drop the items.");
  $(".choices-list-container").css("position", "relative");

  _metadata2.default.forEach(function (purposeObj) {
    if (purposeID === purposeObj.id) {
      purposeObj.stats.forEach(function (stat) {
        var markUpItem = $("<li>").attr("id", stat.stat).addClass("criteria").text(stat.statName);
        $(".choices").append(markUpItem);
      });
    }
  });

  var markUpButton = '<li><button class="user-submit btn">Submit Ranking</button></li>';
  $(".choices").append(markUpButton);

  travelApp.getUserRankings();
};

travelApp.getUserRankings = function () {
  $(".choices").on("click", ".user-submit", function () {
    // remove submit button and put a loader until the results come back
    $(".choices").find("li:last-child").html(_ui2.default.loader);

    var userRankings = $(".choices")[0].children;

    // store the top 3 rankings
    var statsForAPICall = [userRankings[0].id, userRankings[1].id, userRankings[2].id];

    // INITIALIZE ALL GLOBAL VARIABLES FOR DISPLAY AT THE END
    travelApp.wikiExtract = [];
    travelApp.statNamesArray = [];
    travelApp.statDescriptionArray = [];
    travelApp.statCodeArray = [];
    travelApp.wikiPromiseArray = [];
    travelApp.pixaPromiseArray = [];
    travelApp.imageArray = [];
    travelApp.imageTextArray = [];

    // If flickity is not enabled yet, initialize a variable to keep track of whether it is enabled or not
    if (!travelApp.flickityOn) {
      travelApp.flickityOn = false;
    }

    // If flickity is enabled, "destroy" it so the results can be re-rendered without flickity conflicts
    if (travelApp.flickityOn === true) {
      $(".results").flickity("destroy");
    }

    $(".results").css("display", "none");

    travelApp.getStat.apply(travelApp, statsForAPICall);
  });
};

travelApp.getStat = function (statType1, statType2, statType3) {
  (0, _axios2.default)({
    method: "GET",
    url: _constants2.default.INQStats_url,
    dataResponse: "jsonp",
    params: {
      api_key: _constants2.default.INQStats_key,
      data: 'hdi,' + statType1 + ',' + statType2 + ',' + statType3,
      cmd: "getWorldData"
    }
  }).then(function (res) {
    var _$;

    // calling the calculation function to get the top n / bottom n countries
    var finalResults = travelApp.getRecommendations(res.data, statType1, statType2, statType3);

    // Get wiki and pixa extracts for each country
    finalResults.forEach(function (countryObj) {
      travelApp.wikiPromiseArray.push(travelApp.getWiki(countryObj.countryName));
      travelApp.pixaPromiseArray.push(travelApp.getPixa(countryObj.countryName));
    });

    // when all wiki and pixa promises are fulfilled, store the results to prepare them for display
    (_$ = $).when.apply(_$, _toConsumableArray(travelApp.wikiPromiseArray).concat(_toConsumableArray(travelApp.pixaPromiseArray))).then(function () {
      // go through the wikiPixa results
      for (var i = 0; i < arguments.length; i++) {
        if (i < 3) {
          // first three are wiki
          travelApp.storeWiki(arguments.length <= i ? undefined : arguments[i]);
        } else {
          // last three are pixa
          travelApp.storePixa(arguments.length <= i ? undefined : arguments[i]);
        }
      }

      travelApp.displayDestinations(finalResults, [statType1, statType2, statType3]);
    });
  });
};

travelApp.getRecommendations = function (res, statType1, statType2, statType3) {
  // Find direction of each stat type and return it in an array
  var arrDirections = travelApp.findDirections(statType1, statType2, statType3);

  // Initialize arrays and numbers for each round of iteration/filtering
  var initialIter = 60;
  var iteration1 = 10;
  var iteration2 = 5;
  var iteration3 = 3;

  //Initial filter to account for realistic results (based on HDI)
  var initialArr = travelApp.determineResults(res, "hdi", "max", initialIter);

  var results1 = travelApp.determineResults(initialArr, statType1, arrDirections[0], iteration1);
  var results2 = travelApp.determineResults(results1, statType2, arrDirections[1], iteration2);
  var finalResults = travelApp.determineResults(results2, statType3, arrDirections[2], iteration3);

  return finalResults;
};

travelApp.findDirections = function (statType1, statType2, statType3) {
  // Find whether each stattype is max or min
  var stat1Direction = "";
  var stat2Direction = "";
  var stat3Direction = "";

  _metadata2.default.forEach(function (purpose) {
    if (purpose.id === travelApp.userPurpose) {
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

travelApp.determineResults = function (array, statType, direction, iterationNumber) {
  if (direction === "max") {
    return travelApp.determineNCountries(array, statType, iterationNumber, 1);
  } else if (direction === "min") {
    return travelApp.determineNCountries(array, statType, iterationNumber, -1);
  }
};

/* 5.3 CALCULATE THE N COUNTRIES */
travelApp.determineNCountries = function (result, statType, n, direction) {
  // initialize a heap array to keep track of the n largest/smallest stat scores
  var heap = new _fastpriorityqueue2.default();

  // initialize a secondary array to keep track of the n scores AND the associated country to each score
  var nCountries = [];
  var property = statType;
  var countryCounter = 0;

  result.map(function (country) {
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
        heap.poll(); // remove the smallest/largest stat score from the heap as well
        heap.add(stat); // add the new smallest/largest score onto the heap
      }
    }
  });
  return nCountries;
};

travelApp.getWiki = function (country) {
  // get wikipedia text extract
  return $.ajax({
    url: _constants2.default.Wikipedia_url,
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

travelApp.storeWiki = function (result) {
  // This variable stores the object that holds a key name unique to every country. The value of this key is an object that holds the extact.
  var wikiExtractObject = result[0].query.pages;
  // If we convert the above object into an array, the extract can be accessed on the first value of the array. This variable holds the wiki extract.
  travelApp.wikiExtract.push(Object.values(wikiExtractObject)[0].extract);
};

travelApp.getPixa = function (country) {
  // get image URL
  return $.ajax({
    url: _constants2.default.Pixabay_url,
    method: "GET",
    dataType: "jsonp",
    data: {
      key: _constants2.default.Pixabay_key,
      q: country,
      per_page: 15
    }
  });
};

travelApp.storePixa = function (results) {
  var resultsArray = results[0].hits;
  resultsArray.forEach(function (item) {
    travelApp.imageArray.push(item.largeImageURL);
    travelApp.imageTextArray.push(item.tags);
  });
};

travelApp.displayDestinations = function (results, statChoices) {
  $(".results").empty();
  // Go through each country result and build the string literal to append to the page
  var countryCounter = 0;
  var imageCounter = 0;

  results.forEach(function (country) {
    // This element holds all elements for one country result
    var countryContainerElement = $("<div>").addClass("result-container").css("background-image", 'url("' + travelApp.imageArray[_utils2.default.randomize(imageCounter, imageCounter + 15)] + '")');
    var countryCardElement = $("<div>").addClass("card");
    var countryNameElement = $("<h2>").addClass("country-name").text('' + country.countryName);
    var countryDescriptionElement = $("<p>").addClass("wiki-text").text(travelApp.wikiExtract[countryCounter]);
    countryCounter++;

    var statListElement = $("<ul>").addClass("stat-list");
    var smallPixaContainerElement = $("<div>").addClass("country-image-container");
    var smallPixaImage = $("<img>").addClass("country-image").attr({
      src: '' + travelApp.imageArray[_utils2.default.randomize(imageCounter, imageCounter + 15)],
      alt: 'Scenic image of ' + country.countryName + '. Image tags include ' + travelApp.imageTextArray + '.'
    });
    // Add 15 to the image counter ensures that every iteration through the forEach will add images to the associated coutries
    imageCounter += 15;

    smallPixaContainerElement.append(smallPixaImage);
    countryCardElement.append(countryNameElement, countryDescriptionElement, statListElement, smallPixaContainerElement);
    countryContainerElement.append(countryCardElement);
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

      var statListItemElement = $("<li>").addClass("stat-list__item");
      var statTitleIconContainerElement = $("<div>").addClass("stat-list__item__title-icon-container");
      var statTitleElement = $("<h4>").addClass("stat-list__item__title-icon-container__title-number").text(statTitle + ': ' + _utils2.default.numberWithCommas(statValue));
      var statHoverIconElement = '<i class="stat-list__item__title-icon-container__icon far fa-question-circle"></i>';
      statTitleIconContainerElement.append(statTitleElement, statHoverIconElement);
      var statDescriptionContainerElement = $("<div>").addClass("stat-list__item__description-container display-none");
      var statDescriptionElement = $("<p>").addClass("stat-list__item__description-container__description").text(statDescription);

      statDescriptionContainerElement.append(statDescriptionElement);
      statListItemElement.append(statTitleIconContainerElement, statDescriptionContainerElement);
      statListElement.append(statListItemElement);
    });
  });

  travelApp.finalDisplay();
};

travelApp.finalDisplay = function () {
  $(".results").waitForImages(function () {
    $(".results").css("display", "block");

    $("html, body").stop().animate({ scrollTop: $(".results").offset().top }, 900, "swing");

    // remove loader and display submit ranking button again
    var markUpButton = '<li><button class="user-submit btn">Submit Ranking</button></li>';
    $(".choices").find("li:last-child").html(markUpButton);

    /* FLICKITY */
    $(".results").flickity({
      cellAlign: "left",
      contain: true,
      autoPlay: 5000,
      pageDots: false,
      watchCSS: true
    });

    travelApp.flickityOn = true;
  });
};

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

travelApp.eventListeners = function () {
  travelApp.getUserPurpose();
  travelApp.getStarted();
  travelApp.displayStatDescription();
  _ui2.default.transformSVG();
  _ui2.default.slideAndDropListener();
};

travelApp.init = function () {
  travelApp.eventListeners();
};

$(function () {
  travelApp.init();
});

},{"./utils/constants":2,"./utils/metadata":3,"./utils/ui":4,"./utils/utils":5,"axios":6,"fastpriorityqueue":31}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Constants = {
  INQStats_key: '5d3687c7c1788d5f',
  INQStats_url: 'http://inqstatsapi.inqubu.com',
  Pixabay_key: '9879571-e4cbbef3e692aa15a24a7119b',
  Pixabay_url: 'https://www.pixabay.com/api/',
  Wikipedia_url: 'https://en.wikipedia.org/w/api.php'
};

exports.default = Constants;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// ARRAY WITH ALL RELEVANT STATS FOR EACH PURPOSE

var MetaData = [
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

exports.default = MetaData;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var UI = {
  slideAndDropListener: function slideAndDropListener() {
    $(".choices").sortable({
      connectWith: ".sortable",
      scroll: false,
      revert: true,
      helper: "clone",
      containment: ".criterias-container"
    }).css("position", "absolute");
    $("ul, li").disableSelection();
  },
  loader: "<svg class=\"lds-spinner loader\" width=\"100px\"  height=\"100px\"  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" style=\"background: none;\"><g transform=\"rotate(0 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.9166666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(30 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.8333333333333334s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(60 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(90 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(120 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5833333333333334s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(150 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(180 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.4166666666666667s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(210 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(240 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.25s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(270 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.16666666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(300 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.08333333333333333s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(330 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#fd9341\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"0s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g></svg>",
  transformSVG: function transformSVG() {
    // Event listener to transform SVGs into inline SVGS to be able to change their colors with css fill
    $("img.svg").each(function () {
      var $img = jQuery(this);
      var imgID = $img.attr("id");
      var imgClass = $img.attr("class");
      var imgURL = $img.attr("src");

      $.get(imgURL, function (data) {
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
  }
};

exports.default = UI;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var UI = {
  numberWithCommas: function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  randomize: function randomize(startingNumber, endingNumber) {
    return Math.floor(Math.random() * (endingNumber - startingNumber)) + startingNumber;
  }
};

exports.default = UI;

},{}],6:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":8}],7:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || require('./../helpers/btoa');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

}).call(this,require('_process'))

},{"../core/createError":14,"./../core/settle":17,"./../helpers/btoa":21,"./../helpers/buildURL":22,"./../helpers/cookies":24,"./../helpers/isURLSameOrigin":26,"./../helpers/parseHeaders":28,"./../utils":30,"_process":33}],8:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":9,"./cancel/CancelToken":10,"./cancel/isCancel":11,"./core/Axios":12,"./defaults":19,"./helpers/bind":20,"./helpers/spread":29,"./utils":30}],9:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],10:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":9}],11:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],12:[function(require,module,exports){
'use strict';

var defaults = require('./../defaults');
var utils = require('./../utils');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../defaults":19,"./../utils":30,"./InterceptorManager":13,"./dispatchRequest":15}],13:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":30}],14:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":16}],15:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var isAbsoluteURL = require('./../helpers/isAbsoluteURL');
var combineURLs = require('./../helpers/combineURLs');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":11,"../defaults":19,"./../helpers/combineURLs":23,"./../helpers/isAbsoluteURL":25,"./../utils":30,"./transformData":18}],16:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

},{}],17:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":14}],18:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":30}],19:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this,require('_process'))

},{"./adapters/http":7,"./adapters/xhr":7,"./helpers/normalizeHeaderName":27,"./utils":30,"_process":33}],20:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],21:[function(require,module,exports){
'use strict';

// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;

},{}],22:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":30}],23:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],24:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);

},{"./../utils":30}],25:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],26:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);

},{"./../utils":30}],27:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":30}],28:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":30}],29:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],30:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');
var isBuffer = require('is-buffer');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":20,"is-buffer":32}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],33:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIiwiZGV2L3NjcmlwdHMvdXRpbHMvY29uc3RhbnRzLmpzIiwiZGV2L3NjcmlwdHMvdXRpbHMvbWV0YWRhdGEuanMiLCJkZXYvc2NyaXB0cy91dGlscy91aS5qcyIsImRldi9zY3JpcHRzL3V0aWxzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9mYXN0cHJpb3JpdHlxdWV1ZS9GYXN0UHJpb3JpdHlRdWV1ZS5qcyIsIm5vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxZQUFZLEVBQWxCOztBQUVBLFVBQVUsVUFBVixHQUF1QixZQUFNO0FBQzNCLElBQUUsa0JBQUYsRUFBc0IsRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsWUFBWTtBQUM1QyxNQUFFLFlBQUYsRUFDRyxJQURILEdBRUcsT0FGSCxDQUVXLEVBQUUsV0FBVyxFQUFFLGtCQUFGLEVBQXNCLE1BQXRCLEdBQStCLEdBQTVDLEVBRlgsRUFFOEQsR0FGOUQsRUFFbUUsT0FGbkU7QUFHRCxHQUpEO0FBS0QsQ0FORDs7QUFRQSxVQUFVLGNBQVYsR0FBMkIsWUFBTTtBQUMvQixJQUFFLHNCQUFGLEVBQTBCLEVBQTFCLENB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IEhlYXAgZnJvbSAnZmFzdHByaW9yaXR5cXVldWUnO1xuaW1wb3J0IE1ldGFEYXRhIGZyb20gJy4vdXRpbHMvbWV0YWRhdGEnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgVUkgZnJvbSAnLi91dGlscy91aSc7XG5cbmNvbnN0IHRyYXZlbEFwcCA9IHt9O1xuXG50cmF2ZWxBcHAuZ2V0U3RhcnRlZCA9ICgpID0+IHtcbiAgJChcIi53ZWxjb21lX19idXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgJChcImh0bWwsIGJvZHlcIilcbiAgICAgIC5zdG9wKClcbiAgICAgIC5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkKFwiLnB1cnBvc2Utc2VjdGlvblwiKS5vZmZzZXQoKS50b3AgfSwgOTAwLCBcInN3aW5nXCIpO1xuICB9KTtcbn07XG5cbnRyYXZlbEFwcC5nZXRVc2VyUHVycG9zZSA9ICgpID0+IHtcbiAgJChcIi50cmF2ZWwtZm9ybV9fYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGlucHV0SUQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICB0cmF2ZWxBcHAudXNlclB1cnBvc2UgPSBpbnB1dElEO1xuXG4gICAgdHJhdmVsQXBwLmRpc3BsYXlTdGF0cyh0cmF2ZWxBcHAudXNlclB1cnBvc2UpO1xuXG4gICAgJChcIi5jcml0ZXJpYXNcIikuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIik7XG5cbiAgICAkKFwiaHRtbCwgYm9keVwiKVxuICAgICAgLnN0b3AoKVxuICAgICAgLmFuaW1hdGUoXG4gICAgICAgIHsgc2Nyb2xsVG9wOiAkKFwiLmNyaXRlcmlhc1wiKS5vZmZzZXQoKS50b3AgfSxcbiAgICAgICAgOTAwLFxuICAgICAgICBcInN3aW5nXCJcbiAgICAgICk7XG4gIH0pO1xufTtcblxudHJhdmVsQXBwLmRpc3BsYXlTdGF0cyA9IHB1cnBvc2VJRCA9PiB7XG4gICQoXCIuY2hvaWNlc1wiKS5lbXB0eSgpO1xuICAkKFwiLmNyaXRlcmlhLWhlYWRlclwiKS50ZXh0KFxuICAgIFwiUGxlYXNlIHJhbmsgdGhlIGZvbGxvd2luZyBjcml0ZXJpYSBpbiBvcmRlciBvZiBpbXBvcnRhbmNlIGZyb20gdG9wIHRvIGJvdHRvbS4gVXNlIHlvdXIgY3Vyc29yIHRvIGRyYWcgYW5kIGRyb3AgdGhlIGl0ZW1zLlwiXG4gICk7XG4gICQoXCIuY2hvaWNlcy1saXN0LWNvbnRhaW5lclwiKS5jc3MoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpO1xuXG4gIE1ldGFEYXRhLmZvckVhY2gocHVycG9zZU9iaiA9PiB7XG4gICAgaWYgKHB1cnBvc2VJRCA9PT0gcHVycG9zZU9iai5pZCkge1xuICAgICAgcHVycG9zZU9iai5zdGF0cy5mb3JFYWNoKHN0YXQgPT4ge1xuICAgICAgICBjb25zdCBtYXJrVXBJdGVtID0gJChcIjxsaT5cIilcbiAgICAgICAgICAuYXR0cihcImlkXCIsIHN0YXQuc3RhdClcbiAgICAgICAgICAuYWRkQ2xhc3MoXCJjcml0ZXJpYVwiKVxuICAgICAgICAgIC50ZXh0KHN0YXQuc3RhdE5hbWUpO1xuICAgICAgICAkKFwiLmNob2ljZXNcIikuYXBwZW5kKG1hcmtVcEl0ZW0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBtYXJrVXBCdXR0b24gPSBgPGxpPjxidXR0b24gY2xhc3M9XCJ1c2VyLXN1Ym1pdCBidG5cIj5TdWJtaXQgUmFua2luZzwvYnV0dG9uPjwvbGk+YDtcbiAgJChcIi5jaG9pY2VzXCIpLmFwcGVuZChtYXJrVXBCdXR0b24pO1xuXG4gIHRyYXZlbEFwcC5nZXRVc2VyUmFua2luZ3MoKTtcbn07XG5cbnRyYXZlbEFwcC5nZXRVc2VyUmFua2luZ3MgPSAoKSA9PiB7XG4gICQoXCIuY2hvaWNlc1wiKS5vbihcImNsaWNrXCIsIFwiLnVzZXItc3VibWl0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyByZW1vdmUgc3VibWl0IGJ1dHRvbiBhbmQgcHV0IGEgbG9hZGVyIHVudGlsIHRoZSByZXN1bHRzIGNvbWUgYmFja1xuICAgICQoXCIuY2hvaWNlc1wiKS5maW5kKFwibGk6bGFzdC1jaGlsZFwiKS5odG1sKFVJLmxvYWRlcik7XG5cbiAgICBjb25zdCB1c2VyUmFua2luZ3MgPSAkKFwiLmNob2ljZXNcIilbMF0uY2hpbGRyZW47XG5cbiAgICAvLyBzdG9yZSB0aGUgdG9wIDMgcmFua2luZ3NcbiAgICBjb25zdCBzdGF0c0ZvckFQSUNhbGwgPSBbXG4gICAgICB1c2VyUmFua2luZ3NbMF0uaWQsXG4gICAgICB1c2VyUmFua2luZ3NbMV0uaWQsXG4gICAgICB1c2VyUmFua2luZ3NbMl0uaWRcbiAgICBdO1xuXG4gICAgLy8gSU5JVElBTElaRSBBTEwgR0xPQkFMIFZBUklBQkxFUyBGT1IgRElTUExBWSBBVCBUSEUgRU5EXG4gICAgdHJhdmVsQXBwLndpa2lFeHRyYWN0ID0gW107XG4gICAgdHJhdmVsQXBwLnN0YXROYW1lc0FycmF5ID0gW107XG4gICAgdHJhdmVsQXBwLnN0YXREZXNjcmlwdGlvbkFycmF5ID0gW107XG4gICAgdHJhdmVsQXBwLnN0YXRDb2RlQXJyYXkgPSBbXTtcbiAgICB0cmF2ZWxBcHAud2lraVByb21pc2VBcnJheSA9IFtdO1xuICAgIHRyYXZlbEFwcC5waXhhUHJvbWlzZUFycmF5ID0gW107XG4gICAgdHJhdmVsQXBwLmltYWdlQXJyYXkgPSBbXTtcbiAgICB0cmF2ZWxBcHAuaW1hZ2VUZXh0QXJyYXkgPSBbXTtcblxuICAgIC8vIElmIGZsaWNraXR5IGlzIG5vdCBlbmFibGVkIHlldCwgaW5pdGlhbGl6ZSBhIHZhcmlhYmxlIHRvIGtlZXAgdHJhY2sgb2Ygd2hldGhlciBpdCBpcyBlbmFibGVkIG9yIG5vdFxuICAgIGlmICghdHJhdmVsQXBwLmZsaWNraXR5T24pIHtcbiAgICAgIHRyYXZlbEFwcC5mbGlja2l0eU9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSWYgZmxpY2tpdHkgaXMgZW5hYmxlZCwgXCJkZXN0cm95XCIgaXQgc28gdGhlIHJlc3VsdHMgY2FuIGJlIHJlLXJlbmRlcmVkIHdpdGhvdXQgZmxpY2tpdHkgY29uZmxpY3RzXG4gICAgaWYgKHRyYXZlbEFwcC5mbGlja2l0eU9uID09PSB0cnVlKSB7XG4gICAgICAkKFwiLnJlc3VsdHNcIikuZmxpY2tpdHkoXCJkZXN0cm95XCIpO1xuICAgIH1cblxuICAgICQoXCIucmVzdWx0c1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcblxuICAgIHRyYXZlbEFwcC5nZXRTdGF0KC4uLnN0YXRzRm9yQVBJQ2FsbCk7XG4gIH0pO1xufTtcblxudHJhdmVsQXBwLmdldFN0YXQgPSAoc3RhdFR5cGUxLCBzdGF0VHlwZTIsIHN0YXRUeXBlMykgPT4ge1xuICBheGlvcyh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogQ29uc3RhbnRzLklOUVN0YXRzX3VybCxcbiAgICBkYXRhUmVzcG9uc2U6IFwianNvbnBcIixcbiAgICBwYXJhbXM6IHtcbiAgICAgIGFwaV9rZXk6IENvbnN0YW50cy5JTlFTdGF0c19rZXksXG4gICAgICBkYXRhOiBgaGRpLCR7c3RhdFR5cGUxfSwke3N0YXRUeXBlMn0sJHtzdGF0VHlwZTN9YCxcbiAgICAgIGNtZDogXCJnZXRXb3JsZERhdGFcIlxuICAgIH1cbiAgfSkudGhlbihyZXMgPT4ge1xuICAgIC8vIGNhbGxpbmcgdGhlIGNhbGN1bGF0aW9uIGZ1bmN0aW9uIHRvIGdldCB0aGUgdG9wIG4gLyBib3R0b20gbiBjb3VudHJpZXNcbiAgICBjb25zdCBmaW5hbFJlc3VsdHMgPSB0cmF2ZWxBcHAuZ2V0UmVjb21tZW5kYXRpb25zKHJlcy5kYXRhLCBzdGF0VHlwZTEsIHN0YXRUeXBlMiwgc3RhdFR5cGUzKTtcblxuICAgIC8vIEdldCB3aWtpIGFuZCBwaXhhIGV4dHJhY3RzIGZvciBlYWNoIGNvdW50cnlcbiAgICBmaW5hbFJlc3VsdHMuZm9yRWFjaChjb3VudHJ5T2JqID0+IHtcbiAgICAgIHRyYXZlbEFwcC53aWtpUHJvbWlzZUFycmF5LnB1c2godHJhdmVsQXBwLmdldFdpa2koY291bnRyeU9iai5jb3VudHJ5TmFtZSkpO1xuICAgICAgdHJhdmVsQXBwLnBpeGFQcm9taXNlQXJyYXkucHVzaCh0cmF2ZWxBcHAuZ2V0UGl4YShjb3VudHJ5T2JqLmNvdW50cnlOYW1lKSk7XG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIGFsbCB3aWtpIGFuZCBwaXhhIHByb21pc2VzIGFyZSBmdWxmaWxsZWQsIHN0b3JlIHRoZSByZXN1bHRzIHRvIHByZXBhcmUgdGhlbSBmb3IgZGlzcGxheVxuICAgICQud2hlbiguLi50cmF2ZWxBcHAud2lraVByb21pc2VBcnJheSwgLi4udHJhdmVsQXBwLnBpeGFQcm9taXNlQXJyYXkpLnRoZW4oKC4uLndpa2lQaXhhUmVzdWx0cykgPT4ge1xuICAgICAgLy8gZ28gdGhyb3VnaCB0aGUgd2lraVBpeGEgcmVzdWx0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWtpUGl4YVJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPCAzKSB7IC8vIGZpcnN0IHRocmVlIGFyZSB3aWtpXG4gICAgICAgICAgdHJhdmVsQXBwLnN0b3JlV2lraSh3aWtpUGl4YVJlc3VsdHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBsYXN0IHRocmVlIGFyZSBwaXhhXG4gICAgICAgICAgdHJhdmVsQXBwLnN0b3JlUGl4YSh3aWtpUGl4YVJlc3VsdHNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRyYXZlbEFwcC5kaXNwbGF5RGVzdGluYXRpb25zKGZpbmFsUmVzdWx0cywgW3N0YXRUeXBlMSwgc3RhdFR5cGUyLCBzdGF0VHlwZTNdKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG50cmF2ZWxBcHAuZ2V0UmVjb21tZW5kYXRpb25zID0gKHJlcywgc3RhdFR5cGUxLCBzdGF0VHlwZTIsIHN0YXRUeXBlMykgPT4ge1xuICAvLyBGaW5kIGRpcmVjdGlvbiBvZiBlYWNoIHN0YXQgdHlwZSBhbmQgcmV0dXJuIGl0IGluIGFuIGFycmF5XG4gIGNvbnN0IGFyckRpcmVjdGlvbnMgPSB0cmF2ZWxBcHAuZmluZERpcmVjdGlvbnMoc3RhdFR5cGUxLCBzdGF0VHlwZTIsIHN0YXRUeXBlMyk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBhcnJheXMgYW5kIG51bWJlcnMgZm9yIGVhY2ggcm91bmQgb2YgaXRlcmF0aW9uL2ZpbHRlcmluZ1xuICBjb25zdCBpbml0aWFsSXRlciA9IDYwO1xuICBjb25zdCBpdGVyYXRpb24xID0gMTA7XG4gIGNvbnN0IGl0ZXJhdGlvbjIgPSA1O1xuICBjb25zdCBpdGVyYXRpb24zID0gMztcblxuICAvL0luaXRpYWwgZmlsdGVyIHRvIGFjY291bnQgZm9yIHJlYWxpc3RpYyByZXN1bHRzIChiYXNlZCBvbiBIREkpXG4gIGNvbnN0IGluaXRpYWxBcnIgPSB0cmF2ZWxBcHAuZGV0ZXJtaW5lUmVzdWx0cyhyZXMsIFwiaGRpXCIsIFwibWF4XCIsIGluaXRpYWxJdGVyKTtcblxuICBjb25zdCByZXN1bHRzMSA9IHRyYXZlbEFwcC5kZXRlcm1pbmVSZXN1bHRzKGluaXRpYWxBcnIsIHN0YXRUeXBlMSwgYXJyRGlyZWN0aW9uc1swXSwgaXRlcmF0aW9uMSk7XG4gIGNvbnN0IHJlc3VsdHMyID0gdHJhdmVsQXBwLmRldGVybWluZVJlc3VsdHMocmVzdWx0czEsIHN0YXRUeXBlMiwgYXJyRGlyZWN0aW9uc1sxXSwgaXRlcmF0aW9uMik7XG4gIGNvbnN0IGZpbmFsUmVzdWx0cyA9IHRyYXZlbEFwcC5kZXRlcm1pbmVSZXN1bHRzKHJlc3VsdHMyLCBzdGF0VHlwZTMsIGFyckRpcmVjdGlvbnNbMl0sIGl0ZXJhdGlvbjMpO1xuXG4gIHJldHVybiBmaW5hbFJlc3VsdHM7XG59O1xuXG50cmF2ZWxBcHAuZmluZERpcmVjdGlvbnMgPSAoc3RhdFR5cGUxLCBzdGF0VHlwZTIsIHN0YXRUeXBlMykgPT4ge1xuICAvLyBGaW5kIHdoZXRoZXIgZWFjaCBzdGF0dHlwZSBpcyBtYXggb3IgbWluXG4gIGxldCBzdGF0MURpcmVjdGlvbiA9IFwiXCI7XG4gIGxldCBzdGF0MkRpcmVjdGlvbiA9IFwiXCI7XG4gIGxldCBzdGF0M0RpcmVjdGlvbiA9IFwiXCI7XG5cbiAgTWV0YURhdGEuZm9yRWFjaChwdXJwb3NlID0+IHtcbiAgICBpZiAocHVycG9zZS5pZCA9PT0gdHJhdmVsQXBwLnVzZXJQdXJwb3NlKSB7XG4gICAgICBwdXJwb3NlLnN0YXRzLmZvckVhY2goc3RhdCA9PiB7XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHN0YXQgaW4gdGhlIHN0YXRzIGFycmF5IGlzIHN0YXR0eXBlMSwgZ2V0IHRoaXMgZGlyZWN0aW9uXG4gICAgICAgIGlmIChzdGF0LnN0YXQgPT09IHN0YXRUeXBlMSkge1xuICAgICAgICAgIHN0YXQxRGlyZWN0aW9uID0gc3RhdC5kaXJlY3Rpb247XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXRDb2RlQXJyYXkucHVzaChzdGF0LnN0YXQpO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0TmFtZXNBcnJheS5wdXNoKHN0YXQuc3RhdE5hbWUpO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0RGVzY3JpcHRpb25BcnJheS5wdXNoKHN0YXQuZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHN0YXQgaW4gdGhlIHN0YXRzIGFycmF5IGlzIHN0YXR0eXBlMiwgZ2V0IHRoaXMgZGlyZWN0aW9uXG4gICAgICAgIGVsc2UgaWYgKHN0YXQuc3RhdCA9PT0gc3RhdFR5cGUyKSB7XG4gICAgICAgICAgc3RhdDJEaXJlY3Rpb24gPSBzdGF0LmRpcmVjdGlvbjtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdENvZGVBcnJheS5wdXNoKHN0YXQuc3RhdCk7XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXROYW1lc0FycmF5LnB1c2goc3RhdC5zdGF0TmFtZSk7XG4gICAgICAgICAgdHJhdmVsQXBwLnN0YXREZXNjcmlwdGlvbkFycmF5LnB1c2goc3RhdC5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgc3RhdCBpbiB0aGUgc3RhdHMgYXJyYXkgaXMgc3RhdHR5cGUzLCBnZXQgdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgZWxzZSBpZiAoc3RhdC5zdGF0ID09PSBzdGF0VHlwZTMpIHtcbiAgICAgICAgICBzdGF0M0RpcmVjdGlvbiA9IHN0YXQuZGlyZWN0aW9uO1xuICAgICAgICAgIHRyYXZlbEFwcC5zdGF0Q29kZUFycmF5LnB1c2goc3RhdC5zdGF0KTtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdE5hbWVzQXJyYXkucHVzaChzdGF0LnN0YXROYW1lKTtcbiAgICAgICAgICB0cmF2ZWxBcHAuc3RhdERlc2NyaXB0aW9uQXJyYXkucHVzaChzdGF0LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gW3N0YXQxRGlyZWN0aW9uLCBzdGF0MkRpcmVjdGlvbiwgc3RhdDNEaXJlY3Rpb25dO1xufTtcblxudHJhdmVsQXBwLmRldGVybWluZVJlc3VsdHMgPSAoYXJyYXksIHN0YXRUeXBlLCBkaXJlY3Rpb24sIGl0ZXJhdGlvbk51bWJlcikgPT4ge1xuICBpZiAoZGlyZWN0aW9uID09PSBcIm1heFwiKSB7XG4gICAgcmV0dXJuIHRyYXZlbEFwcC5kZXRlcm1pbmVOQ291bnRyaWVzKGFycmF5LCBzdGF0VHlwZSwgaXRlcmF0aW9uTnVtYmVyLCAxKTtcbiAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwibWluXCIpIHtcbiAgICByZXR1cm4gdHJhdmVsQXBwLmRldGVybWluZU5Db3VudHJpZXMoYXJyYXksIHN0YXRUeXBlLCBpdGVyYXRpb25OdW1iZXIsIC0xKTtcbiAgfVxufTtcblxuLyogNS4zIENBTENVTEFURSBUSEUgTiBDT1VOVFJJRVMgKi9cbnRyYXZlbEFwcC5kZXRlcm1pbmVOQ291bnRyaWVzID0gKHJlc3VsdCwgc3RhdFR5cGUsIG4sIGRpcmVjdGlvbikgPT4ge1xuICAvLyBpbml0aWFsaXplIGEgaGVhcCBhcnJheSB0byBrZWVwIHRyYWNrIG9mIHRoZSBuIGxhcmdlc3Qvc21hbGxlc3Qgc3RhdCBzY29yZXNcbiAgY29uc3QgaGVhcCA9IG5ldyBIZWFwKCk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBhIHNlY29uZGFyeSBhcnJheSB0byBrZWVwIHRyYWNrIG9mIHRoZSBuIHNjb3JlcyBBTkQgdGhlIGFzc29jaWF0ZWQgY291bnRyeSB0byBlYWNoIHNjb3JlXG4gIGNvbnN0IG5Db3VudHJpZXMgPSBbXTtcbiAgY29uc3QgcHJvcGVydHkgPSBzdGF0VHlwZTtcbiAgbGV0IGNvdW50cnlDb3VudGVyID0gMDtcblxuICByZXN1bHQubWFwKGNvdW50cnkgPT4ge1xuICAgIC8vIElNUE9SVEFOVDogbXVsdGlwbHkgYnkgZGlyZWN0aW9uIHRvIGltcGxlbWVudCBtYXgvbWluIGhlYXBcbiAgICAvLyBhIGRpcmVjdGlvbiBvZiAxID0gd2Ugd2FudCBtYXhpbXVtIHNjb3Jlc1xuICAgIC8vIGEgZGlyZWN0aW9uIG9mIC0xID0gd2Ugd2FudCBtaW5pbXVtIHNjb3Jlc1xuICAgIGNvbnN0IHN0YXQgPSBOdW1iZXIoY291bnRyeVtwcm9wZXJ0eV0pICogZGlyZWN0aW9uO1xuXG4gICAgLy8gaWYgaXQncyB0aGUgZmlyc3QgbiBjb3VudHJpZXMgZnJvbSB0aGUgcmVzdWx0LCBubyB3b3JrIHJlcXVpcmVkLiBKdXN0IGFkZCB0aGVtIGRpcmVjdGx5IGludG8gYm90aCB0aGUgaGVhcCBhbmQgbkNvdW50cmllcyB2YXJpYWJsZXNcbiAgICBpZiAoY291bnRyeUNvdW50ZXIgPCBuKSB7XG4gICAgICBoZWFwLmFkZChzdGF0KTtcbiAgICAgIG5Db3VudHJpZXMucHVzaChjb3VudHJ5KTtcblxuICAgICAgLy8gaW5jcmVtZW50IGNvdW50cnlDb3VudGVyIHRvIGtub3cgd2hlbiB3ZSdyZSBwYXN0IHRoZSBmaXJzdCBuIGNvdW50cmllc1xuICAgICAgY291bnRyeUNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0YXQgPiBoZWFwLnBlZWsoKSkge1xuICAgICAgICAvLyBpZiBzbywgZmluZCB0aGUgbG9jYXRpb24gb2YgdGhlIHNtYWxsZXN0L2xhcmdlc3Qgc3RhdCBzY29yZSBpbiB0aGUgY3VycmVudCBuQ291bnRyaWVzIGFycmF5IGFuZCByZXBsYWNlIGl0IHdpdGggdGhlIG5ldyBzdGF0IGFuZCBpdHMgYXNzb2NpYXRlZCBjb3VudHJ5XG4gICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgbkNvdW50cmllcy5sZW5ndGg7IG0rKykge1xuICAgICAgICAgIC8vIG11bHRpcGx5IGJ5IGRpcmVjdGlvbiBhZ2FpbiB0byBjb21wYXJlIHByb3Blcmx5IHdpdGggdGhlIGhlYXBcbiAgICAgICAgICBjb25zdCBjdXJyZW50U3RhdCA9IE51bWJlcihuQ291bnRyaWVzW21dW3Byb3BlcnR5XSkgKiBkaXJlY3Rpb247XG4gICAgICAgICAgaWYgKGN1cnJlbnRTdGF0ID09PSBoZWFwLnBlZWsoKSkge1xuICAgICAgICAgICAgLy8gcmVwbGFjZSBjb3VudHJ5XG4gICAgICAgICAgICBuQ291bnRyaWVzLnNwbGljZShtLCAxLCBjb3VudHJ5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBoZWFwLnBvbGwoKTsgLy8gcmVtb3ZlIHRoZSBzbWFsbGVzdC9sYXJnZXN0IHN0YXQgc2NvcmUgZnJvbSB0aGUgaGVhcCBhcyB3ZWxsXG4gICAgICAgIGhlYXAuYWRkKHN0YXQpOyAvLyBhZGQgdGhlIG5ldyBzbWFsbGVzdC9sYXJnZXN0IHNjb3JlIG9udG8gdGhlIGhlYXBcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbkNvdW50cmllcztcbn07XG5cblxudHJhdmVsQXBwLmdldFdpa2kgPSBjb3VudHJ5ID0+IHtcbiAgLy8gZ2V0IHdpa2lwZWRpYSB0ZXh0IGV4dHJhY3RcbiAgcmV0dXJuICQuYWpheCh7XG4gICAgdXJsOiBDb25zdGFudHMuV2lraXBlZGlhX3VybCxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgZGF0YVR5cGU6IFwianNvbnBcIixcbiAgICBkYXRhOiB7XG4gICAgICBhY3Rpb246IFwicXVlcnlcIixcbiAgICAgIHByb3A6IFwiZXh0cmFjdHNcIixcbiAgICAgIHRpdGxlczogY291bnRyeSxcbiAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICBleGxpbWl0OiAxLFxuICAgICAgZXhjaGFyczogMjgwLFxuICAgICAgZXhpbnRybzogdHJ1ZSxcbiAgICAgIGV4cGxhaW50ZXh0OiB0cnVlLFxuICAgICAgcmVkaXJlY3RzOiAxXG4gICAgfVxuICB9KTtcbn07XG5cbnRyYXZlbEFwcC5zdG9yZVdpa2kgPSByZXN1bHQgPT4ge1xuICAvLyBUaGlzIHZhcmlhYmxlIHN0b3JlcyB0aGUgb2JqZWN0IHRoYXQgaG9sZHMgYSBrZXkgbmFtZSB1bmlxdWUgdG8gZXZlcnkgY291bnRyeS4gVGhlIHZhbHVlIG9mIHRoaXMga2V5IGlzIGFuIG9iamVjdCB0aGF0IGhvbGRzIHRoZSBleHRhY3QuXG4gIGNvbnN0IHdpa2lFeHRyYWN0T2JqZWN0ID0gcmVzdWx0WzBdLnF1ZXJ5LnBhZ2VzO1xuICAvLyBJZiB3ZSBjb252ZXJ0IHRoZSBhYm92ZSBvYmplY3QgaW50byBhbiBhcnJheSwgdGhlIGV4dHJhY3QgY2FuIGJlIGFjY2Vzc2VkIG9uIHRoZSBmaXJzdCB2YWx1ZSBvZiB0aGUgYXJyYXkuIFRoaXMgdmFyaWFibGUgaG9sZHMgdGhlIHdpa2kgZXh0cmFjdC5cbiAgdHJhdmVsQXBwLndpa2lFeHRyYWN0LnB1c2goT2JqZWN0LnZhbHVlcyh3aWtpRXh0cmFjdE9iamVjdClbMF0uZXh0cmFjdCk7XG59O1xuXG50cmF2ZWxBcHAuZ2V0UGl4YSA9IGNvdW50cnkgPT4ge1xuICAvLyBnZXQgaW1hZ2UgVVJMXG4gIHJldHVybiAkLmFqYXgoe1xuICAgIHVybDogQ29uc3RhbnRzLlBpeGFiYXlfdXJsLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxuICAgIGRhdGE6IHtcbiAgICAgIGtleTogQ29uc3RhbnRzLlBpeGFiYXlfa2V5LFxuICAgICAgcTogY291bnRyeSxcbiAgICAgIHBlcl9wYWdlOiAxNVxuICAgIH1cbiAgfSk7XG59O1xuXG50cmF2ZWxBcHAuc3RvcmVQaXhhID0gcmVzdWx0cyA9PiB7XG4gIGNvbnN0IHJlc3VsdHNBcnJheSA9IHJlc3VsdHNbMF0uaGl0cztcbiAgcmVzdWx0c0FycmF5LmZvckVhY2goaXRlbSA9PiB7XG4gICAgdHJhdmVsQXBwLmltYWdlQXJyYXkucHVzaChpdGVtLmxhcmdlSW1hZ2VVUkwpO1xuICAgIHRyYXZlbEFwcC5pbWFnZVRleHRBcnJheS5wdXNoKGl0ZW0udGFncyk7XG4gIH0pO1xufTtcblxudHJhdmVsQXBwLmRpc3BsYXlEZXN0aW5hdGlvbnMgPSAocmVzdWx0cywgc3RhdENob2ljZXMpID0+IHtcbiAgJChcIi5yZXN1bHRzXCIpLmVtcHR5KCk7XG4gIC8vIEdvIHRocm91Z2ggZWFjaCBjb3VudHJ5IHJlc3VsdCBhbmQgYnVpbGQgdGhlIHN0cmluZyBsaXRlcmFsIHRvIGFwcGVuZCB0byB0aGUgcGFnZVxuICBsZXQgY291bnRyeUNvdW50ZXIgPSAwO1xuICBsZXQgaW1hZ2VDb3VudGVyID0gMDtcblxuICByZXN1bHRzLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgLy8gVGhpcyBlbGVtZW50IGhvbGRzIGFsbCBlbGVtZW50cyBmb3Igb25lIGNvdW50cnkgcmVzdWx0XG4gICAgY29uc3QgY291bnRyeUNvbnRhaW5lckVsZW1lbnQgPSAkKFwiPGRpdj5cIilcbiAgICAgIC5hZGRDbGFzcyhcInJlc3VsdC1jb250YWluZXJcIilcbiAgICAgIC5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIGB1cmwoXCIke3RyYXZlbEFwcC5pbWFnZUFycmF5W1V0aWxzLnJhbmRvbWl6ZShpbWFnZUNvdW50ZXIsIGltYWdlQ291bnRlciArIDE1KV19XCIpYCk7XG4gICAgY29uc3QgY291bnRyeUNhcmRFbGVtZW50ID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwiY2FyZFwiKTtcbiAgICBjb25zdCBjb3VudHJ5TmFtZUVsZW1lbnQgPSAkKFwiPGgyPlwiKVxuICAgICAgLmFkZENsYXNzKFwiY291bnRyeS1uYW1lXCIpXG4gICAgICAudGV4dChgJHtjb3VudHJ5LmNvdW50cnlOYW1lfWApO1xuICAgIGNvbnN0IGNvdW50cnlEZXNjcmlwdGlvbkVsZW1lbnQgPSAkKFwiPHA+XCIpXG4gICAgICAuYWRkQ2xhc3MoXCJ3aWtpLXRleHRcIilcbiAgICAgIC50ZXh0KHRyYXZlbEFwcC53aWtpRXh0cmFjdFtjb3VudHJ5Q291bnRlcl0pO1xuICAgIGNvdW50cnlDb3VudGVyKys7XG5cbiAgICBjb25zdCBzdGF0TGlzdEVsZW1lbnQgPSAkKFwiPHVsPlwiKS5hZGRDbGFzcyhcInN0YXQtbGlzdFwiKTtcbiAgICBjb25zdCBzbWFsbFBpeGFDb250YWluZXJFbGVtZW50ID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwiY291bnRyeS1pbWFnZS1jb250YWluZXJcIik7XG4gICAgY29uc3Qgc21hbGxQaXhhSW1hZ2UgPSAkKFwiPGltZz5cIilcbiAgICAgIC5hZGRDbGFzcyhcImNvdW50cnktaW1hZ2VcIilcbiAgICAgIC5hdHRyKHtcbiAgICAgICAgc3JjOiBgJHt0cmF2ZWxBcHAuaW1hZ2VBcnJheVtVdGlscy5yYW5kb21pemUoaW1hZ2VDb3VudGVyLCBpbWFnZUNvdW50ZXIgKyAxNSldfWAsXG4gICAgICAgIGFsdDogYFNjZW5pYyBpbWFnZSBvZiAke2NvdW50cnkuY291bnRyeU5hbWV9LiBJbWFnZSB0YWdzIGluY2x1ZGUgJHt0cmF2ZWxBcHAuaW1hZ2VUZXh0QXJyYXl9LmBcbiAgICAgIH0pO1xuICAgIC8vIEFkZCAxNSB0byB0aGUgaW1hZ2UgY291bnRlciBlbnN1cmVzIHRoYXQgZXZlcnkgaXRlcmF0aW9uIHRocm91Z2ggdGhlIGZvckVhY2ggd2lsbCBhZGQgaW1hZ2VzIHRvIHRoZSBhc3NvY2lhdGVkIGNvdXRyaWVzXG4gICAgaW1hZ2VDb3VudGVyICs9IDE1O1xuXG4gICAgc21hbGxQaXhhQ29udGFpbmVyRWxlbWVudC5hcHBlbmQoc21hbGxQaXhhSW1hZ2UpO1xuICAgIGNvdW50cnlDYXJkRWxlbWVudC5hcHBlbmQoXG4gICAgICBjb3VudHJ5TmFtZUVsZW1lbnQsXG4gICAgICBjb3VudHJ5RGVzY3JpcHRpb25FbGVtZW50LFxuICAgICAgc3RhdExpc3RFbGVtZW50LFxuICAgICAgc21hbGxQaXhhQ29udGFpbmVyRWxlbWVudFxuICAgICk7XG4gICAgY291bnRyeUNvbnRhaW5lckVsZW1lbnQuYXBwZW5kKGNvdW50cnlDYXJkRWxlbWVudCk7XG4gICAgJChcIi5yZXN1bHRzXCIpLmFwcGVuZChjb3VudHJ5Q29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSBcInN0YXRDaG9pY2VzXCIgYW5kIHNldCB1cCAzIGluZm9ybWF0aW9uOlxuICAgIC8vIDEuIHRpdGxlIG9mIHN0YXQgKHRha2VuIGZyb20gdHJhdmVsQXBwLnN0YXROYW1lc0FycmF5KVxuICAgIC8vIDIuIHZhbHVlIG9mIHN0YXQgKHRha2VuIGZyb20gcmVzdWx0cyBvYmplY3QpXG4gICAgLy8gMy4gZGVzY3JpcHRpb24gb2Ygc3RhdCAodGFrZW4gZnJvbSB0cmF2ZWxBcHAuc3RhdERlc2NyaXB0aW9uQXJyYXkpXG4gICAgbGV0IHN0YXRDb3VudGVyID0gMDtcbiAgICBzdGF0Q2hvaWNlcy5mb3JFYWNoKHN0YXQgPT4ge1xuICAgICAgY29uc3Qgc3RhdFRpdGxlID0gdHJhdmVsQXBwLnN0YXROYW1lc0FycmF5W3N0YXRDb3VudGVyXTtcbiAgICAgIGNvbnN0IHN0YXRWYWx1ZSA9IGNvdW50cnlbdHJhdmVsQXBwLnN0YXRDb2RlQXJyYXlbc3RhdENvdW50ZXJdXTtcbiAgICAgIGNvbnN0IHN0YXREZXNjcmlwdGlvbiA9IHRyYXZlbEFwcC5zdGF0RGVzY3JpcHRpb25BcnJheVtzdGF0Q291bnRlcl07XG4gICAgICBzdGF0Q291bnRlcisrO1xuXG4gICAgICBjb25zdCBzdGF0TGlzdEl0ZW1FbGVtZW50ID0gJChcIjxsaT5cIikuYWRkQ2xhc3MoXCJzdGF0LWxpc3RfX2l0ZW1cIik7XG4gICAgICBjb25zdCBzdGF0VGl0bGVJY29uQ29udGFpbmVyRWxlbWVudCA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInN0YXQtbGlzdF9faXRlbV9fdGl0bGUtaWNvbi1jb250YWluZXJcIik7XG4gICAgICBjb25zdCBzdGF0VGl0bGVFbGVtZW50ID0gJChcIjxoND5cIilcbiAgICAgICAgLmFkZENsYXNzKFwic3RhdC1saXN0X19pdGVtX190aXRsZS1pY29uLWNvbnRhaW5lcl9fdGl0bGUtbnVtYmVyXCIpXG4gICAgICAgIC50ZXh0KGAke3N0YXRUaXRsZX06ICR7VXRpbHMubnVtYmVyV2l0aENvbW1hcyhzdGF0VmFsdWUpfWApO1xuICAgICAgY29uc3Qgc3RhdEhvdmVySWNvbkVsZW1lbnQgPSBgPGkgY2xhc3M9XCJzdGF0LWxpc3RfX2l0ZW1fX3RpdGxlLWljb24tY29udGFpbmVyX19pY29uIGZhciBmYS1xdWVzdGlvbi1jaXJjbGVcIj48L2k+YDtcbiAgICAgIHN0YXRUaXRsZUljb25Db250YWluZXJFbGVtZW50LmFwcGVuZChzdGF0VGl0bGVFbGVtZW50LCBzdGF0SG92ZXJJY29uRWxlbWVudCk7XG4gICAgICBjb25zdCBzdGF0RGVzY3JpcHRpb25Db250YWluZXJFbGVtZW50ID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwic3RhdC1saXN0X19pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXIgZGlzcGxheS1ub25lXCIpO1xuICAgICAgY29uc3Qgc3RhdERlc2NyaXB0aW9uRWxlbWVudCA9ICQoXCI8cD5cIilcbiAgICAgICAgLmFkZENsYXNzKFwic3RhdC1saXN0X19pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXJfX2Rlc2NyaXB0aW9uXCIpXG4gICAgICAgIC50ZXh0KHN0YXREZXNjcmlwdGlvbik7XG5cbiAgICAgIHN0YXREZXNjcmlwdGlvbkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kKHN0YXREZXNjcmlwdGlvbkVsZW1lbnQpO1xuICAgICAgc3RhdExpc3RJdGVtRWxlbWVudC5hcHBlbmQoc3RhdFRpdGxlSWNvbkNvbnRhaW5lckVsZW1lbnQsIHN0YXREZXNjcmlwdGlvbkNvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgc3RhdExpc3RFbGVtZW50LmFwcGVuZChzdGF0TGlzdEl0ZW1FbGVtZW50KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgdHJhdmVsQXBwLmZpbmFsRGlzcGxheSgpO1xufTtcblxudHJhdmVsQXBwLmZpbmFsRGlzcGxheSA9ICgpID0+IHtcbiAgJChcIi5yZXN1bHRzXCIpLndhaXRGb3JJbWFnZXMoKCkgPT4ge1xuICAgICQoXCIucmVzdWx0c1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG5cbiAgICAkKFwiaHRtbCwgYm9keVwiKVxuICAgICAgLnN0b3AoKVxuICAgICAgLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoXCIucmVzdWx0c1wiKS5vZmZzZXQoKS50b3AgfSwgOTAwLCBcInN3aW5nXCIpO1xuXG4gICAgLy8gcmVtb3ZlIGxvYWRlciBhbmQgZGlzcGxheSBzdWJtaXQgcmFua2luZyBidXR0b24gYWdhaW5cbiAgICBjb25zdCBtYXJrVXBCdXR0b24gPSBgPGxpPjxidXR0b24gY2xhc3M9XCJ1c2VyLXN1Ym1pdCBidG5cIj5TdWJtaXQgUmFua2luZzwvYnV0dG9uPjwvbGk+YDtcbiAgICAkKFwiLmNob2ljZXNcIilcbiAgICAgIC5maW5kKFwibGk6bGFzdC1jaGlsZFwiKVxuICAgICAgLmh0bWwobWFya1VwQnV0dG9uKTtcblxuICAgIC8qIEZMSUNLSVRZICovXG4gICAgJChcIi5yZXN1bHRzXCIpLmZsaWNraXR5KHtcbiAgICAgIGNlbGxBbGlnbjogXCJsZWZ0XCIsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgYXV0b1BsYXk6IDUwMDAsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICB3YXRjaENTUzogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdHJhdmVsQXBwLmZsaWNraXR5T24gPSB0cnVlO1xuICB9KTtcbn07XG5cbnRyYXZlbEFwcC5kaXNwbGF5U3RhdERlc2NyaXB0aW9uID0gKCkgPT4ge1xuICAkKFwiLnJlc3VsdHNcIikub24oXCJjbGlja1wiLCBcIi5zdGF0LWxpc3RfX2l0ZW1fX3RpdGxlLWljb24tY29udGFpbmVyX19pY29uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoXG4gICAgICAkKHRoaXMpXG4gICAgICAgIC5wYXJlbnRzKFwiLnN0YXQtbGlzdF9faXRlbVwiKVxuICAgICAgICAuZmluZChcIi5zdGF0LWxpc3RfX2l0ZW1fX2Rlc2NyaXB0aW9uLWNvbnRhaW5lclwiKVxuICAgICAgICAuaGFzQ2xhc3MoXCJkaXNwbGF5LW5vbmVcIikgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICAkKFwiLnJlc3VsdHNcIilcbiAgICAgICAgLmZpbmQoXCIuc3RhdC1saXN0X19pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXJcIilcbiAgICAgICAgLnJlbW92ZUNsYXNzKFwiZGlzcGxheS1ub25lXCIpXG4gICAgICAgIC5hZGRDbGFzcyhcImRpc3BsYXktbm9uZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIi5yZXN1bHRzXCIpXG4gICAgICAgIC5maW5kKFwiLnN0YXQtbGlzdF9faXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyXCIpXG4gICAgICAgIC5hZGRDbGFzcyhcImRpc3BsYXktbm9uZVwiKTtcbiAgICAgICQodGhpcylcbiAgICAgICAgLnBhcmVudHMoXCIuc3RhdC1saXN0X19pdGVtXCIpXG4gICAgICAgIC5maW5kKFwiLnN0YXQtbGlzdF9faXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyXCIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImRpc3BsYXktbm9uZVwiKTtcbiAgICB9XG4gIH0pO1xufTtcblxudHJhdmVsQXBwLmV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICB0cmF2ZWxBcHAuZ2V0VXNlclB1cnBvc2UoKTtcbiAgdHJhdmVsQXBwLmdldFN0YXJ0ZWQoKTtcbiAgdHJhdmVsQXBwLmRpc3BsYXlTdGF0RGVzY3JpcHRpb24oKTtcbiAgVUkudHJhbnNmb3JtU1ZHKCk7XG4gIFVJLnNsaWRlQW5kRHJvcExpc3RlbmVyKCk7XG59O1xuXG50cmF2ZWxBcHAuaW5pdCA9ICgpID0+IHtcbiAgdHJhdmVsQXBwLmV2ZW50TGlzdGVuZXJzKCk7XG59O1xuXG4kKCgpID0+IHtcbiAgdHJhdmVsQXBwLmluaXQoKTtcbn0pOyIsImNvbnN0IENvbnN0YW50cyA9IHtcbiAgSU5RU3RhdHNfa2V5OiAnNWQzNjg3YzdjMTc4OGQ1ZicsXG4gIElOUVN0YXRzX3VybDogJ2h0dHA6Ly9pbnFzdGF0c2FwaS5pbnF1YnUuY29tJyxcbiAgUGl4YWJheV9rZXk6ICc5ODc5NTcxLWU0Y2JiZWYzZTY5MmFhMTVhMjRhNzExOWInLFxuICBQaXhhYmF5X3VybDogJ2h0dHBzOi8vd3d3LnBpeGFiYXkuY29tL2FwaS8nLFxuICBXaWtpcGVkaWFfdXJsOiAnaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3cvYXBpLnBocCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb25zdGFudHM7IiwiLy8gQVJSQVkgV0lUSCBBTEwgUkVMRVZBTlQgU1RBVFMgRk9SIEVBQ0ggUFVSUE9TRVxuXG5jb25zdCBNZXRhRGF0YSA9IFtcbiAgLy8gVkFDQVRJT04gQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PVxuICB7XG4gICAgaWQ6IFwiYnV0dG9uLXZhY2F0aW9uXCIsXG4gICAgc3RhdHM6IFtcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJkZW5zaXR5XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiUG9wdWxhdGlvbiBEZW5zaXR5IChsb3cpXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwb3B1bGF0aW9uIGRlbnNpdHkgaXMgbWVhc3VyZWQgaW4gcGVyIGttwrIuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGFwcGluZXNzX2luZGV4XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGFwcGluZXNzIEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQmFzZWQgb24gZmFjdG9ycyBzdWNoIGFzIEdEUCBwZXIgY2FwaXRhLCBzb2NpYWwgc3VwcG9ydCwgbGlmZSBleHBlY3RhbmN5LiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGhhcHBpZXIgdGhlIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidG91cmlzdF9hcnJpdmFsc1wiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlRvdXJpc3QgQXJyaXZhbHNcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJSZXByZXNlbnRzIGZvcmVpZ24gY2l0aXplbnMgdGhhdCBzdGF5ZWQgYXQgbGVhc3Qgb25lIG5pZ2h0LiBJbmNsdWRlcyBob3RlbCBzdGF5cywgdHJhbnNmZXJzLCBjb25mZXJlbmNlIHZpc2l0cywgZXRjLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcInRvdXJpc21fZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJUb3VyaXN0IEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhbW91bnQgb2YgZ292ZXJubWVudCBzcGVuZGluZyBkZWRpY2F0ZWQgZm9yIHRvdXJpc20gKGluICUgb2YgdGhlIEdEUCBmb3IgYSBjb3VudHJ5KS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJ1cmJhbl9wb3B1bGF0aW9uXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiVXJiYW4gUG9wdWxhdGlvbiAoaGlnaClcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHBlcmNlbnRhZ2Ugb2YgcGVvcGxlIHdobyBsaXZlIGluIGEgY2l0eS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJmb3Jlc3RfYXJlYV9wZXJjZW50XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiRm9yZXN0IEFyZWFcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHRvdGFsIGFtb3VudCBvZiBmb3Jlc3QgYXJlYSBpbiBhIGNvdW50cnkgKGluIGttwrIpXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIEVEVUNBVElPTiBCVVRUT05cbiAgLy8gPT09PT09PT09PT09PT09PVxuICB7XG4gICAgaWQ6IFwiYnV0dG9uLWVkdWNhdGlvblwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZWR1Y2F0aW9uX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiRWR1Y2F0aW9uIEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkVkdWNhdGlvbiBleHBlbmRpdHVyZSByZXByZXNlbnRzIGdvdmVybm1lbnQgc3BlbmRpbmcgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiY28yX2VtaXNzaW9uc1wiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkNPMiBFbWlzc2lvbnNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ08yIGVtaXNzaW9ucyBpbiBtZXRyaWMgdG9ucyBwZXIgcGVyc29uIHBlciB5ZWFyLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImNvcnJ1cHRpb25faW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJDb3JydXB0aW9uIEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvcnJ1cHRpb24gUGVyY2VwdGlvbnMgSW5kZXggKENQSSkuIChTY2FsZTogMC0xMDA7IDAgPSBoaWdoIGNvcnJ1cHRpb24uIDEwMCA9IGxvdyBjb3JydXB0aW9uKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoYXBwaW5lc3NfaW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIYXBwaW5lc3MgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJCYXNlZCBvbiBmYWN0b3JzIHN1Y2ggYXMgR0RQIHBlciBjYXBpdGEsIHNvY2lhbCBzdXBwb3J0LCBsaWZlIGV4cGVjdGFuY3kuIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgaGFwcGllciB0aGUgY291bnRyeS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZGlcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIdW1hbiBEZXZlbG9wbWVudCBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkluZGljYXRvciBvZiBsaWZlIGV4cGVjdGFuY3ksIGVkdWNhdGlvbiwgYW5kIHBlciBjYXBpdGEgaW5jb21lLiAoU2NhbGU6IDAtMTsgMCA9IGxvdyBzY29yZS4gMSA9IGhpZ2ggc2NvcmUpLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhlYWx0aF9leHBlbmRpdHVyZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkhlYWx0aCBFeHBlbmRpdHVyZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJQdWJsaWMgc3BlbmRpbmcgb24gaGVhbHRoLCBtZWFzdXJlZCBpbiAlIG9mIEdEUC5cIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgLy8gVklTSVRPUiBWSVNBIEJVVFRPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09XG4gIHtcbiAgICBpZDogXCJidXR0b24tdmlzaXQtdmlzYVwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGFwcGluZXNzX2luZGV4XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGFwcGluZXNzIEluZGV4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQmFzZWQgb24gZmFjdG9ycyBzdWNoIGFzIEdEUCBwZXIgY2FwaXRhLCBzb2NpYWwgc3VwcG9ydCwgbGlmZSBleHBlY3RhbmN5LiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGhhcHBpZXIgdGhlIGNvdW50cnkuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGVhbHRoX2V4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSGVhbHRoIEV4cGVuZGl0dXJlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlB1YmxpYyBzcGVuZGluZyBvbiBoZWFsdGgsIG1lYXN1cmVkIGluICUgb2YgR0RQLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcInRvdXJpc3RfYXJyaXZhbHNcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJUb3VyaXN0IEFycml2YWxzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiUmVwcmVzZW50cyBmb3JlaWduIGNpdGl6ZW5zIHRoYXQgc3RheWVkIGF0IGxlYXN0IG9uZSBuaWdodC4gSW5jbHVkZXMgaG90ZWwgc3RheXMsIHRyYW5zZmVycywgY29uZmVyZW5jZSB2aXNpdHMsIGV0Yy5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJkZW5zaXR5XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiUG9wdWxhdGlvbiBEZW5zaXR5IChsb3cpXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwb3B1bGF0aW9uIGRlbnNpdHkgaXMgbWVhc3VyZWQgaW4gcGVyIGttwrIuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiY28yX2VtaXNzaW9uc1wiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkNPMiBFbWlzc2lvbnNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ08yIGVtaXNzaW9ucyBpbiBtZXRyaWMgdG9ucyBwZXIgcGVyc29uIHBlciB5ZWFyLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImluZmxhdGlvblwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkluZmxhdGlvblwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgYW5udWFsIGNoYW5nZSBvZiBjb25zdW1lciBwcmljZXMgKHVuaXQ6ICUpLlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICAvLyBXT1JLSU5HIEhPTElEQVkgQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi13b3JrLWhvbGlkYXlcIixcbiAgICBzdGF0czogW1xuICAgICAge1xuICAgICAgICBzdGF0OiBcImRlbnNpdHlcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJQb3B1bGF0aW9uIERlbnNpdHkgKGxvdylcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHBvcHVsYXRpb24gZGVuc2l0eSBpcyBtZWFzdXJlZCBpbiBwZXIga23Csi5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJ0b3VyaXN0X2Fycml2YWxzXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiVG91cmlzdCBBcnJpdmFsc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIlJlcHJlc2VudHMgZm9yZWlnbiBjaXRpemVucyB0aGF0IHN0YXllZCBhdCBsZWFzdCBvbmUgbmlnaHQuIEluY2x1ZGVzIGhvdGVsIHN0YXlzLCB0cmFuc2ZlcnMsIGNvbmZlcmVuY2UgdmlzaXRzLCBldGMuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBcImJ1dHRvbi1wZXJtLXNvbG9cIixcbiAgICAgICAgc3RhdDogXCJnaW5pXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiR2luaSBDb2VmZmljaWVudFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIlN0YXRlcyBob3cgdW5pZm9ybWx5IGFzc2V0cyBhcmUgZGlzdHJpYnV0ZWQuIChzY2FsZTogMC0xMDA7IDAgPSBlcXVhbCBkaXN0cmlidXRpb24uIDEwMCA9IHVuZXF1YWwgZGlzdHJpYnV0aW9uKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoYXBwaW5lc3NfaW5kZXhcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIYXBwaW5lc3MgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJCYXNlZCBvbiBmYWN0b3JzIHN1Y2ggYXMgR0RQIHBlciBjYXBpdGEsIHNvY2lhbCBzdXBwb3J0LCBsaWZlIGV4cGVjdGFuY3kuIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgaGFwcGllciB0aGUgY291bnRyeS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJqb2JsZXNzX3JhdGVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJKb2JsZXNzIFJhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIG51bWJlciBvZiB1bmVtcGxveWVkIHBlb3BsZSBpbiByZWxhdGlvbiB0byB0aGUgbGFib3IgZm9yY2UgZm9yIGEgY291bnRyeS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJtZWRpYW53YWdlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiTWVkaWFuIFdhZ2VcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJBIG1lYXN1cmUgb2YgdGhlIG1vbnRobHkgbWVkaWFuIHdhZ2UgYmVmb3JlIHRheGVzLCBpbmNsdWRpbmcgcHVibGljIGJlbmVmaXRzIChlLmcgY2hpbGQgYWxsb3dhbmNlKTsgdW5pdDogVVNELlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICAvLyBQRVJNQU5FTlQtU09MTyBCVVRUT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuICB7XG4gICAgaWQ6IFwiYnV0dG9uLXBlcm0tc29sb1wiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGRpXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSHVtYW4gRGV2ZWxvcG1lbnQgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJJbmRpY2F0b3Igb2YgbGlmZSBleHBlY3RhbmN5LCBlZHVjYXRpb24sIGFuZCBwZXIgY2FwaXRhIGluY29tZS4gKFNjYWxlOiAwLTE7IDAgPSBsb3cgc2NvcmUuIDEgPSBoaWdoIHNjb3JlKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJjb3JydXB0aW9uX2luZGV4XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiQ29ycnVwdGlvbiBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDb3JydXB0aW9uIFBlcmNlcHRpb25zIEluZGV4IChDUEkpLiAoU2NhbGU6IDAtMTAwOyAwID0gaGlnaCBjb3JydXB0aW9uLiAxMDAgPSBsb3cgY29ycnVwdGlvbikuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibWVkaWFud2FnZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIk1lZGlhbiBXYWdlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQSBtZWFzdXJlIG9mIHRoZSBtb250aGx5IG1lZGlhbiB3YWdlIGJlZm9yZSB0YXhlcywgaW5jbHVkaW5nIHB1YmxpYyBiZW5lZml0cyAoZS5nIGNoaWxkIGFsbG93YW5jZSk7IHVuaXQ6IFVTRC5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJpbmZsYXRpb25cIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJJbmZsYXRpb25cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIGFubnVhbCBjaGFuZ2Ugb2YgY29uc3VtZXIgcHJpY2VzICh1bml0OiAlKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZWFsdGhfZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIZWFsdGggRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIHNwZW5kaW5nIG9uIGhlYWx0aCwgbWVhc3VyZWQgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwidXJiYW5fcG9wdWxhdGlvblwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIlVyYmFuIFBvcHVsYXRpb24gKGhpZ2gpXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBwZXJjZW50YWdlIG9mIHBlb3BsZSB3aG8gbGl2ZSBpbiBhIGNpdHkuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIC8vIFBFUk1BTkVOVC1DT1VQTEUgQlVUVE9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiBcImJ1dHRvbi1wZXJtLWNvdXBsZVwiLFxuICAgIHN0YXRzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiaGRpXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiSHVtYW4gRGV2ZWxvcG1lbnQgSW5kZXhcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJJbmRpY2F0b3Igb2YgbGlmZSBleHBlY3RhbmN5LCBlZHVjYXRpb24sIGFuZCBwZXIgY2FwaXRhIGluY29tZS4gKFNjYWxlOiAwLTE7IDAgPSBsb3cgc2NvcmUuIDEgPSBoaWdoIHNjb3JlKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJqb2JsZXNzX3JhdGVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJKb2JsZXNzIFJhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIG51bWJlciBvZiB1bmVtcGxveWVkIHBlb3BsZSBpbiByZWxhdGlvbiB0byB0aGUgbGFib3IgZm9yY2UgZm9yIGEgY291bnRyeS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IFwiYnV0dG9uLXBlcm0tc29sb1wiLFxuICAgICAgICBzdGF0OiBcImdpbmlcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJHaW5pIENvZWZmaWNpZW50XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiU3RhdGVzIGhvdyB1bmlmb3JtbHkgYXNzZXRzIGFyZSBkaXN0cmlidXRlZC4gKHNjYWxlOiAwLTEwMDsgMCA9IGVxdWFsIGRpc3RyaWJ1dGlvbi4gMTAwID0gdW5lcXVhbCBkaXN0cmlidXRpb24pLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImhhcHBpbmVzc19pbmRleFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkhhcHBpbmVzcyBJbmRleFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkJhc2VkIG9uIGZhY3RvcnMgc3VjaCBhcyBHRFAgcGVyIGNhcGl0YSwgc29jaWFsIHN1cHBvcnQsIGxpZmUgZXhwZWN0YW5jeS4gVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoYXBwaWVyIHRoZSBjb3VudHJ5LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcImRlYXRoX3JhdGVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1pblwiLFxuICAgICAgICBzdGF0TmFtZTogXCJSYXRlIG9mIERlYXRoc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgYXZlcmFnZSBudW1iZXIgb2YgZGVhdGhzIHBlciB5ZWFyIHBlciAxLDAwMCBwZW9wbGUuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwiZGVidHNfcGVyY2VudFwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWluXCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkdvdmVybm1lbnQgRGVidFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgcGVyY2VudGFnZSBvZiBnb3Zlcm5tZW50IGJvcnJvd2luZ3MgaW4gcmVsYXRpb24gdG8gdGhlIEdEUC5cIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgLy8gUEVSTUFORU5ULUZBTUlMWSBCVVRUT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuICB7XG4gICAgaWQ6IFwiYnV0dG9uLXBlcm0tZmFtaWx5XCIsXG4gICAgc3RhdHM6IFtcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJlZHVjYXRpb25fZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJFZHVjYXRpb24gRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRWR1Y2F0aW9uIGV4cGVuZGl0dXJlIHJlcHJlc2VudHMgZ292ZXJubWVudCBzcGVuZGluZyBpbiAlIG9mIEdEUC5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJoZWFsdGhfZXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJIZWFsdGggRXhwZW5kaXR1cmVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIHNwZW5kaW5nIG9uIGhlYWx0aCwgbWVhc3VyZWQgaW4gJSBvZiBHRFAuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibGl0ZXJhY3lfcmF0ZVwiLFxuICAgICAgICBkaXJlY3Rpb246IFwibWF4XCIsXG4gICAgICAgIHN0YXROYW1lOiBcIkxpdGVyYWN5IFJhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHBlcmNlbnRhZ2Ugb2YgcGVvcGxlIHRoYXQgaGF2ZSB0aGUgYWJpbGl0eSB0byByZWFkIGFuZCB3cml0ZSBieSBhZ2UgMTUuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXQ6IFwibGlmZV9leHBlY3RhbmN5XCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtYXhcIixcbiAgICAgICAgc3RhdE5hbWU6IFwiTGlmZSBFeHBlY3RhbmN5XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBhdmVyYWdlIG51bWJlciBvZiB5ZWFycyBhIHBlcnNvbiB3aWxsIGxpdmUgKGF0IGJpcnRoKS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhdDogXCJkZWF0aF9yYXRlXCIsXG4gICAgICAgIGRpcmVjdGlvbjogXCJtaW5cIixcbiAgICAgICAgc3RhdE5hbWU6IFwiUmF0ZSBvZiBEZWF0aHNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIGF2ZXJhZ2UgbnVtYmVyIG9mIGRlYXRocyBwZXIgeWVhciBwZXIgMSwwMDAgcGVvcGxlLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGF0OiBcIm1lZGlhbndhZ2VcIixcbiAgICAgICAgZGlyZWN0aW9uOiBcIm1heFwiLFxuICAgICAgICBzdGF0TmFtZTogXCJNZWRpYW4gV2FnZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkEgbWVhc3VyZSBvZiB0aGUgbW9udGhseSBtZWRpYW4gd2FnZSBiZWZvcmUgdGF4ZXMsIGluY2x1ZGluZyBwdWJsaWMgYmVuZWZpdHMgKGUuZyBjaGlsZCBhbGxvd2FuY2UpOyB1bml0OiBVU0QuXCJcbiAgICAgIH1cbiAgICBdXG4gIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IE1ldGFEYXRhOyIsImNvbnN0IFVJID0ge1xuICBzbGlkZUFuZERyb3BMaXN0ZW5lcjogKCkgPT4ge1xuICAgICQoXCIuY2hvaWNlc1wiKVxuICAgICAgLnNvcnRhYmxlKHtcbiAgICAgICAgY29ubmVjdFdpdGg6IFwiLnNvcnRhYmxlXCIsXG4gICAgICAgIHNjcm9sbDogZmFsc2UsXG4gICAgICAgIHJldmVydDogdHJ1ZSxcbiAgICAgICAgaGVscGVyOiBcImNsb25lXCIsXG4gICAgICAgIGNvbnRhaW5tZW50OiBcIi5jcml0ZXJpYXMtY29udGFpbmVyXCJcbiAgICAgIH0pXG4gICAgICAuY3NzKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKTtcbiAgICAkKFwidWwsIGxpXCIpLmRpc2FibGVTZWxlY3Rpb24oKTtcbiAgfSxcbiAgbG9hZGVyOiBgPHN2ZyBjbGFzcz1cImxkcy1zcGlubmVyIGxvYWRlclwiIHdpZHRoPVwiMTAwcHhcIiAgaGVpZ2h0PVwiMTAwcHhcIiAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZFwiIHN0eWxlPVwiYmFja2dyb3VuZDogbm9uZTtcIj48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoMCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNmZDkzNDFcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjkxNjY2NjY2NjY2NjY2NjZzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDMwIDUwIDUwKVwiPlxuICA8cmVjdCB4PVwiNDdcIiB5PVwiMjRcIiByeD1cIjkuNFwiIHJ5PVwiNC44XCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMTJcIiBmaWxsPVwiI2ZkOTM0MVwiPlxuICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJvcGFjaXR5XCIgdmFsdWVzPVwiMTswXCIga2V5VGltZXM9XCIwOzFcIiBkdXI9XCIxc1wiIGJlZ2luPVwiLTAuODMzMzMzMzMzMzMzMzMzNHNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoNjAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC43NXNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoOTAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC42NjY2NjY2NjY2NjY2NjY2c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgxMjAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC41ODMzMzMzMzMzMzMzMzM0c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgxNTAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC41c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC40MTY2NjY2NjY2NjY2NjY3c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgyMTAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC4zMzMzMzMzMzMzMzMzMzMzc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgyNDAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCItMC4yNXNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+XG4gIDwvcmVjdD5cbjwvZz48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoMjcwIDUwIDUwKVwiPlxuICA8cmVjdCB4PVwiNDdcIiB5PVwiMjRcIiByeD1cIjkuNFwiIHJ5PVwiNC44XCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMTJcIiBmaWxsPVwiI2ZkOTM0MVwiPlxuICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJvcGFjaXR5XCIgdmFsdWVzPVwiMTswXCIga2V5VGltZXM9XCIwOzFcIiBkdXI9XCIxc1wiIGJlZ2luPVwiLTAuMTY2NjY2NjY2NjY2NjY2NjZzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPlxuICA8L3JlY3Q+XG48L2c+PGcgdHJhbnNmb3JtPVwicm90YXRlKDMwMCA1MCA1MClcIj5cbiAgPHJlY3QgeD1cIjQ3XCIgeT1cIjI0XCIgcng9XCI5LjRcIiByeT1cIjQuOFwiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiNmZDkzNDFcIj5cbiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwib3BhY2l0eVwiIHZhbHVlcz1cIjE7MFwiIGtleVRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBiZWdpbj1cIi0wLjA4MzMzMzMzMzMzMzMzMzMzc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSgzMzAgNTAgNTApXCI+XG4gIDxyZWN0IHg9XCI0N1wiIHk9XCIyNFwiIHJ4PVwiOS40XCIgcnk9XCI0LjhcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIxMlwiIGZpbGw9XCIjZmQ5MzQxXCI+XG4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cIm9wYWNpdHlcIiB2YWx1ZXM9XCIxOzBcIiBrZXlUaW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgYmVnaW49XCIwc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT5cbiAgPC9yZWN0PlxuPC9nPjwvc3ZnPmAsXG4gIHRyYW5zZm9ybVNWRzogKCkgPT4ge1xuICAgIC8vIEV2ZW50IGxpc3RlbmVyIHRvIHRyYW5zZm9ybSBTVkdzIGludG8gaW5saW5lIFNWR1MgdG8gYmUgYWJsZSB0byBjaGFuZ2UgdGhlaXIgY29sb3JzIHdpdGggY3NzIGZpbGxcbiAgICAkKFwiaW1nLnN2Z1wiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCAkaW1nID0galF1ZXJ5KHRoaXMpO1xuICAgICAgY29uc3QgaW1nSUQgPSAkaW1nLmF0dHIoXCJpZFwiKTtcbiAgICAgIGNvbnN0IGltZ0NsYXNzID0gJGltZy5hdHRyKFwiY2xhc3NcIik7XG4gICAgICBjb25zdCBpbWdVUkwgPSAkaW1nLmF0dHIoXCJzcmNcIik7XG5cbiAgICAgICQuZ2V0KFxuICAgICAgICBpbWdVUkwsXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgLy8gR2V0IHRoZSBTVkcgdGFnLCBpZ25vcmUgdGhlIHJlc3RcbiAgICAgICAgICBsZXQgJHN2ZyA9IGpRdWVyeShkYXRhKS5maW5kKFwic3ZnXCIpO1xuXG4gICAgICAgICAgLy8gQWRkIHJlcGxhY2VkIGltYWdlJ3MgSUQgdG8gdGhlIG5ldyBTVkdcbiAgICAgICAgICBpZiAodHlwZW9mIGltZ0lEICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKFwiaWRcIiwgaW1nSUQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBBZGQgcmVwbGFjZWQgaW1hZ2UncyBjbGFzc2VzIHRvIHRoZSBuZXcgU1ZHXG4gICAgICAgICAgaWYgKHR5cGVvZiBpbWdDbGFzcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cihcImNsYXNzXCIsIGltZ0NsYXNzICsgXCIgcmVwbGFjZWQtc3ZnXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFJlbW92ZSBhbnkgaW52YWxpZCBYTUwgdGFncyBhcyBwZXIgaHR0cDovL3ZhbGlkYXRvci53My5vcmdcbiAgICAgICAgICAkc3ZnID0gJHN2Zy5yZW1vdmVBdHRyKFwieG1sbnM6YVwiKTtcblxuICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB2aWV3cG9ydCBpcyBzZXQsIGlmIHRoZSB2aWV3cG9ydCBpcyBub3Qgc2V0IHRoZSBTVkcgd29udCd0IHNjYWxlLlxuICAgICAgICAgIGlmICghJHN2Zy5hdHRyKFwidmlld0JveFwiKSAmJiAkc3ZnLmF0dHIoXCJoZWlnaHRcIikgJiYgJHN2Zy5hdHRyKFwid2lkdGhcIikpIHtcbiAgICAgICAgICAgICRzdmcuYXR0cihcInZpZXdCb3hcIiwgXCIwIDAgXCIgKyAkc3ZnLmF0dHIoXCJoZWlnaHRcIikgKyBcIiBcIiArICRzdmcuYXR0cihcIndpZHRoXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBSZXBsYWNlIGltYWdlIHdpdGggbmV3IFNWR1xuICAgICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XG4gICAgICAgIH0sXG4gICAgICAgIFwieG1sXCJcbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSTsiLCJjb25zdCBVSSA9IHtcbiAgbnVtYmVyV2l0aENvbW1hczogKG51bWJlcikgPT4gbnVtYmVyLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpLFxuICByYW5kb21pemU6IChzdGFydGluZ051bWJlciwgZW5kaW5nTnVtYmVyKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoZW5kaW5nTnVtYmVyIC0gc3RhcnRpbmdOdW1iZXIpKSArIHN0YXJ0aW5nTnVtYmVyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiLyoqXG4gKiBGYXN0UHJpb3JpdHlRdWV1ZS5qcyA6IGEgZmFzdCBoZWFwLWJhc2VkIHByaW9yaXR5IHF1ZXVlICBpbiBKYXZhU2NyaXB0LlxuICogKGMpIHRoZSBhdXRob3JzXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLlxuICpcbiAqIFNwZWVkLW9wdGltaXplZCBoZWFwLWJhc2VkIHByaW9yaXR5IHF1ZXVlIGZvciBtb2Rlcm4gYnJvd3NlcnMgYW5kIEphdmFTY3JpcHQgZW5naW5lcy5cbiAqXG4gKiBVc2FnZSA6XG4gICAgICAgICBJbnN0YWxsYXRpb24gKGluIHNoZWxsLCBpZiB5b3UgdXNlIG5vZGUpOlxuICAgICAgICAgJCBucG0gaW5zdGFsbCBmYXN0cHJpb3JpdHlxdWV1ZVxuXG4gICAgICAgICBSdW5uaW5nIHRlc3QgcHJvZ3JhbSAoaW4gSmF2YVNjcmlwdCk6XG5cbiAgICAgICAgIC8vIHZhciBGYXN0UHJpb3JpdHlRdWV1ZSA9IHJlcXVpcmUoXCJmYXN0cHJpb3JpdHlxdWV1ZVwiKTsvLyBpbiBub2RlXG4gICAgICAgICB2YXIgeCA9IG5ldyBGYXN0UHJpb3JpdHlRdWV1ZSgpO1xuICAgICAgICAgeC5hZGQoMSk7XG4gICAgICAgICB4LmFkZCgwKTtcbiAgICAgICAgIHguYWRkKDUpO1xuICAgICAgICAgeC5hZGQoNCk7XG4gICAgICAgICB4LmFkZCgzKTtcbiAgICAgICAgIHgucGVlaygpOyAvLyBzaG91bGQgcmV0dXJuIDAsIGxlYXZlcyB4IHVuY2hhbmdlZFxuICAgICAgICAgeC5zaXplOyAvLyBzaG91bGQgcmV0dXJuIDUsIGxlYXZlcyB4IHVuY2hhbmdlZFxuICAgICAgICAgd2hpbGUoIXguaXNFbXB0eSgpKSB7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKHgucG9sbCgpKTtcbiAgICAgICAgIH0gLy8gd2lsbCBwcmludCAwIDEgMyA0IDVcbiAgICAgICAgIHgudHJpbSgpOyAvLyAob3B0aW9uYWwpIG9wdGltaXplcyBtZW1vcnkgdXNhZ2VcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdGNvbXBhcmF0b3IgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhIDwgYjtcbn07XG5cbi8vIHRoZSBwcm92aWRlZCBjb21wYXJhdG9yIGZ1bmN0aW9uIHNob3VsZCB0YWtlIGEsIGIgYW5kIHJldHVybiAqdHJ1ZSogd2hlbiBhIDwgYlxuZnVuY3Rpb24gRmFzdFByaW9yaXR5UXVldWUoY29tcGFyYXRvcikge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRmFzdFByaW9yaXR5UXVldWUpKSByZXR1cm4gbmV3IEZhc3RQcmlvcml0eVF1ZXVlKGNvbXBhcmF0b3IpO1xuICB0aGlzLmFycmF5ID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG4gIHRoaXMuY29tcGFyZSA9IGNvbXBhcmF0b3IgfHwgZGVmYXVsdGNvbXBhcmF0b3I7XG59XG5cbi8vIGNvcHkgdGhlIHByaW9yaXR5IHF1ZXVlIGludG8gYW5vdGhlciwgYW5kIHJldHVybiBpdC4gUXVldWUgaXRlbXMgYXJlIHNoYWxsb3ctY29waWVkLlxuLy8gUnVucyBpbiBgTyhuKWAgdGltZS5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZnBxID0gbmV3IEZhc3RQcmlvcml0eVF1ZXVlKHRoaXMuY29tcGFyZSk7XG4gIGZwcS5zaXplID0gdGhpcy5zaXplO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgaSsrKSB7XG4gICAgZnBxLmFycmF5LnB1c2godGhpcy5hcnJheVtpXSk7XG4gIH1cbiAgcmV0dXJuIGZwcTtcbn07XG5cbi8vIEFkZCBhbiBlbGVtZW50IGludG8gdGhlIHF1ZXVlXG4vLyBydW5zIGluIE8obG9nIG4pIHRpbWVcbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihteXZhbCkge1xuICB2YXIgaSA9IHRoaXMuc2l6ZTtcbiAgdGhpcy5hcnJheVt0aGlzLnNpemVdID0gbXl2YWw7XG4gIHRoaXMuc2l6ZSArPSAxO1xuICB2YXIgcDtcbiAgdmFyIGFwO1xuICB3aGlsZSAoaSA+IDApIHtcbiAgICBwID0gKGkgLSAxKSA+PiAxO1xuICAgIGFwID0gdGhpcy5hcnJheVtwXTtcbiAgICBpZiAoIXRoaXMuY29tcGFyZShteXZhbCwgYXApKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5hcnJheVtpXSA9IGFwO1xuICAgIGkgPSBwO1xuICB9XG4gIHRoaXMuYXJyYXlbaV0gPSBteXZhbDtcbn07XG5cbi8vIHJlcGxhY2UgdGhlIGNvbnRlbnQgb2YgdGhlIGhlYXAgYnkgcHJvdmlkZWQgYXJyYXkgYW5kIFwiaGVhcGlmeSBpdFwiXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuaGVhcGlmeSA9IGZ1bmN0aW9uKGFycikge1xuICB0aGlzLmFycmF5ID0gYXJyO1xuICB0aGlzLnNpemUgPSBhcnIubGVuZ3RoO1xuICB2YXIgaTtcbiAgZm9yIChpID0gdGhpcy5zaXplID4+IDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdGhpcy5fcGVyY29sYXRlRG93bihpKTtcbiAgfVxufTtcblxuLy8gZm9yIGludGVybmFsIHVzZVxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLl9wZXJjb2xhdGVVcCA9IGZ1bmN0aW9uKGksIGZvcmNlKSB7XG4gIHZhciBteXZhbCA9IHRoaXMuYXJyYXlbaV07XG4gIHZhciBwO1xuICB2YXIgYXA7XG4gIHdoaWxlIChpID4gMCkge1xuICAgIHAgPSAoaSAtIDEpID4+IDE7XG4gICAgYXAgPSB0aGlzLmFycmF5W3BdO1xuICAgIC8vIGZvcmNlIHdpbGwgc2tpcCB0aGUgY29tcGFyZVxuICAgIGlmICghZm9yY2UgJiYgIXRoaXMuY29tcGFyZShteXZhbCwgYXApKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5hcnJheVtpXSA9IGFwO1xuICAgIGkgPSBwO1xuICB9XG4gIHRoaXMuYXJyYXlbaV0gPSBteXZhbDtcbn07XG5cbi8vIGZvciBpbnRlcm5hbCB1c2VcbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5fcGVyY29sYXRlRG93biA9IGZ1bmN0aW9uKGkpIHtcbiAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gIHZhciBoc2l6ZSA9IHRoaXMuc2l6ZSA+Pj4gMTtcbiAgdmFyIGFpID0gdGhpcy5hcnJheVtpXTtcbiAgdmFyIGw7XG4gIHZhciByO1xuICB2YXIgYmVzdGM7XG4gIHdoaWxlIChpIDwgaHNpemUpIHtcbiAgICBsID0gKGkgPDwgMSkgKyAxO1xuICAgIHIgPSBsICsgMTtcbiAgICBiZXN0YyA9IHRoaXMuYXJyYXlbbF07XG4gICAgaWYgKHIgPCBzaXplKSB7XG4gICAgICBpZiAodGhpcy5jb21wYXJlKHRoaXMuYXJyYXlbcl0sIGJlc3RjKSkge1xuICAgICAgICBsID0gcjtcbiAgICAgICAgYmVzdGMgPSB0aGlzLmFycmF5W3JdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuY29tcGFyZShiZXN0YywgYWkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5hcnJheVtpXSA9IGJlc3RjO1xuICAgIGkgPSBsO1xuICB9XG4gIHRoaXMuYXJyYXlbaV0gPSBhaTtcbn07XG5cbi8vIGludGVybmFsXG4vLyBfcmVtb3ZlQXQoaW5kZXgpIHdpbGwgcmVtb3ZlIHRoZSBpdGVtIGF0IHRoZSBnaXZlbiBpbmRleCBmcm9tIHRoZSBxdWV1ZSxcbi8vIHJldGFpbmluZyBiYWxhbmNlLiByZXR1cm5zIHRoZSByZW1vdmVkIGl0ZW0sIG9yIHVuZGVmaW5lZCBpZiBub3RoaW5nIGlzIHJlbW92ZWQuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuX3JlbW92ZUF0ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgaWYgKGluZGV4ID4gdGhpcy5zaXplIC0gMSB8fCBpbmRleCA8IDApIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgLy8gaW1wbDE6XG4gIC8vdGhpcy5hcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAvL3RoaXMuaGVhcGlmeSh0aGlzLmFycmF5KTtcbiAgLy8gaW1wbDI6XG4gIHRoaXMuX3BlcmNvbGF0ZVVwKGluZGV4LCB0cnVlKTtcbiAgcmV0dXJuIHRoaXMucG9sbCgpO1xufTtcblxuLy8gcmVtb3ZlKG15dmFsKSB3aWxsIHJlbW92ZSBhbiBpdGVtIG1hdGNoaW5nIHRoZSBwcm92aWRlZCB2YWx1ZSBmcm9tIHRoZVxuLy8gcXVldWUsIGNoZWNrZWQgZm9yIGVxdWFsaXR5IGJ5IHVzaW5nIHRoZSBxdWV1ZSdzIGNvbXBhcmF0b3IuXG4vLyByZXR1cm4gdHJ1ZSBpZiByZW1vdmVkLCBmYWxzZSBvdGhlcndpc2UuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24obXl2YWwpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkrKykge1xuICAgIGlmICghdGhpcy5jb21wYXJlKHRoaXMuYXJyYXlbaV0sIG15dmFsKSAmJiAhdGhpcy5jb21wYXJlKG15dmFsLCB0aGlzLmFycmF5W2ldKSkge1xuICAgICAgLy8gaXRlbXMgbWF0Y2gsIGNvbXBhcmF0b3IgcmV0dXJucyBmYWxzZSBib3RoIHdheXMsIHJlbW92ZSBpdGVtXG4gICAgICB0aGlzLl9yZW1vdmVBdChpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBpbnRlcm5hbFxuLy8gcmVtb3ZlcyBhbmQgcmV0dXJucyBpdGVtcyBmb3Igd2hpY2ggdGhlIGNhbGxiYWNrIHJldHVybnMgdHJ1ZS5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5fYmF0Y2hSZW1vdmUgPSBmdW5jdGlvbihjYWxsYmFjaywgbGltaXQpIHtcbiAgLy8gaW5pdGlhbGl6ZSByZXR1cm4gYXJyYXkgd2l0aCBtYXggc2l6ZSBvZiB0aGUgbGltaXQgb3IgY3VycmVudCBxdWV1ZSBzaXplXG4gIHZhciByZXRBcnIgPSBuZXcgQXJyYXkobGltaXQgPyBsaW1pdCA6IHRoaXMuc2l6ZSk7XG4gIHZhciBjb3VudCA9IDA7XG5cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLnNpemUpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCB0aGlzLnNpemUgJiYgY291bnQgPCByZXRBcnIubGVuZ3RoKSB7XG4gICAgICBpZiAoY2FsbGJhY2sodGhpcy5hcnJheVtpXSkpIHtcbiAgICAgICAgcmV0QXJyW2NvdW50XSA9IHRoaXMuX3JlbW92ZUF0KGkpO1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICAvLyBtb3ZlIHVwIGEgbGV2ZWwgaW4gdGhlIGhlYXAgaWYgd2UgcmVtb3ZlIGFuIGl0ZW1cbiAgICAgICAgaSA9IGkgPj4gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9IFxuICB9XG4gIHJldEFyci5sZW5ndGggPSBjb3VudDtcbiAgcmV0dXJuIHJldEFycjtcbn1cblxuLy8gcmVtb3ZlT25lKGNhbGxiYWNrKSB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0gb2YgdGhlIHF1ZXVlXG4vLyBhbmQgd2lsbCByZW1vdmUgdGhlIGZpcnN0IGl0ZW0gZm9yIHdoaWNoIHRoZSBjYWxsYmFjayB3aWxsIHJldHVybiB0cnVlLlxuLy8gcmV0dXJuIHRoZSByZW1vdmVkIGl0ZW0sIG9yIHVuZGVmaW5lZCBpZiBub3RoaW5nIGlzIHJlbW92ZWQuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucmVtb3ZlT25lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIGFyciA9IHRoaXMuX2JhdGNoUmVtb3ZlKGNhbGxiYWNrLCAxKTtcbiAgcmV0dXJuIGFyci5sZW5ndGggPiAwID8gYXJyWzBdIDogdW5kZWZpbmVkO1xufTtcblxuLy8gcmVtb3ZlKGNhbGxiYWNrWywgbGltaXRdKSB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0gb2Zcbi8vIHRoZSBxdWV1ZSBhbmQgd2lsbCByZW1vdmUgZWFjaCBpdGVtIGZvciB3aGljaCB0aGUgY2FsbGJhY2sgcmV0dXJucyB0cnVlLCB1cCB0b1xuLy8gYSBtYXggbGltaXQgb2YgcmVtb3ZlZCBpdGVtcyBpZiBzcGVjaWZpZWQgb3Igbm8gbGltaXQgaWYgdW5zcGVjaWZpZWQuXG4vLyByZXR1cm4gYW4gYXJyYXkgY29udGFpbmluZyB0aGUgcmVtb3ZlZCBpdGVtcy5cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5yZW1vdmVNYW55ID0gZnVuY3Rpb24oY2FsbGJhY2ssIGxpbWl0KSB7XG4gIHJldHVybiB0aGlzLl9iYXRjaFJlbW92ZShjYWxsYmFjaywgbGltaXQpO1xufTtcblxuLy8gTG9vayBhdCB0aGUgdG9wIG9mIHRoZSBxdWV1ZSAob25lIG9mIHRoZSBzbWFsbGVzdCBlbGVtZW50cykgd2l0aG91dCByZW1vdmluZyBpdFxuLy8gZXhlY3V0ZXMgaW4gY29uc3RhbnQgdGltZVxuLy9cbi8vIENhbGxpbmcgcGVlayBvbiBhbiBlbXB0eSBwcmlvcml0eSBxdWV1ZSByZXR1cm5zXG4vLyB0aGUgXCJ1bmRlZmluZWRcIiB2YWx1ZS5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL3VuZGVmaW5lZFxuLy9cbkZhc3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnNpemUgPT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgcmV0dXJuIHRoaXMuYXJyYXlbMF07XG59O1xuXG4vLyByZW1vdmUgdGhlIGVsZW1lbnQgb24gdG9wIG9mIHRoZSBoZWFwIChvbmUgb2YgdGhlIHNtYWxsZXN0IGVsZW1lbnRzKVxuLy8gcnVucyBpbiBsb2dhcml0aG1pYyB0aW1lXG4vL1xuLy8gSWYgdGhlIHByaW9yaXR5IHF1ZXVlIGlzIGVtcHR5LCB0aGUgZnVuY3Rpb24gcmV0dXJucyB0aGVcbi8vIFwidW5kZWZpbmVkXCIgdmFsdWUuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy91bmRlZmluZWRcbi8vXG4vLyBGb3IgbG9uZy1ydW5uaW5nIGFuZCBsYXJnZSBwcmlvcml0eSBxdWV1ZXMsIG9yIHByaW9yaXR5IHF1ZXVlc1xuLy8gc3RvcmluZyBsYXJnZSBvYmplY3RzLCB5b3UgbWF5ICB3YW50IHRvIGNhbGwgdGhlIHRyaW0gZnVuY3Rpb25cbi8vIGF0IHN0cmF0ZWdpYyB0aW1lcyB0byByZWNvdmVyIGFsbG9jYXRlZCBtZW1vcnkuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zaXplID09IDApIHJldHVybiB1bmRlZmluZWQ7XG4gIHZhciBhbnMgPSB0aGlzLmFycmF5WzBdO1xuICBpZiAodGhpcy5zaXplID4gMSkge1xuICAgIHRoaXMuYXJyYXlbMF0gPSB0aGlzLmFycmF5Wy0tdGhpcy5zaXplXTtcbiAgICB0aGlzLl9wZXJjb2xhdGVEb3duKDApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc2l6ZSAtPSAxO1xuICB9XG4gIHJldHVybiBhbnM7XG59O1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGFkZHMgdGhlIHByb3ZpZGVkIHZhbHVlIHRvIHRoZSBoZWFwLCB3aGlsZSByZW1vdmluZ1xuLy8gYW5kIHJldHVybmluZyBvbmUgb2YgdGhlIHNtYWxsZXN0IGVsZW1lbnRzIChsaWtlIHBvbGwpLiBUaGUgc2l6ZSBvZiB0aGUgcXVldWVcbi8vIHRodXMgcmVtYWlucyB1bmNoYW5nZWQuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucmVwbGFjZVRvcCA9IGZ1bmN0aW9uKG15dmFsKSB7XG4gIGlmICh0aGlzLnNpemUgPT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdmFyIGFucyA9IHRoaXMuYXJyYXlbMF07XG4gIHRoaXMuYXJyYXlbMF0gPSBteXZhbDtcbiAgdGhpcy5fcGVyY29sYXRlRG93bigwKTtcbiAgcmV0dXJuIGFucztcbn07XG5cbi8vIHJlY292ZXIgdW51c2VkIG1lbW9yeSAoZm9yIGxvbmctcnVubmluZyBwcmlvcml0eSBxdWV1ZXMpXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFycmF5ID0gdGhpcy5hcnJheS5zbGljZSgwLCB0aGlzLnNpemUpO1xufTtcblxuLy8gQ2hlY2sgd2hldGhlciB0aGUgaGVhcCBpcyBlbXB0eVxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gMDtcbn07XG5cbi8vIGl0ZXJhdGUgb3ZlciB0aGUgaXRlbXMgaW4gb3JkZXIsIHBhc3MgYSBjYWxsYmFjayB0aGF0IHJlY2VpdmVzIChpdGVtLCBpbmRleCkgYXMgYXJncy5cbi8vIFRPRE8gb25jZSB3ZSB0cmFuc3BpbGUsIHVuY29tbWVudFxuLy8gaWYgKFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3IpIHtcbi8vICAgRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiooKSB7XG4vLyAgICAgaWYgKHRoaXMuaXNFbXB0eSgpKSByZXR1cm47XG4vLyAgICAgdmFyIGZwcSA9IHRoaXMuY2xvbmUoKTtcbi8vICAgICB3aGlsZSAoIWZwcS5pc0VtcHR5KCkpIHtcbi8vICAgICAgIHlpZWxkIGZwcS5wb2xsKCk7XG4vLyAgICAgfVxuLy8gICB9O1xuLy8gfVxuRmFzdFByaW9yaXR5UXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBpZiAodGhpcy5pc0VtcHR5KCkgfHwgdHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHJldHVybjtcbiAgdmFyIGkgPSAwO1xuICB2YXIgZnBxID0gdGhpcy5jbG9uZSgpO1xuICB3aGlsZSAoIWZwcS5pc0VtcHR5KCkpIHtcbiAgICBjYWxsYmFjayhmcHEucG9sbCgpLCBpKyspO1xuICB9XG59O1xuXG4vLyByZXR1cm4gdGhlIGsgJ3NtYWxsZXN0JyBlbGVtZW50cyBvZiB0aGUgcXVldWVcbi8vIHJ1bnMgaW4gTyhrIGxvZyBrKSB0aW1lXG4vLyB0aGlzIGlzIHRoZSBlcXVpdmFsZW50IG9mIHJlcGVhdGVkbHkgY2FsbGluZyBwb2xsLCBidXRcbi8vIGl0IGhhcyBhIGJldHRlciBjb21wdXRhdGlvbmFsIGNvbXBsZXhpdHksIHdoaWNoIGNhbiBiZVxuLy8gaW1wb3J0YW50IGZvciBsYXJnZSBkYXRhIHNldHMuXG5GYXN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUua1NtYWxsZXN0ID0gZnVuY3Rpb24oaykge1xuICBpZiAodGhpcy5zaXplID09IDApIHJldHVybiBbXTtcbiAgdmFyIGNvbXBhcmF0b3IgPSB0aGlzLmNvbXBhcmU7XG4gIHZhciBhcnIgPSB0aGlzLmFycmF5XG4gIHZhciBmcHEgPSBuZXcgRmFzdFByaW9yaXR5UXVldWUoZnVuY3Rpb24oYSxiKXtcbiAgIHJldHVybiBjb21wYXJhdG9yKGFyclthXSxhcnJbYl0pO1xuICB9KTtcbiAgayA9IE1hdGgubWluKHRoaXMuc2l6ZSwgayk7XG4gIHZhciBzbWFsbGVzdCA9IG5ldyBBcnJheShrKTtcbiAgdmFyIGogPSAwO1xuICBmcHEuYWRkKDApO1xuICB3aGlsZSAoaiA8IGspIHtcbiAgICB2YXIgc21hbGwgPSBmcHEucG9sbCgpO1xuICAgIHNtYWxsZXN0W2orK10gPSB0aGlzLmFycmF5W3NtYWxsXTtcbiAgICB2YXIgbCA9IChzbWFsbCA8PCAxKSArIDE7XG4gICAgdmFyIHIgPSBsICsgMTtcbiAgICBpZiAobCA8IHRoaXMuc2l6ZSkgZnBxLmFkZChsKTtcbiAgICBpZiAociA8IHRoaXMuc2l6ZSkgZnBxLmFkZChyKTtcbiAgfVxuICByZXR1cm4gc21hbGxlc3Q7XG59XG5cbi8vIGp1c3QgZm9yIGlsbHVzdHJhdGlvbiBwdXJwb3Nlc1xudmFyIG1haW4gPSBmdW5jdGlvbigpIHtcbiAgLy8gbWFpbiBjb2RlXG4gIHZhciB4ID0gbmV3IEZhc3RQcmlvcml0eVF1ZXVlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYSA8IGI7XG4gIH0pO1xuICB4LmFkZCgxKTtcbiAgeC5hZGQoMCk7XG4gIHguYWRkKDUpO1xuICB4LmFkZCg0KTtcbiAgeC5hZGQoMyk7XG4gIHdoaWxlICgheC5pc0VtcHR5KCkpIHtcbiAgICBjb25zb2xlLmxvZyh4LnBvbGwoKSk7XG4gIH1cbn07XG5cbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICBtYWluKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmFzdFByaW9yaXR5UXVldWU7XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXX0=
