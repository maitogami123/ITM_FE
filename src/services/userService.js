import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

export const getUserById = (userId) => {
  const url = `${API_ENDPOINTS.user}/${userId}`;
  return interceptedAxios.get(url);
};
