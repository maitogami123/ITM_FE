import axios from "axios";
import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

export const getAllStaffs = (search = null, page = 1) => {
  let url = ``;
  if (search == null) {
    url = `${API_ENDPOINTS.staff}?page=${page}&limit=5&sortBy=name&order=asc`;
  } else {
    url = `${API_ENDPOINTS.staff}?search=${search}&page=1&limit=5&sortBy=name&order=asc`;
  }
  return interceptedAxios.get(url);
};

export const getStaffById = (id) => {
  const url = `${API_ENDPOINTS.staff}/${id}`;
  return interceptedAxios.get(url);
};

export const getAvailableStaff = () => {
  const url = `${API_ENDPOINTS.staff}/available`;
  return interceptedAxios.get(url);
};

export const getStaffUnitless = () => {
  const url = `${API_ENDPOINTS.staff}/unitless`;
  return interceptedAxios.get(url);
};

export const getListSalaryIncrements = (
  search = null,
  page = 1,
  sortBy = "name",
  order = "asc",
  limit = 5
) => {
  let url = ``;
  if (search == null) {
    url = `${API_ENDPOINTS.staff}/increments?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
  } else {
    url = `${API_ENDPOINTS.staff}/increments?search=${search}&page=1&limit=${limit}&sortBy=${sortBy}&order=${order}`;
  }
  return interceptedAxios.get(url);
};

export const updateStaffUnit = ({ staffId, unitId }) => {
  const url = `${API_ENDPOINTS.staff}/${staffId}/unit/${unitId}`;
  return interceptedAxios.patch(url);
};

export const createStaff = (data) => {
  const url = `${API_ENDPOINTS.staff}/`;
  return interceptedAxios.post(url, data);
};

export const deleteStaff = ({ id }) => {
  const url = `${API_ENDPOINTS.staff}/${id}`;
  return interceptedAxios.delete(url);
};

export const updateStaff = (data) => {
  const url = `${API_ENDPOINTS.staff}/${data._id}`;
  return interceptedAxios.patch(url, data);
};

export const getExportSalary = () => {
  const url = `${API_ENDPOINTS.staff}/export/salary`;
  return interceptedAxios.get(url, {
    responseType: "blob", // Quan trọng: Cấu hình để nhận blob
  });
};
