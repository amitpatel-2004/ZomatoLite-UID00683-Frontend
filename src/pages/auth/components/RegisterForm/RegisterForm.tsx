import React from 'react';

import { Field, Form as FormikForm, Formik } from 'formik';

import { Button, Form, Radio, Typography } from 'antd';

import { Card } from '@components/Card';
import { PasswordField } from '@components/FormFields/PasswordField';
import { RadioGroupField } from '@components/FormFields/RadioGroupField';
import { TextField } from '@components/FormFields/TextField';
import { BUTTON_TYPES, FORM_LAYOUTS } from '@constants/style.constants';
import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { FIELD_CONFIGS, REGISTER_INITIAL_VALUES } from '@pages/auth/constants/form.constants';
import { registerValidationSchema } from '@pages/auth/schemas/authSchemas';

import type { RegisterFormProps } from './RegisterForm.types';

import './RegisterForm.scss';

const { Link, Text } = Typography;

export const RegisterForm = (props: RegisterFormProps): React.JSX.Element => {
  const { isLoading, handleSubmit, onLoginClick } = props;

  return (
    <div className="register-form">
      <Formik
        initialValues={REGISTER_INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={registerValidationSchema}
      >
        <Card subtitle={DISPLAY.LABELS.REGISTER_SUBTITLE} title={DISPLAY.LABELS.REGISTER_TITLE}>
          <Form component={false} layout={FORM_LAYOUTS.VERTICAL}>
            <FormikForm className="register-form__form" noValidate>
              <Field {...FIELD_CONFIGS.DISPLAY_NAME} component={TextField} />

              <Field {...FIELD_CONFIGS.EMAIL} component={TextField} />

              <Field {...FIELD_CONFIGS.CREATE_PASSWORD} component={PasswordField} />

              <Field {...FIELD_CONFIGS.CONFIRM_PASSWORD} component={PasswordField} />

              <Field {...FIELD_CONFIGS.ROLE} component={RadioGroupField}>
                <Radio value={USER_ROLES.CUSTOMER}>{DISPLAY.LABELS.ROLE_CUSTOMER}</Radio>
                <Radio value={USER_ROLES.OWNER}>{DISPLAY.LABELS.ROLE_OWNER}</Radio>
              </Field>

              <Form.Item>
                <Button block htmlType="submit" loading={isLoading} type={BUTTON_TYPES.PRIMARY}>
                  {DISPLAY.ACTIONS.REGISTER}
                </Button>
              </Form.Item>
            </FormikForm>
          </Form>

          <Text className="register-form__footer typography__subtitle">
            {DISPLAY.ACTIONS.ALREADY_HAVE_ACCOUNT}{' '}
            <Link className="register-form__link" onClick={onLoginClick}>
              {DISPLAY.ACTIONS.GO_TO_LOGIN}
            </Link>
          </Text>
        </Card>
      </Formik>
    </div>
  );
};
