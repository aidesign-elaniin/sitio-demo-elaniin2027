"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/reveal";
import type { ResearchCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { researchItems, researchKinds, researchTopics, type ResearchKind, type ResearchTopic } from "./research-data";
import { ResearchRow } from "./research-row";

/*
  The research list with filter tabs, by kind (home) or by topic (Research page). Filtering is client state (no
  navigation). The rows remount when the filter changes, so the figures count up again.
*/
type Filter = "all" | ResearchKind | ResearchTopic;

export function ResearchExplorer({ copy, lang, by = "kind" }: { copy: ResearchCopy; lang: Lang; by?: "kind" | "topic" }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: ReadonlyArray<Filter> = ["all", ...(by === "kind" ? researchKinds : researchTopics)];
  const labels: Record<string, string> = by === "kind" ? copy.kinds : copy.topics;
  const shown = researchItems.filter((item) => filter === "all" || item[by] === filter);

  return (
    <div>
      <div
        className="flex flex-wrap gap-x-8 gap-y-2 pb-10"
        role="group"
        aria-label={by === "kind" ? copy.filterLabel : copy.topicFilterLabel}
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "cursor-pointer rounded-tag mono-label text-body-sm transition-colors duration-150 ease-standard focus-ring-on-dark",
              filter === f
                ? "text-text-on-dark underline decoration-1 underline-offset-[6px]"
                : "text-text-on-dark-muted hover:text-text-on-dark",
            )}
          >
            {f === "all" ? copy.all : labels[f]}
          </button>
        ))}
      </div>

      <div key={filter} className="border-t border-border-on-dark">
        {shown.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.06}>
            <ResearchRow item={item} copy={copy} lang={lang} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
