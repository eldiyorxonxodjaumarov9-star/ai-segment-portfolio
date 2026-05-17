"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Clapperboard,
  Film,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Palette,
  Search,
  Settings,
  Share2,
  Sparkles,
  Star,
  User,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const nav = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/hero", label: "Hero", icon: Sparkles },
  { href: "/admin/dashboard/videos", label: "Videos", icon: Film },
  { href: "/admin/dashboard/brands", label: "Brands", icon: Star },
  { href: "/admin/dashboard/stats", label: "Statistics", icon: BarChart3 },
  { href: "/admin/dashboard/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/dashboard/social", label: "Social", icon: Share2 },
  { href: "/admin/dashboard/about", label: "About", icon: User },
  { href: "/admin/dashboard/theme", label: "Theme", icon: Palette },
  { href: "/admin/dashboard/media", label: "Media", icon: ImageIcon },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: Clapperboard },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredNav = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nav;
    return nav.filter((n) => n.label.toLowerCase().includes(q));
  }, [query]);

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  return (
    <motion.div className="admin-root flex min-h-screen bg-[#05050f] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,rgba(34,211,238,0.12),transparent),radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(192,132,252,0.14),transparent)]" />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(100%,280px)] flex-col border-r border-white/[0.08] bg-[#080812]/95 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-xs font-bold text-cyan-300">
              AI
            </span>
            <motion.div>
              <p className="text-sm font-semibold text-white">SEGMENT</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Control Center</p>
            </motion.div>
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-white/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-white/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules…"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
          {filteredNav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${active ? "border border-cyan-400/25 bg-cyan-400/10 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]" : "text-white/55 hover:bg-white/[0.04] hover:text-white"}`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-cyan-300" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] p-4">
          <p className="truncate text-xs text-white/40">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white/70 transition-colors hover:border-red-400/30 hover:text-red-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close overlay"
        />
      )}

      <div className="relative flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-[#05050f]/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            className="rounded-xl border border-white/10 p-2 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-widest text-white/35">Live sync enabled</p>
            <p className="text-sm text-white/70">Changes update the public site instantly</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:border-cyan-400/30 hover:text-white sm:inline-flex"
            >
              View site ↗
            </Link>
            <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Realtime
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
}
