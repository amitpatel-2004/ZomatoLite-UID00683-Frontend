import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { ROUTES } from '@constants/route.constants';
import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import type { UserRole } from '@pages/auth/types/auth.types';

import { NAV_LABELS } from './AppLayout.constants';
import type { MenuItem } from './AppLayout.types';

const COMMON_NAV_ITEMS: MenuItem[] = [
  {
    key: '/browse',
    icon: <SearchOutlined />,
    label: NAV_LABELS.BROWSE,
  },
];

const OWNER_NAV_ITEMS: MenuItem[] = [
  {
    key: ROUTES.RESTAURANT.DASHBOARD,
    icon: <HomeOutlined />,
    label: NAV_LABELS.DASHBOARD,
  },
  ...COMMON_NAV_ITEMS,
];

const CUSTOMER_NAV_ITEMS: MenuItem[] = [...COMMON_NAV_ITEMS];

export const getNavItems = (role: UserRole): MenuItem[] => {
  if (role === USER_ROLES.OWNER) return OWNER_NAV_ITEMS;
  return CUSTOMER_NAV_ITEMS;
};
