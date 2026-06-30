import React from 'react';

import type { MenuProps } from 'antd';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { MenuItem } from '@appTypes/restaurant.types';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

type OwnerActionsParams = {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDeleteClick: () => void;
};

export const getOwnerActions = (params: OwnerActionsParams): MenuProps['items'] => {
  const { item, onEdit, onDeleteClick } = params;
  return [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: DISPLAY.ACTIONS.EDIT,
      onClick: () => {
        return onEdit(item);
      },
    },
    { type: 'divider' },
    {
      key: 'delete',
      danger: true,
      icon: <DeleteOutlined />,
      label: DISPLAY.ACTIONS.DELETE,
      onClick: onDeleteClick,
    },
  ];
};
