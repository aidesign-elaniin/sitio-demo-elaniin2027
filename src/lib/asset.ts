/** URL of a file in public/, with the base path of the static copy (GitHub Pages serves the site under the repo name). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
