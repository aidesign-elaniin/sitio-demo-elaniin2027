import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import { LOOKS, SolutionSurface } from "@/components/ui/solution-surface";
import { resolveTarget, solutions } from "@/components/sections/nav/nav-data";
import type { AppliedAiCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { SectionHead } from "@/components/ui/section-head";

/*
  Applied AI, section 3. One card per service line with the same look as the nav and the home solutions (shared
  ui/solution-surface), so the three lines read the same everywhere. Each card links to its service page.
*/
export function InServices({ copy, lang }: { copy: AppliedAiCopy["services"]; lang: Lang }) {
  return (
    <section aria-labelledby="services-title" className="border-t border-border-default bg-white">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id="services-title" title={copy.title} lead={copy.lead} />
      </div>

      <ul className="container-site grid gap-4 pb-[var(--section-y)] lg:grid-cols-3">
        {solutions.map((solution, i) => {
          const look = LOOKS[solution.id];
          const text = copy.items[solution.id];
          return (
            <li key={solution.id} className="min-w-0">
              <Reveal delay={i * 0.06} className="h-full">
                <article className={cn("relative isolate flex h-full flex-col gap-8 overflow-hidden rounded-card pad-card", look.card)}>
                  <SolutionSurface look={look} />
                  <header className="flex items-center gap-3">
                    <IconBox icon={solution.icon} tone={look.dark ? "dark" : "light"} />
                    <h3 className={cn("font-display text-body-lg font-medium", look.title)}>{text.name}</h3>
                  </header>
                  <p className={cn("max-w-[40ch] font-display text-lead", look.text)}>{text.text}</p>
                  <Link
                    href={resolveTarget(solution.to, lang)}
                    className={cn(
                      "group mt-auto inline-flex w-fit items-center gap-2 rounded-tag font-display text-button font-medium transition-colors duration-150 ease-standard",
                      look.dark ? "text-text-on-dark-accent hover:text-text-on-dark focus-ring-on-dark" : "text-text-link hover:text-text-link-hover focus-ring",
                    )}
                  >
                    {text.link}
                    <ArrowRight
                      className="size-4 transition-transform duration-150 ease-standard group-hover:translate-x-1"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
