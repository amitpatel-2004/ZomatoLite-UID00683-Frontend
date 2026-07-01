import { ROUTES } from '@constants/route.constants';

export const ERROR_PAGE_DEFAULTS = {
  BUTTON_TEXT: 'Back Home',
  REDIRECT_TO: ROUTES.AUTH.LOGIN,
  STATUS: '404',
  SUB_TITLE: 'Sorry, the page you visited does not exist.',
  TITLE: '404',
} as const;
