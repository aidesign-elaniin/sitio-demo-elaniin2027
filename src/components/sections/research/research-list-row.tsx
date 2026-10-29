import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ResearchCopy } from "@/content/schema";
import { formatMonth } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { fill } from "@/lib/template";
import type { ResearchItem } from "./research-data";

/*
  One study in the list of the home (DESIGN.md components.research-grid). Reading order: the title, then the label, the
  date and the reading time. The figure is part of the title, not a big number of its own. The whole row is one link
  (after:absolute on the title's link).
*/
export function ResearchListRow({ item, copy, lang }: { item: ResearchItem; copy: ResearchCopy; lang: Lang }) {
  const text = copy.items[item.id];
  const figure = item.unit === "percent" ? `${item.value}${copy.units.percent}` : `${item.value} ${copy.units.outOfTen}`;
  return (
    <article className="group relative grid items-center gap-x-8 gap-y-4 border-b border-border-on-dark px-2 py-8 transition-colors duration-150 ease-standard hover:bg-white/[0.04] md:px-4 lg:grid-cols-[1fr_14rem_1.25rem]">
      <h3 className="max-w-[40ch] font-display text-h3 font-medium text-text-on-dark">
        <Link href={href(item.route, lang)} className="rounded-tag after:absolute after:inset-0 focus-ring-on-dark">
          {figure} {text.finding}
        </Link>
      </h3>

      <div className="flex flex-col items-start gap-3">
        <span className="mono-label inline-flex h-5 items-center rounded-tag border border-border-on-dark-strong px-1.5 text-tag-sm leading-none text-text-on-dark-secondary">
          {copy.kinds[item.kind]}
        </span>
        <p className="mono-label text-tag-sm text-text-on-dark-muted">
          {formatMonth(lang, item.date)} · {fill(copy.readTime, { n: String(item.minutes) })}
        </p>
      </div>

      <ArrowRight
        className="size-5 text-text-on-dark-accent transition-transform duration-150 ease-standard group-hover:translate-x-1 max-lg:hidden"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </article>
  );
}
