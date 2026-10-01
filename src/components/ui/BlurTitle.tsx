import { motion, useReducedMotion } from "motion/react";
import { STAGGER_SPRING } from "../../lib/motion";

export function BlurTitle({
  text,
  active,
  as: Tag = "h2",
  className = "h-slide",
  nowrap = false,
}: {
  text: string;
  active: boolean;
  as?: "h1" | "h2";
  className?: string;
  nowrap?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={`${className}${nowrap ? " whitespace-nowrap" : ""}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={`mr-[0.28em] inline-block last:mr-0${nowrap ? " whitespace-nowrap" : ""}`}
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96, filter: "blur(8px)" }}
          animate={
            active
              ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, y: 8, scale: 0.98, filter: "blur(4px)" }
          }
          transition={
            reduce
              ? { duration: 0.01 }
              : {
                  ...STAGGER_SPRING,
                  delay: 0.12 + index * 0.045,
                  filter: { duration: 0.45, delay: 0.12 + index * 0.045 },
                }
          }
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
