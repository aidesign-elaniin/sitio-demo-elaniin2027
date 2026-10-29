"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/ui/count-up";
import { StatusBadge } from "@/components/ui/status-badge";
import type { CloudVisualCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { ease } from "@/lib/motion";
import { blue, neutral } from "@/lib/tokens";
import { VisualPanel, type VisualSize } from "./visual-panel";

/*
  Cloud card: a grid of square modules (the brand's building block) standing for traffic across regions.
  Cells light up and fade in discrete steps up the blue ramp; three fixed squares mark active regions. The rings of the
  regions loop without depending on visibility (a restart on every scroll made them pop).
*/
const COLS = 12;
const ROWS = 5;
const N = COLS * ROWS;
const REGIONS = new Set([1 * COLS + 2, 3 * COLS + 6, 1 * COLS + 9]);

const stepColor = (v: number) =>
  v >= 0.66 ? blue[500] : v >= 0.33 ? blue[400] : v >= 0.08 ? blue[300] : neutral.border;

// Deterministic start (also the static state for reduced motion): same on server and client.
const initial = () => Array.from({ length: N }, (_, i) => (i % 13 === 0 ? 1 : i % 11 === 0 ? 0.5 : 0));

export function CloudVisual({
  copy,
  lang,
  size = "card",
  bare = false,
}: {
  copy: CloudVisualCopy;
  lang: Lang;
  size?: VisualSize;
  bare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // "some": the grid keeps running while any part of it is on screen (with 0.5 it froze half visible while scrolling).
  const inView = useInView(ref, { amount: "some" });
  const reduce = useReducedMotion();
  const [lit, setLit] = useState<number[]>(initial);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => {
      setLit((prev) => {
        const next = prev.map((v) => (v * 0.62 < 0.08 ? 0 : v * 0.62));
        for (let k = 0; k < 3; k++) next[Math.floor(Math.random() * N)] = 1;
        return next;
      });
    }, 140);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <VisualPanel size={size} bare={bare} className="gap-4">
      <div ref={ref} className="grid w-full max-w-sm grid-cols-12 gap-1">
        {lit.map((v, i) => {
          const region = REGIONS.has(i);
          return (
            <div
              key={i}
              className="relative aspect-square rounded-module transition-colors duration-150 ease-standard"
              style={{ backgroundColor: region ? blue[500] : stepColor(v) }}
            >
              {region && !reduce && (
                <motion.span
                  className="absolute inset-0 rounded-module border border-elevate-blue"
                  animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: ease.standard, delay: (i % 3) * 0.5 }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex w-full max-w-sm items-end justify-between rounded-menu border border-border-default bg-white p-3 shadow-card-rest">
        <div className="flex flex-col gap-1">
          <span className="font-text text-caption leading-none font-medium text-text-secondary">{copy.availability}</span>
          <span className="font-display text-h3 font-medium text-text-primary tabular-nums">
            <CountUp to={99.98} decimals={2} suffix="%" lang={lang} />
          </span>
        </div>
        <StatusBadge variant="success">{copy.regions}</StatusBadge>
      </div>
    </VisualPanel>
  );
}
