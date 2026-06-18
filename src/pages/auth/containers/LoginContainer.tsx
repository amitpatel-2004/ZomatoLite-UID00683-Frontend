import React from 'react';

import { LoginForm } from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';

export const LoginContainer = (): React.JSX.Element => {
  const { formik, isLoading, handleRegisterClick } = useLogin();

  return <LoginForm formik={formik} isLoading={isLoading} onRegisterClick={handleRegisterClick} />;
};
