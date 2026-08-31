import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import WeatherCard from "../components/WeatherCard";
import StatusBadge from "../components/StatusBadge";
import { plots } from "../data/mockData";
import { getWeatherForecast } from "../services/weatherApi";
import { calculateIrrigationDate } from "../services/irrigationCalculator";
import "./IrrigationPrediction.css";


export default function IrrigationPrediction({ onMenuClick }) {
  const [selectedId, setSelectedId] = useState(plots[0].id);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const plot = plots.find(
    (p) => p.id === selectedId
  );

  function getCoordinates(location) {
    const match = location.match(
      /(-?\d+(?:\.\d+)?)°?([NS]),?\s*(-?\d+(?:\.\d+)?)°?([EW])/i
    );

    if (!match) {
      throw new Error("Invalid plot coordinates");
    }

    let latitude = parseFloat(match[1]);
    let longitude = parseFloat(match[3]);

    const latitudeDirection = match[2].toUpperCase();
    const longitudeDirection = match[4].toUpperCase();

    if (latitudeDirection === "S") {
      latitude = -latitude;
    }
    if (longitudeDirection === "W") {
      longitude = -longitude;
    }

    return {
      latitude,
      longitude,
    };
  }

  useEffect(() => {
    async function loadPrediction() {
      try {

        setLoading(true);
        setError("");
        setPrediction(null);

        const {
          latitude,
          longitude,
        } = getCoordinates(plot.location);

        const weatherData =
          await getWeatherForecast(
            latitude,
            longitude
          );

        const result =
          calculateIrrigationDate(
            plot,
            weatherData
          );

        setPrediction(result);

      } catch (err) {
        console.error(err);
        setError(
          "Unable to fetch weather data. Please check your internet connection and try again."
        );

      } finally {
        setLoading(false);
      }
    }

    loadPrediction();

  }, [selectedId]);

  if (loading) {

    return (
      <>
        <Topbar
          title="Irrigation Prediction"
          subtitle="AI-based recommendation for the next irrigation date"
          onMenuClick={onMenuClick}
        />
        <div className="page-content">
          <div className="card prediction-card">
            <h2>
              Loading irrigation prediction...
            </h2>
            <p>
              Checking the latest weather forecast
              and calculating the recommended irrigation date.
            </p>
          </div>
        </div>
      </>
    );

  }
  if (error) {

    return (
      <>

        <Topbar
          title="Irrigation Prediction"
          subtitle="AI-based recommendation for the next irrigation date"
          onMenuClick={onMenuClick}
        />
        <div className="page-content">
          <div className="card prediction-card">
            <h2>
              ⚠️ Unable to calculate prediction
            </h2>
            <p>
              {error}
            </p>
          </div>
        </div>
      </>
    );
  }
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const irrigationDate =
    new Date(prediction.date);

  irrigationDate.setHours(0, 0, 0, 0);
  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  const daysLeft = Math.max(
    0,
    Math.round(
      (irrigationDate - today) /
      millisecondsPerDay
    )
  );

  const urgency =
    daysLeft === 0
      ? "Irrigate Today"
      : `In ${daysLeft} day(s)`;

  const formattedDate =
    irrigationDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  return (
    <>
      <Topbar
        title="Irrigation Prediction"
        subtitle="AI-based recommendation for the next irrigation date"
        onMenuClick={onMenuClick}
      />
      <div className="page-content">

        {/* -----------------------------------------
            Plot Selector
        ------------------------------------------ */}
        <div className="card plot-selector">

          <label
            htmlFor="plot-select"
            className="plot-selector-label"
          >
            Select Plot
          </label>

          <select
            id="plot-select"
            className="plot-selector-input"
            value={selectedId}
            onChange={(e) =>
              setSelectedId(e.target.value)
            }
          >
            {plots.map((p) => (

              <option
                key={p.id}
                value={p.id}
              >
                {p.name} ({p.id})
              </option>

            ))}

          </select>

        </div>
        <div className="prediction-grid">

          {/* -----------------------------------------
              Prediction Card
          ------------------------------------------ */}

          <div className="card prediction-card">
            <div className="prediction-card-header">
              <div>
                <p className="prediction-eyebrow">
                  Recommended Next Irrigation Date
                </p>
                <h2 className="prediction-date">
                  {formattedDate}
                </h2>
              </div>
              <span className="badge badge-info">
                {urgency}
              </span>
            </div>
            <p className="prediction-reason">
              {prediction.reason}
            </p>
            {/* ---------------------------------------
                Prediction Stats
            ---------------------------------------- */}
            <div className="prediction-stats">
              <div className="prediction-stat">
                <p className="prediction-stat-label">
                  💧 Water Required
                </p>
                <p className="prediction-stat-value">
                  {prediction.waterRequired}
                </p>
              </div>
              <div className="prediction-stat">
                <p className="prediction-stat-label">
                  🧪 Current Soil Moisture
                </p>
                <p className="prediction-stat-value">
                  {plot.soilMoisture}%
                </p>
              </div>

              <div className="prediction-stat">
                <p className="prediction-stat-label">
                  🌱 Crop Stage
                </p>
                <p className="prediction-stat-value">
                  {plot.cropStage}
                </p>

              </div>
            </div>

            <div className="confidence-block">
              <div className="confidence-block-label">
                <span>🤖 AI Prediction Confidence</span>
                <span>{prediction.confidence}%</span>
              </div>


              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      `${prediction.confidence}%`,
                    background:
                      "var(--color-primary)",
                  }}
                />

              </div>


              <p className="confidence-note">

                Based on soil moisture,
                crop stage and live weather
                forecast data.

              </p>

            </div>


            {/* ---------------------------------------
                Plot Information
            ---------------------------------------- */}

            <div className="plot-quick-info">

              <span>
                📍 {plot.location}
              </span>

              <span>
                🧱 {plot.soilType}
              </span>

              <span>
                📏 {plot.area} acres
              </span>

              <StatusBadge
                status={plot.status}
              />

            </div>


          </div>


          {/* -----------------------------------------
              Weather Card
          ------------------------------------------ */}

          <WeatherCard />


        </div>

      </div>

    </>
  );
}