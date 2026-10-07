import { useState } from "react";
import { testimonials } from "../content";
import { Eyebrow } from "./Eyebrow";

function FlipCard({ item }: { item: (typeof testimonials.items)[number] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <li className="flip" data-appear>
      <button
        type="button"
        className={`flip-inner ${flipped ? "is-flipped" : ""}`}
        aria-pressed={flipped}
        aria-label={`${item.logo.alt}: ${flipped ? "hide" : "show"} testimonial`}
        onClick={() => setFlipped((f) => !f)}
      >
        <span className="flip-face flip-front">
          <img src={item.logo.src} width={item.logo.w} height={item.logo.h} alt={item.logo.alt} loading="lazy" className="h-auto w-[12rem]" />
        </span>
        <span className="flip-face flip-back">
          <span className="text-body block">“{item.quote}”</span>
          <span className="flex flex-col gap-1">
            <span className="text-sh1">{item.name}</span>
            <span className="text-[0.75rem] text-text">{item.role}</span>
          </span>
        </span>
      </button>
    </li>
  );
}

export function Testimonials() {
  return (
    <section id="case-studies" className="padding-global padding-section-large">
      <div className="container-large flex flex-col items-center gap-16 max-lg:gap-10">
        <div className="flex max-w-[40rem] flex-col items-center gap-6 text-center" data-appear>
          <Eyebrow>{testimonials.eyebrow}</Eyebrow>
          <h2 className="heading-h3">{testimonials.title}</h2>
          <p className="text-body">{testimonials.subtitle}</p>
        </div>
        <ul className="grid w-full max-w-[80rem] justify-center gap-4 lg:grid-cols-[repeat(3,minmax(0,26rem))]">
          {testimonials.items.map((t) => (
            <FlipCard key={t.name} item={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}
