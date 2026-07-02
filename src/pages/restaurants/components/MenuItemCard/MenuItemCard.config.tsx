import type { MenuProps } from 'antd';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

import type { OwnerActionsParams } from './MenuItemCard.types';

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
