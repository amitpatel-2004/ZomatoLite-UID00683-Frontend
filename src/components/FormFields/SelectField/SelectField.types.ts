import type { FieldInputProps, FormikProps } from 'formik';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectFieldProps = {
  field: FieldInputProps<string | string[]>;
  form: FormikProps<unknown>;
  label: string;
  options: readonly SelectOption[];
  mode?: 'multiple' | 'tags';
  placeholder?: string;
  required?: boolean;
};
