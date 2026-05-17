"use client";

import { AdminCard, AdminInput, Field, PageHeader, SaveButton } from "@/components/admin/ui";
import { useAdminAnalyticsDraft } from "@/hooks/useAdminDraft";
import { formatCompact } from "@/lib/format";

export default function AnalyticsPage() {
  const { draft: data, setDraft: setData, saveNow, saving, saved } = useAdminAnalyticsDraft({
    autosave: true,
    debounceMs: 1000,
  });

  const maxVisits = Math.max(...data.trafficByDay.map((d) => d.visits), 1);

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Traffic overview, engagement, and device stats. Autosaves after 1s."
        action={<SaveButton onClick={saveNow} saving={saving} saved={saved} />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Visitors", key: "visitors" as const },
          { label: "Page views", key: "pageViews" as const },
          { label: "Engagement %", key: "engagementRate" as const },
          { label: "Avg session (sec)", key: "avgSessionSeconds" as const },
        ].map((m) => (
          <div key={m.key} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-xs text-white/45">{m.label}</p>
            <AdminInput
              type="number"
              className="mt-2"
              value={data[m.key]}
              onChange={(e) => setData({ ...data, [m.key]: Number(e.target.value) })}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AdminCard title="Traffic (7 days)">
          <div className="flex h-40 items-end gap-2">
            {data.trafficByDay.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500/80 to-violet-500/40"
                  style={{ height: `${Math.max(4, (d.visits / maxVisits) * 100)}%` }}
                />
                <span className="text-[10px] text-white/40">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {data.trafficByDay.map((d, i) => (
              <Field key={d.day} label={d.day}>
                <AdminInput
                  type="number"
                  value={d.visits}
                  onChange={(e) => {
                    const trafficByDay = [...data.trafficByDay];
                    trafficByDay[i] = { ...d, visits: Number(e.target.value) };
                    setData({ ...data, trafficByDay });
                  }}
                />
              </Field>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Devices & top videos">
          <div className="grid grid-cols-3 gap-3">
            {(["desktop", "mobile", "tablet"] as const).map((device) => (
              <Field key={device} label={device}>
                <AdminInput
                  type="number"
                  value={data.devices[device]}
                  onChange={(e) =>
                    setData({ ...data, devices: { ...data.devices, [device]: Number(e.target.value) } })
                  }
                />
              </Field>
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            {data.topVideos.map((v) => (
              <li key={v.videoId} className="flex justify-between text-sm text-white/60">
                <span className="truncate">{v.title}</span>
                <span className="font-mono text-cyan-300/70">{formatCompact(v.views)}</span>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </div>
  );
}
