import { describe, expect, it } from "vitest";
import { copy as en } from "@/content/en";
import { copy as es } from "@/content/es";
import { legalRoutes } from "@/components/sections/footer/footer-data";

describe.each([
  ["en", en],
  ["es", es],
])("legal pages (%s)", (_name, copy) => {
  it("has one footer label per legal page and copy for each, flagged as pending", () => {
    expect(copy.footer.legal).toHaveLength(legalRoutes.length);
    for (const id of legalRoutes) {
      expect(copy.legal.pages[id].title.length).toBeGreaterThan(0);
      expect(copy.legal.pages[id].sections.length).toBeGreaterThan(0);
    }
    expect(copy.legal.notice.length).toBeGreaterThan(0);
  });
});
