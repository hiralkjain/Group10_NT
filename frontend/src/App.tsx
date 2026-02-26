import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LogFiltersPage from "./pages/LogFiltersPage";
import { LogProvider } from "./context/LogContext";
import AlertsCenter from "./pages/AlertDashboard";
import LogExplorer from "./pages/LogExplorer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AlertsDashboard from "./pages/AlertDashboard";
function App() {
  return (
    <LogProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/filters" element={<LogFiltersPage />} />
          <Route path="/alerts" element={<AlertsDashboard />} />
          <Route path="/logs" element={<LogExplorer />} />
          {/* Requirement #4: Displaying alerts and why they fired */}
          <Route path="/alerts-dashboard" element={<AlertsCenter />} />
        </Routes>
      </Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/filters"
          element={
            <ProtectedRoute>
              <Layout>
                <LogFiltersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </LogProvider>
  );
}

export default App;
