import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  Bell, 
  Settings, 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon,
  Users,
  CheckCircle2,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");

  const isAdmin = user?.role === "ADMIN";

  // Dynamic Menu Items based on Role (Requirement: Admin sees extra management tabs)
  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Log Explorer", path: "/filters", icon: FileText },
    { name: "Alerts Center", path: "/alerts", icon: Bell },
    // Admin Only Tabs
    ...(isAdmin ? [
      { name: "User Management", path: "/users", icon: Users },
      { name: "Resolution Hub", path: "/resolutions", icon: CheckCircle2 },
    ] : []),
    { name: "Alert Rules", path: "/rules", icon: Settings },
  ];

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // Toggles the 'dark' class on the <html> element for Tailwind dark mode
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div 
      className={`relative flex flex-col transition-all duration-300 ease-in-out border-r z-50 ${
        isCollapsed ? "w-20" : "w-64"
      } h-screen shadow-xl ${
        theme === "dark" 
          ? "bg-black text-white border-white/10" 
          : "bg-white text-slate-900 border-slate-200"
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={toggleCollapse}
        className={`absolute -right-3 top-12 rounded-full p-1 border-2 hover:scale-110 transition-transform z-50 ${
          theme === "dark" 
            ? "bg-blue-600 border-black text-white" 
            : "bg-blue-600 border-white text-white"
        }`}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Header / Logo Section */}
      <div className={`p-6 flex items-center gap-3 border-b overflow-hidden whitespace-nowrap ${
        theme === "dark" ? "border-white/5" : "border-slate-100"
      }`}>
        <Activity className="text-blue-500 shrink-0" />
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter italic">LOGS</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              Sentinel
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.name : ""}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : theme === "dark"
                    ? "text-slate-400 hover:bg-white/5 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon size={22} className="shrink-0" />
              {!isCollapsed && (
                <span className="font-semibold text-sm animate-in fade-in slide-in-from-left-2 duration-300">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions / Profile Section */}
      <div className={`p-4 border-t space-y-4 ${
        theme === "dark" ? "border-white/5" : "border-slate-100"
      }`}>
        {/* Role-Aware Context Indicator */}
        {!isCollapsed && (
          <div className={`p-3 rounded-xl animate-in fade-in zoom-in-95 duration-300 ${
            theme === "dark" ? "bg-white/5" : "bg-slate-50"
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isAdmin ? 'bg-blue-500' : 'bg-green-500'}`}></div>
              <span className={`text-[10px] uppercase font-black tracking-tighter ${
                theme === "dark" ? "text-slate-300" : "text-slate-500"
              }`}>
                {isAdmin ? "Master Admin" : user?.department}
              </span>
            </div>
            <p className="text-[9px] text-slate-500 leading-tight">
              {isAdmin 
                ? "Full Infrastructure Oversight" 
                : `Monitoring ${user?.filters?.keywords?.length || 0} departmental patterns`}
            </p>
          </div>
        )}

        {/* Global Action Buttons */}
        <div className="flex flex-col gap-2">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-center gap-3 p-3 rounded-xl transition-all ${
                theme === "dark" 
                  ? "bg-white/10 text-yellow-400 hover:bg-white/20" 
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              {!isCollapsed && <span className="text-xs font-bold uppercase tracking-wider">Appearance</span>}
            </button>

            {/* Logout Trigger */}
            <button
              onClick={logout}
              className={`w-full flex items-center justify-center gap-3 p-3 rounded-xl transition-all text-red-500 hover:bg-red-500/10 active:scale-95`}
            >
              <LogOut size={18} />
              {!isCollapsed && <span className="text-xs font-bold uppercase tracking-wider">Logout</span>}
            </button>
        </div>
      </div>
    </div>
  );
}