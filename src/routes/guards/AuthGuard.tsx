import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { Spin } from 'antd';

import { SPIN_SIZES } from '@constants/style.constants';
import { CenteredLayout } from '@layouts/CenteredLayout';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { getAuthUser, getIsEmailVerified, getIsFirebaseInitializing } from '@pages/auth/store';

import type { AuthGuardProps } from './AuthGuard.types';

export const AuthGuard = (props: AuthGuardProps): React.JSX.Element => {
  const { accessCheck, fallbackPath } = props;
  const user = useSelector(getAuthUser);
  const isEmailVerified = useSelector(getIsEmailVerified);
  const isFirebaseInitializing = useSelector(getIsFirebaseInitializing);

  if (isFirebaseInitializing) {
    return (
      <CenteredLayout>
        <Spin size={SPIN_SIZES.LARGE} tip={DISPLAY.ACTIONS.VERIFYING_SESSION} />
      </CenteredLayout>
    );
  }

  if (!accessCheck({ user, isEmailVerified })) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};
