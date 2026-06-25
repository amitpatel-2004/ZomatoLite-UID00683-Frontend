import React from 'react';

import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { message } from 'antd';

import { Card } from '@components/Card';
import { USER_ROLES } from '@constants/auth.constants';
import { MESSAGES } from '@constants/message.constants';
import { ROUTES } from '@constants/route.constants';
import { RegisterForm } from '@pages/auth/components/RegisterForm';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { useAuth } from '@pages/auth/hooks/useAuth';
import { registerValidationSchema } from '@pages/auth/schemas/authSchemas';
import type { RegisterFormValues } from '@pages/auth/types/auth.types';

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
      void message.error(`Registration Failed: ${errorMsg}`);
    }
  };

  return (
    <Formik
      initialValues={{
        confirmPassword: '',
        displayName: '',
        email: '',
        password: '',
        role: USER_ROLES.CUSTOMER,
      }}
      onSubmit={handleSubmit}
      validationSchema={registerValidationSchema}
    >
      <Card subtitle={DISPLAY.LABELS.REGISTER_SUBTITLE} title={DISPLAY.LABELS.REGISTER_TITLE}>
        <RegisterForm isLoading={isLoading} onLoginClick={() => navigate(ROUTES.AUTH.LOGIN)} />
      </Card>
    </Formik>
  );
};
