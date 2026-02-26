// import React, {useState} from "react";
// import Sidebar from "../components/Sidebar";
// import AlertsChart from "../components/AlertsChart";
// import AlertsTable from "../components/AlertsTable";
// import { AlertTriangle, ShieldCheck, Activity } from "lucide-react";

// export default function AlertsDashboard() {
//   const [isExporting, setIsExporting] = useState(false);

//   // Mock data (This should match the data passed to AlertsTable)
//   const alertsData = [
//     { id: 1, name: "CPU Usage High", priority: "Critical", created: "2m ago", duration: "2m" },
//     { id: 2, name: "DB Connection Timeout", priority: "High", created: "5m ago", duration: "5m" },
//     { id: 3, name: "Disk Space Warning", priority: "Medium", created: "10m ago", duration: "10m" },
//     { id: 4, name: "Memory Usage Warning", priority: "Low", created: "15m ago", duration: "15m" },
//   ];

//   const handleExport = () => {
//     setIsExporting(true);

//     // Simulate a tiny delay for better UX feel
//     setTimeout(() => {
//       exportToCSV(alertsData, "Detail Incident Log");
//       setIsExporting(false);
//     }, 600);
//   };
//   const exportToCSV = (data: any[], fileName: string) => {
//   // 1. Define headers based on your alert object keys
//   const headers = ["ID", "Issue", "Priority", "Created", "Duration"];

//   // 2. Map data to rows
//   const rows = data.map(alert => [
//     alert.id,
//     `"${alert.name}"`, // Wrap in quotes to handle commas in names
//     alert.priority,
//     alert.created,
//     alert.duration
//   ]);

//   // 3. Combine headers and rows into a CSV string
//   const csvContent = [
//     headers.join(","),
//     ...rows.map(row => row.join(","))
//   ].join("\n");

//   // 4. Create a Blob and trigger download
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");

//   link.setAttribute("href", url);
//   link.setAttribute("download", `${fileName}.csv`);
//   link.style.visibility = "hidden";

//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-black p-4 sm:p-6 md:p-8 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

//         {/* Header & Quick Stats */}
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
//               Issues & Activity
//             </h1>
//             <p className="text-slate-500 dark:text-slate-400 mt-2">
//               Real-time threat detection and system health alerts.
//             </p>
//           </div>

//           {/* Mini Status Grid for Mobile/Desktop */}
//           <div className="grid grid-cols-2 sm:flex gap-3">
//             <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
//               <AlertTriangle className="text-red-600 dark:text-red-500 w-5 h-5" />
//               <div>
//                 <p className="text-[10px] font-black uppercase text-red-800 dark:text-red-400 leading-none">Critical</p>
//                 <p className="text-lg font-black dark:text-white leading-tight">12</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
//               <Activity className="text-blue-600 dark:text-blue-500 w-5 h-5" />
//               <div>
//                 <p className="text-[10px] font-black uppercase text-blue-800 dark:text-blue-400 leading-none">Active</p>
//                 <p className="text-lg font-black dark:text-white leading-tight">24</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Chart Section - Glassmorphism Card */}
//         <section className="bg-white dark:bg-white/5 rounded-[2.5rem] p-6 border border-slate-200 dark:border-white/10 shadow-sm transition-all">
//           <div className="flex items-center gap-2 mb-6">
//             <ShieldCheck className="text-green-500 w-5 h-5" />
//             <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Alert Distribution</h2>
//           </div>
//           <div className="w-full">
//             <AlertsChart />
//           </div>
//         </section>

//         {/* Table Section - Responsive Wrap */}
//         <section className="bg-white dark:bg-white/5 rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
//           <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between">
//             <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-300">Detailed Incident Log</h2>
//             <button
//           onClick={handleExport}
//           disabled={isExporting}
//           className={`
//             text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all
//             ${isExporting
//               ? "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed"
//               : "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 active:scale-95"
//             }
//           `}
//         >
//           {isExporting ? "Generating..." : "Export CSV"}
//         </button>
//           </div>
//           <div className="overflow-x-auto custom-scrollbar">
//             <AlertsTable />
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import AlertsChart from "../components/AlertsChart";
import AlertsTable from "../components/AlertsTable";
import { AlertTriangle, ShieldCheck, Activity } from "lucide-react";

// Define the interface to match your FastAPI output
interface BackendAlert {
  type: string;
  why: string;
  timestamp: string;
  status?: string;
}

export default function AlertsDashboard() {
  const [isExporting, setIsExporting] = useState(false);
  const [alerts, setAlerts] = useState<BackendAlert[]>([]);

  // 1. Live Data Fetching Logic
  const fetchAlerts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8001/alerts");
      const data = await response.json();

      // Filter out the "Healthy" placeholder if you only want real incidents in the history
      const filteredData = data.filter(
        (a: BackendAlert) => a.status !== "Healthy",
      );
      setAlerts(filteredData);
    } catch (error) {
      console.error("Dashboard failed to sync with Sentinel:", error);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000); // Sync every 10s
    return () => clearInterval(interval);
  }, []);

  // 2. Dynamic Stats Calculation
  const criticalCount = alerts.filter((a) =>
    a.type.includes("CRITICAL"),
  ).length;
  const totalActive = alerts.length;

  // 3. Updated CSV Export using Live Data
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      exportToCSV(alerts, "Sentinel_Incident_Log");
      setIsExporting(false);
    }, 600);
  };

  const exportToCSV = (data: BackendAlert[], fileName: string) => {
    const headers = ["Timestamp", "Type", "Issue/Explanation"];
    const rows = data.map((alert) => [
      new Date(alert.timestamp).toLocaleString(),
      alert.type,
      `"${alert.why}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header & Quick Stats (Now Dynamic) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Issues & Activity
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Real-time threat detection and system health alerts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
              <AlertTriangle className="text-red-600 dark:text-red-500 w-5 h-5" />
              <div>
                <p className="text-[10px] font-black uppercase text-red-800 dark:text-red-400 leading-none">
                  Critical
                </p>
                <p className="text-lg font-black dark:text-white leading-tight">
                  {criticalCount}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
              <Activity className="text-blue-600 dark:text-blue-500 w-5 h-5" />
              <div>
                <p className="text-[10px] font-black uppercase text-blue-800 dark:text-blue-400 leading-none">
                  Total Incidents
                </p>
                <p className="text-lg font-black dark:text-white leading-tight">
                  {totalActive}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <section className="bg-white dark:bg-white/5 rounded-[2.5rem] p-6 border border-slate-200 dark:border-white/10 shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="text-green-500 w-5 h-5" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">
              Alert Distribution
            </h2>
          </div>
          <div className="w-full">
            {/* Pass live alerts to chart if it supports props, else it fetches internally */}
            <AlertsChart />
          </div>
        </section>

        {/* Table Section */}
        <section className="bg-white dark:bg-white/5 rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-300">
              Detailed Incident Log
            </h2>
            <button
              onClick={handleExport}
              disabled={isExporting || alerts.length === 0}
              className={`
                text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all
                ${
                  isExporting || alerts.length === 0
                    ? "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed"
                    : "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 active:scale-95"
                }
              `}
            >
              {isExporting ? "Generating..." : "Export CSV"}
            </button>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            {/* AlertsTable still polls internally, but now matches this data */}
            <AlertsTable />
          </div>
        </section>
      </div>
    </div>
  );
}
