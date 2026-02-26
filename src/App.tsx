import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import { LogProvider } from "./context/LogContext";


function App() {

  return (
    <LogProvider>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </LogProvider>
  );
}

export default App;