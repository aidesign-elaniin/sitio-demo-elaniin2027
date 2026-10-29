import type { AudienceRoutesCopy } from "../schema";

/*
  Items and routes supplied by the team (2026-10-28). The title, the lead and ALL the success stories are SAMPLE content: generic
  descriptions with no client names and invented figures, to review the layout until the real cases arrive.
*/
export const audienceRoutes: AudienceRoutesCopy = {
  title: "Every organization moves forward differently.",
  lead: "Choose your sector and see how we can help, with the projects behind it.",
  toggle: {
    label: "Sector",
    private: "Private company",
    public: "Public sector",
  },
  casesLabel: "Success stories",
  casesClose: "Close",
  sectors: {
    private: [
      {
        id: "staff",
        lead: "Scale your engineering team.",
        rest: "Senior engineers who join your sprints and stay on your project.",
        link: "Staff augmentation",
        cases: [
          {
            title: "Senior squad for a retail platform",
            result: "Release cycle from 6 to 2 weeks",
          },
          {
            title: "Engineers inside a fintech team",
            result: "Roadmap delivered a quarter early",
          },
        ],
      },
      {
        id: "modernization",
        lead: "Modernize a critical system.",
        rest: "Migrate, rebuild or extend the platforms your operation depends on, without stopping it.",
        link: "Software modernization",
        cases: [
          {
            title: "Core system migrated without downtime",
            result: "Zero hours of downtime",
          },
          {
            title: "Legacy monolith split into services",
            result: "Deploys from monthly to daily",
          },
        ],
      },
      {
        id: "software",
        lead: "Build the software your business runs on.",
        rest: "Custom products designed, built and launched by one team, from the idea to production.",
        link: "Custom software",
        cases: [
          {
            title: "Order platform for a logistics company",
            result: "Live in 14 weeks",
          },
          {
            title: "Customer app for a regional bank",
            result: "300K users in the first quarter",
          },
        ],
      },
    ],
    public: [
      {
        id: "critical",
        lead: "Build critical software.",
        rest: "Systems that institutions depend on, documented, secure and ready to be audited.",
        link: "Critical software",
        cases: [
          {
            title: "Records system for a public agency",
            result: "99.9% of records digitized",
          },
          {
            title: "Case tracking platform for a ministry",
            result: "Audited with no findings",
          },
        ],
      },
      {
        id: "impact",
        lead: "Reach the people you serve.",
        rest: "Digital services that bring a public institution closer to its citizens, simple and secure.",
        link: "Public impact",
        cases: [
          { title: "Citizen services portal", result: "1.2M citizens served" },
          {
            title: "Appointments app for public health",
            result: "Waiting time down 45%",
          },
        ],
      },
      {
        id: "availability",
        lead: "Stay available when it matters.",
        rest: "Platforms that keep running at peak demand, with monitoring and a recovery plan.",
        link: "High availability",
        cases: [
          {
            title: "Results portal for an election authority",
            result: "100% uptime on election day",
          },
          {
            title: "Payments gateway for a public utility",
            result: "Peak load of 10x handled",
          },
        ],
      },
    ],
  },
  visuals: {
    staff: { team: "Your team" },
    modernization: { legacy: "Legacy", modern: "Modern" },
    public: {
      documented: "Documented",
      secure: "Secure",
      traceable: "Traceable",
    },
    software: { product: "Your product" },
    critical: { label: "Critical" },
    impact: { label: "Service" },
    availability: { primary: "Primary", backup: "Backup" },
  },
};
