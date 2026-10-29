"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { researchItems } from "@/components/sections/research/research-data";
import type { NavCopy } from "@/content/schema";
import { LOOKS, MenuSurface } from "@/components/ui/solution-surface";
import { cn } from "@/lib/cn";
import type { Lang } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";
import { exploreItems, featuredTarget, latestItems, resolveTarget } from "./nav-data";

export function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <p className="font-text text-body-sm font-medium text-text-muted">{children}</p>;
}

export type Row = { id: string; icon: LucideIcon; title: string; description: string; href: string };

/* The featured cards open their case, in the order of the copy (logistics, fintech, AI). */
const FEATURED_ROUTES: RouteKey[] = ["caseDeliveryTracking", "caseSmePayments", "caseSupportAssistant"];
const CYCLE_MS = 2800;
/* The first study is drawn as dots in the research tile (the same figure as its page). */
const FIGURE = researchItems[0].value;

/* Use cases preview: a tiny product window with a result chip. Decorative. */
function CasePreview({ metric }: { metric: string }) {
  return (
    <span aria-hidden="true" className="relative block h-24 overflow-hidden rounded-menu border border-border-default bg-white p-3">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-border-strong" />
        ))}
      </span>
      <span className="mt-3 flex flex-col gap-1.5">
        {["w-3/4", "w-1/2", "w-2/3"].map((w, i) => (
          <span
            key={w}
            style={{ transitionDelay: `${i * 60}ms` }}
            className={cn(
              "h-1.5 origin-left rounded-full bg-border-default transition-[transform,background-color] duration-300 ease-emphasized group-hover/item:bg-blue-200 motion-reduce:transition-none",
              w,
            )}
          />
        ))}
      </span>
      <span className="absolute right-3 bottom-3 inline-flex h-6 translate-y-1 items-center rounded-tag bg-surface-dark px-2 text-caption font-medium text-text-on-dark opacity-90 transition-transform duration-300 ease-emphasized group-hover/item:translate-y-0 motion-reduce:transition-none">
        {metric.split(" ")[0]}
      </span>
    </span>
  );
}

/* Research preview: the first study's figure as 50 dots (each dot is 2%), filling in on hover. Decorative. */
function ResearchPreview() {
  const filled = Math.round(FIGURE / 2);
  return (
    <span aria-hidden="true" className="flex h-24 items-center gap-4 rounded-menu border border-border-default bg-white p-3">
      <span className="font-mono text-h3 text-text-primary tabular-nums">{FIGURE}%</span>
      <span className="grid w-fit grid-cols-10 gap-1">
        {Array.from({ length: 50 }, (_, i) => (
          <span
            key={i}
            style={{ transitionDelay: `${i < filled ? i * 8 : 0}ms` }}
            className={cn(
              "size-2 rounded-full transition-colors duration-200 motion-reduce:transition-none",
              i < filled ? "bg-border-strong group-hover/item:bg-surface-dark" : "bg-border-default",
            )}
          />
        ))}
      </span>
    </span>
  );
}

