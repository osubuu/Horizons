$(function () {

    // Create an object representing our travel app
    const travelApp = {};
    // Listen for user click event to select purpose of travel

    // Store value of user input in a variable

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
    // Store all the world's regions in an array to be used later in an array of Promises
    const regions = ['africa', 'america', 'asia', 'europe', 'oceania'];

    // The getStat function is used to get a single single statistic from the API for all countries. It returns the return value from $.ajax().
    function getStat(region) {
        $.ajax({
            url: travelApp.statURL,
            method: 'GET',
            dataType: 'json',
            data: {
                api_key: travelApp.statKey,
                data: 'gini',
                countries: region
            }
        });
    };

    // Take the regions array and map it with the getStat function. So each value in the regions array is passed as an argument into the getStat function.
    const statRequests = regions.map(getStat);
    console.log(statRequests);

    // We use the when method to wait for all of the Promises to resolve. We use the spread operator here to spread out the array of values in place.
    $.when(...statRequests)
        // The when()'s then() will return all the data for us, and we can use rest parameters together all the values into one array.
        .then((...responses) => {
            console.log(responses);
        });
});