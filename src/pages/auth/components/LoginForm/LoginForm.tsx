import React from 'react';

import { Form as FormikForm } from 'formik';

import { Button, Form, Typography } from 'antd';

import { PasswordField, TextField } from '@components/FormFields';
import { FORM_LAYOUTS } from '@constants/style.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';

import type { LoginFormProps } from './LoginForm.types';

import './LoginForm.scss';

const { Link, Text } = Typography;

export const LoginForm = (props: LoginFormProps): React.JSX.Element => {
  const { isLoading, onRegisterClick } = props;

  return (
    <div className="login-form">
      <Form component={false} layout={FORM_LAYOUTS.VERTICAL}>
        <FormikForm className="login-form__form" noValidate>
          <TextField
            label={DISPLAY.LABELS.EMAIL}
            name="email"
            placeholder={DISPLAY.PLACEHOLDERS.EMAIL}
            type="email"
          />

          <PasswordField
            label={DISPLAY.LABELS.PASSWORD}
            name="password"
            placeholder={DISPLAY.PLACEHOLDERS.PASSWORD}
          />

          <Form.Item>
            <Button block htmlType="submit" loading={isLoading} type="primary">
              {DISPLAY.ACTIONS.LOGIN}
            </Button>
          </Form.Item>
        </FormikForm>
      </Form>

      <Text className="login-form__footer">
        {DISPLAY.ACTIONS.NO_ACCOUNT}{' '}
        <Link className="login-form__link" onClick={onRegisterClick}>
          {DISPLAY.ACTIONS.GO_TO_REGISTER}
        </Link>
      </Text>
    </div>
  );
};
