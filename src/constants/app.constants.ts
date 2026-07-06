import type { Currency } from '@appTypes/common.types';

export const APP_NAME = 'Zomato Lite';

export const DEFAULT_CURRENCY: Currency = { code: 'INR', symbol: '₹' };

export const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const MS_PER_MINUTE = 60000;
export const MS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
