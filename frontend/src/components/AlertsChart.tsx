// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const data = [
//   { date: "Feb 20", critical: 2 },
//   { date: "Feb 21", critical: 5 },
//   { date: "Feb 22", critical: 1 },
//   { date: "Feb 23", critical: 8 },
//   { date: "Feb 24", critical: 3 },
// ];

// export default function AlertsChart() {
//   // Using a consistent slate color for grid and axis lines that works in both modes
//   const axisStroke = "#64748b";

//   return (
//     <div
//       className="
//       bg-white dark:bg-black
//       rounded-[2rem] shadow-sm
//       border border-gray-200 dark:border-white/10
//       p-4 sm:p-6 transition-all duration-300
//     "
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-slate-400">
//           Alerts Overview
//         </h3>
//         <div className="flex gap-2">
//            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//            <span className="text-[10px] font-bold text-gray-400 uppercase">Live Feed</span>
//         </div>
//       </div>

//       <div className="h-64 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//             {/* Horizontal grid lines for better readability */}
//             <CartesianGrid
//               strokeDasharray="3 3"
//               vertical={false}
//               stroke={axisStroke}
//               opacity={0.1}
//             />

//             <XAxis
//               dataKey="date"
//               stroke={axisStroke}
//               fontSize={11}
//               tickLine={false}
//               axisLine={false}
//               dy={10}
//             />

//             <YAxis
//               stroke={axisStroke}
//               fontSize={11}
//               tickLine={false}
//               axisLine={false}
//               dx={-5}
//             />

//             <Tooltip
//               cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
//               contentStyle={{
//                 backgroundColor: "#000",
//                 borderRadius: "12px",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
//                 color: "#fff",
//                 fontSize: "12px",
//                 fontWeight: "bold"
//               }}
//               itemStyle={{ color: "#ef4444" }}
//             />

//             <Bar
//               dataKey="critical"
//               fill="#ef4444"
//               radius={[4, 4, 0, 0]}
//               barSize={132}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Cell,
// } from "recharts";

// // Interface to match your FastAPI backend format
// interface BackendAlert {
//   type: string;
//   why: string;
//   timestamp: string;
//   status?: string;
// }

// export default function AlertsChart({ data }: { data: BackendAlert[] }) {
//   const axisStroke = "#64748b";

//   // 1. Process real-time data to count alerts per date
//   const processData = () => {
//     const counts: Record<string, number> = {};

//     // Sort and take the most recent 15 logs to prevent overcrowding the chart
//     const recentData = [...data].slice(-15);

//     recentData.forEach((alert) => {
//       // Format timestamp to a short date (e.g., "Feb 26")
//       const date = new Date(alert.timestamp).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       });
//       counts[date] = (counts[date] || 0) + 1;
//     });

//     return Object.keys(counts).map((date) => ({
//       date,
//       count: counts[date],
//     }));
//   };

//   const chartData = processData();

//   return (
//     <div
//       className="
//       bg-white dark:bg-black
//       rounded-[2rem] shadow-sm
//       border border-gray-200 dark:border-white/10
//       p-4 sm:p-6 transition-all duration-300
//     "
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-slate-400">
//           Live Incident Volume
//         </h3>
//         <div className="flex gap-2 items-center">
//           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
//             Real-Time Feed
//           </span>
//         </div>
//       </div>

//       <div className="h-64 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={chartData}
//             margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
//           >
//             <CartesianGrid
//               strokeDasharray="3 3"
//               vertical={false}
//               stroke={axisStroke}
//               opacity={0.1}
//             />

//             <XAxis
//               dataKey="date"
//               stroke={axisStroke}
//               fontSize={10}
//               tickLine={false}
//               axisLine={false}
//               dy={10}
//               interval={0} // Ensure all dates are shown
//             />

//             <YAxis
//               stroke={axisStroke}
//               fontSize={11}
//               tickLine={false}
//               axisLine={false}
//               dx={-5}
//               allowDecimals={false} // Logs are discrete counts
//             />

//             <Tooltip
//               cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
//               contentStyle={{
//                 backgroundColor: "#000",
//                 borderRadius: "12px",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
//                 color: "#fff",
//                 fontSize: "12px",
//                 fontWeight: "bold",
//               }}
//             />

//             <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={entry.count > 5 ? "#ef4444" : "#3b82f6"}
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

interface BackendAlert {
  type: string;
  why: string;
  timestamp: string;
  status?: string;
}

export default function AlertsChart({ data = [] }: { data: BackendAlert[] }) {
  const axisStroke = "#64748b";

  // 1. Process real-time data to group by time
  // This converts the list of alerts into a count per time slot
  const processData = () => {
    if (!data || data.length === 0) return [];

    const counts: Record<string, number> = {};

    // Sort data by timestamp to ensure chronological order on the X-Axis
    const sortedData = [...data].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );

    sortedData.forEach((alert) => {
      // Create a readable label (e.g., "22:34")
      const timeLabel = new Date(alert.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      counts[timeLabel] = (counts[timeLabel] || 0) + 1;
    });

    return Object.keys(counts).map((time) => ({
      time,
      count: counts[time],
    }));
  };

  const chartData = processData();

  return (
    <div className="bg-white dark:bg-black rounded-[2rem] shadow-sm border border-gray-200 dark:border-white/10 p-4 sm:p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-slate-400">
          Live Incident Volume
        </h3>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            Real-Time Feed
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs italic">
            Waiting for incident data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={axisStroke}
                opacity={0.1}
              />
              <XAxis
                dataKey="time"
                stroke={axisStroke}
                fontSize={10}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke={axisStroke}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-5}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                contentStyle={{
                  backgroundColor: "#000",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.count > 3 ? "#ef4444" : "#3b82f6"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
