const MinHeap = require("fastpriorityqueue");

// Create an object representing our travel app (NAMESPACE)
const travelApp = {};
travelApp.userStat = "";

// Vacation
// "density"
// "forest_area_percent"
// "happiness_index"
// "tourist_arrivals"
// "tourism_expenditure"
// "urban_population"
// ** Extras **
// "population"

// Education
// "education_expenditure"
// "co2_emissions"
// "corruption_index"
// "happiness_index"
// "hdi" (life expectancy, education, and per capita income)
// "health_expenditure"
// ** Extras **
// "death_rate"

// Visitor Visa
// "happiness_index"
// "health_expenditure"
// "tourist_arrivals"
// "density"
// "inflation"
// "co2_emissions"


// Working Holiday
// "density"
// "tourist_arrivals"
// "gini" (wealth distribution)
// "happiness_index"
// "jobless_rate"
// "medianwage"
// ** Extras **
// "corruption_index"
// "co2_emissions"
// "death_rate"
// "forest_area_percent"
// "gdp_capita"
// "health_expenditure"
// "military_expenditure"
// "tax_revenue"
// "urban_population"

// Permanent Solo
// "hdi" (life expectancy, education, and per capita income)
// "corruption_index"
// "medianwage"
// "inflation"
// "health_expenditure"
// "urban_population"
// ** Extras **
// "density"
// "death_rate"
// "debts_percent"
// "gdp_capita"
// "gini" (wealth distribution)
// "happiness_index"
// "life_expectancy"
// "military_expenditure"
// "co2_emissions"

// Permanent Couple
// "hdi" (life expectancy, education, and per capita income)
// "jobless_rate"
// "gini" (wealth distribution)
// "happiness_index"
// "death_rate"
// "debts_percent"
// ** Extras **
// "corruption_index"
// "density"
// "co2_emissions"
// "gdp_capita"
// "health_expenditure"
// "life_expectancy"
// "literacy_rate"
// "medianwage"
// "military_expenditure"


