import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Users, Terminal, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock User Data
const USERS_LIST = [
  { id: "USR-001", name: "Alex Rivera", dept: "Infrastructure & DB", status: "Active", lastAction: "DB Query" },
  { id: "USR-002", name: "Sarah Chen", dept: "Business Logic", status: "Active", lastAction: "Asset Auth" },
  { id: "USR-003", name: "Marcus Vane", dept: "Access & Security", status: "Away", lastAction: "IP Rotate" },
];

// Mock Logs mapped to User IDs
const USER_LOGS: Record<string, string[]> = {
  "USR-001": [
    "[21:04:12] MeshDataService: Connecting to cluster-alpha...",
    "[21:04:15] DB_CONN: Handshake successful.",
    "[21:05:01] QUERY: SELECT * FROM 'transaction_logs' WHERE 'status' = 'fail'",
    "[21:05:22] MeshDataService: Connection closed safely."
  ],
  "USR-002": [
    "[20:15:33] ASSET_ENGINE: Validating Stock payload...",
    "[20:15:34] PAYLOAD: Type 'Bond' detected.",
    "[20:16:01] AUTH: User 'Sarah Chen' authorized for Asset Creation.",
    "[20:16:10] SUCCESS: Asset ID #88219 created."
  ],
  "USR-003": [
    "[19:00:01] MeshDataController: Scanning for status=404...",
    "[19:05:44] SECURITY: Frequent account lookup detected from 192.168.1.4.",
    "[19:06:12] SHIELD: Blocking IP range temporary.",
    "[19:10:00] LOG: Marcus Vane initiated manual override."
  ]
};

export default function UserManagement() {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(USERS_LIST[0].id);

  if (user?.role !== "ADMIN") {
    return (
      <div className="h-96 flex items-center justify-center text-red-500 font-black">
        ACCESS DENIED: ADMIN PRIVILEGES REQUIRED
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter italic">User Management</h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Audit Trail & Session Control</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: User Cards */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-black uppercase text-slate-500 mb-4 flex items-center gap-2">
            <Users size={14} /> Active Personnel
          </h2>
          {USERS_LIST.map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedUserId(u.id)}
              className={`w-full text-left p-6 rounded-[2rem] border transition-all duration-300 flex items-center justify-between group
                ${selectedUserId === u.id 
                  ? "bg-blue-600 border-blue-500 shadow-xl shadow-blue-600/20 translate-x-2" 
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-blue-500/50"}
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${selectedUserId === u.id ? "bg-white/20" : "bg-slate-100 dark:bg-white/5"}`}>
                  <ShieldCheck size={20} className={selectedUserId === u.id ? "text-white" : "text-blue-500"} />
                </div>
                <div>
                  <h4 className={`font-bold tracking-tight ${selectedUserId === u.id ? "text-white" : "dark:text-white"}`}>{u.name}</h4>
                  <p className={`text-[10px] font-black uppercase ${selectedUserId === u.id ? "text-blue-100" : "text-slate-500"}`}>{u.dept}</p>
                </div>
              </div>
              <ArrowRight size={16} className={`transition-transform ${selectedUserId === u.id ? "text-white translate-x-1" : "text-slate-500 opacity-0 group-hover:opacity-100"}`} />
            </button>
          ))}
        </div>

        {/* Right: Log Terminal */}
        <div className="lg:col-span-7">
          <div className="bg-black rounded-[2.5rem] border border-white/10 overflow-hidden h-full min-h-[500px] flex flex-col shadow-2xl">
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-green-500" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Master User Stream</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/20" />
              </div>
            </div>
            
            <div className="p-8 font-mono text-xs space-y-4 overflow-y-auto flex-1 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedUserId}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-3"
                >
                  <p className="text-blue-500 font-bold mb-6"># Initializing Trace for {USERS_LIST.find(u => u.id === selectedUserId)?.name}...</p>
                  {USER_LOGS[selectedUserId].map((log, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-slate-700 select-none">{i + 1}</span>
                      <span className="text-green-500/80 leading-relaxed">{log}</span>
                    </div>
                  ))}
                  <motion.div 
                    animate={{ opacity: [0, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-green-500/50 inline-block ml-10 translate-y-1"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}