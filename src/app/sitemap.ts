import type { MetadataRoute } from "next";
import { langs } from "@/lib/i18n";
import { absoluteUrl, routes, type RouteKey } from "@/lib/routes";

export const dynamic = "force-static";

/* One entry per page and language, each carrying the alternates of both languages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(routes) as RouteKey[];
  return keys.flatMap((key) =>
    langs.map((lang) => ({
      url: absoluteUrl(routes[key][lang]),
      lastModified: new Date(),
      alternates: {
        languages: {
          en: absoluteUrl(routes[key].en),
          es: absoluteUrl(routes[key].es),
          "x-default": absoluteUrl(routes[key].en),
        },
      },
    })),
  );
}