// Permanent Family
// "education_expenditure"
// "health_expenditure"
// "literacy_rate"
// "life_expectancy"
// "death_rate"
// "medianwage"
// ** Extras **
// "co2_emissions"
// "corruption_index"
// "density"
// "debts_percent"
// "gdp_capita"
// "gini" (wealth distribution)
// "happiness_index"
// "hdi" (life expectancy, education, and per capita income)
// "jobless_rate"
// "military_expenditure"
// "tax_revenue"

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
        description:
          "Represents the percentage of people who live in a city."
      },
      {
        stat: "forest_area_percent",
        direction: "max",
        statName: "Forest Area",
        description:
          "Represents the total amount of forest area in a country (in km²)"
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
          "Education expenditure represents government spending in % of GDP. World Average: [insert average]"
      },
      {
        stat: "co2_emissions",
        direction: "min",
        statName: "CO2 Emissions",
        description:
          "Represents the CO2 emissions in metric tons per person per year."
      },
      {
        stat: "corruption_index",
        direction: "min",
        statName: "Corruption Index",
        description:
          "Represents the Corruption Perceptions Index (CPI). (Scale: 0-100; 0 = high corruption. 100 = low corruption)."
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
        description:
          "Defines public spending on health, measured in % of GDP."
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
        description:
          "Defines public spending on health, measured in % of GDP."
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
        description:
          "Represents the CO2 emissions in metric tons per person per year."
      },
      {
        stat: "inflation",
        direction: "min",
        statName: "Inflation",
        description:
          "Defines the annual change of consumer prices (unit: %)."
      }
    ]
  },
  // Working Holiday
  // "density"
  // "tourist_arrivals"
  // "gini" (wealth distribution)
  // "happiness_index"
  // "jobless_rate"
  // "medianwage"
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
          "The number of unemployed people in relation to the labor force for a country. World Average: [insert average]"
      },
      {}
    ]
  },
  // PERMANENT-SOLO BUTTON
  // ======================
  {
    id: "button-perm-solo",
    stats: [
      {},
      {},
      {},
      {},
      {},
      {}
    ]
  },
  // PERMANENT-COUPLE BUTTON
  // ======================
  {
    id: "button-perm-couple",
    stats: [
      {},
      {},
      {},
      {},
      {},
      {}
    ]
  },
  // PERMANENT-FAMILY BUTTON
  // ======================
  {
    id: "button-perm-family",
    stats: [
      {},
      {},
      {},
      {},
      {},
      {}
    ]
  },




  {
    id: "button-work-holiday",

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
          "The HDI is a statistic of life expectancy, education, and per capita income indicators. (Scale: 0-1; 0 = low development. 1 = high development)."
      },
      {
        stat: "hdi",
        direction: "max",
        statName: "Human Development Index",
        description:
          "The HDI is a statistic of life expectancy, education, and per capita income indicators. (Scale: 0-1; 0 = low development. 1 = high development)."
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
  $(".travel-form__button").on("click", function () {
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
      .text(`${country.name}`);
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
travelApp.getStat = (statType, direction) => {
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

    // calling the calculation function to get the top n / bottom n countries

    let finalResults = travelApp.getRecommendations(res, statType, direction);
    travelApp.displayDestinations(finalResults);
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
travelApp.init = function () {
  // This function calls all our apps events: 1. Inputs for travel types
  travelApp.eventsFunction();
  travelApp.slideDrag();
  // travelApp.getUserInput();
  // travelApp.displayStats();
};

// Document Ready to call our init() function and start the app
$(function () {
  travelApp.init();
});

// Determine whether we want the top n or bottom n rankings
travelApp.getRecommendations = (res, statType, direction) => {
  if (direction === "max") {
    return travelApp.determineTopN(res, statType, 3);
  } else if (direction === "min") {
    return travelApp.determineBotN(res, statType, 3);
  }
};

/* CALCULATE TOP N RANKINGS */
travelApp.determineTopN = (result, stat, n) => {
  // initialize a heap array to keep track of the n largest stat scores
  let heap = new MinHeap();

  // initialize a secondary array to keep track of the n lowest scores AND
  // the associated country to each score
  let topN = [];

  // store the stat type into a property variable for easier use
  let property = stat;

  // start a country counter at 0 just for the sake of adding the first n countries into the heap
  let countryCounter = 0;

  // go through each country from the results of the AJAX call to INQStats
  result.map(country => {
    // store the stat score and the name of the current country in variables
    let stat = Number(country[property]);
    let countryName = country.countryName;

    // store both stat and country name into an object to be added into the top n if needed
    let countryObj = {
      name: countryName,
      stat: stat
    };

    // if it's the first n countries from the result, no work required. Just add them directly into both the heap and top3 variables
    if (countryCounter < n) {
      heap.add(stat);
      topN.push(countryObj);

      // increment countryCounter to know when we're past the first n countries
      countryCounter++;
    } else {
      // CONDITION TO CHECK IF the current country stat is greater than any of the current stats in the current top n countries
      if (stat > heap.peek()) {
        // if so, find the location of the smallest stat score in the current top n array and replace it with the new stat and its associated country
        for (let m = 0; m < topN.length; m++) {
          if (topN[m].stat === heap.peek()) {
            topN.splice(m, 1, countryObj);
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
travelApp.determineBotN = (result, stat, n) => {
  // initialize a heap array to keep track of the n lowest stat scores
  let heap = new MinHeap();

  // initialize a secondary array to keep track of the n lowest scores AND
  // the associated country to each score
  let botN = [];

  // store the stat type into a property variable for easier use
  let property = stat;

  // start a country counter at 0 just for the sake of adding the first n countries into the heap
  let countryCounter = 0;

  // go through each country from the results of the AJAX call to INQStats
  result.map(country => {
    // calculate a NEGATIVE score of the stat type in order to implement a MAX HEAP for the bottom n calculation
    let stat = Number(country[property]) * -1;

    // store country name in a country name variable
    let countryName = country.countryName;

    // store both stat and country name into an object to be added into the bottom n if needed
    let countryObj = { name: countryName, stat: stat };

    // if it's the first n countries from the result, no work required. Just add them directly into both the heap and bot3 variables
    if (countryCounter < n) {
      heap.add(stat);
      botN.push(countryObj);

      // increment countryCounter to know when we're past the first n countries
      countryCounter++;
    } else {
      // CONDITION TO CHECK IF the current country stat is smaller than any of the current stats in the current bottom n countries
      if (stat > heap.peek()) {
        // if so, find the location of the largest stat score in the current bottom n array and replace it with the new stat and its associated country
        for (let m = 0; m < botN.length; m++) {
          if (botN[m].stat === heap.peek()) {
            botN.splice(m, 1, countryObj);
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
  $("#sortable").sortable({
    // axis: "y",
    revert: true,
    containment: "#drag-container"
  });
  $("ul, li").disableSelection();
};
