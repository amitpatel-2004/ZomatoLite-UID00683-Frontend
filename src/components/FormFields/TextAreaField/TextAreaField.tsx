import React from 'react';

import { Form, Input } from 'antd';

import type { TextAreaFieldProps } from './TextAreaField.types';

export const TextAreaField = (props: TextAreaFieldProps): React.JSX.Element => {
  const { field, form, label, maxLength, placeholder, rows } = props;
  const { touched, error } = form.getFieldMeta(field.name);

  return (
    <Form.Item
      help={touched && error ? error : undefined}
      label={label}
      validateStatus={touched && error ? 'error' : undefined}
    >
      <Input.TextArea {...field} maxLength={maxLength} placeholder={placeholder} rows={rows} />
    </Form.Item>
  );
};
