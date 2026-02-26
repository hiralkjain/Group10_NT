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
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { motion } from "framer-motion";

import { Log } from "../types/logs";

// ================= Helpers =================

// group logs by minute
function groupByMinute(logs: Log[]) {
  const map: Record<string, any> = {};

  logs.forEach((log) => {
    const date = new Date(log.timestamp);

    const minute =
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0");

    if (!map[minute]) {
      map[minute] = {
        time: minute,
        INFO: 0,
        WARN: 0,
        ERROR: 0,
      };
    }

    if (map[minute][log.level] !== undefined) {
      map[minute][log.level]++;
    }
  });

  return Object.values(map);
}

// UPDATED: Count logs by service based on the current filtered set
function countCurrentByService(logs: Log[]) {
  const map: Record<string, number> = {};
  logs.forEach((log) => {
    map[log.service] = (map[log.service] || 0) + 1;
  });
  return Object.entries(map).map(([service, count]) => ({
    service,
    count,
  }));
}

// log level distribution
function levelDistribution(logs: Log[]) {
  const map: Record<string, number> = {
    INFO: 0,
    WARN: 0,
    ERROR: 0,
  };

  logs.forEach((log) => {
    if (map[log.level] !== undefined) {
      map[log.level]++;
    }
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}

// alert engine
function generateAlerts(logs: Log[]) {
  const alerts: any[] = [];

  const sorted = [...logs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const last100 = sorted.slice(0, 100);

  const errorCount = last100.filter((l) => l.level === "ERROR").length;

  if (errorCount > 10) {
    alerts.push({
      name: "High Error Rate",
      severity: "HIGH",
      reason: `${errorCount} errors in last 100 logs`,
    });
  }

  return alerts;
}

// level color
function getLevelColor(level: string) {
  if (level === "ERROR") return "bg-red-100 text-red-700";

  if (level === "WARN") return "bg-yellow-100 text-yellow-700";

  if (level === "INFO") return "bg-green-100 text-green-700";

  return "bg-gray-100 text-gray-700";
}

// ================= Dashboard =================

export default function Dashboard() {
  const context = useContext(LogContext);

  if (!context) throw new Error("Must use inside LogProvider");

  const { logs: initialLogs } = context;

  const [logs, setLogs] = useState<Log[]>(initialLogs);

  const [levelFilter, setLevelFilter] = useState("ALL");

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const filters = {
          levels: levelFilter === "ALL" ? null : [levelFilter],

          message_keyword: keyword || null,

          logger_contains: null,

          regex: null,

          from_time: null,

          to_time: null,

          last_minutes: null,

          start_datetime: null,

          end_datetime: null,
        };

        const response = await filterLogs(filters);

        const parsed = response.results.map((log: any) => ({
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

  // stats
  const stats = useMemo(
    () => ({
      total: logs.length,

      error: logs.filter((l) => l.level === "ERROR").length,

      warn: logs.filter((l) => l.level === "WARN").length,

      info: logs.filter((l) => l.level === "INFO").length,
    }),
    [logs],
  );

  const alerts = generateAlerts(logs);

  const trend = groupByMinute(logs);
// Dynamic Bar Chart styling based on selection
  const barConfig = {
    title: levelFilter === "ALL" ? "Logs by Service" : `${levelFilter}s by Service`,
    color: levelFilter === "ERROR" ? "#ef4444" : 
           levelFilter === "WARN" ? "#facc15" : 
           levelFilter === "INFO" ? "#22c55e" : "#3b82f6"
  };
  const serviceData = countCurrentByService(logs);

  const levelData = levelDistribution(logs);

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  // ================= UI =================

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <motion.h1
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="text-3xl font-bold"
      >
        Log Monitoring Dashboard
      </motion.h1>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Logs" value={stats.total} />

        <StatCard title="Errors" value={stats.error} />

        <StatCard title="Warnings" value={stats.warn} />

        <StatCard title="Info" value={stats.info} />
      </div>

      {/* Filters */}

      <div className="bg-white p-4 rounded shadow flex gap-4">
        <select
          className="border p-2 rounded"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="ALL">ALL</option>

          <option value="ERROR">ERROR</option>

          <option value="WARN">WARN</option>

          <option value="INFO">INFO</option>
        </select>

        <input
          className="border p-2 rounded flex-1"
          placeholder="Search keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Error Trend">
          <ResponsiveContainer height={250}>
            <LineChart data={trend}>
              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line dataKey="ERROR" stroke="#ef4444" />

              <Line dataKey="WARN" stroke="#facc15" />

              <Line dataKey="INFO" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Critical Errors by Service">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData}>
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

// ================= Components =================

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500">{title}</p>

      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">{title}</h2>

      {children}
    </div>
  );
}
