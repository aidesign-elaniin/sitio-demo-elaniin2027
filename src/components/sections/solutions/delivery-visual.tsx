"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { StatusBadge } from "@/components/ui/status-badge";
import type { DeliveryVisualCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { blue } from "@/lib/tokens";
import { VisualPanel, type VisualSize } from "./visual-panel";

/* Software card: a delivery pipeline that completes step by step, then loops while it is in view. */
type StepState = "idle" | "active" | "done";

function StepIcon({ state }: { state: StepState }) {
  return (
    <span className="relative grid size-5 shrink-0 place-items-center">
      <span
        className={cn(
          "absolute inset-0 rounded-full border transition-colors duration-200 ease-standard",
          state === "done" ? "border-success-dot bg-success-dot" : "border-border-strong bg-white",
        )}
      />
      {state === "active" && (
        <motion.svg
          viewBox="0 0 20 20"
          className="absolute inset-0 size-5"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 0.9 }}
        >
          <path d="M10 1.5a8.5 8.5 0 0 1 8.5 8.5" fill="none" stroke={blue[500]} strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      )}
      {state === "done" && (
        <svg viewBox="0 0 20 20" className="relative size-5">
          <motion.path
            d="M6 10.5l2.8 2.8L14 7.8"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: duration.slow, ease: ease.emphasized }}
          />
        </svg>
      )}
    </span>
  );
}

export function DeliveryVisual({ copy, size = "card", bare = false }: { copy: DeliveryVisualCopy; size?: VisualSize; bare?: boolean }) {
  const steps = copy.steps;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setStep(n);
      if (n < steps.length) {
        n += 1;
        timer = setTimeout(tick, 900);
      } else {
        n = 0;
        timer = setTimeout(tick, 2800); // hold the finished state, then restart
      }
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [inView, reduce, steps.length]);

  const done = reduce ? steps.length : step;
  const finished = done >= steps.length;

  return (
    <VisualPanel size={size} bare={bare}>
      <div ref={ref} className="w-full max-w-sm rounded-menu border border-border-default bg-white p-4 shadow-card-rest">
        <div className="flex items-center justify-between gap-3">
          <span className="font-text text-caption font-medium whitespace-nowrap text-text-secondary">PR #142</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={finished ? "ok" : "run"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: duration.fast, ease: ease.standard }}
            >
              <StatusBadge variant={finished ? "success" : "info"}>{finished ? copy.status.done : copy.status.running}</StatusBadge>
            </motion.span>
          </AnimatePresence>
        </div>

        <ul className="mt-3 flex flex-col">
          {steps.map((s, i) => {
            const state: StepState = i < done ? "done" : i === done ? "active" : "idle";
            return (
              <li key={s.label} className="flex items-center gap-3 border-t border-border-default py-2.5 first:border-t-0">
                <StepIcon state={state} />
                <span className={cn("flex-1 text-body-sm transition-colors duration-200 ease-standard", state === "idle" ? "text-text-muted" : "text-text-primary")}>
                  {s.label}
                </span>
                <span className="font-text text-caption whitespace-nowrap text-text-muted tabular-nums">{s.meta}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-subtle">
          <motion.div
            className="h-full bg-elevate-blue"
            animate={{ width: `${(done / steps.length) * 100}%` }}
            transition={{ duration: duration.reveal, ease: ease.emphasized }}
          />
        </div>
      </div>
    </VisualPanel>
  );
}
