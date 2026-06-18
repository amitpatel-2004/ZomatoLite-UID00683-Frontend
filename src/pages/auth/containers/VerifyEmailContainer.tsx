import React from 'react';

import { Alert, Button, Space, Typography } from 'antd';

import { MESSAGES } from '@constants/message.constants';

import { useVerifyEmail } from '../hooks/useVerifyEmail';

const { Text } = Typography;

export const VerifyEmailContainer = (): React.JSX.Element => {
  const { localEmail, isResending, resendStatus, handleResend } = useVerifyEmail();

  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Space direction="vertical" size="middle" style={{ textAlign: 'center', width: '100%' }}>
        {localEmail && (
          <Text strong style={{ display: 'block' }}>
            {localEmail}
          </Text>
        )}

        {resendStatus === 'sent' && (
          <Alert
            message={MESSAGES.AUTH.EMAIL_VERIFICATION_RESENT}
            showIcon
            style={{ width: '100%' }}
            type="success"
          />
        )}

        {resendStatus === 'error' && (
          <Alert
            message={MESSAGES.ERRORS.GENERIC}
            showIcon
            style={{ width: '100%' }}
            type="error"
          />
        )}

        <Button block loading={isResending} onClick={() => void handleResend()} type="primary">
          {MESSAGES.LABELS.RESEND_VERIFICATION}
        </Button>
      </Space>
    </div>
  );
};
