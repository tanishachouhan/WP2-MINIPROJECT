const statusMap = {
  Healthy: { class: "badge-healthy", icon: "✅" },
  "Needs Attention": { class: "badge-attention", icon: "⚠️" },
  Critical: { class: "badge-critical", icon: "🚨" },
};

export default function StatusBadge({ status }) {
  const config = statusMap[status] || statusMap.Healthy;
  return (
    <span className={`badge ${config.class}`}>
      <span>{config.icon}</span>
      {status}
    </span>
  );
}
