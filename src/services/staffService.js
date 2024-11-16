import axios from "axios";
import { API_ENDPOINTS } from "../utils/constant";

export const getAllStaffs = (search) => {
  const token = localStorage.getItem("token"); // Replace with your actual method of retrieving the token

  // Set the authorization header for the request
  const bearerToken = token ? `Bearer ${token}` : "";
  const url = `${API_ENDPOINTS.staff}?search=${search}&page=1&limit=5&sortBy=name&order=asc/`;
  return axios.get(url, {
    headers: {
      Authorization: bearerToken,
    },
  });
};

export const getStaffById = (id) => {
  const token = localStorage.getItem("token"); // Replace with your actual method of retrieving the token

  // Set the authorization header for the request
  const bearerToken = token ? `Bearer ${token}` : "";
  const url = `${API_ENDPOINTS.staff}/${id}`;
  return axios.get(url, {
    headers: {
      Authorization: bearerToken,
    },
  });
};
