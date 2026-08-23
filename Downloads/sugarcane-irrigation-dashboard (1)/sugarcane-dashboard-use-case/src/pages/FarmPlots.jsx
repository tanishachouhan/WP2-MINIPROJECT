import Topbar from "../components/Topbar";
import PlotCard from "../components/PlotCard";
import { farmer, plots } from "../data/mockData";
import "./FarmPlots.css";

export default function FarmPlots({ onMenuClick }) {
  return (
    <>
      <Topbar
        title="Farm & Plots"
        subtitle="Farmer details and plot-wise field information"
        onMenuClick={onMenuClick}
      />

      <div className="page-content">
        <div className="card farmer-card">
          <div className="farmer-avatar">👨‍🌾</div>
          <div className="farmer-details">
            <h3>{farmer.name}</h3>
            <p>{farmer.village}, {farmer.state}</p>
            <div className="farmer-meta">
              <span>📞 {farmer.phone}</span>
              <span>🌾 {farmer.totalPlots} Plots</span>
              <span>📏 {farmer.totalArea} acres total</span>
            </div>
          </div>
        </div>

        <div className="section-header" style={{ marginTop: 22 }}>
          <h3 className="section-title">All Plots</h3>
        </div>
        <p className="section-subtitle">Tap a plot to view its details</p>

        <div className="plot-grid-full">
          {plots.map((plot) => (
            <PlotCard key={plot.id} plot={plot} />
          ))}
        </div>
      </div>
    </>
  );
}
