"use client";

import { AdminCard, AdminInput, Field, PageHeader, SaveButton } from "@/components/admin/ui";
import { useAdminConfigDraft } from "@/hooks/useAdminDraft";
import type { StatItem } from "@/lib/firebase/types";

export default function StatsManagerPage() {
  const { draft: stats, setDraft: setStats, saveNow, saving, saved } = useAdminConfigDraft<StatItem[]>({
    select: (c) => c.stats,
    merge: (c, stats) => ({ ...c, stats }),
    autosave: true,
    debounceMs: 1000,
  });

  const update = (index: number, patch: Partial<StatItem>) => {
    setStats((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  return (
    <div>
      <PageHeader
        title="Statistics"
        description="Edit realtime HUD counters. Autosaves 1s after edits."
        action={<SaveButton onClick={saveNow} saving={saving} saved={saved} />}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((s, i) => (
          <AdminCard key={s.key} title={s.label}>
            <div className="space-y-3">
              <Field label="Label">
                <AdminInput value={s.label} onChange={(e) => update(i, { label: e.target.value })} />
              </Field>
              <Field label="Value">
                <AdminInput
                  type="number"
                  value={s.value}
                  onChange={(e) => update(i, { value: Number(e.target.value) })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Prefix">
                  <AdminInput value={s.prefix} onChange={(e) => update(i, { prefix: e.target.value })} />
                </Field>
                <Field label="Suffix">
                  <AdminInput value={s.suffix} onChange={(e) => update(i, { suffix: e.target.value })} />
                </Field>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}