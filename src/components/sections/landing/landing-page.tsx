import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { Nav } from "@/components/sections/nav/nav";
import { Models } from "@/components/sections/service/models";
import { ProofStrip } from "@/components/sections/service/proof-strip";
import { lines } from "@/components/sections/service/registry";
import { ServiceCards } from "@/components/sections/service/service-cards";
import { getCopy, getLang } from "@/content";
import type { Landing, ServiceLineCopy } from "@/content/schema";
import { anchors } from "@/lib/anchors";
import { href } from "@/lib/routes";
import { LANDINGS } from "./landing-data";

/* Landing by problem: the problem as the hero, the services it combines, the case, the suggested model, CTA. */
export async function LandingPageView({ id }: { id: Landing }) {
  const [lang, copy, common, nav, ...lineCopies] = await Promise.all([
    getLang(),
    getCopy("landings"),
    getCopy("services"),
    getCopy("nav"),
    ...lines.map((l) => getCopy(l.copy)),
  ]);
  // The hub cards of every line, keyed by service route: the title and line each landing card shows.
  const serviceCards: Record<string, { title: string; text: string }> = Object.assign(
    {},
    ...lineCopies.map((c: ServiceLineCopy<string>) => c.hub.cards),
  );
  const page = copy.pages[id];
  const { services, models } = LANDINGS[id];
  return (
    <>
      <Nav route={id} />
      <main id="main">
        <HeroView copy={page.hero} href={href(id, lang, anchors.contact)} />
        <ServiceCards
          title={copy.servicesTitle}
          lead={copy.servicesLead}
          cards={services.map((route) => ({ route, ...serviceCards[route] }))}
          cardLink={common.cardLink}
          lang={lang}
        />
        <ProofStrip label={copy.caseLabel} names={page.proof} />
        <Models ids={models} head={common.models} items={nav.engagement.items} lang={lang} />
        <Cta />
      </main>
      <Footer route={id} />
    </>
  );
}
