import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  const entries = sitemap();

  it("lists the home page in both languages", () => {
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/") && !u.endsWith("/es"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/es"))).toBe(true);
  });

  it("gives every entry the alternates of both languages and x-default, like the page metadata", () => {
    for (const entry of entries) {
      expect(Object.keys(entry.alternates?.languages ?? {}).sort()).toEqual(["en", "es", "x-default"]);
    }
  });
});
