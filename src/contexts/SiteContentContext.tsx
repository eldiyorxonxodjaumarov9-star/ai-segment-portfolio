"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultSiteContent } from "@/lib/firebase/defaults";
import { subscribeSiteContent } from "@/lib/firebase/content-service";
import { isSameSiteContent } from "@/lib/firebase/content-equality";
import type { SiteContent } from "@/lib/firebase/types";

interface SiteContentContextValue {
  content: SiteContent;
  loading: boolean;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeSiteContent((data) => {
      setContent((prev) => (isSameSiteContent(prev, data) ? prev : data));
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = useMemo(() => ({ content, loading }), [content, loading]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
}
