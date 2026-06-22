import React from 'react';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import type { LoginFormValues } from '@appTypes/auth.types';
import { Card } from '@components/Card';
import { MESSAGES } from '@constants/message.constants';
import { ROUTES } from '@constants/route.constants';
import { LoginForm } from '@pages/auth/components/LoginForm';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { useAuth } from '@pages/auth/hooks/useAuth';
import { loginValidationSchema } from '@schemas/authSchemas';

export const LoginContainer = (): React.JSX.Element => {
  const { isLoading, login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
        navigate(ROUTES.RESTAURANT.DASHBOARD);
      } catch (error) {
        const message = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
        alert(`Login Failed: ${message}`);
      }
    },
  });

  return (
    <Card subtitle={DISPLAY.LABELS.LOGIN_SUBTITLE} title={DISPLAY.LABELS.LOGIN_TITLE}>
      <LoginForm
        formik={formik}
        isLoading={isLoading}
        onRegisterClick={() => navigate(ROUTES.AUTH.REGISTER)}
      />
    </Card>
  );
};
