"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/*
  "Capacity 100x" as a picture: a 10 x 10 grid of modules where one dark square is the team; once on screen the
  other 99 light up after it, row by row, and the caption switches from "one team" to "the same team with AI".
  Hovering the grid replays it. Under reduced motion it shows the full grid. Decorative except the caption.
*/
export function CapacityGrid({ one, many }: { one: string; many: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = !!useReducedMotion();
  const full = inView || reduce;

  return (
    <div ref={ref} className="group/cap flex flex-col gap-3">
      <div aria-hidden="true" className="grid w-fit grid-cols-10 gap-1.5">
        {Array.from({ length: 100 }, (_, i) => (
          <span
            key={i}
            style={{ transitionDelay: full && !reduce ? `${120 + i * 9}ms` : "0ms" }}
            className={cn(
              "size-2.5 transition-colors duration-200 motion-reduce:transition-none",
              i === 0 ? "bg-elevate-blue" : full ? "bg-surface-dark" : "bg-border-default",
            )}
          />
        ))}
      </div>
      <p className="text-caption text-text-muted" aria-live="polite">
        {full ? many : one}
      </p>
    </div>
  );
}
