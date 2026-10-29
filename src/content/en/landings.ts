import type { LandingsCopy } from "../schema";

/* Dummy copy. Translation of the Spanish sample content. Structure from docs/sitemap-elaniin.md 3.27 to 3.29. Cases use the names in the site map. */
export const landings: LandingsCopy = {
  servicesTitle: "Services it combines.",
  servicesLead: {
    strong: "Not a single service: the combination that solves the problem.",
    rest: "Each one has its own page with the detail.",
  },
  caseLabel: "We did it with",
  pages: {
    scaleTeam: {
      hero: {
        headline: "We have the roadmap, not the people.",
        lead: "For teams that know what to build and lack the capacity to deliver it. We add people and teams that work at your pace.",
        cta: "Tell us what you need",
      },
      proof: ["Jostens", "PuntoXpress"],
    },
    modernizeSystem: {
      hero: {
        headline: "The system can't keep up anymore.",
        lead: "For anyone who depends on a system that holds operations back. We modernize it piece by piece, without stopping the business.",
        cta: "Tell us which system holds you back",
      },
      proof: ["Procesar", "Tegra", "uSource"],
    },
    deliverGrowth: {
      hero: {
        headline: "We have to launch this and no one can deliver it.",
        lead: "For anyone who needs a new platform, product or digital service, end to end. In the public sector, the services the institution puts in citizens' hands.",
        cta: "Tell us what you want to launch",
      },
      proof: ["DGME", "Banco Azul", "Mercandú", "Donkeys"],
    },
  },
};
