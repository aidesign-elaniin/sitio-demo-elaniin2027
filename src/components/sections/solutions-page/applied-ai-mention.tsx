import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { PILLARS } from "@/components/sections/applied-ai/pillars";
import { appliedAiTarget, resolveTarget } from "@/components/sections/nav/nav-data";
import type { AppliedAiCopy, SolutionsPageCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";

/* Solutions, section 3. The Applied AI mention on Inspire Grey: header and link on the left, its three pillars on the right. */
export function AppliedAiMention({
  copy,
  pillars,
  lang,
}: {
  copy: SolutionsPageCopy["appliedAi"];
  pillars: AppliedAiCopy["pillars"]["items"];
  lang: Lang;
}) {
  return (
    <section aria-labelledby="applied-ai-title" className="bg-surface-subtle">
      <div className="container-site grid gap-12 py-[var(--section-y)] lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <SectionHead id="applied-ai-title" title={copy.title} lead={copy.lead} />
          <Button variant="tertiary" href={resolveTarget(appliedAiTarget, lang)} className="mt-8">
            {copy.link}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </div>

        <Reveal className="min-w-0">
          <ul className="divide-y divide-border-default rounded-card border border-border-default bg-white">
            {PILLARS.map(({ id, icon }) => (
              <li key={id} className="flex items-start gap-4 pad-card">
                <IconBox icon={icon} />
                <div className="min-w-0">
                  <p className="font-display text-body-lg font-medium text-text-primary">{pillars[id].title}</p>
                  <p className="mt-1 text-body-sm text-text-secondary">{pillars[id].text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
