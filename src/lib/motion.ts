/* Motion presets. Values mirror DESIGN.md `motion.*` and the CSS variables in globals.css. */
export const ease = {
  standard: [0.4, 0, 0.2, 1] as const,
  emphasized: [0.25, 1, 0.5, 1] as const,
};

export const duration = {
  instant: 0.1,
  fast: 0.15,
  base: 0.2,
  slow: 0.3,
  reveal: 0.5,
};
