"use client";

import { useMounted } from "@/hooks/useMounted";

const BUILD_YEAR = 2026;

/** Avoids rare SSR/client timezone mismatch for dynamic getFullYear(). */
export function CopyrightYear() {
  const mounted = useMounted();
  const year = mounted ? new Date().getFullYear() : BUILD_YEAR;
  return <span suppressHydrationWarning>{year}</span>;
}
