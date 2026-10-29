"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import type { StagesCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { fill } from "@/lib/template";

/* Modules in the new system at each stage: today none, then two per stage, the target has all six. */
const MOVED = [0, 2, 4, 6];
const STEP_MS = 3200;

/*
  App modernization: the strangler pattern as an interactive pair of panels (references: the modular synth panel and
  the "Modular Project" posters, design-system/elaniin-2027/brief.md). The current system is a dark module panel, the
  new one a white panel; picking a stage moves its modules across (shared layout animation) while the "operations
  online" pill never goes off. The stages play on their own while on screen (the page's living loop) until the visitor
  picks one or pauses; under reduced motion it rests on the target and moves without animation.
*/
export function MigrationStages({ copy }: { copy: StagesCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = !!useReducedMotion();
  const [stage, setStage] = useState(reduce ? 3 : 0);
  const [playing, setPlaying] = useState(!reduce);

  useEffect(() => {
    if (!playing || reduce || !inView) return;
    const id = setInterval(() => setStage((s) => (s + 1) % MOVED.length), STEP_MS);
    return () => clearInterval(id);
  }, [playing, reduce, inView]);

  const moved = MOVED[stage];
  const total = copy.modules.length;
  const layout = { duration: reduce ? 0 : duration.reveal + 0.1, ease: ease.emphasized };

  const tile = (name: string, dark: boolean) => (
    <motion.li
      key={name}
      layoutId={`module-${name}`}
      transition={{ layout }}
      className={cn(
        "flex min-h-14 min-w-0 items-center gap-3 rounded-tag border px-3 py-2 text-body-sm font-medium sm:px-4",
        dark ? "border-border-on-dark bg-white/5 text-text-on-dark" : "border-border-default bg-white text-text-primary shadow-card-rest",
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", dark ? "bg-text-on-dark-muted" : "bg-elevate-blue")} />
      <span className="min-w-0 break-words">{name}</span>
    </motion.li>
  );

  return (
    <section aria-labelledby="stages-title" className="bg-white">
      <div className="container-site py-[var(--section-y)]">
        <SectionHead id="stages-title" title={copy.title} lead={copy.lead} />

        <div ref={ref} className="mt-12">
          {/* Stage picker: a segmented control plus play / pause. */}
          <div className="flex flex-wrap items-center gap-3">
            <div role="group" aria-label={copy.stepsLabel} className="flex rounded-button border border-border-default bg-surface-subtle p-1">
              {copy.steps.map((step, i) => (
                <button
                  key={step}
                  type="button"
                  aria-pressed={stage === i}
                  onClick={() => {
                    setStage(i);
                    setPlaying(false);
                  }}
                  className={cn(
                    "h-11 rounded-tag px-4 text-body-sm font-medium transition-colors duration-150 ease-standard focus-ring",
                    stage === i ? "bg-white text-text-primary shadow-card-rest" : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {step}
                </button>
              ))}
            </div>
            {!reduce && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? copy.pause : copy.play}
                className="grid size-11 place-items-center rounded-full border border-border-default text-text-primary transition-colors duration-150 ease-standard hover:border-border-strong focus-ring"
              >
                {playing ? <Pause className="size-4" strokeWidth={1.5} /> : <Play className="size-4" strokeWidth={1.5} />}
              </button>
            )}
          </div>

          <LayoutGroup>
            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
              {/* Current system: the dark module panel. */}
              <div
                className={cn(
                  "flex min-h-72 flex-col rounded-card bg-surface-dark pad-card transition-opacity duration-300 ease-standard",
                  moved === total && "opacity-60",
                )}
              >
                <p className="font-display text-body-lg font-medium text-text-on-dark">{copy.current}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">{copy.modules.slice(moved).map((m) => tile(m, true))}</ul>
                {moved === total && <p className="mt-auto pt-6 text-body-sm text-text-on-dark-secondary">{copy.retired}</p>}
              </div>

              {/* The bridge between both: traffic keeps flowing while the modules move. */}
              <div className="flex items-center justify-center gap-3 lg:flex-col">
                <span className="h-px w-10 bg-border-strong lg:h-16 lg:w-px" aria-hidden="true" />
                <span className="inline-flex items-center gap-2 rounded-tag border border-border-default bg-white px-3 py-2 text-caption font-medium whitespace-nowrap text-text-secondary">
                  <ArrowRight className="size-3.5 text-elevate-blue" strokeWidth={1.5} aria-hidden="true" />
                  {copy.bridge}
                </span>
                <span className="h-px w-10 bg-border-strong lg:h-16 lg:w-px" aria-hidden="true" />
              </div>

              {/* New system: the white panel that fills up. */}
              <div className="flex min-h-72 flex-col rounded-card border border-border-default bg-surface-subtle pad-card">
                <p className="font-display text-body-lg font-medium text-text-primary">{copy.next}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">{copy.modules.slice(0, moved).map((m) => tile(m, false))}</ul>
              </div>
            </div>
          </LayoutGroup>

          {/* Status strip: operations never go off; the count follows the stage. */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-card border border-border-default px-6 py-4">
            <span className="inline-flex h-7 items-center gap-2 rounded-tag border border-success-border bg-success-bg px-3 text-caption font-medium text-success-text">
              <span className="size-2 rounded-full bg-success-dot" aria-hidden="true" />
              {copy.online}
            </span>
            <p aria-live="polite" className="text-body-sm text-text-secondary tabular-nums">
              {fill(copy.migrated, { n: moved, total })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
