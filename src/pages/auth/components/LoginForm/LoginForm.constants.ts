import { DISPLAY } from '@pages/auth/constants/display.constants';

export const LOGIN_INITIAL_VALUES = {
  email: '',
  password: '',
};

export const FIELD_CONFIGS = {
  EMAIL: {
    label: DISPLAY.LABELS.EMAIL,
    name: 'email',
    placeholder: DISPLAY.PLACEHOLDERS.EMAIL,
    type: 'email',
  },
  PASSWORD: {
    label: DISPLAY.LABELS.PASSWORD,
    name: 'password',
    placeholder: DISPLAY.PLACEHOLDERS.PASSWORD,
  },
} as const;
