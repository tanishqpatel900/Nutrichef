import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { brand, hero } from "../content";
import { MOTION_OK, REDUCED, gsap, navHeight, rem } from "../lib/motion";
import { Button } from "./Button";

const CARD_STEP = 8.5; // degrees between fanned cards
const CARD_ANGLES = [-3, -2, -1, 0, 1, 2, 3].map((i) => i * CARD_STEP);
const SECOND_HAND = 90; // a second fan sits 90deg further round and sweeps in as the ring turns
const LABEL_ANGLES = hero.labels.map((_, i) => -29 + i * 17);
const TICKS = Array.from({ length: 180 }, (_, i) => i * 2);
const RING_TURN = -90;

const angle = (a: number, extra: Record<string, string | number> = {}) =>
  ({ "--a": `${a}deg`, ...extra }) as CSSProperties;

function Words({ text, className }: { text: string; className: string }) {
  const words = text.split(" ");
  return (
    <span className={`hero-title-layer ${className}`} aria-hidden="true">
      {words.map((w, i) => (
        <span key={i}>
          <span className="word">
            <span className="word-inner">{w}</span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Headline: setup line reveals, then is replaced word-by-word by the payoff.
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ delay: 0.25 })
          .fromTo(".hw-setup .word-inner", { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.08, ease: "brand" })
          .to(".hw-setup .word-inner", { yPercent: -110, duration: 0.6, stagger: 0.08, ease: "power2.in" }, "+=1.4")
          .fromTo(".hw-payoff .word-inner", { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.08, ease: "brand" }, "-=0.35");

        // Scroll-pinned ring sequence.
        const stage = root.current!.querySelector<HTMLElement>(".hero-stage")!;
        const statements = gsap.utils.toArray<HTMLElement>(".hero-statement");
        const drift = () => rem(1.5);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: () => `top ${navHeight()}`,
            end: "+=350%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(".hero-ring", { rotation: RING_TURN, duration: 10 }, 0)
          .to(".hero-top", { autoAlpha: 0, y: () => -drift(), duration: 1 }, 0.3)
          .fromTo(statements[0], { autoAlpha: 0, y: drift }, { autoAlpha: 1, y: 0, duration: 1 }, 1.5)
          .to(statements[0], { autoAlpha: 0, y: () => -drift(), duration: 1 }, 3.2)
          .fromTo(statements[1], { autoAlpha: 0, y: drift }, { autoAlpha: 1, y: 0, duration: 1 }, 4.2)
          .to(statements[1], { autoAlpha: 0, y: () => -drift(), duration: 1 }, 5.9)
          .fromTo(statements[2], { autoAlpha: 0, y: drift }, { autoAlpha: 1, y: 0, duration: 1 }, 6.9);
      });

      // Reduced motion: no pin/rotation, opacity-only headline swap.
      mm.add(REDUCED, () => {
        gsap.set(".hero-title .word-inner", { yPercent: 0 });
        gsap
          .timeline({ delay: 0.25 })
          .fromTo(".hw-setup", { opacity: 0 }, { opacity: 1, duration: 0.6 })
          .to(".hw-setup", { opacity: 0, duration: 0.6 }, "+=1.4")
          .fromTo(".hw-payoff", { opacity: 0 }, { opacity: 1, duration: 0.6 });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={root} className="hero">
      <div className="hero-stage">
        <div className="hero-top padding-global">
          <div className="mx-auto flex max-w-[61.25rem] flex-col items-center gap-8 pt-12 text-center">
            <h1 className="heading-h1 hero-title">
              <span className="sr-only">
                {hero.setup} {hero.payoff}
              </span>
              <Words text={hero.setup} className="hw-setup" />
              <Words text={hero.payoff} className="hw-payoff" />
            </h1>
            <p className="text-lead">{hero.lead}</p>
            <Button size="lg" href={brand.ctaHref}>
              {brand.ctaLabel}
            </Button>
          </div>
        </div>

        <div className="hero-statements padding-global">
          {hero.statements.map((s, i) => (
            <div key={i} className="hero-statement" data-appear-fade>
              <p className="hero-statement-text">{s}</p>
              {i === hero.statements.length - 1 && (
                <div className="flex flex-col items-center gap-6">
                  <Button href={brand.ctaHref}>{brand.ctaLabel}</Button>
                  <a href="#features" className="flex flex-col items-center gap-1 text-[0.875rem] text-text">
                    {hero.scrollCaption}
                    <svg className="bob h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="m2 4 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hero-ring-wrap">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-ring">
            <div className="hero-ring-line" aria-hidden="true" />
            {TICKS.map((a) => (
              <span key={a} className="ring-tick" style={angle(a)} aria-hidden="true" />
            ))}
            {[0, SECOND_HAND].map((offset) =>
              hero.cards.map((c, i) => (
                <figure
                  key={`${offset}-${i}`}
                  className="ring-item ring-card"
                  style={angle(CARD_ANGLES[i] + offset, { "--lift": CARD_ANGLES[i] === 0 ? 1 : 0 })}
                  aria-hidden={offset ? true : undefined}
                >
                  <img src={c.src} alt={offset ? "" : c.alt} width={c.w} height={c.h} loading={offset ? "lazy" : "eager"} />
                </figure>
              )),
            )}
            <ul className="contents" aria-label="Platform capabilities">
              {hero.labels.map((l, i) => (
                <li key={l} className="ring-item ring-label" style={angle(LABEL_ANGLES[i])}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-fade-sides" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
