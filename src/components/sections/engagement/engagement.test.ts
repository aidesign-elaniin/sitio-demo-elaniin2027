import { describe, expect, it } from "vitest";
import { copy as en } from "@/content/en";
import { copy as es } from "@/content/es";
import { engagementItems } from "@/components/sections/nav/nav-data";
import { routes } from "@/lib/routes";
import { best, finderModels, matches } from "./finder-data";

describe.each([
  ["en", en],
  ["es", es],
])("engagement models (%s)", (_name, copy) => {
  it("has one comparison cell per criterion for every model", () => {
    const { criteria, rows } = copy.engagement.hub.comparison;
    for (const m of engagementItems) expect(rows[m.id]).toHaveLength(criteria.length);
  });

  it("has page copy, metadata and a nested route for every model", () => {
    for (const m of engagementItems) {
      expect(copy.engagement.models[m.id].hero.headline.length).toBeGreaterThan(0);
      expect(copy.meta[m.id].title.length).toBeGreaterThan(0);
      expect(routes[m.id].en.startsWith(`${routes.engagementModels.en}/`)).toBe(true);
      expect(routes[m.id].es.startsWith(`${routes.engagementModels.es}/`)).toBe(true);
    }
  });
});

describe("model finder", () => {
  it("gives 100% to the model all three answers point to", () => {
    finderModels.forEach((_, i) => {
      expect(best([i, i, i])).toBe(i);
      expect(matches([i, i, i])?.[i]).toBe(100);
    });
  });

  it("scores only the questions answered and starts empty", () => {
    expect(matches([null, null, null])).toBeNull();
    expect(best([2, null, null])).toBe(2);
  });
});
