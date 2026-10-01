import { motion, useReducedMotion } from "motion/react";

export type NetNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export function NetworkDiagram({
  center,
  nodes,
  active,
}: {
  center: string;
  nodes: NetNode[];
  active: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-full min-h-0 w-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {nodes.map((node, index) => (
          <motion.line
            key={node.id}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="#cbe60f"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.12 + index * 0.07 }}
          />
        ))}
      </svg>

      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-navy px-3 py-2 text-center">
        <p className="font-display text-[clamp(1.6rem,2.6vw,2.8rem)] leading-none font-extrabold tracking-[0.08em]">
          {center}
        </p>
      </div>

      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute z-10 max-w-[9rem] -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.2 + index * 0.07 }}
        >
          <span className="mx-auto mb-1.5 block h-1.5 w-1.5 bg-green" aria-hidden />
          <p className="font-display text-[clamp(0.95rem,1.3vw,1.35rem)] leading-none font-bold tracking-[0.06em] uppercase">
            {node.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
