import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";

/*
  Numbered steps, one row each. The number is inline in the title ("1. ..."), never a big decorative figure or an
  eyebrow (DESIGN.md section 3); it is the <ol> order made visible, so screen readers get it from the list. Rows split by hairlines; Inspire Grey section.
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
              className="grid items-baseline gap-x-8 gap-y-3 py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            >
              <h3 className="font-display text-h3 font-medium text-text-primary">
                {i + 1}. {step.title}
              </h3>
              <p className="max-w-[52ch] text-body text-text-secondary">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
