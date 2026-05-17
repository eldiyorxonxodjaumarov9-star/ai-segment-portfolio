"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { formatCompact } from "@/lib/format";

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-7-4.35-9-9.2C.8 8.75 2.6 5 6.3 5c1.9 0 3.6 1 4.7 2.5C12.1 6 13.8 5 15.7 5 19.4 5 21.2 8.75 21 11.8 19 16.65 12 21 12 21Z" />
    </svg>
  );
}

export function CommentsSection() {
  const { content } = useSiteContent();

  const videoComments = useMemo(() => {
    const visible = content.comments.filter((c) => !c.spam);
    const byVideo = new Map<string, typeof visible>();
    for (const c of visible) {
      const list = byVideo.get(c.videoId) ?? [];
      list.push(c);
      byVideo.set(c.videoId, list);
    }
    return Array.from(byVideo.entries()).map(([videoId, comments]) => ({
      videoId,
      videoTitle: comments[0]?.videoTitle ?? "Video",
      comments: [...comments].sort((a, b) => Number(b.pinned) - Number(a.pinned)),
    }));
  }, [content.comments]);

  return (
    <section id="comments" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-fuchsia-300/80">05 — Jamoa ovozi</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Izohlar</h2>
          </div>
          <p className="max-w-md text-sm text-white/50">
            Ijtimoiy tarmoq uslubidagi thread — avatar, username, like va vaqt belgisi.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {videoComments.map((block, bi) => (
            <motion.div
              key={block.videoId}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: bi * 0.05, duration: 0.55 }}
              className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-black/30 px-4 py-3 sm:px-5">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-white/40">Video</p>
                  <p className="text-sm font-medium text-white">{block.videoTitle}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/55">
                  public
                </span>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {block.comments.map((c) => (
                  <div key={c.id} className={`flex gap-3 px-4 py-4 sm:px-5 ${c.pinned ? "bg-cyan-400/[0.04]" : ""}`}>
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10">
                      <Image
                        src={c.avatarUrl || `https://picsum.photos/seed/${c.avatarSeed}/96/96`}
                        alt={c.user}
                        fill
                        unoptimized={Boolean(c.avatarUrl)}
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold text-white">{c.user}</span>
                        {c.pinned && (
                          <span className="rounded-full border border-cyan-400/30 px-1.5 text-[9px] uppercase text-cyan-200">
                            pinned
                          </span>
                        )}
                        <span className="text-[11px] text-white/40">{c.time}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-white/70">{c.text}</p>
                      <div className="mt-2 flex items-center gap-4 text-[11px] text-white/45">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          <HeartIcon />
                          <span>{formatCompact(c.likes)}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
