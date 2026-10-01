---
description: "Task list for the LambdaScore public site"
---

# Tasks: Sitio público LambdaScore

**Input**: Design documents from `/specs/001-sitio-lambdascore/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: No se generan tareas de prueba automatizada. La spec no las pide. La verificación es `quickstart.md`.

**Organization**: Tareas por historia de usuario para implementar y probar cada una por separado.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede correr en paralelo (archivos distintos, sin dependencias)
- **[Story]**: Historia a la que pertenece (US1–US7)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Proyecto Next.js vacío alineado al plan

- [x] T001 Crear la app Next.js con TypeScript y App Router en la raíz, según `specs/001-sitio-lambdascore/plan.md`
- [x] T002 Añadir Zod y el cliente de Resend, y crear `.env.example` con `RESEND_API_KEY` y `QUOTE_TO_EMAIL`
- [x] T003 [P] Declarar `lang="es-MX"` y la fuente base en `app/layout.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tipos, contenido base, chrome y SEO compartido. Ninguna historia empieza antes de cerrar esta fase.

- [x] T004 Definir los tipos de `specs/001-sitio-lambdascore/data-model.md` en `lib/content.ts`
- [x] T005 [P] Crear `content/site.ts` con navegación agrupada Organizadores/Atletas, teléfonos, correo, WhatsApp y redes según `content/copy.md`
- [x] T006 [P] Implementar `lib/seo.ts` según `specs/001-sitio-lambdascore/contracts/seo.md`
- [x] T007 Implementar `components/site-header.tsx` y `components/site-footer.tsx` (grupos de menú + CTA Quiero cotizar) y montarlos en `app/layout.tsx`
- [x] T008 Implementar `app/not-found.tsx` con el menú y el regreso al inicio
- [x] T009 Implementar `app/sitemap.ts` y `app/robots.ts` a partir de las rutas indexables
- [x] T010 Añadir JSON-LD `Organization` y `WebSite` en `app/layout.tsx`
- [x] T011 Configurar el proyecto de Vercel con preview por rama y las variables de `contracts/submissions.md`

**Checkpoint**: El layout, el menú, el pie, el 404 y el sitemap responden. Pueden empezar las historias.

---

## Phase 3: User Story 1 - Diferenciador y cotización (Priority: P1) 🎯 MVP

**Goal**: El organizador entiende el All-in-One en el primer viewport y envía una cotización en dos pasos.

**Independent Test**: Pasos 1–4 de `quickstart.md`.

- [x] T012 [P] [US1] Cargar servicios cotizables y textos de servicios desde `content/copy.md` en `content/services.ts`
- [x] T013 [P] [US1] Implementar en `app/page.tsx` el hero All-in-One (marca, promesa, apoyo, CTA, imagen full-bleed) y el bloque de tres pruebas; tipografía no sistema
- [x] T014 [US1] Implementar `app/servicios/page.tsx` con paquete integral primero, catálogo, FAQ del copy y JSON-LD `FAQPage`
- [x] T015 [US1] Implementar `components/quote-form.tsx` en dos pasos con `firstRace`, `eventType` y validación de FR-010/FR-011
- [x] T016 [US1] Implementar `app/quiero-cotizar/page.tsx` con el lead, la promesa de 24 horas y el formulario
- [x] T017 [US1] Implementar `lib/submissions.ts` y `app/api/cotizacion/route.ts` según `contracts/submissions.md` (marcar primera carrera en el correo)
- [x] T018 [US1] Mostrar la confirmación `noindex` sin reenviar al recargar, y conservar los datos cuando la API responde 400 o 502

**Checkpoint**: La historia 1 se demuestra sola. Este es el MVP.

---

## Phase 4: User Story 2 - Descubrimiento (Priority: P1)

**Goal**: Cada ruta indexable tiene ficha propia y entra al sitemap.

**Independent Test**: Revisar título, description, canonical, Open Graph y `lang` en `/`, y el contenido de `/sitemap.xml` y `/robots.txt`.

