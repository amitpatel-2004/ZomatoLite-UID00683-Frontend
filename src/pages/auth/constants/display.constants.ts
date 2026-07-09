export const DISPLAY = {
  LABELS: {
    EMAIL: 'Email',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    DISPLAY_NAME: 'Display Name',
    ROLE: 'I am a',
    ROLE_CUSTOMER: 'Customer',
    ROLE_OWNER: 'Restaurant Owner',
    LOGIN_TITLE: 'Welcome back',
    LOGIN_SUBTITLE: 'Log in to your account',
    REGISTER_TITLE: 'Join us',
    REGISTER_SUBTITLE: 'Create your account to get started',
    VERIFY_EMAIL_TITLE: 'Verify your email',
    VERIFY_EMAIL_SUBTITLE:
      "We've sent a verification link to your email. Click the link to continue.",
  },
  PLACEHOLDERS: {
    DISPLAY_NAME: 'Enter your full name',
    EMAIL: 'Enter your email address',
    PASSWORD: 'Enter your password',
    CREATE_PASSWORD: 'Create a strong password',
    CONFIRM_PASSWORD: 'Re-enter your password',
  },
  ACTIONS: {
    LOGIN: 'Log In',
    REGISTER: 'Create Account',
    RESEND_VERIFICATION: 'Resend Email',
    RESEND_VERIFICATION_COOLDOWN: (seconds: number) => {
      return `Resend Email (${seconds}s)`;
    },
    LOGOUT: 'Log Out',
    GO_TO_LOGIN: 'Back to Login',
    GO_TO_REGISTER: 'Create an account',
    ALREADY_HAVE_ACCOUNT: 'Already have an account?',
    NO_ACCOUNT: "Don't have an account?",
    VERIFYING_SESSION: 'Verifying session...',
  },
} as const;
