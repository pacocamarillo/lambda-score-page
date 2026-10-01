# Implementation Plan: Sitio público LambdaScore

**Branch**: `001-sitio-lambdascore` | **Date**: 2026-10-01 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-sitio-lambdascore/spec.md`

## Summary

Sitio público de LambdaScore posicionado como socio All-in-One de producción de carreras (meta, chip, kit e inscripción) para organizadores del centro de México. Conserva las URLs indexadas de lambdascore.com.mx. Next.js App Router en Vercel. Contenido editorial en **Sanity**. Copy canónico de posicionamiento en `content/copy.md` (semilla / contrato de producto). Cotizaciones y encuestas por correo como registro de la v1.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 15 (App Router), React 19

**Primary Dependencies**: Next.js, Sanity (`next-sanity`, Sanity Studio embebido), Metadata API nativa, Zod, Resend

**Storage**: Sanity Content Lake para eventos, artículos, renta, resultados y textos de páginas de marketing. Envíos de cotización y encuesta: correo a `contacto@lambdascore.com.mx` vía Resend (v1).

**Testing**: Verificación manual de los escenarios de aceptación en `quickstart.md`. Sin suite automatizada en esta entrega; la spec no la pide.

**Target Platform**: Vercel, Node.js runtime de las Route Handlers. Navegadores actuales de escritorio y móvil. Studio en `/studio`.

**Project Type**: Sitio web (Next.js a un solo proyecto) + Sanity Studio embebido

**Performance Goals**: LCP menor a 2.5 s en móvil de referencia para las ocho secciones del menú (SC-002)

**Constraints**: `es-MX`. Dominio canónico `https://lambdascore.com.mx`. Secretos solo en variables de Vercel (`SANITY_API_READ_TOKEN`, `RESEND_API_KEY`, etc.). URLs indexadas estables. Un `h1` por página.

**Scale/Scope**: Un sitio de marketing. Alrededor de 15 rutas fijas, menos de 20 artículos y resultados históricos de 2021 a 2026 cargados por año desde Sanity.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Resultado |
| --- | --- |
| I. Spec before code | Cumple. Este plan deriva de `spec.md` y no añade historias. |
| II. Stack fijo | Cumple. Next.js App Router, Sanity, Metadata API, `sitemap.ts`, `robots.ts`, JSON-LD y Vercel. |
| III. Español y URLs estables | Cumple. `lang="es-MX"`. Slugs actuales en `contracts/routes.md`. Barra final redirige con 308. |
| IV. Secretos fuera del repo | Cumple. Tokens de Sanity, Resend, destinatario y datos de cobro son variables de entorno. |
| V. Menor superficie | Cumple. Fitnech y el cronometraje quedan como enlaces. Edición en Sanity, sin CMS paralelo. |
| VI. Differentiator first | Cumple. Hero All-in-One, copy canónico, hero full-bleed sin tarjetas. |

Revisión posterior al diseño: sin violaciones. Complexity Tracking queda vacío.

## Project Structure

### Documentation (this feature)

```text
specs/001-sitio-lambdascore/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── content/
│   └── copy.md
├── contracts/
│   ├── routes.md
│   ├── seo.md
│   └── submissions.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── studio/[[...tool]]/page.tsx   # Sanity Studio embebido
├── layout.tsx
├── page.tsx
├── ...
└── api/
    ├── cotizacion/route.ts
    └── encuesta/route.ts

sanity/
├── schemaTypes/
│   ├── post.ts
│   ├── event.ts
│   ├── rentalItem.ts
│   ├── resultSet.ts
│   ├── pageCopy.ts
│   └── index.ts
├── lib/
│   ├── client.ts
│   ├── image.ts
│   └── queries.ts
└── env.ts

content/                 # Semilla / fallback local si faltan credenciales
├── site.ts
├── services.ts
├── rental.ts
├── events.ts
├── posts/
└── results/

lib/
├── seo.ts
├── content.ts
├── cms.ts               # Adaptador Sanity → tipos de dominio (+ fallback)
└── submissions.ts
```

**Structure Decision**: Un solo proyecto Next.js con Sanity Studio en `/studio`. El adaptador `lib/cms.ts` lee de Sanity cuando hay `NEXT_PUBLIC_SANITY_PROJECT_ID`; si no, usa la semilla en `content/` para desarrollo. Los artículos conservan slug en la raíz vía `app/[slug]/page.tsx`.

## Complexity Tracking

> Sin violaciones de la constitución. Sanity es el CMS fijado por el interesado (principio II).
