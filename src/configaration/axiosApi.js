import axios from 'axios';
import { API_BASE_URL } from './constants';

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
//Url Shorter Back-end