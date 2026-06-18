import { Typography } from 'antd';
import React from 'react';

import type { CenteredLayoutProps } from './centeredLayout.types';

const { Text, Title } = Typography;

export const CenteredLayout = (props: CenteredLayoutProps): React.JSX.Element => {
  const { children, subtitle, title } = props;
  return (
    <div className="centered-layout">
      <div className="centered-layout__card">
        <Title className="centered-layout__title" level={3}>
          {title}
        </Title>
        {subtitle && (
          <Text className="centered-layout__subtitle" type="secondary">
            {subtitle}
          </Text>
        )}
        <div className="centered-layout__content">{children}</div>
      </div>
    </div>
  );
};
