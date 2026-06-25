import React, { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import type { UserRole } from '@appTypes/auth.types';
import { USER_ROLES } from '@constants/auth.constants';
import { firebaseAuth } from '@core/firebase/firebase.config';
import { authRequestSucceeded, firebaseInitialized, sessionCleared } from '@store/auth';
import { useAppDispatch } from '@store/hooks';

export const AuthInit = (props: React.PropsWithChildren): React.JSX.Element => {
  const { children } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idTokenResult = await firebaseUser.getIdTokenResult();
          dispatch(
            authRequestSucceeded({
              idToken: idTokenResult.token,
              isEmailVerified: firebaseUser.emailVerified,
              user: {
                _id: firebaseUser.uid,
                email: firebaseUser.email ?? '',
                displayName: firebaseUser.displayName ?? '',
                role: (idTokenResult.claims.role as UserRole) ?? USER_ROLES.CUSTOMER,
              },
            }),
          );
        } catch {
          dispatch(sessionCleared());
        }
      } else {
        dispatch(sessionCleared());
      }
      dispatch(firebaseInitialized());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};
