import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Col, Result, Row } from 'antd';

import { ROUTES } from '@constants/route.constants';

import type { ErrorLayoutProps } from './ErrorLayout.types';

export const ErrorLayout = (props: ErrorLayoutProps): React.JSX.Element => {
  const {
    buttonText = 'Back Home',
    redirectTo = ROUTES.AUTH.LOGIN,
    status = '404',
    subTitle = 'Sorry, the page you visited does not exist.',
    title = '404',
  } = props;

  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(redirectTo);
  };

  return (
    <Row align="middle" className="u-fullscreen" justify="center">
      <Col>
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
      </Col>
    </Row>
  );
};
