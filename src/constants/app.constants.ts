import type { Currency } from '@appTypes/common.types';

export const APP_NAME = 'Zomato Lite';

export const DEFAULT_CURRENCY: Currency = { code: 'INR', symbol: '₹' };

export const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
