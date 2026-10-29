import {
  BookOpen,
  Briefcase,
  ChartColumn,
  Cloud,
  Code,
  Microscope,
  Newspaper,
  PackageCheck,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { AnchorKey } from "@/lib/anchors";
import type { Lang } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";

/*
  Neutral nav data: ids, icons and link targets. Every visible string lives in src/content/{en,es}/nav.ts, keyed by the
  same ids. Dummy content: a null target is a page that does not exist yet and renders "#".
  The structure follows the primary nav of docs/sitemap-elaniin.md: Solutions, Engagement Models, Applied AI, Resources
  and Contact Us (the button).
*/
export type MenuId = "solutions" | "engagement" | "resources";
export type PlainId = "appliedAi";

export type Target = { route: RouteKey; anchor?: AnchorKey } | null;

/** URL of a target in a language. Pending pages (null) stay as "#". */
export const resolveTarget = (target: Target, lang: Lang): string => (target ? href(target.route, lang, target.anchor) : "#");

const casesTarget: Target = { route: "useCases" };
const researchTarget: Target = { route: "research" };

/** The Resources hub page, linked from the footer column heading. */
export const resourcesTarget: Target = { route: "resources" };

/** The Contact Us page: the nav button, the footer and the closing CTA. */
export const ctaTarget: Target = { route: "contact" };

/** Order of the bar, desktop and mobile. Applied AI is a plain link between the menus (brand differentiator). */
export const navOrder: ({ kind: "menu"; id: MenuId } | { kind: "link"; id: PlainId })[] = [
  { kind: "menu", id: "solutions" },
  { kind: "menu", id: "engagement" },
  { kind: "link", id: "appliedAi" },
  { kind: "menu", id: "resources" },
];

export const menuOrder: MenuId[] = navOrder.flatMap((item) => (item.kind === "menu" ? [item.id] : []));

export const plainLinks: { id: PlainId; to: Target }[] = [{ id: "appliedAi", to: { route: "appliedAi" } }];

export type SolutionId = "software" | "ai" | "cloud";

export type Solution = { id: SolutionId; icon: LucideIcon; to: Target; links: Target[] };

/* Sublinks per sitemap: Software Development 4, AI Solutions 1, Cloud 2. */
export const solutions: Solution[] = [
  {
    id: "software",
    icon: Code,
    to: { route: "softwareDevelopment" },
    links: [{ route: "customSoftware" }, { route: "appModernization" }, { route: "mobileApps" }, { route: "softwareSupport" }],
  },
  { id: "ai", icon: Sparkles, to: { route: "aiSolutions" }, links: [{ route: "aiAgents" }] },
  {
    id: "cloud",
    icon: Cloud,
    to: { route: "cloud" },
    links: [{ route: "cloudMigration" }, { route: "apiManagement" }],
  },
];

/** The Solutions hub page, linked from the footer strip of the solutions menu and the footer. */
export const solutionsTarget: Target = { route: "solutions" };

/** Applied AI is mentioned in the footer strip of the solutions menu. */
export const appliedAiTarget: Target = plainLinks[0].to;

export type EngagementId = "staffAugmentation" | "dedicatedTeams" | "projectDelivery";
export type ExploreId = "useCases" | "research";
export type LatestId = "insights" | "playbook" | "aiReport";
export type FeaturedId = "logistics" | "fintech" | "ai";

export type RichItem<Id extends string> = { id: Id; icon: LucideIcon; to: Target };

export const engagementItems: RichItem<EngagementId>[] = [
  { id: "staffAugmentation", icon: UserPlus, to: { route: "staffAugmentation" } },
  { id: "dedicatedTeams", icon: Users, to: { route: "dedicatedTeams" } },
  { id: "projectDelivery", icon: PackageCheck, to: { route: "projectDelivery" } },
];

/** The Engagement Models overview page (comparison). */
export const engagementTarget: Target = { route: "engagementModels" };

export const exploreItems: RichItem<ExploreId>[] = [
  { id: "useCases", icon: Briefcase, to: casesTarget },
  { id: "research", icon: Microscope, to: researchTarget },
];

export const latestItems: RichItem<LatestId>[] = [
  { id: "insights", icon: Newspaper, to: { route: "articleInsights" } },
  { id: "playbook", icon: BookOpen, to: { route: "articlePlaybook" } },
  { id: "aiReport", icon: ChartColumn, to: { route: "articleAiReport" } },
];

export const featuredTarget: Target = casesTarget;
export const featuredIds: FeaturedId[] = ["logistics", "fintech", "ai"];
