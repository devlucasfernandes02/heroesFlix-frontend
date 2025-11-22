import api from "../api";

export const login = (email, password) => {
  return api.post("/login", { email, password });
};

export const register = (data) => {
  return api.post("/login/create", data);
};
