import { farmer } from "../data/mockData";
import "./Topbar.css";

export default function Topbar({ title, subtitle, onMenuClick }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onMenuClick} aria-label="Open menu">
          ☰
        </button>
        <div>
          <h2 className="topbar-title">{title}</h2>
          {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="topbar-right">
        <span className="topbar-date">📅 21 Aug 2026</span>
        <div className="topbar-user">
          <div className="topbar-avatar">👨‍🌾</div>
          <div>
            <p className="topbar-user-name">{farmer.name}</p>
            <p className="topbar-user-sub">{farmer.village}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
