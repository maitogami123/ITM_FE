import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

export const getUserById = (userId) => {
  const url = `${API_ENDPOINTS.user}/${userId}`;
  return interceptedAxios.get(url);
};

export const getUserDetails = (userId) => {
  const url = `${API_ENDPOINTS.user}/${userId}/detailed`;
  return interceptedAxios.get(url);
};

export const updateBasicInfo = (userId, description, email) => {
  const url = `${API_ENDPOINTS.user}/${userId}/basic`;
  return interceptedAxios.patch(url, {
    description,
    email,
  });
};

export const createUser = ({ username, password, email, role, staff }) => {
  const url = `${API_ENDPOINTS.user}/`;
  return interceptedAxios.post(url, {
    username,
    password,
    email,
    role,
    staff,
  });
};

export const updateUser = ({ _id, username, password, email, role, staff }) => {
  const url = `${API_ENDPOINTS.user}/${_id}`;
  return interceptedAxios.patch(url, {
    username,
    password,
    email,
    role,
    staff,
  });
};

export const deleteUser = ({ id }) => {
  const url = `${API_ENDPOINTS.user}/${id}`;
  return interceptedAxios.delete(url);
};

export const getAllUsers = (search = null, page = 1) => {
  let url = ``;
  if (search == null) {
    url = `${API_ENDPOINTS.user}?page=${page}&limit=5&sortBy=username&order=asc`;
  } else {
    url = `${API_ENDPOINTS.user}?search=${search}&page=1&limit=5&sortBy=username&order=as`;
  }
  return interceptedAxios.get(url);
};
