import React from 'react';

import { Form, InputNumber } from 'antd';

import type { NumberFieldProps } from './NumberField.types';

export const NumberField = (props: NumberFieldProps): React.JSX.Element => {
  const { field, form, label, max, min, placeholder, required } = props;
  const { touched, error } = form.getFieldMeta(field.name);

  return (
    <Form.Item
      help={touched && error ? error : undefined}
      label={label}
      required={required}
      validateStatus={touched && error ? 'error' : undefined}
    >
      <InputNumber
        max={max}
        min={min}
        onBlur={() => {
          return form.setFieldTouched(field.name, true);
        }}
        onChange={(val) => {
          return form.setFieldValue(field.name, val ?? '');
        }}
        placeholder={placeholder}
        value={field.value as number}
      />
    </Form.Item>
  );
};
