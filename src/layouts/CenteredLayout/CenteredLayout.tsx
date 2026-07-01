import React from 'react';

import { Col, Row } from 'antd';

import { ROW_ALIGN, ROW_JUSTIFY } from '@constants/style.constants';

import type { CenteredLayoutProps } from './CenteredLayout.types';

import './CenteredLayout.scss';

export const CenteredLayout = (props: CenteredLayoutProps): React.JSX.Element => {
  const { children } = props;
  return (
    <Row align={ROW_ALIGN.MIDDLE} className="centered-layout" justify={ROW_JUSTIFY.CENTER}>
      <Col>{children}</Col>
    </Row>
  );
};
