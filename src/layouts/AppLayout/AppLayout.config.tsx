import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { ROUTES } from '@constants/route.constants';

import { NAV_LABELS } from './AppLayout.constants';
import type { MenuItem } from './AppLayout.types';

export const COMMON_NAV_ITEMS: MenuItem[] = [
  {
    key: '/browse',
    icon: <SearchOutlined />,
    label: NAV_LABELS.BROWSE,
  },
];

export const OWNER_NAV_ITEMS: MenuItem[] = [
  {
    key: ROUTES.RESTAURANT.DASHBOARD,
    icon: <HomeOutlined />,
    label: NAV_LABELS.DASHBOARD,
  },
  ...COMMON_NAV_ITEMS,
];

export const CUSTOMER_NAV_ITEMS: MenuItem[] = [...COMMON_NAV_ITEMS];
