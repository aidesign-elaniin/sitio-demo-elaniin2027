import type { EngagementModelsCopy } from "../schema";

/*
  Dummy copy. Translation of the Spanish sample content. Structure from docs/sitemap-elaniin.md 3.13 to 3.16. Evidence
  uses the names in the site map (only Staff Augmentation has them), with no invented figures.
*/
export const engagementModels: EngagementModelsCopy = {
  hub: {
    hero: {
      headline: "You decided to work with us. Choose how.",
      lead: "People who join your team, a full team or a closed outcome. Three ways to hire, the same delivery standard.",
      cta: "Talk to the team",
    },
    intro: {
      title: "Three models, one sentence each.",
      lead: {
        strong: "You add people, you add a team or you buy an outcome.",
        rest: "The model depends on who leads the work and what you want to receive at the end.",
      },
    },
    comparison: {
      title: "Compare the models.",
      lead: { strong: "What changes from one to another.", rest: "If you are torn between two, the first call is for deciding." },
      criteria: ["What you get", "Who leads day to day", "Best for", "How it's measured"],
      finder: {
        title: "Find your model.",
        questions: [
          { label: "What are you missing today?", options: ["People for my roadmap", "A team for my product", "Someone to deliver the outcome"] },
          { label: "Who leads day to day?", options: ["My team", "Shared", "Elaniin"] },
          { label: "What does the horizon look like?", options: ["Sprints with a clear plan", "A product that keeps growing", "A goal with a date"] },
        ],
        hint: "Answer the three questions and the model that fits best is marked in the comparison.",
        match: "{n}% match",
        best: "Your best starting point",
        view: "See the model",
        reset: "Start over",
        spectrum: { label: "Who leads day to day", start: "Your team", end: "Elaniin" },
        tableTitle: "The detail, side by side.",
        pick: "Mark",
        picked: "Marked",
      },
      rows: {
        staffAugmentation: [
          "Profiles that join your team",
          "Your team",
          "A clear roadmap and not enough people",
          "Capacity delivered per sprint",
        ],
        dedicatedTeams: [
          "A full team dedicated to your product",
          "Elaniin, with your product leadership",
          "Products that need a stable team",
          "Agreed product goals",
        ],
        projectDelivery: [
          "A closed outcome, with scope and phases",
          "Elaniin",
          "Projects with a defined goal",
          "Deliverables of each phase",
        ],
      },
    },
  },
  models: {
    staffAugmentation: {
      hero: {
        headline: "You have the roadmap. You lack the people.",
        lead: "We add profiles to your team, in your hours and with your processes, to deliver what is already planned.",
        cta: "Tell us which profiles you need",
      },
      problem: {
        title: "When the plan moves faster than the team.",
        lead: {
          strong: "The roadmap is clear; the capacity is not enough.",
          rest: "And hiring full time takes months the plan does not have.",
        },
        points: [
          { title: "Hiring takes time", text: "Recruiting cannot keep up with the roadmap." },
          { title: "Scarce profiles", text: "Some roles are hard to find in your market." },
          { title: "Work peaks", text: "You need more capacity for a while, not forever." },
        ],
      },
      includes: {
        title: "How it works.",
        lead: { strong: "Profiles that join from the first week.", rest: "With clear rules for hours and communication." },
        items: [
          { title: "Profiles", text: "Engineering, design, QA and product, as your roadmap requires." },
          { title: "Ramp-up", text: "Interviews with your team and a guided onboarding." },
          { title: "Time-zone overlap", text: "Hours shared with your team to work in real time." },
        ],
      },
      highlight: {
        title: "Named resources.",
        lead: {
          strong: "You know who works with you, by name.",
          rest: "The same people throughout the project, with no rotations that force you to start over.",
        },
      },
      proof: ["Jostens", "PuntoXpress"],
    },
    dedicatedTeams: {
      hero: {
        headline: "A full team, not a single person.",
        lead: "A team dedicated to your product, with the roles it needs to move on its own.",
        cta: "Tell us about your product",
      },
      problem: {
        title: "When adding people is not enough.",
        lead: {
          strong: "The product needs a team that coordinates itself.",
          rest: "Adding loose profiles moves the coordination onto your team.",
        },
        points: [
          { title: "No product team", text: "No one takes the product end to end." },
          { title: "Costly coordination", text: "Leading loose profiles drains your team." },
          { title: "Continuity", text: "The product needs a stable team, not one-off projects." },
        ],
      },
      includes: {
        title: "How it works.",
        lead: { strong: "A dedicated squad with one lead.", rest: "You set the product direction; the team executes it." },
        items: [
          { title: "Dedicated squad", text: "Engineering, design and QA working only on your product." },
          { title: "One lead", text: "A person who coordinates the team and answers for delivery." },
          { title: "Delivery rhythm", text: "Frequent releases reviewed with you." },
        ],
      },
    },
    projectDelivery: {
      hero: {
        headline: "You want an outcome, not a team.",
        lead: "We define the scope, deliver it in phases and answer for the result.",
        cta: "Tell us the outcome you're after",
      },
      problem: {
        title: "When the outcome is what matters.",
        lead: {
          strong: "You don't want to manage a team, you want something working.",
          rest: "With a clear scope from the start.",
        },
        points: [
          { title: "Defined goal", text: "You know what you need, not how to build it." },
          { title: "No management capacity", text: "There is no one to lead a technical team." },
          { title: "Fixed budget", text: "You need to know what you get in each phase." },
        ],
      },
      includes: {
        title: "How it works.",
        lead: { strong: "Discovery as phase 0.", rest: "Before building, we agree on what is delivered and how it is measured." },
        items: [
          { title: "Discovery", text: "We understand the problem and define the scope with you." },
          { title: "Phases", text: "The work is split into stages with a date and a goal." },
          { title: "Deliverables", text: "Each phase closes with something you can use and review." },
        ],
      },
    },
  },
};
