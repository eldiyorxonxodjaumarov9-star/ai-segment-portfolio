/**
 * Firebase client — loads real credentials from web/.env.local (via next.config).
 */
import {
  isClientFirebaseConfigured,
  getClientFirebaseConfig,
  getFirebaseEnvStatus,
  FIREBASE_PUBLIC_ENV_KEYS,
} from "./env";

import {
  initializeFirebase,
  getFirebaseServices,
  getFirebaseInitError,
  type FirebaseServices,
} from "./initialize";

export {
  isClientFirebaseConfigured,
  isClientFirebaseConfigured as isFirebaseConfigured,
  getClientFirebaseConfig,
  getFirebaseEnvStatus,
  FIREBASE_PUBLIC_ENV_KEYS,
  initializeFirebase,
  getFirebaseServices,
  getFirebaseInitError,
  type FirebaseServices,
};

export function getFirebaseAuth() {
  return getFirebaseServices().auth;
}

export function getFirebaseDb() {
  return getFirebaseServices().db;
}

export function getFirebaseStorage() {
  return getFirebaseServices().storage;
}
