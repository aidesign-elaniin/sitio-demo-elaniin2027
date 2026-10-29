import { describe, expect, it } from "vitest";
import { copy as en } from "@/content/en";
import { copy as es } from "@/content/es";
import { cases } from "@/components/sections/cases/cases-data";
import { routes } from "@/lib/routes";
import { articles } from "./articles-data";
import { researchItems } from "./research-data";

describe("detail routes", () => {
  it("nests every case, study and article under its Resources page in both languages", () => {
    const nested = (route: keyof typeof routes, parent: string, parentEs: string) => {
      expect(routes[route].en.startsWith(`${parent}/`)).toBe(true);
      expect(routes[route].es.startsWith(`${parentEs}/`)).toBe(true);
    };
    for (const c of cases) nested(c.route, routes.useCases.en, routes.useCases.es);
    for (const r of researchItems) nested(r.route, routes.research.en, routes.research.es);
    for (const a of articles) nested(a.route, "/resources/articles", "/es/recursos/articulos");
  });

  it("uses the case and study ids as their English folder segment", () => {
    for (const c of cases) expect(routes[c.route].en.endsWith(`/${c.id}`)).toBe(true);
    for (const r of researchItems) expect(routes[r.route].en.endsWith(`/${r.id}`)).toBe(true);
  });
});

describe.each([
  ["en", en],
  ["es", es],
])("detail copy (%s)", (_name, copy) => {
  it("has a body for every case, study and article", () => {
    for (const c of cases) {
      expect(copy.details.cases.items[c.id].challenge.length).toBeGreaterThan(0);
      expect(copy.details.cases.items[c.id].results.length).toBeGreaterThan(0);
    }
    for (const r of researchItems) expect(copy.details.research.items[r.id].findings.length).toBeGreaterThan(0);
    for (const a of articles) {
      expect(copy.details.articles.items[a.id].sections.length).toBeGreaterThan(0);
      expect(copy.resources.articles[a.id].title.length).toBeGreaterThan(0);
    }
  });
});
