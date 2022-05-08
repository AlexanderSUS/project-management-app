import axios from 'axios';
import { API_URL, TOKEN } from '../app/constants/authorization';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem(TOKEN)}`;
  return config;
});

export default api;
