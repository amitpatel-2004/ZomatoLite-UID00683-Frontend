import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import type { PreloadedState } from 'redux';
import { createStore } from 'redux';

import type { RootState } from '@redux/index';
import { rootReducer } from '@redux/rootReducer';
import { render } from '@testing-library/react';

export const renderWithStore = (ui: ReactElement, preloadedState?: PreloadedState<RootState>) => {
  const store = createStore(rootReducer, preloadedState);
  return render(<Provider store={store}>{ui}</Provider>);
};
