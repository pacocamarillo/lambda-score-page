# Quickstart: Sitio público LambdaScore

## Arranque

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Variables

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Proyecto Sanity. Sin esto, el sitio usa la semilla local en `content/`. |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (default `production`). |
| `SANITY_API_READ_TOKEN` | Token de lectura (drafts / privado). Opcional en CDN público. |
| `RESEND_API_KEY` | Cotizaciones y encuestas. |
| `QUOTE_TO_EMAIL` | Destino del correo. |

Sin `RESEND_API_KEY`, los formularios responden 502 y conservan los datos.

Abrir `http://localhost:3000`. Studio: `http://localhost:3000/studio` (requiere project id).

### Crear proyecto Sanity (una vez)

1. En [sanity.io/manage](https://www.sanity.io/manage) crea un proyecto.
2. Copia el project id a `.env.local`.
3. Abre `/studio`, inicia sesión y crea documentos (`post`, `event`, `rentalItem`, `resultSet`, `pageCopy`).
4. La semilla en `content/` sirve hasta migrar; `lib/cms.ts` hace fallback automático.

## Comprobar el MVP (historias P1)

1. En `/`, el primer viewport muestra solo LambdaScore, la promesa «Una sola empresa. Meta, chip, kit e inscripción.», una frase de apoyo y «Cotiza tu evento». No hay disciplinas ni eventos en ese viewport. Hay un solo `h1`.
2. Debajo del hero aparecen las tres pruebas. El menú agrupa Organizadores y Atletas; la etiqueta es «Quiero cotizar».
3. `/servicios` abre con el paquete integral y después el catálogo y las FAQ del copy.
4. En `/quiero-cotizar`, el formulario tiene dos pasos. Correos distintos no salen. Un envío completo llega al correo y muestra la confirmación de 24 horas.
5. Ver el HTML de `/`: title All-in-One, description, canonical, Open Graph e `lang="es-MX"`. `/sitemap.xml` y `/robots.txt` correctos.
6. `/nosotros` usa el `h1` «Eliminamos el caos logístico de tu carrera.» y no titula con «S.A.S. certificada».

## Comprobar el resto

7. Resultados: buscador por nombre/dorsal; cambio de año; vueltas; certificado; descarga.
8. Evento pasado fuera del inicio. «Inscribirse» abre URL externa.
9. Renta con precios «desde». Trifecta sin datos bancarios. Blog ordenado; `/922-2` abre; CTA a cotizar al final.
10. Encuesta: diez respuestas, agradecimiento, sin reenvío al recargar.
11. Con Sanity configurado: crear un `post` en `/studio` y verlo en `/blog` tras publicar.

## Preview

Cada push a una rama abre un deployment de Vercel. Configura las variables de Sanity y Resend en el proyecto. Producción: `lambdascore.com.mx`.
