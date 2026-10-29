import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NavCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { engagementItems, engagementTarget, resolveTarget } from "./nav-data";
import { ColumnHeading, RichRow, type Row } from "./resources-menu";

/* Engagement Models: the three ways to hire, as rich rows in three columns, and the footer strip of the solutions menu. */
export function EngagementMenu({ lang, copy, onNavigate }: { lang: Lang; copy: NavCopy; onNavigate?: () => void }) {
  const { heading, items, help } = copy.engagement;
  const rows: Row[] = engagementItems.map((i) => ({ id: i.id, icon: i.icon, ...items[i.id], href: resolveTarget(i.to, lang) }));
  return (
    <div>
      <section className="flex flex-col gap-5 p-8" aria-label={heading}>
        <ColumnHeading>{heading}</ColumnHeading>
        <ul className="grid grid-cols-3 gap-6">
          {rows.map((item) => (
            <RichRow key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </ul>
      </section>

      <div className="flex items-center justify-between gap-6 border-t border-border-default bg-surface-subtle px-8 py-4">
        <p className="text-body-sm text-text-secondary">{help.question}</p>
        <Button variant="tertiary" href={resolveTarget(engagementTarget, lang)}>
          {help.action}
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
