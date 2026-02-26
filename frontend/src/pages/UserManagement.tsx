import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Users, Terminal, ShieldCheck, Activity } from "lucide-react";

const USERS_LIST = [
  { id: "USR-001", name: "Alex Rivera", dept: "Infrastructure & DB", status: "Active" },
  { id: "USR-002", name: "Sarah Chen", dept: "Business Logic", status: "Active" },
  { id: "USR-003", name: "Marcus Vane", dept: "Access & Security", status: "Away" },
];

const USER_LOGS: Record<string, string[]> = {
  "USR-001": [
    "[21:04:12] MeshDataService: Connecting to cluster-alpha...",
    "[21:04:15] DB_CONN: Handshake successful.",
    "[21:05:01] QUERY: SELECT * FROM 'transaction_logs'",
    "[21:05:22] MeshDataService: Connection closed safely."
  ],
  "USR-002": [
    "[20:15:33] ASSET_ENGINE: Validating Stock payload...",
    "[20:15:34] PAYLOAD: Type 'Bond' detected.",
    "[20:16:01] AUTH: User authorized for Asset Creation.",
    "[20:16:10] SUCCESS: Asset ID #88219 created."
  ],
  "USR-003": [
    "[19:00:01] MeshDataController: Scanning for status=404...",
    "[19:05:44] SECURITY: Frequent account lookup detected.",
    "[19:06:12] SHIELD: Blocking IP range temporary.",
    "[19:10:00] LOG: Manual override initiated."
  ]
};

export default function UserManagement() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(USERS_LIST[0]);

  if (user?.role !== "ADMIN") {
    return (
      <div className="h-96 flex items-center justify-center text-red-500 font-black tracking-widest">
        ACCESS DENIED: ADMIN PRIVILEGES REQUIRED
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-160px)] flex flex-col">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter italic">User Audit</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Audit Trail & Session Control</p>
        </div>
        <div className="hidden md:flex gap-2">
            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-500 uppercase">System Live</div>
        </div>
      </header>

      {/* Main Two-Division Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left Division: User List (4 Columns) */}
        <div className="lg:col-span-4 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
          {USERS_LIST.map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-4
                ${selectedUser.id === u.id 
                  ? "bg-blue-600 border-blue-500 shadow-lg shadow-blue-600/20 translate-x-1" 
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-blue-500/50"}
              `}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                ${selectedUser.id === u.id ? "bg-white/20 text-white" : "bg-blue-600/10 text-blue-500"}`}>
                <ShieldCheck size={20} />
              </div>
              <div className="min-w-0">
                <h4 className={`font-bold truncate ${selectedUser.id === u.id ? "text-white" : "dark:text-white"}`}>{u.name}</h4>
                <p className={`text-[10px] font-black uppercase ${selectedUser.id === u.id ? "text-blue-100" : "text-slate-500"}`}>{u.dept}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Division: Log Console (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-black rounded-[2rem] border border-white/10 flex flex-col flex-1 overflow-hidden shadow-2xl">
            {/* Console Header */}
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal size={16} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trace Console: {selectedUser.name}</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/20" />
              </div>
            </div>

            {/* Console Body */}
            <div className="p-6 font-mono text-xs overflow-y-auto flex-1 custom-scrollbar space-y-3">
              <div className="text-blue-500/60 mb-4 animate-pulse uppercase text-[10px] font-bold">
                {">"} Initializing session trace for UID: {selectedUser.id}...
              </div>
              
              {USER_LOGS[selectedUser.id].map((log, i) => (
                <div key={i} className="flex gap-4 group">
                  <span className="text-slate-800 select-none w-4">{i + 1}</span>
                  <span className="text-green-500/80 leading-relaxed group-hover:text-green-400 transition-colors">
                    {log}
                  </span>
                </div>
              ))}
              
              <div className="flex gap-4">
                 <span className="text-slate-800 select-none w-4">{USER_LOGS[selectedUser.id].length + 1}</span>
                 <div className="w-2 h-4 bg-blue-500/40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}