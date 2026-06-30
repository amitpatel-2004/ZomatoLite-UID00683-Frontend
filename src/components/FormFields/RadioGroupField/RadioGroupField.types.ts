import React from 'react';

import type { FieldInputProps, FormikProps } from 'formik';

export type RadioGroupFieldProps = {
  children: React.ReactNode;
  field: FieldInputProps<string>;
  form: FormikProps<unknown>;
  label: string;
};
