import * as Yup from 'yup';

import { MESSAGES } from '@pages/auth/constants/messages.constants';

export const strictPasswordSchema = Yup.string()
  .min(6, MESSAGES.VALIDATION.PASSWORD_MIN)
  .max(128, MESSAGES.VALIDATION.PASSWORD_MAX)
  .required(MESSAGES.VALIDATION.PASSWORD_REQUIRED);
