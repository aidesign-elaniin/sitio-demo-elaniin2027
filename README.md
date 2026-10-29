# Elaniin 2027 website

Rediseño del sitio de Elaniin. Contenido de ejemplo.

- Sistema de diseño: [`DESIGN.md`](./DESIGN.md)
- Stack: Next.js, TypeScript, Tailwind CSS v4, motion

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |

## Indexación

Este sitio es la versión de revisión: no se indexa. La página lleva `<meta name="robots" content="noindex, nofollow">` y cada respuesta lleva la cabecera `X-Robots-Tag: noindex, nofollow`. No hay `robots.txt` con `Disallow` a propósito: bloquearía a los buscadores de ver el `noindex`.

Para el sitio real, define la variable de entorno `ALLOW_INDEXING=true` en el proyecto de producción y vuelve a desplegar. Sin tocar código.
