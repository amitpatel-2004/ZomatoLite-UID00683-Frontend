import type { Location } from 'react-router-dom';

import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import type { UserRole } from '@pages/auth/types/auth.types';

import { getCustomerNavItems, getOwnerNavItems } from './AppLayout.config';
import type { MenuItem } from './AppLayout.types';

/**
 *
 * @param navItems - Navigation menu list items for current user.
 * @param location - Current Router location instance.
 * @returns - Key string for the selected nav menu item to navigate to it.
 */
export const getSelectedKey = (navItems: MenuItem[], location: Location): string => {
  const active = navItems.find((item) => {
    return (
      item !== null &&
      item !== undefined &&
      'key' in item &&
      location.pathname.startsWith(`${String(item.key)}/`)
    );
  });
  return active !== null && active !== undefined && 'key' in active
    ? String(active.key)
    : location.pathname;
};

/**
 * Returns navigation configuration according to current user's role.
 * @param role - The role of the current authenticated user.
 * @param pendingOrdersCount - Count shown on the Orders nav badge.
 * @returns - Navigation menu config for the given user role.
 */
export const getNavItems = (role: UserRole, pendingOrdersCount = 0): MenuItem[] => {
  if (role === USER_ROLES.OWNER) return getOwnerNavItems(pendingOrdersCount);
  return getCustomerNavItems(pendingOrdersCount);
};
