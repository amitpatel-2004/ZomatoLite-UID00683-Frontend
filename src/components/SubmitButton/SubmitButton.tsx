import React from 'react';

import { Button, Form } from 'antd';

import { BUTTON_TYPES } from '@constants/style.constants';

import type { SubmitButtonProps } from './SubmitButton.types';

export const SubmitButton = (props: SubmitButtonProps): React.JSX.Element => {
  const { children, loading } = props;

  return (
    <Form.Item>
      <Button block htmlType="submit" loading={loading} type={BUTTON_TYPES.PRIMARY}>
        {children}
      </Button>
    </Form.Item>
  );
};
