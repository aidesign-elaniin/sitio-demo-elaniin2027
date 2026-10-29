import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import type { Lang } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";

/*
  Hub of a service line (also the engagement and resources hubs): the intro, then an index of the pages, one row each
  (reference: the Kus and ContraBureau indexes, design-system/elaniin-2027/brief.md). Rows split by hairlines; the title
  on the left, the text in the middle, an arrow circle on the right. No hover surface: the arrow fills Excellence Blue
  and turns, the title shifts a little.
*/
export function ServiceCards({
  title,
  lead,
  cards,
  cardLink,
  lang,
}: {
  title: string;
  lead: { strong: string; rest: string };
  cards: { route: RouteKey; title: string; text: string }[];
  cardLink: string;
  lang: Lang;
}) {
  return (
    <section aria-labelledby="services-title" className="bg-white pb-[var(--section-y)]">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id="services-title" title={title} lead={lead} />
      </div>

      <ul className="container-site">
        {cards.map((card, i) => (
          <li key={card.route} className="border-t border-border-default last:border-b">
            <Reveal delay={i * 0.06}>
              <Link
                href={href(card.route, lang)}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 rounded-tag py-8 focus-ring md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-x-10"
              >
                <h3 className="font-display text-h2 font-medium text-balance text-text-primary transition-transform duration-300 ease-emphasized group-hover:translate-x-2 motion-reduce:transition-none">
                  {card.title}
                </h3>
                <p className="col-start-1 row-start-2 max-w-[52ch] text-body text-text-secondary md:col-start-2 md:row-start-1">
                  {card.text}
                  <span className="sr-only"> {cardLink}</span>
                </p>
                <span
                  aria-hidden="true"
                  className="col-start-2 row-span-2 row-start-1 grid size-12 place-items-center rounded-full border border-border-default text-text-primary transition-[background-color,border-color,color,transform] duration-300 ease-emphasized group-hover:rotate-45 group-hover:border-surface-dark group-hover:bg-surface-dark group-hover:text-text-on-dark motion-reduce:transition-none md:col-start-3 md:row-span-1"
                >
                  <ArrowUpRight className="size-5" strokeWidth={1.5} />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
