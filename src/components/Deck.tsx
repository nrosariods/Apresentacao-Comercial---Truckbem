import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import { motion } from "motion/react";
import { Chrome } from "./Chrome";
import { SLIDES } from "../data/slides";
import { PANEL_SPRING } from "../lib/motion";
import { prefersReducedMotion } from "../lib/gsap";
import { About } from "../slides/About";
import { AuroraCase } from "../slides/AuroraCase";
import { Build } from "../slides/Build";
import { Close } from "../slides/Close";
import { Control } from "../slides/Control";
import { Coverage } from "../slides/Coverage";
import { Differentials } from "../slides/Differentials";
import { Extended } from "../slides/Extended";
import { Fleet } from "../slides/Fleet";
import { Hero } from "../slides/Hero";
import { LeadTimes } from "../slides/LeadTimes";
import { Models } from "../slides/Models";
import { Regional } from "../slides/Regional";
import { Solutions } from "../slides/Solutions";
import { Structure } from "../slides/Structure";
import { Understand } from "../slides/Understand";
import type { SlideProps } from "../slides/types";

const COMPONENTS: ((props: SlideProps) => JSX.Element)[] = [
  Hero,
  About,
  Understand,
  Build,
  Solutions,
  Structure,
  Coverage,
  Fleet,
  Extended,
  Control,
  Models,
  Regional,
  LeadTimes,
  AuroraCase,
  Differentials,
  Close,
];

const WHEEL_THRESHOLD = 30;
const TOUCH_THRESHOLD = 40;
const NAV_LOCK_MS = 650;

function clampIndex(index: number) {
  return Math.max(0, Math.min(SLIDES.length - 1, index));
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function hasInnerScroll(index: number) {
  return SLIDES[index].pin > 1;
}

function innerDistance(index: number) {
  const pin = SLIDES[index].pin;
  return Math.max(window.innerHeight * (pin - 1), window.innerHeight * 0.65);
}

export function Deck() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const indexRef = useRef(0);
  const progressRef = useRef(0);
  const lockedRef = useRef(false);
  const wheelAccRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const unlockTimer = useRef<number | null>(null);

  const unlock = useCallback(() => {
    lockedRef.current = false;
    wheelAccRef.current = 0;
    if (unlockTimer.current != null) {
      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = null;
    }
  }, []);

  const lockForTransition = useCallback(() => {
    lockedRef.current = true;
    if (unlockTimer.current != null) window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(unlock, prefersReducedMotion() ? 80 : NAV_LOCK_MS);
  }, [unlock]);

  const setInnerProgress = useCallback((value: number) => {
    const next = clamp01(value);
    progressRef.current = next;
    setProgress(next);
  }, []);

  const go = useCallback(
    (next: number) => {
      const target = clampIndex(next);
      const from = indexRef.current;

      if (target === from) return;
      if (lockedRef.current) return;

      const enteringForward = target > from;
      const nextProgress = hasInnerScroll(target) ? (enteringForward ? 0 : 1) : 0;

      lockForTransition();
      indexRef.current = target;
      progressRef.current = nextProgress;
      setIndex(target);
      setProgress(nextProgress);
    },
    [lockForTransition],
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      if (lockedRef.current) return;
      go(indexRef.current + direction);
    },
    [go],
  );

  useEffect(() => {
    return () => {
      if (unlockTimer.current != null) window.clearTimeout(unlockTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key === " " && (tag === "BUTTON" || tag === "A")) return;

      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        if (lockedRef.current) return;
        const current = indexRef.current;
        if (hasInnerScroll(current) && progressRef.current < 0.995) {
          setInnerProgress(Math.min(1, progressRef.current + 0.22));
          return;
        }
        step(1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        if (lockedRef.current) return;
        const current = indexRef.current;
        if (hasInnerScroll(current) && progressRef.current > 0.005) {
          setInnerProgress(Math.max(0, progressRef.current - 0.22));
          return;
        }
        step(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        go(0);
      } else if (event.key === "End") {
        event.preventDefault();
        go(SLIDES.length - 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, setInnerProgress, step]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (lockedRef.current) return;

      const current = indexRef.current;
      const delta = event.deltaY;

      if (!hasInnerScroll(current)) {
        if (Math.abs(delta) < WHEEL_THRESHOLD) {
          wheelAccRef.current += delta;
          if (Math.abs(wheelAccRef.current) < WHEEL_THRESHOLD) return;
        }
        const direction: 1 | -1 = (Math.abs(delta) >= WHEEL_THRESHOLD ? delta : wheelAccRef.current) > 0 ? 1 : -1;
        wheelAccRef.current = 0;
        step(direction);
        return;
      }

      const atEnd = progressRef.current >= 0.995;
      const atStart = progressRef.current <= 0.005;
      const next = progressRef.current + delta / innerDistance(current);

      if (delta > 0 && (next >= 1 || atEnd)) {
        if (!atEnd) {
          setInnerProgress(1);
          wheelAccRef.current = 0;
          return;
        }
        // Já no último item interno — libera imediatamente para o próximo slide.
        wheelAccRef.current = 0;
        if (current < SLIDES.length - 1) go(current + 1);
        return;
      }

      if (delta < 0 && (next <= 0 || atStart)) {
        if (!atStart) {
          setInnerProgress(0);
          wheelAccRef.current = 0;
          return;
        }
        // Já no primeiro item interno — libera imediatamente para o slide anterior.
        wheelAccRef.current = 0;
        if (current > 0) go(current - 1);
        return;
      }

      setInnerProgress(next);
      wheelAccRef.current = 0;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [go, setInnerProgress, step]);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchYRef.current == null || lockedRef.current) return;
      const endY = event.changedTouches[0]?.clientY;
      if (endY == null) return;
      const delta = touchYRef.current - endY;
      touchYRef.current = null;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;

      const current = indexRef.current;
      const direction: 1 | -1 = delta > 0 ? 1 : -1;

      if (hasInnerScroll(current)) {
        if (direction > 0) {
          if (progressRef.current < 0.995) {
            setInnerProgress(Math.min(1, progressRef.current + 0.35));
            return;
          }
          go(current + 1);
          return;
        }
        if (progressRef.current > 0.005) {
          setInnerProgress(Math.max(0, progressRef.current - 0.35));
          return;
        }
        go(current - 1);
        return;
      }

      step(direction);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [go, setInnerProgress, step]);

  const dark = SLIDES[index].tone === "dark";
  const reduce = prefersReducedMotion();

  return (
    <div className="deck-root bg-navy">
      {COMPONENTS.map((Component, i) => {
        const slide = SLIDES[i];
        const isActive = i === index;
        const inner = slide.pin > 1;
        const local = i < index ? 1 : i > index ? 0 : inner ? progress : 0;

        return (
          <motion.section
            key={slide.id}
            id={`slide-${slide.id}`}
            data-slide={slide.id}
            data-pin={slide.pin}
            className="deck-slide absolute inset-0"
            aria-label={slide.label}
            aria-hidden={isActive ? undefined : true}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.985,
              zIndex: isActive ? 3 : 1,
            }}
            transition={reduce ? { duration: 0.01 } : PANEL_SPRING}
            style={{ pointerEvents: isActive ? "auto" : "none" }}
            onAnimationComplete={() => {
              if (isActive) unlock();
            }}
          >
            <div data-stage className="h-dvh overflow-hidden">
              <Component active={isActive} deck progress={local} />
            </div>
          </motion.section>
        );
      })}
      <Chrome index={index} progress={hasInnerScroll(index) ? progress : 0} dark={dark} onGo={go} />
    </div>
  );
}
