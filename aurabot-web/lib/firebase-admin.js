import admin from "firebase-admin";
import serviceAccount from "@/credentials.json";

if (!admin.apps.length) {
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
}

export const db = admin.firestore();