"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  beforeSeed: string;
  afterSeed: string;
  client: string;
};

export function BeforeAfterCard({ beforeSeed, afterSeed, client }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(52);

  const update = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    setPct(Math.min(96, Math.max(4, x)));
  }, []);

  return (
    <div
      ref={wrap}
      className="relative aspect-[16/10] cursor-ew-resize overflow-hidden rounded-2xl border border-white/10 bg-black/40"
      onMouseMove={(e) => update(e.clientX)}
      onMouseLeave={() => setPct(52)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
    >
      <Image
        src={`https://picsum.photos/seed/${afterSeed}/1000/625`}
        alt={`${client} — keyin`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src={`https://picsum.photos/seed/${beforeSeed}/1000/625`}
          alt={`${client} — oldin`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover grayscale contrast-110"
        />
      </div>
      <div
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_24px_rgba(255,255,255,0.65)]"
        style={{ left: `${pct}%` }}
      />
      <div
        className="absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-black/60 text-[10px] font-semibold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.35)] backdrop-blur-md"
        style={{ left: `${pct}%` }}
      >
        ||
      </div>
      <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 backdrop-blur-md">
        {client}
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 flex gap-2 text-[10px] font-medium uppercase tracking-wide text-white/55">
        <span className="rounded-md bg-black/55 px-2 py-1">Oldin</span>
        <span className="rounded-md bg-black/55 px-2 py-1">Keyin</span>
      </div>
    </div>
  );
}
