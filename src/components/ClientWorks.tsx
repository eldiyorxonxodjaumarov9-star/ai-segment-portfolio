"use client";

import { motion } from "framer-motion";
import { clientWorks } from "@/data/content";
import { BeforeAfterCard } from "./BeforeAfterCard";

export function ClientWorks() {
  return (
    <section id="works" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-violet-300/80">03 — Zakazlar</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Eng viral zakaz videolar
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/50">
            Before / After, mijoz nomi va natija statistikasi — silliq scroll animatsiyasi bilan.
          </p>
        </div>

        <div className="flex flex-col gap-14 lg:gap-20">
          {clientWorks.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ delay: i * 0.05, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-8 lg:grid-cols-2"
            >
              <BeforeAfterCard beforeSeed={c.beforeSeed} afterSeed={c.afterSeed} client={c.client} />
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">{c.client}</h3>
                <p className="text-sm leading-relaxed text-white/55">{c.caption}</p>
                <div className="grid grid-cols-3 gap-3">
                  {c.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-center shadow-[0_0_40px_rgba(168,85,247,0.06)] backdrop-blur-xl"
                    >
                      <p className="text-lg font-semibold text-white">{s.value}</p>
                      <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-white/45">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
