import { describe, expect, it } from "vitest";
import { copy as en } from "@/content/en";
import { copy as es } from "@/content/es";
import { footerColumns } from "@/components/sections/footer/footer-data";
import { routes } from "@/lib/routes";
import { industryIds } from "./industry-data";

describe.each([
  ["en", en],
  ["es", es],
])("industries (%s)", (_name, copy) => {
  it("has hub card, page copy, metadata and a nested route for every industry", () => {
    for (const id of industryIds) {
      expect(copy.industries.hub.cards[id].title.length).toBeGreaterThan(0);
      expect(copy.industries.pages[id].hero.headline.length).toBeGreaterThan(0);
      expect(copy.meta[id].title.length).toBeGreaterThan(0);
      expect(routes[id].en.startsWith(`${routes.industries.en}/`)).toBe(true);
      expect(routes[id].es.startsWith(`${routes.industries.es}/`)).toBe(true);
    }
  });

  it("lists the industries in the footer in the same order as their targets", () => {
    const column = copy.footer.columns[2];
    expect(column.links).toEqual(industryIds.map((id) => copy.industries.hub.cards[id].title));
    expect(footerColumns[2]).toEqual(industryIds.map((route) => ({ route })));
  });
});
