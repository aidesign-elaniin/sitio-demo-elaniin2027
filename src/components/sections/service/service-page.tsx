import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { Nav } from "@/components/sections/nav/nav";
import { resolveTarget, type EngagementId, type Target } from "@/components/sections/nav/nav-data";
import { getCopy, getLang } from "@/content";
import type { ServicePageCopy } from "@/content/schema";
import { anchors } from "@/lib/anchors";
import { href, type RouteKey } from "@/lib/routes";
import type { LucideIcon } from "lucide-react";
import { BuildFlow } from "./build-flow";
import { FeatureGrid } from "./feature-grid";
import { Highlight } from "./highlight";
import { Models } from "./models";
import { ProblemList } from "./problem-list";
import { ProofStrip } from "./proof-strip";

/*
  Service page template (docs/sitemap-elaniin.md 3.4 to 3.16): hero, problem, what's included / how it works, the
  page-specific highlight, proof strip, suggested models, CTA. Sections a page's copy does not have are left out.
  Used by the service line pages and the engagement model pages.
*/
export async function ServicePageView({
  route,
  copy,
  models = [],
  highlight,
  flow,
}: {
  route: RouteKey;
  copy: ServicePageCopy;
  models?: EngagementId[];
  highlight?: Target;
  flow?: LucideIcon[];
}) {
  const [lang, common, nav] = await Promise.all([getLang(), getCopy("services"), getCopy("nav")]);
  return (
    <>
      <Nav route={route} />
      <main id="main">
        <HeroView copy={copy.hero} href={href(route, lang, anchors.contact)} />
        {copy.problem && (
          <ProblemList id="problem-title" title={copy.problem.title} lead={copy.problem.lead} points={copy.problem.points} />
        )}
        {flow ? (
          <BuildFlow
            id="includes-title"
            title={copy.includes.title}
            lead={copy.includes.lead}
            items={copy.includes.items}
            icons={flow}
          />
        ) : (
          <FeatureGrid
            id="includes-title"
            title={copy.includes.title}
            lead={copy.includes.lead}
            items={copy.includes.items}
            tone="subtle"
          />
        )}
        {copy.highlight && (
          <Highlight
            title={copy.highlight.title}
            lead={copy.highlight.lead}
            link={copy.highlight.link && highlight ? { label: copy.highlight.link, href: resolveTarget(highlight, lang) } : undefined}
          />
        )}
        {copy.proof && copy.proof.length > 0 && <ProofStrip label={common.proofLabel} names={copy.proof} />}
        {models.length > 0 && <Models ids={models} head={common.models} items={nav.engagement.items} lang={lang} />}
        <Cta />
      </main>
      <Footer route={route} />
    </>
  );
}
