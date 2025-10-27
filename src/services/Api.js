import axios from "axios";
import { useNavigate } from "react-router-dom";

// Cria uma instância do Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Adiciona o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de resposta para capturar 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logout automático
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiration");
      window.location.href = "/"; // redireciona para login
    }
    return Promise.reject(error);
  }
);

export default api;
