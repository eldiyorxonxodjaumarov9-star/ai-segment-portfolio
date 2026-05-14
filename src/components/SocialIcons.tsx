"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const rel = "noopener noreferrer";

type LinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
  /** Header pill — tight padding */
  variant?: "header" | "inline";
};

export function AnimatedSocialLink({ href, label, children, variant = "header" }: LinkProps) {
  const pad = variant === "header" ? "p-2" : "p-2.5";
  return (
    <motion.a
      href={href}
      target="_blank"
      rel={rel}
      aria-label={label}
      whileHover={{ scale: 1.14, y: -3 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 440, damping: 17 }}
      className={`group relative inline-flex items-center justify-center rounded-full ${pad} outline-none ring-offset-2 ring-offset-[#030308] focus-visible:ring-2 focus-visible:ring-cyan-400/60`}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/25 via-fuchsia-500/15 to-violet-500/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-full border border-white/0 transition-all duration-300 group-hover:border-cyan-400/35 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.35)]"
        aria-hidden
      />
      <span className="relative z-[1] transition-transform duration-300 group-hover:[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.35))]">
        {children}
      </span>
    </motion.a>
  );
}

/** Telegram — rasmiy mark (Simple Icons / brand shape) */
export function IconTelegramOfficial({ className = "h-[22px] w-[22px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden role="img">
      <path
        fill="#26A5E4"
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
      />
    </svg>
  );
}

/** Instagram — rasmiy gradient (glyph) */
export function IconInstagramOfficial({ className = "h-[22px] w-[22px]" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gid = `ig-${uid}`;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden role="img">
      <defs>
        <linearGradient id={gid} x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDC80" />
          <stop offset="0.2" stopColor="#F77737" />
          <stop offset="0.45" stopColor="#E1306C" />
          <stop offset="0.7" stopColor="#C13584" />
          <stop offset="1" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gid})`}
        d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.236-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.07 4.859-.07zm0 3.078c-3.51 0-6.36 2.85-6.36 6.36s2.85 6.36 6.36 6.36 6.36-2.85 6.36-6.36-2.85-6.36-6.36-6.36zm0 10.44c-2.277 0-4.123-1.846-4.123-4.123S9.723 7.877 12 7.877s4.123 1.847 4.123 4.123-1.846 4.123-4.123 4.123zm7.071-10.89c0 .816-.662 1.478-1.479 1.478s-1.479-.662-1.479-1.479.662-1.479 1.479-1.479 1.479.663 1.479 1.479z"
      />
    </svg>
  );
}

/** YouTube — rasmiy qizil play mark */
export function IconYoutubeOfficial({ className = "h-[22px] w-[22px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}
