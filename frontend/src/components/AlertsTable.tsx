const alerts = [
  {
    id: 1,
    name: "CPU Usage High",
    priority: "Critical",
    created: "2m ago",
    duration: "2m",
  },
  {
    id: 2,
    name: "DB Connection Timeout",
    priority: "High",
    created: "5m ago",
    duration: "5m",
  },
  {
    id: 3,
    name: "Disk Space Warning",
    priority: "Medium",
    created: "10m ago",
    duration: "10m",
  },
  {
    id: 4,
    name: "Memory Usage Warning",
    priority: "Low",
    created: "15m ago",
    duration: "15m",
  },
];

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20";
    case "High":
      return "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20";
    case "Medium":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20";
    case "Low":
      return "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20";
    default:
      return "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400";
  }
};

export default function AlertsTable() {
  return (
    <div
      className="
      bg-white dark:bg-black
       border-slate-200 dark:border-white/10
     overflow-hidden
      transition-all duration-300
    "
    >
      {/* Desktop Table View */}
      <table className="hidden md:table w-full text-sm text-left">
        <thead
          className="
          text-[10px] font-black uppercase tracking-widest
          bg-slate-50 dark:bg-white/[0.02]
          text-slate-500 dark:text-slate-400
          border-b border-slate-200 dark:border-white/10
        "
        >
          <tr>
            <th className="px-8 py-5">Priority</th>
            <th className="px-8 py-5">Issue</th>
            <th className="px-8 py-5">Created</th>
            <th className="px-8 py-5 text-right">Duration</th>
          </tr>
        </thead>

        <tbody className="text-slate-700 dark:text-slate-200">
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className="
                border-b border-slate-100 dark:border-white/5
                hover:bg-slate-50 dark:hover:bg-white/[0.03]
                transition-colors
              "
            >
              <td className="px-8 py-5">
                <span
                  className={`
                    px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight
                    ${getPriorityStyle(alert.priority)}
                  `}
                >
                  {alert.priority}
                </span>
              </td>
              <td className="px-8 py-5 font-bold tracking-tight">{alert.name}</td>
              <td className="px-8 py-5 text-slate-500 dark:text-slate-400">{alert.created}</td>
              <td className="px-8 py-5 text-right font-mono text-xs">{alert.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile "Card" View */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-white/5">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-6 space-y-3">
            <div className="flex justify-between items-start">
              <span
                className={`
                  px-3 py-1 rounded-lg text-[10px] font-black uppercase
                  ${getPriorityStyle(alert.priority)}
                `}
              >
                {alert.priority}
              </span>
              <span className="text-xs font-mono text-slate-400">{alert.created}</span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white tracking-tight">
              {alert.name}
            </h4>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
              Duration: <span className="dark:text-slate-200 font-mono">{alert.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}