import StatusBadge from "./StatusBadge";
import "./PlotCard.css";

function moistureColor(value) {
  if (value >= 55) return "var(--color-primary)";
  if (value >= 35) return "var(--color-warning)";
  return "var(--color-danger)";
}

export default function PlotCard({ plot, onSelect, selected }) {
  return (
    <div
      className={`card plot-card ${selected ? "plot-card-selected" : ""}`}
      onClick={() => onSelect && onSelect(plot)}
    >
      <div className="plot-card-header">
        <div>
          <h3 className="plot-card-name">{plot.name}</h3>
          <p className="plot-card-id">{plot.id}</p>
        </div>
        <StatusBadge status={plot.status} />
      </div>

      <ul className="plot-card-info">
        <li><span>🌱 Crop Stage</span><strong>{plot.cropStage}</strong></li>
        <li><span>🧱 Soil Type</span><strong>{plot.soilType}</strong></li>
        <li><span>📏 Area</span><strong>{plot.area} acres</strong></li>
        <li><span>📍 Location</span><strong>{plot.location}</strong></li>
      </ul>

      <div className="plot-card-moisture">
        <div className="plot-card-moisture-label">
          <span>Soil Moisture</span>
          <span>{plot.soilMoisture}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${plot.soilMoisture}%`,
              background: moistureColor(plot.soilMoisture),
            }}
          />
        </div>
      </div>

      <p className="plot-card-footer">💧 Last irrigated: {plot.lastIrrigated}</p>
    </div>
  );
}
