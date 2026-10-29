import type { CloudService, ServiceLineCopy } from "../schema";

/*
  Dummy copy. Translation of the Spanish sample content. Structure from docs/sitemap-elaniin.md 3.8 to 3.10. Proof
  strips use the names in the site map, with no invented figures.
*/
export const cloud: ServiceLineCopy<CloudService> = {
  hub: {
    hero: {
      headline: "When the problem is the infrastructure.",
      lead: "Growing costs, systems that don't scale or a contract about to expire. We migrate and integrate on Google Cloud.",
      cta: "Tell us about your infrastructure",
    },
    intro: {
      title: "With a Google Cloud credential.",
      lead: {
        strong: "Two paths to the same goal: infrastructure that doesn't hold the business back.",
        rest: "Move what you have to the cloud, or connect what already exists with control.",
      },
    },
    cards: {
      cloudMigration: { title: "Cloud migration", text: "For high costs, expiring contracts or systems that don't scale." },
      apiManagement: { title: "API management and integration", text: "For systems that don't talk to each other or APIs with no control." },
    },
    proof: ["uSource", "IBEX", "Procesar"],
  },
  services: {
    cloudMigration: {
      hero: {
        headline: "Your infrastructure costs more than it delivers.",
        lead: "We migrate to Google Cloud with an architecture designed to grow and costs you can predict.",
        cta: "Tell us what you want to migrate",
      },
      problem: {
        title: "When the infrastructure holds you back.",
        lead: {
          strong: "The bill goes up and the system does not respond any better.",
          rest: "And the contract renewal date forces a decision now.",
        },
        points: [
          { title: "High costs", text: "You pay for capacity that is almost never used." },
          { title: "Expiring contract", text: "Renewing without changing anything repeats the problem." },
          { title: "Doesn't scale", text: "Demand peaks end in outages or slowness." },
        ],
      },
      includes: {
        title: "What's included.",
        lead: { strong: "From assessment to running in the cloud.", rest: "With a plan in stages and no long pauses." },
        items: [
          { title: "Assessment", text: "An inventory of what runs today and what it costs." },
          { title: "Migration to GCP", text: "We move workloads in stages, testing at every step." },
          { title: "Architecture", text: "A design that scales on its own and keeps costs visible." },
        ],
      },
      highlight: {
        title: "Google Cloud incentive.",
        lead: {
          strong: "Your migration could qualify for an incentive.",
          rest: "We check with you whether it applies before we start.",
        },
      },
      proof: ["uSource", "IBEX", "Abaco", "Diimo", "Mercandú", "GOES"],
    },
    apiManagement: {
      hero: {
        headline: "Systems that don't talk. APIs no one controls.",
        lead: "We integrate and govern your APIs with Apigee and Application Integration, regulated environments included.",
        cta: "Tell us what you need to connect",
      },
      problem: {
        title: "When integration becomes a risk.",
        lead: {
          strong: "Every new system adds another hand-made connection.",
          rest: "And in a regulated environment, not knowing who consumes what is a serious problem.",
        },
        points: [
          { title: "Isolated systems", text: "Data is copied by hand between teams." },
          { title: "Uncontrolled APIs", text: "No inventory, versions or access rules." },
          { title: "Compliance", text: "Auditing who consumes each API takes weeks." },
        ],
      },
      includes: {
        title: "What's included.",
        lead: { strong: "Integration and governance in a single layer.", rest: "With visibility of every call." },
        items: [
          { title: "Apigee", text: "Publishing, security and analytics for your APIs." },
          { title: "Application Integration", text: "Flows between systems with no hand-written glue code." },
          { title: "Governance", text: "Documented versions, access and policies." },
        ],
      },
      proof: ["Procesar", "Invercap", "Credicomer"],
    },
  },
};
