import type { AuthResult, AuthState, AuthUser } from '@appTypes/auth.types';

const AUTH_ACTIONS = {
  AUTH_REQUEST_FAILED: 'auth/authRequestFailed',
  AUTH_REQUEST_STARTED: 'auth/authRequestStarted',
  AUTH_REQUEST_SUCCEEDED: 'auth/authRequestSucceeded',
  EMAIL_VERIFICATION_STATUS_UPDATED: 'auth/emailVerificationStatusUpdated',
  FIREBASE_INITIALIZED: 'auth/firebaseInitialized',
  ID_TOKEN_REFRESHED: 'auth/idTokenRefreshed',
  SESSION_CLEARED: 'auth/sessionCleared',
  USER_UPDATED: 'auth/userUpdated',
} as const;

type AuthRequestFailedAction = { type: typeof AUTH_ACTIONS.AUTH_REQUEST_FAILED; payload: string };
type AuthRequestStartedAction = { type: typeof AUTH_ACTIONS.AUTH_REQUEST_STARTED };
type AuthRequestSucceededAction = {
  type: typeof AUTH_ACTIONS.AUTH_REQUEST_SUCCEEDED;
  payload: AuthResult;
};
type EmailVerificationStatusUpdatedAction = {
  type: typeof AUTH_ACTIONS.EMAIL_VERIFICATION_STATUS_UPDATED;
  payload: boolean;
};
type IdTokenRefreshedAction = {
  type: typeof AUTH_ACTIONS.ID_TOKEN_REFRESHED;
  payload: string;
};
type SessionClearedAction = { type: typeof AUTH_ACTIONS.SESSION_CLEARED };
type UserUpdatedAction = { type: typeof AUTH_ACTIONS.USER_UPDATED; payload: AuthUser };

type FirebaseInitializedAction = { type: typeof AUTH_ACTIONS.FIREBASE_INITIALIZED };

type AuthAction =
  | AuthRequestFailedAction
  | AuthRequestStartedAction
  | AuthRequestSucceededAction
  | EmailVerificationStatusUpdatedAction
  | FirebaseInitializedAction
  | IdTokenRefreshedAction
  | SessionClearedAction
  | UserUpdatedAction;

const initialState: AuthState = {
  error: null,
  idToken: null,
  isEmailVerified: false,
  isFirebaseInitializing: true,
  isLoading: false,
  user: null,
};

export const authRequestFailed = (payload: string): AuthRequestFailedAction => ({
  payload,
  type: AUTH_ACTIONS.AUTH_REQUEST_FAILED,
});

export const authRequestStarted = (): AuthRequestStartedAction => ({
  type: AUTH_ACTIONS.AUTH_REQUEST_STARTED,
});

export const authRequestSucceeded = (payload: AuthResult): AuthRequestSucceededAction => ({
  payload,
  type: AUTH_ACTIONS.AUTH_REQUEST_SUCCEEDED,
});

export const firebaseInitialized = (): FirebaseInitializedAction => ({
  type: AUTH_ACTIONS.FIREBASE_INITIALIZED,
});

export const emailVerificationStatusUpdated = (
  payload: boolean,
): EmailVerificationStatusUpdatedAction => ({
  payload,
  type: AUTH_ACTIONS.EMAIL_VERIFICATION_STATUS_UPDATED,
});

export const idTokenRefreshed = (payload: string): IdTokenRefreshedAction => ({
  payload,
  type: AUTH_ACTIONS.ID_TOKEN_REFRESHED,
});

export const sessionCleared = (): SessionClearedAction => ({
  type: AUTH_ACTIONS.SESSION_CLEARED,
});

export const userUpdated = (payload: AuthUser): UserUpdatedAction => ({
  payload,
  type: AUTH_ACTIONS.USER_UPDATED,
});

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_REQUEST_FAILED:
      return { ...state, error: action.payload, isLoading: false };

    case AUTH_ACTIONS.AUTH_REQUEST_STARTED:
      return { ...state, error: null, isLoading: true };

    case AUTH_ACTIONS.AUTH_REQUEST_SUCCEEDED:
      return {
        ...state,
        error: null,
        idToken: action.payload.idToken,
        isEmailVerified: action.payload.isEmailVerified,
        isLoading: false,
        user: action.payload.user,
      };

    case AUTH_ACTIONS.EMAIL_VERIFICATION_STATUS_UPDATED:
      return { ...state, isEmailVerified: action.payload };

    case AUTH_ACTIONS.FIREBASE_INITIALIZED:
      return { ...state, isFirebaseInitializing: false };

    case AUTH_ACTIONS.ID_TOKEN_REFRESHED:
      return { ...state, idToken: action.payload };

    case AUTH_ACTIONS.SESSION_CLEARED:
      return {
        ...state,
        error: null,
        idToken: null,
        isEmailVerified: false,
        isLoading: false,
        user: null,
      };

    case AUTH_ACTIONS.USER_UPDATED:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
