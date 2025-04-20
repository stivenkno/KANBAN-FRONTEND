import axios from "axios";

const API_URL = "https://kanban-backend-pqc0.onrender.com/auth/login";

const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

(".default.headers.common: Para poner por default el token en todas las consultas");

export function getToken() {
  return (apiInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`);
}

getToken();

export function setToken(token) {
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default apiInstance;
