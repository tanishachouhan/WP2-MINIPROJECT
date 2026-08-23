import { useState } from "react";
import "./AdvisoryCard.css";

const priorityClass = {
  High: "badge-critical",
  Medium: "badge-attention",
  Low: "badge-healthy",
};

export default function AdvisoryCard({ advisory }) {
  const [lang, setLang] = useState("en");

  return (
    <div className="card advisory-card">
      <div className="advisory-card-top">
        <div className="advisory-card-icon">{advisory.icon}</div>
        <div className="advisory-card-meta">
          <p className="advisory-card-type">{advisory.type} • {advisory.plot}</p>
          <p className="advisory-card-time">{advisory.time}</p>
        </div>
        <span className={`badge ${priorityClass[advisory.priority]}`}>
          {advisory.priority}
        </span>
      </div>

      <p className="advisory-card-message">
        {lang === "en" ? advisory.message_en : advisory.message_mr}
      </p>

      <div className="advisory-card-actions">
        <button
          className={`lang-btn ${lang === "en" ? "lang-btn-active" : ""}`}
          onClick={() => setLang("en")}
        >
          English
        </button>
        <button
          className={`lang-btn ${lang === "mr" ? "lang-btn-active" : ""}`}
          onClick={() => setLang("mr")}
        >
          मराठी
        </button>
      </div>
    </div>
  );
}
