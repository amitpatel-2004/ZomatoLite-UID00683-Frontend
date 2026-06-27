import React from 'react';

import { Formik } from 'formik';

import { Form, Input, Modal, Select } from 'antd';

import { TextField } from '@components/FormFields/FormFields';
import { FORM_LAYOUTS, MODAL_WIDTHS, SELECT_MODES } from '@constants/style.constants';
import { CUISINE_OPTIONS } from '@pages/restaurants/constants/cuisine.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { restaurantValidationSchema } from '@pages/restaurants/schemas/restaurantSchemas';

import type { RestaurantFormProps } from './RestaurantForm.types';

export const RestaurantForm = (props: RestaurantFormProps): React.JSX.Element => {
  const { initialValues, isSubmitting, onClose, onSubmit, open } = props;

  const title = initialValues ? DISPLAY.TITLES.EDIT_RESTAURANT : DISPLAY.TITLES.CREATE_RESTAURANT;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: initialValues?.name ?? '',
        description: initialValues?.description ?? '',
        cuisineTypes: initialValues?.cuisineTypes ?? [],
        openingTime: initialValues?.openingTime ?? '',
        closingTime: initialValues?.closingTime ?? '',
      }}
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
      validationSchema={restaurantValidationSchema}
    >
      {({ submitForm, values, errors, touched, setFieldValue, setFieldTouched }) => (
        <Modal
          confirmLoading={isSubmitting}
          destroyOnClose
          okText={DISPLAY.ACTIONS.SAVE}
          onCancel={onClose}
          onOk={submitForm}
          open={open}
          title={title}
          width={MODAL_WIDTHS.FORM}
        >
          <Form layout={FORM_LAYOUTS.VERTICAL} noValidate>
            <TextField label={DISPLAY.LABELS.NAME} maxLength={100} name="name" required />

            <Form.Item
              help={touched.description && errors.description ? errors.description : undefined}
              label={DISPLAY.LABELS.DESCRIPTION}
              validateStatus={touched.description && errors.description ? 'error' : undefined}
            >
              <Input.TextArea
                maxLength={500}
                name="description"
                onBlur={() => setFieldTouched('description', true)}
                onChange={(e) => setFieldValue('description', e.target.value)}
                rows={3}
                value={values.description}
              />
            </Form.Item>

            <Form.Item
              help={
                touched.cuisineTypes && errors.cuisineTypes
                  ? String(errors.cuisineTypes)
                  : undefined
              }
              label={DISPLAY.LABELS.CUISINE_TYPES}
              required
              validateStatus={touched.cuisineTypes && errors.cuisineTypes ? 'error' : undefined}
            >
              <Select
                mode={SELECT_MODES.MULTIPLE}
                onBlur={() => setFieldTouched('cuisineTypes', true)}
                onChange={(val) => setFieldValue('cuisineTypes', val)}
                options={[...CUISINE_OPTIONS]}
                value={values.cuisineTypes}
              />
            </Form.Item>

            <Form.Item
              help={touched.openingTime && errors.openingTime ? errors.openingTime : undefined}
              label={DISPLAY.LABELS.OPENING_TIME}
              required
              validateStatus={touched.openingTime && errors.openingTime ? 'error' : undefined}
            >
              <Input
                name="openingTime"
                onBlur={() => setFieldTouched('openingTime', true)}
                onChange={(e) => setFieldValue('openingTime', e.target.value)}
                onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                type="time"
                value={values.openingTime}
              />
            </Form.Item>

            <Form.Item
              help={touched.closingTime && errors.closingTime ? errors.closingTime : undefined}
              label={DISPLAY.LABELS.CLOSING_TIME}
              required
              validateStatus={touched.closingTime && errors.closingTime ? 'error' : undefined}
            >
              <Input
                name="closingTime"
                onBlur={() => setFieldTouched('closingTime', true)}
                onChange={(e) => setFieldValue('closingTime', e.target.value)}
                onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                type="time"
                value={values.closingTime}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};
