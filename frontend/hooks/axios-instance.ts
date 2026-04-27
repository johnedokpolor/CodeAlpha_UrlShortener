import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1000",
  timeout: 10000, // 10 seconds,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
