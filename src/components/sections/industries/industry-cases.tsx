import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { CaseCard } from "@/components/sections/cases/case-card";
import { cases } from "@/components/sections/cases/cases-data";
import type { CasesCopy, IndustriesCopy, Industry } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { href } from "@/lib/routes";

/*
  Cases of one industry: the home case cards in the two-column hairline grid of the Use Cases page. An industry with no
  case (retail, per the site map) shows a short empty state instead, with the link to all cases.
*/
export function IndustryCases({
  industry,
  copy,
  cardsCopy,
  lang,
}: {
  industry: Industry;
  copy: IndustriesCopy["pages"][Industry]["cases"];
  cardsCopy: CasesCopy;
  lang: Lang;
}) {
  const shown = cases.filter((c) => c.industry === industry);
  const all = (
    <Button variant="tertiary" href={href("useCases", lang)}>
      {copy.all}
      <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
    </Button>
  );
  return (
    <section aria-labelledby="industry-cases-title" className="bg-white pb-[var(--section-y)]">
      <div className="container-site flex flex-wrap items-end justify-between gap-8 pt-[var(--section-y)] pb-12">
        <SectionHead id="industry-cases-title" title={copy.title} lead={copy.lead} />
        {shown.length > 0 && all}
      </div>

      {shown.length > 0 ? (
        <div className="border-y border-border-default">
          <div className="container-site">
            <ul className="grid gap-px border-x border-border-default bg-border-default md:grid-cols-2">
              {shown.map((item, i) => (
                <li key={item.id} className="min-w-0 bg-white">
                  <Reveal className="h-full" delay={(i % 2) * 0.08}>
                    <CaseCard item={item} copy={cardsCopy} lang={lang} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="container-site">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-card border border-dashed border-border-strong bg-surface-subtle pad-card">
            <p className="text-body text-text-secondary">{copy.empty}</p>
            {all}
          </div>
        </div>
      )}
    </section>
  );
}
