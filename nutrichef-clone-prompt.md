# Claude Code prompt: build a pixel-faithful dark "lime on black" SaaS landing page

> Paste everything below this line into Claude Code (run it in an empty folder).
> Every number in this spec was measured from the live reference page's computed styles at 1440px and ~611px wide. Items marked **(inferred)** could not be measured and are best-effort.

---

## ROLE AND GOAL

You are a senior front-end engineer. Build a single-page, fully responsive marketing site that reproduces the design system, layout, spacing, typography, colors and scroll motion described below. The product is a white-label AI nutrition tool sold to gyms, so the page structure is: sticky nav, scroll-driven hero, features bento, 3-step scroll section, benefits grid, brand/theme preview, about, flip-card testimonials, final CTA, footer, and a lead-capture modal.

**Do not use or hotlink any images, logo, brand name, or testimonial text from the reference site.** Everything brand-specific comes from `src/content.ts` (placeholders provided by you) and `public/img/*` (generate neutral SVG/gradient placeholders; I will swap in real assets later). Reproduce the *design system and behavior*, not another company's identity or fabricated quotes.

## 0. BRAND CONFIG (single source of truth, edit freely)

Create `src/content.ts` exporting one object. Use these placeholder values and write original marketing copy in the same *shape and length* as described per section:

```ts
export const brand = {
  name: "YourBrand",              // used in logo alt, footer, meta
  tagline: "Short one-line footer pitch",
  ctaLabel: "Get Started",
  ctaHref: "#get-started",        // opens the modal in section 11
  companyLegal: "© YourCompany Inc.",
  nav: [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#hiw" },
    { label: "Benefits", href: "#benefits" },
    { label: "Company", href: "#about" },
    { label: "Reviews", href: "#case-studies" },
  ],
};
```

## 1. STACK AND SETUP

- Vite + React 18 + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), GSAP + ScrollTrigger for scroll motion (`npm i gsap`).
- Font: **Spline Sans** variable, weights 300-700, loaded from Google Fonts (`family=Spline+Sans:wght@300..700`), `font-display: swap`. Fallback `Arial, sans-serif`.
- All sizes in **rem** (see section 3: the root font-size is fluid, so everything scales with the viewport). No px except 1px borders and media queries.
- Folder layout: `src/components/{Nav,Hero,Features,Steps,Benefits,AppPreview,About,Testimonials,Cta,Footer,Modal,Button,Eyebrow}.tsx`, `src/content.ts`, `src/index.css`, `public/img/`.
- Smooth anchor scrolling (`scroll-behavior: smooth`), `scroll-margin-top: 4.5rem` on every section id.

## 2. COLOR INDEX (design tokens)

Define as CSS variables in `:root` and map into Tailwind `@theme`. Page background is near-black, never pure `#000`.

| Token | Value | Where it is used |
|---|---|---|
| `--bg` | `#010101` | Page background, text color on lime buttons, vignette fades |
| `--surface-input` | `#111111` | Form inputs |
| `--surface-card` | `#171717` | **All cards** (features, benefits, about, testimonials) |
| `--surface-btn` | `#1A1A1A` | Secondary (dark) button |
| `--surface-raised` | `#232323` | Icon wells, chips, nested elements inside cards |
| `--surface-raised-2` | `#252525` | Hover state of raised surfaces **(usage inferred; the value exists on the page)** |
| `--text` | `#BBBFB7` | Body copy, nav links (default), most text (warm grey with a green cast) |
| `--accent` | `#D3FF62` | **Every heading**, primary button fill, secondary-button text, active ring, links |
| `--accent-50` | `rgba(211,255,98,.5)` | Section eyebrow labels |
| `--accent-30` | `rgba(211,255,98,.3)` | Dial tick marks, subtle accents |
| `--white` | `#FFFFFF` | Footer links, form input text, key UI text inside app mockups |
| `--border` | `rgba(255,255,255,.1)` | Secondary button border, input border, card hairlines |
| `--border-accent` | `rgba(239,255,99,.1)` | Faint lime hairlines on decorative rings |
| `--border-strong` | `rgba(255,255,255,.2)` | Hover state of borders |
| `--theme-green` | `#328810` | "THEME" eyebrow label in the brand-preview section |
| `--error-bg` | `#FFDEDE` | Form error banner background (text `#010101`) |

