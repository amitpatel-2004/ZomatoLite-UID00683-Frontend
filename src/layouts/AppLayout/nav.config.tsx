import type { MenuProps } from 'antd';

import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import type { UserRole } from '@appTypes/auth.types';
import { USER_ROLES } from '@constants/auth.constants';
import { ROUTES } from '@constants/route.constants';

type MenuItem = Required<MenuProps>['items'][number];

const NAV_LABELS = {
  DASHBOARD: 'Dashboard',
  BROWSE: 'Browse',
} as const;

const OWNER_NAV_ITEMS: MenuItem[] = [
  {
    key: ROUTES.RESTAURANT.DASHBOARD,
    icon: <HomeOutlined />,
    label: NAV_LABELS.DASHBOARD,
  },
  {
    key: '/browse',
    icon: <SearchOutlined />,
    label: NAV_LABELS.BROWSE,
  },
];

const CUSTOMER_NAV_ITEMS: MenuItem[] = [
  {
    key: '/browse',
    icon: <SearchOutlined />,
    label: NAV_LABELS.BROWSE,
  },
];

export const getNavItems = (role: UserRole): MenuItem[] => {
  if (role === USER_ROLES.OWNER) return OWNER_NAV_ITEMS;
  return CUSTOMER_NAV_ITEMS;
};
