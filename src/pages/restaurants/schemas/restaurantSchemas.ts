import * as Yup from 'yup';

import { MESSAGES } from '@pages/restaurants/constants/messages.constants';

export const restaurantValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(100, MESSAGES.VALIDATION.NAME_MAX)
    .required(MESSAGES.VALIDATION.NAME_REQUIRED),
  description: Yup.string().trim(),
  cuisineTypes: Yup.array().of(Yup.string()),
  openingTime: Yup.string().required(MESSAGES.VALIDATION.OPENING_TIME_REQUIRED),
  closingTime: Yup.string().required(MESSAGES.VALIDATION.CLOSING_TIME_REQUIRED),
});
