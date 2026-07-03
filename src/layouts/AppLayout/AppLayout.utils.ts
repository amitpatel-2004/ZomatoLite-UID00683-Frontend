import type { Location } from 'react-router-dom';

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
