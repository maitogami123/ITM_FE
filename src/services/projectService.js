import axios from "axios";
import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

export const getAllRewards = (search = null, page = 1) => {
  let url = ``;
  if (search == null) {
    url = `${API_ENDPOINTS.reward}?page=${page}&limit=5&sortBy=title&order=asc/`;
  } else {
    url = `${API_ENDPOINTS.reward}?search=${search}&page=1&limit=5&sortBy=title&order=asc/`;
  }
  return interceptedAxios.get(url);
};

export const getRewardById = (id) => {
  const url = `${API_ENDPOINTS.reward}/${id}`;
  return interceptedAxios.get(url);
};
