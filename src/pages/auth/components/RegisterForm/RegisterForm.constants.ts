import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';

export const REGISTER_INITIAL_VALUES = {
  confirmPassword: '',
  displayName: '',
  email: '',
  password: '',
  role: USER_ROLES.CUSTOMER,
};

export const FIELD_CONFIGS = {
  CONFIRM_PASSWORD: {
    label: DISPLAY.LABELS.CONFIRM_PASSWORD,
    name: 'confirmPassword',
    placeholder: DISPLAY.PLACEHOLDERS.CONFIRM_PASSWORD,
  },
  CREATE_PASSWORD: {
    label: DISPLAY.LABELS.PASSWORD,
    name: 'password',
    placeholder: DISPLAY.PLACEHOLDERS.CREATE_PASSWORD,
  },
  DISPLAY_NAME: {
    label: DISPLAY.LABELS.DISPLAY_NAME,
    name: 'displayName',
    placeholder: DISPLAY.PLACEHOLDERS.DISPLAY_NAME,
  },
  EMAIL: {
    label: DISPLAY.LABELS.EMAIL,
    name: 'email',
    placeholder: DISPLAY.PLACEHOLDERS.EMAIL,
    type: 'email',
  },
  ROLE: {
    label: DISPLAY.LABELS.ROLE,
    name: 'role',
  },
} as const;
