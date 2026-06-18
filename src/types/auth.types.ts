/** The two possible user roles in the platform. */
export type UserRole = 'customer' | 'owner';

/** Authenticated user profile returned from the backend. */
export interface AuthUser {
  _id: string;
  email: string;
  displayName: string;
  role: UserRole;
}

/** Shape of the `data` field in a successful auth API response. */
export interface AuthResponseData {
  /** Firebase custom token issued by the backend for client-side sign-in. */
  customToken: string;
  user: AuthUser;
}

/** Top-level auth API response envelope. */
export interface AuthApiResponse {
  message: string;
  data: AuthResponseData;
}

/** Redux auth slice state. */
export interface AuthState {
  user: AuthUser | null;
  /** Short-lived Firebase ID token used in Authorization request headers. */
  idToken: string | null;
  isLoading: boolean;
  /** Whether the current user's email address has been verified. */
  isEmailVerified: boolean;
  /** Server or Firebase error message from the last failed operation. */
  error: string | null;
}

/** Payload for the login request. */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Payload for the register request. */
export interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
}

/** Data resolved after a successful login or register operation. */
export interface AuthResult {
  user: AuthUser;
  /** Short-lived Firebase ID token. */
  idToken: string;
  isEmailVerified: boolean;
}

/** Formik field values for the login form. */
export interface LoginFormValues {
  email: string;
  password: string;
}

/** Formik field values for the registration form. */
export interface RegisterFormValues {
  displayName: string;
  email: string;
  password: string;
  /** Must match `password` — validated client-side only, not sent to backend. */
  confirmPassword: string;
  role: UserRole;
}
