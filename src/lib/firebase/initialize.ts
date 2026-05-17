import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getClientFirebaseConfig, getFirebaseEnvStatus, isClientFirebaseConfigured } from "./env";

export type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
};

let services: FirebaseServices | null = null;
let initError: string | null = null;

export function getFirebaseInitError(): string | null {
  return initError;
}

/**
 * Lazy, idempotent Firebase initialization.
 * Safe to call from client components after env is loaded from .env.local.
 */
export function initializeFirebase(): FirebaseServices | null {
  if (services) return services;

  if (!isClientFirebaseConfigured()) {
    const { missing } = getFirebaseEnvStatus();
    initError = `Missing Firebase keys: ${missing.join(", ")}`;
    return null;
  }

  try {
    const config = getClientFirebaseConfig();
    const app = getApps().length > 0 ? getApps()[0]! : initializeApp(config);
    services = {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
      storage: getStorage(app),
    };
    initError = null;
    return services;
  } catch (err) {
    initError = err instanceof Error ? err.message : "Firebase initialization failed";
    return null;
  }
}

export function getFirebaseServices(): FirebaseServices {
  const result = initializeFirebase();
  if (!result) {
    throw new Error(
      initError ??
        "Firebase is not initialized. Check web/.env.local and restart the dev server (npm run dev).",
    );
  }
  return result;
}
