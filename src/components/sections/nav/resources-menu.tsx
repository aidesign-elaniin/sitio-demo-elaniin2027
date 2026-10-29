import Link from "next/link";
import { ArrowRight, Maximize2, type LucideIcon } from "lucide-react";
import { cases } from "@/components/sections/cases/cases-data";
import { ShipmentScene } from "@/components/sections/cases/shipment-scene";
import { SignupScene } from "@/components/sections/cases/signup-scene";
import { ClientLogo } from "@/components/sections/clients/placeholder-logos";
import { CardGlow } from "@/components/ui/card-glow";
import { IconBox } from "@/components/ui/icon-box";
import type { NavCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import type { Lang } from "@/lib/i18n";
import {
  featuredCases,
  featuredTarget,
  resolveTarget,
  resourceItems,
} from "./nav-data";

/* Menu type 1: two columns (DESIGN.md mega-menu.resources): cases and research on the left, the featured work on the right. */
type Row = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

function RichRow({ item, onNavigate }: { item: Row; onNavigate?: () => void }) {
  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        className="-mx-3 flex items-start gap-4 rounded-menu p-3 transition-colors duration-150 ease-standard hover:bg-surface-subtle focus-ring"
      >
        <IconBox icon={item.icon} />
        <span className="flex flex-col gap-0.5">
          <span className="font-display text-body-lg font-medium text-text-primary">
            {item.title}
          </span>
          <span className="text-body-sm text-text-secondary">
            {item.description}
          </span>
        </span>
      </Link>
    </li>
  );
}

export function ResourcesMenu({
  lang,
  copy,
  onNavigate,
}: {
  lang: Lang;
  copy: NavCopy;
  onNavigate?: () => void;
}) {
  const { items, featured } = copy.resources;
  const rows: Row[] = resourceItems.map((i) => ({
    id: i.id,
    icon: i.icon,
    ...items[i.id],
    href: resolveTarget(i.to, lang),
  }));
  const [first, second] = featured.cards;
  const study = (id: (typeof featuredCases)[number]) => cases.find((c) => c.id === id)!;
  const cards = [
    {
      card: first,
      item: study("delivery-tracking"),
      box: "w-[520px]",
      scale: 0.7,
      top: -36,
      scene: <ShipmentScene accent={study("delivery-tracking").logo.accent} copy={first.scene} lang={lang} />,
    },
    {
      card: second,
      item: study("sme-payments"),
      box: "w-[440px]",
      scale: 0.82,
      top: -42,
      scene: <SignupScene accent={study("sme-payments").logo.accent} copy={second.scene} lang={lang} />,
    },
  ];
  return (
    <div className="grid grid-cols-[2fr_3fr] divide-x divide-border-default">
      <ul
        className="flex flex-col gap-1 p-8"
        aria-label={copy.resources.trigger}
      >
        {rows.map((item) => (
          <RichRow key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </ul>

      {/* Featured work: two vertical cards in Excellence Blue, each a link, with the real scene of the case cropped at the bottom (DESIGN.md mega-menu.visual-column). */}
      <section
        className="flex flex-col gap-2 p-2"
        aria-label={featured.heading}
      >
        <Link
          href={resolveTarget(featuredTarget, lang)}
          onClick={onNavigate}
          className="group/head flex flex-col gap-1 rounded-menu px-6 pt-6 pb-4 focus-ring"
        >
          <span className="flex items-center justify-between gap-3 font-display text-h4 font-medium text-text-primary">
            {featured.heading}
            <ArrowRight
              className="size-5 text-text-link transition-transform duration-150 ease-standard group-hover/head:translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
          <span className="text-body-sm text-text-secondary">
            {featured.subtitle}
          </span>
        </Link>

        <div className="grid grid-cols-2 grid-rows-[auto_auto_auto_1fr] gap-x-2">
          {cards.map(({ card, item, scene, box, scale, top }) => (
            <Link
              key={item.id}
              href={resolveTarget({ route: item.route }, lang)}
              onClick={onNavigate}
              className="group/case relative isolate row-span-4 grid grid-rows-subgrid overflow-hidden rounded-card border border-border-on-dark bg-surface-dark transition-colors duration-150 ease-standard hover:border-border-on-dark-strong focus-ring-on-dark"
            >
              <CardGlow tone="feature" />
              {/* Four rows shared by the two cards (subgrid): the logos, the titles, the buttons and the interfaces line up. */}
              <div className="flex h-10 items-center px-6 pt-6 box-content">
                <span className="text-text-on-dark" title={item.logo.name}>
                  <ClientLogo logo={item.logo} size={22} />
                </span>
              </div>
              <span className="px-6 pt-5 font-display text-h4 font-medium text-text-on-dark">
                {card.title}
              </span>
              <span className="px-6 pt-5">
                <span className="inline-flex h-10 w-fit items-center gap-2 rounded-button bg-white px-4 font-display text-button font-medium text-text-primary transition-colors duration-150 ease-standard group-hover/case:bg-surface-subtle">
                  {card.action}
                  <Maximize2
                    className="size-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </span>

              {/* The interface of the case, cropped by the right edge and the bottom of the card. */}
              <div
                aria-hidden="true"
                className="relative mt-6 h-[190px] self-end overflow-hidden"
              >
                <div
                  className={cn(
                    "absolute left-6 h-[420px] origin-top-left",
                    box,
                  )}
                  style={{ top, transform: `scale(${scale})` }}
                >
                  {scene}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
