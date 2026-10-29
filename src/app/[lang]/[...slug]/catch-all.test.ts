import { describe, expect, it } from "vitest";
import CatchAll from "./page";

describe("catch-all route", () => {
  it("answers every unknown URL with Next's not-found signal (HTTP 404)", () => {
    let error: { digest?: string } | undefined;
    try {
      CatchAll();
    } catch (e) {
      error = e as { digest?: string };
    }
    expect(error?.digest ?? "").toContain("404");
  });
});
