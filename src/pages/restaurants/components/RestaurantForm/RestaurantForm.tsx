import React from 'react';

import { Field, Formik } from 'formik';

import { Form, Modal } from 'antd';

import { SelectField } from '@components/FormFields/SelectField';
import { TextAreaField } from '@components/FormFields/TextAreaField';
import { TextField } from '@components/FormFields/TextField';
import { TimeField } from '@components/FormFields/TimeField';
import { FORM_LAYOUTS, MODAL_WIDTHS } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import {
  getRestaurantInitialValues,
  RESTAURANT_FIELD_CONFIGS,
} from '@pages/restaurants/constants/form.constants';
import { restaurantValidationSchema } from '@pages/restaurants/schemas/restaurantSchemas';

import type { RestaurantFormProps } from './RestaurantForm.types';

export const RestaurantForm = (props: RestaurantFormProps): React.JSX.Element => {
  const { initialValues, isSubmitting, onClose, handleSubmit, open } = props;

  const title = initialValues ? DISPLAY.TITLES.EDIT_RESTAURANT : DISPLAY.TITLES.CREATE_RESTAURANT;

  return (
    <Formik
      enableReinitialize
      initialValues={getRestaurantInitialValues(initialValues ?? null)}
      onSubmit={async (values, { setFieldError }) => {
        await handleSubmit(values, setFieldError);
      }}
      validationSchema={restaurantValidationSchema}
    >
      {({ submitForm }) => {
        return (
          <Modal
            confirmLoading={isSubmitting}
            destroyOnClose
            okText={DISPLAY.ACTIONS.SAVE}
            onCancel={onClose}
            onOk={submitForm}
            open={open}
            title={title}
            width={MODAL_WIDTHS.MEDIUM}
          >
            <Form layout={FORM_LAYOUTS.VERTICAL} noValidate requiredMark={false}>
              <Field {...RESTAURANT_FIELD_CONFIGS.NAME} component={TextField} />
              <Field {...RESTAURANT_FIELD_CONFIGS.DESCRIPTION} component={TextAreaField} />
              <Field {...RESTAURANT_FIELD_CONFIGS.CUISINE_TYPES} component={SelectField} />
              <Field {...RESTAURANT_FIELD_CONFIGS.OPENING_TIME} component={TimeField} />
              <Field {...RESTAURANT_FIELD_CONFIGS.CLOSING_TIME} component={TimeField} />
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};
