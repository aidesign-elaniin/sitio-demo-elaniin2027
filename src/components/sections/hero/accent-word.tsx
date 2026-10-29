"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/*
  One word of the hero accent (DESIGN.md components.hero.heading.accent, v1.76.0): a gradient of the blue ramp that flows through the
  word, Elevate Blue to blue-400 and back, driven by motion back and forth. The second word is offset (start position and delay) so the
  two are never the same tone at the same time. The lightest stop is blue-400 (4.2:1 on white, display-size text). Under
  prefers-reduced-motion the word rests on plain Elevate Blue.
*/
const FLOW =
  "linear-gradient(100deg, var(--color-elevate-blue) 0%, var(--color-blue-400) 20%, var(--color-elevate-blue) 40%, var(--color-blue-400) 60%, var(--color-elevate-blue) 80%, var(--color-blue-400) 100%)";
const WINDOW = 65; // percentage points the gradient travels
const OFFSET = 35; // start offset of each following word

export function AccentWord({ word, index, className }: { word: string; index: number; className?: string }) {
  const reduce = useReducedMotion();
  const from = Math.min(100 - WINDOW, index * OFFSET);
  const start = `${from}% 0%`;
  const end = `${from + WINDOW}% 0%`;

  return (
    <motion.span
      className={cn("text-elevate-blue", className)}
      style={{
        backgroundImage: reduce ? undefined : FLOW,
        backgroundSize: "300% 100%",
        backgroundPosition: start,
        WebkitBackgroundClip: reduce ? undefined : "text",
        backgroundClip: reduce ? undefined : "text",
        WebkitTextFillColor: reduce ? undefined : "transparent",
      }}
      animate={reduce ? undefined : { backgroundPosition: [start, end] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: index * 0.5 }}
    >
      {word}
    </motion.span>
  );
}
