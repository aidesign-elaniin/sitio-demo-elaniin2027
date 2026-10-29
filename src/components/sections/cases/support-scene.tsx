"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Pencil, Send, TrendingUp } from "lucide-react";
import { AiIcon } from "@/components/ui/icons/elaniin-icons";
import { clamp } from "@/lib/chart";
import type { SupportSceneCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { useClock } from "@/lib/use-clock";
import { accentStyle } from "./accent";
import { FloatChip } from "./float-chip";
import { AccentPill, Avatar, SuccessPill } from "./scene-kit";

/*
  Case 3 (AI support): one conversation in the support inbox. The customer writes, the assistant drafts a reply
  (typed live), the agent reviews it and sends it, and the ticket closes. The human stays in the loop on purpose.
  State is derived from one clock (see useClock).
*/
const PERIOD = 11000;

export function SupportScene({ accent, copy }: { accent: string; copy: SupportSceneCopy }) {
  const { ref, t } = useClock(PERIOD);
  const REPLY = copy.reply;

  const asked = t >= 300;
  const drafting = t >= 1300 && t < 6300;
  const sent = t >= 6300;
  const resolved = t >= 7000;
  const reviewed = t >= 5200;
  const pressed = t >= 5800 && t < 6300;
  const shown = Math.round(clamp((t - 2000) / 3000) * REPLY.length);

  return (
    <div ref={ref} className="absolute inset-0" style={accentStyle(accent)}>
      <div className="absolute top-10 left-1/2 w-[min(344px,calc(100%-32px))] -translate-x-1/2 overflow-hidden rounded-menu border border-border-default bg-white shadow-menu">
        <div className="flex h-11 items-center gap-2.5 border-b border-border-default px-4">
          <Avatar initials="AM" />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="font-text text-body-sm leading-tight font-medium text-text-primary">{copy.customerName}</span>
            <span className="font-text text-caption leading-tight text-text-muted tabular-nums">{copy.order}</span>
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={resolved ? "done" : "open"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: duration.fast, ease: ease.standard }}
            >
              {resolved ? <SuccessPill>{copy.resolved}</SuccessPill> : <AccentPill dot>{copy.open}</AccentPill>}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <motion.p
            className="max-w-[88%] rounded-menu bg-surface-subtle px-3 py-2 font-text text-body-sm text-text-primary"
            initial={false}
            animate={{ opacity: asked ? 1 : 0, y: asked ? 0 : 6 }}
            transition={{ duration: duration.slow, ease: ease.emphasized }}
          >
            {copy.customer}
          </motion.p>

          <div className="relative h-[156px]">
            <AnimatePresence mode="wait" initial={false}>
              {drafting && (
                <motion.div
                  key="draft"
                  className="absolute inset-x-0 top-0 rounded-menu border border-[var(--accent-line)] bg-[var(--accent-soft)] p-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: duration.base, ease: ease.emphasized }}
                >
                  <div className="flex items-center gap-1.5 font-text text-caption font-medium text-[var(--accent-ink)]">
                    <AiIcon className="size-3.5" strokeWidth={1.75} />
                    {copy.suggested}
                    {reviewed && (
                      <span className="ml-auto flex items-center gap-1 font-normal">
                        <Check className="size-3.5" strokeWidth={2.5} />
                        {copy.reviewed}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 font-text text-body-sm text-text-primary">
                    {REPLY.slice(0, shown)}
                    <span className="text-transparent">{REPLY.slice(shown)}</span>
                  </p>
                  <div className="mt-2.5 flex justify-end gap-2">
                    <span className="inline-flex h-8 items-center gap-1.5 rounded-button border border-[var(--accent-line)] bg-white px-2.5 font-display text-button font-medium text-[var(--accent-ink)]">
                      <Pencil className="size-3.5" strokeWidth={1.75} />
                      {copy.edit}
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-8 items-center gap-1.5 rounded-button bg-[var(--accent)] px-2.5 font-display text-button font-medium text-white transition-transform duration-100",
                        pressed && "scale-[0.96] brightness-90",
                      )}
                    >
                      <Send className="size-3.5" strokeWidth={1.75} />
                      {copy.send}
                    </span>
                  </div>
                </motion.div>
              )}
              {sent && (
                <motion.div
                  key="sent"
                  className="absolute inset-x-0 top-0 flex flex-col items-end gap-1.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration.slow, ease: ease.emphasized }}
                >
                  <p className="max-w-[88%] rounded-menu bg-[var(--accent)] px-3 py-2 font-text text-body-sm text-white">{REPLY}</p>
                  <p className="font-text text-caption text-text-muted">{copy.sentMeta}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <FloatChip icon={TrendingUp} className="top-2 right-4" delay={0.3}>
        {copy.chip}
      </FloatChip>
    </div>
  );
}
