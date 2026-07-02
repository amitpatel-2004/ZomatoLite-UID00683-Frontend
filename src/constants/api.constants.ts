/** Base URL for backend API requests. */
export const API_BASE_URL = process.env.API_BASE_URL;

/** Versioned API prefix. */
const V1 = '/api/v1';

/** Backend endpoint paths. */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${V1}/auth/login`,
    REGISTER: `${V1}/auth/register`,
  },
} as const;

export const API_TIMEOUT = 10000;

export const API_HEADERS = {
  BASE: {
    'Content-Type': 'application/json',
  },
  AUTHORIZATION: (token: string) => {
    return {
      Authorization: `Bearer ${token}`,
    };
  },
} as const;
