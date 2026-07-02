import type { ValueOf } from '@appTypes/common.types';
import { FIREBASE_BUCKETS } from '@constants/firebase.constants';

export type FirebaseBucket = ValueOf<typeof FIREBASE_BUCKETS>;
