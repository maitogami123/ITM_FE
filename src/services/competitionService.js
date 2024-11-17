import axios from "axios";
import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

// export const getAllUnits = (search = null, page = 1) => {
//   let url = ``;
//   if (search == null) {
//     url = `${API_ENDPOINTS.unit}?page=${page}&limit=5&sortBy=name&order=asc/`;
//   } else {
//     url = `${API_ENDPOINTS.unit}?search=${search}&page=1&limit=5&sortBy=name&order=asc/`;
//   }
//   return interceptedAxios.get(url);
// };

export const getAllCompetitions = () => {
  const url = `${API_ENDPOINTS.competition}/`;
  return interceptedAxios.get(url);
};

export const getCompetitionById = (id) => {
  const url = `${API_ENDPOINTS.competition}/${id}/`;
  return interceptedAxios.get(url);
};
