import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LogFiltersPage from "./pages/LogFiltersPage";
import { LogProvider } from "./context/LogContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <LogProvider>
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
