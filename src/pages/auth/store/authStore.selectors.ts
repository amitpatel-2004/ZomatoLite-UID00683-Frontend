import type { RootState } from '@store/index';

export const getIsAuthLoading = (state: RootState) => {
  return state.auth.isLoading;
};
export const getIsFirebaseInitializing = (state: RootState) => {
  return state.auth.isFirebaseInitializing;
};
export const getAuthUser = (state: RootState) => {
  return state.auth.user;
};
export const getAuthBalance = (state: RootState) => {
  return state.auth.user?.balance ?? null;
};
export const getAuthCurrency = (state: RootState) => {
  return state.auth.user?.currency ?? null;
};
export const getIsEmailVerified = (state: RootState) => {
  return state.auth.isEmailVerified;
};
export const getAuthError = (state: RootState) => {
  return state.auth.error;
};
export const getAuthIdToken = (state: RootState) => {
  return state.auth.idToken;
};
