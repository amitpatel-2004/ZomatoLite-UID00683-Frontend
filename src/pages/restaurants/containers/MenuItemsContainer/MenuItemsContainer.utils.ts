import type { MenuItemFormSubmitValues } from '@pages/restaurants/components/MenuItemForm/MenuItemForm.types';
import type { CreateMenuItemPayload } from '@services/menuItem/menuItemService.types';

export const buildMenuItemPayload = (
  values: MenuItemFormSubmitValues,
  imagePath: string | null,
): CreateMenuItemPayload => {
  return {
    name: values.name,
    description: values.description,
    price: values.price,
    isVeg: values.isVeg,
    quantity: values.quantity,
    imagePath,
  };
};
