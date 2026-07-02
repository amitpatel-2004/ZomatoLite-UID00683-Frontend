import type { FirebaseBucket } from '@pages/auth/types/firebase.types';

/**
 * Generates the public URL for a file stored in GCS bucket.
 *
 * @param filePath - The path to file in the bucket, or null.
 * @param firebaseBucket - The name of target Cloud Storage bucket.
 * @returns The complete storage URL, or null if no filePath is provided.
 */
export const getFileUrl = (
  filePath: string | null,
  firebaseBucket: FirebaseBucket,
): string | null => {
  if (!filePath || !firebaseBucket) return null;
  return `https://storage.googleapis.com/${firebaseBucket}/${filePath}`;
};
