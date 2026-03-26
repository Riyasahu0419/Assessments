import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const enhanceText = (prompt) => {
  return axios.post(`${BASE_URL}/text/enhance`, { prompt });
};

export const generateImage = (prompt) => {
  return axios.post(`${BASE_URL}/image/generate`, { prompt });
};

export const analyzeImage = (formData) => {
  return axios.post(`${BASE_URL}/image/analyze`, formData);
};