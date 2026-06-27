import type { RootState } from '@store/rootReducer';

export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectIsFirebaseInitializing = (state: RootState) => state.auth.isFirebaseInitializing;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthBalance = (state: RootState) => state.auth.user?.balance ?? null;
export const selectAuthCurrency = (state: RootState) => state.auth.user?.currency ?? null;
export const selectIsEmailVerified = (state: RootState) => state.auth.isEmailVerified;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthIdToken = (state: RootState) => state.auth.idToken;