- [x] T019 [US2] Aplicar `generateMetadata` del helper a `/`, `/nosotros`, `/servicios` y `/quiero-cotizar`
- [x] T020 [US2] Fijar title y description del inicio a los textos All-in-One de `content/copy.md`
- [x] T021 [US2] Redirigir la variante con barra final a la URL canónica

**Checkpoint**: Las páginas del MVP cumplen SC-003 y SC-004. Las rutas que aún no existen se suman al mapa cuando se crean en fases posteriores.

---

## Phase 5: User Story 3 - Recorrido organizador / atleta (Priority: P1)

**Goal**: Menú agrupado, pie y Nosotros con la misión del copy.

**Independent Test**: Pasos 2 y 6 de `quickstart.md`.

- [x] T022 [US3] Marcar la sección activa y mostrar grupos Organizadores/Atletas en `components/site-header.tsx` (escritorio y móvil)
- [x] T023 [US3] Implementar `app/nosotros/page.tsx` con el copy canónico (sin «precisión quirúrgica» ni titular «S.A.S. certificada»)
- [x] T024 [US3] Enlazar teléfonos con `tel:`, el correo con `mailto:` y WhatsApp con `https://wa.me/522441442188` en `components/site-footer.tsx`

**Checkpoint**: Las tres historias P1 se recorren juntas.

---

## Phase 6: User Story 4 - Resultados (Priority: P2)

**Goal**: El atleta busca por nombre o dorsal, filtra, ve vueltas, imprime y descarga.

**Independent Test**: Paso 7 de `quickstart.md`.

- [x] T025 [P] [US4] Crear `content/results/` con un módulo por año y el tipo `ResultSet`
- [x] T026 [US4] Implementar `components/results-browser.tsx` con buscador por nombre/dorsal, año, distancia, filas y vueltas (solo el año activo)
- [x] T027 [US4] Implementar `app/resultados-eventos-lambdascore/page.tsx` con metadata y prioridad al evento más reciente
- [x] T028 [US4] Añadir la vista imprimible del certificado y la descarga de la distancia seleccionada

**Checkpoint**: Resultados funciona sin depender del formulario.

---

## Phase 7: User Story 5 - Eventos (Priority: P2)

**Goal**: El inicio y Eventos muestran solo fechas futuras y enlazan la inscripción externa.

**Independent Test**: Un evento pasado no aparece en el inicio. «Inscribirse» abre la URL externa.

- [x] T029 [P] [US5] Modelar eventos en `content/events.ts`, con estado derivado de la fecha
- [x] T030 [US5] Mostrar hasta tres próximos en `app/page.tsx` y el estado vacío cuando no hay futuros
- [x] T031 [US5] Implementar `app/events/page.tsx` y `app/event/[slug]/page.tsx`
- [x] T032 [US5] Implementar `components/event-card.tsx` con el enlace externo en pestaña nueva

**Checkpoint**: Inscripción externa verificada. Fitnech no se reimplementa.

---

## Phase 8: User Story 6 - Renta, Trifecta y blog (Priority: P2)

**Goal**: Precios, serial y artículos en las URLs ya indexadas.

**Independent Test**: Fichas de renta, ocho categorías de Trifecta, orden del blog y respuesta de `/922-2`.

- [x] T033 [P] [US6] Cargar conceptos y precios en `content/rental.ts`
- [x] T034 [P] [US6] Migrar los artículos vigentes a `content/posts/` con su slug de raíz
- [x] T035 [US6] Implementar `app/renta-de-equipo/page.tsx`, `app/renta-de-arco-meta-para-carreras/page.tsx` y la ficha de vallas, esta última con el servicio de vallas preseleccionado en el formulario
- [x] T036 [US6] Implementar `app/trifecta/page.tsx` con el ángulo «organizamos lo que cronometramos», categorías y flujo WhatsApp sin datos de cobro en el repo
- [x] T037 [US6] Implementar `app/blog/page.tsx` ordenado por fecha y `app/[slug]/page.tsx` con `BlogPosting`, `BreadcrumbList` y CTA final a cotizar
- [x] T038 [US6] Completar en `app/page.tsx` el bloque de terreno, últimas notas y `components/video-tabs.tsx` con los tres videos, debajo del diferenciador y eventos

