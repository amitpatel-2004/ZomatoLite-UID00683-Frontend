export type UserRole = 'customer' | 'owner';

export type AuthUser = {
  _id: string;
  email: string;
  displayName: string;
  role: UserRole;
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

export type AuthResult = {
  user: AuthUser;
  idToken: string;
  isEmailVerified: boolean;
};
