import axios from "axios";
import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

export const getAllStaffs = (search = null, page = 1) => {
  let url = ``;
  if (search == null) {
    url = `${API_ENDPOINTS.staff}?page=${page}&limit=5&sortBy=name&order=asc/`;
  } else {
    url = `${API_ENDPOINTS.staff}?search=${search}&page=1&limit=5&sortBy=name&order=asc/`;
  }
  return interceptedAxios.get(url);
};

export const getStaffById = (id) => {
  const url = `${API_ENDPOINTS.staff}/${id}`;
  return interceptedAxios.get(url);
};
