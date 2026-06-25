import type { FormikProps } from 'formik';

import type { RegisterFormValues } from '@pages/auth/types/auth.types';

export type RegisterFormProps = {
  /** Formik state and handlers. */
  formik: FormikProps<RegisterFormValues>;
  isLoading: boolean;
  onLoginClick: () => void;
};
