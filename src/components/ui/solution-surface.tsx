import type { CSSProperties, ReactNode } from "react";
import { modulePattern } from "@/lib/module-pattern";

/*
  The three looks of the solution lines (DESIGN.md mega-menu.solution-cards): each solution has its own surface,
  pattern and accent, all from our blue ramp and our own motifs:
    software: light blue + the module grid     ai: Excellence Blue + square grid     cloud: Inspire Grey + layer lines
  Shared by the nav menu and the solutions section so they cannot drift apart. Patterns are CSS only (gradients and
  masks) and decorative. Put <SolutionSurface /> inside an element that is `relative isolate overflow-hidden`.
*/
export type SolutionId = "software" | "ai" | "cloud";

export type Look = {
  card: string;
  dark: boolean;
  title: string;
  text: string;
  rule: string;
  linkHover: string;
  arrow: string;
  pattern?: CSSProperties;
  /** Art made of elements (when a gradient is not enough). Decorative. */
  art?: ReactNode;
  glow: string;
};

/*
  AI texture: a square grid (horizontal and vertical hairlines), anchored to the top right so the cells at the right edge
  are whole, and faded out toward the title. No filled cells and no color: the card gets its blue from the glow.
*/
const PITCH = 20; // px
const LINE = "rgb(255 255 255 / 0.09)";
const FADE = "radial-gradient(120% 90% at 100% 0%, #000 0%, transparent 85%)";

function GridArt() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to right, ${LINE} 1px, transparent 1px), linear-gradient(to bottom, ${LINE} 1px, transparent 1px)`,
        backgroundSize: `${PITCH}px ${PITCH}px`,
        backgroundPosition: "right top",
        maskImage: FADE,
        WebkitMaskImage: FADE,
      }}
    />
  );
}

export const LOOKS: Record<SolutionId, Look> = {
  software: {
    card: "bg-blue-tint-50",
    dark: false,
    title: "text-text-primary",
    text: "text-text-secondary",
    rule: "border-blue-200",
    linkHover: "hover:bg-white/70",
    arrow: "text-text-link",
    pattern: {
      ...modulePattern("var(--color-blue-300)", 3),
      opacity: 0.55,
      maskImage: "radial-gradient(120% 90% at 100% 0%, #000 0%, transparent 65%)",
      WebkitMaskImage: "radial-gradient(120% 90% at 100% 0%, #000 0%, transparent 65%)",
    },
    glow: "radial-gradient(60% 50% at 0% 100%, color-mix(in srgb, var(--color-blue-200) 70%, transparent), transparent)",
  },
  ai: {
    card: "bg-surface-dark",
    dark: true,
    title: "text-text-on-dark",
    text: "text-text-on-dark-secondary",
    rule: "border-border-on-dark",
    linkHover: "hover:bg-white/10",
    arrow: "text-text-on-dark-accent",
    art: <GridArt />,
    glow: "radial-gradient(60% 55% at 100% 0%, var(--color-blue-700), transparent), radial-gradient(45% 40% at 0% 100%, var(--color-blue-800), transparent)",
  },
  cloud: {
    card: "bg-surface-subtle",
    dark: false,
    title: "text-text-primary",
    text: "text-text-secondary",
    rule: "border-border-strong",
    linkHover: "hover:bg-white/80",
    arrow: "text-text-link",
    pattern: {
      backgroundImage: "repeating-linear-gradient(180deg, var(--color-border-strong) 0 1px, transparent 1px 12px)",
      maskImage: "linear-gradient(to bottom, #000 0%, transparent 75%)",
      WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 75%)",
    },
    glow: "radial-gradient(60% 50% at 100% 0%, #fff, transparent)",
  },
};

/** The two decorative layers of a look (glow, then pattern or art), behind the content of the card. */
export function SolutionSurface({ look }: { look: Look }) {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: look.glow }} />
      {look.pattern && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={look.pattern} />
      )}
      {look.art && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {look.art}
        </div>
      )}
    </>
  );
}

/*
  Lighter variant for the engagement and resources menus: only the software look keeps its texture (module grid and
  glow); the AI look keeps its blue glow as a gradient without the grid; the cloud look stays a flat Inspire Grey.
*/
export function MenuSurface({ id }: { id: SolutionId }) {
  if (id === "software") return <SolutionSurface look={LOOKS.software} />;
  if (id === "ai")
    return <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: LOOKS.ai.glow }} />;
  return null;
}
