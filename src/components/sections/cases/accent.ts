import type { CSSProperties } from "react";

/*
  Turns a client's accent into the CSS variables a scene uses. Contrast was checked for every accent
  (white on accent, accent on white, ink on soft: all at or above 4.5:1).
    --accent       fills: primary button, progress, active step
    --accent-ink   accent darkened 22%: text on the soft tint (the plain accent fails on it for three of the five)
    --accent-soft  12% tint over white: selected rows, pills, icon tiles
    --accent-line  30% tint over white: hairlines and rings
*/
export function accentStyle(accent: string): CSSProperties {
  return {
    "--accent": accent,
    "--accent-ink": "color-mix(in srgb, var(--accent) 78%, black)",
    "--accent-soft": "color-mix(in srgb, var(--accent) 12%, white)",
    "--accent-line": "color-mix(in srgb, var(--accent) 30%, white)",
  } as CSSProperties;
}
