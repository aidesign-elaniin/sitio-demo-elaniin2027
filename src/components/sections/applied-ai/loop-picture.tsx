"use client";

import { useState } from "react";
import { Check, Sparkles, UserCheck } from "lucide-react";
import type { AppliedAiCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { useClock } from "@/lib/use-clock";

const ITEM = 2600; // ms per draft
const ITEMS = 3; // per loop; the third one is sent back with changes
const PERIOD = ITEM * ITEMS;

const ease = (x: number) => 1 - (1 - x) ** 3;
const clamp = (x: number) => Math.min(1, Math.max(0, x));

/*
  Human-in-the-loop as a living loop: drafts leave the AI node as small Elevate Blue modules, stop at the person while
  a ring fills (the review), then either ship to the delivery node, which pulses and counts, or arc back to the AI
  "with changes" (every third draft). Clicking the person approves the draft under review right away, so the visitor
  plays the reviewer. Runs only on screen; under reduced motion it rests with two drafts shipped.
*/
export function LoopPicture({ labels }: { labels: AppliedAiCopy["pictures"]["loop"] }) {
  const { ref, t } = useClock(PERIOD);
  const [forced, setForced] = useState<number | null>(null);

  const index = Math.floor(t / ITEM);
  const u = (t % ITEM) / ITEM;
  const approvedNow = forced === index;
  const rejected = index === ITEMS - 1 && !approvedNow;

  // Phases of one draft: travel to the person (0-.3), review (.3-.6, or shorter once clicked), then out (.6-1).
  const review = approvedNow ? 1 : clamp((u - 0.3) / 0.3);
  const out = clamp((u - 0.6) / 0.4);
  let x: number; // 0 = AI, 50 = person, 100 = delivery (percent of the track)
  let y = 0;
  if (u < 0.3) x = ease(u / 0.3) * 50;
  else if (u < 0.6 && !approvedNow) x = 50;
  else if (rejected) {
    x = 50 - ease(out) * 50;
    y = -Math.sin(Math.PI * out) * 36; // the way back arcs over the line
  } else x = 50 + ease(approvedNow && u < 0.6 ? clamp((u - 0.3) / 0.3) : out) * 50;

  const shipped = Math.min(index, ITEMS - 1) + (out >= 1 || (approvedNow && u > 0.55) ? (rejected ? 0 : 1) : 0);
  const arrived = !rejected && (out > 0.95 || (approvedNow && x > 98));

  const node = "absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full";

  return (
    <div ref={ref} className="w-full max-w-72">
      <div className="relative h-24">
        {/* The line and the return arc. */}
        <span aria-hidden="true" className="absolute inset-x-6 top-1/2 h-px bg-border-strong" />
        <svg aria-hidden="true" className="absolute inset-x-6 top-0 h-1/2 w-[calc(100%-3rem)] overflow-visible" viewBox="0 0 100 48" preserveAspectRatio="none">
          <path
            d="M50 48 Q25 0 0 48"
            fill="none"
            vectorEffect="non-scaling-stroke"
            className={cn("stroke-border-default transition-colors duration-300", rejected && u > 0.6 && "stroke-text-muted")}
            strokeDasharray="3 4"
          />
        </svg>

        {/* The draft in transit. */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 bg-elevate-blue"
          style={{ left: `calc(1.5rem + (100% - 3rem) * ${x / 100})`, marginTop: y }}
        />

        <span aria-hidden="true" className={cn(node, "left-6 border border-border-strong bg-white text-elevate-blue")}>
          <Sparkles className="size-5" strokeWidth={1.5} />
        </span>

        {/* The person: click to approve the draft under review. The ring fills while reviewing. */}
        <button
          type="button"
          onClick={() => setForced(index)}
          aria-label={labels.person}
          className={cn(node, "left-1/2 cursor-pointer bg-surface-dark text-text-on-dark transition-transform duration-150 ease-standard hover:scale-105 focus-ring")}
        >
          <svg aria-hidden="true" className="absolute -inset-1.5 size-[calc(100%+0.75rem)] -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18.5" fill="none" className="stroke-border-default" strokeWidth="1.5" />
            <circle
              cx="20"
              cy="20"
              r="18.5"
              fill="none"
              className="stroke-elevate-blue"
              strokeWidth="1.5"
              pathLength={1}
              strokeDasharray={`${review} 1`}
            />
          </svg>
          <UserCheck className="size-5" strokeWidth={1.5} />
        </button>

        <span
          aria-hidden="true"
          className={cn(
            node,
            "left-[calc(100%-1.5rem)] border transition-[background-color,border-color,color,transform] duration-300 ease-emphasized",
            arrived ? "scale-110 border-surface-dark bg-surface-dark text-text-on-dark" : "border-border-strong bg-white text-elevate-blue",
          )}
        >
          <Check className="size-5" strokeWidth={1.5} />
        </span>
      </div>

      <div aria-hidden="true" className="grid grid-cols-3 text-caption text-text-muted">
        <span>{labels.ai}</span>
        <span className="text-center">{rejected && u > 0.6 ? labels.back : labels.person}</span>
        <span className="text-right tabular-nums">
          {labels.ship} · {shipped}
        </span>
      </div>
    </div>
  );
}
