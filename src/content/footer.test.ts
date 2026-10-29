import { describe, expect, it } from "vitest";
import { footer as en } from "./en/footer";
import { footer as es } from "./es/footer";
import { footerColumns } from "@/components/sections/footer/footer-data";

describe.each([
  ["en", en],
  ["es", es],
])("footer dictionary (%s)", (_name, copy) => {
  it("keeps the {terms} placeholder in the newsletter legal sentence", () => {
    expect(copy.newsletter.legal.split("{terms}")).toHaveLength(2);
    expect(copy.newsletter.terms.length).toBeGreaterThan(0);
  });

  it("has one label per link target (docs/sitemap-elaniin.md) and a legal row", () => {
    expect(copy.columns.map((c) => c.links.length)).toEqual(footerColumns.map((c) => c.length));
    expect(copy.legal.length).toBeGreaterThan(0);
  });

  it("keeps the copyright lowercase", () => {
    expect(copy.copyright).toBe("© 2027 elaniin");
  });
});

describe("footer languages", () => {
  it("has the same structure in both languages and different words", () => {
    expect(en.columns.map((c) => c.links.length)).toEqual(es.columns.map((c) => c.links.length));
    expect(en.legal).toHaveLength(es.legal.length);
    expect(en.newsletter.submit).not.toBe(es.newsletter.submit);
  });
});
