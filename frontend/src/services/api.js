import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://e4rthen.pythonanywhere.com/api';

console.log('API Base URL:', baseURL);  

const api = axios.create({
    baseURL: baseURL
});

api.interceptors.request.use(config => {
    console.log('Request URL:', config.baseURL + config.url); 
    const token = localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens')).access
        : null;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;