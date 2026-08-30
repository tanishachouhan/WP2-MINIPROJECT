import { useEffect, useState } from "react";
import "./WeatherCard.css";

const conditionIcon = {
  Sunny: "☀️",
  Cloudy: "☁️",
  "Partly Cloudy": "⛅",
  Rain: "🌧️",
};

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=17.28&longitude=74.18&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&hourly=precipitation_probability&daily=weather_code,temperature_2m_max&timezone=auto"
    )
      .then((response) => response.json())
      .then((data) => {
        const current = data.current;

        setWeather({
          location: "Karad, Satara",
          temperature: Math.round(current.temperature_2m),
          humidity: current.relative_humidity_2m,
          rainfallChance: data.hourly.precipitation_probability[0],
          windSpeed: Math.round(current.wind_speed_10m),
          condition: getCondition(current.weather_code),

          forecast: data.daily.time.slice(0, 5).map((date, index) => ({
            day: new Date(date).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            temp: Math.round(data.daily.temperature_2m_max[index]),
            condition: getCondition(data.daily.weather_code[index]),
          })),
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Weather API error:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="card weather-card">
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card weather-card">
        <p>Unable to load weather data.</p>
      </div>
    );
  }

  return (
    <div className="card weather-card">
      <div className="weather-main">

        <div>
          <p className="weather-location">
            📍 {weather.location}
          </p>

          <h2 className="weather-temp">
            {weather.temperature}°C
          </h2>

          <p className="weather-condition">
            {conditionIcon[weather.condition]} {weather.condition}
          </p>
        </div>

        <div className="weather-stats">
          <p>
            💧 Humidity: <strong>{weather.humidity}%</strong>
          </p>

          <p>
            🌦️ Rain chance:{" "}
            <strong>{weather.rainfallChance}%</strong>
          </p>

          <p>
            🍃 Wind:{" "}
            <strong>{weather.windSpeed} km/h</strong>
          </p>
        </div>

      </div>

      <div className="weather-forecast">
        {weather.forecast.map((f) => (
          <div
            key={f.day}
            className="weather-forecast-item"
          >
            <span>{f.day}</span>

            <span className="weather-forecast-icon">
              {conditionIcon[f.condition]}
            </span>

            <span>{f.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getCondition(code) {
  if (code === 0) return "Sunny";

  if ([1, 2].includes(code)) {
    return "Partly Cloudy";
  }

  if (code === 3) return "Cloudy";

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "Rain";
  }

  return "Cloudy";
}