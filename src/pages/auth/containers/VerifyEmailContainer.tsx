import React, { useEffect, useState } from 'react';

import { Card } from '@components/Card';
import { VerifyEmailForm } from '@pages/auth/components/VerifyEmailForm';
import {
  COOLDOWN_TICK_MS,
  RESEND_COOLDOWN_SECONDS,
  RESEND_STATUS,
} from '@pages/auth/components/VerifyEmailForm/VerifyEmailForm.constants';
import type { ResendStatus } from '@pages/auth/components/VerifyEmailForm/VerifyEmailForm.types';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { useAuth } from '@pages/auth/hooks/useAuth';

export const VerifyEmailContainer = (): React.JSX.Element => {
  const { user, resendVerification } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<ResendStatus>(RESEND_STATUS.SENDING);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const localEmail = user?.email ?? null;

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setTimeout(() => {
      setCooldownSeconds((prev) => {
        return prev - 1;
      });
    }, COOLDOWN_TICK_MS);
    return () => {
      return clearTimeout(timer);
    };
  }, [cooldownSeconds]);

  const handleResend = async (): Promise<void> => {
    setIsResending(true);
    setResendStatus(RESEND_STATUS.SENDING);
    try {
      await resendVerification();
      setResendStatus(RESEND_STATUS.SENT);
      setCooldownSeconds(RESEND_COOLDOWN_SECONDS);
    } catch {
      setResendStatus(RESEND_STATUS.ERROR);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card subtitle={DISPLAY.LABELS.VERIFY_EMAIL_SUBTITLE} title={DISPLAY.LABELS.VERIFY_EMAIL_TITLE}>
      <VerifyEmailForm
        cooldownSeconds={cooldownSeconds}
        isResending={isResending}
        localEmail={localEmail}
        onResend={handleResend}
        resendStatus={resendStatus}
      />
    </Card>
  );
};
