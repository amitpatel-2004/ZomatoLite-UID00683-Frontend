export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
} as const;

const GCS_BASE_URL = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME ?? ''}`;
export const getImageUrl = (imagePath: string | null): string | null => {
  if (!imagePath || !process.env.GCS_BUCKET_NAME) return null;
  return `${GCS_BASE_URL}/${imagePath}`;
};
