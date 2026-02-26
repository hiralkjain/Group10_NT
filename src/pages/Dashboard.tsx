import { useContext } from "react";
import { LogContext } from "../context/LogContext";

import StatsCard from "../features/stats/StatsCard";
import AlertList from "../features/alerts/AlertList";
import LogTable from "../features/logs/LogTable";

function Dashboard() {

  const context = useContext(LogContext);

  if (!context) {
    throw new Error("Dashboard must be used inside LogProvider");
  }

  const { logs } = context;

  return (
    <div>

      <StatsCard logs={logs} />

      <AlertList logs={logs} />

      <LogTable logs={logs} />

    </div>
  );
}

export default Dashboard;