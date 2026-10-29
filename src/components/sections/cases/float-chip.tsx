"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/* Small floating pill that overlaps a mock to add depth. Floats gently while on screen; still under reduced motion. */
export function FloatChip({
  icon: Icon,
  children,
  className,
  delay = 0,
}: {
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute z-10 flex items-center gap-2 rounded-menu border border-border-default bg-white px-3 py-2 font-text text-body-sm font-medium whitespace-nowrap text-text-primary shadow-menu",
        className,
      )}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView || reduce ? { opacity: 1, scale: 1, y: reduce ? 0 : [0, -4, 0] } : { opacity: 0, scale: 0.92 }}
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.4, delay },
        y: { repeat: Infinity, duration: 4 + delay, ease: "easeInOut" },
      }}
    >
      <Icon className="size-4 text-elevate-blue" strokeWidth={1.5} aria-hidden="true" />
      {children}
    </motion.div>
  );
}
