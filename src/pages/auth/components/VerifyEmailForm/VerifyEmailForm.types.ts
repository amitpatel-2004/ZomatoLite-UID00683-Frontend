import { type ValueOf } from '@appTypes/common.types';

export const RESEND_STATUS = {
  ERROR: 'error',
  SENDING: 'sending',
  SENT: 'sent',
} as const;

export type ResendStatus = ValueOf<typeof RESEND_STATUS>;

export type VerifyEmailFormProps = {
  localEmail: string | null;
  isResending: boolean;
  resendStatus: ResendStatus;
  onResend: () => Promise<void>;
};
