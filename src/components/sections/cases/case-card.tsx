import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClientLogo } from "@/components/sections/clients/placeholder-logos";
import { Tag } from "@/components/ui/tag";
import type { CasesCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { CaseMedia } from "./case-media";
import { CaseScene } from "./case-scene";
import type { CaseStudy } from "./cases-data";

/*
  One case study: animated resource on a dark stage, then client logo chip + sector, title, result, and the link.
  Every card has the same stage height and type size. The link stretches over the whole card
  (after:absolute), so the card is one click target.
*/
export function CaseCard({ item, copy, lang }: { item: CaseStudy; copy: CasesCopy; lang: Lang }) {
  const text = copy.items[item.id];

  return (
    <article className="group relative flex h-full flex-col bg-white">
      <CaseMedia>
        <CaseScene kind={item.scene} accent={item.logo.accent} copy={copy.scenes} lang={lang} />
      </CaseMedia>

      <div className="flex flex-1 flex-col gap-5 pad-card">
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex h-10 items-center rounded-tag border border-border-default bg-surface-subtle px-3 text-text-primary"
            title={item.logo.name}
          >
            <ClientLogo logo={item.logo} size={18} colored />
          </span>
          <Tag>{text.sector}</Tag>
        </div>

        <h3 className="font-display text-h3 font-medium text-text-primary">{text.title}</h3>
        <p className="text-body-lg text-text-secondary">{text.excerpt}</p>

        <Link
          href={href(item.route, lang)}
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-tag font-display text-button font-medium text-text-link transition-colors duration-150 ease-standard group-hover:text-text-link-hover after:absolute after:inset-0 focus-ring"
        >
          {copy.read}
          <ArrowRight
            className="size-4 transition-transform duration-150 ease-standard group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
