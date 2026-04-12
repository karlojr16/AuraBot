import admin from 'firebase-admin';
import credentials from '../credentials.json';

if (!admin.apps.length) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin.initializeApp({
    credential: admin.credential.cert(credentials as any),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'aurabot-f57b2.firebasestorage.app',
  });
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage();
