// src/services/weatherApi.js

export async function getWeatherForecast(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&daily=precipitation_probability_max,precipitation_sum,et0_fao_evapotranspiration` +
    `&forecast_days=7` +
    `&timezone=Asia%2FKolkata`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }

  const data = await response.json();

  return data;
}