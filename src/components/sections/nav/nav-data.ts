import {
  Briefcase,
  Microscope,
  PackageCheck,
  UserPlus,
  Users,
  LibraryBig,
  type LucideIcon,
} from "lucide-react";
import { AiIcon, CloudIcon, SoftwareDevelopmentIcon } from "@/components/ui/icons/elaniin-icons";
import type { AnchorKey } from "@/lib/anchors";
import type { Lang } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";

/*
  Neutral nav data: ids, icons and link targets. Every visible string lives in src/content/{en,es}/nav.ts, keyed by the
  same ids. A null target is a page that does not exist yet and renders "#" (none today).
*/
export type MenuId = "solutions" | "engagement" | "resources";

export type Target = { route: RouteKey; anchor?: AnchorKey } | null;

/** URL of a target in a language. Pending pages (null) stay as "#". */
export const resolveTarget = (target: Target, lang: Lang): string =>
  target ? href(target.route, lang, target.anchor) : "#";

const casesTarget: Target = { route: "useCases" };
const researchTarget: Target = { route: "research" };

/** The Resources hub page: the third row of the Resources menu and the footer column heading. */
export const resourcesTarget: Target = { route: "resources" };

/** The Contact Us page: the nav button, the footer and the closing CTA. */
export const ctaTarget: Target = { route: "contact" };

export type SolutionId = "software" | "ai" | "cloud";

export type Solution = {
  id: SolutionId;
  icon: LucideIcon;
  to: Target;
  links: Target[];
};

export const solutions: Solution[] = [
  {
    id: "software",
    icon: SoftwareDevelopmentIcon,
    to: { route: "softwareDevelopment" },
    links: [{ route: "customSoftware" }, { route: "appModernization" }, { route: "mobileApps" }, { route: "softwareSupport" }],
  },
  { id: "ai", icon: AiIcon, to: { route: "aiSolutions" }, links: [{ route: "aiAgents" }] },
  { id: "cloud", icon: CloudIcon, to: { route: "cloud" }, links: [{ route: "cloudMigration" }, { route: "apiManagement" }] },
];

/** The Solutions hub page, linked from the footer strip of the solutions menu and the footer. */
export const solutionsTarget: Target = { route: "solutions" };

export type EngagementId = "staff" | "dedicated" | "project";
export type ResourceId = "cases" | "research" | "hub";

export type RichItem<Id extends string> = {
  id: Id;
  icon: LucideIcon;
  to: Target;
};

/* The three ways of working together (DESIGN.md components.nav.items). */
export const engagementItems: RichItem<EngagementId>[] = [
  { id: "staff", icon: UserPlus, to: { route: "staffAugmentation" } },
  { id: "dedicated", icon: Users, to: { route: "dedicatedTeams" } },
  { id: "project", icon: PackageCheck, to: { route: "projectDelivery" } },
];

/** The Engagement Models overview page (comparison). */
export const engagementTarget: Target = { route: "engagementModels" };

/* Cases and research have their own pages; the method (Blue Engine) has none on this site, so the third row is the Resources hub. */
export const resourceItems: RichItem<ResourceId>[] = [
  { id: "cases", icon: Briefcase, to: casesTarget },
  { id: "research", icon: Microscope, to: researchTarget },
  { id: "hub", icon: LibraryBig, to: resourcesTarget },
];

export const featuredTarget: Target = casesTarget;

/* The two sample cases of the featured cards of the Resources menu, in order. */
export const featuredCases = ["delivery-tracking", "sme-payments"] as const;

/* Applied AI is the plain link of the bar (the site has no About page). */
export const plainLinks: { id: "appliedAi"; to: Target }[] = [{ id: "appliedAi", to: { route: "appliedAi" } }];

/** Applied AI is mentioned in the footer strip of the solutions menu and in the footer. */
export const appliedAiTarget: Target = plainLinks[0].to;

/* The engagement models keyed by their page (route key), for the pages of this site that show them; `navId` reads the nav copy. */
export type EngagementModel = "staffAugmentation" | "dedicatedTeams" | "projectDelivery";
const modelRoutes: Record<EngagementId, EngagementModel> = {
  staff: "staffAugmentation",
  dedicated: "dedicatedTeams",
  project: "projectDelivery",
};
export const engagementModels = engagementItems.map((i) => ({ id: modelRoutes[i.id], navId: i.id, icon: i.icon }));
