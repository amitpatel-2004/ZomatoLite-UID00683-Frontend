import { combineReducers } from 'redux';

import { authReducer } from './authStore';
import { customerReducer } from './customerStore';
import { restaurantReducer } from './restaurantStore';

export const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  restaurants: restaurantReducer,
});
