import type { Metadata } from "next";
import { AiHero } from "@/components/sections/applied-ai/ai-hero";
import { Evidence } from "@/components/sections/applied-ai/evidence";
import { InServices } from "@/components/sections/applied-ai/in-services";
import { LoopDemo } from "@/components/sections/applied-ai/loop-demo";
import { Pillars } from "@/components/sections/applied-ai/pillars";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { Nav } from "@/components/sections/nav/nav";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "appliedAi", meta.appliedAi);
}

/*
  Applied AI (docs/sitemap-elaniin.md 3.17), the most expressive page of the site: the living halftone hero, the pillars
  with their pictures, the playable human-in-the-loop demo, the method in each service, evidence, closing CTA.
*/
export default async function AppliedAi() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("appliedAi")]);
  return (
    <>
      <Nav route="appliedAi" />
      <main id="main">
        <AiHero copy={copy.hero} href={href("appliedAi", lang, anchors.contact)} />
        <Pillars copy={copy.pillars} capacity={copy.capacity} />
        <LoopDemo copy={copy.loop} />
        <InServices copy={copy.services} lang={lang} />
        <Evidence copy={copy.evidence} lang={lang} />
        <Cta />
      </main>
      <Footer route="appliedAi" />
    </>
  );
}
