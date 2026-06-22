import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

import { FIREBASE_EMULATOR_PORT, firebaseConfig } from '@constants/firebase.constants';

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

if (process.env.ENV_MODE === 'test') {
  connectAuthEmulator(firebaseAuth, `http://127.0.0.1:${FIREBASE_EMULATOR_PORT.AUTH}`);
}
