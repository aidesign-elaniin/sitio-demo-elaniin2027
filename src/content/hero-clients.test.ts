import { describe, expect, it } from "vitest";
import { clients as clientsEn } from "./en/clients";
import { hero as heroEn } from "./en/hero";
import { clients as clientsEs } from "./es/clients";
import { hero as heroEs } from "./es/hero";

describe("hero and clients dictionaries", () => {
  it("have a headline of several words, a lead and a call to action in each language", () => {
    for (const hero of [heroEn, heroEs]) {
      expect(hero.headline.split(" ").length).toBeGreaterThan(2);
      expect(hero.lead.length).toBeGreaterThan(0);
      expect(hero.ctaSales.length).toBeGreaterThan(0);
    }
  });

  it("differ between languages", () => {
    expect(heroEn.headline).not.toBe(heroEs.headline);
    expect(clientsEn.label).not.toBe(clientsEs.label);
  });
});
