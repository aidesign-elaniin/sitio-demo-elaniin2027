import type { Target } from "@/components/sections/nav/nav-data";

/*
  Sectors, items and targets of the routes. Every visible string lives in src/content/{en,es}/audience-routes.ts, in this same
  order. A null target is a page that does not exist yet and renders "#". `visual` is the isometric resource of the item:
  the six items reuse the isometrics that exist until the new ones are built (DESIGN.md components.audience-routes.visuals-interim).
*/
export type Sector = "private" | "public";
export type RouteId =
  | "staff"
  | "modernization"
  | "software"
  | "critical"
  | "impact"
  | "availability";
export type VisualId =
  | "staff"
  | "modernization"
  | "public"
  | "software"
  | "critical"
  | "impact"
  | "availability";

export const DEFAULT_SECTOR: Sector = "private";

export const audienceRouteItems: Record<
  Sector,
  { id: RouteId; visual: VisualId; to: Target }[]
> = {
  private: [
    { id: "staff", visual: "staff", to: { route: "scaleTeam" } },
    { id: "modernization", visual: "modernization", to: { route: "modernizeSystem" } },
    { id: "software", visual: "software", to: { route: "deliverGrowth" } },
  ],
  public: [
    { id: "critical", visual: "critical", to: { route: "customSoftware" } },
    { id: "impact", visual: "impact", to: { route: "publicSector" } },
    { id: "availability", visual: "availability", to: { route: "cloud" } },
  ],
};
