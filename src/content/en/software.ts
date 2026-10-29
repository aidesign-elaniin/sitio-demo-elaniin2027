import type { ServiceLineCopy, SoftwareService } from "../schema";

/*
  Dummy copy. Translation of the Spanish sample content. Structure from docs/sitemap-elaniin.md 3.3 to 3.7. Proof
  strips use the names in the site map, with no invented figures.
*/
export const software: ServiceLineCopy<SoftwareService> = {
  hub: {
    hero: {
      headline: "Mission-critical software, in production.",
      lead: "We build new systems and modernize the ones already holding operations back. And we stay to sustain them.",
      cta: "Tell us about your project",
    },
    intro: {
      title: "Build or modernize.",
      lead: {
        strong: "If the system does not exist, we build it; if it no longer holds, we modernize it.",
        rest: "Either way, the same team runs it and keeps it evolving.",
      },
    },
    cards: {
      customSoftware: { title: "Custom software", text: "The system or product you need and have no one to build it with." },
      appModernization: { title: "Application modernization", text: "Re-architecture of the system already holding the business back." },
      mobileApps: { title: "Mobile apps", text: "The digital channel that connects your customer or citizen." },
      softwareSupport: { title: "Support and evolution", text: "Continuity for the software we already built with you." },
    },
    proof: ["DGME", "MTPS", "IFES/TSE", "Banco Azul", "Credicomer"],
  },
  services: {
    customSoftware: {
      hero: {
        headline: "The system you need does not exist yet.",
        lead: "We design it, build it and put it in production, from architecture to QA, with one accountable team.",
        cta: "Tell us what you need to build",
      },
      problem: {
        title: "When there is no one to build it.",
        lead: {
          strong: "The problem is not the idea, it is the capacity to take it to production.",
          rest: "Without your own team, each vendor solves one part and no one answers for the whole.",
        },
        points: [
          { title: "No in-house team", text: "Operations cannot stop to build one from scratch." },
          { title: "Vendors by the piece", text: "Design, development and QA in different hands, with no one accountable." },
          { title: "Deadlines that won't wait", text: "The launch date is already committed to the business." },
        ],
      },
      includes: {
        title: "What's included.",
        lead: { strong: "Everything that takes a system to production.", rest: "One team and one plan." },
        items: [
          { title: "Architecture", text: "Documented technical decisions, designed to grow." },
          { title: "Backend", text: "Services, data and integrations with what you already have." },
          { title: "Frontend", text: "Web interfaces people actually use." },
          { title: "QA", text: "Automated and manual tests before every release." },
        ],
      },
      highlight: {
        title: "How we work.",
        lead: {
          strong: "With Applied AI in every phase.",
          rest: "More capacity within the same deadline and human review before every release.",
        },
        link: "Discover Applied AI",
      },
      proof: ["DGME", "MTPS", "IFES/TSE", "Beelder", "uSource"],
    },
    appModernization: {
      hero: {
        headline: "The system can't keep up. Operations can't stop either.",
        lead: "We modernize the system holding your business back piece by piece, while it keeps running.",
        cta: "Tell us which system holds you back",
      },
      problem: {
        title: "When the system holds the business back.",
        lead: {
          strong: "Every change takes longer and costs more than the last one.",
          rest: "And replacing it all at once is a risk no one wants to take.",
        },
        points: [
          { title: "Slow changes", text: "A small improvement touches too many parts of the system." },
          { title: "Concentrated knowledge", text: "Only a few people understand how it works." },
          { title: "Replacement risk", text: "Switching the old system off is not an option." },
        ],
      },
      includes: {
        title: "What's included.",
        lead: { strong: "A path in stages, not a leap in the dark.", rest: "Each stage delivers value and can be measured." },
        items: [
          { title: "Assessment", text: "A map of the current system, its dependencies and its risks." },
          { title: "Re-architecture", text: "A target design reached piece by piece." },
          { title: "Microservices", text: "Critical pieces are split out and deployed on their own." },
        ],
      },
      stages: {
        title: "Migration without interruption.",
        lead: {
          strong: "The new system grows next to the old one.",
          rest: "We move module by module and operations never stop. Pick a stage or let it play.",
        },
        steps: ["Today", "Stage 1", "Stage 2", "Target"],
        stepsLabel: "Migration stages",
        current: "Current system",
        next: "New system",
        bridge: "Integration bridge",
        modules: ["Users", "Payments", "Inventory", "Reports", "Alerts", "Integrations"],
        online: "Operations online",
        migrated: "{n} of {total} modules in the new system",
        retired: "Current system switched off",
        play: "Play stages",
        pause: "Pause stages",
      },
      proof: ["Tegra", "Core Funcional GOES"],
    },
    mobileApps: {
      hero: {
        headline: "The channel your customers carry in their pocket.",
        lead: "Native and hybrid apps connected to your systems, designed for the people who use them every day.",
        cta: "Tell us about your app",
      },
      problem: {
        title: "When the digital channel falls behind.",
        lead: {
          strong: "Your customers expect to solve everything from their phone.",
          rest: "And the current app is not connected to what happens in your systems.",
        },
        points: [
          { title: "Incomplete experience", text: "Requests end up at a branch or on a phone call." },
          { title: "Fragile integration", text: "The app does not talk well with the core of the business." },
          { title: "Slow releases", text: "Each new version takes months to ship." },
        ],
      },
      includes: {
        title: "What's included.",
        lead: { strong: "From design to the app store.", rest: "And the integration with your systems in between." },
        items: [
          { title: "Native and hybrid", text: "The technology that suits your product, not a single recipe." },
          { title: "Banking integration", text: "Secure connection with core, payments and internal services." },
          { title: "Publishing", text: "Frequent, measured releases with no surprises in the stores." },
        ],
      },
      phone: {
        title: "This is how it looks in the pocket.",
        lead: { strong: "Every feature, connected to your systems.", rest: "Pick one to see it on the screen." },
        featuresLabel: "App features",
        features: [
          { title: "A clear home", text: "Balance, shortcuts and activity on the first screen." },
          { title: "Payments in two taps", text: "The contact, the amount and the confirmation, without leaving the flow." },
          { title: "Real-time alerts", text: "Every movement in the core reaches the phone instantly." },
        ],
        home: {
          greeting: "Hi, Ana",
          balanceLabel: "Available balance",
          actions: ["Pay", "Top up", "More"],
          recent: "Activity",
          items: ["Supermarket", "Transfer received", "Water bill"],
        },
        pay: {
          title: "New payment",
          to: "To",
          contacts: ["Luis", "Marta", "Pedro"],
          amountLabel: "Amount",
          confirm: "Confirm payment",
        },
        alerts: {
          title: "Alerts",
          now: "Now",
          items: [
            { title: "Payment sent", text: "Luis received your payment." },
            { title: "Deposit received", text: "Your balance was updated." },
            { title: "New sign-in", text: "From a new phone." },
          ],
        },
        note: "Sample screens.",
      },
      proof: ["Banco Azul", "Credicomer", "Diimo", "FGR"],
    },
    softwareSupport: {
      hero: {
        headline: "The software we built keeps growing with you.",
        lead: "Maintenance, service agreements and evolution for the systems already in production.",
        cta: "Talk to the team",
      },
      includes: {
        title: "What's covered.",
        lead: { strong: "Continuity with clear rules.", rest: "You know what is handled, how fast and who answers." },
        items: [
          { title: "SLA", text: "Agreed response times by priority level." },
          { title: "Maintenance", text: "Updates, security and fixes kept current." },
          { title: "Evolution", text: "Planned improvements based on what the business asks for." },
        ],
      },
      highlight: {
        title: "Why the same team.",
        lead: {
          strong: "Whoever built it knows it better than anyone.",
          rest: "No learning curve and no hand-offs that lose context.",
        },
      },
      panel: {
        title: "This is what support looks like.",
        lead: {
          strong: "Every priority has its own clock.",
          rest: "Pick one to watch the agreed response time run on the panel.",
        },
        prioritiesLabel: "Ticket priority",
        priorities: [
          { name: "Critical", minutes: 60 },
          { name: "High", minutes: 240 },
          { name: "Normal", minutes: 1440 },
        ],
        clockLabel: "Time to respond",
        elapsed: "of the agreed time",
        metrics: ["Open tickets", "Resolved this month", "Releases shipped"],
        uptimeLabel: "Availability, last 30 days",
        feedLabel: "Tickets in progress",
        tickets: ["Report export fails", "Renew certificate", "New filter in orders", "Slow sign-in"],
        states: ["Received", "In progress", "Resolved"],
        note: "Sample data and times. Real times are agreed in each contract.",
      },
      proof: ["ASESUISA", "Abaco", "ITCA", "RNPN", "Alianza Américas"],
    },
  },
};
