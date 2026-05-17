"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import Image from "next/image";

export function BrandsSection() {
  const { content } = useSiteContent();
  const brands = [...content.brands].sort((a, b) => a.order - b.order);
  const row = [...brands, ...brands, ...brands];

  return (
    <section id="brands" className="relative border-y border-white/[0.06] bg-[#04040c]/80 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.04),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">01 — Brendlar</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Ishlangan brendlar</h2>
          </div>
          <p className="max-w-md text-sm text-white/50">
            Premium showcase — neon glass hover, seamless carousel.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] py-6 shadow-[0_0_60px_rgba(168,85,247,0.08)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#04040c] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#04040c] to-transparent" />

          <motion.div
            className="flex w-max gap-6 px-6"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
          >
            {row.map((b, i) => (
              <motion.div
                key={`${b.name}-${i}`}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                className="group relative flex h-24 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${b.tone} opacity-40 transition-opacity duration-500 group-hover:opacity-80`}
                />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_0%,rgba(34,211,238,0.35),transparent_55%)]" />
                {b.logoUrl ? (
                  <Image src={b.logoUrl} alt={b.name} width={80} height={40} className="relative z-[1] object-contain" unoptimized />
                ) : (
                  <span className="relative z-[1] text-sm font-semibold tracking-[0.2em] text-white/90">
                    {b.name}
                  </span>
                )}
                <span className="pointer-events-none absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-widest text-white/35">
                  partner
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
