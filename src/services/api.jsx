import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",  // ← para desenvolver
  // baseURL: "https://heroesflix-backend.onrender.com/api",  // ← para produção
});

export default api;
