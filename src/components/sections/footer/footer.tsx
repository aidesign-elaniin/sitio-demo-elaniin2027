import Image from "next/image";
import Link from "next/link";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { getCopy, getLang } from "@/content";
import { resolveTarget } from "@/components/sections/nav/nav-data";
import { href, switchLinks, type RouteKey } from "@/lib/routes";
import { footerColumns, footerHeadings, legalRoutes } from "./footer-data";
import { asset } from "@/lib/asset";
import { AiSummary } from "./ai-summary";
import { credentials } from "./credentials";
import { socials } from "./social-icons";

/*
  The footer. Excellence Blue: logotipo, tagline, entity line and socials, four link columns, the credentials row (the badges of
  public/certification, turned white), and the legal row with the language switch and the AI summary. The small white logotipo
  is the only logo here.
*/
export async function Footer({ route }: { route: RouteKey }) {
  const [lang, copy, common] = await Promise.all([getLang(), getCopy("footer"), getCopy("common")]);
  const links = switchLinks(route, lang, { en: common.language.en, es: common.language.es });

  return (
    <footer
      data-nav-theme="blue"
      className="relative overflow-hidden border-t border-border-on-dark bg-surface-dark text-text-on-dark-secondary"
    >
      <div className="container-site relative pt-16 pb-8 max-md:pt-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:justify-between lg:gap-24">
          <div className="flex flex-col gap-8">
            <Image
              src={asset("/assets/white-logotipo-elaniin.svg")}
              alt="Elaniin"
              width={104}
              height={28}
              className="h-7 w-auto self-start"
            />
            <p className="font-display text-lead text-text-on-dark">
              {copy.tagline.lead}
              <span className="block text-text-on-dark-secondary">{copy.tagline.rest}</span>
            </p>
            <p className="text-caption text-text-on-dark-muted">{copy.entity}</p>
            <ul className="flex gap-3" aria-label={copy.socialsLabel}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-10 min-w-10 place-items-center rounded-button border border-border-on-dark px-0 text-text-on-dark-secondary transition-colors duration-150 ease-standard hover:bg-white/8 hover:text-text-on-dark focus-ring-on-dark"
                  >
                    {s.path ? (
                      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
                        <path d={s.path} />
                      </svg>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="mx-4 block h-4 bg-current"
                        style={{
                          width: `${(s.logo!.width / s.logo!.height) * 16}px`,
                          maskImage: `url(${asset(s.logo!.src)})`,
                          WebkitMaskImage: `url(${asset(s.logo!.src)})`,
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                        }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={copy.navLabel} className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:gap-x-8">
            {copy.columns.map((col, c) => (
              <div key={c}>
                <h2 className="font-display text-body font-medium text-text-on-dark">
                  <Link
                    href={resolveTarget(footerHeadings[c], lang)}
                    className="rounded-tag transition-colors duration-150 ease-standard hover:text-text-on-dark-secondary focus-ring-on-dark"
                  >
                    {col.heading}
                  </Link>
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

        <p id="credentials-label" className="mono-label mt-16 text-caption text-text-on-dark-muted">
          {copy.credentials.label}
        </p>
        <ul aria-labelledby="credentials-label" className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-6">
          {credentials.map((badge) => (
            <li key={badge.id}>
              <Image
                src={asset(badge.src)}
                alt={copy.credentials.items[badge.id]}
                width={badge.width}
                height={badge.height}
                className={`${badge.tall} w-auto opacity-80 invert`}
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border-on-dark pt-6 text-body-sm text-text-on-dark-muted">
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
          <AiSummary copy={copy.aiSummary} />
        </div>
      </div>
    </footer>
  );
}
