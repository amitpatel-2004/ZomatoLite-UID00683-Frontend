import React from 'react';

import { Tag } from 'antd';

import { capitalize } from '@utils/string';

import type { CuisineTagsProps } from './CuisineTags.types';

import './CuisineTags.scss';

export const CuisineTags = (props: CuisineTagsProps): React.JSX.Element => {
  const { cuisineTypes } = props;

  return (
    <div className="cuisine-tags">
      {cuisineTypes.map((cuisineType) => {
        return (
          <Tag className="cuisine-tags__tag" key={cuisineType}>
            {capitalize(cuisineType)}
          </Tag>
        );
      })}
    </div>
  );
};
