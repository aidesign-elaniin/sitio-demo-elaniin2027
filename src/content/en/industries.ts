import type { IndustriesCopy } from "../schema";

/*
  Dummy copy. Translation of the Spanish sample content. Structure from docs/sitemap-elaniin.md 3.22 to 3.26. No
  invented figures: internal data from the site map stays out until validated. Each featured project is sample text.
*/
export const industries: IndustriesCopy = {
  hub: {
    hero: {
      headline: "We understand your sector before you ask.",
      lead: "Government, banking, restaurants and retail: each has its own rules, timelines and risks. We work with them in mind from day one.",
      cta: "Talk to the team",
    },
    intro: {
      title: "Four industries, one standard.",
      lead: {
        strong: "The context changes, the way we deliver does not.",
        rest: "Choose your industry to see how we work in it.",
      },
    },
    cards: {
      publicSector: { title: "Public sector", text: "For heads of institutions, modernization directors and procurement." },
      financialServices: { title: "Financial services", text: "For IT, digital transformation and digital channels." },
      restaurants: { title: "Restaurants", text: "For owners and general managers of restaurant chains." },
      retail: { title: "Retail", text: "A growing market for the team." },
    },
    stats: {
      title: "What we offer in each.",
      lead: { strong: "The same catalog for every industry.", rest: "Adapted to the rules of each sector." },
      labels: { industries: "industries", services: "services", models: "engagement models" },
    },
    certifications: { label: "Certifications", items: ["Google Cloud"] },
  },
  pages: {
    publicSector: {
      hero: {
        headline: "Technology for the institutions that serve citizens.",
        lead: "Systems, procedures and digital services for the public sector, with the procurement and controls it requires.",
        cta: "Talk to the team",
      },
      data: {
        title: "What the public sector needs.",
        lead: { strong: "Services that cannot fail.", rest: "And procurement processes you need to know in advance." },
        points: [
          { title: "Continuity", text: "Citizen services don't stop for a system change." },
          { title: "Public procurement", text: "Proposals aligned with procurement processes." },
          { title: "Transparency", text: "Documented, auditable deliverables." },
        ],
      },
      cases: {
        title: "Use cases.",
        lead: { strong: "Projects in the public sector.", rest: "Sample content." },
        empty: "There are no published cases in this industry yet.",
        all: "See all cases",
      },
      featured: {
        title: "Featured project.",
        lead: { strong: "The most representative project in the sector goes here.", rest: "Sample content until the case is approved." },
      },
    },
    financialServices: {
      hero: {
        headline: "Software for financial institutions that can't stop.",
        lead: "Digital channels, core integration and migrations in regulated environments.",
        cta: "Talk to the team",
      },
      data: {
        title: "What banking needs.",
        lead: { strong: "Security and compliance in every change.", rest: "Without losing speed against digital competitors." },
        points: [
          { title: "Regulated environment", text: "Every integration is designed for audit and control." },
          { title: "Digital channels", text: "Apps and services customers use every day." },
          { title: "Core and integrations", text: "Secure connection between the core and new services." },
        ],
      },
      cases: {
        title: "Use cases.",
        lead: { strong: "Projects in financial services.", rest: "Sample content." },
        empty: "There are no published cases in this industry yet.",
        all: "See all cases",
      },
      featured: {
        title: "Featured project.",
        lead: { strong: "The most representative project in the sector goes here.", rest: "Sample content until the case is approved." },
      },
    },
    restaurants: {
      hero: {
        headline: "Technology for restaurant chains that want to grow.",
        lead: "Orders, operations and digital channels connected, to sell more without adding manual work.",
        cta: "Talk to the team",
      },
      data: {
        title: "What a restaurant needs.",
        lead: { strong: "Every order counts, on every channel.", rest: "And operations can't depend on manual processes." },
        points: [
          { title: "Multichannel orders", text: "App, web, delivery and counter in a single flow." },
          { title: "Operations", text: "Inventory and kitchen connected to what is sold." },
          { title: "Automation", text: "Repetitive tasks handled by AI agents." },
        ],
      },
      cases: {
        title: "Use cases.",
        lead: { strong: "Projects in restaurants.", rest: "Sample content." },
        empty: "There are no published cases in this industry yet.",
        all: "See all cases",
      },
      featured: {
        title: "Featured project.",
        lead: { strong: "The most representative project in the sector goes here.", rest: "Sample content until the case is approved." },
      },
    },
    retail: {
      hero: {
        headline: "Retail that sells just as well in store and online.",
        lead: "Digital commerce, inventory and operations connected to grow without friction.",
        cta: "Talk to the team",
      },
      data: {
        title: "What retail needs.",
        lead: { strong: "One inventory for every channel.", rest: "And an experience that doesn't break between store and app." },
        points: [
          { title: "Omnichannel", text: "Physical store, web and app with the same information." },
          { title: "Inventory", text: "Real stock on every channel, in real time." },
          { title: "Data", text: "Sales and behavior to make better decisions." },
        ],
      },
      cases: {
        title: "Use cases.",
        lead: { strong: "Projects in retail.", rest: "It is a growing market for us." },
        empty: "There are no published cases in this industry yet.",
        all: "See all cases",
      },
      featured: {
        title: "Featured project.",
        lead: { strong: "The first retail case is coming soon.", rest: "Meanwhile, tell us about your project." },
      },
    },
  },
};
