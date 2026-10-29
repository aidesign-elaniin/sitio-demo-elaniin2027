import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getCopy, getLang } from "@/content";
import { CaseCard } from "./case-card";
import { cases, type CaseLayout } from "./cases-data";
import { anchors } from "@/lib/anchors";
import { href } from "@/lib/routes";

/* Column spans on a 12-column grid from 1024px. Two rows that mirror each other: 7 + 5, then 5 + 7. */
const span: Record<CaseLayout, string> = {
  wide: "lg:col-span-7",
  narrow: "lg:col-span-5",
};

/* Case studies: the proof. Big header, then a hairline grid, four cards, wide + narrow then narrow + wide. */
export async function Cases() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("cases")]);
  return (
    <section id={anchors.cases} aria-labelledby="cases-title" className="scroll-mt-16 bg-white">
      <div className="container-site pt-[var(--section-y-statement)] pb-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2
              id="cases-title"
              className="max-w-[16ch] font-display text-display-lg font-medium text-balance text-text-primary"
            >
              {copy.title}
            </h2>
            <p className="mt-6 max-w-[60ch] font-display text-lead">
              <strong className="font-medium text-text-primary">{copy.lead.strong}</strong>{" "}
              <span className="text-text-secondary">{copy.lead.rest}</span>
            </p>
          </div>
          <Button href={href("useCases", lang)} variant="tertiary">
            {copy.all}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </Reveal>
      </div>

      <div className="border-y border-border-default">
        <div className="container-site">
          <div className="grid gap-px border-x border-border-default bg-border-default lg:grid-cols-12">
            {cases.map((item, i) => (
              <div key={item.id} className={`bg-white ${span[item.layout]}`}>
                <Reveal className="h-full" delay={(i % 2) * 0.08}>
                  <CaseCard item={item} copy={copy} lang={lang} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
