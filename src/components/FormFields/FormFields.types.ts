import React from 'react';

type BaseFieldProps = {
  label: string;
  /** Must match the Formik field name. */
  name: string;
};

export type TextFieldProps = BaseFieldProps & {
  placeholder?: string;
  type?: string;
};

export type PasswordFieldProps = BaseFieldProps & {
  placeholder?: string;
};

export type RadioGroupFieldProps = BaseFieldProps & {
  children: React.ReactNode;
};
