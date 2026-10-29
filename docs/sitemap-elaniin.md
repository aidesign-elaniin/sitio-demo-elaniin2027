# Sitemap y contenido · elaniin.com 2027

Fuente: `Sitemap Elaniin.html` (arquitectura de información, 29 páginas). Convertido a Markdown: sin componentes JSX, no hace falta MDX.
Base visual: este repo (`elaniin-2027-website-main`). Marca y tokens: `DESIGN.md`. Pensado para construirse con `/elaniin:elaniin-style`.

## 0. Cómo usar este archivo

1. **Home = landing actual del repo, tal cual.** No se agregan ni quitan secciones (Hero, Clients, Cases, Research, Solutions, CTA, Footer). Del sitemap solo se aplica el **nav** (hecho, ver sección 5).
2. **Todas las demás páginas** se construyen desde las secciones 3.2 en adelante, reusando los componentes de `src/components/ui/` y el patrón de `src/components/sections/`.
3. **Contenido:** el sitemap define objetivo y secciones por página, no el texto final. Los textos se redactan como contenido de ejemplo en español/inglés (regla de `CLAUDE.md`). Los nombres de cliente y cifras que aparecen abajo vienen del sitemap tal cual: no inventar otros ni agregar cifras nuevas.
4. **Una página a la vez**, en el orden de la sección 6, con revisión a 375 / 768 / 1024 / 1280 px antes de seguir.

## 1. Resumen

| Dato | Valor |
|---|---|
| Páginas totales | 29 |
| En nav primario | 21 (Home + 5 secciones + 15 hijas) |
| Fuera del nav (alcanzables desde Home) | 8 |
| Diferenciador de marca | **Applied AI** (nodo destacado, `key`) |
| Idiomas | EN principal (sin prefijo), ES bajo `/es` (ver `docs/superpowers/specs/2026-10-15-bilingual-site-design.md`) |

### Árbol

```
Home
├─ Solutions (Services)
│  ├─ Software Development
│  │  ├─ Custom Software Development
│  │  ├─ Application Modernization
│  │  ├─ Mobile App Development
│  │  └─ Software Support & Evolution
│  ├─ Cloud
│  │  ├─ Cloud Migration
│  │  └─ API Management & Integration
│  └─ AI Solutions
│     └─ AI Agents & Process Automation
├─ Engagement Models
│  ├─ Staff Augmentation
│  ├─ Dedicated Development Teams
│  └─ Project Delivery
├─ Applied AI                          ← diferenciador de marca
├─ Resources
│  ├─ Use Cases
│  └─ Research
├─ Contact Us
├─ Industries                          (fuera del nav)
│  ├─ Public Sector
│  ├─ Financial Services
│  ├─ Restaurants
│  └─ Retail
├─ Scale your engineering team         (fuera del nav · landing por problema)
├─ Modernize a critical system         (fuera del nav · landing por problema)
└─ Deliver the technology behind growth (fuera del nav · landing por problema)
```

## 2. Tabla de rutas

Propuesta para `src/lib/routes.ts`. Slugs traducidos, anclas siempre en inglés. Servicios, recursos e industrias anidados; el resto, en la raíz.

