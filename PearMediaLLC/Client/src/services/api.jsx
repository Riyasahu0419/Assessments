import axios from "axios";

const BASE_URL = "https://assessments-rfis.vercel.app/api" || "http://localhost:5000/api";
console.log("API BASE_URL:", BASE_URL);

export const enhanceText = (prompt) => {
  return axios.post(`${BASE_URL}/text/enhance`, { prompt });
};

export const generateImage = (prompt) => {
  return axios.post(`${BASE_URL}/image/generate`, { prompt });
};

export const analyzeImage = (formData) => {
  return axios.post(`${BASE_URL}/image/analyze`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};