import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCopy, getLang } from "@/content";
import type { PageRoute } from "@/content/schema";
import { showsBreadcrumbs, trail } from "@/lib/breadcrumbs";
import { href, type RouteKey } from "@/lib/routes";

/*
  Breadcrumbs under the nav, from level 2 (DESIGN.md components.breadcrumbs): a thin white strip with a hairline, body-sm,
  ancestors as links in secondary text, the current page in primary text with aria-current. Each label is the page's
  meta title without the brand suffix; detail pages pass their own title as `current`. Long trails wrap, never scroll.
*/
export async function Breadcrumbs({ route, current }: { route: RouteKey; current?: string }) {
  if (!showsBreadcrumbs(route)) return null;
  const [lang, meta, common] = await Promise.all([getLang(), getCopy("meta"), getCopy("common")]);
  const label = (key: RouteKey) =>
    key === "home" ? common.breadcrumb.home : (meta[key as PageRoute]?.title.split(" | ")[0] ?? key);
  const items = trail(route);

  return (
    <nav aria-label={common.breadcrumb.label} className="border-b border-border-default bg-white">
      <ol className="container-site flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-body-sm">
        {items.map((key, i) => {
          const last = i === items.length - 1;
          return (
            <li key={key} className="flex min-w-0 items-center gap-2">
              {i > 0 && <ChevronRight className="size-4 shrink-0 text-text-muted" strokeWidth={1.5} aria-hidden="true" />}
              {last ? (
                <span aria-current="page" className="font-medium text-text-primary">
                  {current ?? label(key)}
                </span>
              ) : (
                <Link
                  href={href(key, lang)}
                  className="rounded-tag text-text-secondary transition-colors duration-150 ease-standard hover:text-text-primary focus-ring"
                >
                  {label(key)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
