import type { NavCopy } from "../schema";

/* Dummy copy. Translation of the Spanish sample content; the real copy arrives with the real content. Structure from the primary nav of docs/sitemap-elaniin.md. */
export const nav: NavCopy = {
  homeAria: "Elaniin, home",
  mobileNavLabel: "Mobile main",
  cta: "Contact us",
  menu: { open: "Open menu", close: "Close menu" },
  plain: { appliedAi: "Applied AI" },
  solutions: {
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
      question: "Applied AI is not a separate service: it is how we deliver all three.",
      action: "Discover Applied AI",
    },
    all: "All solutions",
  },
  engagement: {
    trigger: "Engagement models",
    heading: "Choose how we work together",
    items: {
      staffAugmentation: { title: "Staff augmentation", description: "Profiles that join your team and your roadmap" },
      dedicatedTeams: { title: "Dedicated teams", description: "A full team focused on your product" },
      projectDelivery: { title: "Project delivery", description: "A closed outcome, with discovery as phase 0" },
    },
    help: {
      question: "Not sure which model fits you?",
      action: "Compare models",
    },
  },
  resources: {
    trigger: "Resources",
    explore: {
      heading: "Explore Elaniin",
      items: {
        useCases: { title: "Use cases", description: "Client cases by industry" },
        research: { title: "Research", description: "What we study and publish" },
      },
    },
    latest: {
      heading: "Latest articles",
      items: {
        insights: { title: "Insights", description: "Ideas on product and engineering" },
        playbook: { title: "Delivery playbook", description: "How we ship every week" },
        aiReport: { title: "AI report", description: "What works and what doesn't in operations" },
      },
    },
    featured: {
      heading: "Featured cases",
      subtitle: "Results that are measured",
      cards: [
        { tag: "Logistics", title: "Delivery tracking", metric: "-42% response time" },
        { tag: "Fintech", title: "Payments for small businesses", metric: "3x conversion" },
        { tag: "Applied AI", title: "Support assistant", metric: "+35% tickets per agent" },
      ],
    },
  },
};
