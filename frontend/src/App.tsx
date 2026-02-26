import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import LogFiltersPage from "./pages/LogFiltersPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logs" element={<LogFiltersPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
