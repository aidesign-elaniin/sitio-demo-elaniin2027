"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Check, MessageSquare, UserCheck } from "lucide-react";
import { AiIcon } from "@/components/ui/icons/elaniin-icons";
import { SectionHead } from "@/components/ui/section-head";
import type { AppliedAiCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { fill } from "@/lib/template";

type Phase = "drafting" | "waiting" | "revising" | "approved";
const TOKEN_MS = 70;

/*
  Applied AI: the human-in-the-loop method as a playable demo (references: the highlighted-token typography and the
  blue glitch type of the board, design-system/elaniin-2027/brief.md). Three lanes: the AI writes the draft word by
  word, each new word briefly boxed like a token being generated; a person approves or asks for a change (the
  revision is written again, its new words marked); approved work drops into the "it ships" lane and its counter. The
  visitor drives it: pick a task, approve, ask for a change. Writing starts when the section is on screen; under
  reduced motion drafts appear whole. Sample content only.
*/
export function LoopDemo({ copy }: { copy: AppliedAiCopy["loop"] }) {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [task, setTask] = useState(0);
  const [phase, setPhase] = useState<Phase>("drafting");
  const [revised, setRevised] = useState(false);
  const [shown, setShown] = useState(0);
  const [shipped, setShipped] = useState<string[]>([]);

  const text = revised ? copy.tasks[task].revised : copy.tasks[task].draft;
  const words = text.split(" ");
  // Words of the revision that were not in the draft, compared without punctuation.
  const bare = (w: string) => w.toLowerCase().replace(/[.,;:]/g, "");
  const before = new Set(copy.tasks[task].draft.split(" ").map(bare));

  // Start writing once the demo is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStarted(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Word by word while drafting or revising.
  useEffect(() => {
    if (!started || (phase !== "drafting" && phase !== "revising")) return;
    if (reduce || shown >= words.length) {
      const id = setTimeout(() => {
        setShown(words.length);
        setPhase("waiting");
      }, reduce ? 0 : 400);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setShown((n) => n + 1), TOKEN_MS);
    return () => clearTimeout(id);
  }, [started, phase, shown, words.length, reduce]);

  const pick = (i: number) => {
    setTask(i);
    setRevised(false);
    setShown(0);
    setPhase("drafting");
  };

  const approve = () => {
    setPhase("approved");
    setShipped((s) => (s.includes(copy.tasks[task].label) ? s : [...s, copy.tasks[task].label]));
  };

  const change = () => {
    setRevised(true);
    setShown(0);
    setPhase("revising");
  };

  const status = copy.states[phase];
  const busy = phase === "drafting" || phase === "revising";

  return (
    <section aria-labelledby="loop-title" className="bg-white">
      <div ref={ref} className="container-site py-[var(--section-y)]">
        <SectionHead id="loop-title" title={copy.title} lead={copy.lead} />

        {/* Tasks. */}
        <div role="group" aria-label={copy.tasksLabel} className="mt-10 flex flex-wrap gap-2">
          {copy.tasks.map((t, i) => (
            <button
              key={t.label}
              type="button"
              aria-pressed={task === i}
              onClick={() => pick(i)}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-button border px-4 text-body-sm font-medium transition-colors duration-150 ease-standard focus-ring",
                task === i
                  ? "border-surface-dark bg-surface-dark text-text-on-dark"
                  : "border-border-input text-text-secondary hover:border-border-strong hover:text-text-primary",
              )}
            >
              {shipped.includes(t.label) && <Check className="size-4" strokeWidth={1.5} aria-hidden="true" />}
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-card border border-border-default bg-border-default lg:grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)]">
          {/* Lane 1: the AI writes. */}
          <div className="flex min-w-0 flex-col gap-5 bg-surface-dark p-6 text-text-on-dark lg:p-8">
            <p className="flex items-center gap-2 text-body-sm font-medium">
              <AiIcon className="size-4 text-text-on-dark-accent" strokeWidth={1.5} aria-hidden="true" />
              {copy.lanes.ai}
            </p>
            <p className="min-h-36 font-mono text-body leading-relaxed" aria-live="polite" aria-busy={busy}>
              {words.slice(0, started ? shown : 0).map((w, i, all) => {
                const fresh = busy && i === all.length - 1;
                const changed = revised && !before.has(bare(w));
                return (
                  <span key={`${w}-${i}`}>
                    {i > 0 && " "}
                    <span
                      className={cn(
                        "rounded-tag transition-colors duration-300",
                        fresh && "bg-elevate-blue text-white",
                        !fresh && changed && "bg-white/12 text-text-on-dark-accent",
                      )}
                    >
                      {w}
                    </span>
                  </span>
                );
              })}
              {busy && <span aria-hidden="true" className="caret-blink ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-text-on-dark-accent" />}
            </p>
            <p className="mt-auto inline-flex items-center gap-2 text-caption text-text-on-dark-secondary">
              <span
                aria-hidden="true"
                className={cn("size-1.5 rounded-full", busy ? "bg-text-on-dark-accent" : phase === "approved" ? "bg-success-dot" : "bg-text-on-dark-muted")}
              />
              {status}
            </p>
          </div>

          {/* Lane 2: a person reviews. */}
          <div className="flex min-w-0 flex-col gap-5 bg-white p-6 lg:p-8">
            <p className="flex items-center gap-2 text-body-sm font-medium text-text-primary">
              <UserCheck className="size-4 text-elevate-blue" strokeWidth={1.5} aria-hidden="true" />
              {copy.lanes.review}
            </p>
            <p className="text-caption text-text-muted">{copy.reviewer}</p>
            <div className="mt-auto flex flex-col gap-2">
              <button
                type="button"
                onClick={approve}
                disabled={phase !== "waiting"}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-button bg-elevate-blue px-4 text-body-sm font-medium text-white transition-colors duration-150 ease-standard hover:bg-blue-600 focus-ring disabled:cursor-not-allowed disabled:bg-border-default disabled:text-text-disabled"
              >
                <Check className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {copy.approve}
              </button>
              <button
                type="button"
                onClick={change}
                disabled={phase !== "waiting" || revised}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-button border border-border-input px-4 text-body-sm font-medium text-text-primary transition-colors duration-150 ease-standard hover:border-border-strong focus-ring disabled:cursor-not-allowed disabled:text-text-disabled"
              >
                <MessageSquare className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {copy.change}
              </button>
            </div>
          </div>

          {/* Lane 3: what ships. */}
          <div className="flex min-w-0 flex-col gap-5 bg-surface-subtle p-6 lg:p-8">
            <p className="flex items-center justify-between gap-2 text-body-sm font-medium text-text-primary">
              {copy.lanes.done}
              <span className="text-caption font-normal text-text-muted tabular-nums">{fill(copy.delivered, { n: shipped.length })}</span>
            </p>
            {shipped.length ? (
              <ul className="flex flex-col gap-2">
                {shipped.map((s) => (
                  <li
                    key={s}
                    className="rise flex items-center gap-2 rounded-tag border border-success-border bg-success-bg px-3 py-2 text-body-sm text-success-text"
                  >
                    <Check className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-body-sm text-text-muted">{copy.empty}</p>
            )}
          </div>
        </div>

        <p className="mt-4 text-caption text-text-muted">{copy.note}</p>
      </div>
    </section>
  );
}
