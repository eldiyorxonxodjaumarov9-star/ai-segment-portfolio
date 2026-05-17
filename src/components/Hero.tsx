"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, type CSSProperties } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const FuturisticScene = dynamic(() => import("./FuturisticScene"), {
  ssr: false,
  loading: () => <motion.div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_55%)]" />,
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

const accentClass = {
  cyan: "text-cyan-300/80",
  fuchsia: "text-fuchsia-300/80",
  violet: "text-violet-300/80",
};

function HeroPortrait({
  portraitUrl,
  particlesOn,
  floatingOn,
  scanLineOn,
  primaryColor,
}: {
  portraitUrl: string;
  particlesOn: boolean;
  floatingOn: boolean;
  scanLineOn: boolean;
  primaryColor: string;
}) {
  const particles = useHeroParticles(particlesOn ? 32 : 0);

  const portrait = (
    <motion.div
      className="relative aspect-square w-full"
      animate={floatingOn ? { y: [0, -10, 0] } : undefined}
      transition={floatingOn ? { duration: 6.5, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      <div
        className="pointer-events-none absolute -inset-[18%] rounded-full blur-md"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${primaryColor}24, transparent 62%, #030308 88%)`,
        }}
      />
      {particlesOn &&
        particles.map((p, i) => (
          <span
            key={i}
            className="pointer-events-none absolute h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-hero-particle"
            style={
              {
                left: `${p.left}%`,
                top: `${p.top}%`,
                background: primaryColor,
                boxShadow: `0 0 10px ${primaryColor}`,
                animationDelay: `${p.delay}s`,
                ["--particle-dur" as string]: `${p.duration}s`,
              } as CSSProperties
            }
          />
        ))}
      {scanLineOn && (
        <div className="pointer-events-none absolute inset-0 z-[25] overflow-hidden rounded-full">
          <div className="absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-cyan-400/12 to-transparent animate-hero-hud-scan" />
        </div>
      )}
      <div
        className="relative z-10 mx-auto aspect-square w-[88%] overflow-hidden rounded-full bg-[#030308] ring-2 ring-offset-2 ring-offset-[#030308] sm:w-[90%]"
        style={{
          boxShadow: `0 28px 80px rgba(0,0,0,0.85), 0 0 0 1px ${primaryColor}59, 0 0 48px ${primaryColor}47`,
          borderColor: `${primaryColor}8c`,
        }}
      >
        <Image
          src={portraitUrl}
          alt="AI SEGMENT portrait"
          width={900}
          height={900}
          priority
          unoptimized={portraitUrl.startsWith("http")}
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 640px) 420px, 85vw"
          className="h-full w-full object-contain object-center"
        />
      </div>
    </motion.div>
  );

  return (
    <div className="relative mx-auto flex w-full max-w-[min(100%,380px)] justify-center sm:max-w-[min(100%,440px)] lg:mx-0 lg:max-w-none lg:justify-end">
      <motion.div
        className="relative isolate w-full max-w-[min(100%,380px)] sm:max-w-[min(100%,440px)] lg:max-w-[min(100%,560px)] xl:max-w-[min(100%,600px)]"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {portrait}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { content } = useSiteContent();
  const hero = content.config.hero;
  const theme = content.config.theme;
  const animations = hero.animationsEnabled && theme.animationsEnabled;
  const primary = hero.neonColors.primary;

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.gradientOverlay }}
      />
      {hero.effects.scene3d && (
        <div className="absolute inset-0 opacity-[0.55] mix-blend-screen">
          <FuturisticScene />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#030308]/40 to-[#030308]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-10 sm:gap-14 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 xl:gap-14">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.p
            initial={animations ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] backdrop-blur-xl"
            style={{ borderColor: `${primary}40`, color: primary, boxShadow: `0 0 30px ${primary}1f` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: primary, boxShadow: `0 0 12px ${primary}` }} />
            {hero.badge}
          </motion.p>

          <motion.h1
            initial={animations ? { opacity: 0, y: 22 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl text-balance font-semibold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2.1rem, 5vw, 4.25rem)" }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">
              {hero.titleLine1}
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${hero.neonColors.primary}, ${hero.neonColors.accent}, ${hero.neonColors.secondary})`,
              }}
            >
              {hero.titleLine2}
            </span>
          </motion.h1>

          <motion.p
            initial={animations ? { opacity: 0, y: 18 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="mt-6 max-w-2xl text-pretty text-base text-white/65 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={animations ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href={hero.primaryButton.href}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-black"
            >
              <span
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: `linear-gradient(to right, ${hero.neonColors.primary}, ${hero.neonColors.secondary})`,
                }}
              />
              <span className="relative">{hero.primaryButton.label}</span>
            </Link>
            <Link
              href={hero.secondaryButton.href}
              className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur-xl transition-colors hover:text-white"
            >
              {hero.secondaryButton.label}
            </Link>
          </motion.div>

          <motion.div
            initial={animations ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-16 grid max-w-xl grid-cols-3 gap-4 text-xs text-white/45"
          >
            {hero.hudCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-xl">
                <p className={`font-mono text-[10px] uppercase tracking-widest ${accentClass[card.accent]}`}>
                  {card.label}
                </p>
                <p className="mt-1 text-sm text-white/80">{card.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-6">
          <HeroPortrait
            portraitUrl={hero.portraitUrl}
            particlesOn={hero.effects.particles}
            floatingOn={hero.effects.floatingPortrait}
            scanLineOn={hero.effects.scanLine}
            primaryColor={primary}
          />
        </div>
      </div>
    </section>
  );
}
