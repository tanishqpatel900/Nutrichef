import type { ReactNode } from "react";
import { about } from "../content";
import { Eyebrow } from "./Eyebrow";

type IconName = (typeof about.items)[number]["icon"];

const icons: Record<IconName, ReactNode> = {
  trophy: <path d="M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H5a3 3 0 0 0 3 3m8-3h3a3 3 0 0 1-3 3m-4 4v4m-3 3h6" />,
  handshake: <path d="m3 12 4-4 3 1 3-2 4 1 4 4m-18 0 5 5 2-1 2 2 2-1 2 1 5-6M10 9l-2 4 2 1 3-3" />,
  spark: <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />,
  chef: <path d="M7 14v6h10v-6M7 14a4 4 0 1 1 1.5-7.7A4 4 0 0 1 15.5 6.3 4 4 0 1 1 17 14H7Zm0 3h10" />,
  check: <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
};

export function About() {
  return (
    <section id="about" className="padding-global padding-section-large">
      <div className="container-large flex flex-col gap-16 max-lg:gap-10">
        <div className="flex flex-col gap-6" data-appear>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className="heading-about max-w-[62rem]">{about.statement}</h2>
        </div>
        <ul className="flex flex-wrap gap-4">
          {about.items.map((it) => (
            <li
              key={it.title}
              className="card flex min-h-[9rem] max-w-[25rem] flex-[1_1_22rem] items-start gap-4 p-4 max-md:max-w-none"
              data-appear
            >
              <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-surface-raised text-accent">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icons[it.icon]}
                </svg>
              </span>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-sh1">{it.title}</h3>
                <p className="text-body">{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
