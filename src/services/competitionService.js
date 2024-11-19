import axios from "axios";
import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

export const getAllCompetitions = async (search = null, page = 1) => {
  let url = ``;
  if (search == null) {
    url = `${API_ENDPOINTS.competition}?page=${page}&limit=5&sortBy=year&order=asc/`;
  } else {
    url = `${API_ENDPOINTS.competition}?search=${search}&page=1&limit=5&sortBy=year&order=asc/`;
  }
  return await interceptedAxios.get(url);
};

export const getCompetitionById = (id) => {
  const url = `${API_ENDPOINTS.competition}/${id}/`;
  return interceptedAxios.get(url);
};

export const createCompetition = async ({
  title,
  year,
  description,
  projects = [],
  staffs = [],
  rewards = [],
}) => {
  const competitionData = {
    title,
    year,
    description,
    projects,
    staffs,
    rewards,
  };
  const url = `${API_ENDPOINTS.competition}`;
  return await interceptedAxios.post(url, competitionData);
};
