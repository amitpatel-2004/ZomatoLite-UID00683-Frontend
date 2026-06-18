import React from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';

import { ConfigProvider } from 'antd';

import { router } from '@routes/AppRoutes';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <RouterProvider router={router} />;
    </ConfigProvider>
  </React.StrictMode>,
);
