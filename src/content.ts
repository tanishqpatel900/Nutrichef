// Single source of truth for every brand-specific string and image on the page.
// Swap the placeholder SVGs in /public/img for real assets (keep or update w/h
// so the browser can reserve space and avoid layout shift).

export type Img = { src: string; alt: string; w: number; h: number };

// Vite base path ("/" locally, "/Nutrichef/" on GitHub Pages). Undefined when vite.config imports this file.
const BASE: string = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/";

const img = (name: string, alt: string, w: number, h: number): Img => ({
  src: `${BASE}img/${name}.svg`,
  alt,
  w,
  h,
});

export const brand = {
  name: "YourBrand", // used in logo alt, footer, meta
  tagline: "Personal AI nutrition coaching for every member, under your gym's name.",
  ctaLabel: "Get Started",
  ctaHref: "#get-started", // opens the modal in section 11
  companyLegal: "© YourCompany Inc.",
  metaTitle: "YourBrand · White-label AI nutrition for gyms",
  description:
    "Give every member a personal AI nutrition coach under your own brand. Personalized plans, recipes and tracking that keep members engaged and add a new revenue line.",
  ogImage: "img/cta-bg.svg", // swap for a 1200x630 PNG/JPG before launch
  logo: img("logo", "YourBrand", 104, 56),
  nav: [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#hiw" },
    { label: "Benefits", href: "#benefits" },
    { label: "Company", href: "#about" },
    { label: "Reviews", href: "#case-studies" },
  ],
};

export const hero = {
  // Two-beat headline: the setup line is replaced word-by-word by the payoff.
  setup: "Most gyms focus on workouts.",
  payoff: "The smart ones profit from nutrition.",
  lead: "Give every member a personal AI nutrition coach under your own brand, and turn healthy eating into a brand-new revenue line.",
  cards: Array.from({ length: 7 }, (_, i) =>
    img(`hero-card-${i + 1}`, `Gym member portrait ${i + 1}`, 352, 440),
  ),
  labels: [
    "Client profiles",
    "AI personalization",
    "Goal-based plans",
    "Guided recipes",
    "Macro tracking",
    "Wearable integration",
    "Grocery lists",
    "Gamified engagement",
  ],
  statements: [
    "Results are made in the kitchen. Your members already know it.",
    "Our AI creates personalized meal plans for every member, in seconds.",
    "You handle the training. We handle the nutrition.",
  ],
  scrollCaption: "Scroll to learn more",
};

export const features = {
  eyebrow: "Features",
  pricing: {
    title: "Priced to pay for itself",
    body: "One flat monthly fee per location, no per-member charges. Bundle nutrition into your memberships or sell it as a premium add-on and keep every cent of the margin.",
    chips: ["Meal plans", "Check-ins", "Recipes", "Progress", "Coaching"],
    icon: img("feature-1", "", 200, 200),
  },
  science: {
    title: "Built on nutrition science, powered by AI",
    body: "Every plan is generated from evidence-based guidelines and adapts as members log meals, train and progress toward their goals.",
    image: img("feature-2", "Member preparing a healthy meal in a bright kitchen", 1200, 800),
    notifications: ["Plan updated for your new goal", "Protein target hit today", "3 new recipes added"],
  },
  app: {
    title: "Your brand, in every member's pocket",
    body: "A fully branded mobile app with your logo, colors and name. Members see your gym every time they plan a meal, not someone else's.",
    image: img("feature-3", "Hand holding a phone showing the branded nutrition app", 1000, 1200),
  },
};

export const steps = {
  title: "Launch your nutrition program in 3 simple steps",
  hero: img("steps-hero", "Black-and-white portrait of an athlete", 2400, 1000),
  items: [
    {
      title: "Brand it as your own",
      body: "Upload your logo and pick your colors. We set up a white-label app that looks and feels like it was built in-house.",
      image: img("step-1", "App setup screen with brand colors", 360, 760),
    },
    {
      title: "Invite your members",
      body: "Share a link or QR code at the front desk. Members answer a short profile and get their first plan within minutes.",
      image: img("step-2", "Member onboarding screen", 360, 760),
    },
    {
      title: "Watch engagement grow",
      body: "Track activity and adherence from your dashboard and use the insights to start better conversations on the gym floor.",
      image: img("step-3", "Gym dashboard with engagement stats", 360, 760),
    },
  ],
};

export const benefits = {
  eyebrow: "Benefits",
  items: [
    {
      title: "Become the one-stop hub",
      body: "Training and nutrition under one roof means members stop looking elsewhere for the other half of their results.",
    },
    {
      title: "Unlock a new revenue stream",
      body: "Sell nutrition as a premium tier or bundle it into memberships. Either way it is high-margin revenue you did not have before.",
    },
    {
      title: "Stay present outside the gym",
      body: "Members open your app at every meal, keeping your brand top of mind between sessions, not just during them.",
    },
    {
      title: "Boost retention and lifetime value",
      body: "Members who see results stay longer. Personalized nutrition helps them get there faster and keeps them coming back.",
    },
  ],
};

