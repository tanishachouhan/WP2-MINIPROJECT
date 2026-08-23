import { weather } from "../data/mockData";
import "./WeatherCard.css";

const conditionIcon = {
  Sunny: "☀️",
  Cloudy: "☁️",
  "Partly Cloudy": "⛅",
  Rain: "🌧️",
};

export default function WeatherCard() {
  return (
    <div className="card weather-card">
      <div className="weather-main">
        <div>
          <p className="weather-location">📍 {weather.location}</p>
          <h2 className="weather-temp">{weather.temperature}°C</h2>
          <p className="weather-condition">
            {conditionIcon[weather.condition]} {weather.condition}
          </p>
        </div>
        <div className="weather-stats">
          <p>💧 Humidity: <strong>{weather.humidity}%</strong></p>
          <p>🌦️ Rain chance: <strong>{weather.rainfallChance}%</strong></p>
          <p>🍃 Wind: <strong>{weather.windSpeed} km/h</strong></p>
        </div>
      </div>

      <div className="weather-forecast">
        {weather.forecast.map((f) => (
          <div key={f.day} className="weather-forecast-item">
            <span>{f.day}</span>
            <span className="weather-forecast-icon">{conditionIcon[f.condition]}</span>
            <span>{f.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
