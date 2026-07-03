import React from 'react';

import { Form, Input } from 'antd';

import type { TextAreaFieldProps } from './TextAreaField.types';

export const TextAreaField = (props: TextAreaFieldProps): React.JSX.Element => {
  const { field, form, label, maxLength, placeholder, required, rows } = props;
  const { touched, error } = form.getFieldMeta(field.name);

  return (
    <Form.Item
      help={touched && error ? error : undefined}
      label={label}
      required={required}
      validateStatus={touched && error ? 'error' : undefined}
    >
      <Input.TextArea
        {...field}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={rows}
        showCount={!!maxLength}
      />
    </Form.Item>
  );
};
