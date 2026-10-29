import { describe, expect, it } from "vitest";
import { meta as en } from "./en/meta";
import { meta as es } from "./es/meta";

describe("meta dictionaries", () => {
  it("has a distinct, non-empty home title and description per language", () => {
    for (const m of [en, es]) {
      expect(m.home.title.length).toBeGreaterThan(0);
      expect(m.home.description.length).toBeGreaterThan(0);
    }
    expect(en.home.title).not.toBe(es.home.title);
    expect(en.home.description).not.toBe(es.home.description);
  });

  it("has a non-empty title and its own description for every inner page", () => {
    for (const m of [en, es]) {
      for (const page of [m.solutions, m.appliedAi]) {
        expect(page.title.length).toBeGreaterThan(0);
        expect(page.description).not.toBe(m.home.description);
      }
    }
  });
});
