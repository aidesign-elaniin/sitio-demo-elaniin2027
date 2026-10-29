import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/*
  Blue glow, after the reference (Laravel Cloud's pricing section), rebuilt with brand tokens.
  Two layers of diagonal stripes scroll sideways at different speeds, and the whole group sits at low opacity:
    - blue stripes (Elevate Blue, with half-strength bands), slow
    - stripes in the surface color, faster, which wipe parts of the blue and make it shimmer
  Each layer is 3 tiles, each exactly one repeat wide, so a translate of one repeat loops seamlessly.
  The repeat is the horizontal width of one stripe period: period / sin(angle).
  Pure CSS (only transform animates). Decorative.

  Variants (DESIGN.md motifs.glow):
    "cta"   dark surface (Excellence Blue), centered, strongest at the bottom center and masked toward the top and both sides, behind the closing CTA.
    "media" dark surface (Excellence Blue), fills its box, behind the product scenes of the case-study cards.
  Cost on phones: the blur pass over six moving layers is the expensive part, so it only runs from 1024px, and below 768px the
  third tile of each layer is left out (two repeats still cover the width).
*/
const ANGLE = 115; // deg
const PERIOD = 640; // px along the gradient line
const REPEAT = Number((PERIOD / Math.sin((ANGLE * Math.PI) / 180)).toFixed(2)); // 706.16
const TILES = 3; // enough to cover a 1280px container plus one repeat

const BLUE_STRIPES = `repeating-linear-gradient(${ANGLE}deg, var(--glow-primary) 0px, var(--glow-primary) 50px, transparent 110px, transparent 150px, var(--glow-primary-half) 240px, transparent 280px, var(--glow-primary) 320px)`;
const SURFACE_STRIPES = `repeating-linear-gradient(${ANGLE}deg, transparent 0px, var(--glow-bg) ${PERIOD / 5}px, var(--glow-bg) ${PERIOD / 4}px, transparent ${PERIOD / 1.2}px, transparent ${PERIOD}px)`;

const VARIANTS = {
  cta: { bg: "var(--color-surface-dark)", opacity: 0.6, blue: 12000, surface: 3508.77 },
  media: { bg: "var(--color-surface-dark)", opacity: 0.7, blue: 16000, surface: 6000 },
} as const;

function Layer({ stripes, duration }: { stripes: string; duration: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: TILES }, (_, i) => (
        <div
          key={i}
          className={cn("glow-scroll absolute inset-y-0", i === TILES - 1 && "max-md:hidden")}
          style={
            {
              left: i * REPEAT,
              width: REPEAT,
              background: stripes,
              "--repeat": `${REPEAT}px`,
              "--duration": `${duration}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function BlueGlow({ variant = "cta", className }: { variant?: keyof typeof VARIANTS; className?: string }) {
  const v = VARIANTS[variant];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute overflow-hidden",
        variant === "cta"
          ? "mask-glow top-0 left-1/2 size-full max-w-[1280px] -translate-x-1/2"
          : "inset-0",
        className,
      )}
    >
      <div
        className="absolute inset-0 [contain:paint] lg:blur-md"
        style={
          {
            opacity: v.opacity,
            "--glow-primary": "var(--color-elevate-blue)",
            "--glow-primary-half": "color-mix(in oklab, var(--color-elevate-blue) 50%, transparent)",
            "--glow-bg": v.bg,
          } as CSSProperties
        }
      >
        <Layer stripes={BLUE_STRIPES} duration={v.blue} />
        <Layer stripes={SURFACE_STRIPES} duration={v.surface} />
      </div>
    </div>
  );
}
