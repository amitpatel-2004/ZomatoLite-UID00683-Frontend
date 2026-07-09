import { Badge } from 'antd';

import { HomeOutlined, SearchOutlined, ShoppingOutlined } from '@ant-design/icons';
import { ROUTES } from '@constants/route.constants';
import { BADGE_SIZES, PENDING_ORDERS_BADGE_OFFSET } from '@constants/style.constants';

import { NAV_LABELS } from './AppLayout.constants';
import type { MenuItem } from './AppLayout.types';

export const getCommonNavItems = (pendingOrdersCount: number): MenuItem[] => {
  return [
    {
      key: ROUTES.BROWSE,
      icon: <SearchOutlined />,
      label: NAV_LABELS.BROWSE,
    },
    {
      key: ROUTES.ORDERS.MINE,
      icon: <ShoppingOutlined />,
      label: (
        <Badge
          count={pendingOrdersCount}
          offset={PENDING_ORDERS_BADGE_OFFSET}
          size={BADGE_SIZES.SMALL}
        >
          {NAV_LABELS.ORDERS}
        </Badge>
      ),
    },
  ];
};

export const getOwnerNavItems = (pendingOrdersCount: number): MenuItem[] => {
  return [
    {
      key: ROUTES.RESTAURANT.DASHBOARD,
      icon: <HomeOutlined />,
      label: NAV_LABELS.DASHBOARD,
    },
    ...getCommonNavItems(pendingOrdersCount),
  ];
};

export const getCustomerNavItems = (pendingOrdersCount: number): MenuItem[] => {
  return getCommonNavItems(pendingOrdersCount);
};
