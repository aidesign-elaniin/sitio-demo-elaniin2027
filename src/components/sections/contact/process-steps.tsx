import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";

/*
  Numbered steps, one row each (reference: the "How it works 01-04" rows of Financial Match and Ascend,
  design-system/elaniin-2027/brief.md). The number sits in the row, beside the title, never above it (no eyebrows); it is
  the <ol> order made visible, so screen readers get it from the list. Rows split by hairlines; Inspire Grey section.
*/
export function ProcessSteps({
  id,
  title,
  lead,
  steps,
}: {
  id: string;
  title: string;
  lead?: { strong: string; rest: string };
  steps: { title: string; text: string }[];
}) {
  return (
    <section aria-labelledby={id} className="bg-surface-subtle pb-[var(--section-y)]">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id={id} title={title} lead={lead} />
      </div>

      <ol className="container-site">
        {steps.map((step, i) => (
          <li key={step.title} className="border-t border-border-default last:border-b">
            <Reveal
              delay={i * 0.06}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-6 gap-y-3 py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,4fr)_minmax(0,6fr)] md:gap-x-8"
            >
              <span aria-hidden="true" className="font-display text-display-xl font-medium text-text-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-h3 font-medium text-text-primary">{step.title}</h3>
              <p className="col-start-2 max-w-[52ch] text-body text-text-secondary md:col-start-auto">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
