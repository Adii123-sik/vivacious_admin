import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/queries`;

export const getAllQueries = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const deleteQuery = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
