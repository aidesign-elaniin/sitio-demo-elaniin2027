import Link from "next/link";
import { ArrowUpRight, Banknote, Landmark, ShoppingBag, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import type { Industry } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { href } from "@/lib/routes";

const ICONS: Record<Industry, LucideIcon> = {
  publicSector: Landmark,
  financialServices: Banknote,
  restaurants: UtensilsCrossed,
  retail: ShoppingBag,
};

/*
  Industries as tall columns side by side (reference: Metrium landing, design-system/elaniin-2027/brief.md). From xl the
  hovered or focused column widens and turns Excellence Blue; below xl they are a 2x2 grid (md) or a stack (mobile).
  Flat surfaces only: the reference's colored columns are dropped (no decorative color bars).
*/
export function IndustryColumns({
  title,
  lead,
  cards,
  cardLink,
  lang,
}: {
  title: string;
  lead: { strong: string; rest: string };
  cards: { route: Industry; title: string; text: string }[];
  cardLink: string;
  lang: Lang;
}) {
  return (
    <section aria-labelledby="industries-title" className="bg-white pb-[var(--section-y)]">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id="industries-title" title={title} lead={lead} />
      </div>

      <Reveal className="container-site">
        <ul className="grid gap-px overflow-hidden rounded-card border border-border-default bg-border-default md:grid-cols-2 xl:flex xl:h-[30rem]">
          {cards.map((card) => {
            const Icon = ICONS[card.route];
            return (
              <li
                key={card.route}
                className="min-w-0 bg-white transition-[flex-grow,background-color] duration-300 ease-emphasized motion-reduce:transition-none xl:flex-1 xl:hover:flex-[1.8] xl:focus-within:flex-[1.8]"
              >
                <Link
                  href={href(card.route, lang)}
                  className="group flex h-full flex-col gap-10 pad-card transition-colors duration-300 ease-standard hover:bg-surface-dark focus-visible:bg-surface-dark focus-ring-on-dark"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-12 place-items-center rounded-full border border-border-default text-elevate-blue transition-colors duration-300 group-hover:border-border-on-dark group-hover:text-text-on-dark-accent group-focus-visible:border-border-on-dark group-focus-visible:text-text-on-dark-accent"
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid size-10 place-items-center rounded-full border border-border-default text-text-primary transition-[color,border-color,transform] duration-300 ease-emphasized group-hover:rotate-45 group-hover:border-border-on-dark group-hover:text-text-on-dark group-focus-visible:border-border-on-dark group-focus-visible:text-text-on-dark motion-reduce:transition-none"
                    >
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </span>
                  </span>
                  <span className="mt-auto block">
                    <h3 className="font-display text-h2 font-medium text-balance text-text-primary transition-colors duration-300 group-hover:text-text-on-dark group-focus-visible:text-text-on-dark">
                      {card.title}
                    </h3>
                    <span className="mt-3 block max-w-[34ch] text-body text-text-secondary transition-colors duration-300 group-hover:text-text-on-dark-secondary group-focus-visible:text-text-on-dark-secondary">
                      {card.text}
                    </span>
                    <span className="sr-only">{cardLink}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
