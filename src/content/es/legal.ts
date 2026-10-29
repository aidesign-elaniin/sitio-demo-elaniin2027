import type { LegalCopy } from "../schema";

/* Texto de ejemplo, pendiente de redacción y aprobación por el equipo legal. No es un texto legal válido. */
export const legal: LegalCopy = {
  back: "Inicio",
  tag: "Pendiente de aprobación",
  notice: "Texto de ejemplo. La versión final la redacta y aprueba el equipo legal antes de publicar el sitio.",
  pages: {
    legal: {
      title: "Términos legales",
      lead: "Las condiciones de uso de este sitio y de la información que publicamos en él.",
      sections: [
        { title: "Uso del sitio", paragraphs: ["Aquí van las condiciones bajo las que se puede usar este sitio y su contenido."] },
        { title: "Propiedad intelectual", paragraphs: ["Aquí va quién es dueño del contenido, las marcas y el software publicados."] },
        { title: "Responsabilidad", paragraphs: ["Aquí van los límites de responsabilidad sobre la información del sitio."] },
      ],
    },
    privacy: {
      title: "Privacidad",
      lead: "Qué datos recibimos a través de este sitio, para qué los usamos y cómo puedes pedir que los borremos.",
      sections: [
        { title: "Datos que recibimos", paragraphs: ["Aquí van los datos que llegan por el formulario de contacto y el newsletter."] },
        { title: "Para qué los usamos", paragraphs: ["Aquí va el uso de esos datos: responder tu mensaje y enviarte novedades si lo pediste."] },
        { title: "Tus derechos", paragraphs: ["Aquí va cómo pedir acceso, corrección o eliminación de tus datos."] },
      ],
    },
    status: {
      title: "Estado de los servicios",
      lead: "Disponibilidad de los servicios que operamos para nuestros clientes.",
      sections: [
        {
          title: "Página en preparación",
          paragraphs: [
            "El estado en tiempo real se publicará cuando esta página se conecte al servicio de monitoreo. Mientras tanto, si notas un problema, repórtalo.",
          ],
        },
      ],
      action: "Reportar un problema",
    },
    reportIssue: {
      title: "Reportar un problema",
      lead: "Si algo no funciona en un servicio que operamos o en este sitio, cuéntanos para revisarlo.",
      sections: [
        { title: "Qué incluir", paragraphs: ["El servicio afectado, qué esperabas que pasara, qué pasó y desde cuándo."] },
        { title: "Qué pasa después", paragraphs: ["Una persona del equipo revisa el reporte y te responde con los siguientes pasos."] },
      ],
      action: "Escribir al equipo",
    },
  },
};
