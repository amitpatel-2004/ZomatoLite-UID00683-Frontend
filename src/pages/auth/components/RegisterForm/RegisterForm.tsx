import { MESSAGES } from '@constants/MessageConstants';
import { Button, Form, Input, Radio, Typography } from 'antd';
import React from 'react';

import type { RegisterFormProps } from './registerForm.types';

const { Link, Text } = Typography;

export const RegisterForm = (props: RegisterFormProps): React.JSX.Element => {
  const { formik, isLoading, onLoginClick } = props;
  const { errors, handleBlur, handleChange, handleSubmit, touched, values } = formik;

  return (
    <div className="register-form">
      <Form className="register-form__form" layout="vertical" onFinish={() => handleSubmit()}>
        <Form.Item
          help={touched.displayName && errors.displayName ? errors.displayName : undefined}
          htmlFor="displayName"
          label={MESSAGES.LABELS.DISPLAY_NAME}
          validateStatus={touched.displayName && errors.displayName ? 'error' : undefined}
        >
          <Input
            id="displayName"
            name="displayName"
            placeholder="Enter your full name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.displayName}
          />
        </Form.Item>

        <Form.Item
          help={touched.email && errors.email ? errors.email : undefined}
          htmlFor="email"
          label={MESSAGES.LABELS.EMAIL}
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
          label={MESSAGES.LABELS.PASSWORD}
          validateStatus={touched.password && errors.password ? 'error' : undefined}
        >
          <Input.Password
            id="password"
            name="password"
            placeholder="Create a strong password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
          />
        </Form.Item>

        <Form.Item
          help={
            touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined
          }
          htmlFor="confirmPassword"
          label={MESSAGES.LABELS.CONFIRM_PASSWORD}
          validateStatus={touched.confirmPassword && errors.confirmPassword ? 'error' : undefined}
        >
          <Input.Password
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.confirmPassword}
          />
        </Form.Item>

        <Form.Item
          help={touched.role && errors.role ? errors.role : undefined}
          label={MESSAGES.LABELS.ROLE}
          validateStatus={touched.role && errors.role ? 'error' : undefined}
        >
          <Radio.Group name="role" onBlur={handleBlur} onChange={handleChange} value={values.role}>
            <Radio value="customer">{MESSAGES.LABELS.ROLE_CUSTOMER}</Radio>
            <Radio value="owner">{MESSAGES.LABELS.ROLE_OWNER}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" loading={isLoading} type="primary">
            {MESSAGES.LABELS.REGISTER}
          </Button>
        </Form.Item>
      </Form>

      <Text className="register-form__footer">
        {MESSAGES.LABELS.ALREADY_HAVE_ACCOUNT}{' '}
        <Link className="register-form__link" onClick={onLoginClick}>
          {MESSAGES.LABELS.GO_TO_LOGIN}
        </Link>
      </Text>
    </div>
  );
};
