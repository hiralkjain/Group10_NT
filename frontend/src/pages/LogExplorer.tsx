// import React, { useEffect, useState } from "react";
// import { Terminal, Search, Clock } from "lucide-react";

// interface LogEntry {
//   timestamp: string;
//   level: string;
//   service: string;
//   message: string;
// }

// export default function LogExplorer() {
//   const [logs, setLogs] = useState<LogEntry[]>([]);

//   const fetchLogs = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8001/raw-logs");
//       const data = await response.json();
//       setLogs(data.reverse()); // Show newest at the top
//     } catch (error) {
//       console.error("Failed to stream logs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchLogs();
//     const interval = setInterval(fetchLogs, 5000); // Poll every 5s to match simulator
//     return () => clearInterval(interval);
//   }, []);

//   const getLevelColor = (level: string) => {
//     switch (level) {
//       case "ERROR":
//         return "text-red-500 font-bold";
//       case "WARN":
//         return "text-yellow-500";
//       case "DEBUG":
//         return "text-blue-400";
//       default:
//         return "text-green-400";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-black p-6 transition-colors duration-300">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
//               <Terminal className="w-8 h-8 text-blue-500" /> Log Explorer
//             </h1>
//             <p className="text-slate-500 dark:text-slate-400 mt-1">
//               Live terminal feed from app.log
//             </p>
//           </div>
//           <div className="flex gap-2 text-xs font-mono text-slate-400">
//             <Clock className="w-4 h-4" /> Polling: 5s
//           </div>
//         </div>

//         {/* Terminal Window */}
//         <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
//           <div className="bg-slate-800 px-6 py-3 border-b border-slate-700 flex gap-2">
//             <div className="w-3 h-3 rounded-full bg-red-500"></div>
//             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//             <div className="w-3 h-3 rounded-full bg-green-500"></div>
//           </div>

//           <div className="p-6 h-[600px] overflow-y-auto custom-scrollbar space-y-2">
//             {logs.length === 0 ? (
//               <p className="text-slate-500 animate-pulse">
//                 Initializing stream...
//               </p>
//             ) : (
//               logs.map((log, i) => (
//                 <div
//                   key={i}
//                   className="flex gap-4 border-b border-slate-800/50 pb-2 hover:bg-white/5 transition-colors"
//                 >
//                   <span className="text-slate-500 shrink-0">
//                     [{new Date(log.timestamp).toLocaleTimeString()}]
//                   </span>
//                   <span className={`w-16 shrink-0 ${getLevelColor(log.level)}`}>
//                     {log.level}
//                   </span>
//                   <span className="text-blue-300 shrink-0 italic">
//                     {log.service}
//                   </span>
//                   <span className="text-slate-300 break-all">
//                     {log.message}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Terminal, Clock } from "lucide-react";

interface LogEntry {
  timestamp: string;
  level: string;
  service: string;
  message: string;
}

export default function LogExplorer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8002/raw-logs");

      // If endpoint doesn't exist yet, response.ok will be false
      if (!response.ok) {
        setError(`Backend Error: ${response.status}`);
        return;
      }

      const data = await response.json();

      // Defensively check if data is an array
      if (Array.isArray(data)) {
        setLogs([...data].reverse());
        setError(null);
      } else {
        setLogs([]);
      }
    } catch (error) {
      console.error("Failed to stream logs:", error);
      setError("Connection Refused - Is Python running?");
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "text-red-500 font-bold";
      case "WARN":
        return "text-yellow-500";
      case "DEBUG":
        return "text-blue-400";
      default:
        return "text-green-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <Terminal className="w-8 h-8 text-blue-500" /> Log Explorer
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Live terminal feed from app.log
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-2 text-xs font-mono text-slate-400">
              <Clock className="w-4 h-4" /> Polling: 5s
            </div>
            {error && (
              <span className="text-[10px] text-red-500 font-bold uppercase">
                {error}
              </span>
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
          <div className="bg-slate-800 px-6 py-3 border-b border-slate-700 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <div className="p-6 h-[600px] overflow-y-auto custom-scrollbar space-y-2">
            {logs.length === 0 ? (
              <p className="text-slate-500 animate-pulse italic">
                {error
                  ? "Waiting for backend..."
                  : "Empty stream: Start simulator.py"}
              </p>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="flex gap-4 border-b border-slate-800/50 pb-2 hover:bg-white/5 transition-colors"
                >
                  <span className="text-slate-500 shrink-0">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </span>
                  <span className={`w-16 shrink-0 ${getLevelColor(log.level)}`}>
                    {log.level}
                  </span>
                  <span className="text-blue-300 shrink-0 italic">
                    {log.service}
                  </span>
                  <span className="text-slate-300 break-all">
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
