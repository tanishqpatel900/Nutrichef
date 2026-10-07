import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { brand } from "./src/content.ts";

declare const process: { env: Record<string, string | undefined> };

// Set BASE_PATH=/Nutrichef/ when building for GitHub Pages (see .github/workflows/deploy.yml).
const base = process.env.BASE_PATH ?? "/";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Fills the %BRAND_*% placeholders in index.html from src/content.ts so the
// <head> meta tags share one source of truth with the page.
export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "brand-meta",
      transformIndexHtml: (html) =>
        html
          .replaceAll("%BRAND_TITLE%", esc(brand.metaTitle))
          .replaceAll("%BRAND_NAME%", esc(brand.name))
          .replaceAll("%BRAND_DESC%", esc(brand.description))
          .replaceAll("%BRAND_OG_IMAGE%", esc(base + brand.ogImage)),
    },
  ],
});
