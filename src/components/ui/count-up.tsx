"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { formatNumber } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { ease } from "@/lib/motion";

/*
  Counts from 0 to `to` the FIRST time it is on screen, and only then: leaving and re-entering the viewport must not
  send the number back to 0 (it did, and it read as a stutter). Under prefers-reduced-motion it shows the final value.
  `replayKey` restarts the count (used by looping mocks).
*/
export function CountUp({
  lang,
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  replayKey = 0,
}: {
  /** Language of the page: the number is formatted with Intl (decimal separator). */
  lang: Lang;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  replayKey?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration, ease: ease.emphasized, onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, to, duration, replayKey]);

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(lang, reduce ? to : value, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
