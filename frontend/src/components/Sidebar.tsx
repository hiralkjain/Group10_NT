// import { Bell, BarChart2, Settings } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-slate-950 border-r border-slate-800 p-6">
//       <h1 className="text-2xl font-bold text-white mb-10">🚀 AlertX</h1>

//       <nav className="space-y-4 text-gray-400">
//         <div className="flex items-center gap-3 hover:text-white cursor-pointer">
//           <BarChart2 size={18} /> Overview
//         </div>

//         <div className="flex items-center gap-3 text-blue-400 bg-slate-800 p-2 rounded-lg">
//           <Bell size={18} /> Alerts
//         </div>

//         <div className="flex items-center gap-3 hover:text-white cursor-pointer">
//           <Settings size={18} /> Settings
//         </div>
//       </nav>
//     </div>
//   );
// }

import { Bell, BarChart2, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div
      className="
      w-64 min-h-screen p-6
      bg-white dark:bg-gray-900
      border-r border-gray-200 dark:border-gray-800
      transition-colors duration-300
    "
    >
      <h1
        className="text-2xl font-bold mb-10
                     text-gray-800 dark:text-white"
      >
        🚀 AlertX
      </h1>

      <nav className="space-y-4">
        <div
          className="
          flex items-center gap-3 cursor-pointer
          text-gray-600 dark:text-gray-400
          hover:text-blue-600 dark:hover:text-blue-400
          transition
        "
        >
          <BarChart2 size={18} />
          Overview
        </div>

        <div
          className="
          flex items-center gap-3
          bg-blue-100 dark:bg-blue-900/30
          text-blue-600 dark:text-blue-400
          p-2 rounded-lg
        "
        >
          <Bell size={18} />
          Alerts
        </div>

        <div
          className="
          flex items-center gap-3 cursor-pointer
          text-gray-600 dark:text-gray-400
          hover:text-blue-600 dark:hover:text-blue-400
          transition
        "
        >
          <Settings size={18} />
          Settings
        </div>
      </nav>
    </div>
  );
}