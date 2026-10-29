"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { SectionHead } from "@/components/ui/section-head";
import type { PanelCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { intlLocale } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { duration, ease } from "@/lib/motion";

/* Sample panel data: 30 days of availability (one short dip), a few counters, the ticket feed loop. */
const UPTIME = Array.from({ length: 30 }, (_, i) => (i === 11 ? 0.55 : i === 23 ? 0.85 : 1));
const METRICS = [4, 37, 6];
const SEGMENTS = 40;
const TICK_MS = 1000;

/* hh:mm:ss in mono, as the readouts of the references. */
const clock = (seconds: number) =>
  [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map((n) => String(n).padStart(2, "0")).join(":");

/*
  Software support: a sample support panel on an Excellence Blue band (references: the Setio mono readout with its core
  metrics row, the Braun-like readout cards and the striped progress indicator, design-system/elaniin-2027/brief.md).
  Picking a priority starts its response clock: a large mono countdown and a striped bar of the agreed time already
  used. Below, three counters, 30 days of availability as thin bars, and a feed where tickets move from received to
  resolved. The clock and the feed run only while on screen (the page's living loop); under reduced motion they rest.
*/
export function SupportPanel({ copy, lang }: { copy: PanelCopy; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = !!useReducedMotion();
  const [priority, setPriority] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [reduce, inView]);

  // The clock starts a few minutes in, so the bar is never empty; each tick spends a tenth of a minute.
  const total = copy.priorities[priority].minutes * 60;
  const spent = Math.min(total, Math.round(total * 0.18) + tick * 6);
  const left = total - spent;
  const used = spent / total;
  const filled = Math.round(used * SEGMENTS);

  // Ticket feed: every 3 ticks one ticket moves a state forward; it loops.
  const step = Math.floor(tick / 3);
  const stateOf = (i: number) => {
    if (reduce) return [2, 1, 1, 0][i];
    const phase = (step + i * 2) % 8;
    return phase < 2 ? 0 : phase < 5 ? 1 : 2;
  };

  return (
    <section aria-labelledby="panel-title" className="bg-surface-dark text-text-on-dark">
      <div ref={ref} className="container-site py-[var(--section-y)]">
        <SectionHead id="panel-title" title={copy.title} lead={copy.lead} tone="dark" />

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-border-on-dark bg-border-on-dark lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Response clock of the selected priority. */}
          <div className="flex min-w-0 flex-col gap-8 bg-surface-dark pad-card">
            <div role="group" aria-label={copy.prioritiesLabel} className="flex w-fit rounded-button border border-border-on-dark p-1">
              {copy.priorities.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  aria-pressed={priority === i}
                  onClick={() => {
                    setPriority(i);
                    setTick(0);
                  }}
                  className={cn(
                    "h-11 rounded-tag px-4 text-body-sm font-medium transition-colors duration-150 ease-standard focus-ring-on-dark",
                    priority === i ? "bg-white text-text-primary" : "text-text-on-dark-secondary hover:text-text-on-dark",
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div>
              <p className="text-body-sm text-text-on-dark-secondary">{copy.clockLabel}</p>
              <p className="mt-2 font-mono text-display-xl font-normal tracking-tight tabular-nums" aria-live="off">
                {clock(left)}
              </p>
            </div>

            <div>
              <div aria-hidden="true" className="flex h-10 gap-1">
                {Array.from({ length: SEGMENTS }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "flex-1 transition-colors duration-300",
                      i < filled ? "bg-text-on-dark" : "bg-border-on-dark-strong",
                    )}
                  />
                ))}
              </div>
              <p className="mt-3 text-body-sm text-text-on-dark-secondary">
                <span className="font-medium text-text-on-dark tabular-nums">
                  {new Intl.NumberFormat(intlLocale(lang), { style: "percent" }).format(used)}
                </span>{" "}
                {copy.elapsed}
              </p>
            </div>
          </div>

          {/* Ticket feed: tickets move from received to resolved. */}
          <div className="min-w-0 bg-surface-dark pad-card">
            <p className="text-body-sm text-text-on-dark-secondary">{copy.feedLabel}</p>
            <ul className="mt-4 divide-y divide-border-on-dark">
              {copy.tickets.map((t, i) => {
                const s = stateOf(i);
                return (
                  <li key={t} className="flex items-center justify-between gap-4 py-3">
                    <span className="min-w-0 truncate text-body-sm text-text-on-dark">{t}</span>
                    <motion.span
                      key={s}
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: duration.slow, ease: ease.emphasized }}
                      className={cn(
                        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-tag border px-2 text-caption font-medium",
                        s === 2
                          ? "border-success-border bg-success-bg text-success-text"
                          : s === 1
                            ? "border-border-on-dark-strong text-text-on-dark"
                            : "border-border-on-dark text-text-on-dark-secondary",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn("size-1.5 rounded-full", s === 2 ? "bg-success-dot" : s === 1 ? "bg-text-on-dark-accent" : "bg-text-on-dark-muted")}
                      />
                      {copy.states[s]}
                    </motion.span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Counters and availability. */}
          <div className="grid min-w-0 grid-cols-3 gap-px bg-border-on-dark lg:col-span-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,2fr)]">
            {copy.metrics.map((m, i) => (
              <div key={m} className="flex min-w-0 flex-col gap-1 bg-surface-dark p-6">
                <span className="font-mono text-h2 tabular-nums">
                  <NumberFlow value={inView || reduce ? METRICS[i] : 0} />
                </span>
                <span className="text-caption text-text-on-dark-secondary">{m}</span>
              </div>
            ))}
            <div className="col-span-3 flex min-w-0 flex-col gap-3 bg-surface-dark p-6 lg:col-span-1">
              <span className="text-caption text-text-on-dark-secondary">{copy.uptimeLabel}</span>
              <div aria-hidden="true" className="flex h-10 items-end gap-0.5">
                {UPTIME.map((u, i) => (
                  <span
                    key={i}
                    className={cn("flex-1", u < 1 ? "bg-text-on-dark-accent" : "bg-text-on-dark-muted")}
                    style={{ height: `${u * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-caption text-text-on-dark-muted">{copy.note}</p>
      </div>
    </section>
  );
}
