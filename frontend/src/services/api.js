import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://e4rthen.pythonanywhere.com/api'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens')).access
        : null;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;