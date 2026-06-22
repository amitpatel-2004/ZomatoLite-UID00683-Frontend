import React from 'react';

import { Alert, Button, Typography } from 'antd';

import { MESSAGES as SHARED_MESSAGES } from '@constants/message.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';

import type { VerifyEmailFormProps } from './VerifyEmailForm.types';
import { RESEND_STATUS } from './VerifyEmailForm.types';

const { Text } = Typography;

export const VerifyEmailForm = (props: VerifyEmailFormProps): React.JSX.Element => {
  const { localEmail, isResending, resendStatus, onResend } = props;

  return (
    <div className="verify-email-form">
      {localEmail && (
        <Text className="verify-email-form__email" strong>
          {localEmail}
        </Text>
      )}

      {resendStatus === RESEND_STATUS.SENT && (
        <Alert message={MESSAGES.SUCCESS.EMAIL_VERIFICATION_RESENT} showIcon type="success" />
      )}

      {resendStatus === RESEND_STATUS.ERROR && (
        <Alert message={SHARED_MESSAGES.ERRORS.GENERIC} showIcon type="error" />
      )}

      <Button block loading={isResending} onClick={() => void onResend()} type="primary">
        {DISPLAY.ACTIONS.RESEND_VERIFICATION}
      </Button>
    </div>
  );
};