**Checkpoint**: Las rutas de `contracts/routes.md` de esta historia responden.

---

## Phase 9: User Story 7 - Encuesta (Priority: P3)

**Goal**: El organizador envía las diez calificaciones y ve el agradecimiento una sola vez.

**Independent Test**: Paso 10 de `quickstart.md`.

- [x] T039 [US7] Implementar `app/encuesta-lambdascore/page.tsx` con las diez preguntas de FR-020 y la escala de cinco niveles
- [x] T040 [US7] Implementar `app/api/encuesta/route.ts` según `contracts/submissions.md`
- [x] T041 [US7] Confirmar con `noindex` y sin reenvío al recargar

**Checkpoint**: Las siete historias quedan demostrables por separado.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Cierre de URLs, peso, Sanity y el quickstart

- [x] T042 Completar `generateMetadata` en las rutas de US4–US7 y sumarlas a `app/sitemap.ts`
- [x] T043 [P] Servir imágenes de contenido con el componente de imagen de Next.js, tamaño reservado y texto alternativo
- [x] T044 Recorrer `specs/001-sitio-lambdascore/quickstart.md` en un preview de Vercel y anotar SC-001 a SC-008 (incluido el test informal del mensaje All-in-One)
- [x] T045 Integrar Sanity: schemas, Studio en `/studio`, `lib/cms.ts` con fallback a semilla local, variables en `.env.example`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sin dependencias.
- **Foundational (Phase 2)**: depende del Setup y bloquea todas las historias.
- **User Stories (Phase 3+)**: dependen de Foundational. US2 aplica metadata sobre páginas que US1 y US3 crean, así que va después de US1. US3 puede empezar en paralelo con US1 en cuanto existan el header y el footer.
- **Polish**: cuando las historias que se quieran publicar estén cerradas.

### User Story Dependencies

- **US1 (P1)**: después de Foundational. Sin dependencia de otras historias.
- **US2 (P1)**: después de US1 para cubrir las rutas del MVP. Cada fase posterior añade su propia metadata antes del cierre.
- **US3 (P1)**: después de Foundational. El header de T007 ya existe; T022 solo marca la sección activa.
- **US4 (P2)**: después de Foundational. Independiente de la cotización.
- **US5 (P2)**: después de Foundational. T030 edita `app/page.tsx`, el mismo archivo que T013, así que espera a que US1 suelte esa página.
- **US6 (P2)**: después de Foundational. T035 reutiliza `components/quote-form.tsx` de US1. T038 edita `app/page.tsx` después de US5.
- **US7 (P3)**: después de Foundational y de `lib/submissions.ts` (T017).

### Parallel Opportunities

- T003 en paralelo con T001–T002 una vez creado el proyecto.
- T005 y T006 en paralelo después de T004.
- T012 y T013 en paralelo.
- T025 y, en otro frente, T029.
- T033 y T034 en paralelo.
- US4 puede avanzar en paralelo con US3.

### Parallel Example: User Story 1

```text
T012 content/services.ts
T013 app/page.tsx
```

Después, en serie: T014, T015, T016, T017, T018.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Cerrar Phase 1 y Phase 2.
2. Cerrar Phase 3 y la metadata de Phase 4 sobre esas rutas.
3. Parar y recorrer los pasos 1 a 6 de `quickstart.md`.
4. Publicar el preview si la cotización llega al correo.

### Incremental Delivery

1. Setup + Foundational.
2. US1 + SEO del MVP.
3. US3 para completar la navegación P1.
4. US4, US5 y US6 en ese orden porque US5 y US6 tocan `app/page.tsx`.
5. US7 y el polish.

## Notes

- [P] significa archivos distintos, sin dependencia abierta.
- Cada historia se puede detener y comprobar con `quickstart.md`.
- No commitear `.env.local` ni datos de cobro.
