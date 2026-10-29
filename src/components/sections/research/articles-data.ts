import type { ArticleId } from "@/content/schema";
import type { RouteKey } from "@/lib/routes";

/* Articles of the Resources menu ("Latest articles"). Titles and descriptions live in the nav copy, bodies in details. */
export const articles: { id: ArticleId; route: RouteKey; date: string }[] = [
  { id: "insights", route: "articleInsights", date: "2026-10" },
  { id: "playbook", route: "articlePlaybook", date: "2026-09" },
  { id: "aiReport", route: "articleAiReport", date: "2026-08" },
];
