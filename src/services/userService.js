import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

export const getUserById = (userId) => {
  const url = `${API_ENDPOINTS.user}/${userId}`;
  return interceptedAxios.get(url);
};

export const updateBasicInfo = (userId, description, email) => {
  const url = `${API_ENDPOINTS.user}/${userId}/basic`;
  return interceptedAxios.patch(url, {
    description,
    email,
  });
};

export const getAllUsers = (search = null, page = 1) => {
  let url = ``;
  if (search == null) {
    url = `${API_ENDPOINTS.user}?page=${page}&limit=5&sortBy=username&order=asc/`;
  } else {
    url = `${API_ENDPOINTS.user}?search=${search}&page=1&limit=5&sortBy=username&order=asc/`;
  }
  return interceptedAxios.get(url);
};
