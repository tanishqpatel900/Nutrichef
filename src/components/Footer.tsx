import { useState, type FormEvent } from "react";
import { brand, footer } from "../content";
import { Button } from "./Button";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Newsletter() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!EMAIL.test(email)) return setState("error");
    setState("sending");
    // TODO: POST the email to your newsletter provider here.
    window.setTimeout(() => setState("success"), 600);
  };

  if (state === "success") {
    return (
      <p className="text-body text-accent" role="status">
        {footer.newsletterSuccess}
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="field-label">
        {footer.newsletterLabel}
      </label>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={footer.newsletterPlaceholder}
          className="field"
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? "newsletter-error" : undefined}
          onInput={() => state === "error" && setState("idle")}
        />
        <Button variant="secondary" type="submit" disabled={state === "sending"} className="h-12">
          {footer.newsletterSubmit}
        </Button>
      </div>
      {state === "error" && (
        <p id="newsletter-error" role="alert" className="rounded-[0.75rem] bg-error-bg px-4 py-2 text-[0.875rem] text-bg">
          {footer.newsletterError}
        </p>
      )}
    </form>
  );
}

export function Footer() {
  return (
    <footer className="padding-section-small">
      <div className="container-large flex flex-col gap-16 max-md:gap-12">
        <div className="grid gap-4 gap-y-12 md:grid-cols-[1fr_auto]">
          <div className="flex max-w-[31rem] flex-col items-start gap-8">
            <a href="#hero">
              <img src={brand.logo.src} width={brand.logo.w} height={brand.logo.h} alt={`${brand.name} home`} className="h-[2.8rem] w-[5.2rem]" />
            </a>
            <p className="text-sh1">{brand.tagline}</p>
            <Button variant="secondary" href={brand.ctaHref}>
              {brand.ctaLabel}
            </Button>
            <div className="w-full">
              <Newsletter />
            </div>
          </div>

          <div className="flex gap-16 max-md:gap-12">
            {footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
                <p className="eyebrow">{col.title}</p>
                <ul className="flex flex-col gap-4">
                  {col.links.map((l) => {
                    const external = l.href.startsWith("http");
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="footer-link"
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-7 gap-2" aria-hidden="true">
          {footer.strip.map((im) => (
            <li key={im.src} className="aspect-[400/440] overflow-hidden rounded-[0.75rem]">
              <img src={im.src} width={im.w} height={im.h} alt="" loading="lazy" className="h-full w-full object-cover" />
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-4 text-[0.75rem] text-text">
          <p>
            {brand.companyLegal} {new Date().getFullYear()}
          </p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <a href={footer.credit.href} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                {footer.credit.label}
              </a>
            </li>
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
