import type { Metadata } from "next";
import { LandingPageView } from "@/components/sections/landing/landing-page";
import { getCopy, getLang } from "@/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "modernizeSystem", meta.modernizeSystem);
}

/* Landing by problem (docs/sitemap-elaniin.md 3.27 to 3.29), out of the nav. */
export default function ModernizeSystem() {
  return <LandingPageView id="modernizeSystem" />;
}
