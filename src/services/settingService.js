import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const API = `${API_BASE_URL}/api/settings`;

export const getSettings = async () => {
  const { data } = await axios.get(API);
  return data;
};

export const updateSettings = async (form) => {
  const formData = new FormData();

  Object.keys(form).forEach((key) => {
    if (form[key] !== undefined && form[key] !== null) {
      formData.append(key, form[key]);
    }
  });

  const { data } = await axios.put(API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
