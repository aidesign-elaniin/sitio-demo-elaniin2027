"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/* Global motion policy: honor prefers-reduced-motion everywhere (transforms off, opacity kept). */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
