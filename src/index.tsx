import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, message } from 'antd';

import { FORM_REQUIRED_MARKS, MESSAGE_CONFIG } from '@constants/style.constants';
import { AuthInit } from '@core/auth/AuthInit';
import { router } from '@routes/AppRoutes';
import { store } from '@store/index';

message.config({
  duration: MESSAGE_CONFIG.DURATION,
  maxCount: MESSAGE_CONFIG.MAX_COUNT,
});

const antdConfig = {
  form: { requiredMark: FORM_REQUIRED_MARKS.OPTIONAL },
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthInit>
        <ConfigProvider {...antdConfig}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AuthInit>
    </Provider>
  </React.StrictMode>,
);
