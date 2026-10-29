import type { FooterCopy } from "../schema";

/* Brand line, columns, entity line and legal supplied by the team (2026-10-27). The badge names are read from the badges. */
export const footer: FooterCopy = {
  navLabel: "Footer",
  socialsLabel: "Social media",
  tagline: {
    lead: "Make complexity work.",
    rest: "Intelligent software your business runs on.",
  },
  entity: "Intelligent software company since 2014",
  aiSummary: {
    label: "Get an AI summary of Elaniin:",
    prompt: "Summarize what Elaniin does, its services and how it works, based on {url}",
    opensIn: "(opens in a new tab)",
  },
  columns: [
    { heading: "Solutions", links: ["Software development", "AI solutions", "Cloud", "Applied AI"] },
    { heading: "Engagement models", links: ["Staff augmentation", "Dedicated teams", "Project delivery"] },
    { heading: "Industries", links: ["Public sector", "Financial services", "Restaurants", "Retail"] },
    { heading: "Resources", links: ["Use cases", "Research", "Contact", "Status", "Report an issue"] },
  ],
  credentials: {
    label: "Our certifications",
    items: {
      aws: "AWS Partner, Premier Tier Services",
      google: "Google Cloud Partner",
      webflow: "Webflow Professional Partner",
      clutchGlobal: "Clutch Global",
      clutchSoftware: "Clutch Top Software Developers, El Salvador",
      clutchStaff: "Clutch Top Staff Augmentation Company, El Salvador",
      gptw: "Great Place to Work, El Salvador",
      claude: "Claude Certified Services Partner",
    },
  },
  legal: ["Legal", "Privacy"],
  copyright: "© 2027 Elaniin",
};
