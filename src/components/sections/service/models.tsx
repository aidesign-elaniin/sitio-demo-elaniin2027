import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { engagementItems, resolveTarget, type EngagementId } from "@/components/sections/nav/nav-data";
import type { NavCopy, ServicesCommonCopy } from "@/content/schema";
import { cn } from "@/lib/cn";
import type { Lang } from "@/lib/i18n";

/* Suggested engagement models of a service page: the rows of the engagement menu as white cards on Inspire Grey. Two models fill the row (two columns), three or more go three across. */
export function Models({
  ids,
  head,
  items,
  lang,
}: {
  ids: EngagementId[];
  head: ServicesCommonCopy["models"];
  items: NavCopy["engagement"]["items"];
  lang: Lang;
}) {
  const models = engagementItems.filter((m) => ids.includes(m.id));
  return (
    <section aria-labelledby="models-title" className="bg-surface-subtle">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id="models-title" title={head.title} lead={head.lead} />
      </div>

      <ul className={cn("container-site grid gap-4 pb-[var(--section-y)] md:grid-cols-2", models.length > 2 && "lg:grid-cols-3")}>
        {models.map((model, i) => (
          <li key={model.id} className="min-w-0">
            <Reveal delay={i * 0.06} className="h-full">
              <Link
                href={resolveTarget(model.to, lang)}
                className="group flex h-full items-start gap-4 rounded-card border border-border-default bg-white pad-card transition-colors duration-150 ease-standard hover:border-border-strong focus-ring"
              >
                <IconBox icon={model.icon} />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-display text-body-lg font-medium text-text-primary">{items[model.id].title}</span>
                  <span className="text-body-sm text-text-secondary">{items[model.id].description}</span>
                </span>
                <ArrowRight
                  className="mt-1 size-4 shrink-0 text-text-link transition-transform duration-150 ease-standard group-hover:translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
