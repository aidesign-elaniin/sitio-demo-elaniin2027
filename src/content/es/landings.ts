import type { LandingsCopy } from "../schema";

/* Contenido de ejemplo. Estructura de docs/sitemap-elaniin.md 3.27 a 3.29. Los casos usan los nombres del sitemap. */
export const landings: LandingsCopy = {
  servicesTitle: "Servicios que combina.",
  servicesLead: {
    strong: "No es un servicio suelto: es la combinación que resuelve el problema.",
    rest: "Cada uno tiene su página con el detalle.",
  },
  caseLabel: "Lo hicimos con",
  pages: {
    scaleTeam: {
      hero: {
        headline: "Tenemos el roadmap, no la gente.",
        lead: "Para equipos que ya saben qué construir y no tienen la capacidad para cumplirlo. Sumamos personas y equipos que trabajan a tu ritmo.",
        cta: "Cuéntanos qué necesitas",
      },
      proof: ["Jostens", "PuntoXpress"],
    },
    modernizeSystem: {
      hero: {
        headline: "El sistema ya no aguanta.",
        lead: "Para quien depende de un sistema que frena la operación. Lo modernizamos por partes, sin detener el negocio.",
        cta: "Cuéntanos qué sistema te frena",
      },
      proof: ["Procesar", "Tegra", "uSource"],
    },
    deliverGrowth: {
      hero: {
        headline: "Tenemos que lanzar esto y nadie lo puede entregar.",
        lead: "Para quien necesita una plataforma, producto o servicio digital nuevo, de punta a punta. En el sector público, los servicios que la institución pone en manos de la ciudadanía.",
        cta: "Cuéntanos qué quieres lanzar",
      },
      proof: ["DGME", "Banco Azul", "Mercandú", "Donkeys"],
    },
  },
};
