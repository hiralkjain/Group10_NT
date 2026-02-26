import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LogFiltersPage from "./pages/LogFiltersPage";
<<<<<<< HEAD
import Alerts from "./pages/Alerts";
import AlertsDashboard from "./pages/AlertDashboard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logs" element={<LogFiltersPage />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/alerts-dashboard" element={<AlertsDashboard />} />
      </Routes>
    </Layout>
=======
// You will need to create these components based on the Problem Statement
// import AlertsCenter from "./pages/AlertsCenter"; 
import { LogProvider } from "./context/LogContext"; 

function App() {
  return (
    <LogProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/filters" element={<LogFiltersPage />} />
          {/* Requirement #4: Displaying alerts and why they fired */}
          {/* <Route path="/alerts" element={<AlertsCenter />} /> */}
        </Routes>
      </Layout>
    </LogProvider>
>>>>>>> a83c2ae47578322a3bf8a94042c681abe497d5c2
  );
}

export default App;