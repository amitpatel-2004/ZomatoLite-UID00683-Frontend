import type { FieldInputProps, FormikProps } from 'formik';

export type TextAreaFieldProps = {
  field: FieldInputProps<string>;
  form: FormikProps<unknown>;
  label: string;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
};
