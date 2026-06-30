import React, { useState } from 'react';

import { Field, Formik } from 'formik';

import { Col, Form, Modal, Radio, Row, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { NumberField } from '@components/FormFields/NumberField';
import { RadioGroupField } from '@components/FormFields/RadioGroupField';
import { TextAreaField } from '@components/FormFields/TextAreaField';
import { TextField } from '@components/FormFields/TextField';
import { getImageUrl } from '@constants/firebase.constants';
import { FORM_LAYOUTS, MODAL_WIDTHS, UPLOAD_LIST_TYPES } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import {
  getMenuItemInitialValues,
  MENU_ITEM_FIELD_CONFIGS,
} from '@pages/restaurants/constants/form.constants';
import { menuItemValidationSchema } from '@pages/restaurants/schemas/menuItemSchemas';

import type { MenuItemFormProps, MenuItemFormSubmitValues } from './MenuItemForm.types';

import './MenuItemForm.scss';

export const MenuItemForm = (props: MenuItemFormProps): React.JSX.Element => {
  const { initialValues, isSubmitting, onClose, handleSubmit, open } = props;

  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    if (!initialValues?.imagePath) return [];
    return [
      {
        uid: '-1',
        name: 'current-image',
        status: 'done',
        url: getImageUrl(initialValues.imagePath) ?? undefined,
      },
    ];
  });

  const title = initialValues ? DISPLAY.TITLES.EDIT_MENU_ITEM : DISPLAY.TITLES.CREATE_MENU_ITEM;

  return (
    <Formik
      enableReinitialize
      initialValues={getMenuItemInitialValues(initialValues ?? null)}
      onSubmit={async (values, { setFieldError }) => {
        const imageFile = fileList[0]?.originFileObj ?? null;
        const submitValues: MenuItemFormSubmitValues = {
          name: values.name,
          description: values.description,
          price: Number(values.price),
          isVeg: values.isVeg,
          quantity:
            values.quantity !== '' && values.quantity !== null ? Number(values.quantity) : null,
          imageFile,
          existingImagePath: initialValues?.imagePath ?? null,
        };
        await handleSubmit(submitValues, setFieldError);
      }}
      validationSchema={menuItemValidationSchema}
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
            width={MODAL_WIDTHS.NARROW}
          >
            <Form layout={FORM_LAYOUTS.VERTICAL} noValidate requiredMark={false}>
              <Form.Item
                className="menu-item-form__upload"
                extra={DISPLAY.LABELS.IMAGE_UPLOAD_HINT}
                label={DISPLAY.LABELS.IMAGE}
              >
                <Upload
                  accept="image/*"
                  beforeUpload={() => {
                    return false;
                  }}
                  fileList={fileList}
                  listType={UPLOAD_LIST_TYPES.PICTURE_CARD}
                  maxCount={1}
                  onChange={({ fileList: newList }) => {
                    return setFileList(newList);
                  }}
                >
                  {fileList.length === 0 && (
                    <span className="typography__meta">{`+ ${DISPLAY.ACTIONS.UPLOAD_IMAGE}`}</span>
                  )}
                </Upload>
              </Form.Item>

              <Field {...MENU_ITEM_FIELD_CONFIGS.NAME} component={TextField} />
              <Field {...MENU_ITEM_FIELD_CONFIGS.DESCRIPTION} component={TextAreaField} />

              <Row gutter={16}>
                <Col span={12}>
                  <Field {...MENU_ITEM_FIELD_CONFIGS.PRICE} component={NumberField} />
                </Col>
                <Col span={12}>
                  <Field {...MENU_ITEM_FIELD_CONFIGS.QUANTITY} component={NumberField} />
                </Col>
              </Row>

              <Field {...MENU_ITEM_FIELD_CONFIGS.IS_VEG} component={RadioGroupField}>
                <Radio value={true}>{DISPLAY.LABELS.VEG}</Radio>
                <Radio value={false}>{DISPLAY.LABELS.NON_VEG}</Radio>
              </Field>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};
