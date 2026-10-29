import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { industryIds } from "@/components/sections/industries/industry-data";
import { StatGrid } from "@/components/sections/industries/stat-grid";
import { Nav } from "@/components/sections/nav/nav";
import { engagementItems } from "@/components/sections/nav/nav-data";
import { ProofStrip } from "@/components/sections/service/proof-strip";
import { lines } from "@/components/sections/service/registry";
import { ServiceCards } from "@/components/sections/service/service-cards";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "industries", meta.industries);
}

/*
  Industries hub (docs/sitemap-elaniin.md 3.22): hero, intro + one card per industry, stats, certifications, CTA.
  The stats are counted from the site's own data, so they cannot drift from what the site offers.
*/
export default async function Industries() {
  const [lang, copy, common] = await Promise.all([getLang(), getCopy("industries"), getCopy("services")]);
  const { hub } = copy;
  const cards = industryIds.map((id) => ({ route: id, ...hub.cards[id] }));
  const stats = [
    { value: industryIds.length, label: hub.stats.labels.industries },
    { value: lines.flatMap((l) => l.services).length, label: hub.stats.labels.services },
    { value: engagementItems.length, label: hub.stats.labels.models },
  ];
  return (
    <>
      <Nav route="industries" />
      <main id="main">
        <HeroView copy={hub.hero} href={href("industries", lang, anchors.contact)} />
        <ServiceCards title={hub.intro.title} lead={hub.intro.lead} cards={cards} cardLink={common.cardLink} lang={lang} />
        <StatGrid id="stats-title" title={hub.stats.title} lead={hub.stats.lead} stats={stats} lang={lang} />
        <ProofStrip label={hub.certifications.label} names={hub.certifications.items} />
        <Cta />
      </main>
      <Footer route="industries" />
    </>
  );
}
