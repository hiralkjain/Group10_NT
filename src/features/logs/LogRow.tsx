import { Log } from "../../types/log";

interface LogRowProps {
  log: Log;
}

function LogRow({ log }: LogRowProps) {
  return (
    <tr>
      <td>{log.timestamp.toLocaleString()}</td>

      <td>{log.level}</td>

      <td>{log.service}</td>

      <td>{log.message}</td>
    </tr>
  );
}

export default LogRow;