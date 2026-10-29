import { describe, expect, it } from "vitest";
import { hero as en } from "@/content/en/hero";
import { hero as es } from "@/content/es/hero";

describe.each([
  ["en", en],
  ["es", es],
])("hero copy (%s)", (_name, copy) => {
  it("has the accent words inside the headline as written", () => {
    expect(copy.headline).toContain(copy.accent);
  });

  it("keeps the sales CTA short (it was 28 characters, now it reads like the nav button)", () => {
    expect(copy.ctaSales.length).toBeLessThanOrEqual(14);
  });

  it("keeps the lead short enough for two lines at 375px (about 66 characters)", () => {
    expect(copy.lead.length).toBeLessThanOrEqual(70);
  });
});
