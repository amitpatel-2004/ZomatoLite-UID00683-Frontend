import { Badge } from 'antd';

import { HomeOutlined, SearchOutlined, ShoppingOutlined } from '@ant-design/icons';
import { ROUTES } from '@constants/route.constants';
import { BADGE_SIZES, PENDING_ORDERS_BADGE_OFFSET } from '@constants/style.constants';
import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import type { UserRole } from '@pages/auth/types/auth.types';

import { NAV_LABELS } from './AppLayout.constants';
import type { MenuItem } from './AppLayout.types';

const getCommonNavItems = (pendingOrdersCount: number): MenuItem[] => {
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

export const getNavItems = (role: UserRole, pendingOrdersCount = 0): MenuItem[] => {
  const commonNavItems = getCommonNavItems(pendingOrdersCount);

  if (role === USER_ROLES.OWNER) {
    return [
      {
        key: ROUTES.RESTAURANT.DASHBOARD,
        icon: <HomeOutlined />,
        label: NAV_LABELS.DASHBOARD,
      },
      ...commonNavItems,
    ];
  }

  return commonNavItems;
};
