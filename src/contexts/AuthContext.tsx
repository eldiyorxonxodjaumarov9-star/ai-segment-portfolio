"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type User,
} from "firebase/auth";
import { clearServerSession, establishServerSession } from "@/lib/auth/client-session";
import { getAuthErrorMessage } from "@/lib/firebase/auth-errors";
import {
  getFirebaseEnvStatus,
  getFirebaseInitError,
  initializeFirebase,
  isFirebaseConfigured,
} from "@/lib/firebase/config";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  firebaseReady: boolean;
  firebaseError: string | null;
  missingEnvKeys: string[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function syncSession(user: User | null) {
  if (!user) {
    await clearServerSession();
    return;
  }
  const idToken = await user.getIdToken(true);
  await establishServerSession(idToken);
}

function resolveAuth(): Auth | null {
  return initializeFirebase()?.auth ?? null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const envStatus = getFirebaseEnvStatus();
  const firebaseReady = envStatus.ready;
  const firebaseError = firebaseReady ? getFirebaseInitError() : `Missing: ${envStatus.missing.join(", ")}`;

  useEffect(() => {
    const auth = resolveAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    void setPersistence(auth, browserLocalPersistence).catch(() => undefined);

    const unsub = onAuthStateChanged(auth, async (next) => {
      if (cancelled) return;
      setUser(next);

      if (next) {
        try {
          await syncSession(next);
        } catch {
          /* session cookie sync optional */
        }
      } else {
        try {
          await clearServerSession();
        } catch {
          /* ignore */
        }
      }

      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [firebaseReady]);

  const login = useCallback(async (email: string, password: string) => {
    const auth = resolveAuth();
    if (!auth) {
      throw new Error(
        "Firebase is not connected. Add keys to web/.env.local and restart npm run dev.",
      );
    }
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const idToken = await credential.user.getIdToken();
    await establishServerSession(idToken);
  }, []);

  const logout = useCallback(async () => {
    await clearServerSession();
    const auth = resolveAuth();
    if (auth) await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      firebaseReady,
      firebaseError: firebaseReady ? getFirebaseInitError() : firebaseError,
      missingEnvKeys: envStatus.missing,
      login,
      logout,
    }),
    [user, loading, firebaseReady, firebaseError, envStatus.missing, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { getAuthErrorMessage };
