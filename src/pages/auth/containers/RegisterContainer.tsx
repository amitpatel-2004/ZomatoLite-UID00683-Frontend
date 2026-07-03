import React from 'react';

import { useNavigate } from 'react-router-dom';

import { message } from 'antd';

import { MESSAGES } from '@constants/message.constants';
import { ROUTES } from '@constants/route.constants';
import type { RegisterFormValues } from '@pages/auth/components/RegisterForm';
import { RegisterForm } from '@pages/auth/components/RegisterForm';
import { useAuth } from '@pages/auth/hooks/useAuth';

export const RegisterContainer = (): React.JSX.Element => {
  const { isLoading, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await register({
        displayName: values.displayName.trim(),
        email: values.email,
        password: values.password,
        role: values.role,
      });
      void message.success('Registration successful! Please verify your email.');
      navigate(ROUTES.AUTH.VERIFY_EMAIL);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
      void message.error(errorMsg);
    }
  };

  return (
    <RegisterForm
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      onLoginClick={() => {
        return navigate(ROUTES.AUTH.LOGIN);
      }}
    />
  );
};
