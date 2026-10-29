import { describe, expect, it } from "vitest";
import { notFound as en } from "./en/not-found";
import { notFound as es } from "./es/not-found";

describe.each([
  ["en", en],
  ["es", es],
])("404 dictionary (%s)", (_name, copy) => {
  it("has a tag, title, lead, both buttons and the document title", () => {
    expect(copy.tag).toBe("404");
    for (const text of [copy.title, copy.lead, copy.home, copy.talk, copy.documentTitle, copy.linksLabel]) {
      expect(text.length).toBeGreaterThan(0);
    }
  });

  it("has a name and a description for each of the three suggested links", () => {
    for (const id of ["solutions", "cases", "research"] as const) {
      expect(copy.links[id].title.length).toBeGreaterThan(0);
      expect(copy.links[id].description.length).toBeGreaterThan(0);
    }
  });
});

describe("404 languages", () => {
  it("is translated", () => {
    expect(en.title).not.toBe(es.title);
    expect(en.lead).not.toBe(es.lead);
    expect(en.home).not.toBe(es.home);
  });
});
