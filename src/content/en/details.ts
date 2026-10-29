import type { DetailsCopy } from "../schema";

/*
  Dummy copy (cases, studies and figures are invented). Results repeat the figures of the case cards and the research
  list; no new figure is added.
*/
export const details: DetailsCopy = {
  cases: {
    labels: {
      results: "Results",
      challenge: "The challenge.",
      solution: "What we did.",
      service: "The service behind the case.",
    },
    items: {
      "delivery-tracking": {
        challenge:
          "The support team checked three systems to answer a single question: where is my order. Each answer took minutes and errors kept repeating.",
        solution: [
          { title: "One panel", text: "The three systems were connected in a single view for the whole team." },
          { title: "Real-time status", text: "Every shipment shows its route and estimated time." },
          { title: "Weekly releases", text: "The panel shipped in parts, measured from the first version." },
        ],
        results: [
          { value: "-42%", label: "response time" },
          { value: "10", label: "weeks to the result" },
        ],
      },
      "sme-payments": {
        challenge:
          "Small businesses dropped out of sign-up before finishing, and payment reconciliation was done by hand at the end of each day.",
        solution: [
          { title: "Sign-up in minutes", text: "A short onboarding, validated at every step." },
          { title: "Automatic reconciliation", text: "Payments are matched to sales on their own." },
          { title: "Mobile app", text: "The whole flow, available from the phone." },
        ],
        results: [{ value: "3x", label: "sign-up conversion" }],
      },
      "support-assistant": {
        challenge:
          "Ticket volume grew faster than the support team, and repeated answers took most of the day.",
        solution: [
          { title: "Suggested answers", text: "The assistant proposes an answer from the knowledge base." },
          { title: "Human review", text: "Every answer goes through a person before it is sent." },
          { title: "Continuous measurement", text: "The quality of suggestions is evaluated every week." },
        ],
        results: [{ value: "+35%", label: "tickets resolved per agent" }],
      },
      "cloud-migration": {
        challenge:
          "Infrastructure kept getting more expensive and the hosting contract was about to expire. Shutting the service down to migrate was not an option.",
        solution: [
          { title: "Migration in stages", text: "Workloads moved one by one, tested at every step." },
          { title: "New architecture", text: "It scales on its own and keeps costs visible." },
          { title: "No interruptions", text: "The service stayed available throughout the change." },
        ],
        results: [
          { value: "-31%", label: "infrastructure cost" },
          { value: "99.98%", label: "availability during the change" },
        ],
      },
    },
  },
  research: {
    labels: { method: "How we measured it.", findings: "What we found.", meaning: "What it means for your team." },
    items: {
      "ai-pilots": {
        method: "A survey of product teams about the AI pilots they started in the last year and how many reached production.",
        findings: [
          { title: "No success metric", text: "Most pilots started without an agreed metric." },
          { title: "Real data came late", text: "Production data arrived after the demo." },
          { title: "No owner", text: "Few pilots had an owner in operations." },
        ],
        meaning: "A pilot reaches production when it starts with a real process, a metric and an owner.",
      },
      "cloud-spend": {
        method: "An analysis of cloud accounts: contracted capacity against used capacity over a quarter.",
        findings: [
          { title: "Forgotten resources", text: "Test environments no one switched off." },
          { title: "Oversizing", text: "Servers sized for the peak, paid for all month." },
          { title: "No alerts", text: "Few accounts had spending limits." },
        ],
        meaning: "Reviewing capacity and setting spend alerts is the first saving, before any migration.",
      },
      "weekly-delivery": {
        method: "Following teams for a year: release frequency and time to fix production errors.",
        findings: [
          { title: "Small changes", text: "Shipping often forces changes that are easy to review." },
          { title: "Automated tests", text: "Weekly teams test before every release." },
          { title: "Less fear of deploying", text: "Deploying stops being an event." },
        ],
        meaning: "Shipping every week is not riskier: it is how you fix things faster.",
      },
      "long-signups": {
        method: "Tests with people across several products, measuring how many finish a sign-up by its number of steps.",
        findings: [
          { title: "Every step costs", text: "Drop-off grows with every extra step." },
          { title: "Unneeded data", text: "Many fields can be asked for later." },
          { title: "Validate early", text: "Errors at the end cause more drop-off." },
        ],
        meaning: "A short sign-up that validates at every step converts better than a complete form.",
      },
    },
  },
  articles: {
    tag: "Article",
    items: {
      insights: {
        lead: "Ideas on product and engineering, from what we see in the projects we deliver.",
        sections: [
          {
            title: "Start with the problem",
            paragraphs: [
              "The projects that go best start with a clear sentence about the problem and a metric to know whether it was solved.",
              "Technology is chosen afterwards, once it is clear what needs to move.",
            ],
          },
          {
            title: "Ship to learn",
            paragraphs: [
              "Every release is a chance to measure. Shipping small and often lets you correct course before the cost grows.",
            ],
          },
        ],
      },
      playbook: {
        lead: "How we ship every week: the rhythm, the rules and what we check before every deployment.",
        sections: [
          {
            title: "The rhythm",
            paragraphs: ["The week starts with agreed priorities and ends with something working in a real environment."],
          },
          {
            title: "The rules",
            paragraphs: [
              "Small changes, reviewed by another person and with automated tests before every deployment.",
              "If something fails, roll back first and analyze afterwards.",
            ],
          },
        ],
      },
      aiReport: {
        lead: "What works and what doesn't when AI enters operations, based on the projects we have supported.",
        sections: [
          {
            title: "What works",
            paragraphs: ["Focused use cases, with real data and a person reviewing wherever a mistake is costly."],
          },
          {
            title: "What doesn't",
            paragraphs: ["Pilots without a metric, demos with sample data and automations with no owner in operations."],
          },
        ],
      },
    },
  },
};
