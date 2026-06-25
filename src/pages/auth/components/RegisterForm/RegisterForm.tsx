import React from 'react';

import { Form as FormikForm } from 'formik';

import { Button, Form, Radio, Typography } from 'antd';

import { PasswordField, RadioGroupField, TextField } from '@components/FormFields';
import { USER_ROLES } from '@constants/auth.constants';
import { BUTTON_TYPES, FORM_LAYOUTS } from '@constants/style.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';

import type { RegisterFormProps } from './RegisterForm.types';

import './RegisterForm.scss';

const { Link, Text } = Typography;

export const RegisterForm = (props: RegisterFormProps): React.JSX.Element => {
  const { isLoading, onLoginClick } = props;

  return (
    <div className="register-form">
      <Form component={false} layout={FORM_LAYOUTS.VERTICAL}>
        <FormikForm className="register-form__form" noValidate>
          <TextField
            label={DISPLAY.LABELS.DISPLAY_NAME}
            name="displayName"
            placeholder={DISPLAY.PLACEHOLDERS.DISPLAY_NAME}
          />

          <TextField
            label={DISPLAY.LABELS.EMAIL}
            name="email"
            placeholder={DISPLAY.PLACEHOLDERS.EMAIL}
            type="email"
          />

          <PasswordField
            label={DISPLAY.LABELS.PASSWORD}
            name="password"
            placeholder={DISPLAY.PLACEHOLDERS.CREATE_PASSWORD}
          />

          <PasswordField
            label={DISPLAY.LABELS.CONFIRM_PASSWORD}
            name="confirmPassword"
            placeholder={DISPLAY.PLACEHOLDERS.CONFIRM_PASSWORD}
          />

          <RadioGroupField label={DISPLAY.LABELS.ROLE} name="role">
            <Radio value={USER_ROLES.CUSTOMER}>{DISPLAY.LABELS.ROLE_CUSTOMER}</Radio>
            <Radio value={USER_ROLES.OWNER}>{DISPLAY.LABELS.ROLE_OWNER}</Radio>
          </RadioGroupField>

          <Form.Item>
            <Button block htmlType="submit" loading={isLoading} type={BUTTON_TYPES.PRIMARY}>
              {DISPLAY.ACTIONS.REGISTER}
            </Button>
          </Form.Item>
        </FormikForm>
      </Form>

      <Text className="register-form__footer">
        {DISPLAY.ACTIONS.ALREADY_HAVE_ACCOUNT}{' '}
        <Link className="register-form__link" onClick={onLoginClick}>
          {DISPLAY.ACTIONS.GO_TO_LOGIN}
        </Link>
      </Text>
    </div>
  );
};
