import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { resolveTarget } from "@/components/sections/nav/nav-data";
import type { AppliedAiCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { SectionHead } from "@/components/ui/section-head";

const CASES = ["deltaForce", "atlasBuilder"] as const;

/* Applied AI, section 4. Evidence on Inspire Grey: the cases the site map names, as white cards, and a link to all cases. */
export function Evidence({ copy, lang }: { copy: AppliedAiCopy["evidence"]; lang: Lang }) {
  return (
    <section aria-labelledby="evidence-title" className="bg-surface-subtle">
      <div className="container-site flex flex-wrap items-end justify-between gap-8 pt-[var(--section-y)] pb-12">
        <SectionHead id="evidence-title" title={copy.title} lead={copy.lead} />
        <Link
          href={resolveTarget({ route: "home", anchor: "cases" }, lang)}
          className="group inline-flex items-center gap-2 rounded-tag font-display text-button font-medium text-text-link transition-colors duration-150 ease-standard hover:text-text-link-hover focus-ring"
        >
          {copy.all}
          <ArrowRight className="size-4 transition-transform duration-150 ease-standard group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>

      <ul className="container-site grid gap-4 pb-[var(--section-y)] md:grid-cols-2">
        {CASES.map((id, i) => (
          <li key={id} className="min-w-0">
            <Reveal delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-card border border-border-default bg-white pad-card">
                <Tag>{copy.items[id].tag}</Tag>
                <h3 className="font-display text-h3 font-medium text-text-primary">{copy.items[id].title}</h3>
                <p className="max-w-[52ch] text-body text-text-secondary">{copy.items[id].text}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
