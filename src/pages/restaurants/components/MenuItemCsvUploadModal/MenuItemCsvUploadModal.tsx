import React, { useState } from 'react';

import { Alert, Button, Modal, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { UploadOutlined } from '@ant-design/icons';
import { ALERT_TYPES, MODAL_WIDTHS } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';

import { CSV_ACCEPTED_TYPE, CSV_MAX_SIZE_BYTES } from './MenuItemCsvUploadModal.constants';
import type { MenuItemCsvUploadModalProps } from './MenuItemCsvUploadModal.types';
import { validateMenuItemsCsv } from './MenuItemCsvUploadModal.utils';

import './MenuItemCsvUploadModal.scss';

export const MenuItemCsvUploadModal = (props: MenuItemCsvUploadModalProps): React.JSX.Element => {
  const { isUploading, onClose, onUpload, open } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleBeforeUpload = (selectedFile: File) => {
    if (selectedFile.size > CSV_MAX_SIZE_BYTES) {
      setErrors([MESSAGES.ERRORS.CSV_FILE_SIZE_EXCEEDED]);
      return Upload.LIST_IGNORE;
    }

    setErrors([]);
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      setErrors(validateMenuItemsCsv(text));
    };
    reader.readAsText(selectedFile);

    return false;
  };

  const handleClose = () => {
    setFileList([]);
    setErrors([]);
    onClose();
  };

  const handleOk = () => {
    const selectedFile = fileList[0]?.originFileObj;
    if (selectedFile) onUpload(selectedFile);
  };

  return (
    <Modal
      confirmLoading={isUploading}
      destroyOnClose
      okButtonProps={{ disabled: !fileList[0] || errors.length > 0 }}
      okText={DISPLAY.ACTIONS.UPLOAD}
      onCancel={handleClose}
      onOk={handleOk}
      open={open}
      title={DISPLAY.TITLES.UPLOAD_MENU_ITEMS_CSV}
      width={MODAL_WIDTHS.NARROW}
    >
      <ul className="csv-upload-modal__guidelines">
        {DISPLAY.LABELS.CSV_UPLOAD_GUIDELINES.map((guideline) => {
          return <li key={guideline}>{guideline}</li>;
        })}
      </ul>

      <Upload
        accept={CSV_ACCEPTED_TYPE}
        beforeUpload={handleBeforeUpload}
        fileList={fileList}
        maxCount={1}
        onChange={({ fileList: newList }) => {
          return setFileList(newList);
        }}
      >
        <Button icon={<UploadOutlined />}>{DISPLAY.ACTIONS.UPLOAD_CSV}</Button>
      </Upload>

      {errors.length > 0 && (
        <Alert
          className="csv-upload-modal__error"
          description={
            <ul>
              {errors.map((error) => {
                return <li key={error}>{error}</li>;
              })}
            </ul>
          }
          message={MESSAGES.ERRORS.CSV_VALIDATION_FAILED}
          showIcon
          type={ALERT_TYPES.ERROR}
        />
      )}
    </Modal>
  );
};
