import React from 'react';

import { Button, Result } from 'antd';

import { BUTTON_TYPES } from '@constants/style.constants';

import { ERROR_PAGE_DEFAULTS } from './ErrorComponent.constants';
import type { ErrorComponentProps } from './ErrorComponent.types';

export const ErrorComponent = (props: ErrorComponentProps): React.JSX.Element => {
  const {
    buttonText = ERROR_PAGE_DEFAULTS.BUTTON_TEXT,
    onAction,
    status = ERROR_PAGE_DEFAULTS.STATUS,
    subTitle = ERROR_PAGE_DEFAULTS.SUB_TITLE,
    title = ERROR_PAGE_DEFAULTS.TITLE,
  } = props;

  return (
    <Result
      extra={
        <Button onClick={onAction} type={BUTTON_TYPES.PRIMARY}>
          {buttonText}
        </Button>
      }
      status={status}
      subTitle={subTitle}
      title={title}
    />
  );
};
