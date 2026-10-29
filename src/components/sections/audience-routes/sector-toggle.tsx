"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import type { Sector } from "./audience-routes-data";

/*
  The sector toggle (DESIGN.md components.audience-routes.sector-toggle): a pill of two buttons; the selected one is Excellence
  Blue and slides to the other. Two buttons with aria-pressed inside a labelled group.
*/
const SECTORS: Sector[] = ["private", "public"];

export function SectorToggle({
  value,
  onChange,
  labels,
}: {
  value: Sector;
  onChange: (sector: Sector) => void;
  labels: { label: string; private: string; public: string };
}) {
  return (
    <div
      role="group"
      aria-label={labels.label}
      className="inline-flex w-fit rounded-full border border-border-default bg-white/80 p-1 backdrop-blur-sm"
    >
      {SECTORS.map((sector) => {
        const selected = value === sector;
        return (
          <button
            key={sector}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(sector)}
            className={cn(
              "relative h-10 rounded-full px-5 font-display text-button font-medium whitespace-nowrap transition-colors duration-150 ease-standard focus-ring",
              selected
                ? "text-text-on-dark"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            {selected && (
              <motion.span
                layoutId="sector-pill"
                className="absolute inset-0 rounded-full bg-excellence-blue"
                transition={{ duration: duration.base, ease: ease.emphasized }}
              />
            )}
            <span className="relative">{labels[sector]}</span>
          </button>
        );
      })}
    </div>
  );
}
