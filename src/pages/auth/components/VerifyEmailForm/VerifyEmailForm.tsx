import React from 'react';

import { Alert, Button, Typography } from 'antd';

import { MESSAGES as SHARED_MESSAGES } from '@constants/message.constants';
import { ALERT_TYPES, BUTTON_TYPES } from '@constants/style.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';

import { RESEND_STATUS } from './VerifyEmailForm.constants';
import type { VerifyEmailFormProps } from './VerifyEmailForm.types';

import './VerifyEmailForm.scss';

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
        <Alert
          message={MESSAGES.SUCCESS.EMAIL_VERIFICATION_RESENT}
          showIcon
          type={ALERT_TYPES.SUCCESS}
        />
      )}

      {resendStatus === RESEND_STATUS.ERROR && (
        <Alert message={SHARED_MESSAGES.ERRORS.GENERIC} showIcon type={ALERT_TYPES.ERROR} />
      )}

      <Button
        block
        loading={isResending}
        onClick={() => void onResend()}
        type={BUTTON_TYPES.PRIMARY}
      >
        {DISPLAY.ACTIONS.RESEND_VERIFICATION}
      </Button>
    </div>
  );
};
