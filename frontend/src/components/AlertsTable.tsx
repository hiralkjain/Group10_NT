// // const alerts = [
// //   {
// //     id: 1,
// //     name: "CPU Usage High",
// //     priority: "Critical",
// //     created: "2m ago",
// //     duration: "2m",
// //   },
// //   {
// //     id: 2,
// //     name: "DB Connection Timeout",
// //     priority: "High",
// //     created: "5m ago",
// //     duration: "5m",
// //   },
// //   {
// //     id: 3,
// //     name: "Disk Space Warning",
// //     priority: "Medium",
// //     created: "10m ago",
// //     duration: "10m",
// //   },
// //   {
// //     id: 4,
// //     name: "Memory Usage Warning",
// //     priority: "Low",
// //     created: "15m ago",
// //     duration: "15m",
// //   },
// // ];

// // export default function AlertsTable() {
// //   return (
// //     <div className="bg-slate-900 rounded-2xl border border-slate-800 mt-6">
// //       <table className="w-full text-sm text-left text-gray-300">
// //         <thead className="text-xs uppercase bg-slate-800 text-gray-400">
// //           <tr>
// //             <th className="px-6 py-3">Priority</th>
// //             <th className="px-6 py-3">Created</th>
// //             <th className="px-6 py-3">Duration</th>
// //             <th className="px-6 py-3">Issue</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {alerts.map((alert) => (
// //             <tr
// //               key={alert.id}
// //               className="border-b border-slate-800 hover:bg-slate-800"
// //             >
// //               <td className="px-6 py-4">
// //                 <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
// //                   {alert.priority}
// //                 </span>
// //               </td>
// //               <td className="px-6 py-4">{alert.created}</td>
// //               <td className="px-6 py-4">{alert.duration}</td>
// //               <td className="px-6 py-4">{alert.name}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

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

// const getPriorityStyle = (priority: string) => {
//   switch (priority) {
//     case "Critical":
//       return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
//     case "High":
//       return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
//     case "Medium":
//       return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
//     case "Low":
//       return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
//     default:
//       return "";
//   }
// };

// export default function AlertsTable() {
//   return (
//     <div
//       className="
//       bg-white dark:bg-gray-900
//       rounded-2xl shadow-lg
//       border border-gray-200 dark:border-gray-800
//       mt-8 overflow-hidden
//       transition-colors duration-300
//     "
//     >
//       <table className="w-full text-sm text-left">
//         <thead
//           className="
//           text-xs uppercase
//           bg-gray-100 dark:bg-gray-800
//           text-gray-600 dark:text-gray-400
//         "
//         >
//           <tr>
//             <th className="px-6 py-4">Priority</th>
//             <th className="px-6 py-4">Created</th>
//             <th className="px-6 py-4">Duration</th>
//             <th className="px-6 py-4">Issue</th>
//           </tr>
//         </thead>

//         <tbody className="text-gray-700 dark:text-gray-200">
//           {alerts.map((alert) => (
//             <tr
//               key={alert.id}
//               className="
//                 border-t border-gray-200 dark:border-gray-800
//                 hover:bg-gray-50 dark:hover:bg-gray-800
//                 transition
//               "
//             >
//               <td className="px-6 py-4">
//                 <span
//                   className={`
//                     px-3 py-1 rounded-full text-xs font-medium
//                     ${getPriorityStyle(alert.priority)}
//                   `}
//                 >
//                   {alert.priority}
//                 </span>
//               </td>

//               <td className="px-6 py-4">{alert.created}</td>
//               <td className="px-6 py-4">{alert.duration}</td>
//               <td className="px-6 py-4 font-medium">{alert.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

interface BackendAlert {
  type: string;
  why: string;
  timestamp: string;
  severity?: string;
  status?: string;
}

const getPriorityStyle = (type: string) => {
  if (type.includes("CRITICAL"))
    return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
  if (type.includes("ANOMALY"))
    return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
  return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
};

export default function AlertsTable() {
  const [alerts, setAlerts] = useState<BackendAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const fetchAlerts = async () => {
    try {
      // Ensure this matches the port in your main.py (8001)
      const response = await fetch("http://127.0.0.1:8001/alerts");
      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();
      setAlerts(data);
      setLoading(false);
      setIsOffline(false);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      setIsOffline(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    // Polling every 10 seconds as requested
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="mt-8 text-center animate-pulse text-gray-500">
        Connecting to Sentinel...
      </div>
    );

  return (
    <div className="space-y-4">
      {isOffline && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm text-center">
          ⚠️ Connection Lost: Backend at port 8001 is unreachable.
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Issue / Explanation</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 dark:text-gray-200">
            {alerts.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  No logs ingested yet. Start your simulator to see data.
                </td>
              </tr>
            ) : (
              alerts.map((alert, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityStyle(alert.type || "HEALTHY")}`}
                    >
                      {alert.status === "Healthy"
                        ? "Healthy"
                        : alert.type || "Anomaly"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {alert.timestamp
                      ? new Date(alert.timestamp).toLocaleTimeString()
                      : "--:--"}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {alert.status === "Healthy"
                      ? "No anomalies detected"
                      : alert.why}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
