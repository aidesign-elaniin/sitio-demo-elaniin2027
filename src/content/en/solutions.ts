import type { SolutionsCopy } from "../schema";

/* Dummy copy. */
export const solutions: SolutionsCopy = {
  title: "Three fronts, one team.",
  lead: {
    strong: "Product, intelligence and cloud are solved together.",
    rest: "So the software doesn't break between areas or between vendors.",
  },
  card: { details: "View details of {title}" },
  dialog: { close: "Close details", talk: "Talk to the team" },
  items: {
    software: {
      name: "Software",
      lead: "Software development.",
      rest: "Web and mobile products and custom platforms, shipped every week in a real environment.",
      title: "Software development",
      intro:
        "Product, design and engineering teams that ship every week in a real environment, with measurement from day one.",
      bullets: [
        { title: "Web and mobile", text: "Applications people actually use, not prototypes." },
        { title: "Custom platforms", text: "Internal systems that replace spreadsheets and manual processes." },
        { title: "Integrations and APIs", text: "We connect what you already have without rewriting it." },
      ],
      metrics: [{ label: "from commit to production" }, { label: "test coverage" }],
      cta: "See software development",
    },
    ai: {
      name: "AI",
      lead: "Applied AI.",
      rest: "Assistants and automations with focused use cases and human review at every step.",
      title: "Applied AI",
      intro: "Focused use cases, with real data and human review where it matters.",
      bullets: [
        { title: "Assistants and agents", text: "Suggested answers drawn from your knowledge base." },
        { title: "Process automation", text: "Repetitive tasks solved from end to end." },
        { title: "Evaluation and governance", text: "We measure quality and leave clear rules of use." },
      ],
      metrics: [{ label: "tickets resolved per agent" }, { label: "answers with human review" }],
      cta: "See applied AI",
    },
    cloud: {
      name: "Cloud",
      lead: "Cloud without friction.",
      rest: "Infrastructure that scales on its own, close to your users and with costs under control.",
      title: "Cloud",
      intro: "Infrastructure that scales on its own, close to your users and with costs under control.",
      bullets: [
        { title: "Cloud migration", text: "No long pauses and no surprises on the bill." },
        { title: "Architecture and DevOps", text: "Repeatable deployments and an environment for every change." },
        { title: "Data, security and costs", text: "Alerts and spending limits from day one." },
      ],
      metrics: [{ label: "availability" }, { label: "infrastructure cost" }],
      cta: "See cloud",
    },
  },
  units: { minutes: "min" },
  visuals: {
    software: {
      steps: [
        { label: "Tests", meta: "82% coverage" },
        { label: "Review", meta: "2 approvals" },
        { label: "Staging", meta: "3 min" },
        { label: "Production", meta: "14 min" },
      ],
      status: { running: "In progress", done: "Done" },
    },
    ai: {
      question: "How many orders are still waiting for payment this week?",
      answer: "There are 18 pending orders and 11 are more than 48 hours old. Should I send an automatic reminder?",
      confirm: "Yes, send",
      orders: "View orders",
    },
    cloud: { availability: "Availability", regions: "3 regions" },
  },
};
