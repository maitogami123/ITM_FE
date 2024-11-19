import axios from "axios";
import { API_ENDPOINTS } from "../utils/constant";
import interceptedAxios from "./axiosRequest";

export const getAllUnits = () => {
  const url = `${API_ENDPOINTS.unit}/`;
  return interceptedAxios.get(url);
};

export const getUnitById = (id) => {
  const url = `${API_ENDPOINTS.unit}/${id}/`;
  return interceptedAxios.get(url);
};

export const removeStaffFromUnit = (staffId, unitId) => {
  const url = `${API_ENDPOINTS.unit}/${unitId}/staff/${staffId}`;
  return interceptedAxios.delete(url);
};

export const createUnit = ({ name }) => {
  const url = `${API_ENDPOINTS.unit}/`;
  return interceptedAxios.post(url, {
    name,
  });
};

export const updateUnit = ({ id, name }) => {
  const url = `${API_ENDPOINTS.unit}/${id}/`;
  return interceptedAxios.patch(url, {
    name,
  });
};

export const deleteUnit = ({ id }) => {
  const url = `${API_ENDPOINTS.unit}/${id}`;
  return interceptedAxios.delete(url);
};
