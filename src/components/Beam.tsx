import { useEffect, useId, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Adaptado do componente "Animated Beam" (dillionverma, 21st.dev) para as cores
 * da TruckBem: trilho navy fixo e pulso verde percorrendo o caminho.
 */
export function Beam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  delay = 0,
  duration = 3.4,
  reverse = false,
  active = true,
}: {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  delay?: number;
  duration?: number;
  reverse?: boolean;
  active?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!container || !from || !to) return;
      const box = container.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      setSize({ width: box.width, height: box.height });
      const startX = a.left - box.left + a.width / 2;
      const startY = a.top - box.top + a.height / 2;
      const endX = b.left - box.left + b.width / 2;
      const endY = b.top - box.top + b.height / 2;
      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 - curvature;
      setPath(`M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`);
    };
    update();
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  const coords = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"] };

  return (
    <svg
      className="pointer-events-none absolute top-0 left-0 transform-gpu"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      fill="none"
      aria-hidden
    >
      <motion.path
        d={path}
        stroke="#cbe60f"
        strokeWidth={1.4}
        strokeOpacity={0.28}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={active ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : delay, ease: [0.19, 0.86, 0.31, 1] }}
      />
      {!reduce && active && (
        <>
          <path d={path} stroke={`url(#${id})`} strokeWidth={2.6} strokeLinecap="round" />
          <defs>
            <motion.linearGradient
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{ x1: coords.x1, x2: coords.x2, y1: ["0%", "0%"], y2: ["0%", "0%"] }}
              transition={{ delay: delay + 0.6, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity }}
            >
              <stop stopColor="#cbe60f" stopOpacity="0" />
              <stop stopColor="#cbe60f" />
              <stop offset="32.5%" stopColor="#dcec8a" />
              <stop offset="100%" stopColor="#cbe60f" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}
