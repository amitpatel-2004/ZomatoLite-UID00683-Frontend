import type { AuthState, AuthThunkResult, AuthUser } from '@appTypes/Auth.types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  error: null,
  idToken: null,
  isEmailVerified: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    authRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    authRequestStarted: (state) => {
      state.error = null;
      state.isLoading = true;
    },

    authRequestSucceeded: (state, action: PayloadAction<AuthThunkResult>) => {
      state.error = null;
      state.idToken = action.payload.idToken;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.isLoading = false;
      state.user = action.payload.user;
    },

    emailVerificationStatusUpdated: (state, action: PayloadAction<boolean>) => {
      state.isEmailVerified = action.payload;
    },

    idTokenRefreshed: (state, action: PayloadAction<string>) => {
      state.idToken = action.payload;
    },

    sessionCleared: (state) => {
      state.error = null;
      state.idToken = null;
      state.isEmailVerified = false;
      state.isLoading = false;
      state.user = null;
    },

    userUpdated: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
  },
});

export const {
  authRequestFailed,
  authRequestStarted,
  authRequestSucceeded,
  emailVerificationStatusUpdated,
  idTokenRefreshed,
  sessionCleared,
  userUpdated,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
