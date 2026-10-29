import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardGlow } from "@/components/ui/card-glow";
import { IconBox } from "@/components/ui/icon-box";
import { ProjectScene } from "@/components/sections/engagement/project-scene";
import { StaffScene } from "@/components/sections/engagement/staff-scene";
import { TeamScene } from "@/components/sections/engagement/team-scene";
import type { NavCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { ctaTarget, engagementItems, resolveTarget } from "./nav-data";

/*
  Menu type 3: the engagement models as three inset dark cards, the card of the engagement section (DESIGN.md
  mega-menu.engagement), the way the solutions menu takes the cards of the solutions section. Each card is one link and
  carries the isometric scene of its model; the scenes run while the panel is open. The help strip repeats the solutions one.
*/
export function EngagementMenu({
  lang,
  copy,
  onNavigate,
}: {
  lang: Lang;
  copy: NavCopy;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <ul className="grid grid-cols-3 gap-2 p-2">
        {engagementItems.map((item) => {
          const text = copy.engagement.items[item.id];
          return (
            <li key={item.id}>
              <Link
                href={resolveTarget(item.to, lang)}
                onClick={onNavigate}
                className="group/card relative isolate flex h-full flex-col gap-6 overflow-hidden rounded-card border border-border-on-dark bg-surface-dark-alt p-8 transition-colors duration-150 ease-standard hover:border-border-on-dark-strong focus-ring"
              >
                <CardGlow tone="quiet" />
                <div className="flex items-start justify-between">
                  <IconBox icon={item.icon} tone="dark" />
                  <ArrowRight
                    className="size-5 -translate-x-1 text-text-on-dark-accent opacity-0 transition-all duration-150 ease-standard group-hover/card:translate-x-0 group-hover/card:opacity-100"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <span className="flex flex-col gap-2">
                  <span className="font-display text-h3 font-medium text-text-on-dark">
                    {text.title}
                  </span>
                  <span className="text-body-sm text-text-on-dark-secondary">
                    {text.description}
                  </span>
                </span>
                <div className="pointer-events-none mt-auto ml-auto w-[240px]">
                  {item.id === "staff" && (
                    <StaffScene
                      names={copy.engagement.visuals.staff.names}
                      active
                    />
                  )}
                  {item.id === "dedicated" && <TeamScene active />}
                  {item.id === "project" && <ProjectScene active />}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-6 border-t border-border-default bg-surface-subtle px-8 py-4">
        <p className="text-body-sm text-text-secondary">
          {copy.engagement.help.question}
        </p>
        <Button variant="tertiary" href={resolveTarget(ctaTarget, lang)}>
          {copy.engagement.help.action}
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
