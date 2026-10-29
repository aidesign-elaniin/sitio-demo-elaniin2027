import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import type { Lang } from "@/lib/i18n";

/*
  Figures band (reference: Miros "by the stats" and Metrium's figure row, design-system/elaniin-2027/brief.md): an
  Excellence Blue band, header on the left, then one row of cells split by hairlines. Each figure is display size with
  its label beside it, not under it. The number counts up once on screen.
*/
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
    <section aria-labelledby={id} className="bg-surface-dark py-[var(--section-y)] text-text-on-dark">
      <div className="container-site">
        <Reveal>
          <h2 id={id} className="max-w-[20ch] font-display text-h1 font-medium text-balance">
            {title}
          </h2>
          <p className="mt-6 max-w-[60ch] font-display text-lead">
            <strong className="font-medium">{lead.strong}</strong>{" "}
            <span className="text-text-on-dark-secondary">{lead.rest}</span>
          </p>
        </Reveal>

        <dl className="mt-16 grid border-t border-border-on-dark md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className="flex min-w-0 items-end gap-4 border-b border-border-on-dark py-8 md:border-b-0 md:px-8 md:first:pl-0 md:not-first:border-l"
            >
              <dt className="order-last max-w-[14ch] pb-2 text-body-sm text-text-on-dark-secondary">{stat.label}</dt>
              <dd className="font-display text-display-xl font-medium tabular-nums">
                <CountUp lang={lang} to={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
