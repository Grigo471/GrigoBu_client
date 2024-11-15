import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_KEY } from '../const/localStorage';

export interface RefreshResponse {
    accessToken: string,
    refreshToken: string,
}

export const apiErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.data.message) {
        return error.response?.data.message;
    }
    return undefined;
};

const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || ''}`,
    },
});

$api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ?? '';
    if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

$api.interceptors.response.use((config) => config, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<RefreshResponse>(
                `${__API__}/auth/refresh`,
                { withCredentials: true },
            );
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Не авторизован');
        }
    }
    throw error;
});

export default $api;
