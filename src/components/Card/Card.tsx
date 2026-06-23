import React from 'react';

import { Typography } from 'antd';

import { TEXT_TYPES, TITLE_LEVELS } from '@constants/style.constants';

import type { CardProps } from './Card.types';

import './Card.scss';

const { Text, Title } = Typography;

export const Card = (props: CardProps): React.JSX.Element => {
  const { children, subtitle, title } = props;
  return (
    <div className="card">
      {title && (
        <Title className="card__title typography__title" level={TITLE_LEVELS.SUBHEADING}>
          {title}
        </Title>
      )}
      {subtitle && (
        <Text className="card__subtitle typography__subtitle" type={TEXT_TYPES.SECONDARY}>
          {subtitle}
        </Text>
      )}
      <div className="card__content">{children}</div>
    </div>
  );
};
