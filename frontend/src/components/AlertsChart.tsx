// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { date: "Feb 20", critical: 2 },
//   { date: "Feb 21", critical: 5 },
//   { date: "Feb 22", critical: 1 },
//   { date: "Feb 23", critical: 8 },
//   { date: "Feb 24", critical: 3 },
// ];

// export default function AlertsChart() {
//   return (
//     <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
//       <h2 className="text-lg text-white mb-4">Alerts Timeline</h2>

//       <ResponsiveContainer width="100%" height={250}>
//         <BarChart data={data}>
//           <XAxis dataKey="date" stroke="#94a3b8" />
//           <YAxis stroke="#94a3b8" />
//           <Tooltip />
//           <Bar dataKey="critical" fill="#ef4444" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default function AlertsChart() {

//   return (
//     <div
//       className="
//       bg-white dark:bg-gray-900
//       rounded-2xl shadow-lg
//       border border-gray-200 dark:border-gray-800
//       p-6 transition-colors duration-300
//     "
//     >
//       <h3
//         className="text-lg font-semibold mb-4
//                      text-gray-800 dark:text-white"
//       >
//         Alerts Overview
//       </h3>

//       <div
//         className="
//         h-40 flex items-center justify-center
//         text-gray-400
//       "
//       >
//         Chart Placeholder
//       </div>
//     </div>
//   );
// }

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "Feb 20", critical: 2 },
  { date: "Feb 21", critical: 5 },
  { date: "Feb 22", critical: 1 },
  { date: "Feb 23", critical: 8 },
  { date: "Feb 24", critical: 3 },
];

export default function AlertsChart() {
  return (
    <div
      className="
      bg-white dark:bg-gray-900
      rounded-2xl shadow-lg
      border border-gray-200 dark:border-gray-800
      p-6 transition-colors duration-300
    "
    >
      <h3
        className="text-lg font-semibold mb-4
                   text-gray-800 dark:text-white"
      >
        Alerts Overview
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

            <XAxis
              dataKey="date"
              stroke="currentColor"
              className="text-gray-500 dark:text-gray-400"
            />

            <YAxis
              stroke="currentColor"
              className="text-gray-500 dark:text-gray-400"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                border: "none",
              }}
              labelStyle={{ color: "#fff" }}
            />

            <Bar dataKey="critical" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
