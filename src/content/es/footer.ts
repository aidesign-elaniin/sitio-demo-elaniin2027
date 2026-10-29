import type { FooterCopy } from "../schema";

/* Contenido de ejemplo. */
export const footer: FooterCopy = {
  navLabel: "Pie de página",
  socialsLabel: "Redes sociales",
  tagline: {
    lead: "Software que sostiene la operación de equipos exigentes.",
    rest: "Tú te enfocas en el negocio, no en la tecnología.",
  },
  newsletter: {
    first: "Nombre",
    last: "Apellido",
    email: "Correo electrónico",
    submit: "Mantente al tanto",
    sending: "Enviando…",
    legal: "Al enviar este formulario aceptas nuestros {terms}. Puedes darte de baja cuando quieras.",
    terms: "términos",
    success: "Listo. Te escribiremos pronto con novedades de Elaniin.",
    invalidEmail: "Escribe un correo válido para poder escribirte.",
  },
  columns: [
    { heading: "Soluciones", links: ["Desarrollo de software", "Soluciones de IA", "Cloud", "Applied AI"] },
    { heading: "Modelos de contratación", links: ["Aumento de equipo", "Equipos dedicados", "Entrega de proyectos"] },
    { heading: "Industrias", links: ["Sector público", "Servicios financieros", "Restaurantes", "Retail"] },
    { heading: "Recursos", links: ["Casos de uso", "Investigaciones", "Contacto"] },
  ],
  legal: ["Legal", "Privacidad", "Estado", "Reportar un problema"],
  copyright: "© 2027 elaniin",
  placeholder: "Contenido ficticio para validar el sistema de diseño.",
};
