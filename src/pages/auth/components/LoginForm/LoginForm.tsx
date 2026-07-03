import React from 'react';

import { Field, Form as FormikForm, Formik } from 'formik';

import { Button, Form, Typography } from 'antd';

import { Card } from '@components/Card';
import { PasswordField } from '@components/FormFields/PasswordField';
import { TextField } from '@components/FormFields/TextField';
import { DISPLAY } from '@pages/auth/constants/display.constants';

import { FIELD_CONFIGS, LOGIN_INITIAL_VALUES } from './LoginForm.constants';
import { loginValidationSchema } from './LoginForm.schema';
import type { LoginFormProps } from './LoginForm.types';

import './LoginForm.scss';

const { Link, Text } = Typography;

export const LoginForm = (props: LoginFormProps): React.JSX.Element => {
  const { isLoading, handleSubmit, onRegisterClick } = props;

  return (
    <div className="login-form">
      <Formik
        initialValues={LOGIN_INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={loginValidationSchema}
      >
        <Card subtitle={DISPLAY.LABELS.LOGIN_SUBTITLE} title={DISPLAY.LABELS.LOGIN_TITLE}>
          <FormikForm className="login-form__form" noValidate>
            <Field {...FIELD_CONFIGS.EMAIL} component={TextField} />

            <Field {...FIELD_CONFIGS.PASSWORD} component={PasswordField} />

            <Form.Item>
              <Button block htmlType="submit" loading={isLoading} type="primary">
                {DISPLAY.ACTIONS.LOGIN}
              </Button>
            </Form.Item>
          </FormikForm>
          <Text className="login-form__footer typography__subtitle">
            {DISPLAY.ACTIONS.NO_ACCOUNT}{' '}
            <Link className="login-form__link" onClick={onRegisterClick}>
              {DISPLAY.ACTIONS.GO_TO_REGISTER}
            </Link>
          </Text>
        </Card>
      </Formik>
    </div>
  );
};
