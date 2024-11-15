import { API_BASE_URL } from "@/utils/constant";
import axios from "axios";

// Create axios instance
const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
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

// Add a response interceptor if needed
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example of making a GET request
instance
  .get("/your-endpoint")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
