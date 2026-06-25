export type UserRole = 'customer' | 'owner';

export type AuthUser = {
  _id: string;
  email: string;
  displayName: string;
  role: UserRole;
};

export type AuthResponseData = {
  /** Firebase custom token for client-side sign-in. */
  customToken: string;
  user: AuthUser;
};

export type AuthApiResponse = {
  message: string;
  data: AuthResponseData;
};

export type AuthState = {
  user: AuthUser | null;
  /** Firebase ID token to be used in Authorization request header. */
  idToken: string | null;
  isLoading: boolean;
  isEmailVerified: boolean;
  isFirebaseInitializing: boolean;
  error: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
};

export type AuthResult = {
  user: AuthUser;
  idToken: string;
  isEmailVerified: boolean;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};
