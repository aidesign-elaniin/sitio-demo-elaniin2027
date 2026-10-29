import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { IndustryCases } from "@/components/sections/industries/industry-cases";
import { industryIds } from "@/components/sections/industries/industry-data";
import { Nav } from "@/components/sections/nav/nav";
import { FeatureGrid } from "@/components/sections/service/feature-grid";
import { Highlight } from "@/components/sections/service/highlight";
import { slugOf } from "@/components/sections/service/registry";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

type Props = { params: Promise<{ industry: string }> };

/* Only the four industries exist; anything else is a 404. */
export const dynamicParams = false;
export const generateStaticParams = () => industryIds.map((id) => ({ industry: slugOf(id) }));

async function resolve(params: Props["params"]) {
  const slug = (await params).industry;
  const id = industryIds.find((i) => slugOf(i) === slug);
  if (!id) notFound();
  return id;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [id, lang, meta] = await Promise.all([resolve(params), getLang(), getCopy("meta")]);
  return buildMetadata(lang, id, meta[id]);
}

/* Industry page (docs/sitemap-elaniin.md 3.23 to 3.26): hero, data, use cases, featured project, CTA. */
export default async function IndustryPage({ params }: Props) {
  const id = await resolve(params);
  const [lang, copy, cases] = await Promise.all([getLang(), getCopy("industries"), getCopy("cases")]);
  const page = copy.pages[id];
  return (
    <>
      <Nav route={id} />
      <main id="main">
        <HeroView copy={page.hero} href={href(id, lang, anchors.contact)} />
        <FeatureGrid id="data-title" title={page.data.title} lead={page.data.lead} items={page.data.points} tone="subtle" />
        <IndustryCases industry={id} copy={page.cases} cardsCopy={cases} lang={lang} />
        <Highlight title={page.featured.title} lead={page.featured.lead} />
        <Cta />
      </main>
      <Footer route={id} />
    </>
  );
}
