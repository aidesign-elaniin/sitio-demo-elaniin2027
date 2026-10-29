import { routes, type RouteKey } from "./routes";

const segments = (path: string) => path.split("/").filter(Boolean);

/*
  Breadcrumb trail of a page, from the route table: home, then every page whose English path is a whole-segment prefix
  of this one, then the page itself. A path segment with no page of its own (e.g. /resources/articles) is skipped.
*/
export function trail(route: RouteKey): RouteKey[] {
  const own = segments(routes[route].en);
  const ancestors = (Object.keys(routes) as RouteKey[]).filter((key) => {
    const s = segments(routes[key].en);
    return s.length > 0 && s.length < own.length && s.every((part, i) => part === own[i]);
  });
  ancestors.sort((a, b) => segments(routes[a].en).length - segments(routes[b].en).length);
  return route === "home" ? ["home"] : ["home", ...ancestors, route];
}

/** Breadcrumbs show from level 2: the page has at least one ancestor besides home. */
export const showsBreadcrumbs = (route: RouteKey): boolean => trail(route).length > 2;
