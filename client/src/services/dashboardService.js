import axios from "axios";

const API_URL =
  "http://localhost:5000/api/candidates";


const getHeaders = () => {
  const token =
    localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};


export const getDashboardCandidates =
  async () => {
    return await axios.get(API_URL, {
      headers: getHeaders(),
    });
  };