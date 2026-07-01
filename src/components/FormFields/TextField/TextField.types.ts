import type { FieldInputProps, FormikProps } from 'formik';

export type TextFieldProps = {
  field: FieldInputProps<string>;
  form: FormikProps<unknown>;
  label: string;
  placeholder?: string;
  type?: string;
};
