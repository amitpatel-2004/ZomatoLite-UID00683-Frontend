import React from 'react';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import type { RegisterFormValues } from '@appTypes/auth.types';
import { Card } from '@components/Card';
import { MESSAGES } from '@constants/message.constants';
import { ROUTES } from '@constants/route.constants';
import { RegisterForm } from '@pages/auth/components/RegisterForm';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { useAuth } from '@pages/auth/hooks/useAuth';
import { registerValidationSchema } from '@schemas/authSchemas';

export const RegisterContainer = (): React.JSX.Element => {
  const { isLoading, register } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      confirmPassword: '',
      displayName: '',
      email: '',
      password: '',
      role: 'customer',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        await register({
          displayName: values.displayName.trim(),
          email: values.email,
          password: values.password,
          role: values.role,
        });
        alert('Registration successful! Please verify your email.');
        navigate(ROUTES.AUTH.VERIFY_EMAIL);
      } catch (error) {
        const message = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
        alert(`Registration Failed: ${message}`);
      }
    },
  });

  return (
    <Card subtitle={DISPLAY.LABELS.REGISTER_SUBTITLE} title={DISPLAY.LABELS.REGISTER_TITLE}>
      <RegisterForm
        formik={formik}
        isLoading={isLoading}
        onLoginClick={() => navigate(ROUTES.AUTH.LOGIN)}
      />
    </Card>
  );
};
