import { NextResponse, type NextRequest } from "next/server";
import { resolveLocale } from "@/lib/proxy-rules";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone(); // keeps the query string
  const result = resolveLocale(url.pathname);

  if (result.action === "next") return NextResponse.next();

  url.pathname = result.pathname;
  if (result.action === "redirect") return NextResponse.redirect(url, 308);
  return NextResponse.rewrite(url);
}

/*
  Runs on every page URL, so that anything unknown ends in a localized page or a localized 404 (the catch-all route).
  It skips Next internals (_next, __nextjs...) and real static files by extension (icon.svg, sitemap.xml, robots.txt, assets).
*/
export const config = {
  matcher: ["/((?!_next/|__nextjs|.*\\.(?:svg|png|jpe?g|gif|webp|avif|ico|txt|xml|json|webmanifest|map|woff2?|css|js)$).*)"],
};
