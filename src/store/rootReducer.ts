import { combineReducers } from 'redux';

import { authReducer } from './slices/authSlice';
import { menuItemReducer } from './slices/menuItemSlice';
import { restaurantReducer } from './slices/restaurantSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  menuItems: menuItemReducer,
  restaurants: restaurantReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
