# Research: Sitio público LambdaScore

## Decision: Posicionamiento All-in-One

**Decision**: El mensaje central es «Una sola empresa. Meta, chip, kit e inscripción.» El sitio habla primero a organizadores. Trifecta y el chip sin devolución son pruebas, no el titular.

**Rationale**: Cronocom, TodoTiempo y ChronoSport compiten en precisión y marca de hardware. LambdaScore gana cuando el organizador necesita un socio de producción (infraestructura propia + kits + inscripción) y cuando la carrera es chica o en terreno difícil. El copy genérico anterior («tu mejor carrera empieza con nosotros») no diferenciaba.

**Alternatives considered**: Posicionarse solo como timing RFID (empata con la categoría y pierde). Posicionarse solo como organizador de Trifecta (limita la captación B2B).

## Decision: Copy canónico en `content/copy.md`

**Decision**: Titulares, leads, FAQ y microcopy de inicio, Nosotros, Servicios y cotización viven en `specs/001-sitio-lambdascore/content/copy.md` como contrato de producto. En producción se editan vía documentos Sanity (`pageCopy` / settings) sembrados desde ese copy.

**Rationale**: Evita que la migración WordPress vuelva a colar eslóganes genéricos. El copy canónico sigue siendo la fuente de verdad de posicionamiento; Sanity es el canal de edición.

**Alternatives considered**: Reusar el HTML de WordPress tal cual (conserva SEO de cuerpo largo pero pierde el diferenciador).

## Decision: Sanity como CMS

**Decision**: Eventos, artículos, conceptos de renta, resultados y textos de páginas de marketing se gestionan en Sanity. Studio embebido en `/studio`. Next.js consume con `next-sanity` (GROQ). Hay semilla local en `content/` solo como fallback de desarrollo y migración inicial.

**Rationale**: El interesado requiere CMS. Sanity encaja con App Router + Vercel, permite editar sin redespliegue y conserva tipado vía schemas. Cumple FR-023 (editar sin tocar layout).

**Alternatives considered**: Contenido solo en git (descartado: el editor no es el desarrollador). WordPress headless (es el origen que se reemplaza). Contentful/Strapi (posible, pero Sanity es el stack elegido).

## Decision: Correo como registro de envíos

**Decision**: `POST /api/cotizacion` y `POST /api/encuesta` validan con Zod y envían el contenido a `contacto@lambdascore.com.mx` mediante Resend. El mensaje enviado es el registro de la v1.

**Rationale**: FR-021 pide que la solicitud quede registrada y que el equipo pueda consultarla. El buzón ya es el canal de contacto publicado. Evita una base de datos para dos formularios de bajo volumen.

**Alternatives considered**: Guardar filas en una base (cumple igual y añade operación que la constitución no exige en la v1). Escribir archivos en el servidor (Vercel no tiene disco durable).

## Decision: Resultados partidos por año

**Decision**: En Sanity, cada `resultSet` lleva año, evento, distancia y filas. La página pide solo el año activo (GROQ filtrado). El año por defecto es el más reciente con datos.

**Rationale**: El sitio actual incrusta todo el historial en un HTML de cientos de kilobytes. Partirlo cumple el escenario de no descargar todos los años a la vez y mantiene SC-002.

**Alternatives considered**: Una sola página estática con el HTML migrado (conserva el defecto de peso). Una API externa de resultados (no existe y queda fuera de alcance).

## Decision: SEO con la Metadata API

**Decision**: `generateMetadata` por ruta, helper `lib/seo.ts` para canonical, Open Graph e idioma `es-MX`. `app/sitemap.ts` y `app/robots.ts`. JSON-LD como script en el layout (Organization, WebSite) y en Servicios (FAQPage) y artículos (BlogPosting, BreadcrumbList).

**Rationale**: Es el mecanismo nativo del App Router. La constitución fija este camino y excluye una librería paralela de SEO.

**Alternatives considered**: Paquete `next-seo` (duplica la Metadata API en el App Router).

## Decision: Artículos en la raíz

**Decision**: El índice vive en `/blog`. Cada artículo conserva el slug de la raíz mediante `app/[slug]/page.tsx`, alimentado por la lista de `content/posts`. Las rutas con nombre fijo no pasan por ese segmento.

**Rationale**: FR-019 exige conservar `/922-2/` y `/resultados_cronoescalda_2026/`. Moverlos a `/blog/[slug]` rompería las URLs indexadas.

**Alternatives considered**: Redirecciones 308 hacia `/blog/[slug]` (cambian la URL canónica que ya posiciona).
