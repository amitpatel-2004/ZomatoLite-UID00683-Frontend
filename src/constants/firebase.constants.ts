export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
} as const;

export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
} as const;

export const FIREBASE_BUCKETS = {
  IMAGE_UPLOAD_BUCKET: process.env.GCS_BUCKET_NAME,
} as const;
