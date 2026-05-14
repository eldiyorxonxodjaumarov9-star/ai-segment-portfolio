"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
};

export function AnimatedCounter({ value, suffix = "", prefix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 48, damping: 22, mass: 0.45 });
  const [text, setText] = useState("0");

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useMotionValueEvent(spring, "change", (latest) => {
    setText(Math.round(latest).toLocaleString("uz-UZ"));
  });

  return (
    <span ref={ref} className="tabular-nums tracking-tight">
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
