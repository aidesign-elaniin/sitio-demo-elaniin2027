import { placeholderLogos, type PlaceholderLogo } from "@/components/sections/clients/placeholder-logos";
import { industryIds } from "@/components/sections/industries/industry-data";
import type { CaseId, Industry } from "@/content/schema";
import type { RouteKey } from "@/lib/routes";

/*
  Dummy case studies (figures and names are invented). Neutral data: ids, layout, logo, which product scene to show and the
  link. The sector, title and excerpt live in src/content/{en,es}/cases.ts, keyed by the same id. Each case has its
  own page (route). Logos are placeholders. Four cases in two rows that mirror each other: wide + narrow, then narrow + wide
  (7 + 5 and 5 + 7 columns). To add a case: add an entry here, its copy in both languages, and its scene in case-scene.tsx.
*/
export type CaseLayout = "wide" | "narrow";
export type SceneKind = "shipment" | "signup" | "support" | "cloud";

export type CaseStudy = {
  id: CaseId;
  layout: CaseLayout;
  logo: PlaceholderLogo;
  /** Product scene: fills the whole stage and takes the client accent. */
  scene: SceneKind;
  /** Industry for the Use Cases filter (dummy assignment; retail has no closed case yet, per the site map). */
  industry: Industry;
  /** The case's own page. */
  route: RouteKey;
  /** The service page the case links to from its detail page. */
  service: RouteKey;
};

export const cases: CaseStudy[] = [
  { id: "delivery-tracking", layout: "wide", logo: placeholderLogos[0], scene: "shipment", industry: "restaurants", route: "caseDeliveryTracking", service: "customSoftware" },
  { id: "sme-payments", layout: "narrow", logo: placeholderLogos[1], scene: "signup", industry: "financialServices", route: "caseSmePayments", service: "mobileApps" },
  { id: "support-assistant", layout: "narrow", logo: placeholderLogos[2], scene: "support", industry: "financialServices", route: "caseSupportAssistant", service: "aiAgents" },
  { id: "cloud-migration", layout: "wide", logo: placeholderLogos[3], scene: "cloud", industry: "publicSector", route: "caseCloudMigration", service: "cloudMigration" },
];

/** Industries in the order of the site map that have at least one case: the filter shows no empty option. */
export const caseIndustries: Industry[] = industryIds.filter((industry) => cases.some((c) => c.industry === industry));
