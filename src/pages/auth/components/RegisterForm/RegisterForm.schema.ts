import * as Yup from 'yup';

import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { strictPasswordSchema } from '@pages/auth/schemas/authSchemas';

import { DISPLAY_NAME_PATTERN, EMAIL_PATTERN } from './RegisterForm.constants';

export const registerValidationSchema = Yup.object({
  displayName: Yup.string()
    .max(100, MESSAGES.VALIDATION.DISPLAY_NAME_MAX)
    .matches(DISPLAY_NAME_PATTERN, MESSAGES.VALIDATION.DISPLAY_NAME_PATTERN)
    .required(MESSAGES.VALIDATION.DISPLAY_NAME_REQUIRED)
    .test('no-whitespace-only', MESSAGES.VALIDATION.DISPLAY_NAME_NO_WHITESPACE, (value) => {
      return Boolean(value && value.trim().length > 0);
    }),
  email: Yup.string()
    .email(MESSAGES.VALIDATION.EMAIL_INVALID)
    .matches(EMAIL_PATTERN, MESSAGES.VALIDATION.EMAIL_INVALID)
    .max(255, MESSAGES.VALIDATION.EMAIL_MAX)
    .required(MESSAGES.VALIDATION.EMAIL_REQUIRED),
  password: strictPasswordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], MESSAGES.VALIDATION.PASSWORD_MISMATCH)
    .required(MESSAGES.VALIDATION.PASSWORD_CONFIRM_REQUIRED),
  role: Yup.string()
    .oneOf(Object.values(USER_ROLES), MESSAGES.VALIDATION.ROLE_INVALID)
    .required(MESSAGES.VALIDATION.ROLE_REQUIRED),
});
