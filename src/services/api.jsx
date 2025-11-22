import axios from "axios";

const api = axios.create({
  baseURL: "https://heroesflix-backend.onrender.com/api",  // ← para desenvolver
  // baseURL: "http://localhost:8000/api",  // ← para produção
});

export default api;
