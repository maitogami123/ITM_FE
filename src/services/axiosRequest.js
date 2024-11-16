import { API_BASE_URL } from "@/utils/constant";
import axios from "axios";

// Create axios instance
const interceptedAxios = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor
interceptedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from local storage or any other storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No token found, redirecting to login...");
      // Optionally, redirect to login page or show an alert
      // window.location.href = '/login'; // Uncomment to redirect
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default interceptedAxios;
