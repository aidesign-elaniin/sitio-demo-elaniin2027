"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { AudienceRoutesCopy } from "@/content/schema";
import { duration, ease } from "@/lib/motion";
import {
  DEFAULT_SECTOR,
  audienceRouteItems,
  type Sector,
} from "./audience-routes-data";
import { RouteCard } from "./route-card";
import { SectorToggle } from "./sector-toggle";

/*
  The header toggle and the three cards of the chosen sector (DESIGN.md components.audience-routes). The server wrapper resolves
  the links; this leaf keeps the sector and the card whose panel is open on touch.
*/
export function RoutesBrowser({
  copy,
  hrefs,
  casesHref,
}: {
  copy: AudienceRoutesCopy;
  hrefs: Record<string, string>;
  casesHref: string;
}) {
  const [sector, setSector] = useState<Sector>(DEFAULT_SECTOR);
  const [openId, setOpenId] = useState<string | null>(null);

  const choose = (next: Sector) => {
    setOpenId(null);
    setSector(next);
  };

  return (
    <>
      <div className="container-site pt-[var(--section-y)] pb-12">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2
              id="routes-title"
              className="max-w-[20ch] font-display text-h1 font-medium text-balance text-text-primary"
            >
              {copy.title}
            </h2>
            <p className="mt-6 max-w-[56ch] text-lead text-text-secondary">
              {copy.lead}
            </p>
          </div>
          <SectorToggle value={sector} onChange={choose} labels={copy.toggle} />
        </Reveal>
      </div>

      <div className="container-site pb-[var(--section-y)]">
        <Reveal>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={sector}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.base, ease: ease.emphasized }}
              className="grid divide-y divide-border-default overflow-hidden rounded-card border border-border-default bg-white/55 lg:grid-cols-3 lg:grid-rows-[auto_1fr] lg:divide-x lg:divide-y-0 lg:backdrop-blur-sm"
            >
              {audienceRouteItems[sector].map((route, i) => {
                const text = copy.sectors[sector][i];
                return (
                  <RouteCard
                    key={route.id}
                    text={text}
                    visual={route.visual}
                    labels={copy.visuals}
                    href={hrefs[route.id]}
                    casesHref={casesHref}
                    casesLabel={copy.casesLabel}
                    casesClose={copy.casesClose}
                    open={openId === route.id}
                    onToggle={() =>
                      setOpenId(openId === route.id ? null : route.id)
                    }
                  />
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </Reveal>
      </div>
    </>
  );
}
