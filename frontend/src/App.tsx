import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LogFiltersPage from "./pages/LogFiltersPage";
// You will need to create these components based on the Problem Statement
import AlertsCenter from "./pages/AlertDashboard"; 
import { LogProvider } from "./context/LogContext"; 

function App() {
  return (
    <LogProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/filters" element={<LogFiltersPage />} />
          {/* Requirement #4: Displaying alerts and why they fired */}
          <Route path="/alerts" element={<AlertsCenter />} />
        </Routes>
      </Layout>
    </LogProvider>
  );
}

export default App;