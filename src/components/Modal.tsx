import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { modal } from "../content";
import { MODAL_EVENT, type ModalTab } from "../lib/modal";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function LeadForm({ tab }: { tab: ModalTab }) {
  const [state, setState] = useState<"idle" | "sending" | "success">("idle");
  const id = (f: string) => `${tab}-${f}`;
  const submit = modal.tabs.find((t) => t.id === tab)!.submit;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    // TODO: wire this to a real endpoint (CRM / form backend). Payload: new FormData(e.currentTarget)
    window.setTimeout(() => setState("success"), 600);
  };

  if (state === "success") {
    return (
      <p role="status" className="rounded-[0.75rem] bg-surface-raised p-4 text-sh1">
        {modal.success}
      </p>
    );
  }

  return (
    <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
      <div>
        <label className="field-label" htmlFor={id("first")}>First name</label>
        <input className="field" id={id("first")} name="firstName" autoComplete="given-name" required />
      </div>
      <div>
        <label className="field-label" htmlFor={id("last")}>Last name</label>
        <input className="field" id={id("last")} name="lastName" autoComplete="family-name" required />
      </div>
      <div>
        <label className="field-label" htmlFor={id("email")}>Email</label>
        <input className="field" id={id("email")} name="email" type="email" autoComplete="email" required />
      </div>
      <div>
        <label className="field-label" htmlFor={id("phone")}>Phone</label>
        <input className="field" id={id("phone")} name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="sm:col-span-2">
        <label className="field-label" htmlFor={id("type")}>Type of business</label>
        <select className="field" id={id("type")} name="businessType" required defaultValue="">
          <option value="" disabled>
            Select one...
          </option>
          {modal.businessTypes.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      {tab === "sales" && (
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor={id("inquiry")}>Your inquiry</label>
          <textarea className="field" id={id("inquiry")} name="inquiry" rows={4} />
        </div>
      )}
      <div className="sm:col-span-2">
        <Button type="submit" disabled={state === "sending"} className="w-full">
          {state === "sending" ? "Sending..." : submit}
        </Button>
      </div>
    </form>
  );
}

export function Modal() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<ModalTab>("demo");
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      opener.current = document.activeElement as HTMLElement | null;
      setTab((e as CustomEvent<ModalTab>).detail ?? "demo");
      setOpen(true);
    };
    window.addEventListener(MODAL_EVENT, onOpen);
    if (location.hash === "#get-started") window.dispatchEvent(new CustomEvent(MODAL_EVENT, { detail: "demo" }));
    return () => window.removeEventListener(MODAL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("lock-scroll");
    panel.current?.querySelector<HTMLElement>(".modal-close")?.focus();
    return () => {
      document.documentElement.classList.remove("lock-scroll");
      opener.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key !== "Tab" || !panel.current) return;
    const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onTabKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + modal.tabs.length) % modal.tabs.length;
    setTab(modal.tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      id="get-started"
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
      onKeyDown={onKeyDown}
    >
      <div ref={panel} className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button type="button" className="modal-close" aria-label="Close" onClick={close}>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m3.5 3.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex flex-col gap-4 pr-10">
          <Eyebrow>{modal.eyebrow}</Eyebrow>
          <h2 id="modal-title" className="heading-h4">
            {modal.title}
          </h2>
        </div>

        <div role="tablist" aria-label="Enquiry type" className="modal-tabs">
          {modal.tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`modal-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`modal-panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              className="modal-tab"
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`modal-panel-${tab}`} aria-labelledby={`modal-tab-${tab}`}>
          <LeadForm key={tab} tab={tab} />
        </div>
      </div>
    </div>
  );
}
