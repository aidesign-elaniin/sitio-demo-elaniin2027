import { engagementItems, type Target } from "@/components/sections/nav/nav-data";
import type { LucideIcon } from "lucide-react";

/*
  Ids and targets of the three engagement models. Every visible string lives in src/content/{en,es}/engagement.ts, in
  this same order. Each model links to its own page. Each model owns one node of the globe, in this order.
*/
export type ModelId = "staff" | "dedicated" | "project";

/* The same icons and pages as the engagement menu of the bar, so a model looks and links the same everywhere. */
export const engagementModels: { id: ModelId; icon: LucideIcon; to: Target }[] = engagementItems.map(({ id, icon, to }) => ({ id, icon, to }));
