import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta/cta";
import { Comparison } from "@/components/sections/engagement/comparison";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { Nav } from "@/components/sections/nav/nav";
import { engagementItems } from "@/components/sections/nav/nav-data";
import { ServiceCards } from "@/components/sections/service/service-cards";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "engagementModels", meta.engagementModels);
}

/* Engagement Models hub (docs/sitemap-elaniin.md 3.13): hero, intro + three blocks (the nav rows), comparison, CTA. */
export default async function EngagementModels() {
  const [lang, copy, nav, common] = await Promise.all([
    getLang(),
    getCopy("engagement"),
    getCopy("nav"),
    getCopy("services"),
  ]);
  const cards = engagementItems.map((m) => ({
    route: m.id,
    title: nav.engagement.items[m.id].title,
    text: nav.engagement.items[m.id].description,
  }));
  return (
    <>
      <Nav route="engagementModels" />
      <main id="main">
        <HeroView copy={copy.hub.hero} href={href("engagementModels", lang, anchors.contact)} />
        <div className="pb-[var(--section-y)]">
          <ServiceCards title={copy.hub.intro.title} lead={copy.hub.intro.lead} cards={cards} cardLink={common.cardLink} lang={lang} />
        </div>
        <Comparison copy={copy.hub.comparison} names={nav.engagement.items} lang={lang} />
        <Cta />
      </main>
      <Footer route="engagementModels" />
    </>
  );
}
