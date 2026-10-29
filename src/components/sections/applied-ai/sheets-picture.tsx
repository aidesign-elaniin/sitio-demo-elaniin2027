"use client";

import { useState } from "react";
import { FileText, FlaskConical, PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { useClock } from "@/lib/use-clock";

const STEP = 1500;
const ICONS = [FileText, FlaskConical, PanelsTopLeft];

/*
  Differentiated deliverables as a living loop: three sheets (documentation, tests, prototype) take turns at the front
  of the stack; the front one "fills in" (its lines draw from left to right) before it moves to the back. Hovering
  spreads the stack into a row so every sheet is readable. Runs only on screen; under reduced motion the stack rests
  spread with every sheet filled.
*/
export function SheetsPicture({ labels }: { labels: [string, string, string] }) {
  const { ref, t } = useClock(STEP * 3);
  const [spread, setSpread] = useState(false);
  const front = Math.floor(t / STEP) % 3;
  const fill = (t % STEP) / STEP;
  const resting = t === STEP * 3 - 1; // the reduced-motion end state

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-36 w-full max-w-72"
      onMouseEnter={() => setSpread(true)}
      onMouseLeave={() => setSpread(false)}
    >
      {labels.map((label, i) => {
        const Icon = ICONS[i];
        const depth = (i - front + 3) % 3; // 0 front, 2 back
        const open = spread || resting;
        const transform = open
          ? `translate(${i * 100}%, 0) scale(0.92)`
          : `translate(${depth * 18}px, ${depth * 12}px) scale(${1 - depth * 0.05})`;
        const lines = depth === 0 && !open ? fill : 1;
        return (
          <div
            key={label}
            className={cn(
              "absolute top-0 left-0 flex h-28 origin-top-left flex-col gap-2 rounded-menu border bg-white p-3 transition-[transform,border-color,box-shadow,width] duration-500 ease-emphasized motion-reduce:transition-none",
              depth === 0 || open ? "border-border-strong shadow-card-rest" : "border-border-default",
              open ? "w-1/3" : "w-3/5",
            )}
            style={{ transform, zIndex: open ? 3 : 3 - depth }}
          >
            <span className="flex items-center gap-1.5 text-caption font-medium text-text-primary">
              <Icon className="size-3.5 shrink-0 text-elevate-blue" strokeWidth={1.5} />
              <span className="truncate">{label}</span>
            </span>
            {[0.9, 0.7, 0.8].map((w, l) => (
              <span key={l} className="h-1.5 rounded-full bg-surface-subtle">
                <span
                  className="block h-full rounded-full bg-border-strong"
                  style={{ width: `${Math.min(1, Math.max(0, lines * 3 - l)) * w * 100}%` }}
                />
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}
