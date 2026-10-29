import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Tag } from "@/components/ui/tag";

/*
  Header of a detail page (case, study, article, legal): an optional link back (pages under the breadcrumbs leave it
  out), tags (kind, sector, date), the title as the page h1 and a lead. Left aligned: only the hero and the closing CTA
  are centered. `children` go under the lead.
*/
export function DetailHeader({
  back,
  tags,
  title,
  lead,
  children,
}: {
  back?: { label: string; href: string };
  tags: string[];
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="detail-title" className="border-b border-border-default bg-white">
      <div className="container-site py-[var(--section-y)]">
        {back && (
          <Link
            href={back.href}
            className="group rise mb-8 inline-flex items-center gap-2 rounded-tag text-body-sm font-medium text-text-link transition-colors duration-150 ease-standard hover:text-text-link-hover focus-ring"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-150 ease-standard group-hover:-translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {back.label}
          </Link>
        )}
        <div className="rise flex flex-wrap gap-2" style={{ "--i": 1 } as React.CSSProperties}>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <h1
          id="detail-title"
          className="rise mt-6 max-w-[22ch] font-display text-display-lg font-medium text-balance text-text-primary"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {title}
        </h1>
        <p className="rise mt-6 max-w-[56ch] text-lead text-text-secondary" style={{ "--i": 3 } as React.CSSProperties}>
          {lead}
        </p>
        {children}
      </div>
    </section>
  );
}
