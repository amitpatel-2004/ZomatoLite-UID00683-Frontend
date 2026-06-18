import { ROUTES } from '@constants/RouteConstants';
import { Button, Col, Result, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { ErrorPageProps } from './ErrorPage.types';

export const ErrorPage = (props: ErrorPageProps): React.JSX.Element => {
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
