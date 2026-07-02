import * as Yup from 'yup';

import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { strictPasswordSchema } from '@pages/auth/schemas/authSchemas';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email(MESSAGES.VALIDATION.EMAIL_INVALID)
    .max(255, MESSAGES.VALIDATION.EMAIL_MAX)
    .required(MESSAGES.VALIDATION.EMAIL_REQUIRED),
  password: strictPasswordSchema,
});
