import type { ResearchCopy } from "../schema";

/* Dummy copy (every study, sample and figure is invented). */
export const research: ResearchCopy = {
  title: "Our own research.",
  lead: {
    strong: "We study how software is built and run.",
    rest: "We publish what we find, with the sample and the method in plain sight.",
  },
  viewAll: "View all research",
  filterLabel: "Filter by type",
  all: "All",
  kinds: { report: "Report", study: "Study" },
  topicFilterLabel: "Filter by topic",
  topics: { ai: "AI", cloud: "Cloud", product: "Product" },
  units: { percent: "%", outOfTen: "out of 10" },
  spoken: { percent: "{n} percent", outOfTen: "{n} out of 10" },
  items: {
    "ai-pilots": { finding: "of AI pilots never reach production.", source: "Survey of 412 product teams" },
    "cloud-spend": { finding: "of cloud spend goes unused.", source: "Analysis of 86 cloud accounts" },
    "weekly-delivery": {
      finding: "of teams that ship every week fix their errors in under a day.",
      source: "Tracking of 120 teams over a year",
    },
    "long-signups": {
      finding: "users abandon a sign-up of more than four steps.",
      source: "Tests with 1,800 people across 9 products",
    },
  },
};
