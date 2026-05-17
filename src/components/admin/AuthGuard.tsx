"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { seedSiteIfEmpty } from "@/lib/firebase/content-service";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user && isFirebaseConfigured()) {
      seedSiteIfEmpty().catch(() => undefined);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#05050f]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          className="h-11 w-11 rounded-full border-2 border-cyan-400/25 border-t-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.35)]"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/70">Verifying access</p>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
