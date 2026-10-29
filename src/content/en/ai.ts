import type { AiService, ServiceLineCopy } from "../schema";

/*
  Dummy copy. Translation of the Spanish sample content. Structure from docs/sitemap-elaniin.md 3.11 and 3.12. Proof
  strips use the names in the site map, with no invented figures.
*/
export const ai: ServiceLineCopy<AiService> = {
  hub: {
    hero: {
      headline: "Automate a real process, not a pilot.",
      lead: "AI agents that handle manual work end to end, in production and with human review where it matters.",
      cta: "Tell us which process to automate",
    },
    intro: {
      title: "AI solutions is not Applied AI.",
      lead: {
        strong: "Here AI is the product we deliver to you.",
        rest: "Applied AI is how we work across every service; AI solutions is what we build for your operation.",
      },
    },
    cards: {
      aiAgents: { title: "AI agents and automation", text: "For orders, requests and documents that depend on manual work today." },
    },
    proof: ["Donkeys", "GOES", "Publimóvil", "Ambassador"],
  },
  services: {
    aiAgents: {
      hero: {
        headline: "Manual processes that don't scale without a bigger team.",
        lead: "We build agents that take orders, requests and documents, and resolve them end to end.",
        cta: "Tell us about your process",
      },
      problem: {
        title: "When work grows faster than the team.",
        lead: {
          strong: "Every new order is another manual task.",
          rest: "And hiring more people does not fix the bottleneck.",
        },
        points: [
          { title: "Orders", text: "Captured by hand from emails, chats and calls." },
          { title: "Requests", text: "Go through several hands before they are resolved." },
          { title: "Documents", text: "Data is copied from PDFs into systems, one by one." },
        ],
      },
      includes: {
        title: "What's included.",
        lead: { strong: "Agents connected to your systems.", rest: "With clear rules on when the AI decides and when a person does." },
        items: [
          { title: "Agents", text: "They complete whole tasks, not just answer questions." },
          { title: "n8n", text: "Flows that connect the agent to your systems." },
          { title: "LLM", text: "The right model for each task, evaluated with your data." },
          { title: "Document extraction", text: "Data from PDFs and images, ready for your systems." },
        ],
      },
      highlight: {
        title: "Why it's not a pilot.",
        lead: {
          strong: "We start with a real process and a metric.",
          rest: "If it doesn't reach production and can't be measured, we don't call it done.",
        },
      },
      proof: ["Donkeys", "GOES", "Publimóvil", "Ambassador"],
    },
  },
};
