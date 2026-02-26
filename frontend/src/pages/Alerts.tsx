import { useState } from "react";
import { motion } from "framer-motion";

type Priority = "Low" | "Medium" | "High" | "Critical";
type Status = "Open" | "Investigating" | "Resolved";

interface Alert {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    title: "CPU Usage Spike",
    description: "Server CPU usage exceeded 85%",
    priority: "High",
    status: "Open",
    createdAt: "2026-02-25",
  },
  {
    id: 2,
    title: "Database Connection Timeout",
    description: "Multiple DB timeouts detected",
    priority: "Critical",
    status: "Investigating",
    createdAt: "2026-02-24",
  },
  {
    id: 3,
    title: "Disk Space Warning",
    description: "Disk usage reached 75%",
    priority: "Medium",
    status: "Resolved",
    createdAt: "2026-02-23",
  },
];

const priorityColors: Record<Priority, string> = {
  Low: "bg-green-500/20 text-green-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  High: "bg-orange-500/20 text-orange-400",
  Critical: "bg-red-500/20 text-red-400",
};

const statusColors: Record<Status, string> = {
  Open: "bg-blue-500/20 text-blue-400",
  Investigating: "bg-purple-500/20 text-purple-400",
  Resolved: "bg-gray-500/20 text-gray-400",
};

export default function Alerts() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Priority | "All">("All");

  const filteredAlerts = mockAlerts
    .filter((alert) => alert.title.toLowerCase().includes(search.toLowerCase()))
    .filter((alert) => (filter === "All" ? true : alert.priority === filter));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
      <h1 className="text-4xl font-bold mb-6 tracking-wide">
        🚨 Alerts Dashboard
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search alerts..."
          className="px-4 py-2 rounded-xl bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded-xl bg-slate-700"
          value={filter}
          onChange={(e) => setFilter(e.target.value as Priority | "All")}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlerts.length === 0 && (
          <p className="text-gray-400">No alerts found.</p>
        )}

        {filteredAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-700/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-slate-600"
          >
            <h2 className="text-xl font-semibold mb-2">{alert.title}</h2>

            <p className="text-gray-300 text-sm mb-4">{alert.description}</p>

            <div className="flex justify-between items-center mb-3">
              <span
                className={`px-3 py-1 text-xs rounded-full ${priorityColors[alert.priority]}`}
              >
                {alert.priority}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${statusColors[alert.status]}`}
              >
                {alert.status}
              </span>
            </div>

            <p className="text-xs text-gray-400">Created: {alert.createdAt}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
