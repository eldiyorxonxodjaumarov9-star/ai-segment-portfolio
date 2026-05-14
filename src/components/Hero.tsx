"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, type CSSProperties } from "react";

const FuturisticScene = dynamic(() => import("./FuturisticScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_55%)]" />,
});

type Particle = { left: number; top: number; delay: number; duration: number };

function useHeroParticles(count: number): Particle[] {
  return useMemo(() => {
    const out: Particle[] = [];
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + i * 0.37;
      const radius = 46 + (i % 5) * 3.5;
      out.push({
        left: 50 + Math.cos(angle) * radius,
        top: 50 + Math.sin(angle) * radius,
        delay: (i * 0.17) % 2.4,
        duration: 2.6 + (i % 4) * 0.35,
      });
    }
    return out;
  }, [count]);
}

function HeroPortrait() {
  const particles = useHeroParticles(32);

  return (
    <div className="relative mx-auto flex w-full max-w-[min(100%,380px)] justify-center sm:max-w-[min(100%,440px)] lg:mx-0 lg:max-w-none lg:justify-end">
      <motion.div
        className="relative isolate w-full max-w-[min(100%,380px)] sm:max-w-[min(100%,440px)] lg:max-w-[min(100%,560px)] xl:max-w-[min(100%,600px)]"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative aspect-square w-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Ambient blend into page background */}
          <div className="pointer-events-none absolute -inset-[18%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.14),transparent_62%,#030308_88%)] blur-md" />

          {/* Outer neon rings */}
          <div
            className="pointer-events-none absolute -inset-[10%] rounded-full border border-cyan-400/15 shadow-[0_0_60px_rgba(34,211,238,0.12),inset_0_0_40px_rgba(34,211,238,0.06)] animate-hero-ring-pulse"
            style={{ animationDelay: "0.4s" }}
          />
          <div className="pointer-events-none absolute -inset-[6%] rounded-full border border-cyan-300/25 shadow-[0_0_45px_rgba(34,211,238,0.35)]" />
          <div className="pointer-events-none absolute -inset-[3%] rounded-full border border-cyan-200/40 shadow-[0_0_28px_rgba(34,211,238,0.55)]" />

          {/* Particles */}
          <div className="pointer-events-none absolute inset-0 z-[5]">
            {particles.map((p, i) => (
              <span
                key={i}
                className="absolute h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_10px_#22d3ee,0_0_22px_rgba(34,211,238,0.35)] animate-hero-particle"
                style={
                  {
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    animationDelay: `${p.delay}s`,
                    ["--particle-dur" as string]: `${p.duration}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          {/* Glass / HUD chrome */}
          <div className="pointer-events-none absolute -left-1 top-[8%] z-30 w-[44%] max-w-[200px] rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-3 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:-left-2 sm:top-[10%]">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-200/80">Neural link</p>
            <div className="mt-2 h-px w-full bg-gradient-to-r from-cyan-400/50 via-cyan-200/20 to-transparent" />
            <div className="mt-2 flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] text-white/40">Latency</p>
                <p className="font-mono text-sm text-cyan-100">12ms</p>
              </div>
              <div className="h-8 w-px bg-cyan-400/20" />
              <div>
                <p className="text-[10px] text-white/40">Signal</p>
                <p className="font-mono text-sm text-emerald-200/90">OK</p>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-1 bottom-[12%] z-30 w-[52%] max-w-[220px] rounded-2xl border border-fuchsia-500/15 bg-gradient-to-tl from-white/[0.07] to-white/[0.02] p-3 shadow-[0_0_36px_rgba(217,70,239,0.08)] backdrop-blur-xl sm:-right-2 sm:bottom-[14%]">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-fuchsia-200/75">Render stack</p>
              <span className="rounded-full border border-cyan-400/25 px-2 py-0.5 text-[8px] uppercase tracking-wider text-cyan-100/80">
                Live
              </span>
            </div>
            <div className="mt-2 flex gap-1">
              {[0.35, 0.55, 0.42, 0.7, 0.5].map((h, j) => (
                <div
                  key={j}
                  className="h-10 flex-1 rounded-md border border-white/[0.06] bg-gradient-to-t from-cyan-500/25 to-transparent"
                  style={{ backgroundSize: "100% 200%", backgroundPosition: `0 ${(1 - h) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Scan line */}
          <div className="pointer-events-none absolute inset-0 z-[25] overflow-hidden rounded-full">
            <div className="absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-cyan-400/12 to-transparent animate-hero-hud-scan" />
          </div>

          {/* Holographic vector overlay */}
          <svg
            className="pointer-events-none absolute inset-[-4%] z-20 h-[108%] w-[108%] text-cyan-400/35 mix-blend-screen"
            viewBox="0 0 200 200"
            aria-hidden
          >
            <defs>
              <linearGradient id="heroHudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="78" fill="none" stroke="url(#heroHudGrad)" strokeWidth="0.4" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="4 8" opacity="0.5" />
            <path d="M100 22v12M100 166v12M22 100h12M166 100h12" stroke="currentColor" strokeWidth="0.35" opacity="0.45" />
            <path d="M40 140 L70 118 L100 128 L130 108 L160 122" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.4" />
            <rect x="128" y="44" width="36" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.35" />
            <path d="M132 52h28M132 58h18" stroke="currentColor" strokeWidth="0.25" opacity="0.35" />
          </svg>

          {/* Portrait */}
          <div className="relative z-10 mx-auto aspect-square w-[88%] overflow-hidden rounded-full bg-[#030308] shadow-[0_28px_80px_rgba(0,0,0,0.85),0_0_0_1px_rgba(34,211,238,0.35),0_0_48px_rgba(34,211,238,0.28),inset_0_0_60px_rgba(0,0,0,0.45)] ring-2 ring-cyan-400/55 ring-offset-2 ring-offset-[#030308] sm:w-[90%]">
            <Image
              src="/hero-portrait.png"
              alt="Futuristic AI portrait — cinematic neon interface"
              width={900}
              height={900}
              priority
              sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 640px) 420px, 85vw"
              className="h-full w-full object-contain object-center"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-[#030308]/50 via-transparent to-cyan-500/[0.07]" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.22),transparent),radial-gradient(ellipse_60%_40%_at_80%_40%,rgba(34,211,238,0.12),transparent)]" />
      <div className="absolute inset-0 opacity-[0.55] mix-blend-screen">
        <FuturisticScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#030308]/40 to-[#030308]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-10 sm:gap-14 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 xl:gap-14">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/25 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/90 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
            AI SEGMENT
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl text-balance font-semibold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2.1rem, 5vw, 4.25rem)" }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">
              AI CONTENT CREATOR
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
              &amp; VIDEO EDITOR
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="mt-6 max-w-2xl text-pretty text-base text-white/65 sm:text-lg"
          >
            AI yordamida kreativ video, reklama va viral kontent yarataman — Apple-grade tiniqlik va cyberpunk
            energiyasi bir joyda.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#videos"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-black"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-400 to-violet-500 transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70 bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
              <span className="relative">Portfolio ko‘rish</span>
            </Link>
            <Link
              href="#about"
              className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur-xl transition-colors hover:border-cyan-400/35 hover:text-white"
            >
              Men haqimda
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-16 grid max-w-xl grid-cols-3 gap-4 text-xs text-white/45"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">Signal</p>
              <p className="mt-1 text-sm text-white/80">Generativ + real</p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-widest text-fuchsia-300/80">Motion</p>
              <p className="mt-1 text-sm text-white/80">HUD / neon UI</p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-widest text-violet-300/80">Grade</p>
              <p className="mt-1 text-sm text-white/80">Cinematic finish</p>
            </div>
          </motion.div>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-6">
          <HeroPortrait />
        </div>
      </div>
    </section>
  );
}
