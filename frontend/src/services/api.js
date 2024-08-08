import axios from 'axios';

console.log('API Base URL:', process.env.REACT_APP_API_URL); // Log da URL base da API

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default api;
