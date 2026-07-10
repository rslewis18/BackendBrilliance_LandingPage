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

2. Add your live CTA links in `src/config/links.ts`:

   ```ts
   export const LINKS = {
     booking: "https://your-cal-link.example",
     revenueAudit: "https://your-typeform-link.example",
   };
   ```

3. Copy `.env.example` to `.env.local` and set the production site URL:

   ```env
   VITE_SITE_URL=https://backendbrilliance.com
   ```

4. Start the local development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

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
  - `VITE_SITE_URL`

SPA routing is handled by `public/_redirects`:

```txt
/* /index.html 200
```

Because the CTA links are configured in `src/config/links.ts`, commit and push
that file after updating the Cal.com and Typeform URLs.

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
