import type { FormikProps } from 'formik';

import type { RegisterFormValues } from '@appTypes/auth.types';

export interface RegisterFormProps {
  /** Formik state and handlers. */
  formik: FormikProps<RegisterFormValues>;
  isLoading: boolean;
  onLoginClick: () => void;
}
