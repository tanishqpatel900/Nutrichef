export type ModalTab = "demo" | "sales";

export const MODAL_EVENT = "lead-modal:open";

/** Opens the lead-capture modal from anywhere (every "Get Started" CTA calls this). */
export function openModal(tab: ModalTab = "demo") {
  window.dispatchEvent(new CustomEvent<ModalTab>(MODAL_EVENT, { detail: tab }));
}
