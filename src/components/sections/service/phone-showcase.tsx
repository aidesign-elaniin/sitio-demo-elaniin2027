"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowDownLeft, ArrowUpRight, Bell, Check, LogIn, Plus, Send, Smartphone } from "lucide-react";
import { PhoneFrame } from "@/components/sections/cases/scene-kit";
import { SectionHead } from "@/components/ui/section-head";
import type { PhoneCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { intlLocale } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { duration, ease } from "@/lib/motion";

const STEP_MS = 4000;
const BALANCE = [1284.5, 1284.5, 1259.5];

/*
  Mobile apps: a phone whose screen follows the selected feature (references: the "Streamlined experience" phone with
  notes around it and the big-number task screens, design-system/elaniin-2027/brief.md). Features on the left as a
  selectable list, the phone on the right; screens slide sideways when the feature changes. It advances on its own
  while on screen (the page's living loop) until the visitor picks a feature; under reduced motion nothing moves by
  itself and screens swap without sliding. Screens are sample content, drawn with the site tokens.
*/
export function PhoneShowcase({ copy, lang }: { copy: PhoneCopy; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || reduce || !inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % copy.features.length), STEP_MS);
    return () => clearInterval(id);
  }, [auto, reduce, inView, copy.features.length]);

  const money = (value: number) =>
    new Intl.NumberFormat(intlLocale(lang), { style: "currency", currency: "USD", currencyDisplay: "narrowSymbol" }).format(value);

  const screens = [
    // Home: the big balance, three round shortcuts, recent activity.
    <div key="home" className="flex h-full flex-col gap-4 p-4">
      <p className="text-body-sm font-medium text-text-primary">{copy.home.greeting}</p>
      <div className="rounded-card bg-surface-dark p-4 text-text-on-dark">
        <p className="text-caption text-text-on-dark-secondary">{copy.home.balanceLabel}</p>
        <p className="mt-1 font-display text-h2 font-medium tabular-nums">
          <NumberFlow value={BALANCE[active]} locales={intlLocale(lang)} format={{ style: "currency", currency: "USD", currencyDisplay: "narrowSymbol" }} />
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {copy.home.actions.map((a, i) => {
          const Icon = [Send, Plus, Smartphone][i];
          return (
            <span key={a} className="flex flex-col items-center gap-1.5 text-caption text-text-secondary">
              <span className={cn("grid size-11 place-items-center rounded-full", i ? "bg-surface-subtle text-text-primary" : "bg-elevate-blue text-white")}>
                <Icon className="size-4" strokeWidth={1.5} />
              </span>
              {a}
            </span>
          );
        })}
      </div>
      <div>
        <p className="text-caption font-medium text-text-primary">{copy.home.recent}</p>
        <ul className="mt-2 divide-y divide-border-default">
          {copy.home.items.map((item, i) => (
            <li key={item} className="flex items-center justify-between gap-2 py-2 text-caption">
              <span className="flex min-w-0 items-center gap-2 text-text-primary">
                {i === 1 ? (
                  <ArrowDownLeft className="size-3.5 shrink-0 text-success-dot" strokeWidth={1.5} />
                ) : (
                  <ArrowUpRight className="size-3.5 shrink-0 text-text-muted" strokeWidth={1.5} />
                )}
                <span className="truncate">{item}</span>
              </span>
              <span className="text-text-secondary tabular-nums">{money([-42.3, 150, -18.9][i])}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    // Pay: contact chips, the amount, one confirm button.
    <div key="pay" className="flex h-full flex-col gap-4 p-4">
      <p className="text-body-sm font-medium text-text-primary">{copy.pay.title}</p>
      <div>
        <p className="text-caption text-text-muted">{copy.pay.to}</p>
        <div className="mt-2 flex gap-2">
          {copy.pay.contacts.map((c, i) => (
            <span
              key={c}
              className={cn(
                "inline-flex h-8 items-center rounded-tag border px-3 text-caption font-medium",
                i === 0 ? "border-elevate-blue bg-surface-subtle text-text-primary" : "border-border-default text-text-secondary",
              )}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-card border border-border-default p-4 text-center">
        <p className="text-caption text-text-muted">{copy.pay.amountLabel}</p>
        <p className="mt-1 font-display text-display-lg font-medium text-text-primary tabular-nums">{money(25)}</p>
      </div>
      <span className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-button bg-elevate-blue text-body-sm font-medium text-white">
        <Check className="size-4" strokeWidth={1.5} />
        {copy.pay.confirm}
      </span>
    </div>,
    // Alerts: what the core just did, as it happens.
    <div key="alerts" className="flex h-full flex-col gap-3 p-4">
      <p className="flex items-center gap-2 text-body-sm font-medium text-text-primary">
        <Bell className="size-4" strokeWidth={1.5} />
        {copy.alerts.title}
      </p>
      {copy.alerts.items.map((item, i) => {
        const Icon = [Send, ArrowDownLeft, LogIn][i];
        return (
          <motion.div
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: ease.emphasized, delay: reduce ? 0 : 0.25 + i * 0.35 }}
            className="flex gap-3 rounded-card border border-border-default bg-white p-3 shadow-card-rest"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-tag bg-surface-subtle text-elevate-blue">
              <Icon className="size-4" strokeWidth={1.5} />
            </span>
            <span className="min-w-0">
              <span className="flex items-center justify-between gap-2 text-caption font-medium text-text-primary">
                {item.title}
                {i === 0 && <span className="font-normal text-text-muted">{copy.alerts.now}</span>}
              </span>
              <span className="block text-caption text-text-secondary">{item.text}</span>
            </span>
          </motion.div>
        );
      })}
    </div>,
  ];

  return (
    <section aria-labelledby="phone-title" className="bg-white">
      <div ref={ref} className="container-site grid gap-12 py-[var(--section-y)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
        <div>
          <SectionHead id="phone-title" title={copy.title} lead={copy.lead} />
          <ul aria-label={copy.featuresLabel} className="mt-10">
            {copy.features.map((f, i) => (
              <li key={f.title} className="border-t border-border-default last:border-b">
                <button
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => {
                    setActive(i);
                    setAuto(false);
                  }}
                  className="group relative flex w-full flex-col gap-1 py-5 pl-6 text-left focus-ring"
                >
                  {/* Active marker, and the time left before the next feature while it plays on its own. */}
                  <span aria-hidden="true" className="absolute top-5 bottom-5 left-0 w-0.5 overflow-hidden rounded-full bg-border-default">
                    {active === i && (
                      <motion.span
                        key={`${i}-${auto}`}
                        className="absolute inset-x-0 top-0 block bg-elevate-blue"
                        initial={{ height: auto && !reduce ? "0%" : "100%" }}
                        animate={{ height: "100%" }}
                        transition={{ duration: auto && !reduce ? STEP_MS / 1000 : 0, ease: "linear" }}
                      />
                    )}
                  </span>
                  <span
                    className={cn(
                      "font-display text-h3 font-medium transition-colors duration-150 ease-standard",
                      active === i ? "text-text-primary" : "text-text-muted group-hover:text-text-primary",
                    )}
                  >
                    {f.title}
                  </span>
                  <span className={cn("text-body text-text-secondary", active !== i && "hidden md:block md:text-text-muted")}>
                    {f.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <PhoneFrame className="h-[34rem] w-[17rem] shadow-product">
            <div aria-hidden="true" className="relative h-full overflow-hidden">
              <div className="flex h-8 items-center justify-between px-5 text-caption font-medium text-text-primary">
                <span>9:41</span>
                <span className="h-4 w-16 rounded-full bg-elaniin-black" />
                <span className="w-6" />
              </div>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={active}
                  className="absolute inset-x-0 top-8 bottom-0"
                  initial={reduce ? { opacity: 0 } : { x: "100%" }}
                  animate={reduce ? { opacity: 1 } : { x: 0 }}
                  exit={reduce ? { opacity: 0 } : { x: "-100%" }}
                  transition={{ duration: reduce ? 0 : duration.reveal, ease: ease.emphasized }}
                >
                  {screens[active]}
                </motion.div>
              </AnimatePresence>
            </div>
          </PhoneFrame>
          <p className="mt-4 text-caption text-text-muted">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}
