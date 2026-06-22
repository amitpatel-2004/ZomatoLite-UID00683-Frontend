import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

import { API_BASE_URL, API_HEADERS, API_TIMEOUT } from '@constants/api.constants';
import { MESSAGES } from '@constants/message.constants';
import { firebaseAuth } from '@core/firebase/firebase.config';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: API_HEADERS.BASE,
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
