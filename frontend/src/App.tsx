import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LogFiltersPage from "./pages/LogFiltersPage";
import AlertsTable from "./components/AlertsTable";
// You will need to create these components based on the Problem Statement
// import AlertsCenter from "./pages/AlertsCenter";
import { LogProvider } from "./context/LogContext";
import AlertsCenter from "./pages/AlertDashboard";

function App() {
  return (
    <LogProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/filters" element={<LogFiltersPage />} />
          <Route path="/alerts" element={<AlertsTable />} />
          {/* Requirement #4: Displaying alerts and why they fired */}
          <Route path="/alerts-dashboard" element={<AlertsCenter />} />
        </Routes>
      </Layout>
    </LogProvider>
  );
}

export default App;
