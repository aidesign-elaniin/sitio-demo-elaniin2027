import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { Nav } from "@/components/sections/nav/nav";
import { ResearchExplorer } from "@/components/sections/research/research-explorer";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "research", meta.research);
}

/* Research (docs/sitemap-elaniin.md 3.20): hero, the home research list on its Elaniin Black band filtered by topic, CTA. */
export default async function Research() {
  const [lang, copy, research] = await Promise.all([getLang(), getCopy("resources"), getCopy("research")]);
  return (
    <>
      <Nav route="research" />
      <main id="main">
        <HeroView copy={copy.research.hero} href={href("research", lang, anchors.contact)} />
        <section aria-label={research.topicFilterLabel} data-nav-theme="black" className="bg-surface-dark-alt text-text-on-dark">
          <div className="container-site py-[var(--section-y)]">
            <ResearchExplorer copy={research} lang={lang} by="topic" />
          </div>
        </section>
        <Cta />
      </main>
      <Footer route="research" />
    </>
  );
}
