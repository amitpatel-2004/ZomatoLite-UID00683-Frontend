import { AUTH_ACTIONS, initialState } from './authStore.constants';
import type { AuthAction, AuthState } from './authStore.types';

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
