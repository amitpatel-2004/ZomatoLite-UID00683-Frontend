import type { FormikProps } from 'formik';

import type { LoginFormValues } from '@pages/auth/types/auth.types';

export type LoginFormProps = {
  /** Formik state and handlers. */
  formik: FormikProps<LoginFormValues>;
  isLoading: boolean;
  onRegisterClick: () => void;
};