**Theme swatches** (two-tone circles in the brand-preview section), each is `linear-gradient(90deg, A 50%, B 50%)`:

1. `#D3FF62` / `#218198` (lime + teal)
2. `#3B9C58` / `#FD5225` (green + orange-red)
3. `#758DC1` / `#9636CD` (periwinkle + purple)
4. `#FFE9E3` / `#F9455D` (blush + coral)

**Gradients and shadows (exact):**

- Vignette: `radial-gradient(circle closest-side, #000, rgba(0,0,0,0))`, used to fade the edges of the hero ring and image tracks.
- Soft glow: `radial-gradient(circle closest-side, rgba(255,255,255,.1), rgba(0,0,0,0))`.
- Vertical edge fade (wrap full-bleed images with it): `linear-gradient(#010101, rgba(1,1,1,0) 40%, rgba(1,1,1,0) 60%, #010101)`.
- Hard half masks (used by the headline text reveal): `linear-gradient(90deg, #010101 50%, transparent 50%)` and its mirror.
- Card-on-dark shadow: `0 0 1.25rem 0 rgba(0,0,0,.6)`; floating UI shadow: `0 .25rem 1.25rem 0 rgba(0,0,0,.35)`.
- Active swatch ring: `inset 0 0 0 2px #D3FF62` (inactive: `inset 0 0 0 2px transparent`).

## 3. TYPOGRAPHY AND FLUID ROOT SIZE

**Fluid root font-size (copy exactly):**

```css
html { font-size: calc(0.625rem + 0.416667vw); }                       /* >1440px: 18px at 1920 */
@media (max-width: 1920px) { html { font-size: calc(0.625rem + 0.416667vw); } }
@media (max-width: 1440px) { html { font-size: calc(0.812695rem + 0.208117vw); } } /* 16px at 1440 */
@media (max-width: 479px)  { html { font-size: calc(-0.00209205rem + 3.34728vw); } } /* ~12.5px at 375 */
body { background: var(--bg); color: var(--text); font-family: "Spline Sans", Arial, sans-serif;
       font-size: .875rem; line-height: 1.5; -webkit-font-smoothing: antialiased; }
```

**Type scale** (desktop value = measured at 1440px where 1rem = 16px). All headings: color `--accent`, `letter-spacing: -0.0209em`, no text-transform.

| Style | rem | px @1440 | line-height | weight | Notes |
|---|---|---|---|---|---|
| Hero H1 / CTA H1 | 4 | 64 | 1.2 | 300 | Tablet/mobile: 3rem |
| H2 (steps title) | 3.75 | 60 | 1.1 | 300 | Tablet/mobile: 2.5rem |
| H3 (feature card titles, section titles) | 2.5 | 40 | 1.1 | 300 | Tablet/mobile ~1.75-2rem **(inferred)** |
| H3 "about" statement | 2.5 | 40 | 1.4 | 300 | Tablet/mobile: 1.75rem, line-height 1.4 |
| H4 (step titles) | 1.75 | 28 | 1.1 | 400 | letter-spacing -0.0208em |
| Subhead "sh1" (about item titles, footer tagline) | 1.125 | 18 | 1.2 | 400 | color accent |
| Lead paragraph | 1.125 | 18 | 1.5 | 400 | color `--text`, max-width 32rem |
| Body | 0.875 | 14 | 1.5 | 400 | color `--text` |
| Eyebrow | 0.875 | 14 | 1.1 | 600 | UPPERCASE, `letter-spacing: .309em`, color `--accent-50` |
| Eyebrow (app/theme variant) | 0.875 | 14 | 1.1 | 600 | UPPERCASE, `letter-spacing: .15em`, color `--theme-green` |
| Button label (default) | 0.875-1 | 14-16 | 1 | 500 | |
| Button label (hero, large) | 1.25 | 20 | 1 | 600 | |
| Footer link | 0.875 | 14 | 1.5 | 500 | color white |
| Mobile-menu link | 1.5 | 24 | 1.5 | 500 | color `--text` |

