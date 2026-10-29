import { describe, expect, it } from "vitest";
import { copy as en } from "@/content/en";
import { copy as es } from "@/content/es";
import type { Landing, ServiceLineCopy } from "@/content/schema";
import { lines } from "@/components/sections/service/registry";
import { LANDINGS } from "./landing-data";

const ids = Object.keys(LANDINGS) as Landing[];

describe("landings", () => {
  it("combines only services that have a page", () => {
    const services = lines.flatMap((l) => l.services.map((s) => s.route));
    for (const id of ids) for (const s of LANDINGS[id].services) expect(services).toContain(s);
  });

  it.each([
    ["en", en],
    ["es", es],
  ])("has hero, case names and metadata for every landing, and a card for every service (%s)", (_name, copy) => {
    const cards = Object.assign({}, ...lines.map((l) => (copy[l.copy] as ServiceLineCopy<string>).hub.cards));
    for (const id of ids) {
      expect(copy.landings.pages[id].hero.headline.length).toBeGreaterThan(0);
      expect(copy.landings.pages[id].proof.length).toBeGreaterThan(0);
      expect(copy.meta[id].title.length).toBeGreaterThan(0);
      for (const s of LANDINGS[id].services) expect(cards[s]?.title.length).toBeGreaterThan(0);
    }
  });
});
