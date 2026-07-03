import { useDispatch } from 'react-redux';

import type { AppDispatch } from './index';

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
