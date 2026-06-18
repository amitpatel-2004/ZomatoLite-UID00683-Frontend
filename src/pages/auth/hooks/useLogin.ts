import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { LoginFormValues } from '@appTypes/auth.types';
import { MESSAGES } from '@constants/message.constants';
import { ROUTES } from '@constants/route.constants';
import { loginValidationSchema } from '@schemas/authSchemas';
import {
  authRequestFailed,
  authRequestStarted,
  authRequestSucceeded,
  authService,
} from '@store/auth';
import type { AppDispatch, RootState } from '@store/index';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const formik = useFormik<LoginFormValues>({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      dispatch(authRequestStarted());
      try {
        const result = await authService.login(values);
        dispatch(authRequestSucceeded(result));
        navigate(ROUTES.RESTAURANT.DASHBOARD);
      } catch (error) {
        const message = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
        dispatch(authRequestFailed(message));
        alert(`Login Error: ${message}`);
      }
    },
    validationSchema: loginValidationSchema,
  });

  const handleRegisterClick = (): void => navigate(ROUTES.AUTH.REGISTER);

  return { formik, isLoading, handleRegisterClick };
};
