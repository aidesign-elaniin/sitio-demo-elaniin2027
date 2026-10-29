# Design System Brief — Elaniin 2027 (secciones internas)

Generated from 294 curated pins (board "UI Reference"). Unos 40 son páginas web de marketing; el resto son apps móviles, hardware y texturas. Este brief usa solo los pins de sitios web.

## Summary
Los sitios de estudios y SaaS del board coinciden en tres patrones de estructura que hoy le faltan a las páginas internas de Elaniin:
1. Una lista de categorías en columnas altas que se expanden.
2. Una banda oscura de cifras grandes con la etiqueta al lado.
3. Pasos de proceso con el número grande en la misma fila que el texto.

El color sí diverge. La mitad del board usa acentos saturados (verde lima, naranja), que no se adoptan. La otra mitad es sobria y oscura (Kus, Miros, PlayerZero) y coincide con el sistema de Elaniin. Según DESIGN.md §11, de las referencias se toman layout y estructura, nunca colores ni tipografías.

## Color
- Inferido: las bandas de cifras usan un fondo casi negro (~#0F1A14) con números blancos y etiquetas grises (~#A0A0A0). En Elaniin eso se traduce a Excellence Blue `#01172E` con `text-on-dark-secondary`. ([Miros](https://www.temlis.com/templates/miros?utm_source=organic&utm_medium=pinterest))
- Inferido: el acento se usa solo en detalles (flechas, puntos), sobre una base blanca o gris cálido (~#F2F0EC). Coincide con la regla de Elevate Blue en menos del 5% del área. ([PlayerZero](https://app.notion.com/p/40-Mobility-Presentation-Templates-to-Streamline-Your-Professional-Projects-3a3136d2353f807c8367f4a5cd696e9e/?framer-gallery-playerzero))
- Descartado: las columnas de color por categoría de Metrium (beige, lila, amarillo, naranja, petróleo). Rompen la regla de no usar barras de color decorativas. ([Metrium](https://dribbble.com/shots/19133524-Metrium-Landing-Page-UI))

## Typography
- Las cifras van en display muy grande (unas 3 a 4 veces el cuerpo de texto) con la etiqueta en texto chico a la derecha, no debajo. ([Metrium](https://dribbble.com/shots/19133524-Metrium-Landing-Page-UI), (source: images/1115063189023234275.jpg))
- Los números de paso son display gigante en contorno o en color suave, y el título va al lado. ([Financial Match](https://www.theworldaccordingtome.org/2930470_ultimate-creative-web-ui-kits-twitch-stream-overlay-collection/?step-by-step-token-fintech-landing-pagebuilder-guide), (source: images/1115063189023185408.jpg))
- En los footers de estudio, los links van en mono con flecha ↗ y hairlines punteadas. ([Kus footer](https://www.footer.design/sites/kus))

## Layout & spacing
- Las categorías van en columnas verticales de alto fijo, una al lado de otra. La columna activa se ensancha y muestra un ícono arriba y una flecha en círculo. ([Metrium](https://dribbble.com/shots/19133524-Metrium-Landing-Page-UI))
- Las cifras van en una fila de 3 a 5 celdas separadas por hairlines verticales y a ancho completo. ([Miros](https://www.temlis.com/templates/miros?utm_source=organic&utm_medium=pinterest), [Metrium](https://dribbble.com/shots/19133524-Metrium-Landing-Page-UI))
- Los servicios van numerados /01 a /04 en una grilla de celdas sobre hairlines. (source: images/1115063189023185415.jpg, images/1115063189023185408.jpg)
- Las grillas con hairlines compartidas para "what I do" y "kind words" son las mismas que `grid-hairline`. ([Portfolio](https://payhip.com/TheListingLab/blog/news/50-essential-marketing-presentation-templates-for-effortless-impact/?creative-portfolio-website-design-inspiration-modern))

## Navigation
- Top bar con los links al centro o a la derecha y un CTA oscuro en cápsula, igual que el nav actual. No hace falta cambiarlo. ([Metrium](https://dribbble.com/shots/19133524-Metrium-Landing-Page-UI), [Miros](https://www.temlis.com/templates/miros?utm_source=organic&utm_medium=pinterest))

## Core components
### Columnas de categoría
- Cada columna lleva un ícono en círculo arriba, el nombre y una flecha ↗ abajo. Al hacer hover, la columna crece. ([Metrium](https://dribbble.com/shots/19133524-Metrium-Landing-Page-UI))
### Banda de cifras
- El número va grande con la etiqueta de dos líneas al costado, sobre una banda oscura. ([Miros](https://www.temlis.com/templates/miros?utm_source=organic&utm_medium=pinterest))
### Pasos de proceso
- Una fila por paso: el número grande a la izquierda y el título con el texto a la derecha. ([Financial Match](https://www.theworldaccordingtome.org/2930470_ultimate-creative-web-ui-kits-twitch-stream-overlay-collection/?step-by-step-token-fintech-landing-pagebuilder-guide), [ContraBureau](https://www.lapa.ninja/post/contrabureau/))

### Índice de páginas
- Cada página va en una fila sobre hairlines: el título grande a la izquierda, la descripción al centro y una flecha ↗ a la derecha. ([Kus footer](https://www.footer.design/sites/kus), [ContraBureau](https://www.lapa.ninja/post/contrabureau/))
### Bloque editorial dividido
- El título grande va a la izquierda y el texto a la derecha, separados por una hairline superior. Sirve para los textos de detalle y para los bloques destacados. ([Portfolio templates](https://www.sitebuilderreport.com/graphic-design-portfolio-website-templates), [Merigrove](https://www.behance.net/nesoniadesign), (source: images/1115063189023185714.jpg))
### Cifras con dirección y cifras en puntos
- Junto a cada resultado va una flecha de tendencia (↓ -30%), como en un informe de impacto. (source: images/1115063189023234275.jpg)
- Un porcentaje se dibuja como una matriz de puntos (100 puntos, con la proporción llena) y "x de 10" como 10 puntos. (source: images/1115063189023266945.jpg, images/1115063189023236551.jpg, images/1115063189023236518.jpg)

## States
- La evidencia es escasa: los pins son estáticos. Solo se ve el estado activo de una columna (más ancha). ([Metrium](https://dribbble.com/shots/19133524-Metrium-Landing-Page-UI))
- Hay loaders (círculo, puntos, reloj), pero de UI de app, no de sitio web. (source: images/1115063189023241063.jpg)

## Motion & micro-interactions
- Sin confirmar, conviene revisar la fuente: la expansión de columnas al hacer hover se deduce del layout de Metrium, porque el pin es una imagen fija.
- La descripción del pin de PlayerZero menciona "testimonials, grid layouts" y no habla de movimiento.

## Data visualization
- Hay cifras con flechas de tendencia (↓ -30%), al estilo de un informe de impacto. (source: images/1115063189023234275.jpg)

## Open questions / gaps
- El board no tiene casi ninguna referencia de páginas de detalle (casos, artículos) ni de formularios de contacto.
- El color dominante (lima y naranja) choca con Elaniin. Solo se usó la estructura.

## Sources
- PlayerZero sample pages, Framer Gallery — https://app.notion.com/p/40-Mobility-Presentation-Templates-to-Streamline-Your-Professional-Projects-3a3136d2353f807c8367f4a5cd696e9e/?framer-gallery-playerzero — sin sección
- Metrium Landing Page UI — https://dribbble.com/shots/19133524-Metrium-Landing-Page-UI — sin sección
- Impact report (cifras) — images/1115063189023234275.jpg — sin sección
- Financial Match fintech landing — https://www.theworldaccordingtome.org/2930470_ultimate-creative-web-ui-kits-twitch-stream-overlay-collection/?step-by-step-token-fintech-landing-pagebuilder-guide — sin sección
- Miros SaaS template — https://www.temlis.com/templates/miros?utm_source=organic&utm_medium=pinterest — sin sección
- Ascend agency — images/1115063189023185408.jpg, images/1115063189023185415.jpg — sin sección
- Kus footer — https://www.footer.design/sites/kus — sin sección
- ContraBureau — https://www.lapa.ninja/post/contrabureau/ — sin sección
- Creative portfolio — https://payhip.com/TheListingLab/blog/news/50-essential-marketing-presentation-templates-for-effortless-impact/?creative-portfolio-website-design-inspiration-modern — sin sección
- Portfolio templates — https://www.sitebuilderreport.com/graphic-design-portfolio-website-templates — sin sección
- Merigrove studio — https://www.behance.net/nesoniadesign — sin sección
- Anteelo — images/1115063189023185714.jpg — sin sección
- Landing page (Artelly) — https://www.behance.net/gallery/239169197/Landing-page — sin sección
