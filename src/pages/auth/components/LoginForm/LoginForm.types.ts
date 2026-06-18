import type { FormikProps } from 'formik';

import type { LoginFormValues } from '@appTypes/auth.types';

export interface LoginFormProps {
  /** Formik state and handlers. */
  formik: FormikProps<LoginFormValues>;
  isLoading: boolean;
  onRegisterClick: () => void;
}
