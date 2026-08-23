import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import WeatherCard from "../components/WeatherCard";
import { farmer, plots, pumpSchedule, irrigationPredictions } from "../data/mockData";
import "./Dashboard.css";

export default function Dashboard({ onMenuClick }) {
  const criticalPlots = plots.filter((p) => p.status === "Critical").length;
  const avgMoisture = Math.round(
    plots.reduce((sum, p) => sum + p.soilMoisture, 0) / plots.length
  );
  const urgentPlot = plots.find((p) => p.status === "Critical") || plots[0];
  const urgentPrediction = irrigationPredictions[urgentPlot.id];

  return (
    <>
      <Topbar
        title={`Welcome back, ${farmer.name.split(" ")[0]} 👋`}
        subtitle="Here's your complete sugarcane farm overview for today"
        onMenuClick={onMenuClick}
      />

      <div className="page-content">
        {/* KPI Row */}
        <div className="stat-grid">
          <StatCard icon="🌾" label="Total Plots" value={farmer.totalPlots} sub={`${farmer.totalArea} acres total`} tone="primary" />
          <StatCard icon="💧" label="Avg. Soil Moisture" value={`${avgMoisture}%`} sub="Across all plots" tone="water" />
          <StatCard icon="🚨" label="Plots Needing Water" value={criticalPlots} sub="Action needed today" tone="danger" />
          <StatCard icon="⚙️" label="Pumps Scheduled" value={pumpSchedule.length} sub="Next 3 days" tone="warning" />
        </div>

        {/* Most urgent recommendation */}
        <div className="card highlight-card">
          <div className="highlight-card-header">
            <div>
              <p className="highlight-card-eyebrow">🔔 Most Urgent Recommendation</p>
              <h3>{urgentPlot.name}</h3>
            </div>
            <span className="badge badge-critical">{urgentPlot.status}</span>
          </div>
          <p className="highlight-card-text">{urgentPrediction.reason}</p>
          <div className="highlight-card-stats">
            <div>
              <p className="highlight-label">Next Irrigation</p>
              <p className="highlight-value">{urgentPrediction.nextIrrigationDate}</p>
            </div>
            <div>
              <p className="highlight-label">Water Required</p>
              <p className="highlight-value">{urgentPrediction.waterRequired}</p>
            </div>
            <div>
              <p className="highlight-label">AI Confidence</p>
              <p className="highlight-value">{urgentPrediction.confidence}%</p>
            </div>
          </div>
          <Link to="/irrigation-prediction" className="highlight-card-btn">
            View Full Prediction →
          </Link>
        </div>

        {/* Weather + Pump schedule */}
        <div className="dashboard-grid">
          <div className="card pump-card">
            <h3 className="section-title" style={{ marginBottom: 12 }}>⚙️ Pump Schedule</h3>
            <table className="pump-table">
              <thead>
                <tr>
                  <th>Plot</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pumpSchedule.map((p, i) => (
                  <tr key={i}>
                    <td>{p.plot}</td>
                    <td>{p.time}</td>
                    <td>{p.duration}</td>
                    <td>
                      <span className="badge badge-info">{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <WeatherCard />
        </div>
      </div>
    </>
  );
}
