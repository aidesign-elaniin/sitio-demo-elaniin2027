import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CaseMedia } from "@/components/sections/cases/case-media";
import { CaseScene } from "@/components/sections/cases/case-scene";
import { cases } from "@/components/sections/cases/cases-data";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { Nav } from "@/components/sections/nav/nav";
import { FeatureGrid } from "@/components/sections/service/feature-grid";
import { Highlight } from "@/components/sections/service/highlight";
import { lines } from "@/components/sections/service/registry";
import { DetailHeader } from "@/components/ui/detail-header";
import { Prose } from "@/components/ui/prose";
import { Reveal } from "@/components/ui/reveal";
import { getCopy, getLang } from "@/content";
import type { ServiceLineCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import { buildMetadata } from "@/lib/metadata";
import { href } from "@/lib/routes";

type Props = { params: Promise<{ case: string }> };

/* Only the cases of cases-data exist; anything else is a 404. The folder segment is the case id. */
export const dynamicParams = false;
export const generateStaticParams = () => cases.map((c) => ({ case: c.id }));

async function resolve(params: Props["params"]) {
  const id = (await params).case;
  const item = cases.find((c) => c.id === id);
  if (!item) notFound();
  return item;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [item, lang, copy] = await Promise.all([resolve(params), getLang(), getCopy("cases")]);
  const text = copy.items[item.id];
  return buildMetadata(lang, item.route, { title: `${text.title} | Elaniin`, description: text.excerpt });
}

/* Direction of a result, as in an impact report (design-system/elaniin-2027/brief.md): "-42%" goes down, "+35%" and "3x" go up. */
function Trend({ value }: { value: string }) {
  const Icon = value.startsWith("-") ? ArrowDownRight : /^\+|x$/.test(value) ? ArrowUpRight : null;
  if (!Icon) return null;
  return (
    <span aria-hidden="true" className="grid size-11 place-items-center rounded-full border border-border-default text-elevate-blue">
      <Icon className="size-5" strokeWidth={1.5} />
    </span>
  );
}

/*
  Case detail: header (sector, title, excerpt), the case's product scene on its stage, results, the challenge, what we
  did, the service behind it, CTA.
*/
export default async function CasePage({ params }: Props) {
  const item = await resolve(params);
  const [lang, cardsCopy, details, common, ...lineCopies] = await Promise.all([
    getLang(),
    getCopy("cases"),
    getCopy("details"),
    getCopy("services"),
    ...lines.map((l) => getCopy(l.copy)),
  ]);
  const text = cardsCopy.items[item.id];
  const detail = details.cases.items[item.id];
  const labels = details.cases.labels;
  const serviceCards: Record<string, { title: string; text: string }> = Object.assign(
    {},
    ...lineCopies.map((c: ServiceLineCopy<string>) => c.hub.cards),
  );
  const service = serviceCards[item.service];

  return (
    <>
      <Nav route={item.route} current={text.title} />
      <main id="main">
        <DetailHeader
          tags={[text.sector]}
          title={text.title}
          lead={text.excerpt}
        >
          <Reveal className="mt-12 overflow-hidden rounded-t-card">
            <CaseMedia>
              <CaseScene kind={item.scene} accent={item.logo.accent} copy={cardsCopy.scenes} lang={lang} />
            </CaseMedia>
          </Reveal>
          <dl
            aria-label={labels.results}
            className={cn(
              "grid gap-px overflow-hidden rounded-b-card border border-border-default bg-border-default",
              detail.results.length > 1 && "md:grid-cols-2",
            )}
          >
            {detail.results.map((r) => (
              <div key={r.label} className="flex min-w-0 flex-col-reverse gap-2 bg-white pad-card">
                <dt className="text-body text-text-secondary">{r.label}</dt>
                <dd className="flex items-center gap-4 font-display text-display-lg font-medium text-text-primary tabular-nums">
                  {r.value}
                  <Trend value={r.value} />
                </dd>
              </div>
            ))}
          </dl>
        </DetailHeader>
        <Prose sections={[{ title: labels.challenge, paragraphs: [detail.challenge] }]} />
        <FeatureGrid id="solution-title" title={labels.solution} items={detail.solution} tone="subtle" />
        {service && (
          <Highlight
            title={labels.service}
            lead={{ strong: service.title, rest: service.text }}
            link={{ label: common.cardLink, href: href(item.service, lang) }}
          />
        )}
        <Cta />
      </main>
      <Footer route={item.route} />
    </>
  );
}
