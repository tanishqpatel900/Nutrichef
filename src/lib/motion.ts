import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// cubic-bezier(.22,1,.36,1), shared by every reveal.
CustomEase.create("brand", ".22,1,.36,1");

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED = "(prefers-reduced-motion: reduce)";
export const DESKTOP = "(min-width: 992px)";

/** Current root font-size in px (the root is fluid, so read it live). */
export const rem = (n = 1) => n * parseFloat(getComputedStyle(document.documentElement).fontSize);

/** Height of the sticky nav, used to offset pinned sections. */
export const navHeight = () => document.querySelector<HTMLElement>(".site-nav")?.offsetHeight ?? 0;

export { gsap, ScrollTrigger };
