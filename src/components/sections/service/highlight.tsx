import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/ui/section-head";

/* The one page-specific block of a service page (how we work, migration without interruption...): a header and an optional link. */
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
      <div className="container-site py-[var(--section-y)]">
        <SectionHead id="highlight-title" title={title} lead={lead} />
        {link && (
          <Button variant="tertiary" href={link.href} className="mt-8">
            {link.label}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        )}
      </div>
    </section>
  );
}
