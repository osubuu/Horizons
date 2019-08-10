// ARRAY WITH ALL RELEVANT STATS FOR EACH PURPOSE

const MetaData = [
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
          "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
      },
      {
        stat: "tourist_arrivals",
        direction: "max",
        statName: "Tourist Arrivals",
        description:
          "Represents foreign citizens that stayed at least one night. Includes hotel stays, transfers, conference visits, etc."
      },
      {
        stat: "tourism_expenditure",
        direction: "max",
        statName: "Tourist Expenditure",
        description: "The amount of government spending dedicated for tourism (in % of the GDP for a country)."
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
        description: "Education expenditure represents government spending in % of GDP."
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
        description: "Corruption Perceptions Index (CPI). (Scale: 0-100; 0 = high corruption. 100 = low corruption)."
      },
      {
        stat: "happiness_index",
        direction: "max",
        statName: "Happiness Index",
        description:
          "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
      },
      {
        stat: "hdi",
        direction: "max",
        statName: "Human Development Index",
        description:
          "Indicator of life expectancy, education, and per capita income. (Scale: 0-1; 0 = low score. 1 = high score)."
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
          "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
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
          "Represents foreign citizens that stayed at least one night. Includes hotel stays, transfers, conference visits, etc."
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
          "Represents foreign citizens that stayed at least one night. Includes hotel stays, transfers, conference visits, etc."
      },
      {
        id: "button-perm-solo",
        stat: "gini",
        direction: "min",
        statName: "Gini Coefficient",
        description:
          "States how uniformly assets are distributed. (scale: 0-100; 0 = equal distribution. 100 = unequal distribution)."
      },
      {
        stat: "happiness_index",
        direction: "max",
        statName: "Happiness Index",
        description:
          "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
      },
      {
        stat: "jobless_rate",
        direction: "min",
        statName: "Jobless Rate",
        description: "The number of unemployed people in relation to the labor force for a country."
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
          "Indicator of life expectancy, education, and per capita income. (Scale: 0-1; 0 = low score. 1 = high score)."
      },
      {
        stat: "corruption_index",
        direction: "min",
        statName: "Corruption Index",
        description: "Corruption Perceptions Index (CPI). (Scale: 0-100; 0 = high corruption. 100 = low corruption)."
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
          "Indicator of life expectancy, education, and per capita income. (Scale: 0-1; 0 = low score. 1 = high score)."
      },
      {
        stat: "jobless_rate",
        direction: "min",
        statName: "Jobless Rate",
        description: "The number of unemployed people in relation to the labor force for a country."
      },
      {
        id: "button-perm-solo",
        stat: "gini",
        direction: "min",
        statName: "Gini Coefficient",
        description:
          "States how uniformly assets are distributed. (scale: 0-100; 0 = equal distribution. 100 = unequal distribution)."
      },
      {
        stat: "happiness_index",
        direction: "max",
        statName: "Happiness Index",
        description:
          "Based on factors such as GDP per capita, social support, life expectancy. The higher the value, the happier the country."
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
        description: "The percentage of government borrowings in relation to the GDP."
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
        description: "Education expenditure represents government spending in % of GDP."
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
        description: "The percentage of people that have the ability to read and write by age 15."
      },
      {
        stat: "life_expectancy",
        direction: "max",
        statName: "Life Expectancy",
        description: "The average number of years a person will live (at birth)."
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

export default MetaData;