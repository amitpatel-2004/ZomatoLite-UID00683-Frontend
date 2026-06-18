import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

if (process.env.USE_FIREBASE_EMULATOR === 'true') {
  const port = process.env.FIREBASE_AUTH_EMULATOR_PORT || '9099';
  connectAuthEmulator(firebaseAuth, `http://127.0.0.1:${port}`);
}