export type ThemeMode = "dark" | "light";

export const app = {
  title: "See your brand in action",
  body: "Pick a theme and a palette to preview your members' experience.",
  footnote: "Preview only. This is not the full range of customization available.",
  themeLabel: "Theme",
  paletteLabel: "Sample palettes",
  themes: [
    { id: "light" as ThemeMode, label: "Light", swatch: "#F2F2F2" },
    { id: "dark" as ThemeMode, label: "Dark", swatch: "#232323" },
  ],
  palettes: [
    { label: "Lime and teal", colors: ["#D3FF62", "#218198"] },
    { label: "Green and orange", colors: ["#3B9C58", "#FD5225"] },
    { label: "Periwinkle and purple", colors: ["#758DC1", "#9636CD"] },
    { label: "Blush and coral", colors: ["#FFE9E3", "#F9455D"] },
  ],
  screen: (theme: ThemeMode, palette: number) =>
    img(`app-${theme}-${palette + 1}`, `App preview, ${theme} theme, palette ${palette + 1}`, 360, 760),
};

export const about = {
  eyebrow: `About ${brand.name}`,
  statement:
    "We help fitness businesses deliver the nutrition guidance their members have always asked for, without hiring a dietitian or building software, so every coach can offer results that last beyond the workout.",
  items: [
    {
      icon: "trophy",
      title: "Proven track record",
      body: "Our team has launched digital products for fitness brands of every size.",
    },
    {
      icon: "handshake",
      title: "Platform partnership",
      body: "We work alongside your existing gym software, not against it.",
    },
    {
      icon: "spark",
      title: "AI foundation",
      body: "Modern language models tuned for safe, practical nutrition guidance.",
    },
    {
      icon: "chef",
      title: "Culinary data",
      body: "Thousands of recipes tagged by macros, allergens and cooking time.",
    },
    {
      icon: "check",
      title: "Expert reviewed",
      body: "Plan templates are reviewed by registered nutrition professionals.",
    },
  ] as const,
};

// SAMPLE CONTENT: fictional names, businesses and quotes for layout only.
// Replace with real, approved testimonials before launch.
export const testimonials = {
  eyebrow: "Client testimonials",
  title: "Loved by gyms that lead",
  subtitle: "Hover or tap a card to read what our partners say.",
  items: [
    {
      logo: img("logo-1", "Sample Gym A logo", 240, 80),
      quote: "Sample quote: members finally have a nutrition answer we can stand behind, and it carries our name.",
      name: "Alex Example",
      role: "Owner, Sample Gym A",
    },
    {
      logo: img("logo-2", "Sample Studio B logo", 240, 80),
      quote: "Sample quote: setup took an afternoon. The premium tier paid for itself in the first month.",
      name: "Jordan Placeholder",
      role: "Head Coach, Sample Studio B",
    },
    {
      logo: img("logo-3", "Sample Club C logo", 240, 80),
      quote: "Sample quote: our coaches use the plans to start better conversations with every client.",
      name: "Sam Demo",
      role: "GM, Sample Club C",
    },
  ],
};

export const cta = {
  title: "Give your members the results they came for",
  body: "Launch a branded AI nutrition program in days, not months.",
  background: img("cta-bg", "", 2400, 1200),
};

export const footer = {
  newsletterLabel: "Get product updates",
  newsletterPlaceholder: "Your email",
  newsletterSubmit: "Subscribe",
  newsletterSuccess: "Check your inbox to confirm your subscription.",
  newsletterError: "Please enter a valid email address.",
  columns: [
    {
      title: "About",
      links: [
        { label: "Features", href: "#features" },
        { label: "Benefits", href: "#benefits" },
        { label: "How it Works", href: "#hiw" },
        { label: "Company", href: "#about" },
      ],
    },
    {
      title: "Learn More",
      links: [
        { label: "Reviews", href: "#case-studies" },
        { label: "Blog", href: "https://example.com/blog" },
        { label: "Careers", href: "https://example.com/careers" },
      ],
    },
  ],
  strip: Array.from({ length: 7 }, (_, i) => img(`footer-${i + 1}`, "", 400, 440)),
  credit: { label: "Site credit", href: "https://example.com" },
  legal: [
    { label: "Terms", href: "https://example.com/terms" },
    { label: "Privacy", href: "https://example.com/privacy" },
  ],
};

export const modal = {
  eyebrow: "Get started",
  title: "Let's bring nutrition to your members",
  tabs: [
    { id: "demo", label: "Book a Demo", submit: "Book a Demo" },
    { id: "sales", label: "Contact Sales", submit: "Contact Sales" },
  ] as const,
  businessTypes: ["Fitness centre", "Specialty clinic", "Other"],
  success: "Thanks! We'll be in touch within one business day.",
};
