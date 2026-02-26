import LogRow from "./LogRow";
import { Log } from "../../types/log";

interface LogTableProps {
  logs: Log[];
}

function LogTable({ logs }: LogTableProps) {
  return (
    <div
      style={{
        background: "white",
        padding: "16px",
        borderRadius: "6px",
      }}
    >
      <h3>Logs</h3>

      <table width="100%">
        <thead>
          <tr>
            <th align="left">Time</th>
            <th align="left">Level</th>
            <th align="left">Service</th>
            <th align="left">Message</th>
          </tr>
        </thead>

        <tbody>
          {logs.slice(0, 50).map((log, i) => (
            <LogRow key={i} log={log} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogTable;
