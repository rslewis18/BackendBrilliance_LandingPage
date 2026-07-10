# Backend Brilliance Website v1.0

A premium one-page foundation for Backend Brilliance, an AI-powered business
systems company.

Core message:

> We don't build websites. We build business systems.

The site is built with Vite, React, TypeScript, Tailwind CSS, React Router,
Framer Motion, and Lucide icons. It deploys cleanly to Cloudflare Pages.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add your live links:

   ```env
   VITE_BOOKING_LINK=https://your-cal-link.example
   VITE_REVENUE_AUDIT_LINK=https://your-audit-link.example
   VITE_SITE_URL=https://backendbrilliance.com
   ```

   If a link is empty at build time, the site falls back to the matching
   in-page placeholder section.

3. Start the local development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

The production build is written to `dist/`.

## Cloudflare Pages

Create a Cloudflare Pages project from the GitHub repository with these exact
settings:

- Framework preset: **Vite**
- Root directory: leave blank unless the repository is inside a subfolder
- Install command: `npm install`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables:
  - `NODE_VERSION=22`
  - `VITE_BOOKING_LINK`
  - `VITE_REVENUE_AUDIT_LINK`
  - `VITE_SITE_URL`

SPA routing is handled by `public/_redirects`:

```txt
/* /index.html 200
```

Because these are public build-time variables, trigger a new deployment after
changing them.

## SEO

Static SEO assets are generated in `public/`:

- `robots.txt`
- `sitemap.xml`
- Open Graph and Twitter Card tags in `index.html`
- Organization and ProfessionalService schema in `src/App.tsx`

Update `VITE_SITE_URL`, `public/sitemap.xml`, and the canonical URL in
`index.html` if the production domain changes.

## Page navigation

Primary section IDs:

- `#home`
- `#about`
- `#included`
- `#revenue-audit`
- `#how-it-works`
- `#benefits`
- `#testimonials`
- `#pricing`
- `#faq`
- `#booking`
- `#contact`
