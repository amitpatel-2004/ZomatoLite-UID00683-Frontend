import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

import { ERROR_PAGE_DEFAULTS } from './ErrorComponent.constants';
import type { ErrorComponentProps } from './ErrorComponent.types';

export const ErrorComponent = (props: ErrorComponentProps): React.JSX.Element => {
  const {
    buttonText = ERROR_PAGE_DEFAULTS.BUTTON_TEXT,
    redirectTo = ERROR_PAGE_DEFAULTS.REDIRECT_TO,
    status = ERROR_PAGE_DEFAULTS.STATUS,
    subTitle = ERROR_PAGE_DEFAULTS.SUB_TITLE,
    title = ERROR_PAGE_DEFAULTS.TITLE,
  } = props;

  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(redirectTo);
  };

  return (
    <Result
      extra={
        <Button onClick={handleClick} type="primary">
          {buttonText}
        </Button>
      }
      status={status}
      subTitle={subTitle}
      title={title}
    />
  );
};
