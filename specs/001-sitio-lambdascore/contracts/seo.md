# SEO: Sitio público LambdaScore

Cada ruta indexable de `routes.md` MUST emitir, vía Metadata API, los textos de `content/copy.md` cuando existan:

| Campo | Regla |
| --- | --- |
| `title` | Propio. Inicio: «LambdaScore \| Meta, chip, kit e inscripción para tu carrera». |
| `description` | Propia. Inicio: menciona All-in-One (RFID, arcos, vallas, kits, inscripción), zona de servicio y respuesta en 24 horas. |
| `alternates.canonical` | URL absoluta en `https://lambdascore.com.mx` más el path canónico. |
| `openGraph` | `title`, `description`, `url`, `siteName` «Lambdascore», `locale` `es_MX`, `type` `website` (o `article` en un post) e `images`. |
| `robots` | `index, follow` en rutas indexables. `noindex` en el estado de confirmación. |

`app/sitemap.ts` MUST listar solo rutas con `indexable: true`, incluida cada URL de artículo.

`app/robots.ts` MUST permitir el rastreo del sitio y MUST señalar el sitemap absoluto.

JSON-LD:

| Página | `@type` |
| --- | --- |
| Layout | `Organization` y `WebSite` |
| `/servicios` | `FAQPage` |
| `/{postSlug}` | `BlogPosting` y `BreadcrumbList` |

`Organization` incluye nombre, URL, logotipo, teléfono y correo. Hay un solo elemento `h1` por página. `html` declara `lang="es-MX"`.
