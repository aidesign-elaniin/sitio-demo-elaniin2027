"use client";

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Package, Phone, Search, Truck, TrendingDown } from "lucide-react";
import { clamp, easeInOut, lerp, pointAt } from "@/lib/chart";
import type { ShipmentSceneCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { formatTime, intlLocale } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { fill as template } from "@/lib/template";
import { duration, ease } from "@/lib/motion";
import { useClock } from "@/lib/use-clock";
import { accentStyle } from "./accent";
import { FloatChip } from "./float-chip";
import { AccentPill, Avatar, IconTile } from "./scene-kit";

/*
  Case 1 (logistics): the dispatch app. A shipment is selected in the list; its detail shows a stepper, a route
  with the vehicle moving along it, the driver and a live ETA. At the end it is delivered and a toast appears.
  The window is wider than the stage on purpose, so it bleeds off the right and bottom edges like a bigger app.
  All state is derived from one clock (see useClock).
*/
const PERIOD = 10000;
const ROUTE: ReadonlyArray<readonly [number, number]> = [
  [22, 58],
  [110, 58],
  [110, 20],
  [236, 20],
  [236, 46],
  [404, 46],
];
const ROUTE_PATH = ROUTE.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");

/* Neutral data: ids and 24-hour times (formatted with Intl on a 12-hour clock). Places and step names come from the dictionary, by position. A null time is "now". */
const SHIPMENTS = [
  { id: "#4821", eta: "14:30" },
  { id: "#4822", eta: "15:10" },
  { id: "#4823", eta: "16:00" },
];
const STEP_TIMES: ReadonlyArray<string | null> = ["09:12", "10:40", null, "14:30"];
const DELIVERED_AT = "14:28";

export function ShipmentScene({ accent, copy, lang }: { accent: string; copy: ShipmentSceneCopy; lang: Lang }) {
  const { ref, t } = useClock(PERIOD);

  const detail = t >= 500;
  const received = t >= 900;
  const dispatched = t >= 2000;
  const enRoute = dispatched && t < 7800;
  const delivered = t >= 7800;
  const p = easeInOut(clamp((t - 2000) / 5200));
  const [vx, vy] = pointAt(ROUTE, p);
  const fill = delivered
    ? lerp(66.6, 100, clamp((t - 7800) / 500))
    : t < 900
      ? 0
      : t < 2000
        ? lerp(0, 33.3, (t - 900) / 1100)
        : lerp(33.3, 66.6, clamp((t - 2000) / 1400));
  const minutes = delivered ? 0 : Math.round(lerp(18, 1, p));
  const status = delivered ? "delivered" : enRoute ? "enRoute" : "preparing";
  const [etaBefore, etaAfter] = copy.eta.split("{n}");

  return (
    <div ref={ref} className="absolute inset-0" style={accentStyle(accent)}>
      <div className="absolute top-8 left-6 w-[700px] overflow-hidden rounded-menu border border-border-default bg-white shadow-menu">
        {/* app bar */}
        <div className="flex h-11 items-center gap-3 border-b border-border-default px-4">
          <span className="grid size-6 place-items-center rounded-tag bg-[var(--accent)] text-white">
            <Truck className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="font-display text-body-sm font-medium text-text-primary">{copy.app}</span>
          <span className="font-text text-caption text-text-muted">{copy.activeShipments}</span>
          <span className="ml-auto flex h-7 w-44 items-center gap-2 rounded-input border border-border-default bg-surface-subtle px-2 font-text text-caption text-text-muted">
            <Search className="size-3.5" strokeWidth={1.5} />
            {copy.search}
          </span>
          <Avatar initials="LP" />
        </div>

        <div className="grid h-[320px] grid-cols-[230px_1fr]">
          {/* list */}
          <div className="border-r border-border-default p-2">
            <div className="flex items-center justify-between px-2.5 pt-1 pb-2">
              <span className="font-text text-caption font-medium text-text-secondary">{copy.today}</span>
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-surface-subtle px-1.5 font-text text-caption leading-none font-medium text-text-secondary tabular-nums">
                {SHIPMENTS.length}
              </span>
            </div>
            <ul className="flex flex-col gap-0.5">
              {SHIPMENTS.map((s, i) => (
                <motion.li
                  key={s.id}
                  className={cn(
                    "relative flex h-14 items-center gap-3 rounded-tag px-2.5",
                    i === 0 && "bg-[var(--accent-soft)]",
                  )}
                  initial={false}
                  animate={{ opacity: t >= 100 + i * 140 ? 1 : 0, x: t >= 100 + i * 140 ? 0 : -8 }}
                  transition={{ duration: duration.base, ease: ease.emphasized }}
                >
                  {i === 0 && <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-[var(--accent)]" />}
                  <IconTile>
                    <Package className="size-4" strokeWidth={1.5} />
                  </IconTile>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-text text-body-sm leading-tight font-medium text-text-primary tabular-nums">{s.id}</span>
                    <span className="truncate font-text text-caption text-text-secondary">{copy.places[i]}</span>
                  </span>
                  <span className="font-text text-caption text-text-muted tabular-nums">{i === 0 && delivered ? copy.ready : formatTime(lang, s.eta)}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* detail */}
          <motion.div
            className="flex flex-col gap-4 p-5"
            initial={false}
            animate={{ opacity: detail ? 1 : 0 }}
            transition={{ duration: duration.base }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-body-lg font-medium text-text-primary">{template(copy.shipment, { id: SHIPMENTS[0].id })}</p>
                <p className="font-text text-caption text-text-secondary">{template(copy.summary, { place: copy.places[0] })}</p>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: duration.fast, ease: ease.standard }}
                >
                  {status === "delivered" ? (
                    <span className="inline-flex h-6 items-center gap-1.5 rounded-tag border border-success-border bg-success-bg px-2 font-text text-caption leading-none font-medium text-success-text">
                      <span className="size-1.5 rounded-full bg-success-dot" />
                      {copy.status.delivered}
                    </span>
                  ) : (
                    <AccentPill dot>{copy.status[status]}</AccentPill>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* stepper */}
            <div className="relative">
              <div className="absolute top-[10px] right-3 left-3 h-0.5 rounded-full bg-border-default" />
              <div
                className="absolute top-[10px] left-3 h-0.5 rounded-full bg-[var(--accent)] transition-[width] duration-100 ease-linear"
                style={{ width: `calc((100% - 24px) * ${fill / 100})` }}
              />
              <ol className="relative flex justify-between">
                {copy.steps.map((name, i) => {
                  const done = [received, dispatched, false, delivered][i] || (i === 2 && delivered);
                  const current = i === 2 && enRoute;
                  return (
                    <li key={i} className="flex w-[25%] flex-col items-center gap-1.5 text-center">
                      <span
                        className={cn(
                          "relative grid size-[22px] place-items-center rounded-full border-2 bg-white transition-colors duration-200",
                          done ? "border-[var(--accent)] bg-[var(--accent)] text-white" : current ? "border-[var(--accent)]" : "border-border-default",
                        )}
                      >
                        {done && <Check className="size-3" strokeWidth={3} />}
                        {current && <span className="size-2 rounded-full bg-[var(--accent)]" />}
                        {current && <span className="absolute inset-[-5px] animate-ping rounded-full border border-[var(--accent-line)]" />}
                      </span>
                      <span className="font-text text-caption leading-tight font-medium text-text-primary">{name}</span>
                      <span className="font-text text-caption leading-none text-text-muted tabular-nums">{i === 3 && delivered ? formatTime(lang, DELIVERED_AT) : STEP_TIMES[i] ? formatTime(lang, STEP_TIMES[i]) : copy.now}</span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* route */}
            <div className="relative h-[78px] overflow-hidden rounded-menu border border-border-default bg-surface-subtle">
              <svg viewBox="0 0 426 78" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet" role="presentation">
                <path d={ROUTE_PATH} pathLength={1} fill="none" stroke="var(--color-border-strong)" strokeWidth="2.5" strokeDasharray="0.012 0.012" strokeLinecap="round" strokeLinejoin="round" />
                <path d={ROUTE_PATH} pathLength={1} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${p} 1`} />
                <circle cx={ROUTE[0][0]} cy={ROUTE[0][1]} r="3.5" fill="#fff" stroke="var(--accent)" strokeWidth="2" />
                <circle cx={ROUTE[ROUTE.length - 1][0]} cy={ROUTE[ROUTE.length - 1][1]} r="4" fill="var(--accent)" stroke="#fff" strokeWidth="2" />
                <motion.circle
                  r="5.5"
                  fill="#fff"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  initial={false}
                  animate={{ cx: vx, cy: vy, opacity: dispatched ? 1 : 0 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </svg>
            </div>

            {/* driver + live ETA */}
            <div className="flex items-center gap-3">
              <Avatar initials="MR" className="size-8" />
              <div className="min-w-0 flex-1">
                <p className="font-text text-body-sm leading-tight font-medium text-text-primary">Marta R.</p>
                <p className="font-text text-caption text-text-secondary">{copy.driverRole}</p>
              </div>
              <span className="font-text text-caption text-text-secondary">
                {delivered ? (
                  template(copy.deliveredAt, { time: formatTime(lang, DELIVERED_AT) })
                ) : (
                  <>
                    {etaBefore}
                    <NumberFlow value={minutes} locales={intlLocale(lang)} className="font-medium text-text-primary" />
                    {etaAfter}
                  </>
                )}
              </span>
              <span className="grid size-7 place-items-center rounded-full border border-border-default text-text-secondary">
                <Phone className="size-3.5" strokeWidth={1.5} />
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* delivery toast */}
      <AnimatePresence>
        {delivered && t < 9700 && (
          <motion.div
            className="absolute top-5 right-6 z-30 flex items-center gap-2 rounded-menu border border-border-default bg-white px-3 py-2 font-text text-body-sm font-medium text-text-primary shadow-menu"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: duration.slow, ease: ease.emphasized }}
          >
            <span className="grid size-5 place-items-center rounded-full bg-[var(--accent)] text-white">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {template(copy.toast, { id: SHIPMENTS[0].id })}
          </motion.div>
        )}
      </AnimatePresence>

      <FloatChip icon={TrendingDown} className="bottom-3 left-9" delay={0.3}>
        {copy.chip}
      </FloatChip>
    </div>
  );
}
