import { useDispatch, useSelector } from 'react-redux';

import type { LoginPayload, RegisterPayload } from '@appTypes/auth.types';
import { MESSAGES } from '@constants/message.constants';
import { authService } from '@services/authService';
import {
  authRequestFailed,
  authRequestStarted,
  authRequestSucceeded,
  selectAuthUser,
  selectIsAuthLoading,
  selectIsEmailVerified,
} from '@store/auth';
import type { AppDispatch } from '@store/index';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsAuthLoading);
  const user = useSelector(selectAuthUser);
  const isEmailVerified = useSelector(selectIsEmailVerified);

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

  return { isEmailVerified, isLoading, login, register, resendVerification, user };
};
