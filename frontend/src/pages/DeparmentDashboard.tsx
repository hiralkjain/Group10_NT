import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";
import { 
  ShieldAlert, 
  CheckCircle2, 
  Activity, 
  Clock, 
  Database, 
  Cpu, 
  Lock 
} from "lucide-react";
import { motion } from "framer-motion";

// Mock Data encompassing all departments
const GLOBAL_ALERTS = [
  { id: 1, name: "DB Connection Timeout", dept: "Infrastructure & DB", status: "Active", time: "2m ago", severity: "Critical" },
  { id: 2, name: "Service Health Degradation", dept: "Infrastructure & DB", status: "Active", time: "15m ago", severity: "High" },
  { id: 3, name: "Asset Creation Latency", dept: "Business Logic", status: "Active", time: "5m ago", severity: "Medium" },
  { id: 4, name: "Invalid Asset Payload", dept: "Business Logic", status: "Resolved", time: "1h ago", severity: "Low" },
  { id: 5, name: "Unauthorized Access Attempt", dept: "Access & Security", status: "Active", time: "10m ago", severity: "Critical" },
  { id: 6, name: "Frequent Account Lookups", dept: "Access & Security", status: "Resolved", time: "30m ago", severity: "Medium" },
];

export default function DepartmentDashboard() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState(GLOBAL_ALERTS);
  const isAdmin = user?.role === "ADMIN";

  // 1. Logic: Filter alerts based on logged-in department or Admin role
  const displayData = useMemo(() => {
    if (isAdmin) return alerts;
    return alerts.filter(a => a.dept === user?.department);
  }, [user, alerts]);

  const handleResolve = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "Resolved" } : a));
  };

  // Helper for Departmental Icons
  const getDeptIcon = () => {
    switch (user?.department) {
      case "Infrastructure & DB": return <Database className="text-blue-500" />;
      case "Business Logic": return <Cpu className="text-purple-500" />;
      case "Access & Security": return <Lock className="text-red-500" />;
      default: return <Activity className="text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
              {getDeptIcon()}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                {isAdmin ? "Global Command" : user?.department}
              </h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
                {isAdmin ? "Cross-Departmental Oversight" : "Local System Health Monitor"}
              </p>
            </div>
          </div>

          {/* Admin Metrics - Only visible to ADMIN */}
          {isAdmin && (
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
              <AdminQuickStat label="Global Resolve" value="94%" color="text-green-500" />
              <AdminQuickStat label="Avg Response" value="8.4m" color="text-blue-500" />
            </div>
          )}
        </header>

        {/* STATS GRID - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard title="Active Alerts" value={displayData.filter(a => a.status === "Active").length} color="text-red-500" accent="border-red-500" />
          <StatCard title="Closed Today" value={displayData.filter(a => a.status === "Resolved").length} color="text-green-500" accent="border-green-500" />
          <StatCard title="Target Keywords" value={user?.filters.keywords.length || "All"} color="text-blue-500" accent="border-blue-500" />
          <StatCard title="System Uptime" value="99.9%" color="text-slate-400" accent="border-slate-400" />
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Incident Table - Left Column */}
          <section className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">Live Incident Feed</h2>
              <div className="text-[10px] font-mono bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">
                Context: {isAdmin ? "Master" : "Restricted"}
              </div>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-[600px] overflow-y-auto custom-scrollbar">
              {displayData.map((alert) => (
                <div key={alert.id} className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${alert.status === 'Resolved' ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl ${alert.status === 'Resolved' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      {alert.status === 'Resolved' ? <CheckCircle2 className="text-green-500" size={24}/> : <ShieldAlert className="text-red-500" size={24}/>}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg dark:text-white tracking-tight">{alert.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[9px] font-black uppercase bg-slate-100 dark:bg-white/5 px-2 py-1 rounded text-slate-500">{alert.time}</span>
                        <span className="text-[9px] font-black uppercase text-blue-500">{alert.dept}</span>
                      </div>
                    </div>
                  </div>
                  
                  {alert.status === "Active" ? (
                    <button 
                      onClick={() => handleResolve(alert.id)}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                      Resolve
                    </button>
                  ) : (
                    <span className="text-[10px] font-black uppercase text-green-500 tracking-widest px-4">Archived</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar Info Panel - Right Column */}
          <aside className="xl:col-span-4 space-y-6">
             <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Security Status</p>
                  <h3 className="text-2xl font-black mt-2 leading-tight">Your sector is currently stable.</h3>
                  <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Run Diagnostics</button>
                </div>
                <Activity className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
             </div>

             <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Active Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {user?.filters.keywords.map(kw => (
                    <span key={kw} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg text-[10px] font-bold dark:text-slate-300 border border-slate-200 dark:border-white/5">
                      {kw}
                    </span>
                  ))}
                </div>
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

// --- Internal Sub-components ---

function StatCard({ title, value, color, accent }: any) {
  return (
    <div className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border-l-4 ${accent} border-y border-r dark:border-y-white/5 dark:border-r-white/5 shadow-sm transition-all hover:translate-y-[-2px]`}>
      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{title}</p>
      <p className={`text-3xl font-black mt-2 ${color}`}>{value}</p>
    </div>
  );
}

function AdminQuickStat({ label, value, color }: any) {
  return (
    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl flex-1">
      <p className="text-[9px] font-black uppercase text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className={`text-xl font-black ${color}`}>{value}</p>
    </div>
  );
}