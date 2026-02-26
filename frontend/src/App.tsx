import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import LogFiltersPage from "./pages/LogFiltersPage";
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
  );
}

export default App;
