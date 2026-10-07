import { benefits } from "../content";
import { Eyebrow } from "./Eyebrow";

export function Benefits() {
  return (
    <section id="benefits" className="padding-global pt-32 max-lg:pt-16">
      <div className="container-benefits">
        <ul className="grid gap-6 lg:grid-cols-6">
          {benefits.items.map((b) => (
            <li
              key={b.title}
              className="card flex min-h-[17.5rem] flex-col justify-between gap-4 p-8 max-md:min-h-0 max-md:p-6 lg:col-span-3"
              data-appear
            >
              <Eyebrow>{benefits.eyebrow}</Eyebrow>
              <div className="flex flex-col gap-4">
                <h3 className="heading-h4">{b.title}</h3>
                <p className="text-body max-w-[30rem]">{b.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
