# Data Model: Sitio público LambdaScore

Los tipos de dominio viven en `lib/content.ts`. En producción los documentos viven en Sanity (`sanity/schemaTypes/`). `lib/cms.ts` los mapea a esos tipos. La semilla en `content/` es fallback de desarrollo.

## Sanity document types

| Tipo Sanity | Entidad de dominio | Notas |
| --- | --- | --- |
| `post` | Artículo | `slug.current` es la ruta de raíz |
| `event` | Evento | `startsAt` define próximo/pasado |
| `rentalItem` | Concepto de renta | `scenario` + `pagePath` |
| `resultSet` | ResultSet | Incluye `rows[]` y `laps[]` |
| `pageCopy` | Textos de marketing | Clave por página (`home`, `nosotros`, `servicios`, `cotizar`) |
| `siteSettings` | Config de sitio | Teléfonos, redes, WhatsApp (singleton) |

## Page

| Campo | Tipo | Regla |
| --- | --- | --- |
| path | string | Única. Canónica, sin barra final. |
| title | string | Obligatorio en rutas indexables. |
| description | string | Obligatoria en rutas indexables. |
| indexable | boolean | `false` solo en confirmaciones. |
| heading | string | Un solo `h1`. |

## Service

| Campo | Tipo | Regla |
| --- | --- | --- |
| id | string | Uno de: `asesoria`, `cronometraje`, `arco`, `vallas`, `marketing`. |
| name | string | Texto visible del formulario. |
| summary | string | Texto de la página de servicios. |
| quotable | boolean | Si aparece en el formulario. |

## RentalItem

| Campo | Tipo | Regla |
| --- | --- | --- |
| name | string | Concepto. |
| priceFrom | number | Pesos mexicanos. Omitido si el concepto no publica precio. |
| scenario | string | `meta` \| `flujo` \| `premiacion` \| `otro`. |
| pagePath | string | Ficha `/renta-de-arco-meta-para-carreras` o la ficha de vallas. |

## Event

| Campo | Tipo | Regla |
| --- | --- | --- |
| slug | string | Único. |
| name | string | |
| startsAt | date | Define próximo o pasado frente a la fecha de construcción de la página. |
| place | string | |
| image | string | Ruta local o URL absoluta, con texto alternativo. |
| registrationUrl | string | URL externa. Vacía si todavía no hay inscripción. |
| summary | string | |

Estado derivado: `upcoming` cuando `startsAt` es hoy o futuro. El inicio muestra como máximo tres `upcoming`, ordenados por fecha ascendente.

## ResultSet

| Campo | Tipo | Regla |
| --- | --- | --- |
| year | number | 2021–2026. |
| eventName | string | |
| eventDate | date | |
| distance | string | Por ejemplo `10K`. |
| rows | ResultRow[] | Ordenadas por lugar. |

## ResultRow

| Campo | Tipo | Regla |
| --- | --- | --- |
| place | number | |
| bib | string | |
| name | string | |
| time | string | Tiempo oficial mostrado. |
| gap | string | Vacío para el lugar 1. |
| laps | Lap[] | Vacío si la prueba no tiene vueltas. |

## Lap

| Campo | Tipo | Regla |
| --- | --- | --- |
| index | number | |
| time | string | |
| place | number | Lugar en la vuelta. |
| cumulativeTime | string | |
| cumulativePlace | number | |

## Post

| Campo | Tipo | Regla |
| --- | --- | --- |
| slug | string | Único. Vive en la raíz, no bajo `/blog`. |
| title | string | |
| publishedAt | date | El índice ordena descendente. |
| excerpt | string | |
| description | string | Ficha para buscadores. |
| image | string | Imagen destacada y Open Graph. |
| body | markdown | |

## QuoteRequest

| Campo | Tipo | Regla |
| --- | --- | --- |
| firstName | string | Obligatorio. Paso 1. |
| lastName | string | Paso 1. |
| phone | string | Obligatorio. Paso 1. |
| email | string | Obligatorio. Debe coincidir con `emailConfirm`. Paso 1. |
| emailConfirm | string | Obligatorio. Paso 1. |
| firstRace | boolean | Obligatorio elegir Sí/No. Paso 1. |
| eventType | string | Obligatorio. running \| mtb \| triathlon \| swim \| other. Paso 1. |
| services | ServiceId[] | Al menos uno. Paso 1. |
| street | string | Obligatorio. Paso 2. |
| city | string | Obligatorio. Paso 2. |
| state | string | Obligatorio. Paso 2. |
| postalCode | string | Obligatorio. Paso 2. |
| tentativeDate | date | Opcional. Paso 2. |
| estimatedParticipants | number | Opcional. Paso 2. |
| message | string | Opcional. Paso 2. |
| submittedAt | datetime | La asigna el servidor. |

## SurveyResponse

| Campo | Tipo | Regla |
| --- | --- | --- |
| organizer | string | Obligatorio. |
| eventName | string | Obligatorio. |
| eventDate | date | Obligatorio. |
| scores | 1–5 × 10 | Orden fijo de FR-020. 1 muy insatisfecho, 5 muy satisfecho. |
| comment | string | Opcional. |
| submittedAt | datetime | La asigna el servidor. |

## Relaciones

- `Event` no contiene resultados. `ResultSet.eventName` nombra la prueba publicada.
- `RentalItem.pagePath` apunta a una `Page`.
- `QuoteRequest.services` referencia `Service.id`. Incluye `firstRace` y `eventType` del paso 1.
- `Post` se lista en `/blog`, se resuelve en `/{slug}` y termina con CTA a cotizar.
