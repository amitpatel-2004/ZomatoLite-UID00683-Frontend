import { sendEmailVerification, signInWithCustomToken, signOut } from 'firebase/auth';

import type {
  AuthApiResponse,
  AuthResult,
  LoginPayload,
  RegisterPayload,
} from '@appTypes/auth.types';
import { API_ENDPOINTS } from '@constants/api.constants';
import { apiClient } from '@core/api';
import { firebaseAuth } from '@core/firebase';

const getActionCodeSettings = () => ({
  url: `${window.location.origin}/restaurant/dashboard`,
  handleCodeInApp: false,
});

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
    return { idToken, isEmailVerified, user: data.data.user };
  },

  register: async (payload: RegisterPayload): Promise<AuthResult> => {
    const { data } = await apiClient.post<AuthApiResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
    const { idToken, isEmailVerified } = await exchangeCustomToken(data.data.customToken);

    if (firebaseAuth.currentUser) {
      await sendEmailVerification(firebaseAuth.currentUser, getActionCodeSettings());
    }

    return { idToken, isEmailVerified, user: data.data.user };
  },

  resendVerification: async (): Promise<void> => {
    if (firebaseAuth.currentUser) {
      await sendEmailVerification(firebaseAuth.currentUser, getActionCodeSettings());
    } else {
      throw new Error('No user is currently logged in');
    }
  },

  logout: async (): Promise<void> => {
    await signOut(firebaseAuth);
  },
};
