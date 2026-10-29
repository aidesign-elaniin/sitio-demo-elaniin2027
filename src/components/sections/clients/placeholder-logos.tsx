import type { ReactNode } from "react";

/*
  PLACEHOLDER logos for dummy content. Invented brands, not real companies.
  Replace with client SVGs (single color, currentColor) when real logos are approved.
  Sizes are in em: set the base font-size on the wrapper (see ClientLogo) and the whole mark scales with it.
*/
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/**
  `accent` is the invented brand color of the placeholder client. It tints the logo chip of its case and the interface
  of its animated scene (DESIGN.md: client accents live only inside the case cards).
*/
export type PlaceholderLogo = { name: string; accent: string; mark: ReactNode };

export const placeholderLogos: PlaceholderLogo[] = [
  {
    name: "Altamar",
    accent: "#0B7A75",
    mark: (
      <span className="inline-flex items-center gap-[0.33em] font-display text-[1em] font-medium tracking-[-0.03em]">
        <svg {...svgProps} className="size-[1em] shrink-0">
          <path d="M2 15c3.3-6 6.7-6 10 0s6.7 6 10 0" />
          <path d="M2 9c3.3-6 6.7-6 10 0s6.7 6 10 0" opacity="0.5" />
        </svg>
        altamar
      </span>
    ),
  },
  {
    name: "Kintsu",
    accent: "#7C3AED",
    mark: (
      <span className="inline-flex items-center gap-[0.5em] font-display text-[0.667em] font-medium tracking-[0.14em] uppercase">
        <svg {...svgProps} className="size-[1.5em] shrink-0">
          <path d="M12 2.5 20.5 7.5v9L12 21.5l-8.5-5v-9z" />
          <path d="M12 8v8M8.5 10l7 4" />
        </svg>
        Kintsu
      </span>
    ),
  },
  {
    name: "nodo",
    accent: "#BE185D",
    mark: (
      <span className="inline-flex items-center gap-[0.33em] font-text text-[1em] font-semibold tracking-[-0.04em]">
        <svg {...svgProps} className="size-[1em] shrink-0">
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.2 10.8 15.8 7.2M8.2 13.2l7.6 3.6" />
        </svg>
        nodo.
      </span>
    ),
  },
  {
    name: "Vértice",
    accent: "#C2410C",
    mark: (
      <span className="inline-flex items-center gap-[0.31em] font-display text-[1.083em] font-normal tracking-[-0.02em]">
        <svg {...svgProps} fill="currentColor" className="size-[0.923em] shrink-0">
          <path d="M12 3 22 20H2z" />
        </svg>
        Vértice
      </span>
    ),
  },
  {
    name: "Orbita",
    accent: "#15803D",
    mark: (
      <span className="inline-flex items-center gap-[0.33em] font-text text-[1em] font-medium tracking-[-0.02em]">
        <svg {...svgProps} className="size-[1em] shrink-0">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
        </svg>
        orbita
      </span>
    ),
  },
];

/** Renders a placeholder logo at a given base size in px. */
export function ClientLogo({
  logo,
  size = 24,
  colored = false,
}: {
  logo: PlaceholderLogo;
  size?: number;
  /** Paint the logo in its brand accent instead of inheriting the text color. */
  colored?: boolean;
}) {
  return (
    <span className="inline-flex" style={{ fontSize: size, color: colored ? logo.accent : undefined }}>
      {logo.mark}
    </span>
  );
}
