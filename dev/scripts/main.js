import axios from "axios";
import Heap from 'fastpriorityqueue';
import MetaData from './utils/metadata';
import Utils from './utils/utils';
import Constants from './utils/constants';
import UI from './utils/ui';

const travelApp = {};

travelApp.getStarted = () => {
  $(".welcome__button").on("click", function () {
    $("html, body")
      .stop()
      .animate({ scrollTop: $(".purpose-section").offset().top }, 900, "swing");
  });
};

travelApp.getUserPurpose = () => {
  $(".travel-form__button").on("click", function () {
    const inputID = $(this).attr("id");
    travelApp.userPurpose = inputID;

    travelApp.displayStats(travelApp.userPurpose);

    $(".criterias").css("display", "flex");

    $("html, body")
      .stop()
      .animate(
        { scrollTop: $(".criterias").offset().top },
        900,
        "swing"
      );
  });
};

travelApp.displayStats = purposeID => {
  $(".choices").empty();
  $(".criteria-header").text(
    "Please rank the following criteria in order of importance from top to bottom. Use your cursor to drag and drop the items."
  );
  $(".choices-list-container").css("position", "relative");

  MetaData.forEach(purposeObj => {
    if (purposeID === purposeObj.id) {
      purposeObj.stats.forEach(stat => {
        const markUpItem = $("<li>")
          .attr("id", stat.stat)
          .addClass("criteria")
          .text(stat.statName);
        $(".choices").append(markUpItem);
      });
    }
  });

  const markUpButton = `<li><button class="user-submit btn">Submit Ranking</button></li>`;
  $(".choices").append(markUpButton);

  travelApp.getUserRankings();
};

travelApp.getUserRankings = () => {
  $(".choices").on("click", ".user-submit", function () {
    // remove submit button and put a loader until the results come back
    $(".choices").find("li:last-child").html(UI.loader);

    const userRankings = $(".choices")[0].children;

    // store the top 3 rankings
    const statsForAPICall = [
      userRankings[0].id,
      userRankings[1].id,
      userRankings[2].id
    ];

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

    travelApp.getStat(...statsForAPICall);
  });
};

travelApp.getStat = (statType1, statType2, statType3) => {
  axios({
    method: "GET",
    url: Constants.INQStats_url,
    dataResponse: "jsonp",
    params: {
      api_key: Constants.INQStats_key,
      data: `hdi,${statType1},${statType2},${statType3}`,
      cmd: "getWorldData"
    }
  }).then(res => {
    // calling the calculation function to get the top n / bottom n countries
    const finalResults = travelApp.getRecommendations(res.data, statType1, statType2, statType3);

    // Get wiki and pixa extracts for each country
    finalResults.forEach(countryObj => {
      travelApp.wikiPromiseArray.push(travelApp.getWiki(countryObj.countryName));
      travelApp.pixaPromiseArray.push(travelApp.getPixa(countryObj.countryName));
    });

    // when all wiki and pixa promises are fulfilled, store the results to prepare them for display
    $.when(...travelApp.wikiPromiseArray, ...travelApp.pixaPromiseArray).then((...wikiPixaResults) => {
      // go through the wikiPixa results
      for (let i = 0; i < wikiPixaResults.length; i++) {
        if (i < 3) { // first three are wiki
          travelApp.storeWiki(wikiPixaResults[i]);
        }
        else { // last three are pixa
          travelApp.storePixa(wikiPixaResults[i]);
        }
      }

      travelApp.displayDestinations(finalResults, [statType1, statType2, statType3]);
    });
  });
};

