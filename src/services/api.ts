import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Create an Axios instance with a base URL
const api: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7032/',
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers['Authorization'] = `Bearer ${token || ''}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    console.log(error.response.data.errors.toString());
    return error;
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response) {
      console.error('Response error:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
