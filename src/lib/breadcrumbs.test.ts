import { describe, expect, it } from "vitest";
import { showsBreadcrumbs, trail } from "./breadcrumbs";

describe("breadcrumb trail", () => {
  it("walks the route table from home to the page", () => {
    expect(trail("customSoftware")).toEqual(["home", "solutions", "softwareDevelopment", "customSoftware"]);
    expect(trail("caseSmePayments")).toEqual(["home", "resources", "useCases", "caseSmePayments"]);
    expect(trail("publicSector")).toEqual(["home", "industries", "publicSector"]);
  });

  it("skips path segments that have no page of their own", () => {
    expect(trail("articleInsights")).toEqual(["home", "resources", "articleInsights"]);
  });

  it("shows from level 2 only", () => {
    expect(showsBreadcrumbs("home")).toBe(false);
    expect(showsBreadcrumbs("solutions")).toBe(false);
    expect(showsBreadcrumbs("contact")).toBe(false);
    expect(showsBreadcrumbs("cloud")).toBe(true);
    expect(showsBreadcrumbs("staffAugmentation")).toBe(true);
  });
});
