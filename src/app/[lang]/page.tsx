import type { Metadata } from "next";
import { AudienceRoutes } from "@/components/sections/audience-routes/audience-routes";
import { Cases } from "@/components/sections/cases/cases";
import { Clients } from "@/components/sections/clients/clients";
import { Cta } from "@/components/sections/cta/cta";
import { Engagement } from "@/components/sections/engagement/engagement";
import { Footer } from "@/components/sections/footer/footer";
import { Hero } from "@/components/sections/hero/hero";
import { Nav } from "@/components/sections/nav/nav";
import { Research } from "@/components/sections/research/research";
import { Solutions } from "@/components/sections/solutions/solutions";
import { getCopy, getLang } from "@/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "home", meta.home);
}

/* The home, in order: Nav, Hero, Clients, Audience routes, Solutions, Engagement models, Cases, Research, CTA and Footer. */
export default function Home() {
  return (
    <>
      <Nav route="home" />
      <main id="main">
        <Hero />
        <Clients />
        <AudienceRoutes />
        <Solutions />
        <Engagement />
        <Cases />
        <Research />
        <Cta />
      </main>
      <Footer route="home" />
    </>
  );
}
