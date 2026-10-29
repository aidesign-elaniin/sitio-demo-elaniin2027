import type { IndustriesCopy } from "../schema";

/*
  Contenido de ejemplo. Estructura de docs/sitemap-elaniin.md 3.22 a 3.26. Sin cifras inventadas: los datos internos
  del sitemap (por ejemplo, el peso del sector público) no se publican hasta validarlos. El proyecto destacado de cada
  industria es texto de ejemplo.
*/
export const industries: IndustriesCopy = {
  hub: {
    hero: {
      headline: "Entendemos tu sector antes de que lo preguntes.",
      lead: "Gobierno, banca, restaurantes y retail: cada uno tiene sus reglas, sus tiempos y sus riesgos. Trabajamos con ellos en mente desde el primer día.",
      cta: "Hablar con el equipo",
    },
    intro: {
      title: "Cuatro industrias, un mismo estándar.",
      lead: {
        strong: "Cambia el contexto, no la forma de entregar.",
        rest: "Elige tu industria para ver cómo trabajamos en ella.",
      },
    },
    cards: {
      publicSector: { title: "Sector público", text: "Para titulares, directores de modernización y UACI." },
      financialServices: { title: "Servicios financieros", text: "Para TI, transformación digital y canales digitales." },
      restaurants: { title: "Restaurantes", text: "Para dueños y gerentes de cadenas de restaurantes." },
      retail: { title: "Retail", text: "Un mercado en expansión para el equipo." },
    },
    stats: {
      title: "Lo que ofrecemos en cada una.",
      lead: { strong: "El mismo catálogo para todas las industrias.", rest: "Se adapta a las reglas de cada sector." },
      labels: { industries: "industrias", services: "servicios", models: "modelos de contratación" },
    },
    certifications: { label: "Certificaciones", items: ["Google Cloud"] },
  },
  pages: {
    publicSector: {
      hero: {
        headline: "Tecnología para las instituciones que sirven a la ciudadanía.",
        lead: "Sistemas, trámites y servicios digitales para el sector público, con los procesos de compra y control que exige.",
        cta: "Hablar con el equipo",
      },
      data: {
        title: "Lo que pide el sector público.",
        lead: { strong: "Servicios que no pueden fallar.", rest: "Y procesos de compra que hay que conocer de antemano." },
        points: [
          { title: "Continuidad", text: "Los servicios a la ciudadanía no se detienen por un cambio de sistema." },
          { title: "Compras públicas", text: "Propuestas alineadas con los procesos de la UACI." },
          { title: "Transparencia", text: "Entregables documentados y auditables." },
        ],
      },
      cases: {
        title: "Casos de uso.",
        lead: { strong: "Proyectos en el sector público.", rest: "Contenido de ejemplo." },
        empty: "Todavía no hay casos publicados en esta industria.",
        all: "Ver todos los casos",
      },
      featured: {
        title: "Proyecto destacado.",
        lead: { strong: "Aquí va el proyecto más representativo del sector.", rest: "Contenido de ejemplo hasta tener el caso aprobado." },
      },
    },
    financialServices: {
      hero: {
        headline: "Software para entidades financieras que no pueden detenerse.",
        lead: "Canales digitales, integración con el core y migraciones en entornos regulados.",
        cta: "Hablar con el equipo",
      },
      data: {
        title: "Lo que pide la banca.",
        lead: { strong: "Seguridad y cumplimiento en cada cambio.", rest: "Sin perder velocidad frente a la competencia digital." },
        points: [
          { title: "Entorno regulado", text: "Cada integración se diseña para auditoría y control." },
          { title: "Canales digitales", text: "Apps y servicios que el cliente usa todos los días." },
          { title: "Core e integraciones", text: "Conexión segura entre el core y los nuevos servicios." },
        ],
      },
      cases: {
        title: "Casos de uso.",
        lead: { strong: "Proyectos en servicios financieros.", rest: "Contenido de ejemplo." },
        empty: "Todavía no hay casos publicados en esta industria.",
        all: "Ver todos los casos",
      },
      featured: {
        title: "Proyecto destacado.",
        lead: { strong: "Aquí va el proyecto más representativo del sector.", rest: "Contenido de ejemplo hasta tener el caso aprobado." },
      },
    },
    restaurants: {
      hero: {
        headline: "Tecnología para cadenas de restaurantes que quieren crecer.",
        lead: "Pedidos, operación y canales digitales conectados, para vender más sin sumar trabajo manual.",
        cta: "Hablar con el equipo",
      },
      data: {
        title: "Lo que pide un restaurante.",
        lead: { strong: "Cada pedido cuenta, en cada canal.", rest: "Y la operación no puede depender de procesos a mano." },
        points: [
          { title: "Pedidos multicanal", text: "App, web, delivery y mostrador en un solo flujo." },
          { title: "Operación", text: "Inventario y cocina conectados a lo que se vende." },
          { title: "Automatización", text: "Tareas repetitivas resueltas por agentes de IA." },
        ],
      },
      cases: {
        title: "Casos de uso.",
        lead: { strong: "Proyectos en restaurantes.", rest: "Contenido de ejemplo." },
        empty: "Todavía no hay casos publicados en esta industria.",
        all: "Ver todos los casos",
      },
      featured: {
        title: "Proyecto destacado.",
        lead: { strong: "Aquí va el proyecto más representativo del sector.", rest: "Contenido de ejemplo hasta tener el caso aprobado." },
      },
    },
    retail: {
      hero: {
        headline: "Retail que vende igual de bien en tienda y en línea.",
        lead: "Comercio digital, inventario y operación conectados para crecer sin fricción.",
        cta: "Hablar con el equipo",
      },
      data: {
        title: "Lo que pide el retail.",
        lead: { strong: "Un solo inventario para todos los canales.", rest: "Y una experiencia que no se rompe entre tienda y app." },
        points: [
          { title: "Omnicanal", text: "Tienda física, web y app con la misma información." },
          { title: "Inventario", text: "Existencias reales en cada canal, en tiempo real." },
          { title: "Datos", text: "Ventas y comportamiento para decidir mejor." },
        ],
      },
      cases: {
        title: "Casos de uso.",
        lead: { strong: "Proyectos en retail.", rest: "Es un mercado en expansión para nosotros." },
        empty: "Todavía no hay casos publicados en esta industria.",
        all: "Ver todos los casos",
      },
      featured: {
        title: "Proyecto destacado.",
        lead: { strong: "El primer caso de retail llegará pronto.", rest: "Mientras tanto, cuéntanos tu proyecto." },
      },
    },
  },
};
