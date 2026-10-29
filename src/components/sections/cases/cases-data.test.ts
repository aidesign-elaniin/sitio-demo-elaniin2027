import { describe, expect, it } from "vitest";
import { cases as en } from "@/content/en/cases";
import { cta as ctaEn } from "@/content/en/cta";
import { cases as es } from "@/content/es/cases";
import { cta as ctaEs } from "@/content/es/cta";
import { cases } from "./cases-data";

describe("cases data", () => {
  it("lists four cases with neutral ids, a layout and a scene kind", () => {
    expect(cases.map((c) => c.id)).toEqual(["delivery-tracking", "sme-payments", "support-assistant", "cloud-migration"]);
    expect(cases.map((c) => c.layout)).toEqual(["wide", "narrow", "narrow", "wide"]);
    expect(cases.map((c) => c.scene)).toEqual(["shipment", "signup", "support", "cloud"]);
  });
});

describe.each([
  ["en", en],
  ["es", es],
])("cases dictionary (%s)", (_name, copy) => {
  it("has sector, title and excerpt for every case", () => {
    for (const c of cases) {
      const t = copy.items[c.id];
      expect(t.sector.length).toBeGreaterThan(0);
      expect(t.title.length).toBeGreaterThan(0);
      expect(t.excerpt.length).toBeGreaterThan(0);
    }
  });

  it("keeps the placeholders of the scene sentences", () => {
    const s = copy.scenes;
    expect(s.shipment.eta).toContain("{n}");
    expect(s.shipment.deliveredAt).toContain("{time}");
    expect(s.shipment.shipment).toContain("{id}");
    expect(s.shipment.toast).toContain("{id}");
    expect(s.shipment.summary).toContain("{place}");
    expect(s.signup.receivedDetail).toContain("{amount}");
    expect(s.signup.step).toContain("{n}");
    expect(s.cloud.estimated).toContain("{amount}");
  });

  it("has three places, four shipment steps and two accounts", () => {
    expect(copy.scenes.shipment.places).toHaveLength(3);
    expect(copy.scenes.shipment.steps).toHaveLength(4);
    expect(copy.scenes.signup.accounts).toHaveLength(2);
  });
});

describe("cta dictionary", () => {
  it("is translated", () => {
    expect(ctaEn.title).not.toBe(ctaEs.title);
    expect(ctaEn.primary).not.toBe(ctaEs.primary);
    expect(en.title).not.toBe(es.title);
  });
});
