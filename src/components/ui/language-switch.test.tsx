import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { switchLinks, withHash } from "@/lib/routes";
import { sectionAtLine } from "@/lib/current-section";
import { LanguageSwitch } from "./language-switch";

const names = { en: "English", es: "Español" };

describe("switchLinks", () => {
  it("points each language at the same page and marks the current one", () => {
    const en = switchLinks("home", "en", names);
    expect(en.map((l) => [l.lang, l.href, l.current])).toEqual([
      ["en", "/", true],
      ["es", "/es", false],
    ]);
    expect(switchLinks("home", "es", names).find((l) => l.current)?.lang).toBe("es");
  });
});

describe("withHash", () => {
  it("keeps the section the visitor was reading when the language changes", () => {
    expect(withHash("/es", "#cases")).toBe("/es#cases");
    expect(withHash("/", "#cases")).toBe("/#cases");
  });

  it("adds nothing when there is no hash", () => {
    expect(withHash("/es", "")).toBe("/es");
  });
});

describe("LanguageSwitch", () => {
  const html = renderToStaticMarkup(<LanguageSwitch links={switchLinks("home", "es", names)} label="Idioma" />);

  it("renders two links with hreflang and lang", () => {
    expect(html.match(/<a /g)).toHaveLength(2);
    expect(html).toMatch(/hreflang="en"/i); // React 19 prints hrefLang; HTML attributes are case-insensitive
    expect(html).toMatch(/hreflang="es"/i);
    expect(html).toContain('lang="en"');
    expect(html).toContain('lang="es"');
  });

  it("marks only the current language with aria-current", () => {
    expect(html.match(/aria-current="true"/g)).toHaveLength(1);
    expect(html).toMatch(/aria-current="true"[^>]*>ES</);
  });

  it("shows EN and ES, names each link, and labels the group", () => {
    expect(html).toContain(">EN<");
    expect(html).toContain(">ES<");
    expect(html).toContain('aria-label="English"');
    expect(html).toContain('aria-label="Español"');
    expect(html).toContain('<nav aria-label="Idioma"');
  });
});

describe("sectionAtLine", () => {
  const tops = (home: number, cases: number, faq: number) => [
    { id: "home", top: home },
    { id: "cases", top: cases },
    { id: "faq", top: faq },
  ];

  it("answers the last section whose top has passed the line under the bar", () => {
    expect(sectionAtLine(tops(-1200, -200, 900), 80)).toBe("cases");
    expect(sectionAtLine(tops(-3000, -1800, -60), 80)).toBe("faq");
  });

  it("answers null on the hero or when there are no sections, so the switch lands on the top", () => {
    expect(sectionAtLine(tops(0, 900, 1800), 80)).toBeNull();
    expect(sectionAtLine([], 80)).toBeNull();
  });
});
