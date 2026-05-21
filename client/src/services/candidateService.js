import axios from "axios";

const API_URL =
  "http://localhost:5000/api/candidates";


const getToken = () => {
  return localStorage.getItem("token");
};


const getHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};


export const getCandidates = async () => {
  return await axios.get(API_URL, {
    headers: getHeaders(),
  });
};


export const getCandidate = async (id) => {
  return await axios.get(
    `${API_URL}/${id}`,
    {
      headers: getHeaders(),
    }
  );
};


export const createCandidate = async (
  data
) => {
  return await axios.post(API_URL, data, {
    headers: getHeaders(),
  });
};


export const updateCandidate = async (
  id,
  data
) => {
  return await axios.put(
    `${API_URL}/${id}`,
    data,
    {
      headers: getHeaders(),
    }
  );
};


export const deleteCandidate = async (
  id
) => {
  return await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: getHeaders(),
    }
  );
};