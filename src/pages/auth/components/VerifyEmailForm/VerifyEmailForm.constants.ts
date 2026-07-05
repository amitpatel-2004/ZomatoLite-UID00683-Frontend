export const RESEND_STATUS = {
  ERROR: 'error',
  SENDING: 'sending',
  SENT: 'sent',
} as const;

/** Duration for which the resend button stays disabled after click. */
export const RESEND_COOLDOWN_SECONDS = 10;

export const COOLDOWN_TICK_MS = 1000;
