import { features } from "../content";
import { Eyebrow } from "./Eyebrow";

function CardText({ title, body, narrow }: { title: string; body: string; narrow?: boolean }) {
  return (
    <div className="flex flex-col gap-4 p-8 max-md:p-6">
      <Eyebrow>{features.eyebrow}</Eyebrow>
      <h3 className="heading-h3">{title}</h3>
      <p className={`text-body ${narrow ? "max-width-medium" : ""}`}>{body}</p>
    </div>
  );
}

function Orbit() {
  const { chips, icon } = features.pricing;
  // Chip positions around the rings (percent of the visual box).
  const spots = [
    { left: "50%", top: "10%" },
    { left: "84%", top: "34%" },
    { left: "76%", top: "78%" },
    { left: "22%", top: "80%" },
    { left: "15%", top: "36%" },
  ];
  return (
    <div className="orbit" aria-hidden="true">
      {[1, 0.74, 0.5].map((s) => (
        <span key={s} className="orbit-ring" style={{ width: `${s * 26}rem`, height: `${s * 26}rem` }} />
      ))}
      <span className="orbit-core">
        <img src={icon.src} width={icon.w} height={icon.h} alt="" />
      </span>
      {chips.map((c, i) => (
        <span key={c} className={`orbit-chip ${i % 2 ? "is-dark" : ""}`} style={spots[i]}>
          <span className="orbit-dot" />
          {c}
        </span>
      ))}
    </div>
  );
}

export function Features() {
  const { pricing, science, app } = features;
  return (
    <section id="features" className="padding-global padding-section-large features">
      <div className="container-large">
        <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-[38rem_38rem]">
          <article className="card flex flex-col" data-appear>
            <div className="relative min-h-[20rem] flex-1">
              <Orbit />
            </div>
            <CardText title={pricing.title} body={pricing.body} narrow />
          </article>

          <article className="card flex flex-col lg:col-start-1 lg:row-start-2" data-appear>
            <div className="relative min-h-[20rem] flex-1 overflow-hidden">
              <img
                src={science.image.src}
                width={science.image.w}
                height={science.image.h}
                alt={science.image.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(23,23,23,0)_55%,#171717)]" />
              <ul className="absolute top-6 right-6 flex flex-col items-end gap-2" aria-label="Example notifications">
                {science.notifications.map((n, i) => (
                  <li key={n} className={`notif ${i === 1 ? "is-green" : ""}`}>
                    <span className="notif-icon" aria-hidden="true">
                      <svg viewBox="0 0 12 12" fill="none">
                        <path d="m2.5 6.2 2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <CardText title={science.title} body={science.body} />
          </article>

          <article className="card flex flex-col lg:col-start-2 lg:row-span-2 lg:row-start-1" data-appear>
            <CardText title={app.title} body={app.body} />
            <div className="relative min-h-[26rem] flex-1">
              <img
                src={app.image.src}
                width={app.image.w}
                height={app.image.h}
                alt={app.image.alt}
                loading="lazy"
                className="absolute bottom-0 left-1/2 h-[112%] w-auto max-w-none -translate-x-1/2 object-contain object-top max-lg:relative max-lg:h-auto max-lg:w-full max-lg:translate-x-[-50%]"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
