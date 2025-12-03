import axios from "axios";

// Configuram URL-ul de baza catre Django
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Interceptor: Adauga automat token-ul la fiecare cerere daca exista
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")).access
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;