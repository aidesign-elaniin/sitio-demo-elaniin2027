import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { SolutionLinksCard } from "@/components/sections/nav/solutions-menu";
import { solutions } from "@/components/sections/nav/nav-data";
import type { NavCopy, SolutionsCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";

/*
  Solutions, section 2. Intro (one team behind the three lines, the home solutions header) and the three entry blocks:
  the same cards as the solutions menu, with their sublinks, so the menu and the page cannot drift apart.
*/
export function EntryBlocks({ head, items, lang }: { head: SolutionsCopy; items: NavCopy["solutions"]["items"]; lang: Lang }) {
  return (
    <section aria-labelledby="entry-title" className="bg-white">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id="entry-title" title={head.title} lead={head.lead} />
      </div>

      <ul className="container-site grid gap-4 pb-[var(--section-y)] lg:grid-cols-3">
        {solutions.map((solution, i) => (
          <li key={solution.id} className="min-w-0">
            <Reveal delay={i * 0.06} className="h-full">
              <SolutionLinksCard solution={solution} text={items[solution.id]} lang={lang} heading />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
