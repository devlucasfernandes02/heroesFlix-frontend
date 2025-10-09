import axios from 'axios';

const api = axios.create({
  baseURL: 'https://heroesflix-backend.onrender.com/api/',
});

export default api;
