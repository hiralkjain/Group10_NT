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
  // Using a consistent slate color for grid and axis lines that works in both modes
  const axisStroke = "#64748b"; 

  return (
    <div
      className="
      bg-white dark:bg-black
      rounded-[2rem] shadow-sm
      border border-gray-200 dark:border-white/10
      p-4 sm:p-6 transition-all duration-300
    "
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-slate-400">
          Alerts Overview
        </h3>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
           <span className="text-[10px] font-bold text-gray-400 uppercase">Live Feed</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* Horizontal grid lines for better readability */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={axisStroke} 
              opacity={0.1} 
            />

            <XAxis
              dataKey="date"
              stroke={axisStroke}
              fontSize={11}
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
            />

            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{
                backgroundColor: "#000",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "bold"
              }}
              itemStyle={{ color: "#ef4444" }}
            />

            <Bar 
              dataKey="critical" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]} 
              barSize={132}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}