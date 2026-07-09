import React from 'react';

import type { FormikValues } from 'formik';
import { Formik } from 'formik';

import { Form, Modal } from 'antd';

import { FORM_LAYOUTS } from '@constants/style.constants';

import type { FormModalProps } from './FormModal.types';

export const FormModal = <Values extends FormikValues>(
  props: FormModalProps<Values>,
): React.JSX.Element => {
  const {
    children,
    initialValues,
    isSubmitting,
    okText,
    onClose,
    onSubmit,
    open,
    title,
    validationSchema,
    width,
  } = props;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, { setFieldError }) => {
        await onSubmit(values, setFieldError);
      }}
      validationSchema={validationSchema}
    >
      {({ submitForm }) => {
        return (
          <Modal
            confirmLoading={isSubmitting}
            destroyOnClose
            okText={okText}
            onCancel={onClose}
            onOk={submitForm}
            open={open}
            title={title}
            width={width}
          >
            <Form layout={FORM_LAYOUTS.VERTICAL} noValidate>
              {children}
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};
