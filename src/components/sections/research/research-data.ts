/*
  Dummy research (every study, sample and figure is invented). Neutral data: ids, figures and dates. The finding, the source
  and the labels live in src/content/{en,es}/research.ts, keyed by the same ids. Each study has its own page (route).
*/
import type { RouteKey } from "@/lib/routes";

export type ResearchKind = "report" | "study";

export type ResearchId = "ai-pilots" | "cloud-spend" | "weekly-delivery" | "long-signups";

export type ResearchTopic = "ai" | "cloud" | "product";

export type ResearchItem = {
  id: ResearchId;
  kind: ResearchKind;
  topic: ResearchTopic;
  /** Year and month, "YYYY-MM"; formatted with Intl in the language of the page. */
  date: string;
  value: number;
  /** "percent" renders large next to the number; "outOfTen" renders small. */
  unit: "percent" | "outOfTen";
  /** Reading time in minutes (the home list). */
  minutes: number;
  /** The study's own page. */
  route: RouteKey;
};

export const researchKinds: ReadonlyArray<ResearchKind> = ["report", "study"];
export const researchTopics: ReadonlyArray<ResearchTopic> = ["ai", "cloud", "product"];

export const researchItems: ResearchItem[] = [
  { id: "ai-pilots", kind: "report", topic: "ai", date: "2026-09", value: 62, unit: "percent", minutes: 8, route: "studyAiPilots" },
  { id: "cloud-spend", kind: "study", topic: "cloud", date: "2026-08", value: 41, unit: "percent", minutes: 6, route: "studyCloudSpend" },
  { id: "weekly-delivery", kind: "study", topic: "product", date: "2026-03", value: 54, unit: "percent", minutes: 5, route: "studyWeeklyDelivery" },
  { id: "long-signups", kind: "report", topic: "product", date: "2025-11", value: 7, unit: "outOfTen", minutes: 4, route: "studyLongSignups" },
];
