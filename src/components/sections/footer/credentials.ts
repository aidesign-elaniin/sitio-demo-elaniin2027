/*
  The credentials of the footer (DESIGN.md components.footer.credentials): the badges of public/certification, in order. The files are
  black on transparent, made for light backgrounds; the footer turns them white. `tall` is the class for the height: the square badges
  are 64px high; the Webflow one is wide, goes LAST and is 24px high. The name of each badge (its alt text) lives in the footer dictionary.
*/
export type CredentialId =
  "aws" | "google" | "webflow" | "clutchGlobal" | "clutchSoftware" | "clutchStaff" | "gptw" | "claude";

export const credentials: { id: CredentialId; src: string; width: number; height: number; tall: string }[] = [
  { id: "aws", src: "/certification/badge-clutch-aws.svg", width: 94, height: 94, tall: "h-16" },
  { id: "google", src: "/certification/gcp.svg", width: 104, height: 104, tall: "h-16" },
  { id: "clutchGlobal", src: "/certification/badge-clutch-global.svg", width: 118, height: 104, tall: "h-16" },
  {
    id: "clutchSoftware",
    src: "/certification/badge-clutch-top-software-developers.svg",
    width: 98,
    height: 110,
    tall: "h-16",
  },
  { id: "clutchStaff", src: "/certification/badge-clutch-top-staff.svg", width: 98, height: 110, tall: "h-16" },
  { id: "gptw", src: "/certification/gptw.svg", width: 104, height: 104, tall: "h-16" },
  { id: "claude", src: "/certification/claude.svg", width: 50, height: 50, tall: "h-16" },
  // The wide one goes last and smaller.
  { id: "webflow", src: "/certification/webflow.svg", width: 223, height: 34, tall: "h-6" },
];
