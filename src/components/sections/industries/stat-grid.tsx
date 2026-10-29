import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import type { Lang } from "@/lib/i18n";

/* Figures in the hairline grid: a large number that counts up once on screen, and its label. White section. */
export function StatGrid({
  id,
  title,
  lead,
  stats,
  lang,
}: {
  id: string;
  title: string;
  lead: { strong: string; rest: string };
  stats: { value: number; label: string }[];
  lang: Lang;
}) {
  return (
    <section aria-labelledby={id} className="bg-white pb-[var(--section-y)]">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id={id} title={title} lead={lead} />
      </div>
      <div className="container-site">
        <dl className="grid gap-px border border-border-default bg-border-default md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="flex min-w-0 flex-col-reverse gap-2 bg-white pad-card">
              <dt className="text-body text-text-secondary">{stat.label}</dt>
              <dd className="font-display text-display-lg font-medium text-text-primary tabular-nums">
                <CountUp lang={lang} to={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
