import React, { useState } from "react";
import { filterLogs } from "../api/logsApi";
import FilterForm from "../components/FilterForm";
import LogsTable from "../components/LogsTable";
import StatsCards from "../components/StatsCards";
import DistributionPanel from "../components/DistributionPanel";
import { Loader2, Search, Info } from "lucide-react";

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
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen space-y-6">
      {/* Header section with context-aware colors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Log Explorer
          </h1>
          <p className="text-slate-500 mt-1">
            Analyze patterns and filter through <span className="text-blue-600 font-semibold">MeshData</span> system events.
          </p>
        </div>
        
        {/* Quick Legend for users */}
        <div className="flex gap-3 text-xs font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500" /> Info
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
            <div className="w-2 h-2 rounded-full bg-yellow-500" /> Warn
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 border border-red-200">
            <div className="w-2 h-2 rounded-full bg-red-500" /> Error
          </span>
        </div>
      </div>

      {/* Modern Filter Form container */}
      <section className=" rounded-2xl shadow-sm border border-slate-200 p-2">
        <FilterForm onFilter={handleFilter} />
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Sifting through log files...</p>
        </div>
      )}

      {/* Results Section */}
      {!loading && data ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Top Row: Responsive Grid for Stats and Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 h-full">
              <StatsCards
                total={data.total_logs}
                matched={data.matched_logs}
              />
            </div>
            <div className="lg:col-span-8 h-full">
              <DistributionPanel
                levelDist={data.level_distribution}
                loggerDist={data.logger_distribution}
              />
            </div>
          </div>

          {/* Bottom Row: Logs Table with horizontal scroll protection */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="font-bold text-slate-700">Search Results</h2>
              <span className="text-xs font-mono bg-white px-2 py-1 rounded border">
                {data.results?.length || 0} entries found
              </span>
            </div>
            <div className="overflow-x-auto">
              <LogsTable logs={data.results} />
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          // Initial Empty State
          <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-slate-100 p-5 rounded-full mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No Query Active</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2">
              Use the filters above to explore logs by service, level, or keywords like "timeout" or "404".
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default LogFiltersPage;