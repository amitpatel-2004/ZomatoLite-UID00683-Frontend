import type { RegisterFormValues } from '@appTypes/Auth.types';
import { MESSAGES } from '@constants/MessageConstants';
import { ROUTES } from '@constants/RouteConstants';
import { registerValidationSchema } from '@schemas/authSchemas';
import {
  authRequestFailed,
  authRequestStarted,
  authRequestSucceeded,
  authService,
} from '@store/auth';
import type { AppDispatch, RootState } from '@store/index';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      confirmPassword: '',
      displayName: '',
      email: '',
      password: '',
      role: 'customer',
    },
    onSubmit: async (values) => {
      dispatch(authRequestStarted());
      try {
        const result = await authService.register({
          displayName: values.displayName.trim(),
          email: values.email,
          password: values.password,
          role: values.role,
        });
        dispatch(authRequestSucceeded(result));
        alert('Registration successful! Please verify your email.');
        navigate(ROUTES.AUTH.VERIFY_EMAIL);
      } catch (error) {
        const message = error instanceof Error ? error.message : MESSAGES.ERRORS.GENERIC;
        dispatch(authRequestFailed(message));
        alert(`Registration Error: ${message}`);
      }
    },
    validationSchema: registerValidationSchema,
  });

  const handleLoginClick = (): void => navigate(ROUTES.AUTH.LOGIN);

  return { formik, isLoading, handleLoginClick };
};
