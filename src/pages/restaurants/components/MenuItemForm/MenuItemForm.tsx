import React, { useState } from 'react';

import { Formik } from 'formik';

import { Col, Form, Input, InputNumber, Modal, Radio, Row, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { TextField } from '@components/FormFields/FormFields';
import { getImageUrl } from '@constants/firebase.constants';
import { FORM_LAYOUTS, MODAL_WIDTHS, UPLOAD_LIST_TYPES } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { menuItemValidationSchema } from '@pages/restaurants/schemas/menuItemSchemas';

import type { MenuItemFormProps, MenuItemFormSubmitValues } from './MenuItemForm.types';

import './MenuItemForm.scss';

export const MenuItemForm = (props: MenuItemFormProps): React.JSX.Element => {
  const { initialValues, isSubmitting, onClose, onSubmit, open } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    if (!initialValues?.imagePath) return [];
    const existingUrl = getImageUrl(initialValues.imagePath);
    return existingUrl
      ? [{ uid: '-1', name: 'existing-image', status: 'done', url: existingUrl }]
      : [];
  });

  const title = initialValues ? DISPLAY.TITLES.EDIT_MENU_ITEM : DISPLAY.TITLES.CREATE_MENU_ITEM;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: initialValues?.name ?? '',
        description: initialValues?.description ?? '',
        price: (initialValues?.price ?? '') as number | string,
        isVeg: initialValues?.isVeg ?? true,
        quantity: (initialValues?.quantity ?? '') as number | string | null,
      }}
      onSubmit={async (values) => {
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
        await onSubmit(submitValues);
      }}
      validationSchema={menuItemValidationSchema}
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
          width={MODAL_WIDTHS.MENU_ITEM_FORM}
        >
          <Form layout={FORM_LAYOUTS.VERTICAL} noValidate>
            <Form.Item
              className="menu-item-form__upload"
              extra={DISPLAY.LABELS.IMAGE_UPLOAD_HINT}
              label={DISPLAY.LABELS.IMAGE}
            >
              <Upload
                accept="image/*"
                beforeUpload={() => false}
                fileList={fileList}
                listType={UPLOAD_LIST_TYPES.PICTURE_CARD}
                maxCount={1}
                onChange={({ fileList: newList }) => setFileList(newList)}
              >
                {fileList.length === 0 && (
                  <span className="typography__meta">{`+ ${DISPLAY.ACTIONS.UPLOAD_IMAGE}`}</span>
                )}
              </Upload>
            </Form.Item>

            <TextField label={DISPLAY.LABELS.NAME} maxLength={100} name="name" required />

            <Form.Item
              help={touched.description && errors.description ? errors.description : undefined}
              label={DISPLAY.LABELS.DESCRIPTION}
              validateStatus={touched.description && errors.description ? 'error' : undefined}
            >
              <Input.TextArea
                name="description"
                onBlur={() => setFieldTouched('description', true)}
                onChange={(e) => setFieldValue('description', e.target.value)}
                rows={2}
                value={values.description}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  help={touched.price && errors.price ? errors.price : undefined}
                  label={DISPLAY.LABELS.PRICE}
                  required
                  validateStatus={touched.price && errors.price ? 'error' : undefined}
                >
                  <InputNumber
                    min={0.01}
                    name="price"
                    onBlur={() => setFieldTouched('price', true)}
                    onChange={(val) => setFieldValue('price', val ?? '')}
                    placeholder="0.00"
                    style={{ width: '100%' }}
                    value={values.price as number}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  help={touched.quantity && errors.quantity ? errors.quantity : undefined}
                  label={DISPLAY.LABELS.QUANTITY}
                  validateStatus={touched.quantity && errors.quantity ? 'error' : undefined}
                >
                  <InputNumber
                    min={0}
                    name="quantity"
                    onBlur={() => setFieldTouched('quantity', true)}
                    onChange={(val) => setFieldValue('quantity', val ?? '')}
                    placeholder="0"
                    style={{ width: '100%' }}
                    value={values.quantity as number | null}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Radio.Group
                onChange={(e) => setFieldValue('isVeg', e.target.value as boolean)}
                value={values.isVeg}
              >
                <Radio value={true}>{DISPLAY.LABELS.VEG}</Radio>
                <Radio value={false}>{DISPLAY.LABELS.NON_VEG}</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};
