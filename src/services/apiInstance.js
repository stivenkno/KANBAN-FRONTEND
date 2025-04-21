import axios from "axios";

// Obtener el token del localStorage
const token = localStorage.getItem("token");

// Crear una instancia de Axios con el token en los headers
export const apiInstance = axios.create({
  baseURL: "https://kanban-backend-pqc0.onrender.com", // Cambia esto a tu URL base
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete apiInstance.defaults.headers["Authorization"];
  }
};

export default apiInstance;
