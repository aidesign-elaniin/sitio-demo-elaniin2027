import type { NavCopy } from "../schema";
import { cases } from "./cases";
import { engagement } from "./engagement";

/* The sample cases of the featured cards come from the cases dictionary, so the text cannot drift. */
const featured = (id: "delivery-tracking" | "sme-payments") => ({
  title: cases.items[id].title,
  action: cases.read,
  metric: cases.items[id].sector,
});

/* Dummy copy. Translation of the Spanish sample content; the real copy arrives with the real content. */
export const nav: NavCopy = {
  homeAria: "Elaniin, home",
  mobileNavLabel: "Mobile main",
  cta: "Start a project",
  blog: "Blog",
  menu: { open: "Open menu", close: "Close menu" },
  plain: { appliedAi: "Applied AI" },
  solutions: {
    all: "All solutions",
    trigger: "Solutions",
    items: {
      software: {
        title: "Software development",
        description: "Mission-critical software, built and sustained in production.",
        links: ["Custom software", "Application modernization", "Mobile apps", "Support and evolution"],
      },
      ai: {
        title: "AI solutions",
        description: "Automate real processes, not pilots that never reach production.",
        links: ["AI agents and process automation"],
      },
      cloud: {
        title: "Cloud",
        description: "Migration and integration when the problem is the infrastructure.",
        links: ["Cloud migration", "API management and integration"],
      },
    },
    help: {
      question: "Not sure where to start? Tell us the problem and we'll map the way.",
      action: "Talk to the team",
    },
  },
  engagement: {
    trigger: "Engagement models",
    items: {
      staff: {
        title: "Staff augmentation",
        description: "Senior engineers who join your team and work with your process.",
      },
      dedicated: {
        title: "Dedicated teams",
        description: "A full team for your product, managed by Elaniin or by you.",
      },
      project: {
        title: "Project delivery",
        description: "Defined scope, date and price, delivered from start to finish.",
      },
    },
    visuals: engagement.visuals,
    help: {
      question: "Not sure which model fits? Tell us your situation and we'll recommend one.",
      action: "Talk to the team",
    },
  },
  resources: {
    trigger: "Resources",
    items: {
      cases: { title: "Cases", description: "Results that are measured" },
      research: { title: "Our research", description: "What we study and publish" },
      hub: { title: "All resources", description: "Cases, research and articles" },
    },
    featured: {
      heading: "Featured cases",
      subtitle: "Results that are measured",
      cards: [
        { ...featured("delivery-tracking"), scene: cases.scenes.shipment },
        { ...featured("sme-payments"), scene: cases.scenes.signup },
      ],
    },
  },
};
