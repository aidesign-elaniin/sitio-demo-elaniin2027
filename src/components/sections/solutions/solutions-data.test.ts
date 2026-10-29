import { describe, expect, it } from "vitest";
import { solutions as en } from "@/content/en/solutions";
import { solutions as es } from "@/content/es/solutions";
import { formatMetric, solutionItems } from "./solutions-data";

describe("solutions data", () => {
  it("describes three solutions with neutral ids and numeric metrics", () => {
    expect(solutionItems.map((s) => s.id)).toEqual(["ai", "software", "cloud"]);
    for (const s of solutionItems) expect(s.metrics).toHaveLength(2);
  });
});

describe.each([
  ["en", en],
  ["es", es],
])("solutions dictionary (%s)", (_name, copy) => {
  it("covers every solution with three bullets and a label for each metric", () => {
    for (const s of solutionItems) {
      const text = copy.items[s.id];
      expect(text.bullets).toHaveLength(3);
      expect(text.metrics).toHaveLength(s.metrics.length);
      expect(text.cta.length).toBeGreaterThan(0);
    }
  });

  it("keeps the card text inside its character budget (the long sentences live in the dialog)", () => {
    for (const s of solutionItems) {
      const text = copy.items[s.id];
      expect(text.lead.length).toBeLessThanOrEqual(28);
      expect(text.rest.length).toBeLessThanOrEqual(110);
    }
    expect(copy.lead.strong.length + copy.lead.rest.length).toBeLessThanOrEqual(130);
  });

  it("keeps the {title} placeholder in the card button name", () => {
    expect(copy.card.details).toContain("{title}");
  });

  it("has the strings of the three animated visuals", () => {
    expect(copy.visuals.delivery.steps).toHaveLength(4);
    expect(copy.visuals.product.platform.length).toBeGreaterThan(0);
    expect(copy.visuals.cloud.availability.length).toBeGreaterThan(0);
  });
});

describe("formatMetric", () => {
  const metricsOf = (id: string) => solutionItems.find((s) => s.id === id)!.metrics;
  const [commit, coverage] = metricsOf("software");
  const [uptime, cost] = metricsOf("cloud");
  const [assisted] = metricsOf("ai");

  it("formats minutes with the unit of the dictionary", () => {
    expect(formatMetric("en", commit, en.units)).toBe("14 min");
    expect(formatMetric("es", commit, es.units)).toBe("14 min");
  });

  it("formats percentages with the separators of each language", () => {
    expect(formatMetric("en", coverage, en.units)).toBe("82%");
    expect(formatMetric("es", coverage, es.units)).toBe("82%");
    expect(formatMetric("en", uptime, en.units)).toBe("99.98%");
    expect(formatMetric("es", uptime, es.units)).toBe("99.98%");
    expect(formatMetric("en", assisted, en.units)).toBe("+35%");
    expect(formatMetric("en", cost, en.units)).toBe("-18%");
  });
});

describe("solutions languages", () => {
  it("translates the header and the first solution", () => {
    expect(en.title).not.toBe(es.title);
    expect(en.items.software.title).not.toBe(es.items.software.title);
  });
});
