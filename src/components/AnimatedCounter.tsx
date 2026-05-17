"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { formatNumber } from "@/lib/format";
import { useMounted } from "@/hooks/useMounted";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
};

export function AnimatedCounter({ value, suffix = "", prefix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const mounted = useMounted();
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 48, damping: 22, mass: 0.45 });

  const staticText = formatNumber(value);
  const [text, setText] = useState(staticText);
  const shouldAnimate = mounted && inView;

  useEffect(() => {
    setText(formatNumber(value));
    if (!shouldAnimate) {
      mv.set(0);
      return;
    }
    mv.set(value);
  }, [value, shouldAnimate, mv]);

  useMotionValueEvent(spring, "change", (latest) => {
    if (!shouldAnimate) return;
    setText(formatNumber(Math.round(latest)));
  });

  const display = shouldAnimate ? text : staticText;

  return (
    <span ref={ref} className="tabular-nums tracking-tight" suppressHydrationWarning>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
