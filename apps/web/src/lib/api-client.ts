import axios from "axios";
import { config } from "@/config";

const api = axios.create({
  baseURL: config.VITE_API_URL || "http://localhost:3000",
});

// Attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;