import type { FormikValues } from 'formik';
import type { ReactNode } from 'react';
import type { AnyObjectSchema } from 'yup';

export type FormModalProps<Values extends FormikValues> = {
  children: ReactNode;
  initialValues: Values;
  isSubmitting: boolean;
  okText: string;
  onClose: () => void;
  onSubmit: (
    values: Values,
    setFieldError: (field: string, message: string) => void,
  ) => Promise<void>;
  open: boolean;
  title: string;
  validationSchema: AnyObjectSchema;
  width: number;
};
