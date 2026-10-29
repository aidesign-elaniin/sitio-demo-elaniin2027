/*
  Post-build step of the GitHub Pages copy (STATIC_EXPORT=true next build). Static hosting has no proxy, so this does
  what src/proxy.ts does at request time: every page is built under its internal folder (/en/solutions,
  /es/solutions) and is copied here to its public URL (/solutions, /es/soluciones). The en/es pairs come from the
  hreflang alternates of out/sitemap.xml, so the route table stays the only list of pages.
  ponytail: copies only the files of each folder (index.html + RSC payloads), sub-pages are pairs of their own.
*/
import { cpSync, readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = "out";
const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
// SITE_URL may carry the base path (https://user.github.io/repo): keep only the page path.
const site = new URL(process.env.SITE_URL || "https://x").pathname.replace(/\/$/, "");
const path = (url) => new URL(url).pathname.slice(site.length).replace(/\/$/, "") || "/";
const pairs = new Map();
for (const [, en, es] of sitemap.matchAll(/hreflang="en" href="([^"]+)" \/>\s*<xhtml:link rel="alternate" hreflang="es" href="([^"]+)"/g)) {
  pairs.set(path(en), path(es));
}

function copyFiles(from, to) {
  mkdirSync(to, { recursive: true });
  for (const name of readdirSync(from)) {
    if (statSync(join(from, name)).isFile()) cpSync(join(from, name), join(to, name));
  }
}

const internal = (lang, en) => join(out, lang, en === "/" ? "" : en);
for (const [en, es] of pairs) {
  copyFiles(internal("en", en), join(out, en));
  if (es !== (en === "/" ? "/es" : `/es${en}`)) copyFiles(internal("es", en), join(out, es));
}

// GitHub Pages answers every unknown URL with /404.html: use the localized one, not Next's bare default.
cpSync(join(out, "en", "404", "index.html"), join(out, "404.html"));
// Skip Jekyll so folders starting with "_" (_next) are served.
writeFileSync(join(out, ".nojekyll"), "");
console.log(`pages: ${pairs.size} routes copied to their public URLs`);
