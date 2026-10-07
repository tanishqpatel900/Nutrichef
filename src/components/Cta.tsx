import { brand, cta } from "../content";
import { Button } from "./Button";

export function Cta() {
  return (
    <section className="section_cta padding-section-large relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={cta.background.src}
          width={cta.background.w}
          height={cta.background.h}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="edge-fade" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#010101,rgba(1,1,1,0)_25%,rgba(1,1,1,0)_75%,#010101)]" />
      </div>
      <div className="container-medium flex flex-col items-center gap-8 text-center" data-appear>
        <h2 className="heading-h1">{cta.title}</h2>
        <p className="text-lead">{cta.body}</p>
        <Button href={brand.ctaHref}>{brand.ctaLabel}</Button>
      </div>
    </section>
  );
}
