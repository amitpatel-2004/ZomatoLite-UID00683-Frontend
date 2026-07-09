import { useSelector } from 'react-redux';

import { MESSAGES } from '@constants/message.constants';
import {
  authRequestFailed,
  authRequestStarted,
  authRequestSucceeded,
  getAuthUser,
  getIsAuthLoading,
  getIsEmailVerified,
  sessionCleared,
} from '@pages/auth/store';
import { authService } from '@services/auth/authService';
import type { LoginPayload, RegisterPayload } from '@services/auth/authService.types';
import { useAppDispatch } from '@store/hooks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsAuthLoading);
  const user = useSelector(getAuthUser);
  const isEmailVerified = useSelector(getIsEmailVerified);

  const login = async (payload: LoginPayload): Promise<void> => {
    dispatch(authRequestStarted());
    try {
      const result = await authService.login(payload);
      dispatch(authRequestSucceeded(result));
    } catch (error) {
      const message = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
      dispatch(authRequestFailed(message));
      throw error;
    }
  };

  const register = async (payload: RegisterPayload): Promise<void> => {
    dispatch(authRequestStarted());
    try {
      const result = await authService.register(payload);
      dispatch(authRequestSucceeded(result));
    } catch (error) {
      const message = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
      dispatch(authRequestFailed(message));
      throw error;
    }
  };

  const resendVerification = async (): Promise<void> => {
    try {
      await authService.resendVerification();
    } catch (error) {
      const message = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
      dispatch(authRequestFailed(message));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      dispatch(sessionCleared());
    } catch (error) {
      const message = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
      dispatch(authRequestFailed(message));
      throw error;
    }
  };

  return { isEmailVerified, isLoading, login, logout, register, resendVerification, user };
};
