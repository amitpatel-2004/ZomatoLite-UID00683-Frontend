import type { AuthResult, AuthUser } from '@services/auth/authService.types';

import { AUTH_ACTIONS } from './authStore.constants';
import type {
  AuthRequestFailedAction,
  AuthRequestStartedAction,
  AuthRequestSucceededAction,
  EmailVerificationStatusUpdatedAction,
  FirebaseInitializedAction,
  IdTokenRefreshedAction,
  SessionClearedAction,
  UserUpdatedAction,
} from './authStore.types';

export const authRequestFailed = (payload: string): AuthRequestFailedAction => {
  return {
    payload,
    type: AUTH_ACTIONS.AUTH_REQUEST_FAILED,
  };
};

export const authRequestStarted = (): AuthRequestStartedAction => {
  return {
    type: AUTH_ACTIONS.AUTH_REQUEST_STARTED,
  };
};

export const authRequestSucceeded = (payload: AuthResult): AuthRequestSucceededAction => {
  return {
    payload,
    type: AUTH_ACTIONS.AUTH_REQUEST_SUCCEEDED,
  };
};

export const firebaseInitialized = (): FirebaseInitializedAction => {
  return {
    type: AUTH_ACTIONS.FIREBASE_INITIALIZED,
  };
};

export const emailVerificationStatusUpdated = (
  payload: boolean,
): EmailVerificationStatusUpdatedAction => {
  return {
    payload,
    type: AUTH_ACTIONS.EMAIL_VERIFICATION_STATUS_UPDATED,
  };
};

export const idTokenRefreshed = (payload: string): IdTokenRefreshedAction => {
  return {
    payload,
    type: AUTH_ACTIONS.ID_TOKEN_REFRESHED,
  };
};

export const sessionCleared = (): SessionClearedAction => {
  return {
    type: AUTH_ACTIONS.SESSION_CLEARED,
  };
};

export const userUpdated = (payload: AuthUser): UserUpdatedAction => {
  return {
    payload,
    type: AUTH_ACTIONS.USER_UPDATED,
  };
};
