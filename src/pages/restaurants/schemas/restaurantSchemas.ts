import * as Yup from 'yup';

import { MESSAGES } from '@pages/restaurants/constants/messages.constants';

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const restaurantValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(100, MESSAGES.VALIDATION.NAME_MAX)
    .required(MESSAGES.VALIDATION.NAME_REQUIRED),
  description: Yup.string().trim().max(500),
  cuisineTypes: Yup.array()
    .of(Yup.string())
    .min(1, MESSAGES.VALIDATION.CUISINE_TYPES_REQUIRED)
    .required(MESSAGES.VALIDATION.CUISINE_TYPES_REQUIRED),
  openingTime: Yup.string()
    .matches(TIME_REGEX, MESSAGES.VALIDATION.TIME_FORMAT_INVALID)
    .required(MESSAGES.VALIDATION.OPENING_TIME_REQUIRED),
  closingTime: Yup.string()
    .matches(TIME_REGEX, MESSAGES.VALIDATION.TIME_FORMAT_INVALID)
    .required(MESSAGES.VALIDATION.CLOSING_TIME_REQUIRED),
});
