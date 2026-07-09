import React from 'react';

import { Form, Input } from 'antd';

import type { TimeFieldProps } from './TimeField.types';

export const TimeField = (props: TimeFieldProps): React.JSX.Element => {
  const { field, form, label, required } = props;
  const { touched, error } = form.getFieldMeta(field.name);

  return (
    <Form.Item
      help={touched && error ? error : undefined}
      label={label}
      required={required}
      validateStatus={touched && error ? 'error' : undefined}
    >
      <Input
        {...field}
        onClick={(e) => {
          return (e.target as HTMLInputElement).showPicker?.();
        }}
        type="time"
      />
    </Form.Item>
  );
};
