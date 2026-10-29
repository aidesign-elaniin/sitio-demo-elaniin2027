import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/*
  The one page-specific block of a service page (how we work, migration without interruption...), also the closing
  note of case and study pages. Editorial split (reference: the Bent Lindberg and Merigrove statements,
  design-system/elaniin-2027/brief.md): a display title on the left, the lead and the optional link on the right,
  under a top hairline.
*/
export function Highlight({
  title,
  lead,
  link,
}: {
  title: string;
  lead: { strong: string; rest: string };
  link?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="highlight-title" className="border-b border-border-default bg-white">
      <Reveal className="container-site grid gap-8 py-[var(--section-y)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <h2
          id="highlight-title"
          className="max-w-[16ch] border-t border-border-strong pt-6 font-display text-display-lg font-medium text-balance text-text-primary"
        >
          {title}
        </h2>
        <div className="lg:border-t lg:border-border-default lg:pt-6">
          <p className="max-w-[48ch] font-display text-h3 font-medium text-balance">
            <span className="text-text-primary">{lead.strong}</span>
            {lead.rest && <span className="text-text-secondary"> {lead.rest}</span>}
          </p>
          {link && (
            <Button variant="tertiary" href={link.href} className="mt-8">
              {link.label}
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
