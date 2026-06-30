import { combineReducers } from 'redux';

import { authReducer } from '@pages/auth/store';
import { menuItemReducer, restaurantReducer } from '@pages/restaurants/store';

export const rootReducer = combineReducers({
  auth: authReducer,
  menuItems: menuItemReducer,
  restaurants: restaurantReducer,
});
