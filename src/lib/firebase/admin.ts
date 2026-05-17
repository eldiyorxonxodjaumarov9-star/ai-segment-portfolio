import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getAdminServiceAccount } from "./env";

let adminApp: App | undefined;

export function getAdminApp(): App {
  if (adminApp) return adminApp;

  const account = getAdminServiceAccount();
  if (!account) {
    throw new Error("Firebase Admin SDK is not configured (FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY).");
  }

  adminApp =
    getApps().find((a) => a.name === "admin") ??
    initializeApp(
      {
        credential: cert({
          projectId: account.projectId,
          clientEmail: account.clientEmail,
          privateKey: account.privateKey,
        }),
      },
      "admin",
    );

  return adminApp;
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

export function isAdminSdkConfigured(): boolean {
  return getAdminServiceAccount() !== null;
}
