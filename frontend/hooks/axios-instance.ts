import axios from "axios";

const api = axios.create({
  baseURL: "https://snip0-api.vercel.app",
  timeout: 20000, // 20 seconds,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
