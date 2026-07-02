import type { FieldInputProps, FormikProps } from 'formik';

export type NumberFieldProps = {
  field: FieldInputProps<number | string | null>;
  form: FormikProps<unknown>;
  label: string;
  min?: number;
  max?: number;
  placeholder?: string;
  required?: boolean;
};
