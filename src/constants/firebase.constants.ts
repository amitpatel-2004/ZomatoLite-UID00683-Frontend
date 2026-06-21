export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const FIREBASE_EMULATOR_PORT = {
  AUTH: process.env.FIREBASE_AUTH_EMULATOR_PORT,
};
