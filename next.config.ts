import path from "node:path";
import type { NextConfig } from "next";

/*
  STATIC_EXPORT=true builds the static copy for GitHub Pages (out/), served under BASE_PATH (the repo name).
  Static hosting has no proxy, headers or image optimization: scripts/pages.mjs copies every page to its public URL.
*/
const isExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  // A stray package-lock.json exists in the home directory; pin the root to this project.
  turbopack: {
    root: path.join(__dirname),
  },
  // The in-app browser reaches the dev server through 127.0.0.1.
  allowedDevOrigins: ["127.0.0.1"],
  ...(isExport && {
    output: "export",
    trailingSlash: true,
    basePath: basePath || undefined,
    images: { unoptimized: true },
  }),
  env: { NEXT_PUBLIC_BASE_PATH: isExport ? basePath : "" },
  // Review ("dev") deployment: keep every response out of search engines, assets included.
  // Set ALLOW_INDEXING=true on the real production project to lift it.
  // The static copy relies on the robots meta tag instead (see robotsMeta).
  ...(!isExport && {
    async headers() {
      if (process.env.ALLOW_INDEXING === "true") return [];
      return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
    },
  }),
};

export default nextConfig;
