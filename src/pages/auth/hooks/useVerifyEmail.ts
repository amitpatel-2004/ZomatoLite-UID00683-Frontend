import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { MESSAGES } from '@constants/message.constants';
import { authRequestFailed, authService } from '@store/auth';
import type { AppDispatch, RootState } from '@store/index';

export const useVerifyEmail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'error' | 'sending' | 'sent'>('sending');
  const localEmail = user?.email || null;

  const handleResend = async (): Promise<void> => {
    setIsResending(true);
    setResendStatus('sending');
    try {
      await authService.resendVerification();
      setResendStatus('sent');
    } catch (error) {
      setResendStatus('error');
      const message =
        error instanceof Error ? error.message : MESSAGES.AUTH.EMAIL_VERIFICATION_RESENT_FAIL;
      dispatch(authRequestFailed(message));
    } finally {
      setIsResending(false);
    }
  };

  return {
    localEmail,
    isResending,
    resendStatus,
    handleResend,
  };
};
