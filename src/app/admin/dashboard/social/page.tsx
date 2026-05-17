"use client";

import { AdminCard, AdminInput, Field, PageHeader, SaveButton } from "@/components/admin/ui";
import { useAdminConfigDraft } from "@/hooks/useAdminDraft";
import type { SocialLinks } from "@/lib/firebase/types";

const fields: { key: keyof SocialLinks; label: string }[] = [
  { key: "telegram", label: "Telegram — projects" },
  { key: "telegramPartner", label: "Telegram — partnership" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
  { key: "tiktok", label: "TikTok" },
  { key: "email", label: "Email" },
  { key: "website", label: "Website" },
];

export default function SocialManagerPage() {
  const { draft: social, setDraft: setSocial, saveNow, saving, saved } = useAdminConfigDraft<SocialLinks>({
    select: (c) => c.social,
    merge: (c, social) => ({ ...c, social }),
    autosave: true,
    debounceMs: 1000,
  });

  return (
    <div>
      <PageHeader
        title="Social Media"
        description="Update social and contact links. Autosaves after 1s."
        action={<SaveButton onClick={saveNow} saving={saving} saved={saved} />}
      />
      <AdminCard>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <Field key={f.key} label={f.label}>
              <AdminInput
                value={social[f.key]}
                onChange={(e) => setSocial((prev) => ({ ...prev, [f.key]: e.target.value }))}
                placeholder="https://"
              />
            </Field>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
