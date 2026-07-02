import type { AuthState } from './authStore.types';

export const initialState: AuthState = {
  error: null,
  idToken: null,
  isEmailVerified: false,
  isFirebaseInitializing: true,
  isLoading: false,
  user: null,
};

export const AUTH_ACTIONS = {
  AUTH_REQUEST_FAILED: 'auth/authRequestFailed',
  AUTH_REQUEST_STARTED: 'auth/authRequestStarted',
  AUTH_REQUEST_SUCCEEDED: 'auth/authRequestSucceeded',
  EMAIL_VERIFICATION_STATUS_UPDATED: 'auth/emailVerificationStatusUpdated',
  FIREBASE_INITIALIZED: 'auth/firebaseInitialized',
  ID_TOKEN_REFRESHED: 'auth/idTokenRefreshed',
  SESSION_CLEARED: 'auth/sessionCleared',
  USER_UPDATED: 'auth/userUpdated',
} as const;
