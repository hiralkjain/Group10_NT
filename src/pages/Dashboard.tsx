import React, { useContext, useMemo, useState } from "react";
import { LogContext } from "../context/LogContext";
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

import { Log } from "../types/log";

// ---------- Helpers ----------
function groupByMinute(logs: Log[]) {
  const map: Record<string, any> = {};

  logs.forEach((log) => {
    const date = log.timestamp;

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

function countByService(logs: Log[]) {
  const map: Record<string, number> = {};

  logs.forEach((log) => {
    if (log.level === "ERROR") {
      map[log.service] = (map[log.service] || 0) + 1;
    }
  });

  return Object.entries(map).map(([service, count]) => ({
    service,
    count,
  }));
}

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

function generateAlerts(logs: Log[]) {
  const alerts: any[] = [];

  const lastLogs = logs.slice(-100);

  const errorCount = lastLogs.filter((l) => l.level === "ERROR").length;

  if (errorCount > 10) {
    alerts.push({
      name: "High Error Rate",
      severity: "HIGH",
      reason: `${errorCount} errors in last 100 logs`,
    });
  }

  const slow = logs.filter((l) => l.message.includes("longer than expected"));

  if (slow.length > 5) {
    alerts.push({
      name: "Performance Issue",
      severity: "MEDIUM",
      reason: `${slow.length} slow operations detected`,
    });
  }

  return alerts;
}

function getLevelColor(level: string) {
  if (level === "ERROR") return "bg-red-100 text-red-700";

  if (level === "WARN") return "bg-yellow-100 text-yellow-700";

  if (level === "INFO") return "bg-green-100 text-green-700";

  return "bg-gray-100 text-gray-700";
}

// ---------- Dashboard ----------
export default function Dashboard() {
  const context = useContext(LogContext);

  if (!context) throw new Error("Must use inside provider");

  const { logs } = context;

  const [levelFilter, setLevelFilter] = useState("ALL");

  const [keyword, setKeyword] = useState("");

  const filteredLogs = useMemo(() => {
    return logs.filter((log: Log) => {
      if (levelFilter !== "ALL" && log.level !== levelFilter) return false;

      if (keyword && !log.message.toLowerCase().includes(keyword.toLowerCase()))
        return false;

      return true;
    });
  }, [logs, levelFilter, keyword]);

  const stats = useMemo(() => {
    return {
      total: filteredLogs.length,
      error: filteredLogs.filter((l) => l.level === "ERROR").length,
      warn: filteredLogs.filter((l) => l.level === "WARN").length,
      info: filteredLogs.filter((l) => l.level === "INFO").length,
    };
  }, [filteredLogs]);

  const alerts = generateAlerts(filteredLogs);

  const trend = groupByMinute(filteredLogs);

  const serviceData = countByService(filteredLogs);

  const levelData = levelDistribution(filteredLogs);

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
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
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="ALL">ALL</option>
          <option value="ERROR">ERROR</option>
          <option value="WARN">WARN</option>
          <option value="INFO">INFO</option>
        </select>

        <input
          className="border p-2 rounded flex-1"
          placeholder="Search keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Error Trend">
          <ResponsiveContainer width="100%" height={250}>
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

        <ChartCard title="Errors by Service">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={serviceData}>
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Pie */}
      <ChartCard title="Log Distribution">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={levelData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {levelData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Alerts */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Active Alerts</h2>

        {alerts.length === 0 && <p>No alerts</p>}

        {alerts.map((alert, i) => (
          <div key={i} className="flex justify-between border p-2 rounded mb-2">
            <div>
              <p className="font-semibold">{alert.name}</p>
              <p className="text-sm text-gray-500">{alert.reason}</p>
            </div>

            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
              {alert.severity}
            </span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow overflow-auto">
        <h2 className="font-semibold mb-2">Logs</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th>Time</th>
              <th>Level</th>
              <th>Service</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.slice(-50).map((log, i) => (
              <tr key={i} className="border-b">
                <td>{log.timestamp.toString()}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${getLevelColor(
                      log.level,
                    )}`}
                  >
                    {log.level}
                  </span>
                </td>

                <td>{log.service}</td>

                <td>{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Components ----------
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