## 4. LAYOUT SYSTEM

- Containers (centered, `margin-inline: auto`): **large = 80rem (1280px at 1440)**, medium = 50rem (800px), `max-width-medium` text blocks = 32rem (512px), small = 16rem (256px). Global side padding `2.5rem` (40px) on desktop, `1.5rem` (24px) on mobile.
- Section vertical padding "large": `8rem` top and bottom on desktop; `4rem` on tablet/mobile (use `6rem` bottom on mobile for Features). Hero top padding `3rem`. App-preview section bottom padding `10rem`. Footer "small" section padding `3rem`.
- Breakpoints: `991px` (tablet), `767px`, `479px`. Below 991px every multi-column grid collapses to one column and the desktop nav is replaced by a hamburger menu.
- Radii: `0.75rem` (secondary button, inputs), `0.875rem` (primary button), `1rem` (all cards), `9999px` (swatches).
- Borders are 1px hairlines only. No other shadows than listed in section 2.

## 5. COMPONENTS

**Primary button (solid lime):** `bg #D3FF62`, text `#010101`, radius `0.875rem`, padding `0.875rem 1rem`, weight 500, `transition: background-color .2s`. Trailing icon: a small arrow-right inside a dark `#010101` circle (about 1.25rem) with a lime arrow. Hover: slightly lighter lime (choose `#E2FF92`). **Hero large variant:** font `1.25rem` weight 600, taller padding (box about 143x46px at 1440).

**Secondary button (dark):** `bg #1A1A1A`, text `#D3FF62`, `1px solid rgba(255,255,255,.1)`, radius `0.75rem`, padding `0.625rem 0.875rem`, font `0.875rem` weight 500, same arrow-in-circle icon. Hover: border `rgba(255,255,255,.2)`. Used in nav, footer and the mobile menu (mobile-menu size: font `1.25rem`, radius `0.875rem`, padding `0.875rem 1rem`).

**Card:** `bg #171717`, radius `1rem`, `overflow: hidden`, no border. Padding `2rem` for benefit cards, `1rem` for about cards, 0 for feature cards (their text block has its own `2rem` padding).

**Eyebrow:** small uppercase label above each section title (see type scale).

**Input / select / textarea:** `bg #111111`, `1px solid rgba(255,255,255,.1)`, radius `0.75rem`, height `3rem`, padding `0.5rem 1rem`, text white `0.875rem`, placeholder `--text` at 60%. Focus: border `#D3FF62`, no glow.

**Swatch (theme picker):** circle, `border-radius: 9999px`, two-tone gradient from section 2, active ring `inset 0 0 0 2px #D3FF62`.

## 6. PAGE SECTIONS, TOP TO BOTTOM (desktop at 1440 unless noted)

### 6.1 Navbar (`position: sticky; top: 0`, height `4.5rem`, transparent over black)
Inner wrapper padding `0 2.5rem`; inside, a container of max-width 80rem as a 3-column grid `1fr auto 1fr` with `1rem` gap: logo (SVG wordmark about 5.2rem x 2.8rem, left), the 5 nav links centered (`0.875rem`, weight 500, color `--text`, white on hover), and the dark secondary "Get Started" button right-aligned. Below 991px: logo left, hamburger (three 1px-ish lime/white lines) right; tapping opens a full-screen black menu with links at `1.5rem` and a large dark button. **(menu animation inferred: fade + slight translateY)**

