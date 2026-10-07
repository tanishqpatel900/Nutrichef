// Generates neutral SVG placeholders in public/img. Run: npm run placeholders
// Swap any file for a real asset with the same name (or update src/content.ts).
import { mkdirSync, writeFileSync } from "node:fs";

const out = new URL("../public/img/", import.meta.url);
mkdirSync(out, { recursive: true });
const write = (name, svg) => writeFileSync(new URL(`${name}.svg`, out), svg.trim() + "\n");
const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
const font = `font-family="Arial, Helvetica, sans-serif"`;
const tag = (w, h, t, fill = "rgba(255,255,255,.28)") =>
  `<text x="${w / 2}" y="${h - 22}" ${font} font-size="${Math.max(12, Math.round(w / 28))}" fill="${fill}" text-anchor="middle" letter-spacing="2">${t}</text>`;
const grad = (id, a, b, dir = 'x1="0" y1="0" x2="0" y2="1"') =>
  `<linearGradient id="${id}" ${dir}><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

// Abstract portrait silhouette (head + shoulders).
const person = (w, h, fill, cx = w / 2, scale = 1) => {
  const r = w * 0.15 * scale;
  const hy = h * 0.4;
  return `<circle cx="${cx}" cy="${hy}" r="${r}" fill="${fill}"/>
  <path d="M${cx - r * 2.6} ${h} C${cx - r * 2.6} ${hy + r * 1.6} ${cx - r * 1.2} ${hy + r * 1.25} ${cx} ${hy + r * 1.25} S${cx + r * 2.6} ${hy + r * 1.6} ${cx + r * 2.6} ${h} Z" fill="${fill}"/>`;
};

// ---- Logo + favicon --------------------------------------------------------
write(
  "logo",
  svg(104, 56, `<circle cx="12" cy="28" r="9" fill="#D3FF62"/><circle cx="12" cy="28" r="4" fill="#010101"/>
  <text x="26" y="33" ${font} font-size="14" font-weight="700" fill="#D3FF62" letter-spacing="-.3">YourBrand</text>`),
);
write("favicon", svg(32, 32, `<rect width="32" height="32" rx="8" fill="#010101"/><circle cx="16" cy="16" r="9" fill="#D3FF62"/><circle cx="16" cy="16" r="4" fill="#010101"/>`));

// ---- Hero cards (portrait 4:5) --------------------------------------------
const heroTones = [
  ["#2b3324", "#0d0f0b"], ["#1f2a2c", "#0b0d0e"], ["#33302a", "#0f0e0c"], ["#26331f", "#0c0f0a"],
  ["#2a2633", "#0d0c0f"], ["#1f3328", "#0a0f0c"], ["#332726", "#0f0b0b"],
];
heroTones.forEach(([a, b], i) => {
  const w = 352, h = 440;
  write(
    `hero-card-${i + 1}`,
    svg(w, h, `<defs>${grad("g", a, b)}</defs><rect width="${w}" height="${h}" fill="url(#g)"/>
    ${person(w, h, "rgba(255,255,255,.09)", w / 2 + (i % 2 ? 20 : -20))}${tag(w, h, `HERO CARD ${i + 1}`)}`),
  );
});

// ---- Feature visuals -------------------------------------------------------
write(
  "feature-1",
  svg(200, 200, `<rect width="200" height="200" fill="#0d0d0d"/>
  <path d="M62 128h78a26 26 0 0 0 0-52 36 36 0 0 0-69-6 29 29 0 0 0-9 58Z" fill="none" stroke="#D3FF62" stroke-width="7" stroke-linejoin="round"/>`),
);
write(
  "feature-2",
  svg(1200, 800, `<defs>${grad("g", "#2a2f24", "#0c0d0b")}<radialGradient id="l" cx=".7" cy=".2" r=".7"><stop offset="0" stop-color="rgba(255,255,255,.18)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></radialGradient></defs>
  <rect width="1200" height="800" fill="url(#g)"/><rect width="1200" height="800" fill="url(#l)"/>
  <rect x="0" y="560" width="1200" height="240" fill="rgba(0,0,0,.35)"/>
  <ellipse cx="760" cy="600" rx="190" ry="46" fill="rgba(255,255,255,.12)"/>
  <circle cx="700" cy="585" r="34" fill="rgba(211,255,98,.25)"/><circle cx="790" cy="590" r="28" fill="rgba(253,82,37,.25)"/>
  ${person(1200, 800, "rgba(255,255,255,.08)", 420, 0.55)}${tag(1200, 800, "FEATURE 2 PHOTO")}`),
);
write(
  "feature-3",
  svg(1000, 1200, `<defs>${grad("g", "#171717", "#171717")}${grad("s", "#1d1d1d", "#0c0c0c")}</defs>
  <rect width="1000" height="1200" fill="url(#g)"/>
  <path d="M190 1200 C210 900 260 760 330 690 L420 620 L640 700 C700 760 760 900 800 1200Z" fill="#3a3632"/>
  <rect x="300" y="130" width="400" height="830" rx="62" fill="#050505" stroke="#2a2a2a" stroke-width="6"/>
  <rect x="322" y="152" width="356" height="786" rx="44" fill="url(#s)"/>
  <rect x="352" y="210" width="140" height="18" rx="9" fill="#D3FF62"/>
  <rect x="352" y="250" width="296" height="190" rx="22" fill="#232323"/>
  <circle cx="500" cy="345" r="62" fill="none" stroke="#D3FF62" stroke-width="14" stroke-dasharray="290 400" transform="rotate(-90 500 345)"/>
  <rect x="352" y="466" width="296" height="80" rx="18" fill="#232323"/><rect x="352" y="562" width="296" height="80" rx="18" fill="#232323"/>
  <rect x="352" y="658" width="296" height="80" rx="18" fill="#232323"/>
  <path d="M250 1200 C250 980 270 900 300 860 L330 820 C360 800 390 830 380 870 L360 960 L700 900 C760 960 780 1080 790 1200Z" fill="#4a4540"/>
  ${tag(1000, 1200, "FEATURE 3 PHONE IN HAND")}`),
);

// ---- Phone screens (9:19) --------------------------------------------------
const phone = (bg, fg, muted, card, a, b, title) => {
  const w = 360, h = 760;
  return svg(w, h, `<rect width="${w}" height="${h}" rx="40" fill="${bg}"/>
  <circle cx="44" cy="62" r="16" fill="${a}"/><rect x="72" y="52" width="110" height="10" rx="5" fill="${fg}"/><rect x="72" y="68" width="70" height="8" rx="4" fill="${muted}"/>
  <rect x="24" y="106" width="312" height="200" rx="24" fill="${a}"/>
  <text x="48" y="150" ${font} font-size="20" font-weight="700" fill="${bg}">${title}</text>
  <rect x="48" y="166" width="150" height="8" rx="4" fill="${bg}" opacity=".5"/>
  <circle cx="270" cy="250" r="38" fill="none" stroke="${bg}" stroke-opacity=".25" stroke-width="10"/>
  <circle cx="270" cy="250" r="38" fill="none" stroke="${b}" stroke-width="10" stroke-dasharray="170 240" transform="rotate(-90 270 250)"/>
  ${[0, 1, 2].map((i) => `<rect x="24" y="${326 + i * 92}" width="312" height="78" rx="20" fill="${card}"/>
  <rect x="40" y="${342 + i * 92}" width="46" height="46" rx="12" fill="${i === 1 ? b : a}" opacity=".85"/>
  <rect x="100" y="${350 + i * 92}" width="${150 - i * 20}" height="10" rx="5" fill="${fg}"/>
  <rect x="100" y="${368 + i * 92}" width="${100 + i * 15}" height="8" rx="4" fill="${muted}"/>`).join("")}
  <rect x="24" y="612" width="312" height="56" rx="18" fill="${b}"/>
  <rect x="132" y="636" width="96" height="10" rx="5" fill="${bg}" opacity=".8"/>
  <rect x="24" y="692" width="312" height="44" rx="22" fill="${card}"/>
  ${[0, 1, 2, 3].map((i) => `<circle cx="${72 + i * 72}" cy="714" r="7" fill="${i === 0 ? a : muted}"/>`).join("")}`);
};
const palettes = [["#D3FF62", "#218198"], ["#3B9C58", "#FD5225"], ["#758DC1", "#9636CD"], ["#FFE9E3", "#F9455D"]];
palettes.forEach(([a, b], i) => {
  write(`app-dark-${i + 1}`, phone("#0e0e0e", "#ffffff", "#5c5c5c", "#1c1c1c", a, b, "Today's plan"));
  // Light theme: darken the very pale first colour so it still reads on white.
  write(`app-light-${i + 1}`, phone("#f6f6f4", "#141414", "#b9b9b5", "#ffffff", a === "#FFE9E3" ? "#F7C9BC" : a, b, "Today's plan"));
});
["Brand setup", "Welcome!", "Dashboard"].forEach((t, i) =>
  write(`step-${i + 1}`, phone("#0e0e0e", "#ffffff", "#5c5c5c", "#1c1c1c", "#D3FF62", "#328810", t)),
);

// ---- Wide / background imagery --------------------------------------------
write(
  "steps-hero",
  svg(2400, 1000, `<defs>${grad("g", "#3a3a3a", "#0a0a0a")}<radialGradient id="l" cx=".5" cy=".3" r=".6"><stop offset="0" stop-color="rgba(255,255,255,.22)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></radialGradient></defs>
  <rect width="2400" height="1000" fill="url(#g)"/><rect width="2400" height="1000" fill="url(#l)"/>
  ${person(2400, 1000, "rgba(0,0,0,.45)", 1200, 0.3)}${tag(2400, 1000, "STEPS HERO B/W")}`),
);
write(
  "cta-bg",
  svg(2400, 1200, `<defs><radialGradient id="g" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#2d3a1d"/><stop offset=".6" stop-color="#11150c"/><stop offset="1" stop-color="#010101"/></radialGradient></defs>
  <rect width="2400" height="1200" fill="url(#g)"/>
  ${person(2400, 1200, "rgba(0,0,0,.35)", 820, 0.28)}${person(2400, 1200, "rgba(0,0,0,.3)", 1600, 0.25)}${tag(2400, 1200, "CTA BACKGROUND")}`),
);

// ---- Footer strip + testimonial logos -------------------------------------
heroTones.forEach(([a, b], i) => {
  write(`footer-${i + 1}`, svg(400, 440, `<defs>${grad("g", a, b)}</defs><rect width="400" height="440" fill="url(#g)"/>
  ${i % 2 ? person(400, 440, "rgba(255,255,255,.07)") : `<circle cx="200" cy="200" r="90" fill="rgba(211,255,98,.12)"/>`}${tag(400, 440, `FOOTER ${i + 1}`)}`));
});
const logoShapes = [
  `<polygon points="40,20 60,60 20,60" fill="#ffffff"/>`,
  `<rect x="22" y="22" width="36" height="36" rx="10" fill="#ffffff"/>`,
  `<circle cx="40" cy="40" r="19" fill="none" stroke="#ffffff" stroke-width="6"/>`,
];
["SAMPLE GYM A", "SAMPLE STUDIO B", "SAMPLE CLUB C"].forEach((t, i) =>
  write(`logo-${i + 1}`, svg(240, 80, `${logoShapes[i]}<text x="72" y="47" ${font} font-size="15" font-weight="700" fill="#ffffff" letter-spacing="1.5">${t}</text>`)),
);

console.log("placeholders written to public/img");
