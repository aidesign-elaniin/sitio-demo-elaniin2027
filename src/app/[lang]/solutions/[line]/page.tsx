import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { HeroView } from "@/components/sections/hero/hero";
import { Nav } from "@/components/sections/nav/nav";
import { ProofStrip } from "@/components/sections/service/proof-strip";
import { findLine, lines, slugOf } from "@/components/sections/service/registry";
import { ServiceCards } from "@/components/sections/service/service-cards";
import { getCopy, getLang } from "@/content";
import type { ServiceLineCopy } from "@/content/schema";
import { anchors } from "@/lib/anchors";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

type Props = { params: Promise<{ line: string }> };

/* Only the lines of the registry exist; anything else is a 404. */
export const dynamicParams = false;
export const generateStaticParams = () => lines.map((l) => ({ line: slugOf(l.route) }));

async function resolve(params: Props["params"]) {
  const line = findLine((await params).line);
  if (!line) notFound();
  return line;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [line, lang, meta] = await Promise.all([resolve(params), getLang(), getCopy("meta")]);
  return buildMetadata(lang, line.route, meta[line.route]);
}

/* Hub of a service line (docs/sitemap-elaniin.md 3.3, 3.8, 3.11): hero, intro + one card per service, proof strip, CTA. */
export default async function LineHub({ params }: Props) {
  const line = await resolve(params);
  const [lang, copy, common] = await Promise.all([getLang(), getCopy(line.copy), getCopy("services")]);
  const hub: ServiceLineCopy<string>["hub"] = copy.hub;
  const cards = line.services.map((s) => ({ route: s.route, ...hub.cards[s.route] }));
  return (
    <>
      <Nav route={line.route} />
      <main id="main">
        <HeroView copy={hub.hero} href={href(line.route, lang, anchors.contact)} />
        <ServiceCards title={hub.intro.title} lead={hub.intro.lead} cards={cards} cardLink={common.cardLink} lang={lang} />
        <ProofStrip label={common.proofLabel} names={hub.proof} />
        <Cta />
      </main>
      <Footer route={line.route} />
    </>
  );
}
