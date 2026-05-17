"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export function GuestGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin/dashboard");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#030308]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          className="h-11 w-11 rounded-full border-2 border-cyan-400/25 border-t-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/70">Checking session</p>
      </div>
    );
  }

  if (user) return null;

  return <>{children}</>;
}
