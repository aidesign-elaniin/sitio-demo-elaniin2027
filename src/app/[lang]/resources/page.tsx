import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { Nav } from "@/components/sections/nav/nav";
import { ServiceCards } from "@/components/sections/service/service-cards";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "resources", meta.resources);
}

/* Resources hub (docs/sitemap-elaniin.md 3.18): hero, intro + two blocks (Use Cases, Research), CTA. */
export default async function Resources() {
  const [lang, copy, common] = await Promise.all([getLang(), getCopy("resources"), getCopy("services")]);
  const cards = (["useCases", "research"] as const).map((route) => ({ route, ...copy.hub.cards[route] }));
  return (
    <>
      <Nav route="resources" />
      <main id="main">
        <HeroView copy={copy.hub.hero} href={href("resources", lang, anchors.contact)} />
        <div className="pb-[var(--section-y)]">
          <ServiceCards title={copy.hub.intro.title} lead={copy.hub.intro.lead} cards={cards} cardLink={common.cardLink} lang={lang} />
        </div>
        <Cta />
      </main>
      <Footer route="resources" />
    </>
  );
}