| Clave (`RouteKey`) | EN | ES | Nav |
|---|---|---|---|
| `home` | `/` | `/es` | sí |
| `solutions` | `/solutions` | `/es/soluciones` | sí |
| `softwareDevelopment` | `/solutions/software-development` | `/es/soluciones/desarrollo-de-software` | sí |
| `customSoftware` | `/solutions/software-development/custom-software-development` | `/es/soluciones/desarrollo-de-software/desarrollo-a-medida` | sí |
| `appModernization` | `/solutions/software-development/application-modernization` | `/es/soluciones/desarrollo-de-software/modernizacion-de-aplicaciones` | sí |
| `mobileApps` | `/solutions/software-development/mobile-app-development` | `/es/soluciones/desarrollo-de-software/apps-moviles` | sí |
| `softwareSupport` | `/solutions/software-development/software-support-evolution` | `/es/soluciones/desarrollo-de-software/soporte-y-evolucion` | sí |
| `cloud` | `/solutions/cloud` | `/es/soluciones/cloud` | sí |
| `cloudMigration` | `/solutions/cloud/cloud-migration` | `/es/soluciones/cloud/migracion-a-la-nube` | sí |
| `apiManagement` | `/solutions/cloud/api-management-integration` | `/es/soluciones/cloud/gestion-e-integracion-de-apis` | sí |
| `aiSolutions` | `/solutions/ai-solutions` | `/es/soluciones/soluciones-de-ia` | sí |
| `aiAgents` | `/solutions/ai-solutions/ai-agents-process-automation` | `/es/soluciones/soluciones-de-ia/agentes-de-ia-y-automatizacion` | sí |
| `engagementModels` | `/engagement-models` | `/es/modelos-de-contratacion` | sí |
| `staffAugmentation` | `/engagement-models/staff-augmentation` | `/es/modelos-de-contratacion/aumento-de-equipo` | sí |
| `dedicatedTeams` | `/engagement-models/dedicated-development-teams` | `/es/modelos-de-contratacion/equipos-dedicados` | sí |
| `projectDelivery` | `/engagement-models/project-delivery` | `/es/modelos-de-contratacion/entrega-de-proyectos` | sí |
| `appliedAi` | `/applied-ai` | `/es/ia-aplicada` | sí (destacado) |
| `resources` | `/resources` | `/es/recursos` | sí |
| `useCases` | `/resources/use-cases` | `/es/recursos/casos-de-uso` | sí |
| `research` | `/resources/research` | `/es/recursos/investigaciones` | sí |
| `contact` | `/contact-us` | `/es/contacto` | sí (botón CTA) |
| `industries` | `/industries` | `/es/industrias` | no |
| `publicSector` | `/industries/public-sector` | `/es/industrias/sector-publico` | no |
| `financialServices` | `/industries/financial-services` | `/es/industrias/servicios-financieros` | no |
| `restaurants` | `/industries/restaurants` | `/es/industrias/restaurantes` | no |
| `retail` | `/industries/retail` | `/es/industrias/retail` | no |
| `scaleTeam` | `/scale-your-engineering-team` | `/es/escala-tu-equipo-de-ingenieria` | no |
| `modernizeSystem` | `/modernize-a-critical-system` | `/es/moderniza-un-sistema-critico` | no |
| `deliverGrowth` | `/deliver-technology-behind-growth` | `/es/entrega-la-tecnologia-detras-del-crecimiento` | no |

## 3. Páginas

Formato por página: **Objetivo**, **Secciones** (en orden), **Hijas**. Las "Pruebas" son referencias del sitemap.

### 3.1 Home · `home` · LANDING BASE (sin cambios)

- **Decisión:** el Home es el landing de `elaniin-2027-website-main` tal cual: Nav → Hero → Clients → Cases → Research → Solutions → CTA → Footer. No se agregan las secciones que el sitemap original proponía (value axes, sección Applied AI, industrias).
- **Objetivo del sitemap (referencia):** que alguien que no conoce Elaniin entienda en 10 segundos qué resuelve y encuentre su camino.
- **Cómo se llega a las páginas fuera del nav** (Industries y las 3 landings por problema): pendiente. Opciones: footer o campañas.
- **Hijas:** `solutions`, `engagementModels`, `appliedAi`, `resources`, `contact`, `industries`, `scaleTeam`, `modernizeSystem`, `deliverGrowth`.

### 3.2 Solutions (Services) · `solutions` · CONSTRUIDA

- **Estado:** construida en `src/app/[lang]/solutions/page.tsx` (`/solutions`, `/es/soluciones`). Orden: Hero → Intro + 3 bloques (las mismas tarjetas del megamenú) → Mención de Applied AI con sus 3 pilares → CTA → Footer. Acceso: franja del menú Soluciones ("Todas las soluciones") y título "Soluciones" del footer.

- **Objetivo:** orientar a quien ya sabe qué tipo de trabajo necesita (construir, migrar, automatizar) hacia la categoría correcta.
- **Secciones:** 1) Intro: las 3 categorías son un solo equipo. 2) 3 bloques de entrada. 3) Mención de Applied AI con link.
- **Hijas:** `softwareDevelopment`, `cloud`, `aiSolutions`.

### 3.3 Software Development · `softwareDevelopment` · CONSTRUIDA (hub + 3.4 a 3.7)

