import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

// ✅ BACKTICKS + API_BASE_URL
const API_URL = `${API_BASE_URL}/api/partners`;

export const getPartners = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getPartnerById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const addPartner = async (formData) => {
  const { data } = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updatePartner = async (id, formData) => {
  const { data } = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deletePartner = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
