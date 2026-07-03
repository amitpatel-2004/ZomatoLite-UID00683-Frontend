import React from 'react';

import { Form, Input } from 'antd';

import type { PasswordFieldProps } from './PasswordField.types';

export const PasswordField = (props: PasswordFieldProps): React.JSX.Element => {
  const { field, form, label, placeholder, required } = props;
  const { touched, error } = form.getFieldMeta(field.name);
  return (
    <Form.Item
      help={touched && error ? error : undefined}
      htmlFor={field.name}
      label={label}
      required={required}
      validateStatus={touched && error ? 'error' : undefined}
    >
      <Input.Password {...field} id={field.name} placeholder={placeholder} />
    </Form.Item>
  );
};
