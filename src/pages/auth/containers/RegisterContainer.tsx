import React from 'react';

import { RegisterForm } from '../components/RegisterForm';
import { useRegister } from '../hooks/useRegister';

export const RegisterContainer = (): React.JSX.Element => {
  const { formik, isLoading, handleLoginClick } = useRegister();

  return <RegisterForm formik={formik} isLoading={isLoading} onLoginClick={handleLoginClick} />;
};
