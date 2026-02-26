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
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const isAdmin = user?.role === "ADMIN";

  // Sync theme with document element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Log Explorer", path: "/filters", icon: FileText },
    { name: "Alerts Center", path: "/alerts", icon: Bell },
    ...(isAdmin ? [
      { name: "User Management", path: "/users", icon: Users },
      { name: "Resolution Hub", path: "/resolve", icon: CheckCircle2 },
    ] : []),
    { name: "Alert Rules", path: "/rules", icon: Settings },
  ];

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      {/* MOBILE HEADER: Only visible on small screens */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-black border-b border-slate-200 dark:border-white/10 w-full fixed top-0 z-[60]">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-500" size={20} />
          <span className="font-black tracking-tighter dark:text-white">SENTINEL</span>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="dark:text-white">
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR CONTAINER */}
      <aside 
        className={`
          fixed lg:relative flex flex-col transition-all duration-300 ease-in-out border-r z-[55] h-screen shadow-xl
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${theme === "dark" ? "bg-black text-white border-white/10" : "bg-white text-slate-900 border-slate-200"}
        `}
      >
        {/* DESKTOP TOGGLE: Hidden on mobile */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            hidden lg:flex absolute -right-3 top-12 rounded-full p-1 border-2 hover:scale-110 transition-transform z-[70]
            ${theme === "dark" ? "bg-blue-600 border-black text-white" : "bg-blue-600 border-white text-white"}
          `}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* LOGO SECTION */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-white/5 overflow-hidden">
          <Activity className="text-blue-500 shrink-0" />
          {!isCollapsed && (
            <div className="flex flex-col animate-in fade-in duration-500">
              <span className="text-xl font-black tracking-tighter italic">LOGS</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Sentinel</span>
            </div>
          )}
        </div>

        {/* NAV LINKS */}
        <nav className="mt-6 flex-1 px-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center gap-4 px-3 py-3 rounded-xl transition-all group
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:text-slate-400 dark:hover:text-white"}
                `}
              >
                <item.icon size={22} className="shrink-0" />
                {!isCollapsed && <span className="font-semibold text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER ACTIONS */}
        <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-4">
          {!isCollapsed && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isAdmin ? 'bg-blue-500' : 'bg-green-500'}`} />
                <span className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-300">
                  {isAdmin ? "Master Admin" : user?.department}
                </span>
              </div>
              <p className="text-[9px] text-slate-400">System Secure</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-yellow-400 hover:opacity-80 transition-all"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              {!isCollapsed && <span className="text-xs font-bold uppercase">Theme</span>}
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={18} />
              {!isCollapsed && <span className="text-xs font-bold uppercase">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[50] lg:hidden" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}
    </>
  );
}