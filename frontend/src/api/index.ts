import axios from "axios";

export const API_URL = "http://localhost:3002/";

const api = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  baseURL: API_URL,
});

export default api;
