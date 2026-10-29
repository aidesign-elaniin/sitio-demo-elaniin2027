import type { NotFoundCopy } from "../schema";

/* Contenido de ejemplo. */
export const notFound: NotFoundCopy = {
  tag: "404",
  documentTitle: "Página no encontrada | Elaniin",
  title: "Esta página no existe.",
  lead: "Puede que el enlace esté roto o que la página se haya movido. Vuelve al inicio o cuéntanos qué buscabas.",
  home: "Volver al inicio",
  talk: "Hablar con el equipo",
  linksLabel: "A dónde ir ahora",
  links: {
    solutions: { title: "Soluciones", description: "Software, IA y nube, resueltos juntos." },
    cases: { title: "Casos", description: "Resultados que se miden." },
    research: { title: "Investigaciones", description: "Lo que estudiamos y publicamos." },
  },
};
