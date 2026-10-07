import { useRef, useState, type KeyboardEvent } from "react";
import { app, brand, type ThemeMode } from "../content";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";

/** Roving-focus arrow-key handling shared by both tablists. */
function useTabKeys(count: number, onSelect: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % count
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + count) % count
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? count - 1
              : -1;
    if (next < 0) return;
    e.preventDefault();
    onSelect(next);
    refs.current[next]?.focus();
  };
  return { refs, onKeyDown };
}

export function AppPreview() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [palette, setPalette] = useState(0);
  const themeIdx = app.themes.findIndex((t) => t.id === theme);
  const themeKeys = useTabKeys(app.themes.length, (i) => setTheme(app.themes[i].id));
  const paletteKeys = useTabKeys(app.palettes.length, setPalette);

  return (
    <section id="app" className="padding-global pt-32 pb-40 max-lg:pt-16 max-lg:pb-20">
      <div className="container-large flex flex-col items-center gap-16">
        <div className="mx-auto flex max-w-[26rem] flex-col items-center gap-8 text-center" data-appear>
          <h2 className="heading-h3">{app.title}</h2>
          <p className="text-body">{app.body}</p>
          <Button href={brand.ctaHref}>{brand.ctaLabel}</Button>
          <p className="text-[0.75rem] text-text">{app.footnote}</p>
        </div>

        <div className="app-row" data-appear>
          <div className="app-menu">
            <Eyebrow variant="theme" as="span" className="app-menu-label">
              <span id="theme-label">{app.themeLabel}</span>
            </Eyebrow>
            <div role="tablist" aria-labelledby="theme-label" aria-orientation="vertical" className="app-options">
              {app.themes.map((t, i) => (
                <button
                  key={t.id}
                  ref={(el) => {
                    themeKeys.refs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`theme-tab-${t.id}`}
                  aria-selected={theme === t.id}
                  aria-controls="app-screen"
                  tabIndex={theme === t.id ? 0 : -1}
                  className="app-option"
                  onClick={() => setTheme(t.id)}
                  onKeyDown={(e) => themeKeys.onKeyDown(e, i)}
                >
                  <span className="swatch">
                    <span style={{ background: t.swatch }} />
                  </span>
                  <span className="app-option-label">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            id="app-screen"
            role="tabpanel"
            aria-labelledby={`theme-tab-${theme}`}
            aria-live="polite"
            className="app-stage"
          >
            <div className="app-glow" aria-hidden="true" />
            <div className="app-phone">
              {app.themes.map((t) =>
                app.palettes.map((_, p) => {
                  const shot = app.screen(t.id, p);
                  const on = t.id === theme && p === palette;
                  return (
                    <img
                      key={shot.src}
                      src={shot.src}
                      width={shot.w}
                      height={shot.h}
                      alt={on ? shot.alt : ""}
                      aria-hidden={!on}
                      loading={on ? "eager" : "lazy"}
                      className={`app-shot ${on ? "is-on" : ""}`}
                    />
                  );
                }),
              )}
            </div>
            <span className="sr-only">
              Showing {app.themes[themeIdx].label} theme with the {app.palettes[palette].label} palette.
            </span>
          </div>

          <div className="app-menu">
            <Eyebrow variant="theme" as="span" className="app-menu-label">
              <span id="palette-label">{app.paletteLabel}</span>
            </Eyebrow>
            <div role="tablist" aria-labelledby="palette-label" aria-orientation="vertical" className="app-options">
              {app.palettes.map((p, i) => (
                <button
                  key={p.label}
                  ref={(el) => {
                    paletteKeys.refs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={palette === i}
                  aria-controls="app-screen"
                  aria-label={p.label}
                  tabIndex={palette === i ? 0 : -1}
                  className="app-option"
                  onClick={() => setPalette(i)}
                  onKeyDown={(e) => paletteKeys.onKeyDown(e, i)}
                >
                  <span className="swatch">
                    <span style={{ background: `linear-gradient(90deg, ${p.colors[0]} 50%, ${p.colors[1]} 50%)` }} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
