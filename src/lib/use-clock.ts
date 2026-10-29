"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/*
  Timeline clock for product scenes. `t` is the elapsed time (ms) inside a loop of `periodMs`; the scene derives
  every state from it (what is typed, which step is done, which screen shows). It only runs while the scene is
  on screen and `enabled` (a scene in a card that is closed pauses). Under prefers-reduced-motion `t` stays at `restMs` (the end of the loop unless a scene says otherwise): the finished, meaningful state.
*/
export function useClock(periodMs: number, tickMs = 50, restMs = periodMs - 1, enabled = true) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = !!useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce || !inView || !enabled) return;
    const id = setInterval(() => setT((v) => (v + tickMs) % periodMs), tickMs);
    return () => clearInterval(id);
  }, [inView, reduce, enabled, periodMs, tickMs]);

  return { ref, t: reduce ? restMs : t };
}