/*
  Resources mega menu (references: the Kus mono index with arrows, the fanned card carousel and the dot-matrix
  readouts of the board, design-system/elaniin-2027/brief.md).
  - Explore: two tiles with a live preview of what is behind them (a product window, the research figure in dots).
  - Latest articles: an editorial index, numbered rows on hairlines with an arrow that turns on hover.
  - Featured cases: the AI solution background (Excellence Blue with its glow); the three cases are a fanned deck that deals the
    next card to the front while the menu is open (the living loop) and spreads out on hover. Every card opens its case.
  The three columns take the solution backgrounds (only the software one keeps its texture, the AI one its glow) (explore: software, articles: cloud, featured: AI), so every mega menu
  shares the same surfaces. Transitions only, and the deck rests under reduced motion.
*/
export function ResourcesMenu({ lang, copy, onNavigate }: { lang: Lang; copy: NavCopy; onNavigate?: () => void }) {
  const { explore, latest, featured } = copy.resources;
  const reduce = !!useReducedMotion();
  const [front, setFront] = useState(0);
  const [spread, setSpread] = useState(false);

  useEffect(() => {
    if (reduce || spread) return;
    const id = setInterval(() => setFront((f) => (f + 1) % featured.cards.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, spread, featured.cards.length]);

  return (
    <div className="grid grid-cols-2 gap-2 p-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Explore: tiles with previews. */}
      <section className={cn("relative isolate flex flex-col gap-5 overflow-hidden rounded-card p-6", LOOKS.software.card)} aria-label={explore.heading}>
        <MenuSurface id="software" />
        <ColumnHeading>{explore.heading}</ColumnHeading>
        <ul className="flex flex-col gap-3">
          {exploreItems.map((item) => (
            <li key={item.id}>
              <Link
                href={resolveTarget(item.to, lang)}
                onClick={onNavigate}
                className="group/item flex flex-col gap-3 rounded-card border border-blue-200 bg-white/70 p-3 transition-colors duration-150 ease-standard hover:border-blue-300 hover:bg-white focus-ring"
              >
                {item.id === "useCases" ? <CasePreview metric={featured.cards[0].metric} /> : <ResearchPreview />}
                <span className="flex items-start justify-between gap-3 px-1 pb-1">
                  <span className="flex flex-col gap-0.5">
                    <span className="font-display text-body-lg font-medium text-text-primary">{explore.items[item.id].title}</span>
                    <span className="text-body-sm text-text-secondary">{explore.items[item.id].description}</span>
                  </span>
                  <ArrowRight
                    className="mt-1 size-4 shrink-0 text-text-link transition-transform duration-150 ease-standard group-hover/item:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Latest articles: an editorial index. */}
      <section className={cn("relative isolate flex flex-col gap-5 overflow-hidden rounded-card p-6", LOOKS.cloud.card)} aria-label={latest.heading}>
        <ColumnHeading>{latest.heading}</ColumnHeading>
        <ol>
          {latestItems.map((item, i) => (
            <li key={item.id} className="border-t border-border-strong last:border-b">
              <Link
                href={resolveTarget(item.to, lang)}
                onClick={onNavigate}
                className="group/item -mx-2 grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-4 rounded-tag px-2 py-4 transition-colors duration-150 ease-standard hover:bg-white/80 focus-ring"
              >
                <span aria-hidden="true" className="font-mono text-caption text-text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-display text-body-lg font-medium text-text-primary transition-transform duration-300 ease-emphasized group-hover/item:translate-x-1 motion-reduce:transition-none">
                    {latest.items[item.id].title}
                  </span>
                  <span className="text-body-sm text-text-secondary">{latest.items[item.id].description}</span>
                </span>
                <ArrowUpRight
                  className="size-4 self-center text-text-primary transition-transform duration-300 ease-emphasized group-hover/item:rotate-45 group-hover/item:text-text-link motion-reduce:transition-none"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Featured cases: a dealt deck on the dark panel. */}
      <section className="hidden xl:block" aria-label={featured.heading}>
        <div
          className={cn("relative isolate flex h-full min-h-[26rem] flex-col overflow-hidden rounded-card", LOOKS.ai.card)}
          onMouseEnter={() => setSpread(true)}
          onMouseLeave={() => setSpread(false)}
          onFocus={() => setSpread(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setSpread(false);
          }}
        >

          <MenuSurface id="ai" />
          <Link
            href={resolveTarget(featuredTarget, lang)}
            onClick={onNavigate}
            className="group/head flex flex-col gap-1 rounded-card p-8 pb-0 focus-ring-on-dark"
          >
            <span className="flex items-center justify-between gap-3 font-display text-h4 font-medium text-text-on-dark">
              {featured.heading}
              <ArrowRight
                className="size-5 text-text-on-dark-accent transition-transform duration-150 ease-standard group-hover/head:translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <span className="text-body-sm text-text-on-dark-secondary">{featured.subtitle}</span>
          </Link>

          <ul className="relative mt-auto h-64">
            {featured.cards.map((card, i) => {
              // Position in the deck: 0 is the front card, 2 the back one.
              const depth = (i - front + featured.cards.length) % featured.cards.length;
              // Spread: a hand of cards, the outer ones lower and turned out. At rest: a deck centered on the panel.
              const fan = spread
                ? `translate(${(i - 1) * 26}%, ${Math.abs(i - 1) * 14}px) rotate(${(i - 1) * 7}deg)`
                : `translate(${(depth - 1) * 12}px, ${depth * -14}px) rotate(${(depth - 1) * 3}deg) scale(${1 - depth * 0.05})`;
              return (
                <li
                  key={card.title}
                  className="absolute bottom-12 left-1/2 w-56 -translate-x-1/2"
                  style={{ zIndex: spread ? 10 - Math.abs(i - 1) : 10 - depth }}
                >
                  <Link
                    href={href(FEATURED_ROUTES[i], lang)}
                    onClick={onNavigate}
                    style={{ transform: fan }}
                    className={cn(
                      "block rounded-menu border border-border-default bg-white p-4 shadow-product transition-[transform,opacity] duration-500 ease-emphasized focus-ring-on-dark motion-reduce:transition-none",
                      !spread && depth > 0 && "opacity-90",
                    )}
                  >
                    <span className="inline-flex h-6 items-center rounded-tag border border-neutral-border bg-surface-subtle px-2 mono-label text-caption leading-none text-text-secondary">
                      {card.tag}
                    </span>
                    <span className="mt-3 block font-display text-body-lg font-medium text-text-primary">{card.title}</span>
                    <span className="mt-1 block font-text text-body-sm text-text-secondary tabular-nums">{card.metric}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
