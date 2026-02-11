import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";


export const adminLogin = async (data) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/admin/login`,
      data,
      
      {
        
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      }
    );

    return res.data; // 🔴 THIS IS IMPORTANT
  } catch (error) {
    console.error("LOGIN API ERROR 👉", error);

    throw new Error(
      error.response?.data?.message || "Server not responding"
    );
  }
};
