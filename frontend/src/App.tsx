import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import LogFiltersPage from "./pages/LogFiltersPage";
import Dashboard from "./pages/Dashboard";
// Import your provider
import { LogProvider } from "./context/LogContext"; 

function App() {
  return (
    <LogProvider> {/* <--- Add this wrapper here */}
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/filters" element={<LogFiltersPage />} />
        </Routes>
      </Layout>
    </LogProvider>
  );
}

export default App;