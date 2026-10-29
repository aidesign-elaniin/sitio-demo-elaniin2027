import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getCopy, getLang } from "@/content";
import { switchLinks, type RouteKey } from "@/lib/routes";
import { NavClient } from "./nav-client";

/*
  Section 01. Server wrapper: reads the copy of the current language and hands plain props to the client bar. From level 2
  it adds the breadcrumbs under the bar (they scroll with the page; only the bar is sticky). `current` is the title of a
  detail page, which has no metadata entry of its own.
*/
export async function Nav({ route, current }: { route: RouteKey; current?: string }) {
  const [lang, copy, common] = await Promise.all([getLang(), getCopy("nav"), getCopy("common")]);
  const links = switchLinks(route, lang, { en: common.language.en, es: common.language.es });
  return (
    <>
      <NavClient lang={lang} copy={copy} common={common} switchLinks={links} />
      <Breadcrumbs route={route} current={current} />
    </>
  );
}
