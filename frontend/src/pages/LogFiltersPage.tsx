// import { useState } from "react";
// import { filterLogs } from "../api/logsApi";
// import FilterForm from "../components/FilterForm";
// import LogsTable from "../components/LogsTable";
// import StatsCards from "../components/StatsCards";
// import DistributionPanel from "../components/DistributionPanel";

// const LogFiltersPage = () => {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handleFilter = async (filters: any) => {
//     setLoading(true);
//     try {
//       const result = await filterLogs(filters);
//       setData(result);
//     } catch (err) {
//       console.error("Error fetching logs", err);
//     }
//     setLoading(false);
//   };

//   return (
//     <div
//       className="min-h-screen p-6 transition-colors duration-300
//                     bg-gray-100 text-gray-900
//                     dark:bg-gray-900 dark:text-gray-100"
//     >
//       <h1 className="text-3xl font-bold mb-6">Log Filtering Dashboard</h1>

//       <div
//         className="bg-white dark:bg-gray-800
//                       rounded-xl shadow-md p-6
//                       transition-colors duration-300"
//       >
//         <FilterForm onFilter={handleFilter} />
//       </div>

//       {loading && (
//         <p className="mt-4 text-blue-600 dark:text-blue-400">Loading...</p>
//       )}

//       {data && (
//         <div className="space-y-6 mt-6">
//           <StatsCards total={data.total_logs} matched={data.matched_logs} />

//           <DistributionPanel
//             levelDist={data.level_distribution}
//             loggerDist={data.logger_distribution}
//           />

//           <LogsTable logs={data.results} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default LogFiltersPage;

import { useState } from "react";
import { filterLogs } from "../api/logsApi";
import FilterForm from "../components/FilterForm";
import LogsTable from "../components/LogsTable";
import StatsCards from "../components/StatsCards";
import DistributionPanel from "../components/DistributionPanel";

const LogFiltersPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFilter = async (filters: any) => {
    setLoading(true);
    try {
      const result = await filterLogs(filters);
      setData(result);
    } catch (err) {
      console.error("Error fetching logs", err);
    }
    setLoading(false);
  };

  return (
    <div
      className="
      min-h-screen p-8 transition-all duration-500
      bg-gradient-to-br 
      from-slate-100 via-gray-100 to-slate-200
      dark:from-[#0f172a] dark:via-[#0b1220] dark:to-black
    "
    >
      {/* Page Header */}
      <div className="mb-10">
        <h1
          className="text-4xl font-bold tracking-tight
                       text-gray-800 dark:text-white"
        >
          Log Filtering Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Filter and analyze logs in real-time with detailed insights.
        </p>
      </div>

      {/* Glass Filter Card */}
      <div
        className="
        backdrop-blur-xl 
        bg-white/70 dark:bg-white/5
        border border-white/30 dark:border-white/10
        shadow-2xl rounded-2xl p-8
        transition-all duration-500
      "
      >
        <FilterForm onFilter={handleFilter} />
      </div>

      {loading && (
        <div className="mt-6 text-blue-600 dark:text-blue-400 animate-pulse">
          Fetching logs...
        </div>
      )}

      {data && (
        <div className="space-y-10 mt-10">
          <StatsCards total={data.total_logs} matched={data.matched_logs} />

          <DistributionPanel
            levelDist={data.level_distribution}
            loggerDist={data.logger_distribution}
          />

          <LogsTable logs={data.results} />
        </div>
      )}
    </div>
  );
};

export default LogFiltersPage;
