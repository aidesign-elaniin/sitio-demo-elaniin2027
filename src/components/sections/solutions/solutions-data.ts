import type { LucideIcon } from "lucide-react";
import { solutions as navSolutions } from "@/components/sections/nav/nav-data";
import type { SolutionsCopy } from "@/content/schema";
import { formatNumber, formatPercent } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";

/*
  Neutral data of the three solution lines. Texts live in src/content/{en,es}/solutions.ts, keyed by the same id; the
  label of each metric is matched by position. Each line links to its hub page (route).
*/
export type SolutionId = "software" | "ai" | "cloud";

/** A figure, kept numeric so it is formatted with Intl in the language of the page. */
export type Metric =
  { kind: "minutes"; value: number } | { kind: "percent"; value: number; decimals?: number; signed?: boolean };

export type SolutionItem = {
  id: SolutionId;
  /** The icon is the one the nav uses for the same solution. */
  icon: LucideIcon;
  metrics: Metric[];
  /** The hub page of the line. */
  route: RouteKey;
};

const navIcon = (id: SolutionId) => navSolutions.find((n) => n.id === id)!.icon;

export const solutionItems: SolutionItem[] = [
  {
    id: "ai",
    icon: navIcon("ai"),
    metrics: [
      { kind: "percent", value: 0.35, signed: true },
      { kind: "percent", value: 1 },
    ],
    route: "softwareDevelopment",
  },
  {
    id: "software",
    icon: navIcon("software"),
    metrics: [
      { kind: "minutes", value: 14 },
      { kind: "percent", value: 0.82 },
    ],
    route: "aiSolutions",
  },
  {
    id: "cloud",
    icon: navIcon("cloud"),
    metrics: [
      { kind: "percent", value: 0.9998, decimals: 2 },
      { kind: "percent", value: -0.18, signed: true },
    ],
    route: "cloud",
  },
];

/** "14 min", "82%" / "82 %", "+35%": the figure of a metric in the language of the page. */
export function formatMetric(lang: Lang, metric: Metric, units: SolutionsCopy["units"]): string {
  return metric.kind === "minutes"
    ? `${formatNumber(lang, metric.value)} ${units.minutes}`
    : formatPercent(lang, metric.value, { decimals: metric.decimals, signed: metric.signed });
}
