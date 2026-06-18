import React, { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Spin } from 'antd';

import type { UserRole } from '@appTypes/auth.types';
import { MESSAGES } from '@constants/message.constants';
import { ROUTES } from '@constants/route.constants';
import { firebaseAuth } from '@core/firebase';
import { authRequestSucceeded, sessionCleared } from '@store/auth';
import type { RootState } from '@store/index';

import type { RouteGuardProps } from './RouteGuard.types';

export const RouteGuard = (props: RouteGuardProps): React.JSX.Element => {
  const { isProtected, redirectTo, allowedRoles, onUnauthorized } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const isEmailVerified = useSelector((state: RootState) => state.auth.isEmailVerified);

  const [isFirebaseInitializing, setIsFirebaseInitializing] = useState(() => !user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idTokenResult = await firebaseUser.getIdTokenResult();
          const idToken = idTokenResult.token;

          const role = (idTokenResult.claims.role as UserRole) ?? 'customer';

          dispatch(
            authRequestSucceeded({
              idToken,
              isEmailVerified: firebaseUser.emailVerified,
              user: {
                _id: firebaseUser.uid,
                email: firebaseUser.email ?? '',
                displayName: firebaseUser.displayName ?? '',
                role,
              },
            }),
          );
        } catch {
          dispatch(sessionCleared());
        }
      } else {
        dispatch(sessionCleared());
      }
      setIsFirebaseInitializing(false);
    });

    return () => unsubscribe();
  }, [dispatch, user]);

  useEffect(() => {
    if (isFirebaseInitializing || !allowedRoles || allowedRoles.length === 0 || !user) return;
    if (allowedRoles.includes(user.role)) return;

    if (onUnauthorized) {
      onUnauthorized(user, navigate);
    } else {
      navigate(ROUTES.ERROR.NOT_FOUND, { replace: true });
    }
  }, [isFirebaseInitializing, allowedRoles, user, navigate, onUnauthorized]);

  if (isFirebaseInitializing) {
    return (
      <div className="centered-layout">
        <Spin size="large" tip={MESSAGES.LABELS.VERIFYING_SESSION} />
      </div>
    );
  }

  if (location.pathname === ROUTES.AUTH.VERIFY_EMAIL) {
    if (!user) {
      return <Navigate replace to={ROUTES.AUTH.LOGIN} />;
    }
    if (isEmailVerified) {
      return <Navigate replace to={ROUTES.RESTAURANT.DASHBOARD} />;
    }
    return <Outlet />;
  }

  if (!isProtected) {
    if (user && isEmailVerified) {
      return <Navigate replace to={redirectTo ?? ROUTES.RESTAURANT.DASHBOARD} />;
    }
    if (user && !isEmailVerified) {
      return <Navigate replace to={ROUTES.AUTH.VERIFY_EMAIL} />;
    }
    return <Outlet />;
  }

  if (!user) {
    return <Navigate replace to={redirectTo ?? ROUTES.AUTH.LOGIN} />;
  }

  if (!isEmailVerified) {
    return <Navigate replace to={ROUTES.AUTH.VERIFY_EMAIL} />;
  }

  if (allowedRoles && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <></>;
  }

  return <Outlet />;
};
