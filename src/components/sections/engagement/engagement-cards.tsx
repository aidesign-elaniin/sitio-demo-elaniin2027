"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { CardGlow } from "@/components/ui/card-glow";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import type { EngagementCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { engagementModels } from "./engagement-data";
import { ProjectScene } from "./project-scene";
import { StaffScene } from "./staff-scene";
import { TeamScene } from "./team-scene";

/*
  The body of the engagement section (DESIGN.md components.engagement-models): the header and three cards. From 1024px the
  cards are a row where none is open at rest; hovering or focusing one opens it (its width grows, the others narrow) and shows
  its paragraph and its isometric scene. Below 1024px there is no pointer to open them, so they are stacked and every card
  shows everything.
*/
const OPEN_GROW = 2.4;

const DESKTOP = "(min-width: 1024px)";
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );

export function EngagementCards({
  copy,
  hrefs,
}: {
  copy: EngagementCopy;
  hrefs: string[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const desktop = useDesktop();

  return (
    <>
      <Reveal>
        <h2
          id="engagement-title"
          className="max-w-[20ch] font-display text-h1 font-medium text-balance text-text-on-dark"
        >
          {copy.title}
        </h2>
        <p className="mt-6 max-w-[56ch] text-lead text-text-on-dark-secondary">
          {copy.lead}
        </p>
      </Reveal>

      <Reveal className="mt-12 lg:mt-16">
        <ul className="grid gap-4 lg:flex lg:h-[460px]">
          {copy.items.map((model, i) => {
            const on = open === i;
            // Below 1024px every card is open, so every scene runs while it is on screen.
            const running = on || !desktop;
            return (
              <li
                key={model.id}
                onPointerEnter={() => setOpen(i)}
                onPointerLeave={() => setOpen(null)}
                onFocus={() => setOpen(i)}
                onBlur={() => setOpen(null)}
                style={{ flexGrow: on ? OPEN_GROW : 1 }}
                className="group/model relative isolate flex min-w-0 flex-col gap-4 overflow-hidden rounded-card border border-border-on-dark p-6 md:p-8 lg:basis-0 lg:p-6 lg:transition-[flex-grow] lg:duration-300 lg:ease-emphasized motion-reduce:lg:transition-none xl:p-8"
              >
                <CardGlow
                  tone="quiet"
                  drift
                  className={cn(
                    "transition-opacity duration-300 ease-standard",
                    running ? "opacity-100" : "opacity-60",
                  )}
                />
                <div className="flex items-center justify-between">
                  <IconBox icon={engagementModels[i].icon} tone="dark" />
                  <Plus
                    className={cn(
                      "hidden size-4 text-text-on-dark-muted transition-transform duration-300 ease-emphasized lg:block",
                      on && "rotate-45",
                    )}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className={cn(
                    "font-display text-h3 font-medium text-text-on-dark",
                    // The line breaks of the name only count while the card is closed; open, it adapts to the width.
                    !on && "lg:whitespace-pre-line",
                  )}
                >
                  {model.name}
                </h3>
                <p
                  className={cn(
                    "max-w-[56ch] text-body text-text-on-dark-secondary transition-opacity duration-300 ease-standard lg:w-[220px] xl:w-[280px]",
                    !on && "lg:opacity-0",
                  )}
                >
                  {model.rest} {model.fit}
                </p>

                <div
                  className={cn(
                    "mx-auto mt-2 w-full max-w-[320px] transition-opacity duration-300 ease-standard md:mr-0 md:ml-auto",
                    "lg:pointer-events-none lg:absolute lg:right-4 lg:bottom-4 lg:m-0 lg:w-[230px] xl:w-[340px]",
                    !on && "lg:opacity-0",
                  )}
                >
                  {i === 0 && (
                    <StaffScene
                      names={copy.visuals.staff.names}
                      active={running}
                    />
                  )}
                  {i === 1 && <TeamScene active={running} />}
                  {i === 2 && <ProjectScene active={running} />}
                </div>

                <Link
                  href={hrefs[i]}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-tag pt-2 font-display text-button font-medium text-text-on-dark-accent transition-colors duration-150 ease-standard after:absolute after:inset-0 hover:text-text-on-dark focus-ring-on-dark"
                >
                  {model.link}
                  <ArrowRight
                    className="size-4 transition-transform duration-150 ease-standard group-hover/model:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </>
  );
}
