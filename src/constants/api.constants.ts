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
  RESTAURANTS: {
    BASE: `${V1}/restaurants`,
    MINE: `${V1}/restaurants/mine`,
    byId: (id: string) => {
      return `${V1}/restaurants/${id}`;
    },
    menuItems: (id: string) => {
      return `${V1}/restaurants/${id}/menu-items`;
    },
    menuItemById: (restaurantId: string, itemId: string) => {
      return `${V1}/restaurants/${restaurantId}/menu-items/${itemId}`;
    },
    menuItemImageUpload: (restaurantId: string) => {
      return `${V1}/restaurants/${restaurantId}/menu-items/image-upload`;
    },
  },
};

export const API_TIMEOUT = 10000;

export const API_HEADERS = {
  BASE: {
    'Content-Type': 'application/json',
  },
} as const;
