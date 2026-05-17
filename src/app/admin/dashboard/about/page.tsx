"use client";

import { AdminCard, AdminInput, AdminTextarea, Field, PageHeader, SaveButton } from "@/components/admin/ui";
import { useAdminConfigDraft } from "@/hooks/useAdminDraft";
import type { AboutContent } from "@/lib/firebase/types";

export default function AboutManagerPage() {
  const { draft: about, setDraft: setAbout, saveNow, saving, saved } = useAdminConfigDraft<AboutContent>({
    select: (c) => c.about,
    merge: (c, about) => ({ ...c, about }),
    autosave: true,
    debounceMs: 1000,
  });

  return (
    <div>
      <PageHeader
        title="About"
        description="Bio, skills, experience, AI tools, and services. Autosaves after 1s."
        action={<SaveButton onClick={saveNow} saving={saving} saved={saved} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Bio">
          <div className="space-y-4">
            <Field label="Section label">
              <AdminInput value={about.sectionLabel} onChange={(e) => setAbout({ ...about, sectionLabel: e.target.value })} />
            </Field>
            <Field label="Heading">
              <AdminInput value={about.heading} onChange={(e) => setAbout({ ...about, heading: e.target.value })} />
            </Field>
            {about.bioParagraphs.map((p, i) => (
              <Field key={i} label={`Paragraph ${i + 1}`}>
                <AdminTextarea
                  value={p}
                  onChange={(e) => {
                    const bioParagraphs = [...about.bioParagraphs];
                    bioParagraphs[i] = e.target.value;
                    setAbout({ ...about, bioParagraphs });
                  }}
                />
              </Field>
            ))}
            <Field label="Skills (comma separated)">
              <AdminTextarea
                value={about.skills.join(", ")}
                onChange={(e) =>
                  setAbout({ ...about, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                }
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard title="Details">
          <div className="space-y-4">
            <Field label="AI tools (comma separated)">
              <AdminTextarea
                value={about.aiTools.join(", ")}
                onChange={(e) =>
                  setAbout({ ...about, aiTools: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                }
              />
            </Field>
            <Field label="Services (comma separated)">
              <AdminTextarea
                value={about.services.join(", ")}
                onChange={(e) =>
                  setAbout({ ...about, services: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                }
              />
            </Field>
            <Field label="Focus">
              <AdminInput value={about.focus} onChange={(e) => setAbout({ ...about, focus: e.target.value })} />
            </Field>
            <Field label="Vibe">
              <AdminInput value={about.vibe} onChange={(e) => setAbout({ ...about, vibe: e.target.value })} />
            </Field>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}