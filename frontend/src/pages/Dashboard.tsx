import React, { useContext, useMemo, useState, useEffect } from "react";
import LogContext from "../context/LogContext";
import { filterLogs } from "../api/logsApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { Log } from "../types/logs";

// --- Utility Functions ---
function groupByMinute(logs: Log[]) {
  const map: Record<string, any> = {};
  logs.forEach((log) => {
    const date = new Date(log.timestamp);
    if (isNaN(date.getTime())) return;
    const minute = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

    if (!map[minute]) {
      map[minute] = { time: minute, INFO: 0, WARN: 0, ERROR: 0 };
    }
    if (map[minute][log.level] !== undefined) {
      map[minute][log.level]++;
    }
  });
  return Object.values(map);
}

function countCurrentByService(logs: Log[]) {
  const map: Record<string, number> = {};
  logs.forEach((log) => {
    map[log.service] = (map[log.service] || 0) + 1;
  });
  return Object.entries(map).map(([service, count]) => ({ service, count }));
}

export default function Dashboard() {
  const context = useContext(LogContext);
  if (!context) throw new Error("Must use inside LogProvider");

  const { logs: initialLogs } = context;
  const [logs, setLogs] = useState<Log[]>(initialLogs || []);
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const filters = {
          levels: levelFilter === "ALL" ? null : [levelFilter],
          message_keyword: keyword || null,
        };
        const response = await filterLogs(filters);
        const rawData = response?.results || response || [];
        const parsed = rawData.map((log: any) => ({
          timestamp: new Date(log.timestamp),
          level: log.level,
          service: log.service,
          message: log.message,
        }));
        setLogs(parsed);
      } catch (err) {
        console.error("Filter API error:", err);
      }
    }
    fetchLogs();
  }, [levelFilter, keyword]);

  const stats = useMemo(
    () => ({
      total: logs.length,
      error: logs.filter((l) => l.level === "ERROR").length,
      warn: logs.filter((l) => l.level === "WARN").length,
      info: logs.filter((l) => l.level === "INFO").length,
    }),
    [logs],
  );

  const trend = groupByMinute(logs);
  const serviceData = countCurrentByService(logs);

  const barConfig = {
    title:
      levelFilter === "ALL" ? "Logs by Service" : `${levelFilter}s by Service`,
    color:
      levelFilter === "ERROR"
        ? "#ef4444"
        : levelFilter === "WARN"
          ? "#facc15"
          : levelFilter === "INFO"
            ? "#22c55e"
            : "#3b82f6",
  };

  // Axis Color: Darker for light mode, slightly lighter for OLED black mode
  const axisColor = "#64748b";
  const gridColor = "rgba(148, 163, 184, 0.1)"; // Very subtle slate

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white"
        >
          Monitoring Dashboard
        </motion.h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Total Logs"
            value={stats.total}
            accent="border-blue-500"
          />
          <StatCard
            title="Errors"
            value={stats.error}
            accent="border-red-500"
          />
          <StatCard
            title="Warnings"
            value={stats.warn}
            accent="border-yellow-500"
          />
          <StatCard title="Info" value={stats.info} accent="border-green-500" />
        </div>

        {/* Filters Bar */}
        <div
          className="
  bg-white dark:bg-slate-900 
  p-4 rounded-[2rem] shadow-sm 
  border border-slate-200 dark:border-white/10 
  flex flex-col md:flex-row gap-4 
  transition-colors duration-300
"
        >
          {/* Level Selector */}
          <div className="relative w-full md:w-48">
            <select
              className="
        w-full appearance-none
        bg-slate-50 dark:bg-black 
        text-slate-900 dark:text-slate-200 
        border border-slate-200 dark:border-white/10 
        p-3 rounded-2xl 
        focus:ring-2 focus:ring-blue-500 outline-none 
        transition-all cursor-pointer text-sm font-bold
      "
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="ALL" className="bg-white dark:bg-slate-900">
                All Levels
              </option>
              <option
                value="ERROR"
                className="bg-white dark:bg-slate-900 text-red-500"
              >
                ERROR
              </option>
              <option
                value="WARN"
                className="bg-white dark:bg-slate-900 text-yellow-500"
              >
                WARN
              </option>
              <option
                value="INFO"
                className="bg-white dark:bg-slate-900 text-green-500"
              >
                INFO
              </option>
            </select>

            {/* Custom Arrow for the Select */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              className="
        w-full 
        bg-slate-50 dark:bg-black 
        text-slate-900 dark:text-white 
        placeholder-slate-400 dark:placeholder-slate-600
        border border-slate-200 dark:border-white/10 
        p-3 rounded-2xl 
        focus:ring-2 focus:ring-blue-500 outline-none 
        transition-all text-sm font-medium
      "
              placeholder="Search service or message..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            {/* Decorative Search Icon placeholder (Optional) */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-20 dark:opacity-10">
              <svg
                className="w-4 h-4 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          <ChartCard title="Log Volume Trend (Per Minute)">
            <div className="h-[280px] sm:h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trend}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={gridColor}
                  />
                  <XAxis
                    dataKey="time"
                    stroke={axisColor}
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                    tick={{ dy: 10 }}
                  />
                  <YAxis
                    stroke={axisColor}
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                    tick={{ dx: -5 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#000",
                      border: "1px solid #333",
                      borderRadius: "12px",
                      color: "#f8fafc",
                    }}
                    itemStyle={{ fontSize: "12px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ERROR"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={false}
                    animationDuration={1000}
                  />
                  <Line
                    type="monotone"
                    dataKey="WARN"
                    stroke="#facc15"
                    strokeWidth={3}
                    dot={false}
                    animationDuration={1200}
                  />
                  <Line
                    type="monotone"
                    dataKey="INFO"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                    animationDuration={1400}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title={barConfig.title}>
            <div className="h-[280px] sm:h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={serviceData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={gridColor}
                  />
                  <XAxis
                    dataKey="service"
                    stroke={axisColor}
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                    tick={{ dy: 10 }}
                  />
                  <YAxis
                    stroke={axisColor}
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                    tick={{ dx: -5 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={{
                      backgroundColor: "#000",
                      border: "1px solid #333",
                      borderRadius: "12px",
                      color: "#f8fafc",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill={barConfig.color}
                    radius={[6, 6, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components ---

function StatCard({
  title,
  value,
  accent,
}: {
  title: string;
  value: number | string;
  accent: string;
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl shadow-sm border-l-4 ${accent} border-y border-r dark:border-y-white/5 dark:border-r-white/5 transition-all hover:translate-y-[-2px]`}
    >
      <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {title}
      </p>
      <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-white/10 transition-all">
      <h2 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  );
}
