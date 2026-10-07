import { useEffect, useState } from "react";
import { brand } from "../content";
import { Button } from "./Button";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lock-scroll", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 992px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.documentElement.classList.remove("lock-scroll");
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-nav sticky top-0 z-50 h-[4.5rem] ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="padding-global relative z-10 h-full">
        <div className="container-large grid h-full grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <a href="#hero" className="justify-self-start" onClick={close}>
            <img
              src={brand.logo.src}
              width={brand.logo.w}
              height={brand.logo.h}
              alt={`${brand.name} home`}
              className="h-[2.8rem] w-[5.2rem]"
            />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {brand.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden justify-self-end lg:block">
            <Button variant="secondary" href={brand.ctaHref}>
              {brand.ctaLabel}
            </Button>
          </div>

          <button
            type="button"
            className={`hamburger justify-self-end lg:hidden ${open ? "is-open" : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu lg:hidden ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile" className="padding-global flex h-full flex-col gap-10 pt-8 pb-12">
          <ul className="flex flex-col gap-3">
            {brand.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="mobile-link" onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <Button variant="secondary" size="menu" href={brand.ctaHref} onClick={close}>
              {brand.ctaLabel}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
