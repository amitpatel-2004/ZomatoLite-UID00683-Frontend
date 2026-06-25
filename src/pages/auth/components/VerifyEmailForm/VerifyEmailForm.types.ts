import type { ValueOf } from '@appTypes/common.types';

import { RESEND_STATUS } from './VerifyEmailForm.constants';

export type ResendStatus = ValueOf<typeof RESEND_STATUS>;

export type VerifyEmailFormProps = {
  localEmail: string | null;
  isResending: boolean;
  resendStatus: ResendStatus;
  onResend: () => Promise<void>;
};
