import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from '@constants/firebase.constants';

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
