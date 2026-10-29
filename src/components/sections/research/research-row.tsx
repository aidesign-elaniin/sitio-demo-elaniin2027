import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import type { ResearchCopy } from "@/content/schema";
import { formatMonth, formatNumber } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import type { ResearchItem } from "./research-data";

/* Spoken form of the figure, for screen readers (the visual number is aria-hidden). */
const spokenValue = (item: ResearchItem, copy: ResearchCopy, lang: Lang) =>
  copy.spoken[item.unit].replace("{n}", formatNumber(lang, item.value));

/*
  One finding in the list. Reading order: the figure, the name (the finding sentence, which completes the figure),
  then the kind and date. The kind is an outlined tag, so no dot is needed as a separator. The whole row is one link
  (after:absolute on the name's link).
*/
export function ResearchRow({ item, copy, lang }: { item: ResearchItem; copy: ResearchCopy; lang: Lang }) {
  const text = copy.items[item.id];
  return (
    <article className="group relative grid items-center gap-x-8 gap-y-3 border-b border-border-on-dark px-2 py-8 transition-colors duration-150 ease-standard hover:bg-white/[0.04] md:grid-cols-[11rem_1fr_12rem_1.25rem] md:px-4">
      <p
        aria-hidden="true"
        className="font-display text-h1 font-medium tracking-tight text-text-on-dark tabular-nums"
      >
        <CountUp to={item.value} lang={lang} />
        <span className={item.unit === "outOfTen" ? "ml-2 text-h3 text-text-on-dark-secondary" : "text-text-on-dark-secondary"}>
          {copy.units[item.unit]}
        </span>
      </p>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lead text-text-on-dark">
          <span className="sr-only">{spokenValue(item, copy, lang)} </span>
          <Link href={href(item.route, lang)} className="rounded-tag after:absolute after:inset-0 focus-ring-on-dark">
            {text.finding}
          </Link>
        </h3>
        <p className="font-text text-body-sm text-text-on-dark-muted">{text.source}</p>
      </div>

      <p className="mono-label flex items-center gap-3 text-caption text-text-on-dark-muted">
        <span className="inline-flex h-6 items-center rounded-tag border border-border-on-dark-strong px-2 leading-none text-text-on-dark-secondary">
          {copy.kinds[item.kind]}
        </span>
        {formatMonth(lang, item.date)}
      </p>

      <ArrowRight
        className="size-5 text-text-on-dark-accent transition-transform duration-150 ease-standard group-hover:translate-x-1 max-md:hidden"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </article>
  );
}
