import type { AuthState } from './authSlice.types';

export const initialState: AuthState = {
  error: null,
  idToken: null,
  isEmailVerified: false,
  isFirebaseInitializing: true,
  isLoading: false,
  user: null,
};
