import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBox } from "@/components/ui/icon-box";
import { cn } from "@/lib/cn";
import { LOOKS, SolutionSurface } from "@/components/ui/solution-surface";
import type { NavCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { appliedAiTarget, resolveTarget, solutions, solutionsTarget, type Solution } from "./nav-data";

/*
  Menu type 2: the three solution lines as three inset cards. Each one has its own character through a surface, a
  pattern and an accent (DESIGN.md mega-menu.solution-cards). The looks live in ui/solution-surface and are shared with
  the solutions section. The card itself is shared with the Solutions page.
*/
export function SolutionsMenu({ lang, copy }: { lang: Lang; copy: NavCopy }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 p-2">
        {solutions.map((solution) => (
          <SolutionLinksCard key={solution.id} solution={solution} text={copy.solutions.items[solution.id]} lang={lang} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-border-default bg-surface-subtle px-8 py-4">
        <p className="text-body-sm text-text-secondary">{copy.solutions.help.question}</p>
        <div className="flex shrink-0 items-center gap-6">
          <Button variant="tertiary" href={resolveTarget(solutionsTarget, lang)}>
            {copy.solutions.all}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
          <Button variant="tertiary" href={resolveTarget(appliedAiTarget, lang)}>
            {copy.solutions.help.action}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/** One solution line: icon, title, description and its sublinks on a hairline. `heading` renders the title as an h3 (pages). */
export function SolutionLinksCard({
  solution,
  text,
  lang,
  heading = false,
}: {
  solution: Solution;
  text: NavCopy["solutions"]["items"][Solution["id"]];
  lang: Lang;
  heading?: boolean;
}) {
  const look = LOOKS[solution.id];
  const Title = heading ? "h3" : "span";
  return (
    <div className={cn("relative isolate flex h-full flex-col gap-6 overflow-hidden rounded-card p-8", look.card)}>
      <SolutionSurface look={look} />

      <Link href={resolveTarget(solution.to, lang)} className="group/head flex flex-col gap-5 rounded-menu focus-ring">
        <IconBox icon={solution.icon} tone={look.dark ? "dark" : "light"} />
        <div className="flex flex-col gap-2">
          <Title className={cn("font-display text-h3 font-medium", look.title)}>{text.title}</Title>
          <span className={cn("text-body-sm", look.text)}>{text.description}</span>
        </div>
      </Link>

      <ul className={cn("mt-auto flex flex-col border-t pt-2", look.rule)}>
        {solution.links.map((target, i) => (
          <li key={i}>
            <Link
              href={resolveTarget(target, lang)}
              className={cn(
                "group/link -mx-2 flex items-center justify-between rounded-tag px-2 py-2 text-body-sm transition-colors duration-150 ease-standard focus-ring",
                look.dark ? "text-text-on-dark" : "text-text-primary",
                look.linkHover,
              )}
            >
              {text.links[i]}
              <ArrowRight
                className={cn(
                  "size-4 -translate-x-1 opacity-0 transition-all duration-150 ease-standard group-hover/link:translate-x-0 group-hover/link:opacity-100",
                  look.arrow,
                )}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
