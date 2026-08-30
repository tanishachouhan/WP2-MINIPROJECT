import { useState } from "react";
import Topbar from "../components/Topbar";
import AdvisoryCard from "../components/AdvisoryCard";
import { advisories } from "../data/mockData";
import "./AIAdvisory.css";

const filters = ["All", "Irrigation", "Weather", "Crop", "Pump"];

export default function AIAdvisory({ onMenuClick }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? advisories
      : advisories.filter((a) => a.type === activeFilter);

  return (
    <>
      <Topbar
        title="AI Advisory"
        subtitle="Simple, farmer-friendly advisories generated from farm data"
        onMenuClick={onMenuClick}
      />

      <div className="page-content">
        <div className="advisory-filter-bar">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-chip ${activeFilter === f ? "filter-chip-active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="section-subtitle">
          {filtered.length} advisor{filtered.length === 1 ? "y" : "ies"} found · Tap English / मराठी to change language
        </p>

        <div className="advisory-grid">
          {filtered.map((a) => (
            <AdvisoryCard key={a.id} advisory={a} />
          ))}
        </div>
      </div>
    </>
  );
}
