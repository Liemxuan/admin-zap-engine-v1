import axios from 'axios';
import { STORAGE_KEYS } from '../constants';

const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'vi';

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        config.headers['lang'] = lang;
        
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