### 6.2 Hero (id `hero`, total section height about 4080px = a scroll-pinned sequence)
- Top block, centered, max-width `61.25rem`, flex column, gap `2rem`: an H1 (4rem lime, weight 300) built from 4 stacked reveal layers. It reads as a two-beat headline: first a "setup" line ("Most X focus on Y") that, as the user scrolls or after a short delay, is replaced word-by-word by the "payoff" line ("The smart ones profit from Z"). Implement each word as an overflow-hidden mask with the word sliding up (`translateY(100%) -> 0`), using the half-mask gradients from section 2 as the reveal edge. **(exact timing inferred: 0.6s ease-out, 0.08s stagger)**
- Under it a lead paragraph (max-width 32rem, centered, 1.125rem) and the large primary button.
- Below (starts about y=520px): a **huge ring stage**, a circle about 162rem wide (2602px at 1440), horizontally centered so only its top arc is visible, `overflow: hidden` on the section. On the arc sit **7 portrait photo cards** (about 11rem x 14rem, radius `0.75rem`, shadow `0 0 1.25rem rgba(0,0,0,.6)`), fanned like a hand of cards: each rotated progressively along the circle (center card upright and slightly raised, outer cards tilted about +/-15 to 25 degrees). Around the arc draw a **dial of thin radial tick marks** in `--accent-30` (about 1px x 1rem, evenly spaced), with the vignette radial gradient fading the far ends. The ring also carries **8 feature labels** (see content below) as small pill/text items that travel around the ring.
- **Scroll behavior (GSAP ScrollTrigger, `scrub: true`)**: pin the stage for about 3.5 viewport heights. Scroll progress rotates the whole ring (about -90 degrees total **(inferred)**) so cards and labels sweep across. Between rotations, three centered statements fade in and out one at a time (opacity 0 -> 1 -> 0 with 1.5rem vertical drift), each 2.5rem-3rem lime weight 300: (1) a bold-claim line, (2) a "our AI creates personalized plans..." line, (3) a "you handle X, we handle Y" line, the last one followed by the primary button and a small "Scroll to learn more" caption (`0.875rem`, `--text`) with a tiny bouncing chevron.
- The 8 ring labels (write your own wording): client profiles, AI personalization, goal-based plans, guided recipes, macro tracking, wearable integration, grocery lists, gamified engagement.

### 6.3 Features (id `features`, padding `8rem 0`)
Container 80rem, **2-column grid, gap `1.5rem`**, three cards:
- **Left column, two stacked cards** (each about 609px tall at 1440): (a) *pricing card*: top half is an orbital graphic (concentric green rings, dark-green UI chips with small labels, a dark circular "cloud/icon" center), bottom half text block; (b) *science/AI card*: top half shows a photo with small green notification chips floating over it, bottom half text block.
- **Right column, one tall card spanning both rows** (about 1226px tall): text block on top, then a **phone mockup** held in a hand, cropped by the bottom edge of the card.
- Text block inside every card: eyebrow "FEATURES", H3 (2.5rem, lime), body paragraph 0.875rem `--text` (max-width 32rem for the first card). Chips/notifications use `--surface-raised` or deep green `#1F5A12` fills with white text **(green chip color inferred)**.
- On scroll each card fades up (`ix-appear-up`): `translateY(2rem) + opacity 0 -> 0 + 1`, 0.6s, 0.1s stagger.

### 6.4 How it works (id `hiw`, section height about 2544px)
- Opens with a **full-bleed black-and-white portrait image** with the vertical edge fade gradient on top and bottom so it melts into the page.
- Centered H2 (3.75rem lime): "Join the revolution in 3 simple steps"-style title.
- Layout: flex column, gap `4rem`, then a **2-column grid** (`1fr 1fr`, gap `1rem`): the **left column** holds a giant rotating circular image track (a ring about 118rem wide, mostly off-screen to the left, with app screenshots placed around it that rotate as the user scrolls through the 3 steps); the **right column** holds 3 step blocks (max-width 31rem each, flex column, gap `2rem`): a number 1/2/3, an H4 (1.75rem, weight 400, max-width 16rem), and a body paragraph. Measured text-align on the step block is `right` **(verify visually, set to left if it looks wrong)**.
- Scroll: pin the section; as each step becomes active it goes full opacity while the others dim to 40%, and the ring rotates one third of its travel per step.
- Mobile: single column; ring replaced by the step's image above its text.

