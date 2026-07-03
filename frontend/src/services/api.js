import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
//create instance
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; //inject token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// auto log out if token expired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
export default api;
