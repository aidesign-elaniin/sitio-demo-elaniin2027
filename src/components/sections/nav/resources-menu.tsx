import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { modulePattern } from "@/lib/module-pattern";
import type { NavCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { exploreItems, featuredTarget, latestItems, resolveTarget } from "./nav-data";

/* Menu type 1: the standard mega menu, after the Laravel reference. Sitemap: Use Cases and Research, plus articles and featured cases. */
export function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <p className="font-text text-body-sm font-medium text-text-muted">{children}</p>;
}

export type Row = { id: string; icon: LucideIcon; title: string; description: string; href: string };

export function RichRow({ item, onNavigate }: { item: Row; onNavigate?: () => void }) {
  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        className="-mx-3 flex items-start gap-4 rounded-menu p-3 transition-colors duration-150 ease-standard hover:bg-surface-subtle focus-ring"
      >
        <IconBox icon={item.icon} />
        <span className="flex flex-col gap-0.5">
          <span className="font-display text-body-lg font-medium text-text-primary">{item.title}</span>
          <span className="text-body-sm text-text-secondary">{item.description}</span>
        </span>
      </Link>
    </li>
  );
}

export function ResourcesMenu({ lang, copy, onNavigate }: { lang: Lang; copy: NavCopy; onNavigate?: () => void }) {
  const { explore, latest, featured } = copy.resources;
  const exploreRows: Row[] = exploreItems.map((i) => ({ id: i.id, icon: i.icon, ...explore.items[i.id], href: resolveTarget(i.to, lang) }));
  const latestRows: Row[] = latestItems.map((i) => ({ id: i.id, icon: i.icon, ...latest.items[i.id], href: resolveTarget(i.to, lang) }));
  return (
    <div className="grid grid-cols-2 divide-x divide-border-default xl:grid-cols-3">
      <section className="flex flex-col gap-5 p-8" aria-label={explore.heading}>
        <ColumnHeading>{explore.heading}</ColumnHeading>
        <ul className="flex flex-col gap-1">
          {exploreRows.map((item) => (
            <RichRow key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-5 p-8" aria-label={latest.heading}>
        <ColumnHeading>{latest.heading}</ColumnHeading>
        <ul className="flex flex-col gap-1">
          {latestRows.map((item) => (
            <RichRow key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </ul>
      </section>

      {/* Featured cases: an inset card in the language of the solution cards (light blue, module grid, glow). Clipped on the right edge. */}
      <section className="hidden p-2 xl:block" aria-label={featured.heading}>
        <div className="relative isolate h-full min-h-[420px] overflow-hidden rounded-card bg-blue-tint-50">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 50% at 0% 100%, color-mix(in srgb, var(--color-blue-200) 70%, transparent), transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              ...modulePattern("var(--color-blue-300)", 3),
              opacity: 0.55,
              maskImage: "radial-gradient(120% 90% at 100% 0%, #000 0%, transparent 65%)",
              WebkitMaskImage: "radial-gradient(120% 90% at 100% 0%, #000 0%, transparent 65%)",
            }}
          />

          <Link
            href={resolveTarget(featuredTarget, lang)}
            onClick={onNavigate}
            className="group/head relative z-10 flex flex-col gap-1 p-8 pb-0 focus-ring"
          >
            <span className="flex items-center justify-between gap-3 font-display text-h4 font-medium text-text-primary">
              {featured.heading}
              <ArrowRight
                className="size-5 text-text-link transition-transform duration-150 ease-standard group-hover/head:translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <span className="text-body-sm text-text-secondary">{featured.subtitle}</span>
          </Link>

          {featured.cards.map((card, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={[
                "absolute w-72 rounded-menu border border-blue-200 bg-white p-4 shadow-card-rest",
                i === 0 && "top-28 left-6",
                i === 1 && "top-48 left-10",
                i === 2 && "top-68 left-14",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="inline-flex h-6 items-center rounded-tag border border-neutral-border bg-surface-subtle px-2 mono-label text-caption leading-none text-text-secondary">
                {card.tag}
              </span>
              <p className="mt-3 font-display text-body-lg font-medium text-text-primary">{card.title}</p>
              {i === featured.cards.length - 1 && (
                <p className="mt-1 font-text text-body-sm text-text-secondary tabular-nums">{card.metric}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
