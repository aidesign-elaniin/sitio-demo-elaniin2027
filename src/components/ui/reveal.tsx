"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

/* Scroll reveal (once): fade + 16px rise. Reduced motion keeps the fade only (MotionConfig in Providers). */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: duration.reveal, ease: ease.emphasized, delay }}
    >
      {children}
    </motion.div>
  );
}
