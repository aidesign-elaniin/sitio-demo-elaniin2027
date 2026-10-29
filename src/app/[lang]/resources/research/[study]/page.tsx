import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { Nav } from "@/components/sections/nav/nav";
import { researchItems, type ResearchItem } from "@/components/sections/research/research-data";
import { FeatureGrid } from "@/components/sections/service/feature-grid";
import { Highlight } from "@/components/sections/service/highlight";
import { DetailHeader } from "@/components/ui/detail-header";
import { Prose } from "@/components/ui/prose";
import { getCopy, getLang } from "@/content";
import type { ResearchCopy } from "@/content/schema";
import { formatMonth, formatNumber } from "@/lib/format";
import type { Lang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ study: string }> };

/* Only the studies of research-data exist; anything else is a 404. The folder segment is the study id. */
export const dynamicParams = false;
export const generateStaticParams = () => researchItems.map((r) => ({ study: r.id }));

async function resolve(params: Props["params"]) {
  const id = (await params).study;
  const item = researchItems.find((r) => r.id === id);
  if (!item) notFound();
  return item;
}

/* The figure reads into the finding: "62% de los pilotos…", "7 de 10 usuarios…". */
const headline = (item: ResearchItem, copy: ResearchCopy, lang: Lang) => {
  const n = formatNumber(lang, item.value);
  const figure = item.unit === "percent" ? `${n}${copy.units.percent}` : `${n} ${copy.units.outOfTen}`;
  return `${figure} ${copy.items[item.id].finding}`;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [item, lang, copy] = await Promise.all([resolve(params), getLang(), getCopy("research")]);
  return buildMetadata(lang, item.route, {
    title: `${headline(item, copy, lang)} | Elaniin`,
    description: copy.items[item.id].source,
  });
}

/* Study detail: header (kind, date, the finding with its figure, the sample), method, findings, what it means, CTA. */
export default async function StudyPage({ params }: Props) {
  const item = await resolve(params);
  const [lang, copy, details] = await Promise.all([getLang(), getCopy("research"), getCopy("details")]);
  const detail = details.research.items[item.id];
  const labels = details.research.labels;
  return (
    <>
      <Nav route={item.route} current={headline(item, copy, lang)} />
      <main id="main">
        <DetailHeader
          tags={[copy.kinds[item.kind], copy.topics[item.topic], formatMonth(lang, item.date)]}
          title={headline(item, copy, lang)}
          lead={copy.items[item.id].source}
        />
        <Prose sections={[{ title: labels.method, paragraphs: [detail.method] }]} />
        <FeatureGrid id="findings-title" title={labels.findings} items={detail.findings} tone="subtle" />
        <Highlight title={labels.meaning} lead={{ strong: detail.meaning, rest: "" }} />
        <Cta />
      </main>
      <Footer route={item.route} />
    </>
  );
}
