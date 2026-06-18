import { MESSAGES } from '@constants/MessageConstants';
import * as Yup from 'yup';

const strictPasswordSchema = Yup.string()
  .min(6, 'Password must be at least 6 characters long')
  .matches(/[A-Za-z]/, 'Password must contain at least one letter')
  .matches(/\d/, 'Password must contain at least one number')
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
    .required(MESSAGES.VALIDATION.DISPLAY_NAME_REQUIRED)
    .test('no-whitespace-only', MESSAGES.VALIDATION.DISPLAY_NAME_NO_WHITESPACE, (value) =>
      Boolean(value && value.trim().length > 0),
    ),
  email: Yup.string()
    .email(MESSAGES.VALIDATION.EMAIL_INVALID)
    .max(255, MESSAGES.VALIDATION.EMAIL_MAX)
    .required(MESSAGES.VALIDATION.EMAIL_REQUIRED),
  password: strictPasswordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], MESSAGES.VALIDATION.PASSWORD_MISMATCH)
    .required(MESSAGES.VALIDATION.PASSWORD_CONFIRM_REQUIRED),
  role: Yup.string()
    .oneOf(['customer', 'owner'], MESSAGES.VALIDATION.ROLE_INVALID)
    .required(MESSAGES.VALIDATION.ROLE_REQUIRED),
});
