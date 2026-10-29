"use client";

import NumberFlow, { type Format } from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronLeft, Landmark, TrendingUp, Wallet } from "lucide-react";
import type { SignupSceneCopy } from "@/content/schema";
import { clamp } from "@/lib/chart";
import { cn } from "@/lib/cn";
import { formatCurrency, intlLocale } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { fill } from "@/lib/template";
import { duration, ease } from "@/lib/motion";
import { useClock } from "@/lib/use-clock";
import { accentStyle } from "./accent";
import { FloatChip } from "./float-chip";
import { IconTile, PhoneFrame } from "./scene-kit";

/*
  Case 2 (fintech): the sign-up flow of the payments app, on a phone cropped by the bottom edge of the stage.
  Three screens (business data typed in, account chosen, account ready) and a "payment received" notification
  at the end. State is derived from one clock (see useClock). Under reduced motion it rests on the last screen.
*/
const PERIOD = 11000;
const TAX_ID = "0614-250190-101-3";
const RECEIVED = 128.5;

/* The balance counts up as a currency in the language of the page: $128.50 (en) / 128,50 $ (es). */
const usd: Format = {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const typed = (text: string, t: number, from: number, to: number) =>
  text.slice(0, Math.round(clamp((t - from) / (to - from)) * text.length));

function Field({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-text text-caption text-text-secondary">{label}</span>
      <span
        className={cn(
          "flex h-10 items-center rounded-input border bg-white px-3 font-text text-body-sm text-text-primary transition-colors duration-150",
          active ? "border-[var(--accent)] shadow-[0_0_0_3px_var(--accent-soft)]" : "border-border-default",
        )}
      >
        {value}
        {active && <span className="ml-px h-4 w-px animate-pulse bg-text-primary" />}
      </span>
    </div>
  );
}

export function SignupScene({ accent, copy, lang }: { accent: string; copy: SignupSceneCopy; lang: Lang }) {
  const { ref, t } = useClock(PERIOD);
  const NAME = copy.sampleBusiness;

  const step = t < 3700 ? 0 : t < 7000 ? 1 : 2;
  const pressed = (t >= 3300 && t < 3700) || (t >= 6500 && t < 7000);
  const account = t >= 4800 ? 1 : t >= 4500 ? 0 : -1;
  const notify = t >= 8600 && t < 10600;

  return (
    <div ref={ref} className="absolute inset-0" style={accentStyle(accent)}>
      <PhoneFrame className="absolute top-8 left-1/2 h-[420px] w-[236px] -translate-x-1/2">
        <div className="flex h-full flex-col">
          {/* status bar */}
          <div className="flex h-7 items-center justify-between px-5 font-text text-caption leading-none font-medium text-text-primary tabular-nums">
            9:41
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-2 w-3.5 rounded-[2px] bg-text-primary" />
            </span>
          </div>

          {/* header + progress */}
          <div className="flex items-center gap-2 px-4 pt-1 pb-3">
            <ChevronLeft className="size-4 text-text-secondary" strokeWidth={1.75} />
            <div className="flex flex-1 gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-surface-subtle">
                  <span
                    className="block h-full rounded-full bg-[var(--accent)] transition-[width] duration-300 ease-out"
                    style={{ width: i <= step ? "100%" : "0%" }}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                className="absolute inset-0 flex flex-col gap-3 px-4"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: duration.base, ease: ease.standard }}
              >
                {step === 0 && (
                  <>
                    <div>
                      <p className="font-display text-body-lg leading-tight font-medium text-text-primary">{copy.businessData}</p>
                      <p className="font-text text-caption text-text-secondary">{fill(copy.step, { n: 1 })}</p>
                    </div>
                    <Field label={copy.tradeName} value={typed(NAME, t, 300, 1900)} active={t >= 300 && t < 2100} />
                    <Field label={copy.registration} value={typed(TAX_ID, t, 2100, 3100)} active={t >= 2100 && t < 3300} />
                  </>
                )}
                {step === 1 && (
                  <>
                    <div>
                      <p className="font-display text-body-lg leading-tight font-medium text-text-primary">{copy.accountTitle}</p>
                      <p className="font-text text-caption text-text-secondary">{fill(copy.step, { n: 2 })}</p>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {copy.accounts.map((a, i) => (
                        <li
                          key={i}
                          className={cn(
                            "flex items-center gap-3 rounded-menu border p-3 transition-colors duration-150",
                            account === i ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-border-default",
                          )}
                        >
                          <IconTile>{i === 0 ? <Landmark className="size-4" strokeWidth={1.5} /> : <Wallet className="size-4" strokeWidth={1.5} />}</IconTile>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="font-text text-body-sm leading-tight font-medium text-text-primary">{a.name}</span>
                            <span className="font-text text-caption text-text-secondary">{a.detail}</span>
                          </span>
                          <span
                            className={cn(
                              "grid size-4 shrink-0 place-items-center rounded-full border-2",
                              account === i ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-border-strong",
                            )}
                          >
                            {account === i && <Check className="size-2.5" strokeWidth={3.5} />}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {step === 2 && (
                  <div className="flex flex-col items-center gap-3 pt-3 text-center">
                    <span className="grid size-14 place-items-center rounded-full bg-[var(--accent-soft)]">
                      <span className="grid size-9 place-items-center rounded-full bg-[var(--accent)] text-white">
                        <Check className="size-5" strokeWidth={3} />
                      </span>
                    </span>
                    <div>
                      <p className="font-display text-body-lg leading-tight font-medium text-text-primary">{copy.ready}</p>
                      <p className="font-text text-caption text-text-secondary">{copy.completed}</p>
                    </div>
                    <div className="w-full rounded-menu border border-border-default p-3 text-left">
                      <p className="font-text text-caption text-text-secondary">{copy.balance}</p>
                      <p className="font-display text-h4 font-medium text-text-primary tabular-nums">
                        <NumberFlow value={notify || t >= 10600 ? RECEIVED : 0} locales={intlLocale(lang)} format={usd} />
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* primary action */}
          {step < 2 && (
            <div className="px-4 pb-4">
              <span
                className={cn(
                  "grid h-10 place-items-center rounded-button bg-[var(--accent)] font-display text-button font-medium text-white transition-transform duration-100",
                  pressed && "scale-[0.97] brightness-90",
                )}
              >
                {copy.next}
              </span>
            </div>
          )}
        </div>
      </PhoneFrame>

      {/* payment notification */}
      <AnimatePresence>
        {notify && (
          <motion.div
            className="absolute top-12 right-3 z-30 flex items-center gap-2.5 rounded-menu border border-border-default bg-white px-3 py-2.5 shadow-menu sm:right-6"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: duration.slow, ease: ease.emphasized }}
          >
            <IconTile className="size-7">
              <Wallet className="size-3.5" strokeWidth={1.75} />
            </IconTile>
            <span className="flex flex-col">
              <span className="font-text text-body-sm leading-tight font-medium text-text-primary">{copy.received}</span>
              <span className="font-text text-caption text-text-secondary tabular-nums">{fill(copy.receivedDetail, { amount: formatCurrency(lang, RECEIVED, "USD") })}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatChip icon={TrendingUp} className="bottom-5 left-4" delay={0.3}>
        {copy.chip}
      </FloatChip>
    </div>
  );
}
