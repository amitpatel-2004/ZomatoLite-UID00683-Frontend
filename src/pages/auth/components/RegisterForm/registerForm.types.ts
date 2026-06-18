import type { RegisterFormValues } from '@appTypes/Auth.types';
import type { FormikProps } from 'formik';

export interface RegisterFormProps {
  /** Formik state and handlers. */
  formik: FormikProps<RegisterFormValues>;
  isLoading: boolean;
  onLoginClick: () => void;
}
