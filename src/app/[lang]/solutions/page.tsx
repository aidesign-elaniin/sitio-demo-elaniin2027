import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { Nav } from "@/components/sections/nav/nav";
import { AppliedAiMention } from "@/components/sections/solutions-page/applied-ai-mention";
import { EntryBlocks } from "@/components/sections/solutions-page/entry-blocks";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "solutions", meta.solutions);
}

/* Solutions hub (docs/sitemap-elaniin.md 3.2): hero, intro + three entry blocks, Applied AI mention, closing CTA. */
export default async function Solutions() {
  const [lang, copy, home, nav, appliedAi] = await Promise.all([
    getLang(),
    getCopy("solutionsPage"),
    getCopy("solutions"),
    getCopy("nav"),
    getCopy("appliedAi"),
  ]);
  return (
    <>
      <Nav route="solutions" />
      <main id="main">
        <HeroView copy={copy.hero} href={href("solutions", lang, anchors.contact)} />
        <EntryBlocks head={home} items={nav.solutions.items} lang={lang} />
        <AppliedAiMention copy={copy.appliedAi} pillars={appliedAi.pillars.items} lang={lang} />
        <Cta />
      </main>
      <Footer route="solutions" />
    </>
  );
}
