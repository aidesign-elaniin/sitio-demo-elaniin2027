import type { NotFoundCopy } from "../schema";

/* Dummy copy. */
export const notFound: NotFoundCopy = {
  tag: "404",
  documentTitle: "Page not found | Elaniin",
  title: "This page doesn't exist.",
  lead: "The link may be broken or the page may have moved. Go back to the home page or tell us what you were looking for.",
  home: "Back to home",
  talk: "Talk to the team",
  linksLabel: "Where to go next",
  links: {
    solutions: { title: "Solutions", description: "Software, AI and cloud, solved together." },
    cases: { title: "Cases", description: "Results that are measured." },
    research: { title: "Research", description: "What we study and publish." },
  },
};
