import { describe, expect, it } from "vitest";
import { audienceRoutes as en } from "@/content/en/audience-routes";
import { audienceRoutes as es } from "@/content/es/audience-routes";
import { audienceRouteItems } from "./audience-routes-data";

describe.each([
  ["en", en],
  ["es", es],
])("audience routes dictionary (%s)", (_name, copy) => {
  it("has the three items of each sector in the order of the data, each with a lead, a description, a link and two cases", () => {
    for (const sector of ["private", "public"] as const) {
      expect(copy.sectors[sector].map((i) => i.id)).toEqual(
        audienceRouteItems[sector].map((i) => i.id),
      );
      for (const item of copy.sectors[sector]) {
        expect(item.lead.length).toBeGreaterThan(0);
        expect(item.rest.length).toBeGreaterThan(0);
        expect(item.link.length).toBeGreaterThan(0);
        expect(item.cases).toHaveLength(2);
        for (const c of item.cases) {
          expect(c.title.length).toBeGreaterThan(0);
          expect(c.result.length).toBeGreaterThan(0);
        }
      }
    }
    expect(copy.title.length).toBeGreaterThan(0);
    expect(copy.toggle.private.length).toBeGreaterThan(0);
    expect(copy.toggle.public.length).toBeGreaterThan(0);
  });

  it("has twelve sample cases in all", () => {
    const all = [...copy.sectors.private, ...copy.sectors.public].flatMap(
      (i) => i.cases,
    );
    expect(all).toHaveLength(12);
  });
});

describe("audience routes languages", () => {
  it("translates the title, the toggle and the items", () => {
    expect(en.title).not.toBe(es.title);
    expect(en.toggle.public).not.toBe(es.toggle.public);
    expect(en.sectors.private[0].lead).not.toBe(es.sectors.private[0].lead);
  });
});
