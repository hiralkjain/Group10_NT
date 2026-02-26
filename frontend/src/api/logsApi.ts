import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const filterLogs = async (filters: any) => {
  const response = await axios.post(`${API_BASE}/logs/filter`, filters);
  return response.data;
};