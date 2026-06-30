import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, message } from 'antd';

import { AuthInit } from '@core/auth/AuthInit';
import { router } from '@routes/AppRoutes';
import { store } from '@store/index';

import { MESSAGE_CONFIG } from './constants/style.constants';

message.config({
  maxCount: MESSAGE_CONFIG.MAX_COUNT,
  duration: MESSAGE_CONFIG.DURATION,
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthInit>
        <ConfigProvider>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AuthInit>
    </Provider>
  </React.StrictMode>,
);
