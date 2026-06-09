import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { AppRoutes } from '@routes';
import { MESSAGES } from '@constants';

ConfigProvider.config({
  theme: {
    primaryColor: '#e81d43',
    errorColor: '#e03546',
    successColor: '#24963f',
  },
});

const container = document.getElementById('root');

if (!container) {
  throw new Error(MESSAGES.ERRORS.ROOT_CONTAINER_MISSING);
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <AppRoutes />
    </ConfigProvider>
  </React.StrictMode>,
);