- **Estado:** hub y 4 servicios construidos con las plantillas Hub y Servicio (`src/app/[lang]/solutions/[line]/` y `[line]/[service]/`). Copy en `src/content/{es,en}/software.ts`; modelos sugeridos y destino del bloque destacado en `src/components/sections/service/registry.ts`. Soporte y evolución no lleva Problema ni Modelos (el sitemap no los lista).
- **Para Cloud y AI Solutions:** agregar rutas en `routes.ts`, una entrada en `registry.ts`, su copy (`cloud.ts`, `ai.ts`) y su meta. No hacen falta páginas nuevas.

- **Objetivo:** mostrar que Elaniin construye y sostiene software de misión crítica en producción. Categoría con más evidencia (gobierno + banca).
- **Secciones:** 1) Intro: modernizar vs. construir. 2) 4 bloques de subservicio. 3) Franja de prueba: DGME, MTPS, IFES/TSE, Banco Azul, Credicomer.
- **Hijas:** `customSoftware`, `appModernization`, `mobileApps`, `softwareSupport`.

### 3.4 Custom Software Development · `customSoftware`

- **Objetivo:** para quien necesita un sistema o producto que no existe y no tiene con quién construirlo. Audiencia: Gerente General, titular, director de TI.
- **Secciones:** 1) Problema. 2) Qué incluye (arquitectura, backend, frontend, QA). 3) Evidencia (DGME, MTPS, IFES/TSE, Beelder, uSource). 4) Cómo trabajamos (link a Applied AI). 5) Modelos sugeridos.

### 3.5 Application Modernization · `appModernization`

- **Objetivo:** para el sistema que ya frena el negocio. Audiencia: Director de TI o Transformación Digital. Eje con más evidencia de demanda en los 3 mercados.
- **Secciones:** 1) Problema. 2) Qué incluye (re-arquitectura, microservicios). 3) Evidencia (Tegra, Core Funcional GOES). 4) Migración sin interrupción. 5) Modelos sugeridos.

### 3.6 Mobile App Development · `mobileApps`

- **Objetivo:** el canal digital que conecta al cliente o ciudadano. Audiencia: gerente de canales digitales.
- **Secciones:** 1) Problema. 2) Qué incluye (mobile nativo e híbrido, integración bancaria). 3) Evidencia (Banco Azul, Credicomer, Diimo, FGR). 4) Modelos sugeridos.

### 3.7 Software Support & Evolution · `softwareSupport`

- **Objetivo:** para quien ya construyó con Elaniin y necesita continuidad. **NO es puerta de entrada** (no destacar en CTAs de captación).
- **Secciones:** 1) Qué cubre (SLA, mantenimiento, evolución). 2) Evidencia (ASESUISA, Abaco, ITCA, RNPN, Alianza Américas). 3) Por qué el mismo equipo.

### 3.8 Cloud · `cloud` · CONSTRUIDA (hub + 3.9 y 3.10)

- **Estado:** misma plantilla que Software. Copy en `src/content/{es,en}/cloud.ts`. API Management no lleva bloque destacado; la cifra "~150 APIs" del sitemap no se publica hasta validarla.

- **Objetivo:** para quien ya sabe que el problema es de infraestructura: costos, escalabilidad o vencimiento de contrato.
- **Secciones:** 1) Intro: credencial Google Cloud. 2) 2 bloques. 3) Franja de prueba: uSource, IBEX, Procesar.
- **Hijas:** `cloudMigration`, `apiManagement`.

### 3.9 Cloud Migration · `cloudMigration`

- **Objetivo:** costos de nube altos, vencimiento de contrato o infraestructura que no escala. Audiencia: CTO, Gerente de Finanzas.
- **Secciones:** 1) Problema. 2) Qué incluye (migración GCP, arquitectura). 3) Evidencia (uSource, IBEX, Abaco, Diimo, Mercandú, GOES). 4) Incentivo Google Cloud. 5) Modelos sugeridos.

### 3.10 API Management & Integration · `apiManagement`

- **Objetivo:** sistemas que no se hablan o APIs sin control en entornos regulados. Audiencia: Director de TI. Caso más fuerte en entorno regulado y en México.
- **Secciones:** 1) Problema. 2) Qué incluye (Apigee, Application Integration). 3) Evidencia (Procesar ~150 APIs, Invercap, Credicomer). 4) Modelos sugeridos.

