import type { FormikProps } from 'formik';

import type { LoginFormValues } from '@appTypes/auth.types';

export type LoginFormProps = {
  /** Formik state and handlers. */
  formik: FormikProps<LoginFormValues>;
  isLoading: boolean;
  onRegisterClick: () => void;
};
