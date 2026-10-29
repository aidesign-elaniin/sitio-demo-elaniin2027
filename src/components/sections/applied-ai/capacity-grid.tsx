"use client";

import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/cn";
import { useClock } from "@/lib/use-clock";

const SIZE = 10;
const PERIOD = 4400;
const MAX = Math.hypot(SIZE - 1, SIZE - 1);

/*
  "Capacity 100x" as a living loop: one Elevate Blue square (the team) sends a wave across the 10 x 10 module grid,
  the squares fill in Excellence Blue as the wave passes and a counter climbs from 1x to 100x; then the grid drains and
  it starts again. The pointer is a lens: the squares around it light up in Elevate Blue, so the visitor can "paint"
  capacity. Runs only on screen (useClock); under reduced motion it rests full at 100x.
*/
export function CapacityGrid({ one, many }: { one: string; many: string }) {
  const { ref, t } = useClock(PERIOD);
  const [hover, setHover] = useState<number | null>(null);

  // 0-400 ms: the full grid drains to the seed; 400-900: only the seed; 900-3200: the wave grows; then full. The loop
  // ends full, which is also the resting state under reduced motion.
  const radius = t < 400 ? MAX * (1 - t / 400) : t < 900 ? 0 : t < 3200 ? ((t - 900) / 2300) * MAX : MAX;
  const cells = Array.from({ length: SIZE * SIZE }, (_, i) => Math.hypot(i % SIZE, Math.floor(i / SIZE)));
  const lit = cells.filter((d) => d <= radius).length || 1;
  const full = lit === SIZE * SIZE;

  return (
    <div ref={ref} className="flex items-end gap-6">
      <div
        aria-hidden="true"
        className="grid w-fit cursor-crosshair grid-cols-10 gap-1.5"
        onMouseLeave={() => setHover(null)}
      >
        {cells.map((d, i) => {
          const near =
            hover !== null && Math.hypot((i % SIZE) - (hover % SIZE), Math.floor(i / SIZE) - Math.floor(hover / SIZE)) <= 1.6;
          // The wave front is the ring of squares the wave is crossing right now.
          const front = d <= radius && d > radius - 1.4 && !full;
          return (
            <span
              key={i}
              onMouseEnter={() => setHover(i)}
              className={cn(
                "size-2.5 transition-[background-color,transform] duration-150 motion-reduce:transition-none",
                i === 0 || near ? "bg-elevate-blue" : front ? "bg-blue-400" : d <= radius ? "bg-surface-dark" : "bg-border-default",
                near && "scale-125",
              )}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-1 pb-0.5">
        <span className="font-mono text-h2 text-text-primary tabular-nums" aria-hidden="true">
          <NumberFlow value={lit} suffix="x" />
        </span>
        <span className="text-caption text-text-muted">{lit === 1 ? one : many}</span>
      </div>
    </div>
  );
}
