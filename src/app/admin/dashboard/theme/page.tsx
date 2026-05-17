"use client";

import { AdminCard, AdminInput, AdminToggle, Field, PageHeader, SaveButton } from "@/components/admin/ui";
import { useAdminConfigDraft } from "@/hooks/useAdminDraft";
import type { ThemeConfig } from "@/lib/firebase/types";

export default function ThemeManagerPage() {
  const { draft: theme, setDraft: setTheme, saveNow, saving, saved } = useAdminConfigDraft<ThemeConfig>({
    select: (c) => c.theme,
    merge: (c, theme) => ({ ...c, theme }),
    autosave: true,
    debounceMs: 1000,
  });

  return (
    <div>
      <PageHeader
        title="Theme Customizer"
        description="Neon colors, backgrounds, animations, and fonts. Autosaves after 1s."
        action={<SaveButton onClick={saveNow} saving={saving} saved={saved} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Colors">
          <div className="space-y-4">
            {(["neonPrimary", "neonSecondary", "backgroundColor"] as const).map((key) => (
              <Field key={key} label={key}>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={theme[key]}
                    onChange={(e) => setTheme({ ...theme, [key]: e.target.value })}
                    className="h-10 w-12 rounded-lg border border-white/10"
                  />
                  <AdminInput value={theme[key]} onChange={(e) => setTheme({ ...theme, [key]: e.target.value })} />
                </div>
              </Field>
            ))}
            <Field label="Gradient overlay (CSS)">
              <AdminInput
                value={theme.gradientOverlay}
                onChange={(e) => setTheme({ ...theme, gradientOverlay: e.target.value })}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard title="Effects">
          <div className="space-y-3">
            <AdminToggle label="Dark mode" checked={theme.darkMode} onChange={(darkMode) => setTheme({ ...theme, darkMode })} />
            <AdminToggle
              label="Animations"
              checked={theme.animationsEnabled}
              onChange={(animationsEnabled) => setTheme({ ...theme, animationsEnabled })}
            />
            <AdminToggle
              label="Particles"
              checked={theme.particlesEnabled}
              onChange={(particlesEnabled) => setTheme({ ...theme, particlesEnabled })}
            />
            <AdminToggle
              label="Mouse glow"
              checked={theme.mouseGlowEnabled}
              onChange={(mouseGlowEnabled) => setTheme({ ...theme, mouseGlowEnabled })}
            />
            <Field label="Glass blur (px)">
              <AdminInput
                type="number"
                value={theme.glassBlur}
                onChange={(e) => setTheme({ ...theme, glassBlur: Number(e.target.value) })}
              />
            </Field>
            <Field label="Font family CSS">
              <AdminInput value={theme.fontFamily} onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })} />
            </Field>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
