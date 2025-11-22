import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",  // ← para desenvolver
  // baseURL: "https://heroesflix-backend.onrender.com",  // ← para produção
});

export default api;
