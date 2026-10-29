import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/sections/footer/footer";
import { Nav } from "@/components/sections/nav/nav";
import { Button } from "@/components/ui/button";
import { DetailHeader } from "@/components/ui/detail-header";
import { Prose } from "@/components/ui/prose";
import { getCopy, getLang } from "@/content";
import type { LegalPage } from "@/content/schema";
import { buildMetadata } from "@/lib/metadata";
import { href, type RouteKey } from "@/lib/routes";

/* Where the action button of a page goes: status asks for a report, a report goes to the team. */
const ACTIONS: Partial<Record<LegalPage, RouteKey>> = { status: "reportIssue", reportIssue: "contact" };

export async function legalMetadata(id: LegalPage): Promise<Metadata> {
  const [lang, copy] = await Promise.all([getLang(), getCopy("legal")]);
  return buildMetadata(lang, id, { title: `${copy.pages[id].title} | Elaniin`, description: copy.pages[id].lead });
}

/*
  Legal page template: the detail header with a "pending approval" tag, a dashed notice that the text is a sample, the
  sections as prose and, where it applies, one action. No closing CTA band: these pages are reference, not sales.
*/
export async function LegalPageView({ id }: { id: LegalPage }) {
  const [lang, copy] = await Promise.all([getLang(), getCopy("legal")]);
  const page = copy.pages[id];
  const action = ACTIONS[id];
  return (
    <>
      <Nav route={id} />
      <main id="main">
        <DetailHeader back={{ label: copy.back, href: href("home", lang) }} tags={[copy.tag]} title={page.title} lead={page.lead}>
          <p
            role="note"
            className="mt-10 max-w-[68ch] rounded-card border border-dashed border-border-strong bg-surface-subtle pad-card text-body-sm text-text-secondary"
          >
            {copy.notice}
          </p>
        </DetailHeader>
        <Prose sections={page.sections} />
        {action && page.action && (
          <div className="container-site pb-[var(--section-y)]">
            <Button href={href(action, lang)} size="lg" className="max-md:w-full">
              {page.action}
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>
        )}
      </main>
      <Footer route={id} />
    </>
  );
}
