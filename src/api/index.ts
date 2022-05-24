import axios from 'axios';
import { API_URL, TOKEN } from '../constants/authorization';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const myConfig = JSON.parse(JSON.stringify(config));

  myConfig.headers!.Authorization = `Bearer ${localStorage.getItem(TOKEN)}`;

  return myConfig;
});

export default api;
