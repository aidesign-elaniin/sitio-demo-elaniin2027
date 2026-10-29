import type { AppliedAiCopy } from "../schema";

/* Dummy copy. Translation of the Spanish sample content. Cases cite names from the site map, with no invented figures. */
export const appliedAi: AppliedAiCopy = {
  hero: {
    headline: "Applied AI: how we deliver everything we build.",
    lead: "It is not one more service. It is the way of working behind software development, cloud and AI solutions: more capacity, human review at every step and deliverables you can measure.",
    cta: "Let's talk about your project",
  },
  pillars: {
    title: "Three pillars, one method.",
    lead: {
      strong: "Applied AI changes how we deliver, not what we deliver.",
      rest: "The team works with AI in every phase and answers for every result.",
    },
    items: {
      capacity: {
        title: "100x capacity",
        text: "Agents and tools that multiply what a team can analyze, build and test in a week.",
      },
      humanLoop: {
        title: "Human-in-the-loop",
        text: "Every AI suggestion goes through a person who reviews it, approves it and answers for it.",
      },
      deliverables: {
        title: "Differentiated deliverables",
        text: "Documentation, tests and prototypes that used to miss the deadline, included from the first sprint.",
      },
    },
  },
  services: {
    title: "What it looks like in each service.",
    lead: {
      strong: "The same method across the three lines.",
      rest: "The kind of work changes, the way we deliver it does not.",
    },
    items: {
      software: {
        name: "Software development",
        text: "Architecture, code and tests with AI support, reviewed by the team before every release.",
        link: "See software development",
      },
      ai: {
        name: "AI solutions",
        text: "The agents we build for your processes go through the same evaluation and human review we use ourselves.",
        link: "See AI solutions",
      },
      cloud: {
        name: "Cloud",
        text: "Faster infrastructure analysis and migration plans, with every change validated by an engineer.",
        link: "See cloud",
      },
    },
  },
  evidence: {
    title: "Where we already apply it.",
    lead: {
      strong: "Projects delivered with Applied AI.",
      rest: "The detail of each case arrives with the approved content.",
    },
    all: "See use cases",
    items: {
      deltaForce: {
        tag: "Public sector",
        title: "Delta Force · GOES",
        text: "Sample content: the problem, how Applied AI was applied and the measured result go here.",
      },
      atlasBuilder: {
        tag: "Product",
        title: "Atlas Builder",
        text: "Sample content: the problem, how Applied AI was applied and the measured result go here.",
      },
    },
  },
  loop: {
    title: "See the method at work.",
    lead: {
      strong: "AI proposes. A person decides.",
      rest: "Pick a task, let the AI write the draft and approve it or ask for a change, the way the team does in every delivery.",
    },
    tasksLabel: "Task",
    tasks: [
      {
        label: "Payment tests",
        draft: "Test the payment with a valid card, an expired card and insufficient funds; check the error message and that nothing is charged twice.",
        revised: "Test the payment with a valid, expired and empty card and with the network down; check the error message, the retry and that nothing is charged twice.",
      },
      {
        label: "Document the API",
        draft: "Orders endpoint: create, read and cancel. Needs a token. Returns 201 on create and 404 when the order does not exist.",
        revised: "Orders endpoint: create, read and cancel. Needs a token with write access. Returns 201 on create, 404 when missing and 409 when already cancelled.",
      },
      {
        label: "Migration plan",
        draft: "Move reports first, then users and payments last, with the old system on until each stage is validated.",
        revised: "Move reports and users first, then payments in low-traffic hours, with the old system on and a rollback plan per stage.",
      },
    ],
    lanes: { ai: "AI proposes", review: "A person reviews", done: "It ships" },
    states: { drafting: "Writing…", waiting: "Waiting for review", revising: "Adjusting to your comment…", approved: "Approved" },
    approve: "Approve",
    change: "Ask for a change",
    reviewer: "Reviewer: Ana, QA",
    delivered: "Shipped: {n}",
    empty: "Approved work lands here.",
    note: "Demo with sample content. No suggestion reaches production without a person.",
  },
  capacity: { one: "One team", many: "The same team with AI" },
};