### 3.11 AI Solutions · `aiSolutions` · CONSTRUIDA (hub + 3.12)

- **Estado:** misma plantilla. Copy en `src/content/{es,en}/ai.ts`. El hub tiene una sola tarjeta (una sola subpágina en el sitemap).

- **Objetivo:** para quien quiere automatizar un proceso real, no probar un piloto de IA. Audiencia: Gerente de Operaciones, Dueño.
- **Secciones:** 1) Intro: diferencia con Applied AI. 2) 1 bloque. 3) Franja de prueba: Donkeys, GOES, Publimóvil, Ambassador.
- **Hijas:** `aiAgents`.

### 3.12 AI Agents & Process Automation · `aiAgents`

- **Objetivo:** procesos manuales que no escalan sin crecer el equipo: pedidos, trámites, documentos.
- **Secciones:** 1) Problema. 2) Qué incluye (agentes, n8n, LLM, extracción de documentos). 3) Evidencia (Donkeys, GOES, Publimóvil, Ambassador). 4) Por qué no es un piloto. 5) Modelos sugeridos.

### 3.13 Engagement Models · `engagementModels` · CONSTRUIDA (hub + 3.14 a 3.16)

- **Estado:** hub en `src/app/[lang]/engagement-models/page.tsx` (comparativa en `src/components/sections/engagement/comparison.tsx`) y modelos en `[model]/page.tsx` con la plantilla de servicio. Copy en `src/content/{es,en}/engagement.ts`. Equipos dedicados y Entrega de proyectos no tienen franja de clientes: el sitemap no nombra ninguno. Slug ES final de Staff Augmentation: `aumento-de-equipo`.

- **Objetivo:** para quien ya decidió trabajar con Elaniin y necesita saber cómo se contrata.
- **Secciones:** 1) Intro: 3 modelos en una frase. 2) 3 bloques. 3) Comparativa.
- **Hijas:** `staffAugmentation`, `dedicatedTeams`, `projectDelivery`.

### 3.14 Staff Augmentation · `staffAugmentation`

- **Objetivo:** para el CTO/VP Engineering con roadmap pero sin gente; término que ya busca el comprador de EE. UU.
- **Secciones:** 1) Problema. 2) Cómo funciona (perfiles, arranque, overlap horario). 3) Recursos nombrados. 4) Evidencia (Jostens, PuntoXpress).

### 3.15 Dedicated Development Teams · `dedicatedTeams`

- **Objetivo:** para quien necesita un equipo completo, no una persona suelta.
- **Secciones:** 1) Problema. 2) Cómo funciona (squad dedicado). 3) Evidencia.

### 3.16 Project Delivery · `projectDelivery`

- **Objetivo:** para quien quiere un resultado, no un equipo. Discovery como fase 0.
- **Secciones:** 1) Problema. 2) Cómo funciona (discovery, fases, entregables). 3) Evidencia.

### 3.17 Applied AI · `appliedAi` · DIFERENCIADOR DE MARCA · CONSTRUIDA

- **Estado:** construida en `src/app/[lang]/applied-ai/page.tsx` (secciones en `src/components/sections/applied-ai/`, copy en `src/content/{es,en}/applied-ai.ts`). Orden: Hero → Pilares → En cada servicio → Evidencia → CTA → Footer. Evidencia con nombres del sitemap y texto de ejemplo, sin cifras.

- **Objetivo:** no es un servicio: es cómo Elaniin entrega los otros tres (Software Development, Cloud y AI Solutions). Conecta todo lo que la empresa construye.
- **Secciones:** 1) Pilares: capacidad 100x, human-in-the-loop, entregables diferenciados. 2) Cómo se ve en cada servicio. 3) Evidencia (Delta Force GOES, Atlas Builder).
- **Tratamiento visual:** única página con peso especial en nav y Home. Banda Excellence Blue; Elevate Blue solo en detalles (ver `colors.elevate-blue-usage` en `DESIGN.md`). Enlazada desde Solutions, Custom Software y Home.

### 3.18 Resources · `resources` · CONSTRUIDA (hub + 3.19 y 3.20)

