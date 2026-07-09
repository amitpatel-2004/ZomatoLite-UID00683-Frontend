import React from 'react';

import { Form, Input } from 'antd';

import type { TextFieldProps } from './TextField.types';

export const TextField = (props: TextFieldProps): React.JSX.Element => {
  const { field, form, label, required, ...inputProps } = props;
  const { touched, error } = form.getFieldMeta(field.name);
  return (
    <Form.Item
      help={touched && error ? error : undefined}
      htmlFor={field.name}
      label={label}
      required={required}
      validateStatus={touched && error ? 'error' : undefined}
    >
      <Input {...field} {...inputProps} id={field.name} />
    </Form.Item>
  );
};
