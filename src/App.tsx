import { useLayoutEffect } from "react";
import { About } from "./components/About";
import { AppPreview } from "./components/AppPreview";
import { Benefits } from "./components/Benefits";
import { Cta } from "./components/Cta";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Modal } from "./components/Modal";
import { Nav } from "./components/Nav";
import { Steps } from "./components/Steps";
import { Testimonials } from "./components/Testimonials";
import { MOTION_OK, REDUCED, ScrollTrigger, gsap, rem } from "./lib/motion";

/** Global `ix-appear-up`: fade + rise on first entry, opacity only for reduced motion. */
function useAppearUp() {
  // Runs after the section effects, so the pinned sections already have their spacers.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const batch = (selector: string, y: number) => {
      gsap.set(selector, { autoAlpha: 0, y });
      ScrollTrigger.batch(selector, {
        start: "top 85%",
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "brand", overwrite: true }),
      });
    };
    mm.add(MOTION_OK, () => batch("[data-appear]", rem(2)));
    mm.add(REDUCED, () => batch("[data-appear], [data-appear-fade]", 0));

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      mm.revert();
      window.removeEventListener("load", refresh);
    };
  }, []);
}

export default function App() {
  useAppearUp();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Features />
        <Steps />
        <Benefits />
        <AppPreview />
        <About />
        <Testimonials />
      </main>
      <div className="px-6">
        <Cta />
        <Footer />
      </div>
      <Modal />
    </>
  );
}
