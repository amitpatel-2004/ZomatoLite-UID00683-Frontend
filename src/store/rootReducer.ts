import { combineReducers } from 'redux';

import { authReducer } from '@pages/auth/store';

export const rootReducer = combineReducers({
  auth: authReducer,
});
