import api from "./api";
import axios from "axios";

const BASE_URL_ROOT = "http://localhost:8000";

export const getUsers = () => {
  return axios.get(`${BASE_URL_ROOT}/users`);
};

export const getProfiles = (userId) => {

    return axios.get(`${BASE_URL_ROOT}/users/${userId}/profiles`);
};

export const createProfile = (userId, name) => {

    return axios.post(`${BASE_URL_ROOT}/users/${userId}/profiles`, { name });
};

export const deleteProfile = (userId, profileId) => {

    return axios.delete(`${BASE_URL_ROOT}/users/${userId}/profiles/${profileId}`);
};