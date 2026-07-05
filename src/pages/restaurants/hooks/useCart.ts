import { useSelector } from 'react-redux';

import type { MenuItem } from '@pages/restaurants/types/restaurant.types';
import {
  cartCleared,
  cartItemAdded,
  cartItemDecremented,
  cartItemIncremented,
  getCartItems,
  getCartRestaurantId,
  getCartRestaurantName,
} from '@redux/customerStore';
import { useAppDispatch } from '@redux/hooks';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useSelector(getCartItems);
  const restaurantId = useSelector(getCartRestaurantId);
  const restaurantName = useSelector(getCartRestaurantName);

  const addItem = (currentRestaurantId: string, currentRestaurantName: string, item: MenuItem) => {
    dispatch(
      cartItemAdded({
        restaurantId: currentRestaurantId,
        restaurantName: currentRestaurantName,
        menuItemId: item._id,
        name: item.name,
        unitPrice: item.price,
      }),
    );
  };

  const increment = (menuItemId: string) => {
    dispatch(cartItemIncremented(menuItemId));
  };

  const decrement = (menuItemId: string) => {
    dispatch(cartItemDecremented(menuItemId));
  };

  const clear = () => {
    dispatch(cartCleared());
  };

  return { addItem, clear, decrement, increment, items, restaurantId, restaurantName };
};
