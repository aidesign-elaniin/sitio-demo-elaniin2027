import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { engagementModels } from "@/components/sections/nav/nav-data";
import { slugOf } from "@/components/sections/service/registry";
import { ServicePageView } from "@/components/sections/service/service-page";
import { getCopy, getLang } from "@/content";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ model: string }> };

/* Only the three engagement models exist; anything else is a 404. */
export const dynamicParams = false;
export const generateStaticParams = () => engagementModels.map((m) => ({ model: slugOf(m.id) }));

async function resolve(params: Props["params"]) {
  const slug = (await params).model;
  const model = engagementModels.find((m) => slugOf(m.id) === slug);
  if (!model) notFound();
  return model.id;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [id, lang, meta] = await Promise.all([resolve(params), getLang(), getCopy("meta")]);
  return buildMetadata(lang, id, meta[id]);
}

/* Engagement model page (docs/sitemap-elaniin.md 3.14 to 3.16), on the shared service template. */
export default async function ModelPage({ params }: Props) {
  const id = await resolve(params);
  const copy = await getCopy("engagementModels");
  return <ServicePageView route={id} copy={copy.models[id]} />;
}
