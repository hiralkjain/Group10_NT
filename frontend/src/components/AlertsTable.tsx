// const alerts = [
//   {
//     id: 1,
//     name: "CPU Usage High",
//     priority: "Critical",
//     created: "2m ago",
//     duration: "2m",
//   },
//   {
//     id: 2,
//     name: "DB Connection Timeout",
//     priority: "High",
//     created: "5m ago",
//     duration: "5m",
//   },
//   {
//     id: 3,
//     name: "Disk Space Warning",
//     priority: "Medium",
//     created: "10m ago",
//     duration: "10m",
//   },
//   {
//     id: 4,
//     name: "Memory Usage Warning",
//     priority: "Low",
//     created: "15m ago",
//     duration: "15m",
//   },
// ];

// export default function AlertsTable() {
//   return (
//     <div className="bg-slate-900 rounded-2xl border border-slate-800 mt-6">
//       <table className="w-full text-sm text-left text-gray-300">
//         <thead className="text-xs uppercase bg-slate-800 text-gray-400">
//           <tr>
//             <th className="px-6 py-3">Priority</th>
//             <th className="px-6 py-3">Created</th>
//             <th className="px-6 py-3">Duration</th>
//             <th className="px-6 py-3">Issue</th>
//           </tr>
//         </thead>
//         <tbody>
//           {alerts.map((alert) => (
//             <tr
//               key={alert.id}
//               className="border-b border-slate-800 hover:bg-slate-800"
//             >
//               <td className="px-6 py-4">
//                 <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
//                   {alert.priority}
//                 </span>
//               </td>
//               <td className="px-6 py-4">{alert.created}</td>
//               <td className="px-6 py-4">{alert.duration}</td>
//               <td className="px-6 py-4">{alert.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

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
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    case "High":
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
    case "Medium":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Low":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "";
  }
};

export default function AlertsTable() {
  return (
    <div
      className="
      bg-white dark:bg-gray-900
      rounded-2xl shadow-lg
      border border-gray-200 dark:border-gray-800
      mt-8 overflow-hidden
      transition-colors duration-300
    "
    >
      <table className="w-full text-sm text-left">
        <thead
          className="
          text-xs uppercase
          bg-gray-100 dark:bg-gray-800
          text-gray-600 dark:text-gray-400
        "
        >
          <tr>
            <th className="px-6 py-4">Priority</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4">Duration</th>
            <th className="px-6 py-4">Issue</th>
          </tr>
        </thead>

        <tbody className="text-gray-700 dark:text-gray-200">
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className="
                border-t border-gray-200 dark:border-gray-800
                hover:bg-gray-50 dark:hover:bg-gray-800
                transition
              "
            >
              <td className="px-6 py-4">
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${getPriorityStyle(alert.priority)}
                  `}
                >
                  {alert.priority}
                </span>
              </td>

              <td className="px-6 py-4">{alert.created}</td>
              <td className="px-6 py-4">{alert.duration}</td>
              <td className="px-6 py-4 font-medium">{alert.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}