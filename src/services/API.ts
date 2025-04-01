import axios from "axios";

const API = axios.create({
  baseURL: "https://nasiya.takedaservice.uz/api", // API'ning asosiy URL manzili
  headers: {
    "Content-Type": "application/json",
  },
});

// Har bir so‘rov oldidan avtomatik token qo‘shish
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
