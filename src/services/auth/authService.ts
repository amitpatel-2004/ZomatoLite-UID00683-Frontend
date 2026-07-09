import { sendEmailVerification, signInWithCustomToken, signOut } from 'firebase/auth';

import { API_ENDPOINTS } from '@constants/api.constants';
import { apiClient } from '@core/api/apiClient';
import { firebaseAuth } from '@core/firebase/firebaseClient';
import { MESSAGES } from '@pages/auth/constants/messages.constants';

import type {
  AuthApiResponse,
  AuthResult,
  LoginPayload,
  RegisterPayload,
} from './authService.types';

const getActionCodeSettings = () => {
  return {
    url: `${window.location.origin}`,
    handleCodeInApp: false,
  };
};

const exchangeCustomToken = async (
  customToken: string,
): Promise<{ idToken: string; isEmailVerified: boolean }> => {
  const userCredential = await signInWithCustomToken(firebaseAuth, customToken);
  const idToken = await userCredential.user.getIdToken();
  const isEmailVerified = userCredential.user.emailVerified;
  return { idToken, isEmailVerified };
};

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResult> => {
    const { data } = await apiClient.post<AuthApiResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
    const { idToken, isEmailVerified } = await exchangeCustomToken(data.data.customToken);
    return {
      idToken,
      isEmailVerified,
      user: data.data.user,
    };
  },

  register: async (payload: RegisterPayload): Promise<AuthResult> => {
    const { data } = await apiClient.post<AuthApiResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
    const { idToken, isEmailVerified } = await exchangeCustomToken(data.data.customToken);

    if (firebaseAuth.currentUser) {
      await sendEmailVerification(firebaseAuth.currentUser, getActionCodeSettings());
    }

    return {
      idToken,
      isEmailVerified,
      user: data.data.user,
    };
  },

  resendVerification: async (): Promise<void> => {
    if (firebaseAuth.currentUser) {
      await sendEmailVerification(firebaseAuth.currentUser, getActionCodeSettings());
    } else {
      throw new Error(MESSAGES.ERRORS.NOT_LOGGED_IN);
    }
  },

  logout: async (): Promise<void> => {
    await signOut(firebaseAuth);
  },
};
