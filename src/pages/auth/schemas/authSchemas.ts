import * as Yup from 'yup';

import { USER_ROLES } from '@constants/auth.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';

const strictPasswordSchema = Yup.string()
  .min(6, MESSAGES.VALIDATION.PASSWORD_MIN)
  .max(128, MESSAGES.VALIDATION.PASSWORD_MAX)
  .required(MESSAGES.VALIDATION.PASSWORD_REQUIRED);

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email(MESSAGES.VALIDATION.EMAIL_INVALID)
    .max(255, MESSAGES.VALIDATION.EMAIL_MAX)
    .required(MESSAGES.VALIDATION.EMAIL_REQUIRED),
  password: strictPasswordSchema,
});

export const registerValidationSchema = Yup.object({
  displayName: Yup.string()
    .max(100, MESSAGES.VALIDATION.DISPLAY_NAME_MAX)
    .matches(/^[\w '.,-]+$/, MESSAGES.VALIDATION.DISPLAY_NAME_PATTERN)
    .required(MESSAGES.VALIDATION.DISPLAY_NAME_REQUIRED)
    .test('no-whitespace-only', MESSAGES.VALIDATION.DISPLAY_NAME_NO_WHITESPACE, (value) => {
      return Boolean(value && value.trim().length > 0);
    }),
  email: Yup.string()
    .email(MESSAGES.VALIDATION.EMAIL_INVALID)
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