travelApp.getRecommendations = (res, statType1, statType2, statType3) => {
  // Find direction of each stat type and return it in an array
  const arrDirections = travelApp.findDirections(statType1, statType2, statType3);

  // Initialize arrays and numbers for each round of iteration/filtering
  const initialIter = 60;
  const iteration1 = 10;
  const iteration2 = 5;
  const iteration3 = 3;

  //Initial filter to account for realistic results (based on HDI)
  const initialArr = travelApp.determineResults(res, "hdi", "max", initialIter);

  const results1 = travelApp.determineResults(initialArr, statType1, arrDirections[0], iteration1);
  const results2 = travelApp.determineResults(results1, statType2, arrDirections[1], iteration2);
  const finalResults = travelApp.determineResults(results2, statType3, arrDirections[2], iteration3);

  return finalResults;
};

travelApp.findDirections = (statType1, statType2, statType3) => {
  // Find whether each stattype is max or min
  let stat1Direction = "";
  let stat2Direction = "";
  let stat3Direction = "";

  MetaData.forEach(purpose => {
    if (purpose.id === travelApp.userPurpose) {
      purpose.stats.forEach(stat => {
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

travelApp.determineResults = (array, statType, direction, iterationNumber) => {
  if (direction === "max") {
    return travelApp.determineNCountries(array, statType, iterationNumber, 1);
  } else if (direction === "min") {
    return travelApp.determineNCountries(array, statType, iterationNumber, -1);
  }
};

/* 5.3 CALCULATE THE N COUNTRIES */
travelApp.determineNCountries = (result, statType, n, direction) => {
  // initialize a heap array to keep track of the n largest/smallest stat scores
  const heap = new Heap();

  // initialize a secondary array to keep track of the n scores AND the associated country to each score
  const nCountries = [];
  const property = statType;
  let countryCounter = 0;

  result.map(country => {
    // IMPORTANT: multiply by direction to implement max/min heap
    // a direction of 1 = we want maximum scores
    // a direction of -1 = we want minimum scores
    const stat = Number(country[property]) * direction;

    // if it's the first n countries from the result, no work required. Just add them directly into both the heap and nCountries variables
    if (countryCounter < n) {
      heap.add(stat);
      nCountries.push(country);

      // increment countryCounter to know when we're past the first n countries
      countryCounter++;
    } else {
      if (stat > heap.peek()) {
        // if so, find the location of the smallest/largest stat score in the current nCountries array and replace it with the new stat and its associated country
        for (let m = 0; m < nCountries.length; m++) {
          // multiply by direction again to compare properly with the heap
          const currentStat = Number(nCountries[m][property]) * direction;
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


travelApp.getWiki = country => {
  // get wikipedia text extract
  return $.ajax({
    url: Constants.Wikipedia_url,
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

travelApp.storeWiki = result => {
  // This variable stores the object that holds a key name unique to every country. The value of this key is an object that holds the extact.
  const wikiExtractObject = result[0].query.pages;
  // If we convert the above object into an array, the extract can be accessed on the first value of the array. This variable holds the wiki extract.
  travelApp.wikiExtract.push(Object.values(wikiExtractObject)[0].extract);
};

travelApp.getPixa = country => {
  // get image URL
  return $.ajax({
    url: Constants.Pixabay_url,
    method: "GET",
    dataType: "jsonp",
    data: {
      key: Constants.Pixabay_key,
      q: country,
      per_page: 15
    }
  });
};

travelApp.storePixa = results => {
  const resultsArray = results[0].hits;
  resultsArray.forEach(item => {
    travelApp.imageArray.push(item.largeImageURL);
    travelApp.imageTextArray.push(item.tags);
  });
};

travelApp.displayDestinations = (results, statChoices) => {
  $(".results").empty();
  // Go through each country result and build the string literal to append to the page
  let countryCounter = 0;
  let imageCounter = 0;

  results.forEach(country => {
    // This element holds all elements for one country result
    const countryContainerElement = $("<div>")
      .addClass("result-container")
      .css("background-image", `url("${travelApp.imageArray[Utils.randomize(imageCounter, imageCounter + 15)]}")`);
    const countryCardElement = $("<div>").addClass("card");
    const countryNameElement = $("<h2>")
      .addClass("country-name")
      .text(`${country.countryName}`);
    const countryDescriptionElement = $("<p>")
      .addClass("wiki-text")
      .text(travelApp.wikiExtract[countryCounter]);
    countryCounter++;

    const statListElement = $("<ul>").addClass("stat-list");
    const smallPixaContainerElement = $("<div>").addClass("country-image-container");
    const smallPixaImage = $("<img>")
      .addClass("country-image")
      .attr({
        src: `${travelApp.imageArray[Utils.randomize(imageCounter, imageCounter + 15)]}`,
        alt: `Scenic image of ${country.countryName}. Image tags include ${travelApp.imageTextArray}.`
      });
    // Add 15 to the image counter ensures that every iteration through the forEach will add images to the associated coutries
    imageCounter += 15;

    smallPixaContainerElement.append(smallPixaImage);
    countryCardElement.append(
      countryNameElement,
      countryDescriptionElement,
      statListElement,
      smallPixaContainerElement
    );
    countryContainerElement.append(countryCardElement);
    $(".results").append(countryContainerElement);

    // Go through the array "statChoices" and set up 3 information:
    // 1. title of stat (taken from travelApp.statNamesArray)
    // 2. value of stat (taken from results object)
    // 3. description of stat (taken from travelApp.statDescriptionArray)
    let statCounter = 0;
    statChoices.forEach(stat => {
      const statTitle = travelApp.statNamesArray[statCounter];
      const statValue = country[travelApp.statCodeArray[statCounter]];
      const statDescription = travelApp.statDescriptionArray[statCounter];
      statCounter++;

      const statListItemElement = $("<li>").addClass("stat-list__item");
      const statTitleIconContainerElement = $("<div>").addClass("stat-list__item__title-icon-container");
      const statTitleElement = $("<h4>")
        .addClass("stat-list__item__title-icon-container__title-number")
        .text(`${statTitle}: ${Utils.numberWithCommas(statValue)}`);
      const statHoverIconElement = `<i class="stat-list__item__title-icon-container__icon far fa-question-circle"></i>`;
      statTitleIconContainerElement.append(statTitleElement, statHoverIconElement);
      const statDescriptionContainerElement = $("<div>").addClass("stat-list__item__description-container display-none");
      const statDescriptionElement = $("<p>")
        .addClass("stat-list__item__description-container__description")
        .text(statDescription);

      statDescriptionContainerElement.append(statDescriptionElement);
      statListItemElement.append(statTitleIconContainerElement, statDescriptionContainerElement);
      statListElement.append(statListItemElement);
    });
  });

  travelApp.finalDisplay();
};

travelApp.finalDisplay = () => {
  $(".results").waitForImages(() => {
    $(".results").css("display", "block");

    $("html, body")
      .stop()
      .animate({ scrollTop: $(".results").offset().top }, 900, "swing");

    // remove loader and display submit ranking button again
    const markUpButton = `<li><button class="user-submit btn">Submit Ranking</button></li>`;
    $(".choices")
      .find("li:last-child")
      .html(markUpButton);

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

travelApp.displayStatDescription = () => {
  $(".results").on("click", ".stat-list__item__title-icon-container__icon", function () {
    if (
      $(this)
        .parents(".stat-list__item")
        .find(".stat-list__item__description-container")
        .hasClass("display-none") === false
    ) {
      $(".results")
        .find(".stat-list__item__description-container")
        .removeClass("display-none")
        .addClass("display-none");
    } else {
      $(".results")
        .find(".stat-list__item__description-container")
        .addClass("display-none");
      $(this)
        .parents(".stat-list__item")
        .find(".stat-list__item__description-container")
        .removeClass("display-none");
    }
  });
};

travelApp.eventListeners = () => {
  travelApp.getUserPurpose();
  travelApp.getStarted();
  travelApp.displayStatDescription();
  UI.transformSVG();
  UI.slideAndDropListener();
};

travelApp.init = () => {
  travelApp.eventListeners();
};

$(() => {
  travelApp.init();
});