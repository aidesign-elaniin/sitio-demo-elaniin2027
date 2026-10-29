import { describe, expect, it } from "vitest";
import { nav as en } from "@/content/en/nav";
import { nav as es } from "@/content/es/nav";
import { engagementItems, featuredCases, plainLinks, resolveTarget, resourceItems, solutions } from "./nav-data";

describe("resolveTarget", () => {
  it("resolves a section of the home page in each language", () => {
    expect(resolveTarget({ route: "home", anchor: "cases" }, "en")).toBe("/#cases");
    expect(resolveTarget({ route: "home", anchor: "cases" }, "es")).toBe("/es#cases");
  });

  it("keeps pending pages as #", () => {
    expect(resolveTarget(null, "es")).toBe("#");
  });
});

describe.each([
  ["en", en],
  ["es", es],
])("nav dictionary (%s)", (_name, copy) => {
  it("covers every solution with as many link labels as link targets", () => {
    for (const s of solutions) {
      expect(copy.solutions.items[s.id].title.length).toBeGreaterThan(0);
      expect(copy.solutions.items[s.id].links).toHaveLength(s.links.length);
    }
  });

  it("covers every engagement model, resource item, featured card and plain link", () => {
    for (const i of engagementItems) expect(copy.engagement.items[i.id].title.length).toBeGreaterThan(0);
    for (const i of resourceItems) expect(copy.resources.items[i.id].title.length).toBeGreaterThan(0);
    expect(copy.resources.featured.cards).toHaveLength(featuredCases.length);
    for (const p of plainLinks) expect(copy.plain[p.id].length).toBeGreaterThan(0);
    expect(copy.blog.length).toBeGreaterThan(0);
  });
});

describe("nav languages", () => {
  it("translates the visible labels", () => {
    expect(en.solutions.trigger).not.toBe(es.solutions.trigger);
    expect(en.cta).not.toBe(es.cta);
    expect(en.engagement.trigger).not.toBe(es.engagement.trigger);
    expect(en.resources.items.research.title).not.toBe(es.resources.items.research.title);
  });
});
