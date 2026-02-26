import { Log } from "../../types/log";

interface AlertListProps {
  logs: Log[];
}

function AlertList({ logs }: AlertListProps) {

  const errorCount =
    logs.filter(log => log.level === "ERROR").length;

  if (errorCount < 10) {
    return null;
  }

  return (
    <div
      style={{
        background: "#fee2e2",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "6px",
        border: "1px solid #fecaca"
      }}
    >

      <strong style={{ color: "#b91c1c" }}>
        High Error Rate Alert
      </strong>

      <p style={{ marginTop: "6px" }}>
        {errorCount} error logs detected in system
      </p>

    </div>
  );

}

export default AlertList;