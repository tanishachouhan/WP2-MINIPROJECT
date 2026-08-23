import { useState } from "react";
import Topbar from "../components/Topbar";
import WeatherCard from "../components/WeatherCard";
import StatusBadge from "../components/StatusBadge";
import { plots, irrigationPredictions } from "../data/mockData";
import "./IrrigationPrediction.css";

export default function IrrigationPrediction({ onMenuClick }) {
  const [selectedId, setSelectedId] = useState(plots[0].id);
  const plot = plots.find((p) => p.id === selectedId);
  const prediction = irrigationPredictions[selectedId];

  const urgency =
    prediction.daysLeft === 0 ? "Irrigate Today" : `In ${prediction.daysLeft} day(s)`;

  return (
    <>
      <Topbar
        title="Irrigation Prediction"
        subtitle="AI-based recommendation for the next irrigation date"
        onMenuClick={onMenuClick}
      />

      <div className="page-content">
        <div className="card plot-selector">
          <label htmlFor="plot-select" className="plot-selector-label">
            Select Plot
          </label>
          <select
            id="plot-select"
            className="plot-selector-input"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {plots.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id})
              </option>
            ))}
          </select>
        </div>

        <div className="prediction-grid">
          {/* Prediction card */}
          <div className="card prediction-card">
            <div className="prediction-card-header">
              <div>
                <p className="prediction-eyebrow">Recommended Next Irrigation Date</p>
                <h2 className="prediction-date">{prediction.nextIrrigationDate}</h2>
              </div>
              <span className="badge badge-info">{urgency}</span>
            </div>

            <p className="prediction-reason">{prediction.reason}</p>

            <div className="prediction-stats">
              <div className="prediction-stat">
                <p className="prediction-stat-label">💧 Water Required</p>
                <p className="prediction-stat-value">{prediction.waterRequired}</p>
              </div>
              <div className="prediction-stat">
                <p className="prediction-stat-label">🧪 Current Soil Moisture</p>
                <p className="prediction-stat-value">{plot.soilMoisture}%</p>
              </div>
              <div className="prediction-stat">
                <p className="prediction-stat-label">🌱 Crop Stage</p>
                <p className="prediction-stat-value">{plot.cropStage}</p>
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
                    width: `${prediction.confidence}%`,
                    background: "var(--color-primary)",
                  }}
                />
              </div>
              <p className="confidence-note">
                Based on soil moisture sensor trend, crop stage and recent weather data (mock model).
              </p>
            </div>

            <div className="plot-quick-info">
              <span>📍 {plot.location}</span>
              <span>🧱 {plot.soilType}</span>
              <span>📏 {plot.area} acres</span>
              <StatusBadge status={plot.status} />
            </div>
          </div>

          <WeatherCard />
        </div>
      </div>
    </>
  );
}
