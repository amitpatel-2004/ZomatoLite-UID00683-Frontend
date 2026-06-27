import React from 'react';

type BaseFieldProps = {
  label: string;
  /** Must match the Formik field name. */
  name: string;
  required?: boolean;
};

export type TextFieldProps = BaseFieldProps & {
  placeholder?: string;
  type?: string;
  maxLength?: number;
};

export type PasswordFieldProps = BaseFieldProps & {
  placeholder?: string;
};

export type RadioGroupFieldProps = BaseFieldProps & {
  children: React.ReactNode;
};
