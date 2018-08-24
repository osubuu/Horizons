// IMPORT HEAP MODULE FROM NPM
const MinHeap = require("fastpriorityqueue");

// Create an object representing our travel app (NAMESPACE)
const travelApp = {};
travelApp.userStat = "";

// ARRAY WITH ALL RELEVANT STATS FOR EACH PURPOSE
travelApp.statArray = [
  // VACATION BUTTON
  // ===============
  {
    id: "button-vacation",
    stats: [
      {
        stat: "density",
        direction: "min",
        statName: "Population Density (low)",
        description: "The population density is measured in per km²."
      },
      {
        stat: "happiness_index",
        direction: "max",
        statName: "Happiness Index",
        description:
          "The Happiness Index is based on factors such as GDP per capita, social support, healthy life expectancy, social freedom, generosity and absence of corruption. The higher the value, the happier the country."
      },
      {
        stat: "tourist_arrivals",
        direction: "max",
        statName: "Tourist Arrivals",
        description:
          "Based on UN data, this number represents foreign citizens that stayed at least one night in the country. This includes hotel stays, transfers, conference visits, etc."
      },
      {
        stat: "tourism_expenditure",
        direction: "max",
        statName: "Tourist Expenditure",
        description:
          "The amount of government spending dedicated for tourism (in % of the GDP for a country)."
      },
      {
        stat: "urban_population",
        direction: "max",
        statName: "Urban Population (high)",
        description: "The percentage of people who live in a city."
      },
      {
        stat: "forest_area_percent",
        direction: "max",
        statName: "Forest Area",
        description: "The total amount of forest area in a country (in km²)"
      }
    ]
  },
  // EDUCATION BUTTON
  // ================
  {
    id: "button-education",
    stats: [
      {
        stat: "education_expenditure",
        direction: "max",
        statName: "Education Expenditure",
        description:
          "Education expenditure represents government spending in % of GDP."
      },
      {
        stat: "co2_emissions",
        direction: "min",
        statName: "CO2 Emissions",
        description: "CO2 emissions in metric tons per person per year."
      },
      {
        stat: "corruption_index",
        direction: "min",
        statName: "Corruption Index",
        description:
          "The Corruption Perceptions Index (CPI). (Scale: 0-100; 0 = high corruption. 100 = low corruption)."
      },
      {
        stat: "happiness_index",
        direction: "max",
        statName: "Happiness Index",
        description:
          "The Happiness Index is based on factors such as GDP per capita, social support, healthy life expectancy, social freedom, generosity and absence of corruption. The higher the value, the happier the country."
      },
      {
        stat: "hdi",
        direction: "max",
        statName: "Human Development Index",
        description:
          "The HDI is a statistic of life expectancy, education, and per capita income indicators. (Scale: 0-1; 0 = low development. 1 = high development)."
      },
      {
        stat: "health_expenditure",
        direction: "max",
        statName: "Health Expenditure",
        description: "Public spending on health, measured in % of GDP."
      }
    ]
  },
  // VISITOR VISA BUTTON
  // ===================
  {
    id: "button-visit-visa",
    stats: [
      {
        stat: "happiness_index",
        direction: "max",
        statName: "Happiness Index",
        description:
          "The Happiness Index is based on factors such as GDP per capita, social support, healthy life expectancy, social freedom, generosity and absence of corruption. The higher the value, the happier the country."
      },
      {
        stat: "health_expenditure",
        direction: "max",
        statName: "Health Expenditure",
        description: "Public spending on health, measured in % of GDP."
      },
      {
        stat: "tourist_arrivals",
        direction: "max",
        statName: "Tourist Arrivals",
        description:
          "Based on UN data, this number represents foreign citizens that stayed at least one night in the country. This includes hotel stays, transfers, conference visits, etc."
      },
      {
        stat: "density",
        direction: "min",
        statName: "Population Density (low)",
        description: "The population density is measured in per km²."
      },
      {
        stat: "co2_emissions",
        direction: "min",
        statName: "CO2 Emissions",
        description: "CO2 emissions in metric tons per person per year."
      },
      {
        stat: "inflation",
        direction: "min",
        statName: "Inflation",
        description: "The annual change of consumer prices (unit: %)."
      }
    ]
  },
  // WORKING HOLIDAY BUTTON
  // ======================
  {
    id: "button-work-holiday",
    stats: [
      {
        stat: "density",
        direction: "min",
        statName: "Population Density (low)",
        description: "The population density is measured in per km²."
      },
      {
        stat: "tourist_arrivals",
        direction: "max",
        statName: "Tourist Arrivals",
        description:
          "Based on UN data, this number represents foreign citizens that stayed at least one night in the country. This includes hotel stays, transfers, conference visits, etc."
      },
      {
        id: "button-perm-solo",
        stat: "gini",
        direction: "min",
        statName: "Gini Coefficient",
        description:
          "The Gini coefficient states how uniformly assets are distributed in a country. (scale: 0-100; 0 = equal distribution. 100 = unequal distribution)."
      },
      {
        stat: "happiness_index",
        direction: "max",
        statName: "Happiness Index",
        description:
          "The Happiness Index is based on factors such as GDP per capita, social support, healthy life expectancy, social freedom, generosity and absence of corruption. The higher the value, the happier the country."
      },
      {
        stat: "jobless_rate",
        direction: "min",
        statName: "Jobless Rate",
        description:
          "The number of unemployed people in relation to the labor force for a country."
      },
      {
        stat: "medianwage",
        direction: "max",
        statName: "Median Wage",
        description:
          "A measure of the monthly median wage before taxes, including public benefits (e.g child allowance); unit: USD."
      }
    ]
  },
  // PERMANENT-SOLO BUTTON
  // ======================
  {
    id: "button-perm-solo",
    stats: [
      {
        stat: "hdi",
        direction: "max",
        statName: "Human Development Index",
        description:
          "The HDI is a statistic of life expectancy, education, and per capita income indicators. (Scale: 0-1; 0 = low development. 1 = high development)."
      },
      {
        stat: "corruption_index",
        direction: "min",
        statName: "Corruption Index",
        description:
          "The Corruption Perceptions Index (CPI). (Scale: 0-100; 0 = high corruption. 100 = low corruption)."
      },
      {
        stat: "medianwage",
        direction: "max",
        statName: "Median Wage",
        description:
          "A measure of the monthly median wage before taxes, including public benefits (e.g child allowance); unit: USD."
      },
      {
        stat: "inflation",
        direction: "min",
        statName: "Inflation",
        description: "The annual change of consumer prices (unit: %)."
      },
      {
        stat: "health_expenditure",
        direction: "max",
        statName: "Health Expenditure",
        description: "Public spending on health, measured in % of GDP."
      },
      {
        stat: "urban_population",
        direction: "max",
        statName: "Urban Population (high)",
        description: "The percentage of people who live in a city."
      }
    ]
  },
  // PERMANENT-COUPLE BUTTON
  // ======================
  {
    id: "button-perm-couple",
    stats: [
      {
        stat: "hdi",
        direction: "max",
        statName: "Human Development Index",
        description:
          "The HDI is a statistic of life expectancy, education, and per capita income indicators. (Scale: 0-1; 0 = low development. 1 = high development)."
      },
      {
        stat: "jobless_rate",
        direction: "min",
        statName: "Jobless Rate",
        description:
          "The number of unemployed people in relation to the labor force for a country."
      },
      {
        id: "button-perm-solo",
        stat: "gini",
        direction: "min",
        statName: "Gini Coefficient",
        description:
          "The Gini coefficient states how uniformly assets are distributed in a country. (scale: 0-100; 0 = equal distribution. 100 = unequal distribution)."
      },
      {
        stat: "happiness_index",
        direction: "max",
        statName: "Happiness Index",
        description:
          "The Happiness Index is based on factors such as GDP per capita, social support, healthy life expectancy, social freedom, generosity and absence of corruption. The higher the value, the happier the country."
      },
      {
        stat: "death_rate",
        direction: "min",
        statName: "Rate of Deaths",
        description: "The average number of deaths per year per 1,000 people."
      },
      {
        stat: "debts_percent",
        direction: "min",
        statName: "Government Debt",
        description:
          "The percentage of government borrowings in relation to the GDP."
      }
    ]
  },
  // PERMANENT-FAMILY BUTTON
  // ======================
  {
    id: "button-perm-family",
    stats: [
      {
        stat: "education_expenditure",
        direction: "max",
        statName: "Education Expenditure",
        description:
          "Education expenditure represents government spending in % of GDP."
      },
      {
        stat: "health_expenditure",
        direction: "max",
        statName: "Health Expenditure",
        description: "Public spending on health, measured in % of GDP."
      },
      {
        stat: "literacy_rate",
        direction: "max",
        statName: "Literacy Rate",
        description:
          "The percentage of people that have the ability to read and write by age 15."
      },
      {
        stat: "life_expectancy",
        direction: "max",
        statName: "Life Expectancy",
        description:
          "The average number of years a person will live (at birth)."
      },
      {
        stat: "death_rate",
        direction: "min",
        statName: "Rate of Deaths",
        description: "The average number of deaths per year per 1,000 people."
      },
      {
        stat: "medianwage",
        direction: "max",
        statName: "Median Wage",
        description:
          "A measure of the monthly median wage before taxes, including public benefits (e.g child allowance); unit: USD."
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
travelApp.getUserPurpose = () => {
  $(".travel-form__button").on("click", function() {
    // Store user input in variable
    const inputID = $(this).attr("id");
    travelApp.userPurpose = inputID;

    // Call the display stats function
    travelApp.displayStats(travelApp.userPurpose);
  });
};

/* 2. DISPLAY ALL STATS FOR THE SELECTED PURPOSE ON SCREEN */
travelApp.displayStats = purposeID => {
  $(".choices").empty();
  // Go through each purpose object in the Stat Array
  travelApp.statArray.forEach(purposeObj => {
    // If the purpose ID matches the purpose Object id
    if (purposeID === purposeObj.id) {
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

  travelApp.getUserRankings();
};

/* 3. OBTAIN THE RANKING OF THE STATS FROM USER */
travelApp.getUserRankings = () => {
  $(".test").on("click", ".userSubmit", function() {
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

/* 4. SEND AJAX REQUEST TO INQSTATS API */

// Store important info for calls to the INQStats API.
travelApp.statKey = "5d3687c7c1788d5f";
travelApp.statURL = "http://inqstatsapi.inqubu.com";
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
    // finalResults holds an array of three objects. Each object contains a country and it's 3 stat types. I need to re-edit the display function to account for the new array/objects/array/objects I created and set the conditional to compare it to the data in the finalResults array. Then edit the elements I created and how they are appended on the page.
    let finalResults = travelApp.getRecommendations(
      res,
      statType1,
      statType2,
      statType3
    );
    travelApp.displayDestinations(finalResults);
  });
};

/* 5. START CALCULATION FOR 3 RECOMMENDED COUNTRIES */
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

/* 5.1 FIND MIN/MAX FOR EACH STAT TYPE */
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

/* 5.2 FUNCTION TO DETERMINE WHETHER THE TOP OR BOTTOM SCORES SHOULD BE FOUND */
travelApp.determineResults = (array, statType, direction, iterationNumber) => {
  let resultArray = [];
  // if we want TOP numbers
  if (direction === "max") {
    resultArray = travelApp.determineNCountries(
      array,
      statType,
      iterationNumber,
      1
    );
  }
  // if we want BOT numbers
  else if (direction === "min") {
    resultArray = travelApp.determineNCountries(
      array,
      statType,
      iterationNumber,
      -1
    );
  }
  return resultArray;
};

/* 5.3 CALCULATE THE N COUNTRIES */
travelApp.determineNCountries = (result, statType, n, direction) => {
  // initialize a heap array to keep track of the n largest/smallest stat scores
  let heap = new MinHeap();

  // initialize a secondary array to keep track of the n scores AND
  // the associated country to each score
  let nCountries = [];

  // store the stat type into a property variable for easier use
  let property = statType;

  // start a country counter at 0 just for the sake of adding the first n countries into the heap
  let countryCounter = 0;

  // go through each country from the results of the AJAX call to INQStats
  result.map(country => {
    // store the stat score and the name of the current country in variables.
    // IMPORTANT: multiply by direction to implement max/min heap
    // a direction of 1 = we want maximum scores
    // a direction of -1 = we want minimum scores
    let stat = Number(country[property]) * direction;

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
        for (let m = 0; m < nCountries.length; m++) {
          // multiply by direction again to compare properly with the heap
          let currentStat = Number(nCountries[m][property]) * direction;
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

/* 6. DISPLAY DESTIONATIONS ON SCREEN */
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

/* 7. RESET BUTTON */
travelApp.reset = () => {
  // reset travelApp
};

// WIKIPEDIA API: GET AND DISPLAY
// ==============================
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
      explaintext: true,
      redirects: 1
    }
  }).then(res => {
    console.log(res);
    travelApp.displayWiki(res);
  });
};
// Wiki Ajax request TEST
travelApp.getWiki("spain");

// Display Wikipedia country extract on the page.
travelApp.displayWiki = results => {
  // This variable stores the object that holds a key name unique to every country. The value of this key is an object that holds the extact.
  const wikiExtractObject = results.query.pages;
  // If we convert the above object into an array, the extract can be accessed on the first value of the array. This variable holds the wiki extract.
  const wikiExtractArray = Object.values(wikiExtractObject)[0].extract;
  console.log(wikiExtractArray);
};

// PIXABAY API: GET AND DISPLAY
// ============================
// Store important info for calls to the Pixabay API.
travelApp.pixaKey = "9879571-e4cbbef3e692aa15a24a7119b";
travelApp.pixaURL = "https://www.pixabay.com/api/";
// Get info from Wikipedia (AJAX)
travelApp.getPixa = country => {
  // Get image URL
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
    travelApp.displayPixa(res);
  });
};
// Pixabay Ajax request TEST
travelApp.getPixa("italy");

// Display Pixabay country images on the page
travelApp.displayPixa = results => {
  // Store the array that holds the image URLs in an array
  const resultsArray = results.hits;
  // Create an empty array that will hold all the available country images
  const imageArray = [];
  // Loop through the results array and push all images into the imageArray
  resultsArray.forEach(item => {
    imageArray.push(item.largeImageURL);
  });
  console.log(imageArray);
};

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

// Draggable functionality
travelApp.slideDrag = () => {
  $(".choices").sortable({
    connectWith: ".sortable",
    revert: true
    // containment: "#drag-container"
  });
  $("ul, li").disableSelection();
};