- **Estado:** `src/app/[lang]/resources/` (hub, `use-cases/`, `research/`). Copy en `src/content/{es,en}/resources.ts`. Casos de uso: filtro por industria sobre las tarjetas del Home; la industria de cada caso de ejemplo está en `cases-data.ts` (retail sin caso, sin pestaña). Investigaciones: listado del Home con filtro por tema (IA, Cloud, Producto). Las páginas de detalle de cada caso e investigación siguen pendientes ("Leer el caso" lleva a `#`).

- **Objetivo:** prueba social y de pensamiento para quien todavía evalúa.
- **Secciones:** 1) Intro. 2) 2 bloques.
- **Hijas:** `useCases`, `research`.

### 3.19 Use Cases · `useCases`

- **Objetivo:** casos de clientes por industria.
- **Secciones:** 1) Filtro por industria. 2) Tarjetas de caso.
- **Reusar:** `src/components/sections/cases/` (tarjetas y escenas).

### 3.20 Research · `research`

- **Objetivo:** investigaciones propias y contenido editorial. Funciona como el blog de la marca.
- **Secciones:** 1) Listado de artículos. 2) Filtro por tema.
- **Reusar:** `src/components/sections/research/` (`research-explorer`, `research-data`).

### 3.21 Contact Us · `contact` · CONSTRUIDA

- **Estado:** `src/app/[lang]/contact-us/page.tsx`, formulario en `src/components/sections/contact/contact-form.tsx`, copy en `src/content/{es,en}/contact.ts`. El formulario valida y simula el envío: **no envía nada** hasta conectarlo a un backend o servicio (pendiente). Correo y teléfono de contacto directo son de ejemplo (`example.com`). El botón secundario del CTA final ("Escribir un correo") sigue en `#` hasta tener el correo oficial.

- **Objetivo:** cerrar la conversión con la menor fricción posible.
- **Secciones:** 1) Formulario. 2) Contacto directo. 3) Qué esperar después.
- **Nota:** es el botón primario del nav. Formulario con validación y estados (enviando, éxito, error) como el newsletter del footer.

### 3.22 Industries · `industries` · fuera del nav · CONSTRUIDA (hub + 3.23 a 3.26)

- **Estado:** `src/app/[lang]/industries/` (hub y `[industry]/`), copy en `src/content/{es,en}/industries.ts`. Las cifras del hub se cuentan del propio sitio (4 industrias, 7 servicios, 3 modelos). Los datos internos del sitemap (76.4%, 51.2%) **no** se publican. Certificaciones: solo Google Cloud (lista por confirmar). "Proyecto destacado" es texto de ejemplo en las 4 industrias; Retail muestra un estado vacío en Casos de uso.

- **Objetivo:** validar que Elaniin entiende el sector antes de que lo pregunten.
- **Secciones:** 1) Intro. 2) Stats. 3) Certificaciones.
- **Hijas:** `publicSector`, `financialServices`, `restaurants`, `retail`.
- **Acceso:** columna "Industrias" del footer.

### 3.23 Public Sector · `publicSector` · fuera del nav

- **Objetivo:** titular o director de modernización, UACI. Del sitemap: 76.4% del valor histórico viene de aquí; GOES explica 51.2% (dato interno: **verificar antes de publicar**).
- **Secciones:** 1) Data. 2) Casos de uso. 3) Proyecto destacado.

### 3.24 Financial Services · `financialServices` · fuera del nav

- **Objetivo:** Director de TI y Transformación Digital, gerente de canales digitales.
- **Secciones:** 1) Data. 2) Casos de uso. 3) Proyecto destacado.

### 3.25 Restaurants · `restaurants` · fuera del nav

- **Objetivo:** dueño o gerente general de cadena de restaurantes.
- **Secciones:** 1) Data. 2) Casos de uso. 3) Proyecto destacado.

### 3.26 Retail · `retail` · fuera del nav

- **Objetivo:** mercado objetivo en expansión, todavía sin caso cerrado.
- **Secciones:** 1) Data. 2) Casos de uso. 3) Proyecto destacado.
- **Pendiente:** sin caso real; el "Proyecto destacado" va como estado vacío o marcado de ejemplo.

