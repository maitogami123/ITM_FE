import axios from "axios";
import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

export const getAllRewards = (search = null, page = 1) => {
  let url = ``;
  if (search == null) {
    url = `${API_ENDPOINTS.reward}?page=${page}&limit=5&sortBy=title&order=asc`;
  } else {
    url = `${API_ENDPOINTS.reward}?search=${search}&page=1&limit=5&sortBy=title&order=asc`;
  }
  return interceptedAxios.get(url);
};

export const getRewardById = (id) => {
  const url = `${API_ENDPOINTS.reward}/${id}`;
  return interceptedAxios.get(url);
};

export const createReward = async ({
  title,
  date,
  staff = null,
  competition = null,
}) => {
  const rewardData = {
    title,
    date,
    staff,
    competition,
  };
  const url = `${API_ENDPOINTS.reward}`;
  return await interceptedAxios.post(url, rewardData);
};

export const updateReward = async (id, { title, date, staff, competition }) => {
  const rewardData = {
    title,
    date,
    staff,
    competition,
  };

  // URL endpoint để cập nhật competition
  const url = `${API_ENDPOINTS.reward}/${id}`;

  try {
    const response = await interceptedAxios.put(url, rewardData);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update competition"
    );
  }
};
