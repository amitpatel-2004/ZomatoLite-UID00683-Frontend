import React from 'react';

import { Form, Radio } from 'antd';

import type { RadioGroupFieldProps } from './RadioGroupField.types';

export const RadioGroupField = (props: RadioGroupFieldProps): React.JSX.Element => {
  const { children, field, form, label } = props;
  const { touched, error } = form.getFieldMeta(field.name);
  return (
    <Form.Item
      help={touched && error ? error : undefined}
      label={label}
      validateStatus={touched && error ? 'error' : undefined}
    >
      <Radio.Group {...field}>{children}</Radio.Group>
    </Form.Item>
  );
};
