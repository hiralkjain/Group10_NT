import { Log } from "../../types/log";

interface StatsCardProps {
  logs: Log[];
}

function StatsCard({ logs }: StatsCardProps) {
  const errorCount = logs.filter((l) => l.level === "ERROR").length;

  const warnCount = logs.filter((l) => l.level === "WARN").length;

  return (
    <div
      style={{
        background: "white",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "6px",
      }}
    >
      <h3>System Stats</h3>

      <p>Total Logs: {logs.length}</p>

      <p>Error Logs: {errorCount}</p>

      <p>Warning Logs: {warnCount}</p>
    </div>
  );
}

export default StatsCard;
