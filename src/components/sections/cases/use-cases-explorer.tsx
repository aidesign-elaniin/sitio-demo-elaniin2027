"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { CasesCopy, Industry, ResourcesCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { CaseCard } from "./case-card";
import { caseIndustries, cases } from "./cases-data";

/*
  Use Cases page: the home case cards in an even two-column hairline grid, with filter tabs by industry (the research
  filter, on light). Filtering is client state; only industries with at least one case get a tab.
*/
type Filter = "all" | Industry;

export function UseCasesExplorer({
  copy,
  labels,
  lang,
}: {
  copy: CasesCopy;
  labels: ResourcesCopy["useCases"];
  lang: Lang;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = cases.filter((c) => filter === "all" || c.industry === filter);

  return (
    <div>
      <div className="container-site flex flex-wrap gap-x-8 gap-y-2 pb-10" role="group" aria-label={labels.filterLabel}>
        {(["all", ...caseIndustries] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "cursor-pointer rounded-tag mono-label text-body-sm transition-colors duration-150 ease-standard focus-ring",
              filter === f
                ? "text-text-primary underline decoration-1 underline-offset-[6px]"
                : "text-text-muted hover:text-text-primary",
            )}
          >
            {f === "all" ? labels.all : labels.industries[f]}
          </button>
        ))}
      </div>

      <div className="border-y border-border-default">
        <div className="container-site">
          <ul key={filter} className="grid gap-px border-x border-border-default bg-border-default md:grid-cols-2">
            {shown.map((item, i) => (
              <li key={item.id} className="min-w-0 bg-white">
                <Reveal className="h-full" delay={(i % 2) * 0.08}>
                  <CaseCard item={item} copy={copy} lang={lang} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
