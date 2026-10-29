"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { leadPosition } from "@/components/sections/engagement/finder-data";
import type { NavCopy } from "@/content/schema";
import { LOOKS, MenuSurface, type SolutionId } from "@/components/ui/solution-surface";
import { cn } from "@/lib/cn";
import type { Lang } from "@/lib/i18n";
import { engagementItems, engagementTarget, resolveTarget, type EngagementId } from "./nav-data";
import { ColumnHeading } from "./resources-menu";

/*
  Who is on the team, as 24 module dots (8 x 3): "y" your people, "o" Elaniin, "" empty. Staff augmentation sprinkles a
  few Elaniin profiles into your team, a dedicated team is an Elaniin squad around your product lead, project delivery
  is all Elaniin inside a closed outline.
*/
const TEAMS: Record<EngagementId, string> = {
  staffAugmentation: "yyyoyyyy" + "yoyyyoyy" + "yyoyyyyo",
  dedicatedTeams: "  oooo  " + " yooooo " + "  oooo  ",
  projectDelivery: "oooooooo" + "oooooooo" + "oooooooo",
};

/* Each model wears one of the solution looks, so the three mega menus share their surfaces (DESIGN.md mega-menu.solution-cards). */
const MODEL_LOOK: Record<EngagementId, SolutionId> = {
  staffAugmentation: "software",
  dedicatedTeams: "ai",
  projectDelivery: "cloud",
};

/*
  Engagement Models mega menu (references: the dot-matrix posters and the modular panels of the board,
  design-system/elaniin-2027/brief.md). Three inset cards on the solution backgrounds (light blue with the module grid, Excellence Blue with its glow, flat Inspire Grey), each with the team it puts together drawn in module dots;
  on hover or focus the Elaniin dots light up in Elevate Blue one after another. The footer carries the "who leads day
  to day" scale of the comparison: the dot of the model under the pointer grows. Transitions only, none under reduced
  motion.
*/
export function EngagementMenu({ lang, copy, onNavigate }: { lang: Lang; copy: NavCopy; onNavigate?: () => void }) {
  const { heading, items, help, scale } = copy.engagement;
  const [active, setActive] = useState<EngagementId | null>(null);

  return (
    <div onMouseLeave={() => setActive(null)}>
      <section className="flex flex-col gap-4 p-2" aria-label={heading}>
        <div className="flex items-center justify-between gap-6 px-6 pt-4">
          <ColumnHeading>{heading}</ColumnHeading>
          <span aria-hidden="true" className="flex items-center gap-4 text-caption text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-border-strong" />
              {scale.yours}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-surface-dark" />
              {scale.ours}
            </span>
          </span>
        </div>

        <ul className="grid grid-cols-3 gap-2">
          {engagementItems.map((m) => {
            const team = TEAMS[m.id];
            const look = LOOKS[MODEL_LOOK[m.id]];
            const dark = look.dark;
            let lit = 0;
            return (
              <li key={m.id} className="min-w-0">
                <Link
                  href={resolveTarget(m.to, lang)}
                  onClick={onNavigate}
                  onMouseEnter={() => setActive(m.id)}
                  onFocus={() => setActive(m.id)}
                  className={cn(
                    "group/item relative isolate flex h-full flex-col gap-6 overflow-hidden rounded-card p-8",
                    look.card,
                    dark ? "focus-ring-on-dark" : "focus-ring",
                  )}
                >
                  <MenuSurface id={MODEL_LOOK[m.id]} />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid grid-cols-8 gap-2.5 rounded-menu p-4",
                      m.id === "projectDelivery" ? "border border-dashed border-border-strong" : "border border-transparent",
                    )}
                  >
                    {[...team].map((who, i) => {
                      const delay = who === "o" ? lit++ * 25 : 0;
                      return (
                        <span
                          key={i}
                          style={{ transitionDelay: `${delay}ms` }}
                          className={cn(
                            "aspect-square rounded-full transition-[background-color,transform] duration-300 ease-emphasized motion-reduce:transition-none",
                            who === "o" &&
                              (dark
                                ? "bg-text-on-dark group-hover/item:scale-110 group-hover/item:bg-text-on-dark-accent group-focus-visible/item:bg-text-on-dark-accent"
                                : "bg-surface-dark group-hover/item:scale-110 group-hover/item:bg-elevate-blue group-focus-visible/item:bg-elevate-blue"),
                            who === "y" && (dark ? "bg-text-on-dark-muted/60" : "bg-border-strong"),
                            who === " " && (dark ? "bg-white/10" : "bg-white/70"),
                          )}
                        />
                      );
                    })}
                  </span>
                  <span className={cn("mt-auto flex items-start justify-between gap-4 border-t pt-5", look.rule)}>
                    <span className="flex flex-col gap-1">
                      <span className={cn("font-display text-h4 font-medium", look.title)}>{items[m.id].title}</span>
                      <span className={cn("text-body-sm", look.text)}>{items[m.id].description}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ease-emphasized group-hover/item:rotate-45 motion-reduce:transition-none",
                        dark
                          ? "border-border-on-dark-strong text-text-on-dark group-hover/item:border-white group-hover/item:bg-white group-hover/item:text-text-primary"
                          : "border-border-strong bg-white/70 text-text-primary group-hover/item:border-surface-dark group-hover/item:bg-surface-dark group-hover/item:text-text-on-dark",
                      )}
                    >
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-10 border-t border-border-default bg-surface-subtle px-8 py-4">
        {/* The "who leads day to day" scale; the model under the pointer grows. */}
        <div aria-hidden="true" className="flex items-center gap-4 text-caption text-text-muted">
          <span className="shrink-0">{scale.yours}</span>
          <span className="relative h-5 flex-1">
            <span className="absolute inset-x-0 top-1/2 h-px bg-border-strong" />
            {engagementItems.map((m) => (
              <span
                key={m.id}
                className={cn(
                  "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-emphasized motion-reduce:transition-none",
                  active === m.id ? "size-4 bg-elevate-blue" : "size-2.5 border border-border-strong bg-white",
                )}
                style={{ left: `${leadPosition[m.id]}%` }}
              />
            ))}
          </span>
          <span className="shrink-0">{scale.ours}</span>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-body-sm text-text-secondary">{help.question}</p>
          <Button variant="tertiary" href={resolveTarget(engagementTarget, lang)}>
            {help.action}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
