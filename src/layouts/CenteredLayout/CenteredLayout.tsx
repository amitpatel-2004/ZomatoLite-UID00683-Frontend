import React from 'react';

import { Col, Row } from 'antd';

import type { CenteredLayoutProps } from './CenteredLayout.types';

export const CenteredLayout = (props: CenteredLayoutProps): React.JSX.Element => {
  const { children } = props;
  return (
    <Row align="middle" className="centered-layout" justify="center">
      <Col>{children}</Col>
    </Row>
  );
};
