"use client";

import { motion } from "framer-motion";

const skills = [
  "AI tools",
  "Video editing",
  "Motion design",
  "Branding",
  "Content strategy",
  "Color science",
  "Sound design",
  "Viral packaging",
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">06 — Bio</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-4xl">Men haqimda</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
              Men AI SEGMENT orqali generativ vizual, sinematograf montaj va motion-first storytellingni bir
              zanjirga ulayman. Maqsad — investor va mijoz ekranida bir zumda “premium startup” hissini uyg‘otish.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
              Har bir loyiha uchun texnik stack, brend xavfsizligi va platforma algoritmlariga mos struktura
              tanlanadi — g‘alati effektlar emas, natija va retention ustuvor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_0_70px_rgba(168,85,247,0.12)] backdrop-blur-2xl sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_160deg_at_50%_50%,rgba(34,211,238,0.12),transparent_40%,rgba(192,132,252,0.16),transparent_75%)]" />
            <p className="relative text-sm font-medium uppercase tracking-[0.25em] text-white/45">Skill matrix</p>
            <div className="relative mt-5 flex flex-wrap gap-2">
              {skills.map((sk, i) => (
                <motion.span
                  key={sk}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs font-medium text-white/80 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                >
                  {sk}
                </motion.span>
              ))}
            </div>
            <div className="relative mt-8 grid grid-cols-2 gap-3 text-xs text-white/50">
              <div className="rounded-2xl border border-white/[0.06] bg-black/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">Focus</p>
                <p className="mt-2 text-sm text-white/80">AI + kino montaj</p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-black/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-fuchsia-300/80">Vibe</p>
                <p className="mt-2 text-sm text-white/80">Apple × Cyberpunk</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
