import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getCopy, getLang } from "@/content";
import { ResearchExplorer } from "./research-explorer";
import { anchors } from "@/lib/anchors";
import { href } from "@/lib/routes";

/*
  Own research: an Elaniin Black band, a short header and a clean list with filters. The figure is the content of every
  finding and the first thing in each row.
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
            <p className="mt-6 max-w-[60ch] font-display text-lead">
              <strong className="font-medium text-text-on-dark">{copy.lead.strong}</strong>{" "}
              <span className="text-text-on-dark-secondary">{copy.lead.rest}</span>
            </p>
          </div>
          <Link
            href={href("research", lang)}
            className="inline-flex items-center gap-2 rounded-tag font-display text-button font-medium text-text-on-dark-accent transition-colors duration-150 ease-standard hover:text-text-on-dark focus-ring-on-dark"
          >
            {copy.viewAll}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </Reveal>

        <ResearchExplorer copy={copy} lang={lang} />
      </div>
    </section>
  );
}
