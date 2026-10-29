import type { ResourcesCopy } from "../schema";

/* Dummy copy. Translation of the Spanish sample content. Structure from docs/sitemap-elaniin.md 3.18 to 3.20. */
export const resources: ResourcesCopy = {
  hub: {
    hero: {
      headline: "Proof and judgment, before you decide.",
      lead: "Client cases by industry and our own research, for anyone still evaluating.",
      cta: "Talk to the team",
    },
    intro: {
      title: "Two ways to get to know us.",
      lead: {
        strong: "What we have delivered and what we have learned.",
        rest: "Cases show results; research shows how we think.",
      },
    },
    cards: {
      useCases: { title: "Use cases", text: "Client projects, filtered by industry." },
      research: { title: "Research", text: "Our own studies and articles, with the sample and method in plain view." },
    },
  },
  useCases: {
    hero: {
      headline: "Results that are measured, by industry.",
      lead: "Every case starts with a problem and a metric, and ends with it.",
      cta: "Tell us about your case",
    },
    filterLabel: "Filter by industry",
    all: "All",
    industries: {
      publicSector: "Public sector",
      financialServices: "Financial services",
      restaurants: "Restaurants",
      retail: "Retail",
    },
  },
  research: {
    hero: {
      headline: "What we study and publish.",
      lead: "Research on how software is built and run, with the sample and method in plain view.",
      cta: "Talk to the team",
    },
  },
};
