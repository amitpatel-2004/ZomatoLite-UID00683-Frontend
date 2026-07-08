import React from 'react';

import { Typography } from 'antd';

import { StarFilled } from '@ant-design/icons';

import type { RatingProps } from './Rating.types';

import './Rating.scss';

const { Text } = Typography;

export const Rating = (props: RatingProps): React.JSX.Element => {
  const { value, emptyText } = props;

  return (
    <span className="rating">
      <StarFilled className="rating__star" />
      <Text className="typography__meta">{value > 0 ? value.toFixed(1) : emptyText}</Text>
    </span>
  );
};
