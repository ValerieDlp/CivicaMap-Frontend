import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
    baseURL: apiBaseUrl.replace(/\/+$/, ''),
    timeout: 60000,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

window.axios = apiClient;

apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('civicamap_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
