import { useNavigate } from 'react-router-dom';

import { message } from 'antd';

import { ROUTES } from '@constants/route.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { authService } from '@services/authService';
import { sessionCleared } from '@store/auth';
import { useAppDispatch } from '@store/hooks';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await authService.logout();
      dispatch(sessionCleared());
      navigate(ROUTES.AUTH.LOGIN);
    } catch {
      void message.error(MESSAGES.ERRORS.LOGOUT_FAILED);
    }
  };

  return { logout };
};
