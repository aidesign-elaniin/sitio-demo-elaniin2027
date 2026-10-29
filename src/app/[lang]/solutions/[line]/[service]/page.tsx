import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findLine, findService, lines, slugOf } from "@/components/sections/service/registry";
import { ServicePageView } from "@/components/sections/service/service-page";
import { getCopy, getLang } from "@/content";
import type { ServiceLineCopy } from "@/content/schema";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ line: string; service: string }> };

/* Only the services of the registry exist; anything else is a 404. */
export const dynamicParams = false;
export const generateStaticParams = () =>
  lines.flatMap((l) => l.services.map((s) => ({ line: slugOf(l.route), service: slugOf(s.route) })));

async function resolve(params: Props["params"]) {
  const { line: lineSlug, service: serviceSlug } = await params;
  const line = findLine(lineSlug);
  const service = line && findService(line, serviceSlug);
  if (!line || !service) notFound();
  return { line, service };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ service }, lang, meta] = await Promise.all([resolve(params), getLang(), getCopy("meta")]);
  return buildMetadata(lang, service.route, meta[service.route]);
}

/* Service page of a line (docs/sitemap-elaniin.md 3.4 to 3.12), on the shared service template. */
export default async function ServicePage({ params }: Props) {
  const { line, service } = await resolve(params);
  const services: ServiceLineCopy<string>["services"] = (await getCopy(line.copy)).services;
  return (
    <ServicePageView
      route={service.route}
      copy={services[service.route]}
      models={service.models}
      highlight={service.highlight}
    />
  );
}