### 6.5 Benefits (id `benefits`, padding-top `8rem`)
Container 75rem on a **6-column grid** (`repeat(6, 1fr)`, gap `1.5rem`) with **4 cards, each spanning 3 columns** (2x2), each about 588x280px: padding `2rem`, flex column gap `1rem`; eyebrow "BENEFITS", a title (about 1.75rem, lime, weight 400) and a body paragraph (`0.875rem`). Card topics: become the one-stop hub, upsell/revenue, engagement outside the gym, retention and lifetime value. Appear-up on scroll with stagger. Mobile: single column, padding `1.5rem`.

### 6.6 Brand / theme preview (id `app`, padding `8rem 0 10rem`)
- Centered heading block max-width 26rem, flex column, gap `2rem`, centered: H3 ("See your brand in action"-style), a one-line paragraph, a primary button, and a tiny footnote (`0.75rem`, `--text`) saying the preview is not the full range of customization.
- Below: a 3-part row centered on a **phone-sized app screenshot** (about 25rem wide x 35rem tall): left vertical menu (7rem wide, gap `1.25rem`) labeled **THEME** (accent-green eyebrow) with two round chips (light / dark); right vertical menu labeled **SAMPLE PALETTES** with the 4 two-tone swatches. Menus are `flex-direction: column`, 560px tall at 1440.
- Behavior: a 2 (theme) x 4 (palette) matrix = **8 screenshots**. Clicking a chip or swatch cross-fades (0.3s) to the matching image; active swatch shows the lime inset ring. Default: dark + palette 1. Build as two ARIA tablists (`role="tab"`, arrow-key navigation).

### 6.7 About (id `about`, padding `8rem 0`)
- Eyebrow "ABOUT {BRAND}", then one large statement as **H3 at 2.5rem, line-height 1.4** (3-4 lines, max-width about 62rem).
- Below: a **flex row, wrap, gap `1rem`** of **5 cards** (each max-width 25rem, height about 9rem, padding `1rem`, gap `1rem`, radius `1rem`): a small circular icon or image on the left, and on the right an sh1 title (1.125rem lime) over a short body paragraph. Cards wrap to 2 rows on desktop. Topics: past track record, platform partnership, AI foundation, culinary/recipe data, expert-reviewed plans.

### 6.8 Testimonials (id `case-studies`, padding `8rem 0`)
Eyebrow "CLIENT TESTIMONIALS", H2/H3 title, one line subtext. Then a **3-column grid (each about 26rem, gap `1rem`, card height about 18rem)** of **flip cards** (`perspective: 1000px`): front shows a centered client logo on `--surface-card`; back shows quote text (`0.875rem`) with the name/role below in lime. Flip is `rotateY(180deg)` over `0.6s`, on hover on desktop and on tap on touch. **Use clearly fictional placeholder names and quotes, marked as sample content in a code comment.** Appear-up with stagger.

### 6.9 Final CTA (`section_cta`, padding `8rem 0`)
Centered container 50rem, flex column, gap `2rem`, text centered: H1 (4rem lime, weight 300, 2-3 lines), a short paragraph, and the primary button. A faded background photo sits behind it (use the vertical edge fade + vignette). The CTA/footer wrapper has `0 1.5rem` side padding.

### 6.10 Footer (`padding-section-small`, top border none)
- Top: 2-column grid (`1fr auto`, gap `1rem`). **Left column** (max-width 31rem, flex column, gap `2rem`): logo, tagline in sh1 style (1.125rem lime), the dark "Get Started" button, then a **newsletter form** (grid `1fr auto`, gap `0.5rem`, input height `3rem`, small dark submit button) with inline success ("Check your inbox") and error states (`--error-bg` banner). **Right column**: two link columns (flex column, gap `1rem`, link style: 0.875rem, weight 500, white): "About" (Features, Benefits, How it Works, Company) and "Learn More" (Reviews + 2 external links).
- Middle: a decorative **strip of 7 square-ish images** (equal widths, gap `0.5rem`, radius `0.75rem`).
- Bottom row: copyright left; credit link and Terms / Privacy links right (0.75rem, `--text`).

