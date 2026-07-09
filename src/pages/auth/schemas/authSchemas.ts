import * as Yup from 'yup';

import { PASSWORD_PATTERN } from '@pages/auth/constants/auth.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';

export const strictPasswordSchema = Yup.string()
  .min(6, MESSAGES.VALIDATION.PASSWORD_MIN)
  .max(128, MESSAGES.VALIDATION.PASSWORD_MAX)
  .matches(PASSWORD_PATTERN, MESSAGES.VALIDATION.PASSWORD_PATTERN)
  .required(MESSAGES.VALIDATION.PASSWORD_REQUIRED);
