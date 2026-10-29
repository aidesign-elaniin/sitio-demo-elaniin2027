import { describe, expect, it } from "vitest";
import { footer as en } from "./en/footer";
import { footer as es } from "./es/footer";
import { credentials } from "@/components/sections/footer/credentials";

describe.each([
  ["en", en],
  ["es", es],
])("footer dictionary (%s)", (_name, copy) => {
  it("keeps the {url} placeholder in the AI summary prompt", () => {
    expect(copy.aiSummary.prompt.split("{url}")).toHaveLength(2);
    expect(copy.aiSummary.label.length).toBeGreaterThan(0);
    expect(copy.aiSummary.opensIn.length).toBeGreaterThan(0);
  });

  it("has four link columns, a legal row and the entity line", () => {
    expect(copy.columns).toHaveLength(4);
    expect(copy.legal).toHaveLength(2);
    expect(copy.entity).toContain("2014");
  });

  it("writes the copyright as the team supplied it", () => {
    expect(copy.copyright).toBe("© 2027 Elaniin");
  });

  it("names every credential badge, for its alt text", () => {
    for (const badge of credentials) expect(copy.credentials.items[badge.id].length).toBeGreaterThan(0);
    expect(Object.keys(copy.credentials.items)).toHaveLength(credentials.length);
  });
});

describe("footer languages", () => {
  it("has the same structure in both languages and different words", () => {
    expect(en.columns.map((c) => c.links.length)).toEqual(es.columns.map((c) => c.links.length));
    expect(en.legal).toHaveLength(es.legal.length);
    expect(en.aiSummary.label).not.toBe(es.aiSummary.label);
  });
});
