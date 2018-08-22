// Create an object representing our travel app
const travelApp = {};

// (To be done) Listen for user click event to select purpose of travel
// Insert event-listener function here

// (To be done) Store value of user input in a variable
// something something.val() or .text() depending on what our inputs are.

// Store in a variable, the query parameters for each travel type
travelApp.userVacation = 'density'; // Returns the population density of a country (per km²).
travelApp.userWorkHoliday = 'jobless_rate'; // The number of unemployed people in relation to the labor force for a country.
travelApp.userEducation = 'education_expenditure'; // Returns the public expenditure on education (in % of the GDP for a country).
travelApp.userPermFamily = 'hdi'; // Human Development Index (HDI). Combines several parameters (e.g. life expectancy or GDP). Scale: 0-1; 0 = low development. 1 = high development.
travelApp.userPermSolo = 'gini'; // The Gini coefficient states how uniformly assets are distributed in a country (scale: 0-100; 0 = equal distribution. 100 = unequal distribution)
travelApp.userPermCouple = 'happiness_index'; // Returns the values of the world happiness survey of the UNSDSN. The higher the value, the happier the country.
travelApp.userVisitVisa = 'tourist_arrivals' // The number of foreign citizens that stayed at least one night in the country. This includes hotel stays, transfers, conference visits, etc.

// Store important info for the API calls into variables
travelApp.statKey = '5d3687c7c1788d5f';
travelApp.statURL = 'http://inqstatsapi.inqubu.com';

// The getStat function is used to get a single statistic from the API for all countries. It returns the return value from $.ajax().
travelApp.getStat = (statType) => {
    $.ajax({
        url: travelApp.statURL,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: travelApp.statKey,
            data: statType,
            cmd: 'getWorldData'
        }
    }).then((res) => {
        console.log(res);
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