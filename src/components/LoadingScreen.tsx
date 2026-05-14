"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020208]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_55%),radial-gradient(ellipse_at_70%_20%,rgba(168,85,247,0.15),transparent_45%)]" />
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <Logo intro />
        <div className="h-px w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full w-1/3 bg-gradient-to-r from-cyan-400 to-violet-500"
            initial={{ x: "-120%" }}
            animate={{ x: "320%" }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-white/40">cinematic load</p>
      </motion.div>
    </motion.div>
  );
}
