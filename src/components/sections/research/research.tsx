import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getCopy, getLang } from "@/content";
import { researchItems } from "./research-data";
import { ResearchListRow } from "./research-list-row";
import { anchors } from "@/lib/anchors";
import { href } from "@/lib/routes";

/*
  Our research (the latest of the blog): an Elaniin Black band, a short header with the link to the blog and a clean list of three
  articles. Each row: the title, then the label, the date and the reading time.
*/
export async function Research() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("research")]);
  return (
    <section
      id={anchors.research}
      data-nav-theme="black"
      aria-labelledby="research-title"
      className="scroll-mt-16 bg-surface-dark-alt text-text-on-dark"
    >
      <div className="container-site py-[var(--section-y)]">
        <Reveal className="flex flex-wrap items-end justify-between gap-8 pb-14">
          <div>
            <h2
              id="research-title"
              className="max-w-[20ch] font-display text-h1 font-medium text-balance text-text-on-dark"
            >
              {copy.title}
            </h2>
            <p className="mt-6 max-w-[60ch] text-lead text-text-on-dark-secondary">{copy.lead.strong} {copy.lead.rest}</p>
          </div>
          <Link
            href={href("research", lang)}
            className="inline-flex items-center gap-2 rounded-tag font-display text-button font-medium text-text-on-dark-accent transition-colors duration-150 ease-standard hover:text-text-on-dark focus-ring-on-dark"
          >
            {copy.viewAll}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="border-t border-border-on-dark">
          {researchItems.slice(0, 3).map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <ResearchListRow item={item} copy={copy} lang={lang} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
