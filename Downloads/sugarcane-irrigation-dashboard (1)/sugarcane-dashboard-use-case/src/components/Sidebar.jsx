import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: "🏠", end: true },
  { to: "/farm-plots", label: "Farm & Plots", icon: "🌾" },
  { to: "/irrigation-prediction", label: "Irrigation Prediction", icon: "💧" },
  { to: "/ai-advisory", label: "AI Advisory", icon: "📢" },
];

export default function Sidebar({ open, onClose, onLogout }) {
  return (
    <>
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <span className="sidebar-logo">🌱</span>
          <div>
            <h1 className="sidebar-title">AgriSmart</h1>
            <p className="sidebar-tagline">Smart Sugarcane Irrigation</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                "sidebar-link" + (isActive ? " sidebar-link-active" : "")
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={onLogout}>
          Logout
          </button>
          <p>Web Programming-II Mini-Project</p>
          <p className="sidebar-footer-sub">Dept. of IT Engineering</p>
        </div>
      </aside>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
    </>
  );
}
