import axios from "axios";

export const API_URL = "http://localhost:3002/";

const accessToken = JSON.parse(
  localStorage.getItem("sb-ydsvyztqzoelxnvyagsn-auth-token")!
)?.access_token;

const api = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

export default api;
