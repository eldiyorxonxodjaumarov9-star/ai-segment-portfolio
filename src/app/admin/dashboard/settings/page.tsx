"use client";

import { useState } from "react";
import { AdminCard, AdminInput, AdminTextarea, Field, PageHeader, ProgressBar, SaveButton } from "@/components/admin/ui";
import { useToast } from "@/contexts/ToastContext";
import { useAdminConfigDraft } from "@/hooks/useAdminDraft";
import { newId, uploadFile } from "@/lib/firebase/content-service";
import type { SiteSettings } from "@/lib/firebase/types";

export default function SettingsPage() {
  const { toast } = useToast();
  const { draft: settings, setDraft: setSettings, saveNow, saving, saved } = useAdminConfigDraft<SiteSettings>({
    select: (c) => c.settings,
    merge: (c, settings) => ({ ...c, settings }),
    autosave: true,
    debounceMs: 1000,
  });
  const [uploadPct, setUploadPct] = useState(0);

  const uploadAsset = async (file: File | null, field: "logoUrl" | "faviconUrl") => {
    if (!file) return;
    try {
      const url = await uploadFile(`settings/${newId(field)}-${file.name}`, file, setUploadPct);
      setSettings((s) => ({ ...s, [field]: url }));
      toast("Uploaded");
    } catch {
      toast("Upload failed", "error");
    } finally {
      setUploadPct(0);
    }
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Site name, logo, favicon, and SEO meta. Autosaves after 1s."
        action={<SaveButton onClick={saveNow} saving={saving} saved={saved} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Branding">
          <div className="space-y-4">
            <Field label="Site name">
              <AdminInput value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
            </Field>
            <Field label="Logo">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadAsset(e.target.files?.[0] ?? null, "logoUrl")}
                className="text-sm text-white/50 file:rounded-lg file:border-0 file:bg-cyan-400/20 file:px-3 file:py-1.5"
              />
            </Field>
            <Field label="Favicon">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadAsset(e.target.files?.[0] ?? null, "faviconUrl")}
                className="text-sm text-white/50 file:rounded-lg file:border-0 file:bg-violet-500/20 file:px-3 file:py-1.5"
              />
            </Field>
            {uploadPct > 0 && <ProgressBar value={uploadPct} />}
          </div>
        </AdminCard>

        <AdminCard title="SEO">
          <div className="space-y-4">
            <Field label="SEO title">
              <AdminInput value={settings.seoTitle} onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })} />
            </Field>
            <Field label="Meta description">
              <AdminTextarea
                value={settings.seoDescription}
                onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
              />
            </Field>
            <Field label="Keywords (comma separated)">
              <AdminTextarea
                value={settings.seoKeywords.join(", ")}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoKeywords: e.target.value
                      .split(",")
                      .map((k) => k.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
