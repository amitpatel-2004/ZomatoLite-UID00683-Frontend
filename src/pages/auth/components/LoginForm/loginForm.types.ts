import type { LoginFormValues } from '@appTypes/Auth.types';
import type { FormikProps } from 'formik';

export interface LoginFormProps {
  /** Formik state and handlers. */
  formik: FormikProps<LoginFormValues>;
  isLoading: boolean;
  onRegisterClick: () => void;
}
