import React from 'react';

import { Button, Form, Input, Typography } from 'antd';

import { DISPLAY } from '@pages/auth/constants/display.constants';

import type { LoginFormProps } from './LoginForm.types';

const { Link, Text } = Typography;

export const LoginForm = (props: LoginFormProps): React.JSX.Element => {
  const { formik, isLoading, onRegisterClick } = props;
  const { errors, handleBlur, handleChange, handleSubmit, touched, values } = formik;

  return (
    <div className="login-form">
      <Form className="login-form__form" layout="vertical" onFinish={() => handleSubmit()}>
        <Form.Item
          help={touched.email && errors.email ? errors.email : undefined}
          htmlFor="email"
          label={DISPLAY.LABELS.EMAIL}
          validateStatus={touched.email && errors.email ? 'error' : undefined}
        >
          <Input
            id="email"
            name="email"
            placeholder="Enter your email address"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
          />
        </Form.Item>

        <Form.Item
          help={touched.password && errors.password ? errors.password : undefined}
          htmlFor="password"
          label={DISPLAY.LABELS.PASSWORD}
          validateStatus={touched.password && errors.password ? 'error' : undefined}
        >
          <Input.Password
            id="password"
            name="password"
            placeholder="Enter your password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
          />
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" loading={isLoading} type="primary">
            {DISPLAY.ACTIONS.LOGIN}
          </Button>
        </Form.Item>
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