### 3.27 Scale your engineering team · `scaleTeam` · landing por problema

- **Objetivo:** "Tenemos el roadmap, no la gente." Para quien ya tiene equipo propio pero no la capacidad para cumplir lo planeado.
- **Secciones:** 1) Servicios que combina. 2) Caso (Jostens, PuntoXpress). 3) Modelo sugerido (→ `staffAugmentation`).

### 3.28 Modernize a critical system · `modernizeSystem` · landing por problema

- **Objetivo:** "El sistema ya no aguanta." Para quien depende de un sistema que frena la operación.
- **Secciones:** 1) Servicios que combina. 2) Caso (Procesar, Tegra, uSource). 3) Modelo sugerido.

### 3.29 Deliver the technology behind growth · `deliverGrowth` · landing por problema

- **Objetivo:** "Tenemos que lanzar esto y nadie lo puede entregar." Para quien necesita una plataforma, producto o servicio digital nuevo, de punta a punta. En sector público se adapta como los servicios que la institución pone en manos de la ciudadanía.
- **Secciones:** 1) Servicios que combina. 2) Caso (DGME, Banco Azul, Mercandú, Donkeys). 3) Modelo sugerido.

## 4. Plantillas de página (para reusar)

Las 29 páginas caen en pocas plantillas. Construir la plantilla una vez, luego solo cambia el contenido en `src/content/{es,en}/`.

| Plantilla | Páginas | Estructura base |
|---|---|---|
| **Hub** | `solutions`, `softwareDevelopment`, `cloud`, `aiSolutions`, `engagementModels`, `resources`, `industries` | Hero corto → intro → bloques de entrada a hijas → franja de prueba |
| **Servicio** | `customSoftware`, `appModernization`, `mobileApps`, `softwareSupport`, `cloudMigration`, `apiManagement`, `aiAgents` | Problema → Qué incluye → Evidencia → Modelos sugeridos → CTA |
| **Modelo de contratación** | `staffAugmentation`, `dedicatedTeams`, `projectDelivery` | Problema → Cómo funciona → Evidencia → CTA |
| **Industria** | `publicSector`, `financialServices`, `restaurants`, `retail` | Data → Casos de uso → Proyecto destacado → CTA |
| **Landing por problema** | `scaleTeam`, `modernizeSystem`, `deliverGrowth` | Frase-problema → Servicios que combina → Caso → Modelo sugerido |
| **Listado filtrable** | `useCases`, `research` | Filtro → grilla de tarjetas |
| **Diferenciador** | `appliedAi` | Pilares → En cada servicio → Evidencia |
| **Conversión** | `contact` | Formulario → Contacto directo → Qué esperar |

## 5. Navegación

- **Nav primario (IMPLEMENTADO, `src/components/sections/nav/`):** mismo estilo del sitio (barra glass adaptativa, panel que cambia de alto, cross-slide entre menús, hoja móvil con acordeones).

| Ítem | Tipo | Contenido |
|---|---|---|
| Soluciones / Solutions | Megamenú de 3 tarjetas (`solutions-menu.tsx`) | Desarrollo de software (4 subpáginas) · Soluciones de IA (1) · Cloud (2). Franja inferior: mención y link a Applied AI |
| Modelos de contratación / Engagement models | Megamenú nuevo (`engagement-menu.tsx`) | Aumento de equipo · Equipos dedicados · Entrega de proyectos. Franja inferior: "Comparar modelos" |
| Applied AI | Link simple con punto Elevate Blue (diferenciador) | → `appliedAi` (página activa) |
| Recursos / Resources | Megamenú (`resources-menu.tsx`) | Casos de uso · Investigaciones · Últimos artículos · Casos destacados (≥1280px). Se quitó la columna "Guías" |
| Contáctanos / Contact us | Botón primario | → `#contact` del Home hasta que exista `contact` |

- Orden y destinos en `nav-data.ts` (`navOrder`). Páginas que aún no existen = `null` → `#`. Al crear cada página: agregarla a `src/lib/routes.ts` y cambiar su `null` por `{ route: "<clave>" }`.
- **Footer (IMPLEMENTADO, `src/components/sections/footer/`):** mismo estilo (banda Excellence Blue, newsletter, redes, fila legal). 4 columnas; destinos en `footer-data.ts`:

