interface Props {
  logs: any[];
}

const LogsTable = ({ logs }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Timestamp</th>
            <th className="p-2 text-left">Level</th>
            <th className="p-2 text-left">Logger</th>
            <th className="p-2 text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">{log.timestamp}</td>
              <td className="p-2">{log.level}</td>
              <td className="p-2">{log.logger}</td>
              <td className="p-2">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;
