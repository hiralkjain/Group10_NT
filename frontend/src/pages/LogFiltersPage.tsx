import React, { useState } from "react";
import { filterLogs } from "../api/logsApi";
import FilterForm from "../components/FilterForm";
import LogsTable from "../components/LogsTable";
import StatsCards from "../components/StatsCards";
import DistributionPanel from "../components/DistributionPanel";
import { Loader2, Search } from "lucide-react";

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Log Explorer
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Analyze patterns and filter through <span className="text-blue-600 dark:text-blue-400 font-bold">MeshData</span> system events.
            </p>
          </div>
          
          {/* Legend - Responsive wrapping */}
          <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Info
            </span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-500/20">
              <div className="w-2 h-2 rounded-full bg-yellow-500" /> Warn
            </span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-500/20">
              <div className="w-2 h-2 rounded-full bg-red-500" /> Error
            </span>
          </div>
        </div>

        {/* Filter Form container */}
        <section className="rounded-2xl shadow-sm transition-all">
          <FilterForm onFilter={handleFilter} />
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 animate-in fade-in zoom-in-95">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-bold tracking-tight">Sifting through log files...</p>
          </div>
        )}

        {/* Results Section */}
        {!loading && data ? (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Grid for Stats and Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <div className="h-full bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 p-1">
                  <StatsCards
                    total={data.total_logs}
                    matched={data.matched_logs}
                  />
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="h-full bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 p-1">
                  <DistributionPanel
                    levelDist={data.level_distribution}
                    loggerDist={data.logger_distribution}
                  />
                </div>
              </div>
            </div>

            {/* Logs Table Section */}
            <div className="bg-white dark:bg-white/5 rounded-3xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-white/[0.02]">
                <h2 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight text-sm">
                  Search Results
                </h2>
                <span className="text-[10px] font-mono bg-white dark:bg-black px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-blue-400 w-fit">
                  {data.results?.length || 0} entries found
                </span>
              </div>
              <div className="overflow-x-auto custom-scrollbar">
                <LogsTable logs={data.results} />
              </div>
            </div>
          </div>
        ) : (
          !loading && (
            // Initial Empty State
            <div className="flex flex-col items-center justify-center py-32 px-6 text-center bg-white dark:bg-white/[0.02] rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/10">
              <div className="bg-slate-100 dark:bg-white/5 p-6 rounded-full mb-6">
                <Search className="w-12 h-12 text-slate-400 dark:text-slate-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">Ready for Exploration</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-3 text-sm leading-relaxed">
                Use the filters above to explore logs by service, level, or keywords like <code className="text-blue-500">"timeout"</code> or <code className="text-red-500">"404"</code>.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LogFiltersPage;