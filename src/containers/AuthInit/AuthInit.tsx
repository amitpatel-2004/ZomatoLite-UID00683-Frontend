import React, { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { FIREBASE_COLLECTIONS } from '@constants/firebase.constants';
import { firebaseAuth, firebaseDb } from '@core/firebase/firebaseClient';
import {
  authRequestSucceeded,
  firebaseInitialized,
  sessionCleared,
} from '@redux/authStore/authStore.actions';
import { useAppDispatch } from '@redux/hooks';

import { mapFirebaseUserToAuthUser } from './AuthInit.utils';

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
              user: mapFirebaseUserToAuthUser(firebaseUser, idTokenResult, firestoreData),
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
