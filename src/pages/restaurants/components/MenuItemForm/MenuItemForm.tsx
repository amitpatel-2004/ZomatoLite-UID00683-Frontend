import React, { useState } from 'react';

import { Field } from 'formik';

import { Col, Form, Radio, Row, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { NumberField } from '@components/FormFields/NumberField';
import { RadioGroupField } from '@components/FormFields/RadioGroupField';
import { TextAreaField } from '@components/FormFields/TextAreaField';
import { TextField } from '@components/FormFields/TextField';
import { FormModal } from '@components/FormModal';
import { FIREBASE_BUCKETS } from '@constants/firebase.constants';
import { MODAL_WIDTHS, UPLOAD_LIST_TYPES } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { getFileUrl } from '@utils/firebase';

import { getMenuItemInitialValues, MENU_ITEM_FIELD_CONFIGS } from './MenuItemForm.constants';
import { menuItemValidationSchema } from './MenuItemForm.schema';
import type {
  MenuItemFormProps,
  MenuItemFormSubmitValues,
  MenuItemFormValues,
} from './MenuItemForm.types';

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
        url: getFileUrl(initialValues.imagePath, FIREBASE_BUCKETS.IMAGE_UPLOAD_BUCKET) ?? undefined,
      },
    ];
  });

  const title = initialValues ? DISPLAY.TITLES.EDIT_MENU_ITEM : DISPLAY.TITLES.CREATE_MENU_ITEM;

  const handleFormSubmit = async (
    values: MenuItemFormValues,
    setFieldError: (field: string, message: string) => void,
  ) => {
    const imageFile = fileList[0]?.originFileObj ?? null;
    const submitValues: MenuItemFormSubmitValues = {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      isVeg: values.isVeg,
      quantity: values.quantity !== '' ? Number(values.quantity) : null,
      imageFile,
      existingImagePath: initialValues?.imagePath ?? null,
    };
    await handleSubmit(submitValues, setFieldError);
  };

  return (
    <FormModal
      initialValues={getMenuItemInitialValues(initialValues ?? null)}
      isSubmitting={isSubmitting}
      okText={DISPLAY.ACTIONS.SAVE}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      open={open}
      title={title}
      validationSchema={menuItemValidationSchema}
      width={MODAL_WIDTHS.NARROW}
    >
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
    </FormModal>
  );
};
