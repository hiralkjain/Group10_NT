import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Bell, Settings, Activity } from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Log Explorer", path: "/filters", icon: FileText },
  { name: "Alerts Center", path: "/alerts", icon: Bell },
  { name: "Alert Rules", path: "/rules", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <Activity className="text-blue-400" />
        <span className="text-xl font-bold tracking-tight">Dashboard</span>
      </div>

      <nav className="mt-6 flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 bg-slate-800 m-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-300 uppercase font-bold">System Live</span>
        </div>
        <p className="text-[10px] text-slate-500 italic">
          Monitoring logs across 3 services (Auth, Payment, Order)
        </p>
      </div>
    </div>
  );
}