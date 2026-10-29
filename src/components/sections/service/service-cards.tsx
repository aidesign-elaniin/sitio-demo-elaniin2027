import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import type { Lang } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";

/* Hub of a service line: the intro, then one white card per service that links to its page. */
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
    <section aria-labelledby="services-title" className="bg-white">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id="services-title" title={title} lead={lead} />
      </div>

      <ul className="container-site grid gap-4 md:grid-cols-2">
        {cards.map((card, i) => (
          <li key={card.route} className="min-w-0">
            <Reveal delay={i * 0.06} className="h-full">
              <Link
                href={href(card.route, lang)}
                className="group flex h-full flex-col gap-3 rounded-card border border-border-default bg-white pad-card transition-colors duration-150 ease-standard hover:bg-surface-subtle focus-ring"
              >
                <h3 className="font-display text-h3 font-medium text-text-primary">{card.title}</h3>
                <p className="max-w-[48ch] text-body text-text-secondary">{card.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 font-display text-button font-medium text-text-link">
                  {cardLink}
                  <ArrowRight
                    className="size-4 transition-transform duration-150 ease-standard group-hover:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
