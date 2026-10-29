/*
  Token values for places where JS needs a literal (motion keyframes, canvas).
  Mirror of the @theme block in src/app/globals.css and DESIGN.md. Change those first.
*/
export const blue = {
  100: "#d7e2f8",
  200: "#b9cefb",
  300: "#6a9aff",
  400: "#4d75fd",
  500: "#1054ff",
  600: "#0848cc",
} as const;

export const status = {
  successDot: "#1f9d61",
} as const;

export const neutral = {
  border: "#e4e4ea",
  borderStrong: "#d3d4dc",
} as const;
