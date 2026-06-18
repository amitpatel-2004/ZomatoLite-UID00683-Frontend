import { API_BASE_URL, API_TIMEOUT } from '@constants/ApiConstants';
import { MESSAGES } from '@constants/MessageConstants';
import { firebaseAuth } from '@core/firebase';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_TIMEOUT,
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError): Promise<never> => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>): Promise<never> => {
    const backendMessage = error.response?.data?.message;
    const errorMessage = backendMessage ?? error.message ?? MESSAGES.ERRORS.GENERIC;

    return Promise.reject(new Error(errorMessage));
  },
);
