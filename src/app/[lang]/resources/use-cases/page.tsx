import type { Metadata } from "next";
import { UseCasesExplorer } from "@/components/sections/cases/use-cases-explorer";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { Nav } from "@/components/sections/nav/nav";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "useCases", meta.useCases);
}

/* Use Cases (docs/sitemap-elaniin.md 3.19): hero, industry filter + case cards, CTA. */
export default async function UseCases() {
  const [lang, copy, cases] = await Promise.all([getLang(), getCopy("resources"), getCopy("cases")]);
  return (
    <>
      <Nav route="useCases" />
      <main id="main">
        <HeroView copy={copy.useCases.hero} href={href("useCases", lang, anchors.contact)} />
        <section aria-label={copy.useCases.filterLabel} className="bg-white py-[var(--section-y)]">
          <UseCasesExplorer copy={cases} labels={copy.useCases} lang={lang} />
        </section>
        <Cta />
      </main>
      <Footer route="useCases" />
    </>
  );
}
