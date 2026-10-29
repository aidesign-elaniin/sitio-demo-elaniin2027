"use client";

import NumberFlow, { type Format } from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Cloud, Database, HardDrive, Server, TrendingDown } from "lucide-react";
import type { CloudSceneCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { formatNumber, intlLocale } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { fill } from "@/lib/template";
import { duration, ease } from "@/lib/motion";
import { useClock } from "@/lib/use-clock";
import { accentStyle } from "./accent";
import { FloatChip } from "./float-chip";
import { AccentPill, IconTile, SuccessPill } from "./scene-kit";

/*
  Case 4 (cloud): the cost console after the migration. Spend and capacity before the optimization, the button is
  pressed, spend drops 31% (the meter shrinks, instances switch off) while availability stays green.
  Figures are consistent with the card text (31% lower cost, 99.98% availability). One clock (see useClock).
*/
const PERIOD = 10000;
const BEFORE = 12400;
const AFTER = 8556; // 31% less

/* Whole US dollars with a narrow symbol: $12,400 (en) / 12.400 $ (es). */
const usd: Format = { style: "currency", currency: "USD", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 };

function Units({ total, active }: { total: number; active: number }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "size-2 rounded-module transition-colors duration-300",
            i < active ? "bg-[var(--accent)]" : "bg-border-strong",
          )}
        />
      ))}
    </span>
  );
}

export function CloudScene({ accent, copy, lang }: { accent: string; copy: CloudSceneCopy; lang: Lang }) {
  const { ref, t } = useClock(PERIOD);

  const pressed = t >= 2600 && t < 2900;
  const applied = t >= 2900;
  const servers = t >= 3300 ? 5 : 8;
  const replicas = t >= 3800 ? 3 : 5;
  const storage = t >= 4200 ? 4 : 6;
  const spend = applied ? AFTER : BEFORE;

  return (
    <div ref={ref} className="absolute inset-0" style={accentStyle(accent)}>
      <div className="@container absolute top-12 left-1/2 w-[min(600px,calc(100%-32px))] -translate-x-1/2 overflow-hidden rounded-menu border border-border-default bg-white shadow-menu">
        <div className="flex h-11 items-center gap-2.5 border-b border-border-default px-4">
          <span className="grid size-6 place-items-center rounded-tag bg-[var(--accent)] text-white">
            <Cloud className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="font-display text-body-sm font-medium text-text-primary">{copy.environment}</span>
          <span className="ml-auto">
            <SuccessPill>{copy.uptime}</SuccessPill>
          </span>
        </div>

        <div className="grid gap-3 p-4 @min-[480px]:grid-cols-2 @min-[480px]:items-start @min-[480px]:gap-4">
          <div className="flex flex-col gap-3">
          <div className="rounded-menu border border-border-default p-3">
            <div className="flex h-6 items-center justify-between">
              <span className="font-text text-caption text-text-secondary">{copy.spend}</span>
              <AnimatePresence>
                {t >= 4700 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: duration.base, ease: ease.emphasized }}
                  >
                    <AccentPill>{copy.drop}</AccentPill>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="font-display text-h3 leading-tight font-medium text-text-primary tabular-nums">
              <NumberFlow value={spend} locales={intlLocale(lang)} format={usd} />
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-subtle">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-[1200ms] ease-out"
                style={{ width: `${(spend / BEFORE) * 100}%` }}
              />
            </div>
            <p className="mt-1.5 font-text text-caption text-text-muted tabular-nums">{fill(copy.estimated, { amount: formatNumber(lang, BEFORE, usd) })}</p>
          </div>

          <span
            className={cn(
              "flex h-9 items-center justify-center gap-1.5 rounded-button font-display text-button font-medium transition-[background-color,color,transform] duration-150",
              applied ? "border border-success-border bg-success-bg text-success-text" : "bg-[var(--accent)] text-white",
              pressed && "scale-[0.97] brightness-90",
            )}
          >
            {applied && <Check className="size-4" strokeWidth={2.5} />}
            {applied ? copy.applied : copy.apply}
          </span>
          </div>

          <ul className="flex flex-col divide-y divide-border-default rounded-menu border border-border-default">
            {[
              { id: "servers", icon: Server, ...copy.servers, value: servers, total: 8 },
              { id: "database", icon: Database, ...copy.database, value: replicas, total: 5 },
              { id: "disks", icon: HardDrive, ...copy.disks, value: storage, total: 6 },
            ].map(({ id, icon: Icon, name, unit, value, total }) => (
              <li key={id} className="flex items-center gap-3 px-3 py-2.5">
                <IconTile>
                  <Icon className="size-4" strokeWidth={1.5} />
                </IconTile>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-text text-body-sm leading-tight font-medium text-text-primary">{name}</span>
                  <span className="font-text text-caption text-text-secondary">
                    <NumberFlow value={value} locales={intlLocale(lang)} /> {unit}
                  </span>
                </span>
                <Units total={total} active={value} />
              </li>
            ))}
          </ul>

        </div>
      </div>

      <FloatChip icon={TrendingDown} className="top-2 right-4" delay={0.3}>
        {copy.chip}
      </FloatChip>
    </div>
  );
}
