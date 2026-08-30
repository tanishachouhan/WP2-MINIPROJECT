// src/services/irrigationCalculator.js

export function calculateIrrigationDate(plot, weatherData) {
  const today = new Date();

  // Remove time so that date calculations are accurate
  today.setHours(0, 0, 0, 0);

  const daily = weatherData.daily;

  const soilMoisture = Number(plot.soilMoisture);

  /*
    Irrigation thresholds used for this college-project prototype:

    <= 30%  → Critical
    31–45%  → Low
    46–60%  → Moderate
    > 60%   → Adequate

    Rain probability >= 60% or rainfall >= 8 mm
    means irrigation can usually be delayed.
  */

  // --------------------------------------------------
  // 1. Critical soil moisture
  // --------------------------------------------------

  if (soilMoisture <= 30) {
    return {
      date: today,
      confidence: 95,
      waterRequired: "60 mm",
      reason:
        "Soil moisture is critically low. Irrigation is recommended today to avoid crop stress.",
    };
  }

  // --------------------------------------------------
  // 2. Check the next 7 days
  // --------------------------------------------------

  for (let i = 0; i < daily.time.length; i++) {
    const forecastDate = new Date(`${daily.time[i]}T00:00:00`);

    const rainProbability =
      Number(daily.precipitation_probability_max[i] || 0);

    const rainfall =
      Number(daily.precipitation_sum[i] || 0);

    const et0 =
      Number(daily.et0_fao_evapotranspiration[i] || 0);

    /*
      If substantial rainfall is expected,
      skip this day and check the next day.
    */

    if (rainProbability >= 60 || rainfall >= 8) {
      continue;
    }

    // ------------------------------------------------
    // Low soil moisture
    // ------------------------------------------------

    if (soilMoisture <= 45) {
      return {
        date: forecastDate,
        confidence: 92,
        waterRequired: "55 mm",
        reason:
          "Soil moisture is low and significant rainfall is not expected. Irrigation is recommended.",
      };
    }

    // ------------------------------------------------
    // Moderate soil moisture + high ET0
    // ------------------------------------------------

    if (soilMoisture <= 60 && et0 >= 4) {
      return {
        date: forecastDate,
        confidence: 87,
        waterRequired: "38 mm",
        reason:
          "Soil moisture is moderate and crop water loss is increasing. Light irrigation is recommended.",
      };
    }

    // ------------------------------------------------
    // Adequate soil moisture
    // ------------------------------------------------

    if (soilMoisture > 60 && et0 < 5) {
      continue;
    }

    // ------------------------------------------------
    // General irrigation condition
    // ------------------------------------------------

    return {
      date: forecastDate,
      confidence: 82,
      waterRequired: "40 mm",
      reason:
        "Soil moisture and weather conditions indicate that irrigation will be required.",
    };
  }

  // --------------------------------------------------
  // If no suitable date was found within 7 days
  // --------------------------------------------------

  const fallbackDate = new Date(today);
  fallbackDate.setDate(fallbackDate.getDate() + 7);

  return {
    date: fallbackDate,
    confidence: 75,
    waterRequired: "40 mm",
    reason:
      "Rainfall is expected during the forecast period. Continue monitoring soil moisture before irrigation.",
  };
}