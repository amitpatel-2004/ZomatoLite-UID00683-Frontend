import type { AuthResult, AuthUser } from '@services/auth/authService.types';

import { AUTH_ACTIONS } from './authStore.constants';

export type AuthRequestFailedAction = {
  type: typeof AUTH_ACTIONS.AUTH_REQUEST_FAILED;
  payload: string;
};
export type AuthRequestStartedAction = { type: typeof AUTH_ACTIONS.AUTH_REQUEST_STARTED };
export type AuthRequestSucceededAction = {
  type: typeof AUTH_ACTIONS.AUTH_REQUEST_SUCCEEDED;
  payload: AuthResult;
};
export type EmailVerificationStatusUpdatedAction = {
  type: typeof AUTH_ACTIONS.EMAIL_VERIFICATION_STATUS_UPDATED;
  payload: boolean;
};
export type IdTokenRefreshedAction = {
  type: typeof AUTH_ACTIONS.ID_TOKEN_REFRESHED;
  payload: string;
};
export type SessionClearedAction = { type: typeof AUTH_ACTIONS.SESSION_CLEARED };
export type UserUpdatedAction = { type: typeof AUTH_ACTIONS.USER_UPDATED; payload: AuthUser };
export type FirebaseInitializedAction = { type: typeof AUTH_ACTIONS.FIREBASE_INITIALIZED };

export type AuthAction =
  | AuthRequestFailedAction
  | AuthRequestStartedAction
  | AuthRequestSucceededAction
  | EmailVerificationStatusUpdatedAction
  | FirebaseInitializedAction
  | IdTokenRefreshedAction
  | SessionClearedAction
  | UserUpdatedAction;

export type AuthState = {
  user: AuthUser | null;
  idToken: string | null;
  isLoading: boolean;
  isEmailVerified: boolean;
  isFirebaseInitializing: boolean;
  error: string | null;
};
