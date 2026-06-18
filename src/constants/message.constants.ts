/**
 * Global system status message definitions.
 */
export const MESSAGES = {
  ERRORS: {
    UNAUTHORIZED_ACCESS: 'Access Denied: You do not have permissions to view this resource.',
    GENERIC: 'Something went wrong. Please try again.',
  },

  AUTH: {
    LOGIN_SUCCESS: 'Logged in successfully.',
    REGISTER_SUCCESS: 'Account created! Please verify your email.',
    LOGOUT_SUCCESS: 'Logged out successfully.',
    EMAIL_VERIFICATION_SENT: 'Verification email sent. Please check your inbox.',
    EMAIL_VERIFICATION_RESENT: 'Verification email resent.',
    EMAIL_VERIFICATION_RESENT_FAIL: 'Failed to resend verification email.',
    EMAIL_ALREADY_VERIFIED: 'Your email is already verified.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  },

  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    EMAIL_MAX: 'Email must be at most 255 characters.',
    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_MAX: 'Password must be at most 128 characters.',
    PASSWORD_MIN: 'Password must be at least 6 characters.',
    PASSWORD_CONFIRM_REQUIRED: 'Please confirm your password.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
    DISPLAY_NAME_REQUIRED: 'Display name is required.',
    DISPLAY_NAME_MAX: 'Display name must be at most 100 characters.',
    DISPLAY_NAME_NO_WHITESPACE: 'Display name cannot be empty or only spaces.',
    ROLE_REQUIRED: 'Please select a role.',
    ROLE_INVALID: 'Role must be either customer or owner.',
  },

  LABELS: {
    EMAIL: 'Email',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    DISPLAY_NAME: 'Display Name',
    ROLE: 'I am a',
    ROLE_CUSTOMER: 'Customer',
    ROLE_OWNER: 'Restaurant Owner',
    LOGIN: 'Log In',
    REGISTER: 'Create Account',
    RESEND_VERIFICATION: 'Resend Email',
    LOGOUT: 'Log Out',
    GO_TO_LOGIN: 'Back to Login',
    GO_TO_REGISTER: 'Create an account',
    ALREADY_HAVE_ACCOUNT: 'Already have an account?',
    NO_ACCOUNT: "Don't have an account?",
    VERIFYING_SESSION: 'Verifying session...',
  },

  PAGE_TITLES: {
    LOGIN: 'Welcome back',
    LOGIN_SUBTITLE: 'Log in to your account',
    REGISTER: 'Join us',
    REGISTER_SUBTITLE: 'Create your account to get started',
    VERIFY_EMAIL: 'Verify your email',
    VERIFY_EMAIL_SUBTITLE:
      "We've sent a verification link to your email. Click the link to continue.",
  },
} as const;
