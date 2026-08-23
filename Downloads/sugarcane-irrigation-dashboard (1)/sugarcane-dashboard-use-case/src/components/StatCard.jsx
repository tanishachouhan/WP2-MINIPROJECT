import "./StatCard.css";

export default function StatCard({ icon, label, value, sub, tone = "primary" }) {
  return (
    <div className={`card stat-card stat-card-${tone}`}>
      <div className="stat-card-icon">{icon}</div>
      <div>
        <p className="stat-card-value">{value}</p>
        <p className="stat-card-label">{label}</p>
        {sub && <p className="stat-card-sub">{sub}</p>}
      </div>
    </div>
  );
}
