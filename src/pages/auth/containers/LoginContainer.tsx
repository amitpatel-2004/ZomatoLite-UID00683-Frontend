import React from 'react';

import { useNavigate } from 'react-router-dom';

import { message } from 'antd';

import { MESSAGES } from '@constants/message.constants';
import { ROUTES } from '@constants/route.constants';
import type { LoginFormValues } from '@pages/auth/components/LoginForm';
import { LoginForm } from '@pages/auth/components/LoginForm';
import { useAuth } from '@pages/auth/hooks/useAuth';

export const LoginContainer = (): React.JSX.Element => {
  const { isLoading, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      navigate(ROUTES.RESTAURANT.DASHBOARD);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
      void message.error(errorMsg);
    }
  };

  return (
    <LoginForm
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      onRegisterClick={() => {
        return navigate(ROUTES.AUTH.REGISTER);
      }}
    />
  );
};
