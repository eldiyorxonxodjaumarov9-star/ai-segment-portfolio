"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Film, MessageSquare, Sparkles, TrendingUp, Users } from "lucide-react";
import { PageHeader } from "@/components/admin/ui";
import { useAdminContent } from "@/contexts/AdminContentContext";
import { formatCompact } from "@/lib/format";

const quickLinks = [
  { href: "/admin/dashboard/hero", label: "Edit Hero", icon: Sparkles },
  { href: "/admin/dashboard/videos", label: "Manage Videos", icon: Film },
  { href: "/admin/dashboard/comments", label: "Moderate Comments", icon: MessageSquare },
];

export default function DashboardOverviewPage() {
  const { content } = useAdminContent();
  const { analytics, videos, comments } = content;

  const cards = [
    {
      label: "Site visitors",
      value: formatCompact(analytics.visitors),
      change: `+${analytics.visitorsChange}%`,
      icon: Users,
      color: "from-cyan-500/20 to-cyan-500/5",
    },
    {
      label: "Page views",
      value: formatCompact(analytics.pageViews),
      change: "This month",
      icon: TrendingUp,
      color: "from-violet-500/20 to-violet-500/5",
    },
    {
      label: "Videos",
      value: String(videos.length),
      change: `${videos.filter((v) => v.pinned).length} pinned`,
      icon: Film,
      color: "from-fuchsia-500/20 to-fuchsia-500/5",
    },
    {
      label: "Comments",
      value: String(comments.filter((c) => !c.spam).length),
      change: `${comments.filter((c) => c.pinned).length} pinned`,
      icon: MessageSquare,
      color: "from-emerald-500/20 to-emerald-500/5",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your portfolio performance. All changes sync to the live site in realtime."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl border border-white/[0.08] bg-gradient-to-br ${card.color} p-5 backdrop-blur-xl`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/45">{card.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
                  <p className="mt-1 text-[11px] text-cyan-200/70">{card.change}</p>
                </div>
                <span className="rounded-xl border border-white/10 bg-black/30 p-2">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
        >
          <h2 className="text-lg font-semibold text-white">Quick actions</h2>
          <div className="mt-4 grid gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3 text-sm text-white/75 transition-colors hover:border-cyan-400/25 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-cyan-400" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
        >
          <h2 className="text-lg font-semibold text-white">Top videos</h2>
          <ul className="mt-4 space-y-3">
            {analytics.topVideos.slice(0, 5).map((v, i) => (
              <li key={v.videoId} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-white/70">
                  <span className="mr-2 font-mono text-cyan-300/60">#{i + 1}</span>
                  {v.title}
                </span>
                <span className="shrink-0 font-mono text-xs text-white/40">{formatCompact(v.views)}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
