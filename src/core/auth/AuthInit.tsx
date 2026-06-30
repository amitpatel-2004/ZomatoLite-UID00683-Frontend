import React, { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import type { Currency } from '@appTypes/common.types';
import { FIREBASE_COLLECTIONS } from '@constants/firebase.constants';
import { firebaseAuth, firebaseDb } from '@core/firebase/firebase.config';
import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import { authRequestSucceeded, firebaseInitialized, sessionCleared } from '@pages/auth/store';
import type { UserRole } from '@pages/auth/types/auth.types';
import { useAppDispatch } from '@store/hooks';

const DEFAULT_CURRENCY: Currency = { code: 'INR', symbol: '₹' };

export const AuthInit = (props: React.PropsWithChildren): React.JSX.Element => {
  const { children } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idTokenResult = await firebaseUser.getIdTokenResult();

          const userRef = doc(firebaseDb, FIREBASE_COLLECTIONS.USERS, firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          const firestoreData = userSnap.exists() ? userSnap.data() : {};

          dispatch(
            authRequestSucceeded({
              idToken: idTokenResult.token,
              isEmailVerified: firebaseUser.emailVerified,
              user: {
                _id: firebaseUser.uid,
                email: firebaseUser.email ?? '',
                displayName: firebaseUser.displayName ?? '',
                role: (idTokenResult.claims.role as UserRole) ?? USER_ROLES.CUSTOMER,
                balance: (firestoreData.balance as number) ?? 0,
                currency: (firestoreData.currency as Currency) ?? DEFAULT_CURRENCY,
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

    return () => {
      return unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};
