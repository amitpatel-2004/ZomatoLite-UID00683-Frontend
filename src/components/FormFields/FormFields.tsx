import React from 'react';

import { useField } from 'formik';

import { Form, Input, Radio } from 'antd';

import type { PasswordFieldProps, RadioGroupFieldProps, TextFieldProps } from './FormFields.types';

export const TextField = (props: TextFieldProps): React.JSX.Element => {
  const { label, ...fieldProps } = props;
  const [field, meta] = useField(fieldProps);

  return (
    <Form.Item
      help={meta.touched && meta.error ? meta.error : undefined}
      htmlFor={fieldProps.name}
      label={label}
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
    >
      <Input {...field} {...fieldProps} id={fieldProps.name} />
    </Form.Item>
  );
};

export const PasswordField = (props: PasswordFieldProps): React.JSX.Element => {
  const { label, ...fieldProps } = props;
  const [field, meta] = useField(fieldProps);

  return (
    <Form.Item
      help={meta.touched && meta.error ? meta.error : undefined}
      htmlFor={fieldProps.name}
      label={label}
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
    >
      <Input.Password {...field} {...fieldProps} id={fieldProps.name} />
    </Form.Item>
  );
};

export const RadioGroupField = (props: RadioGroupFieldProps): React.JSX.Element => {
  const { children, label, name } = props;
  const [field, meta] = useField(name);

  return (
    <Form.Item
      help={meta.touched && meta.error ? meta.error : undefined}
      label={label}
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
    >
      <Radio.Group {...field}>{children}</Radio.Group>
    </Form.Item>
  );
};
