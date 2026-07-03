import { combineReducers } from 'redux';

import { authReducer } from '@pages/auth/store';
import { menuItemReducer } from '@pages/restaurants/store/menuItemStore';
import { restaurantReducer } from '@pages/restaurants/store/restaurantStore';

export const rootReducer = combineReducers({
  auth: authReducer,
  menuItems: menuItemReducer,
  restaurants: restaurantReducer,
});
