import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { Footer } from "@/components/sections/footer/footer";
import { ModuleField } from "@/components/sections/hero/module-field";
import { Nav } from "@/components/sections/nav/nav";
import { ProcessSteps } from "@/components/sections/contact/process-steps";
import { getCopy, getLang } from "@/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [lang, meta] = await Promise.all([getLang(), getCopy("meta")]);
  return buildMetadata(lang, "contact", meta.contact);
}

/*
  Contact Us (docs/sitemap-elaniin.md 3.21): the least friction possible. Title, lead and direct contact on the left,
  the form on the right, over the hero module field; then what happens next. No closing CTA: this page is the CTA.
*/
export default async function ContactUs() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("contact")]);
  return (
    <>
      <Nav route="contact" />
      <main id="main">
        <section aria-labelledby="contact-title" className="relative overflow-hidden border-b border-border-default">
          <ModuleField />
          <div className="container-site relative grid gap-12 py-[var(--section-y)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="rise flex min-w-0 flex-col gap-10">
              <div>
                <h1 id="contact-title" className="max-w-[16ch] font-display text-display-lg font-medium text-balance text-text-primary">
                  {copy.title}
                </h1>
                <p className="mt-6 max-w-[48ch] text-lead text-text-secondary">{copy.lead}</p>
              </div>
              <div>
                <h2 className="font-display text-body-lg font-medium text-text-primary">{copy.direct.title}</h2>
                <dl className="mt-4 divide-y divide-border-default border-y border-border-default">
                  {copy.direct.items.map((item) => (
                    <div key={item.label} className="flex flex-wrap justify-between gap-2 py-3 text-body-sm">
                      <dt className="text-text-secondary">{item.label}</dt>
                      <dd className="font-medium text-text-primary">{item.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-caption text-text-muted">{copy.direct.note}</p>
              </div>
            </div>
            <div className="rise min-w-0" style={{ "--i": 2 } as React.CSSProperties}>
              <ContactForm copy={copy.form} lang={lang} />
            </div>
          </div>
        </section>
        <ProcessSteps id="next-title" title={copy.next.title} lead={copy.next.lead} steps={copy.next.steps} />
      </main>
      <Footer route="contact" />
    </>
  );
}
