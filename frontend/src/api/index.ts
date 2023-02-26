import axios from "axios";

export const API_URL = "https://lettre.giftto.ru/";

const accessToken: string = localStorage.getItem("token")!;

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
