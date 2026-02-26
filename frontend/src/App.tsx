import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LogFiltersPage from "./pages/LogFiltersPage";
import AlertsCenter from "./pages/AlertDashboard"; 
import UserManagementPage from "./pages/UserManagement";
import Login from "./pages/auth/Login";
import { LogProvider } from "./context/LogContext"; 
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import ResolutionHub from "./pages/ResolutionHub";

// A wrapper to protect routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <LogProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/filters" element={<ProtectedRoute><LogFiltersPage /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><AlertsCenter /></ProtectedRoute>} />
          <Route path="/resolve" element={<ProtectedRoute><ResolutionHub /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UserManagementPage /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LogProvider>
    </AuthProvider>
  );
}

export default App;