### 6.11 Lead modal (id `get-started`, opened by every "Get Started" button)
Centered panel, max-width 36rem, `bg #171717`, radius `1rem`, padding `2rem`, backdrop `rgba(1,1,1,.8)`; close "X" top-right. **(panel size, backdrop and styling are inferred; the field list and tab structure were read from the live page)** Eyebrow "GET STARTED", an H4 title, then **2 tabs** ("Book a Demo", "Contact Sales"): both forms have First name, Last name, Email, Phone, "Type of business" select (Fitness centre, Specialty clinic, Other); the Contact Sales tab adds an "Your inquiry" textarea. Submit button is primary lime. Show success text on submit (no backend: `onSubmit` -> `preventDefault`, simulate 600ms, show success message; add a `TODO` to wire a real endpoint). Trap focus, close on Esc and backdrop click.

## 7. MOTION RULES (global)

- Easing: `cubic-bezier(.22,1,.36,1)`; durations 0.2s (hover color), 0.3s (cross-fades), 0.6s (reveals), scrubbed (scroll-linked rings).
- `ix-appear-up` utility: starts `opacity:0; transform: translateY(2rem)`, triggers at `top 85%`, `once: true`.
- Respect `prefers-reduced-motion`: disable pinning and ring rotation (show a static fanned arrangement), keep opacity fades only.
- Never animate layout properties; animate `transform` and `opacity` only.

## 8. RESPONSIVE BEHAVIOR

- >= 992px: layouts exactly as above.
- 768-991px: nav becomes hamburger; features grid -> single column (cards full width); benefits -> 2 columns of 3-col spans collapse to single column; steps ring hidden, step image shown above each step; testimonials -> 1 column.
- <= 767px: section padding `4rem`, H1 3rem / H2 2.5rem, hero ring scaled to about 60% with 5 visible cards, about cards stack one per row, footer columns stack with the form first.
- <= 479px: fluid root (about 12.5px at 375px) scales everything; check there is no horizontal scroll at 320px.

## 9. ACCESSIBILITY AND SEO

Semantic landmarks (`header`, `main`, `section[id]`, `footer`), one `h1`, visible 2px lime focus ring (`outline: 2px solid #D3FF62; outline-offset: 2px`), AA contrast (`#BBBFB7` on `#010101` passes), `alt` text on all imagery, `aria-label` on icon buttons, form labels linked to inputs. Add `<title>`, meta description, Open Graph and Twitter card tags using `brand` values, dark `theme-color` `#010101`.

## 10. ASSETS TO GENERATE (placeholders)

Create neutral SVG/gradient placeholders in `public/img/` with the sizes below and reference them from `content.ts` so they are trivial to swap:
`hero-card-1..7` (portrait 4:5), `feature-1..3`, `steps-hero` (wide B/W), `step-1..3`, `app-{light|dark}-{1..4}` (phone screenshots, 9:19), `cta-bg`, `footer-1..7` (square), `logo-1..3` (for flip cards), `logo` (wordmark SVG).

## 11. DEFINITION OF DONE

1. `npm run dev` runs with no console errors; `npm run build` succeeds with no TypeScript errors.
2. Open at 1440, 768 and 375 widths and compare against the spec: root font-size values, container widths, card grids and gaps, type scale, and every color token must match this document.
3. Verify scroll-driven hero ring and 3-step ring work, flip cards flip, theme matrix swaps all 8 screenshots, modal opens/closes with keyboard.
4. Lighthouse (desktop): Accessibility >= 95, no layout shift from fonts or images (set width/height on all images).
5. Finish with a short README: how to edit `content.ts`, where to drop real images, and how colors are defined.

Work in stages: (1) tokens + typography + layout shell, (2) static sections, (3) scroll motion, (4) modal and forms, (5) polish and responsive QA. Commit after each stage.
