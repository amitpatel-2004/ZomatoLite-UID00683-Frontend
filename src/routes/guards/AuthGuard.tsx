import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { Spin } from 'antd';

import { SPIN_SIZES } from '@constants/style.constants';
import { CenteredLayout } from '@layouts/CenteredLayout';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { selectAuthUser, selectIsEmailVerified, selectIsFirebaseInitializing } from '@store/auth';

import type { AuthGuardProps } from './AuthGuard.types';

export const AuthGuard = (props: AuthGuardProps): React.JSX.Element => {
  const { check, fallbackPath } = props;
  const user = useSelector(selectAuthUser);
  const isEmailVerified = useSelector(selectIsEmailVerified);
  const isFirebaseInitializing = useSelector(selectIsFirebaseInitializing);

  if (isFirebaseInitializing) {
    return (
      <CenteredLayout>
        <Spin size={SPIN_SIZES.LARGE} tip={DISPLAY.ACTIONS.VERIFYING_SESSION} />
      </CenteredLayout>
    );
  }

  if (!check({ user, isEmailVerified })) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};
