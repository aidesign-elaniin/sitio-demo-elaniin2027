import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModuleField } from "@/components/sections/hero/module-field";
import { Nav } from "@/components/sections/nav/nav";
import { resolveTarget, type Target } from "@/components/sections/nav/nav-data";
import { Footer } from "@/components/sections/footer/footer";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { getCopy, getLang } from "@/content";
import { href } from "@/lib/routes";

/* The pages a lost visitor most likely wants: sections of the home. Names and descriptions come from the dictionary. */
const SUGGESTED: { id: "solutions" | "cases" | "research"; to: Target }[] = [
  { id: "solutions", to: { route: "solutions" } },
  { id: "cases", to: { route: "useCases" } },
  { id: "research", to: { route: "research" } },
];

/*
  404 page (DESIGN.md components.not-found): the site shell (Nav and Footer), a left-aligned message on the hero's module
  field, and a hairline grid of three useful links. Rendered by app/[lang]/[...slug]/not-found.tsx, in the language of the URL.
*/
export async function NotFound() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("notFound")]);

  return (
    <>
      <title>{copy.documentTitle}</title>
      <Nav route="home" />
      <main id="main">
        <section aria-labelledby="not-found-title" className="relative overflow-hidden border-b border-border-default">
          <ModuleField />

          <div className="container-site relative py-[var(--section-y-statement)] max-md:py-24">
            <div className="flex max-w-[40rem] flex-col items-start gap-6">
              <div className="rise" style={{ "--i": 0 } as React.CSSProperties}>
                <Tag>{copy.tag}</Tag>
              </div>
              <h1
                id="not-found-title"
                className="rise max-w-[16ch] font-display text-display-lg font-medium text-balance text-text-primary"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                {copy.title}
              </h1>
              <p className="rise max-w-[48ch] text-lead text-text-secondary" style={{ "--i": 2 } as React.CSSProperties}>
                {copy.lead}
              </p>
              <div
                className="rise mt-4 flex flex-wrap items-center gap-x-6 gap-y-4 max-md:w-full max-md:flex-col max-md:items-stretch"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                <Button href={href("home", lang)} size="lg" className="max-md:w-full">
                  {copy.home}
                </Button>
                <Button href={href("contact", lang)} variant="tertiary">
                  {copy.talk}
                  <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section aria-label={copy.linksLabel} className="border-b border-border-default bg-white">
          <div className="container-site">
            <ul className="grid gap-px border-x border-border-default bg-border-default md:grid-cols-3">
              {SUGGESTED.map(({ id, to }) => (
                <li key={id} className="bg-white">
                  <Link
                    href={resolveTarget(to, lang)}
                    className="group flex h-full flex-col gap-2 p-8 transition-colors duration-150 ease-standard hover:bg-surface-subtle focus-ring"
                  >
                    <span className="flex items-center justify-between gap-3 font-display text-h4 font-medium text-text-primary">
                      {copy.links[id].title}
                      <ArrowRight
                        className="size-5 text-text-link transition-transform duration-150 ease-standard group-hover:translate-x-1"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-body-sm text-text-secondary">{copy.links[id].description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer route="home" />
    </>
  );
}
