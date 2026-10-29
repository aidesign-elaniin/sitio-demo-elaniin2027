import type { ServiceLineCopy, SoftwareService } from "../schema";

/*
  Contenido de ejemplo. Estructura de docs/sitemap-elaniin.md 3.3 a 3.7. Las franjas de prueba usan los nombres del
  sitemap, sin cifras inventadas.
*/
export const software: ServiceLineCopy<SoftwareService> = {
  hub: {
    hero: {
      headline: "Software de misión crítica, en producción.",
      lead: "Construimos sistemas nuevos y modernizamos los que ya frenan la operación. Y nos quedamos para sostenerlos.",
      cta: "Cuéntanos tu proyecto",
    },
    intro: {
      title: "Construir o modernizar.",
      lead: {
        strong: "Si el sistema no existe, lo construimos; si ya no aguanta, lo modernizamos.",
        rest: "En los dos casos, el mismo equipo lo opera y lo hace evolucionar.",
      },
    },
    cards: {
      customSoftware: { title: "Software a medida", text: "El sistema o producto que necesitas y no tienes con quién construir." },
      appModernization: { title: "Modernización de aplicaciones", text: "Re-arquitectura del sistema que ya frena el negocio." },
      mobileApps: { title: "Apps móviles", text: "El canal digital que conecta a tu cliente o ciudadano." },
      softwareSupport: { title: "Soporte y evolución", text: "Continuidad para el software que ya construimos contigo." },
    },
    proof: ["DGME", "MTPS", "IFES/TSE", "Banco Azul", "Credicomer"],
  },
  services: {
    customSoftware: {
      hero: {
        headline: "El sistema que necesitas todavía no existe.",
        lead: "Lo diseñamos, lo construimos y lo ponemos en producción, de la arquitectura a QA, con un solo equipo responsable.",
        cta: "Cuéntanos qué necesitas construir",
      },
      problem: {
        title: "Cuando no hay con quién construirlo.",
        lead: {
          strong: "El problema no es la idea, es la capacidad de llevarla a producción.",
          rest: "Sin equipo propio, cada proveedor resuelve una parte y nadie responde por el todo.",
        },
        points: [
          { title: "Sin equipo interno", text: "La operación no puede detenerse para formar uno desde cero." },
          { title: "Proveedores por partes", text: "Diseño, desarrollo y QA en manos distintas, sin un responsable." },
          { title: "Plazos que no esperan", text: "La fecha de salida ya está comprometida con el negocio." },
        ],
      },
      includes: {
        title: "Qué incluye.",
        lead: { strong: "Todo lo que lleva un sistema a producción.", rest: "En un solo equipo y un solo plan." },
        items: [
          { title: "Arquitectura", text: "Decisiones técnicas documentadas, pensadas para crecer." },
          { title: "Backend", text: "Servicios, datos e integraciones con lo que ya tienes." },
          { title: "Frontend", text: "Interfaces web que la gente usa de verdad." },
          { title: "QA", text: "Pruebas automatizadas y manuales antes de cada entrega." },
        ],
      },
      highlight: {
        title: "Cómo trabajamos.",
        lead: {
          strong: "Con Applied AI en cada fase.",
          rest: "Más capacidad para el mismo plazo y revisión humana antes de cada entrega.",
        },
        link: "Conocer Applied AI",
      },
      proof: ["DGME", "MTPS", "IFES/TSE", "Beelder", "uSource"],
    },
    appModernization: {
      hero: {
        headline: "El sistema ya no aguanta. La operación tampoco puede parar.",
        lead: "Modernizamos el sistema que frena tu negocio por partes, mientras sigue funcionando.",
        cta: "Cuéntanos qué sistema te frena",
      },
      problem: {
        title: "Cuando el sistema frena al negocio.",
        lead: {
          strong: "Cada cambio tarda más y cuesta más que el anterior.",
          rest: "Y reemplazarlo de golpe es un riesgo que nadie quiere tomar.",
        },
        points: [
          { title: "Cambios lentos", text: "Una mejora pequeña toca demasiadas partes del sistema." },
          { title: "Conocimiento concentrado", text: "Solo unas pocas personas entienden cómo funciona." },
          { title: "Riesgo de reemplazo", text: "Apagar el sistema viejo no es una opción." },
        ],
      },
      includes: {
        title: "Qué incluye.",
        lead: { strong: "Un camino por etapas, no un salto al vacío.", rest: "Cada etapa entrega valor y se puede medir." },
        items: [
          { title: "Diagnóstico", text: "Mapa del sistema actual, sus dependencias y sus riesgos." },
          { title: "Re-arquitectura", text: "Un diseño objetivo que se alcanza por partes." },
          { title: "Microservicios", text: "Las piezas críticas se separan y se despliegan solas." },
        ],
      },
      highlight: {
        title: "Migración sin interrupción.",
        lead: {
          strong: "El sistema nuevo crece al lado del viejo.",
          rest: "Movemos módulo por módulo y la operación no se detiene en ningún momento.",
        },
      },
      proof: ["Tegra", "Core Funcional GOES"],
    },
    mobileApps: {
      hero: {
        headline: "El canal que tus clientes llevan en el bolsillo.",
        lead: "Apps nativas e híbridas conectadas a tus sistemas, pensadas para la gente que las usa todos los días.",
        cta: "Cuéntanos tu app",
      },
      problem: {
        title: "Cuando el canal digital se queda atrás.",
        lead: {
          strong: "Tus clientes esperan resolver todo desde el teléfono.",
          rest: "Y la app actual no está conectada a lo que pasa en tus sistemas.",
        },
        points: [
          { title: "Experiencia incompleta", text: "Los trámites terminan en una sucursal o una llamada." },
          { title: "Integración frágil", text: "La app no habla bien con el core del negocio." },
          { title: "Lanzamientos lentos", text: "Cada versión nueva tarda meses en salir." },
        ],
      },
      includes: {
        title: "Qué incluye.",
        lead: { strong: "Del diseño a la tienda de apps.", rest: "Y la integración con tus sistemas en el medio." },
        items: [
          { title: "Nativo e híbrido", text: "La tecnología que conviene a tu producto, no una sola receta." },
          { title: "Integración bancaria", text: "Conexión segura con core, pagos y servicios internos." },
          { title: "Publicación", text: "Versiones frecuentes, medidas y sin sorpresas en las tiendas." },
        ],
      },
      proof: ["Banco Azul", "Credicomer", "Diimo", "FGR"],
    },
    softwareSupport: {
      hero: {
        headline: "El software que construimos sigue creciendo contigo.",
        lead: "Mantenimiento, acuerdos de servicio y evolución para los sistemas que ya están en producción.",
        cta: "Hablar con el equipo",
      },
      includes: {
        title: "Qué cubre.",
        lead: { strong: "Continuidad con reglas claras.", rest: "Sabes qué se atiende, en cuánto tiempo y quién responde." },
        items: [
          { title: "SLA", text: "Tiempos de respuesta acordados por nivel de prioridad." },
          { title: "Mantenimiento", text: "Actualizaciones, seguridad y correcciones al día." },
          { title: "Evolución", text: "Mejoras planificadas a partir de lo que pide el negocio." },
        ],
      },
      highlight: {
        title: "Por qué el mismo equipo.",
        lead: {
          strong: "Quien lo construyó lo conoce mejor que nadie.",
          rest: "Sin curva de aprendizaje ni traspasos que pierdan contexto.",
        },
      },
      proof: ["ASESUISA", "Abaco", "ITCA", "RNPN", "Alianza Américas"],
    },
  },
};
