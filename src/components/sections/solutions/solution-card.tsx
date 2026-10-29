"use client";

import { Maximize2 } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { LOOKS, SolutionSurface } from "@/components/ui/solution-surface";
import type { SolutionsCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { SolutionVisual } from "./solution-visual";
import type { SolutionItem } from "./solutions-data";

/*
  One card of the solutions grid, dressed with the look of its solution (the same as the nav: surface, pattern, glow):
  icon + name and expand button, the lead as a title and a body continuation (the same sizes as the route cells), then the animated mock resting directly on
  the surface. Text and button follow the surface (dark on the AI card).
*/
export function SolutionCard({
  item,
  copy,
  onOpen,
}: {
  item: SolutionItem;
  copy: SolutionsCopy;
  onOpen: (trigger: HTMLButtonElement) => void;
}) {
  const text = copy.items[item.id];
  const look = LOOKS[item.id];
  return (
    <article
      className={cn(
        "relative isolate flex h-full flex-col gap-8 overflow-hidden rounded-card border pad-card",
        // A hairline keeps the light cards apart from the white section they stand on.
        look.dark ? "border-transparent" : "border-border-default",
        look.card,
      )}
    >
      <SolutionSurface look={look} />

      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconBox icon={item.icon} tone={look.dark ? "dark" : "light"} />
          <span className={cn("font-display text-body-lg font-medium", look.title)}>{text.name}</span>
        </div>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={copy.card.details.replace("{title}", text.title)}
          onClick={(e) => onOpen(e.currentTarget)}
          className={cn(
            "group grid size-10 shrink-0 cursor-pointer place-items-center rounded-button border transition-colors duration-150 ease-standard",
            look.dark
              ? "border-border-on-dark bg-white/10 text-text-on-dark hover:bg-white/20 focus-ring-on-dark"
              : "border-border-default bg-white text-text-primary hover:bg-surface-subtle focus-ring",
          )}
        >
          <Maximize2
            className="size-4 transition-transform duration-150 ease-standard group-hover:scale-110"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </header>

      <div className="flex flex-col gap-3">
        <h3 className={cn("font-display text-h4 font-medium", look.title)}>{text.lead}</h3>
        <p className={cn("text-body", look.text)}>{text.rest}</p>
      </div>

      {/* The isometric scenes bleed past the card padding so they are not drawn small. */}
      <div className="mt-auto -mx-6">
        <SolutionVisual id={item.id} copy={copy.visuals} bare />
      </div>
    </article>
  );
}
