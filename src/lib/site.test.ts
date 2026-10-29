import { afterEach, describe, expect, it } from "vitest";
import { siteUrl } from "./site";

describe("siteUrl", () => {
  afterEach(() => {
    delete process.env.SITE_URL;
    delete process.env.ALLOW_INDEXING;
  });

  it("falls back to the review site when SITE_URL is unset or empty", () => {
    expect(siteUrl()).toBe("https://elaniin-2027-website.vercel.app");
    process.env.SITE_URL = "";
    expect(siteUrl()).toBe("https://elaniin-2027-website.vercel.app");
  });

  it("drops a trailing slash so URLs never get a double slash", () => {
    process.env.SITE_URL = "https://example.com/";
    expect(siteUrl()).toBe("https://example.com");
  });

  it("refuses to open the site to search engines without its own SITE_URL", () => {
    process.env.ALLOW_INDEXING = "true";
    expect(() => siteUrl()).toThrow(/SITE_URL/);
    process.env.SITE_URL = "https://example.com";
    expect(siteUrl()).toBe("https://example.com");
  });
});
