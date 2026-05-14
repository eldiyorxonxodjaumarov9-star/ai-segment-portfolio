"use client";

import { useEffect, useState } from "react";

export function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setReady(true);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!ready) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-screen"
      aria-hidden
    >
      <div
        className="absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),rgba(168,85,247,0.06)_40%,transparent_68%)] blur-2xl transition-transform duration-100 ease-out"
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
}
