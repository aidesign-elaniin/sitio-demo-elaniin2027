import { AppWindow, Network, Server, ShieldCheck, type LucideIcon } from "lucide-react";
import type { EngagementModel, Target } from "@/components/sections/nav/nav-data";
import type { PageRoute } from "@/content/schema";
import { routes, type RouteKey } from "@/lib/routes";

/*
  Service lines served by /solutions/[line] (hub) and /solutions/[line]/[service]. Slugs come from the route table
  (the folder segments are the English slugs), so a page exists only when its route exists. A new line needs its
  routes, an entry here, its copy (ServiceLineCopy) and its metadata.
*/
export type ServiceEntry = {
  route: PageRoute;
  /** Engagement models suggested on the page (docs/sitemap-elaniin.md); empty hides the section. */
  models: EngagementModel[];
  /** Where the highlight block links, when it has a link. */
  highlight?: Target;
  /** When "what's included" is a chain (architecture to QA): one icon per item, drawn as a connected flow. */
  flow?: LucideIcon[];
};

export type Line = { route: PageRoute; copy: "software" | "cloud" | "ai"; services: ServiceEntry[] };

export const lines: Line[] = [
  {
    route: "softwareDevelopment",
    copy: "software",
    services: [
      {
        route: "customSoftware",
        models: ["projectDelivery", "dedicatedTeams"],
        highlight: { route: "appliedAi" },
        flow: [Network, Server, AppWindow, ShieldCheck],
      },
      { route: "appModernization", models: ["dedicatedTeams", "projectDelivery"] },
      { route: "mobileApps", models: ["projectDelivery", "staffAugmentation"] },
      { route: "softwareSupport", models: [] },
    ],
  },
  {
    route: "cloud",
    copy: "cloud",
    services: [
      { route: "cloudMigration", models: ["projectDelivery", "dedicatedTeams"] },
      { route: "apiManagement", models: ["projectDelivery", "dedicatedTeams"] },
    ],
  },
  {
    route: "aiSolutions",
    copy: "ai",
    services: [{ route: "aiAgents", models: ["projectDelivery", "dedicatedTeams"] }],
  },
];

/** Last segment of the English path: the folder name of the page. */
export const slugOf = (key: RouteKey): string => routes[key].en.split("/").pop() ?? "";

export const findLine = (slug: string) => lines.find((l) => slugOf(l.route) === slug);

export const findService = (line: Line, slug: string) => line.services.find((s) => slugOf(s.route) === slug);
