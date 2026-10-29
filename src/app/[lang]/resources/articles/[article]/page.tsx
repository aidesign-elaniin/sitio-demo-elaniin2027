import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/cta/cta";
import { Footer } from "@/components/sections/footer/footer";
import { Nav } from "@/components/sections/nav/nav";
import { articles } from "@/components/sections/research/articles-data";
import { slugOf } from "@/components/sections/service/registry";
import { DetailHeader } from "@/components/ui/detail-header";
import { Prose } from "@/components/ui/prose";
import { getCopy, getLang } from "@/content";
import { formatMonth } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ article: string }> };

/* Only the articles of articles-data exist; anything else is a 404. The folder segment is the English slug. */
export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ article: slugOf(a.route) }));

async function resolve(params: Props["params"]) {
  const slug = (await params).article;
  const item = articles.find((a) => slugOf(a.route) === slug);
  if (!item) notFound();
  return item;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [item, lang, nav] = await Promise.all([resolve(params), getLang(), getCopy("nav")]);
  const text = nav.resources.latest.items[item.id];
  return buildMetadata(lang, item.route, { title: `${text.title} | Elaniin`, description: text.description });
}

/* Article: header (tag, date, title, lead), the running text, CTA. */
export default async function ArticlePage({ params }: Props) {
  const item = await resolve(params);
  const [lang, nav, details] = await Promise.all([getLang(), getCopy("nav"), getCopy("details")]);
  const body = details.articles.items[item.id];
  return (
    <>
      <Nav route={item.route} current={nav.resources.latest.items[item.id].title} />
      <main id="main">
        <DetailHeader
          tags={[details.articles.tag, formatMonth(lang, item.date)]}
          title={nav.resources.latest.items[item.id].title}
          lead={body.lead}
        />
        <Prose sections={body.sections} />
        <Cta />
      </main>
      <Footer route={item.route} />
    </>
  );
}
