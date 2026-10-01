import { useEffect } from "react";
import { motion, usePresence, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { PANEL_SPRING } from "../lib/motion";

type TransitionPanelProps = {
  children: ReactNode;
  className?: string;
  onEnterComplete?: () => void;
};

/**
 * Painel de transição entre slides.
 * Fade + scale com spring physics — entrada levemente menor, saída levemente maior.
 */
export function TransitionPanel({ children, className = "", onEnterComplete }: TransitionPanelProps) {
  const reduce = useReducedMotion();
  const [isPresent] = usePresence();

  useEffect(() => {
    if (!reduce || !isPresent) return;
    onEnterComplete?.();
  }, [reduce, isPresent, onEnterComplete]);

  if (reduce) {
    return (
      <div className={`absolute inset-0 h-dvh w-full overflow-hidden ${className}`.trim()}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`absolute inset-0 h-dvh w-full origin-center overflow-hidden will-change-transform ${className}`.trim()}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={PANEL_SPRING}
      onAnimationComplete={() => {
        if (isPresent) onEnterComplete?.();
      }}
      style={{ backfaceVisibility: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
