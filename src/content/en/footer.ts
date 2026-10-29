import type { FooterCopy } from "../schema";

/* Dummy copy. */
export const footer: FooterCopy = {
  navLabel: "Footer",
  socialsLabel: "Social media",
  tagline: {
    lead: "Software that keeps demanding teams running.",
    rest: "You focus on the business, not on the technology.",
  },
  newsletter: {
    first: "First name",
    last: "Last name",
    email: "Email address",
    submit: "Stay in the loop",
    sending: "Sending…",
    legal: "By submitting this form you accept our {terms}. You can unsubscribe at any time.",
    terms: "terms",
    success: "Done. We'll write to you soon with news from Elaniin.",
    invalidEmail: "Enter a valid email so we can write to you.",
  },
  columns: [
    { heading: "Solutions", links: ["Software development", "AI solutions", "Cloud", "Applied AI"] },
    { heading: "Engagement models", links: ["Staff augmentation", "Dedicated teams", "Project delivery"] },
    { heading: "Industries", links: ["Public sector", "Financial services", "Restaurants", "Retail"] },
    { heading: "Resources", links: ["Use cases", "Research", "Contact"] },
  ],
  legal: ["Legal", "Privacy", "Status", "Report an issue"],
  copyright: "© 2027 elaniin",
  placeholder: "Sample content to validate the design system.",
};
