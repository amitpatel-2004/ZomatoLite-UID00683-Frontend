import React from 'react';

import { Form, Select } from 'antd';

import type { SelectFieldProps } from './SelectField.types';

export const SelectField = (props: SelectFieldProps): React.JSX.Element => {
  const { field, form, label, mode, options, placeholder, required } = props;
  const { touched, error } = form.getFieldMeta(field.name);

  return (
    <Form.Item
      help={touched && error ? String(error) : undefined}
      label={label}
      required={required}
      validateStatus={touched && error ? 'error' : undefined}
    >
      <Select
        mode={mode}
        placeholder={placeholder}
        onBlur={() => {
          return form.setFieldTouched(field.name, true);
        }}
        onChange={(val) => {
          return form.setFieldValue(field.name, val);
        }}
        options={[...options]}
        value={field.value}
      />
    </Form.Item>
  );
};
