import Sidebar from "../components/Sidebar";
import AlertsChart from "../components/AlertsChart";
import AlertsTable from "../components/AlertsTable";

export default function AlertsDashboard() {
  return (
    <div
      className="
      flex min-h-screen transition-colors duration-300
      bg-gray-50 dark:bg-gray-950
    "
    >
      <Sidebar />

      <div className="flex-1 p-8">
        <h1
          className="text-3xl font-bold mb-8
                       text-gray-800 dark:text-white"
        >
          Issues & Activity
        </h1>

        <AlertsChart />
        <AlertsTable />
      </div>
    </div>
  );
}