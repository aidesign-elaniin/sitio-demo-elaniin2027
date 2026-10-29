import { CircleSlash } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";

/*
  The problem block of a service page as an editorial split (reference: the "How did Miros get started?" split and the
  Bent Lindberg "What I do" list, design-system/elaniin-2027/brief.md): the header stays on the left, sticky under the
  nav from lg, and the pain points run down the right as rows on hairlines. White section.
*/
export function ProblemList({
  id,
  title,
  lead,
  points,
}: {
  id: string;
  title: string;
  lead?: { strong: string; rest: string };
  points: { title: string; text: string }[];
}) {
  return (
    <section aria-labelledby={id} className="bg-white">
      <div className="container-site grid gap-12 py-[var(--section-y)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:self-start">
          <SectionHead id={id} title={title} lead={lead} />
        </div>
        <ul>
          {points.map((point, i) => (
            <li key={point.title} className="border-t border-border-default last:border-b">
              <Reveal delay={i * 0.06} className="flex gap-6 py-8">
                <IconBox icon={CircleSlash} />
                <div>
                  <h3 className="font-display text-h3 font-medium text-text-primary">{point.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-body text-text-secondary">{point.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
