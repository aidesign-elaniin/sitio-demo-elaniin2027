import { describe, expect, it } from "vitest";
import { engagement as en } from "@/content/en/engagement";
import { engagement as es } from "@/content/es/engagement";
import { engagementModels } from "./engagement-data";

describe.each([
  ["en", en],
  ["es", es],
])("engagement dictionary (%s)", (_name, copy) => {
  it("has the three models in the order of the data, each with a name, a description, a fit sentence and a link", () => {
    expect(copy.items.map((i) => i.id)).toEqual(engagementModels.map((m) => m.id));
    for (const item of copy.items) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.rest.length).toBeGreaterThan(0);
      expect(item.fit.length).toBeGreaterThan(0);
      expect(item.link.length).toBeGreaterThan(0);
    }
  });

  it("has the three sample names of the staff scene, short enough for the pill", () => {
    expect(copy.visuals.staff.names).toHaveLength(3);
    for (const name of copy.visuals.staff.names) expect(name.length).toBeLessThanOrEqual(10);
  });
});

describe("engagement languages", () => {
  it("translates the title and the sentences", () => {
    expect(en.title).not.toBe(es.title);
    expect(en.items[0].fit).not.toBe(es.items[0].fit);
  });
});
