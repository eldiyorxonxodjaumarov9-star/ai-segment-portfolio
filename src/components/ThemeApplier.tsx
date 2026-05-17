"use client";

import { useEffect } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";

export function ThemeApplier() {
  const { content } = useSiteContent();
  const { theme } = content.config;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--neon-primary", theme.neonPrimary);
    root.style.setProperty("--neon-secondary", theme.neonSecondary);
    root.style.setProperty("--site-bg", theme.backgroundColor);
    root.style.setProperty("--site-gradient", theme.gradientOverlay);
    root.style.setProperty("--glass-blur", `${theme.glassBlur}px`);
    if (theme.fontFamily) {
      root.style.setProperty("--font-sans", theme.fontFamily);
    }
    document.body.style.background = theme.backgroundColor;
    if (!theme.darkMode) {
      document.documentElement.style.colorScheme = "light";
    } else {
      document.documentElement.style.colorScheme = "dark";
    }
  }, [theme]);

  return null;
}
