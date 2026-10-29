import type { SolutionsCopy } from "../schema";

/*
  Copy supplied by the team (2026-10-27), shortened to the character budget of the cards (DESIGN.md components.solutions-grid):
  a lead of about 25 characters and a rest of about 100. The full sentences live in the dialog (intro) and the call to action
  only in the dialog.
*/
export const solutions: SolutionsCopy = {
  title: "Software built with AI from the first commit.",
  lead: {
    strong: "We use AI in every project.",
    rest: "Releases reach production with fewer errors, and your software is ready to grow.",
  },
  card: { details: "View details of {title}" },
  dialog: { close: "Close details", talk: "Talk to the team" },
  items: {
    ai: {
      name: "AI delivery",
      lead: "AI across the pipeline.",
      rest: "We use AI to write, review, test and monitor, and every decision keeps a person's name.",
      title: "AI delivery",
      intro:
        "Our engineers use AI to read legacy code, write and review code, test each release and monitor production. Every decision still has a person's name on it.",
      bullets: [
        { title: "Read legacy code", text: "We understand what a system does before touching it." },
        { title: "Write and review", text: "AI proposes, an engineer decides and signs." },
        { title: "Test and monitor", text: "Every release tested and watched in production." },
      ],
      metrics: [{ label: "faster code review" }, { label: "decisions signed by a person" }],
      cta: "Explore AI delivery",
    },
    software: {
      name: "Software",
      lead: "Build and modernize.",
      rest: "New products, and the systems your operation already depends on, brought up to date.",
      title: "Software development and modernization",
      intro: "We build new products and modernize the systems your operation already depends on.",
      bullets: [
        { title: "Web and mobile", text: "Applications people actually use, not prototypes." },
        { title: "Custom platforms", text: "Internal systems that replace spreadsheets and manual processes." },
        { title: "Legacy modernization", text: "We update what you depend on without stopping it." },
      ],
      metrics: [{ label: "from commit to production" }, { label: "test coverage" }],
      cta: "Explore software development",
    },
    cloud: {
      name: "Cloud",
      lead: "Built for real demand.",
      rest: "We design, migrate and operate your infrastructure, with costs you can track.",
      title: "Cloud",
      intro:
        "We design, migrate and operate your infrastructure with the cloud provider that fits your business, sized for real demand and with costs you can track.",
      bullets: [
        { title: "Cloud migration", text: "No long pauses and no surprises on the bill." },
        { title: "Architecture and DevOps", text: "Repeatable deployments and an environment for every change." },
        { title: "Data, security and costs", text: "Alerts and spending limits from day one." },
      ],
      metrics: [{ label: "availability" }, { label: "infrastructure cost" }],
      cta: "Explore cloud",
    },
  },
  units: { minutes: "min" },
  visuals: {
    delivery: { steps: ["Tests", "Review", "Staging", "Production"] },
    product: { platform: "Platform", web: "Web app", mobile: "Mobile" },
    cloud: { availability: "Availability" },
  },
};
