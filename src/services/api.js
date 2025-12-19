import axios from 'axios';

// Automatically chooses URL based on environment
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL: BASE_URL,
});


// 1. Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. Response Interceptor (FIXED)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

    
        if (originalRequest.url.includes('login/')) {
            return Promise.reject(error);
        }

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh');
                
                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: refreshToken
                });

                localStorage.setItem('access', response.data.access);
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                return api(originalRequest);

            } catch (refreshError) {
                console.log("Session expired.");
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/'; 
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;