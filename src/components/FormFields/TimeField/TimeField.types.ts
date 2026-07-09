import type { FieldInputProps, FormikProps } from 'formik';

export type TimeFieldProps = {
  field: FieldInputProps<string>;
  form: FormikProps<unknown>;
  label: string;
  required?: boolean;
};
