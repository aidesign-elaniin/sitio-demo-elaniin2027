import Image from "next/image";
import Link from "next/link";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { getCopy, getLang } from "@/content";
import { href, switchLinks, type RouteKey } from "@/lib/routes";
import { resolveTarget } from "@/components/sections/nav/nav-data";
import { footerColumns, footerHeadings, legalRoutes } from "./footer-data";
import { NewsletterForm } from "./newsletter-form";
import { socials } from "./social-icons";

/*
  Section 06. Excellence Blue footer: logotipo + tagline + newsletter + socials, four link columns from the site map
  (footer-data.ts), legal row with the language switch. The small white logotipo is the only logo here. Pages that do
  not exist yet render "#".
*/
export async function Footer({ route }: { route: RouteKey }) {
  const [lang, copy, common] = await Promise.all([getLang(), getCopy("footer"), getCopy("common")]);
  const links = switchLinks(route, lang, { en: common.language.en, es: common.language.es });

  return (
    <footer data-nav-theme="blue" className="relative overflow-hidden border-t border-border-on-dark bg-surface-dark text-text-on-dark-secondary">
      <div className="container-site relative pt-16 pb-8 max-md:pt-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:justify-between lg:gap-24">
          <div className="flex flex-col gap-8">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/white-logotipo-elaniin.svg`} alt="Elaniin" width={104} height={28} className="h-7 w-auto self-start" />
            <p className="font-display text-lead text-text-on-dark">
              {copy.tagline.lead}
              <span className="block text-text-on-dark-secondary">{copy.tagline.rest}</span>
            </p>
            <NewsletterForm copy={copy.newsletter} lang={lang} termsHref={href("legal", lang)} />
            <ul className="flex gap-3" aria-label={copy.socialsLabel}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-button border border-border-on-dark text-text-on-dark-secondary transition-colors duration-150 ease-standard hover:bg-white/8 hover:text-text-on-dark focus-ring-on-dark"
                  >
                    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={copy.navLabel} className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-[repeat(4,auto)] xl:justify-between">
            {copy.columns.map((col, c) => (
              <div key={c} className="min-w-0">
                <h2 className="font-display text-body font-medium text-text-on-dark">
                  {footerHeadings[c] ? (
                    <Link
                      href={resolveTarget(footerHeadings[c], lang)}
                      className="rounded-tag transition-colors duration-150 ease-standard hover:text-text-on-dark-accent focus-ring-on-dark"
                    >
                      {col.heading}
                    </Link>
                  ) : (
                    col.heading
                  )}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((label, l) => (
                    <li key={l}>
                      <Link
                        href={resolveTarget(footerColumns[c][l], lang)}
                        className="rounded-tag text-body-sm text-text-on-dark-secondary transition-colors duration-150 ease-standard hover:text-text-on-dark focus-ring-on-dark"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border-on-dark pt-6 text-body-sm text-text-on-dark-muted">
          <span>{copy.copyright}</span>
          {copy.legal.map((label, l) => (
            <Link
              key={l}
              href={href(legalRoutes[l], lang)}
              className="rounded-tag transition-colors duration-150 ease-standard hover:text-text-on-dark focus-ring-on-dark"
            >
              {label}
            </Link>
          ))}
          <LanguageSwitch links={links} label={common.language.label} variant="dark" className="-mx-2" />
          <span className="ml-auto text-caption max-md:ml-0">{copy.placeholder}</span>
        </div>
      </div>
    </footer>
  );
}
