import { describe, expect, it } from "vitest";
import { research as en } from "@/content/en/research";
import { research as es } from "@/content/es/research";
import { researchItems, researchKinds, researchTopics } from "./research-data";

describe("research data", () => {
  it("uses neutral ids: kinds as report/study, dates as YYYY-MM, units as ids", () => {
    expect(researchKinds).toEqual(["report", "study"]);
    for (const item of researchItems) {
      expect(researchKinds).toContain(item.kind);
      expect(item.date).toMatch(/^\d{4}-\d{2}$/);
      expect(["percent", "outOfTen"]).toContain(item.unit);
    }
  });
});

describe.each([
  ["en", en],
  ["es", es],
])("research dictionary (%s)", (_name, copy) => {
  it("has a finding and a source for every item, and a label for every kind", () => {
    for (const item of researchItems) {
      expect(copy.items[item.id].finding.length).toBeGreaterThan(0);
      expect(copy.items[item.id].source.length).toBeGreaterThan(0);
    }
    for (const kind of researchKinds) expect(copy.kinds[kind].length).toBeGreaterThan(0);
  });

  it("has a label for every topic, and every topic has at least one item", () => {
    for (const topic of researchTopics) {
      expect(copy.topics[topic].length).toBeGreaterThan(0);
      expect(researchItems.some((item) => item.topic === topic)).toBe(true);
    }
  });

  it("keeps the {n} placeholder in the spoken forms", () => {
    expect(copy.spoken.percent).toContain("{n}");
    expect(copy.spoken.outOfTen).toContain("{n}");
  });
});

describe("research languages", () => {
  it("translates the header, the filter and the kinds", () => {
    expect(en.title).not.toBe(es.title);
    expect(en.all).not.toBe(es.all);
    expect(en.kinds.report).not.toBe(es.kinds.report);
  });
});
