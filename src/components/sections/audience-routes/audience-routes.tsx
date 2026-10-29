import { SectionGlow } from "@/components/ui/section-glow";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { href } from "@/lib/routes";
import { resolveTarget } from "@/components/sections/nav/nav-data";
import { audienceRouteItems } from "./audience-routes-data";
import { RoutesBrowser } from "./routes-browser";

/*
  Section 04. Header with the sector toggle, then three routes as a hairline grid that change with the sector (DESIGN.md
  components.audience-routes). The links are resolved here and the interactive part is a client leaf.
*/
export async function AudienceRoutes() {
  const [lang, copy] = await Promise.all([
    getLang(),
    getCopy("audienceRoutes"),
  ]);
  const hrefs = Object.fromEntries(
    Object.values(audienceRouteItems)
      .flat()
      .map((route) => [route.id, resolveTarget(route.to, lang)]),
  );

  return (
    <section
      id={anchors.routes}
      aria-labelledby="routes-title"
      className="relative isolate overflow-hidden bg-white"
    >
      <SectionGlow />
      <RoutesBrowser
        copy={copy}
        hrefs={hrefs}
        casesHref={href("home", lang, anchors.cases)}
      />
    </section>
  );
}
