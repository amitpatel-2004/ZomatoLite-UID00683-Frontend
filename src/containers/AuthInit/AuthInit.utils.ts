import type { IdTokenResult, User as FirebaseUser } from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';

import type { Currency } from '@appTypes/common.types';
import { DEFAULT_CURRENCY } from '@constants/app.constants';
import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import type { UserRole } from '@pages/auth/types/auth.types';
import type { AuthUser } from '@services/auth/authService.types';

export const mapFirebaseUserToAuthUser = (
  firebaseUser: FirebaseUser,
  idTokenResult: IdTokenResult,
  firestoreData: DocumentData,
): AuthUser => {
  return {
    _id: firebaseUser.uid,
    email: firebaseUser.email ?? '',
    displayName: firebaseUser.displayName ?? '',
    role: (idTokenResult.claims.role as UserRole) ?? USER_ROLES.CUSTOMER,
    balance: (firestoreData.balance as number) ?? 0,
    currency: (firestoreData.currency as Currency) ?? DEFAULT_CURRENCY,
  };
};
