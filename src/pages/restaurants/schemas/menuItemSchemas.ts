import * as Yup from 'yup';

import { MESSAGES } from '@pages/restaurants/constants/messages.constants';

export const menuItemValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(100, MESSAGES.VALIDATION.NAME_MAX)
    .required(MESSAGES.VALIDATION.NAME_REQUIRED),
  description: Yup.string().trim(),
  price: Yup.number()
    .typeError(MESSAGES.VALIDATION.PRICE_INVALID)
    .moreThan(0, MESSAGES.VALIDATION.PRICE_POSITIVE)
    .required(MESSAGES.VALIDATION.PRICE_REQUIRED),
  isVeg: Yup.boolean().required(),
  quantity: Yup.number()
    .typeError(MESSAGES.VALIDATION.QUANTITY_INVALID)
    .min(0, MESSAGES.VALIDATION.QUANTITY_NEGATIVE)
    .nullable()
    .optional(),
});
