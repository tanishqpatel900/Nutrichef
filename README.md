# YourBrand landing page

A dark, lime-on-black marketing page for a white-label AI nutrition product. It's built with Vite, React 18, TypeScript, Tailwind CSS v4 and GSAP ScrollTrigger.

```bash
npm install
npm run dev           # http://localhost:5173
npm run build         # type-check + production build into dist/
npm run placeholders  # regenerate the SVG placeholders in public/img
```

## Editing copy: `src/content.ts`

All brand-specific text, links and image references live in `src/content.ts`:

- `brand`: name, tagline, CTA label and href, legal line, nav links and meta/OG values. The `<title>`, description, Open Graph and Twitter tags in `index.html` are filled from this object at build time by a small plugin in `vite.config.ts`.
- `hero`, `features`, `steps`, `benefits`, `app`, `about`, `testimonials`, `cta`, `footer`, `modal`: one object per section.
- **Testimonials are sample content.** The names, businesses and quotes are fictional placeholders. Replace them with real, approved quotes before launch.
- Every CTA whose `href` equals `brand.ctaHref` (`#get-started`) opens the lead modal. Change `ctaHref` to an external URL and the buttons link there instead.

## Swapping in real images: `public/img/`

Every image is an SVG placeholder from `scripts/placeholders.mjs`. To swap one, drop in a file with the same name, or point `src/content.ts` at a new file. Keep each entry's `w`/`h` in line with the real aspect ratio so the browser can reserve space and avoid layout shift.

| File(s) | Used for | Aspect |
|---|---|---|
| `logo.svg`, `favicon.svg` | Nav/footer wordmark, tab icon | ~13:7 |
| `hero-card-1..7` | Fanned cards on the hero ring | 4:5 |
| `feature-1` / `feature-2` / `feature-3` | Pricing orbit centre icon / science photo / phone-in-hand | 1:1 / 3:2 / 5:6 |
| `steps-hero` | Full-bleed B/W portrait (a grayscale filter is applied) | 12:5 |
| `step-1..3` | Phone screenshots on the steps ring | 9:19 |
| `app-{light,dark}-{1..4}` | Theme x palette preview matrix (8 screens) | 9:19 |
| `cta-bg` | Final CTA background, also the OG image (use a 1200x630 PNG/JPG for production) | 2:1 |
| `footer-1..7` | Footer image strip | ~10:11 |
| `logo-1..3` | Testimonial flip-card fronts | 3:1 |

## Colors and design tokens

Colors are defined once as CSS custom properties in `:root` at the top of `src/index.css` (`--bg`, `--surface-card`, `--text`, `--accent` and so on). The `@theme inline` block maps them into Tailwind, so `bg-surface-card`, `text-accent`, `border-border` and similar utilities stay in sync. Change a token there and both the component CSS and the Tailwind utilities pick it up.

- **Root size is fluid:** 16px at 1440px wide, about 18px at 1920px and about 12.5px at 375px. Everything is sized in `rem`, so the whole layout scales with the viewport.
- **Breakpoints:** 992px (desktop), 768px and 480px. Below 992px the nav becomes a hamburger menu and the grids collapse to one column.
- **Section styles:** component-specific styles live next to each component (`src/components/*.css`) and are imported into the `components` layer of `index.css`.

## Motion

- **Hero:** the headline swaps from the setup line to the payoff word by word. The ring stage is then pinned for 3.5 viewport heights while it rotates -90deg and three statements fade in and out (`Hero.tsx`).
- **How it works:** pinned on desktop. The track rotates 40deg per step and the active step is highlighted (`Steps.tsx`).
- **Reveals:** `[data-appear]` elements fade up once at `top 85%` (`App.tsx`).
- **Reduced motion:** `prefers-reduced-motion` turns off pinning and rotation, shows a static fanned ring and keeps only opacity fades.

Forms have no backend yet. Search for `TODO` in `Modal.tsx` and `Footer.tsx` to wire them up.
