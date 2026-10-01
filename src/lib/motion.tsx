import { motion, useReducedMotion, type Transition } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.19, 0.86, 0.31, 1] as const;

/** Spring elástico para troca de slides (fade + scale). */
export const PANEL_SPRING: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 26,
  mass: 0.85,
};

/** Spring mais curto para stagger interno. */
export const STAGGER_SPRING: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 28,
  mass: 0.7,
};

const STAGGER_STEP = 0.07;
const STAGGER_BASE = 0.1;

/**
 * Cascata elástica dos blocos internos quando o slide fica ativo.
 */
export function Reveal({
  active,
  i = 0,
  className,
  children,
  y = 22,
}: {
  active: boolean;
  i?: number;
  className?: string;
  children: ReactNode;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const delay = reduce ? 0 : STAGGER_BASE + i * STAGGER_STEP;

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, scale: 0.98 }}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: Math.min(y, 12), scale: 0.99 }
      }
      transition={
        reduce
          ? { duration: 0.01 }
          : {
              ...STAGGER_SPRING,
              delay,
              opacity: { ...STAGGER_SPRING, delay, stiffness: 300 },
            }
      }
    >
      {children}
    </motion.div>
  );
}
