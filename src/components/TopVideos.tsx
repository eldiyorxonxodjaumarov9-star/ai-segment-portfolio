"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { topVideos } from "@/data/content";
import { formatCompact, formatFull } from "@/lib/format";

export function TopVideos() {
  return (
    <section id="videos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-fuchsia-300/80">02 — Top</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Eng ko‘p ko‘rilgan videolar</h2>
          </div>
          <p className="max-w-md text-sm text-white/50">
            Thumbnail, statistikalar va qisqa tavsif — hoverda “live preview” uslubidagi animatsiya.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {topVideos.map((v, idx) => (
            <motion.article
              key={v.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: idx * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${v.thumbSeed}/960/540`}
                  alt={v.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  priority={idx < 2}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-cyan-500/10 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_3px,transparent_6px)] animate-[scan_2.8s_linear_infinite]" />
                </motion.div>
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]" />
                  TOP
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/40 shadow-[0_0_40px_rgba(34,211,238,0.35)] backdrop-blur-md">
                    <span className="ml-1 inline-block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-100">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{v.description}</p>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-wide text-white/45">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
                    {formatFull(v.views)} ko‘rish
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
                    {formatCompact(v.likes)} like
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
                    {v.uploadedAt}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
