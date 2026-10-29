"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { engagementItems } from "@/components/sections/nav/nav-data";
import type { EngagementCopy, NavCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import type { Lang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { fill } from "@/lib/template";
import { type Answers, best, finderModels, leadPosition, matches } from "./finder-data";

/*
  Comparison of the engagement models on Inspire Grey, as a decision tool (pattern from ui-ux-pro-max: comparison table
  with the recommended column highlighted and the CTA under it; colors and type stay Elaniin).
  1. Finder: three questions as radio pills. Every answer updates the match bars of the three models live; the best
     one gets its label and a link to its page.
  2. A "who leads day to day" scale places the three models; the marked one is emphasized.
  3. The detail table: the marked column (the visitor's pick, else the finder's best) turns Excellence Blue. Each
     column can be marked from its header. Below 768px the table becomes one card per model behind a model switcher.
  Nothing animates by itself; bars and colors transition on change and stay still under reduced motion.
*/
export function Comparison({
  copy,
  names,
  lang,
}: {
  copy: EngagementCopy["hub"]["comparison"];
  names: NavCopy["engagement"]["items"];
  lang: Lang;
}) {
  const uid = useId();
  const f = copy.finder;
  const [answers, setAnswers] = useState<Answers>([null, null, null]);
  // The visitor's pick: a model index, -1 for "none marked", null to follow the finder.
  const [pinned, setPinned] = useState<number | null>(null);

  const scores = matches(answers);
  const top = best(answers);
  const marked = pinned === null ? top : pinned < 0 ? null : pinned;
  const mobile = marked ?? 0;

  const answer = (q: number, o: number) => {
    setAnswers((a) => a.map((v, i) => (i === q ? o : v)));
    setPinned(null);
  };

  return (
    <section aria-labelledby="comparison-title" className="bg-surface-subtle pb-[var(--section-y)]">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id="comparison-title" title={copy.title} lead={copy.lead} />
      </div>

      <div className="container-site flex flex-col gap-4">
        {/* 1 + 2. Finder and the scale. */}
        <Reveal className="grid overflow-hidden rounded-card border border-border-default bg-white lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="flex min-w-0 flex-col gap-8 pad-card">
            <h3 className="font-display text-h3 font-medium text-text-primary">{f.title}</h3>
            {f.questions.map((q, qi) => (
              <fieldset key={q.label} className="min-w-0">
                <legend className="text-body-sm font-medium text-text-primary">{q.label}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map((o, oi) => (
                    <label key={o} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name={`${uid}-q${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => answer(qi, oi)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex min-h-11 items-center gap-2 rounded-button border border-border-input bg-white px-4 py-2 text-body-sm text-text-secondary transition-colors duration-150 ease-standard peer-checked:border-surface-dark peer-checked:bg-surface-dark peer-checked:text-text-on-dark peer-focus-visible:shadow-focus hover:border-border-strong hover:text-text-primary peer-checked:hover:text-text-on-dark">
                        {answers[qi] === oi && <Check className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />}
                        {o}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="flex min-w-0 flex-col gap-8 border-t border-border-default bg-surface-subtle/60 pad-card lg:border-t-0 lg:border-l">
            <div aria-live="polite" className="flex flex-col gap-5">
              {finderModels.map((id, i) => {
                const value = scores?.[i] ?? 0;
                const isBest = top === i;
                return (
                  <div key={id} className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className={cn("text-body-sm font-medium", isBest ? "text-text-primary" : "text-text-secondary")}>
                        {names[id].title}
                      </span>
                      <span className="text-caption text-text-muted tabular-nums">
                        {scores ? fill(f.match, { n: value }) : "—"}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-tag bg-border-default" aria-hidden="true">
                      <div
                        className={cn(
                          "h-full origin-left rounded-tag transition-[transform,background-color] duration-500 ease-emphasized motion-reduce:transition-none",
                          isBest ? "bg-surface-dark" : "bg-border-strong",
                        )}
                        style={{ transform: `scaleX(${value / 100})` }}
                      />
                    </div>
                    {isBest && (
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="inline-flex h-6 items-center gap-1.5 rounded-tag border border-success-border bg-success-bg px-2 text-caption font-medium text-success-text">
                          <span className="size-1.5 rounded-full bg-success-dot" aria-hidden="true" />
                          {f.best}
                        </span>
                        <Link
                          href={href(id, lang)}
                          className="group inline-flex min-h-11 items-center gap-2 rounded-tag text-body-sm font-medium text-text-link transition-colors duration-150 ease-standard hover:text-text-link-hover focus-ring"
                        >
                          {f.view}
                          <ArrowRight className="size-4 transition-transform duration-150 ease-standard group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
              {!scores && <p className="text-body-sm text-text-secondary">{f.hint}</p>}
            </div>

            {/* The scale: who leads day to day. */}
            <div className="mt-auto">
              <p className="text-caption font-medium text-text-primary">{f.spectrum.label}</p>
              <div className="relative mt-4 h-10">
                <span className="absolute inset-x-0 top-1/2 h-px bg-border-strong" aria-hidden="true" />
                {finderModels.map((id, i) => (
                  <span
                    key={id}
                    title={names[id].title}
                    className={cn(
                      "absolute top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-all duration-300 ease-emphasized motion-reduce:transition-none",
                      marked === i ? "size-5 border-elevate-blue bg-elevate-blue" : "size-3 border-border-strong bg-white",
                    )}
                    style={{ left: `${leadPosition[id]}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-caption text-text-muted">
                <span>{f.spectrum.start}</span>
                <span>{f.spectrum.end}</span>
              </div>
            </div>

            {scores && (
              <button
                type="button"
                onClick={() => {
                  setAnswers([null, null, null]);
                  setPinned(null);
                }}
                className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-tag text-body-sm font-medium text-text-secondary transition-colors duration-150 ease-standard hover:text-text-primary focus-ring"
              >
                <RotateCcw className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {f.reset}
              </button>
            )}
          </div>
        </Reveal>

        {/* 3. The detail table. */}
        <Reveal className="mt-12">
          <h3 className="font-display text-h3 font-medium text-text-primary">{f.tableTitle}</h3>

          <table className="mt-6 hidden w-full table-fixed border-collapse overflow-hidden rounded-card bg-white text-left md:table">
            <thead>
              <tr className="border border-border-default">
                <td className="w-1/4 p-6" />
                {engagementItems.map((m, i) => {
                  const on = marked === i;
                  return (
                    <th
                      key={m.id}
                      scope="col"
                      className={cn(
                        "border-l border-border-default p-6 align-top transition-colors duration-300 ease-standard",
                        on && "border-surface-dark bg-surface-dark",
                      )}
                    >
                      <Link
                        href={href(m.id, lang)}
                        className={cn(
                          "rounded-tag font-display text-body-lg font-medium transition-colors duration-150 ease-standard",
                          on ? "text-text-on-dark hover:text-text-on-dark-accent focus-ring-on-dark" : "text-text-primary hover:text-text-link focus-ring",
                        )}
                      >
                        {names[m.id].title}
                      </Link>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => setPinned(on ? -1 : i)}
                        className={cn(
                          "mt-3 flex min-h-11 cursor-pointer items-center gap-2 rounded-button border px-3 text-caption font-medium transition-colors duration-150 ease-standard",
                          on
                            ? "border-border-on-dark-strong text-text-on-dark focus-ring-on-dark"
                            : "border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary focus-ring",
                        )}
                      >
                        {on && <Check className="size-3.5" strokeWidth={1.5} aria-hidden="true" />}
                        {on ? f.picked : f.pick}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {copy.criteria.map((criterion, r) => (
                <tr key={criterion} className="group border border-border-default">
                  <th scope="row" className="p-6 align-top text-body-sm font-medium text-text-primary transition-colors duration-150 group-hover:bg-surface-subtle">
                    {criterion}
                  </th>
                  {engagementItems.map((m, i) => (
                    <td
                      key={m.id}
                      className={cn(
                        "border-l border-border-default p-6 align-top text-body-sm transition-colors duration-300 ease-standard",
                        marked === i
                          ? "border-surface-dark bg-surface-dark text-text-on-dark-secondary"
                          : "text-text-secondary group-hover:bg-surface-subtle",
                      )}
                    >
                      {copy.rows[m.id][r]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Below 768px: one model at a time. */}
          <div className="mt-6 md:hidden">
            <div role="group" aria-label={copy.title} className="grid grid-cols-3 gap-1 rounded-button border border-border-default bg-white p-1">
              {engagementItems.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={mobile === i}
                  onClick={() => setPinned(i)}
                  className={cn(
                    "min-h-11 cursor-pointer rounded-tag px-2 text-caption font-medium transition-colors duration-150 ease-standard focus-ring",
                    mobile === i ? "bg-surface-dark text-text-on-dark" : "text-text-secondary",
                  )}
                >
                  {names[m.id].title}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-card border border-border-default bg-white pad-card">
              <h4 className="font-display text-body-lg font-medium">
                <Link href={href(engagementItems[mobile].id, lang)} className="rounded-tag text-text-primary hover:text-text-link focus-ring">
                  {names[engagementItems[mobile].id].title}
                </Link>
              </h4>
              <dl className="mt-4 divide-y divide-border-default">
                {copy.criteria.map((criterion, r) => (
                  <div key={criterion} className="py-3">
                    <dt className="text-body-sm font-medium text-text-primary">{criterion}</dt>
                    <dd className="mt-1 text-body-sm text-text-secondary">{copy.rows[engagementItems[mobile].id][r]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