| Columna | Links |
|---|---|
| Soluciones | Desarrollo de software · Soluciones de IA · Cloud · Applied AI |
| Modelos de contratación | Aumento de equipo · Equipos dedicados · Entrega de proyectos |
| Industrias | Sector público · Servicios financieros · Restaurantes · Retail |
| Recursos | Casos de uso · Investigaciones · Contacto |

- **Fuera del nav:** Industries (+4) se alcanza desde el footer. Las 3 landings por problema quedan solo como destino de campañas.
- **Breadcrumbs** (IMPLEMENTADO): en todas las páginas de nivel 2 o más, calculados desde la tabla de rutas (`src/lib/breadcrumbs.ts`, componente `src/components/ui/breadcrumbs.tsx`, se muestra desde el `Nav`).
- **Enlaces internos entre páginas:** todos vía `href(key, lang, hash?)` de `src/lib/routes.ts`. Sin rutas escritas a mano.

## 6. Orden de construcción sugerido

1. ~~Nav y footer con el sitemap~~ (hecho). Home queda como está.
2. ~~**Applied AI**~~ (hecho).
3. **Plantilla Hub:** ~~`solutions`, `softwareDevelopment`, `cloud`, `aiSolutions`~~ (hecho); todos hechos.
4. ~~**Plantilla Servicio:** los 7 servicios~~ (hecho).
5. ~~**Engagement Models** + 3 hijas~~ (hecho).
6. ~~**Resources** + `useCases` + `research`~~ (hecho).
7. ~~**Contact Us**~~ (hecho).
8. ~~**Industries** + 4 hijas~~ (hecho).
9. ~~**3 landings por problema**~~ (hecho: `src/components/sections/landing/`; servicios y modelos de cada landing son propuesta a validar en `landing-data.ts`).

## 7. Pendientes y decisiones abiertas

- "Nosotros", "Carreras", "Guías" y "Sistema de diseño" se quitaron de nav y footer (no están en el sitemap). Si se quieren, hay que agregarlos al sitemap.
- En ES, la tarjeta de IA del Home dice "IA aplicada" (servicio) y el nav dice "Applied AI" (diferenciador). Alinear nombres cuando llegue el copy real.
- Slugs en español de la sección 2: propuesta, validar con el equipo.
- Cifras del sitemap (76.4%, 51.2%, ~150 APIs) y nombres de cliente: validar con el equipo antes de publicar. En esta fase todo texto es de ejemplo.
- `retail` no tiene caso cerrado.
- `softwareSupport` no debe ser puerta de entrada.
- Páginas hijas de Resources, Industries y Services necesitan `meta` por idioma en `src/content/{es,en}/meta.ts`.

## 8. Páginas fuera del sitemap (construidas)

Contenido que el sitio ya enlazaba desde Recursos. Plantillas en `src/app/[lang]/resources/`, copy en `src/content/{es,en}/details.ts`. Todo es contenido de ejemplo; las cifras repiten las de las tarjetas y listados, sin agregar nuevas.

| Tipo | Páginas | URL ES |
|---|---|---|
| Caso | 4 | `/es/recursos/casos-de-uso/{seguimiento-de-entregas, pagos-para-pymes, asistente-de-soporte, migracion-a-la-nube}` |
| Investigación | 4 | `/es/recursos/investigaciones/{pilotos-de-ia, gasto-en-nube, entregas-semanales, altas-largas}` |
| Artículo | 3 | `/es/recursos/articulos/{insights, playbook-de-entregas, informe-de-ia}` |

**Páginas legales (construidas):** Legal (`/es/legal`, también enlazada como "términos" del newsletter), Privacidad (`/es/privacidad`), Estado (`/es/estado`) y Reportar un problema (`/es/reportar-un-problema`). Plantilla en `src/components/sections/legal/legal-page.tsx`, copy en `src/content/{es,en}/legal.ts`. **El texto es de ejemplo y no es válido legalmente:** lo redacta y aprueba el equipo legal. Estado no muestra estados de sistemas: se conectará al servicio de monitoreo.

**Pendiente fuera del sitemap:** correo oficial para "Escribir un correo", URLs de redes sociales, backend del formulario de contacto y del newsletter.
