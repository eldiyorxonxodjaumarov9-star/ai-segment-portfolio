"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AdminCard,
  AdminInput,
  AdminTextarea,
  AdminToggle,
  Field,
  PageHeader,
  ProgressBar,
  SaveButton,
} from "@/components/admin/ui";
import { useToast } from "@/contexts/ToastContext";
import { useAdminConfigDraft } from "@/hooks/useAdminDraft";
import { newId, uploadFile } from "@/lib/firebase/content-service";
import type { HeroContent } from "@/lib/firebase/types";

export default function HeroManagerPage() {
  const { toast } = useToast();
  const { draft, setDraft, saveNow, saving, saved } = useAdminConfigDraft<HeroContent>({
    select: (c) => c.hero,
    merge: (c, hero) => ({ ...c, hero }),
    autosave: true,
    debounceMs: 1000,
  });
  const [uploadPct, setUploadPct] = useState(0);

  const update = <K extends keyof HeroContent>(key: K, value: HeroContent[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const onPortraitUpload = async (file: File | null) => {
    if (!file) return;
    try {
      const url = await uploadFile(`hero/${newId("portrait")}-${file.name}`, file, setUploadPct);
      update("portraitUrl", url);
      toast("Portrait uploaded");
    } catch {
      toast("Upload failed", "error");
    } finally {
      setUploadPct(0);
    }
  };

  return (
    <div>
      <PageHeader
        title="Hero Section"
        description="Changes autosave after 1 second (only when edited)."
        action={<SaveButton onClick={saveNow} saving={saving} saved={saved} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Copy & buttons">
          <div className="space-y-4">
            <Field label="Badge">
              <AdminInput value={draft.badge} onChange={(e) => update("badge", e.target.value)} />
            </Field>
            <Field label="Title line 1">
              <AdminInput value={draft.titleLine1} onChange={(e) => update("titleLine1", e.target.value)} />
            </Field>
            <Field label="Title line 2">
              <AdminInput value={draft.titleLine2} onChange={(e) => update("titleLine2", e.target.value)} />
            </Field>
            <Field label="Subtitle">
              <AdminTextarea value={draft.subtitle} onChange={(e) => update("subtitle", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Primary button">
                <AdminInput
                  value={draft.primaryButton.label}
                  onChange={(e) => update("primaryButton", { ...draft.primaryButton, label: e.target.value })}
                />
                <AdminInput
                  className="mt-2"
                  value={draft.primaryButton.href}
                  onChange={(e) => update("primaryButton", { ...draft.primaryButton, href: e.target.value })}
                />
              </Field>
              <Field label="Secondary button">
                <AdminInput
                  value={draft.secondaryButton.label}
                  onChange={(e) =>
                    update("secondaryButton", { ...draft.secondaryButton, label: e.target.value })
                  }
                />
                <AdminInput
                  className="mt-2"
                  value={draft.secondaryButton.href}
                  onChange={(e) =>
                    update("secondaryButton", { ...draft.secondaryButton, href: e.target.value })
                  }
                />
              </Field>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Portrait & effects">
          <div className="space-y-4">
            <Field label="Hero portrait">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onPortraitUpload(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-400/20 file:px-3 file:py-2 file:text-cyan-100"
              />
              {uploadPct > 0 && <ProgressBar value={uploadPct} />}
              {draft.portraitUrl && (
                <div className="relative mt-3 aspect-square w-40 overflow-hidden rounded-2xl border border-white/10">
                  <Image src={draft.portraitUrl} alt="Hero portrait" fill className="object-cover" unoptimized />
                </div>
              )}
            </Field>
            <AdminToggle
              label="Animations enabled"
              checked={draft.animationsEnabled}
              onChange={(v) => update("animationsEnabled", v)}
            />
            <AdminToggle
              label="3D background scene"
              checked={draft.effects.scene3d}
              onChange={(v) => update("effects", { ...draft.effects, scene3d: v })}
            />
            <AdminToggle
              label="Particles"
              checked={draft.effects.particles}
              onChange={(v) => update("effects", { ...draft.effects, particles: v })}
            />
            <AdminToggle
              label="Scan line HUD"
              checked={draft.effects.scanLine}
              onChange={(v) => update("effects", { ...draft.effects, scanLine: v })}
            />
            <AdminToggle
              label="Floating portrait"
              checked={draft.effects.floatingPortrait}
              onChange={(v) => update("effects", { ...draft.effects, floatingPortrait: v })}
            />
          </div>
        </AdminCard>

        <AdminCard title="Neon colors" className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            {(["primary", "secondary", "accent"] as const).map((key) => (
              <Field key={key} label={key}>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={draft.neonColors[key]}
                    onChange={(e) => update("neonColors", { ...draft.neonColors, [key]: e.target.value })}
                    className="h-10 w-12 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                  />
                  <AdminInput
                    value={draft.neonColors[key]}
                    onChange={(e) => update("neonColors", { ...draft.neonColors, [key]: e.target.value })}
                  />
                </div>
              </Field>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
