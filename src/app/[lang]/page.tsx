import type { Metadata } from "next";
import { Cases } from "@/components/sections/cases/cases";
import { Clients } from "@/components/sections/clients/clients";
import { Cta } from "@/components/sections/cta/cta";
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

/* Sections get added here one by one. 01 Nav, 02 Hero, 03 Clients, 04 Cases, 05 Research, 06 Solutions, 07 CTA, 08 Footer. */
export default function Home() {
  return (
    <>
      <Nav route="home" />
      <main id="main">
        <Hero />
        <Clients />
        <Cases />
        <Research />
        <Solutions />
        <Cta />
      </main>
      <Footer route="home" />
    </>
  );
}
