import { describe, expect, it } from "vitest";
import { copy as en } from "@/content/en";
import { copy as es } from "@/content/es";
import { caseIndustries, cases } from "./cases-data";

describe("use cases filter", () => {
  it("offers only industries that have cases, and retail has none yet (site map)", () => {
    for (const industry of caseIndustries) expect(cases.some((c) => c.industry === industry)).toBe(true);
    expect(caseIndustries).not.toContain("retail");
  });

  it.each([
    ["en", en],
    ["es", es],
  ])("has a label for every industry (%s)", (_name, copy) => {
    for (const industry of caseIndustries) expect(copy.resources.useCases.industries[industry].length).toBeGreaterThan(0);
  });
});
