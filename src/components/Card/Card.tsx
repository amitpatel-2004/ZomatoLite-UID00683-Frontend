import React from 'react';

import { Typography } from 'antd';

import type { CardProps } from './Card.types';

const { Text, Title } = Typography;

export const Card = (props: CardProps): React.JSX.Element => {
  const { children, subtitle, title } = props;
  return (
    <div className="card">
      {title && (
        <Title className="card__title" level={3}>
          {title}
        </Title>
      )}
      {subtitle && (
        <Text className="card__subtitle" type="secondary">
          {subtitle}
        </Text>
      )}
      <div className="card__content">{children}</div>
    </div>
  );
};
