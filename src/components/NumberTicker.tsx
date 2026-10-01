import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function NumberTicker({
  value,
  active,
  suffix = "",
}: {
  value: number;
  active: boolean;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!active) {
      setCurrent(reduce ? value : 0);
      return;
    }
    if (reduce) {
      setCurrent(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduce, value]);

  return (
    <span className="tabular-nums">
      {current}
      {suffix}
    </span>
  );
}
