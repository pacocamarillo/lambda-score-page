# LambdaScore — sitio público

Sitio Next.js (App Router) + **Sanity CMS**, desplegado en Vercel. Spec Driven Development en `specs/001-sitio-lambdascore/`.

## Desarrollo

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Sitio: `http://localhost:3000`
- Studio: `http://localhost:3000/studio` (necesita `NEXT_PUBLIC_SANITY_PROJECT_ID`)

Sin project id de Sanity, `lib/cms.ts` usa la semilla en `content/`.

### Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN` (opcional)
- `RESEND_API_KEY` / `QUOTE_TO_EMAIL`
- `PAYMENT_INSTRUCTIONS` (opcional, privado)

## Scripts

- `npm run dev` — local (Turbopack)
- `npm run build` — producción (webpack; requerido por Sanity Studio)
- `npm run start` / `npm run lint`

## Schemas Sanity

`post`, `event`, `rentalItem`, `resultSet`, `pageCopy`, `siteSettings` en `sanity/schemaTypes/`.

Verificación: `specs/001-sitio-lambdascore/quickstart.md`.
