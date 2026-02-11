import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const API = `${API_BASE_URL}/api/testimonials`;

export const getReviews = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addReview = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateReview = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
