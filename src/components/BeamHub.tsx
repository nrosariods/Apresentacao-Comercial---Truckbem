import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Beam } from "./Beam";
import { EASE } from "../lib/motion";

export type HubNode = {
  label: string;
  x: number;
  y: number;
};

export function ring(count: number, rx = 38, ry = 34, start = -90): HubNode[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = ((start + (360 / count) * index) * Math.PI) / 180;
    return { label: "", x: 50 + Math.cos(angle) * rx, y: 50 + Math.sin(angle) * ry };
  });
}

export function BeamHub({
  center,
  centerNote,
  nodes,
  active,
  tone = "dark",
}: {
  center: string;
  centerNote?: string;
  nodes: HubNode[];
  active: boolean;
  tone?: "dark" | "light";
}) {
  const reduce = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const spokes = useRef<(HTMLDivElement | null)[]>([]);
  const dark = tone === "dark";

  return (
    <div ref={container} className="relative h-full min-h-[240px] w-full">
      {nodes.map((node, index) => (
        <Beam
          key={`beam-${node.label}`}
          containerRef={container}
          fromRef={hub}
          toRef={{ current: spokes.current[index] ?? null }}
          curvature={index % 2 === 0 ? 18 : -18}
          delay={0.2 + index * 0.07}
          duration={3 + (index % 3) * 0.5}
          reverse={index % 2 === 1}
          active={active}
        />
      ))}

      <motion.div
        ref={hub}
        className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-[18px] px-5 py-3 text-center ${dark ? "card-dark backdrop-blur-[2px]" : "card-light"}`}
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <p className={`font-display text-[clamp(1.5rem,2.5vw,2.6rem)] leading-none font-extrabold tracking-[0.06em] ${dark ? "text-white" : "text-navy"}`}>
          {center}
        </p>
        {centerNote && (
          <p className={`mt-1 text-[10.5px] font-semibold tracking-[0.18em] uppercase ${dark ? "text-on-dark" : "text-muted"}`}>
            {centerNote}
          </p>
        )}
      </motion.div>

      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          ref={(element) => {
            spokes.current[index] = element;
          }}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.45, delay: reduce ? 0 : 0.28 + index * 0.06, ease: EASE }}
        >
          <span className={`pill ${dark ? "pill-dark" : "pill-light"}`}>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden />
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
