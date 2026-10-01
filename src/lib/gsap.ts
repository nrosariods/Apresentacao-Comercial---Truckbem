import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export { gsap, ScrollTrigger };

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function storyIndex(progress: number, count: number) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.floor(progress * count * 0.999));
}

export function slideTransitionDuration() {
  return prefersReducedMotion() ? 0.01 : 0.75;
}
