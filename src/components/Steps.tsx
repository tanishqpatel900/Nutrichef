import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { steps } from "../content";
import { DESKTOP, MOTION_OK, gsap, navHeight } from "../lib/motion";

const STEP_TURN = 40; // degrees between screenshots on the track

export function Steps() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const tl = gsap.timeline({
          defaults: { ease: "brand", duration: 1 },
          scrollTrigger: {
            trigger: ".steps-pin",
            start: () => `top ${navHeight()}`,
            end: "+=200%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (st) => setActive(st.progress < 0.3 ? 0 : st.progress < 0.7 ? 1 : 2),
          },
        });
        // hold, turn, hold, turn, hold: one third of the travel per step
        tl.to(".steps-track", { rotation: -STEP_TURN }, 1)
          .to(".steps-track", { rotation: -STEP_TURN * 2 }, 3)
          .set({}, {}, 5);
        return () => setActive(0);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hiw" ref={root} className="steps">
      <div className="steps-hero" aria-hidden="true">
        <img src={steps.hero.src} width={steps.hero.w} height={steps.hero.h} alt="" loading="lazy" />
        <div className="edge-fade" />
      </div>

      <div className="padding-global relative">
        <div className="container-large flex flex-col gap-16">
          <h2 className="heading-h2 mx-auto -mt-24 max-w-[50rem] text-center max-lg:-mt-12" data-appear>
            {steps.title}
          </h2>

          <div className="steps-pin grid gap-4 lg:grid-cols-2">
            <div className="steps-track-col max-lg:hidden" aria-hidden="true">
              <div className="steps-track">
                <span className="steps-track-line" />
                <span className="steps-track-line is-inner" />
                {steps.items.map((s, i) => (
                  <figure
                    key={i}
                    className={`steps-shot ${active === i ? "is-active" : ""}`}
                    style={{ "--a": `${i * STEP_TURN}deg` } as CSSProperties}
                  >
                    <img src={s.image.src} width={s.image.w} height={s.image.h} alt="" loading="lazy" />
                  </figure>
                ))}
              </div>
            </div>

            <ol className="steps-list">
              {steps.items.map((s, i) => (
                <li key={i} className={`step ${active === i ? "is-active" : ""}`}>
                  <img
                    src={s.image.src}
                    width={s.image.w}
                    height={s.image.h}
                    alt={s.image.alt}
                    loading="lazy"
                    className="step-mobile-img lg:hidden"
                  />
                  <span className="step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="heading-h4 max-w-[16rem]">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="text-body text-[1rem]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
