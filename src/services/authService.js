import axios from "axios";
import { API_ENDPOINTS } from "../utils/constant";

export const register = (username, password) => {
  return axios.post(`${API_ENDPOINTS.auth}/register`, { username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_ENDPOINTS.auth}/login`, { username, password });
};
