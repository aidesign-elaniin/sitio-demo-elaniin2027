"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/*
  Timeline clock for product scenes. `t` is the elapsed time (ms) inside a loop of `periodMs`; the scene derives
  every state from it (what is typed, which step is done, which screen shows). It only runs while the scene is
  on screen. Under prefers-reduced-motion `t` stays at the end of the loop: the finished, meaningful state.
*/
export function useClock(periodMs: number, tickMs = 50) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = !!useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setT((v) => (v + tickMs) % periodMs), tickMs);
    return () => clearInterval(id);
  }, [inView, reduce, periodMs, tickMs]);

  return { ref, t: reduce ? periodMs - 1 : t };
}
