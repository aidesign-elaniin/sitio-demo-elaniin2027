import type { EngagementId } from "@/components/sections/nav/nav-data";
import type { Landing } from "@/content/schema";
import type { RouteKey } from "@/lib/routes";

/*
  What each landing combines (docs/sitemap-elaniin.md 3.27 to 3.29). Cases come from the site map; the service mix and
  the suggested models are a proposal to validate with the team.
*/
export const LANDINGS: Record<Landing, { services: RouteKey[]; models: EngagementId[] }> = {
  scaleTeam: { services: ["customSoftware", "mobileApps", "softwareSupport"], models: ["staffAugmentation", "dedicatedTeams"] },
  modernizeSystem: { services: ["appModernization", "cloudMigration", "apiManagement"], models: ["dedicatedTeams", "projectDelivery"] },
  deliverGrowth: { services: ["customSoftware", "mobileApps", "aiAgents"], models: ["projectDelivery"] },
};
