import { industryIds } from "@/components/sections/industries/industry-data";
import {
  ctaTarget,
  engagementItems,
  engagementTarget,
  exploreItems,
  plainLinks,
  resourcesTarget,
  solutions,
  solutionsTarget,
  type Target,
} from "@/components/sections/nav/nav-data";

/* Hub page of each column. A column heading is a link only once its hub exists (non-null). */
export const footerHeadings: Target[] = [solutionsTarget, engagementTarget, { route: "industries" }, resourcesTarget];

/*
  Link targets of the footer columns, in the order of the labels in src/content/{en,es}/footer.ts. Structure from
  docs/sitemap-elaniin.md: the primary nav plus Industries (out of the nav, reachable from here). Pending pages are null ("#").
*/
export const footerColumns: Target[][] = [
  // Soluciones: the three lines (same targets as the nav cards) + Applied AI
  [...solutions.map((s) => s.to), plainLinks[0].to],
  // Modelos de contratación
  engagementItems.map((i) => i.to),
  // Industrias: public sector, financial services, restaurants, retail (their ids are their route keys)
  industryIds.map((route) => ({ route })),
  // Recursos: use cases, research, contact
  [...exploreItems.map((i) => i.to), ctaTarget],
];

/** The legal row, in the order of its labels: Legal, Privacy, Status, Report an issue. */
export const legalRoutes = ["legal", "privacy", "status", "reportIssue"] as const;
