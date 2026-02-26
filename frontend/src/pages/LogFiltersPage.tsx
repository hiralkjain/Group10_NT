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
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Log Filtering Dashboard
      </h1>

      <FilterForm onFilter={handleFilter} />

      {loading && <p className="mt-4 text-blue-500">Loading...</p>}

      {data && (
        <>
          <StatsCards
            total={data.total_logs}
            matched={data.matched_logs}
          />

          <DistributionPanel
            levelDist={data.level_distribution}
            loggerDist={data.logger_distribution}
          />

          <LogsTable logs={data.results} />
        </>
      )}
    </div>
  );
};

export default LogFiltersPage;