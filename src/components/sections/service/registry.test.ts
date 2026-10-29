import { describe, expect, it } from "vitest";
import { copy as en } from "@/content/en";
import { copy as es } from "@/content/es";
import type { ServiceLineCopy } from "@/content/schema";
import { routes } from "@/lib/routes";
import { findLine, findService, lines, slugOf } from "./registry";

describe("service line registry", () => {
  it("nests every service under its line in both languages", () => {
    for (const line of lines) {
      for (const s of line.services) {
        expect(routes[s.route].en.startsWith(`${routes[line.route].en}/`)).toBe(true);
        expect(routes[s.route].es.startsWith(`${routes[line.route].es}/`)).toBe(true);
      }
    }
  });

  it("finds lines and services by their English slug", () => {
    const line = findLine("software-development")!;
    expect(line.route).toBe("softwareDevelopment");
    expect(findService(line, "application-modernization")?.route).toBe("appModernization");
    expect(findLine("nope")).toBeUndefined();
    expect(slugOf("mobileApps")).toBe("mobile-app-development");
  });

  it.each([
    ["en", en],
    ["es", es],
  ])("has hub card, page copy and metadata for every service (%s)", (_name, copy) => {
    for (const line of lines) {
      const lineCopy: ServiceLineCopy<string> = copy[line.copy];
      expect(lineCopy.hub.proof.length).toBeGreaterThan(0);
      expect(Object.keys(lineCopy.services).sort()).toEqual(line.services.map((s) => s.route).sort());
      for (const s of line.services) {
        expect(lineCopy.hub.cards[s.route].title.length).toBeGreaterThan(0);
        expect(lineCopy.services[s.route].hero.headline.length).toBeGreaterThan(0);
        expect(copy.meta[s.route].title.length).toBeGreaterThan(0);
        // A highlight link label needs a target, and the other way round.
        expect(Boolean(lineCopy.services[s.route].highlight?.link)).toBe(Boolean(s.highlight));
      }
    }
  });
});
