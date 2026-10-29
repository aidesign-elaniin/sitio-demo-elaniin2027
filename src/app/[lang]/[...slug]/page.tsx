import { notFound } from "next/navigation";

/*
  Catch-all: any URL no page owns ends here and answers with the localized 404 (HTTP status 404), drawn by the
  not-found.tsx next to this file. Pages with their own folder take priority. The proxy only ever rewrites to
  /<lang>/404, the one path built ahead of time (the static export needs it).
*/
export const dynamicParams = false;
export const generateStaticParams = () => [{ slug: ["404"] }];

export default function CatchAll(): never {
  notFound();
}
