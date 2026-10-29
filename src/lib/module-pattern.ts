/*
  Decorative fields are built from square modules on one shared unit. The module language belongs to the system, not to the isotipo (pending approval).
  Shared by the hero and the closing CTA. Values mirror DESIGN.md motifs.module-field.
*/
export const MODULE_SIZE = 2; // px, square side at rest
export const MODULE_PITCH = 16; // px, grid pitch (multiple of the 8px grid)

/**
  One square per tile, centered in the tile, drawn with a hard-stop conic gradient (no JS, no image).
  The quadrant [0,size]x[0,size] is painted, then the whole pattern is shifted to center it.
*/
export function modulePattern(color: string, size: number = MODULE_SIZE) {
  const offset = (MODULE_PITCH - size) / 2;
  return {
    backgroundImage: `conic-gradient(from 270deg at ${size}px ${size}px, ${color} 0 90deg, transparent 0)`,
    backgroundSize: `${MODULE_PITCH}px ${MODULE_PITCH}px`,
    backgroundPosition: `${offset}px ${offset}px`,
  } as const;
}
