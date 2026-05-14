"use client";

import { motion } from "framer-motion";

type LogoProps = {
  className?: string;
  intro?: boolean;
};

export function Logo({ className = "", intro = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        initial={intro ? { scale: 0.6, opacity: 0, rotate: -8 } : false}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative h-10 w-10 shrink-0"
      >
        <svg viewBox="0 0 40 40" className="h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="lg-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="10"
            fill="none"
            stroke="url(#lg-cyan)"
            strokeWidth="1.5"
            strokeDasharray={168}
            filter="url(#glow)"
            initial={{ strokeDashoffset: 168, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={{ duration: 1.15, ease: "easeInOut" }}
          />
          <motion.path
            d="M11 26 L19 14 L27 26"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          />
          <motion.circle
            cx="29"
            cy="13"
            r="3"
            fill="#a855f7"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 400, damping: 15 }}
          />
        </svg>
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-cyan-400/15 blur-xl" />
      </motion.div>
      <div className="leading-none">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
          AI
        </span>
        <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
          SEGMENT
        </span>
      </div>
    </div>
  );
}
