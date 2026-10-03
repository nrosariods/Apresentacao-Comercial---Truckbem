import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { asset } from "../lib/asset";
import { storyIndex } from "../lib/gsap";
import { EASE, Reveal } from "../lib/motion";
import { Stage } from "../components/Stage";
import type { SlideProps } from "./types";

const SOLUTIONS = [
  { title: "Transporte", line: "Origem e destino sob a mesma gestão.", image: "media/transporte.jpeg" },
  { title: "Distribuição", line: "Urbana e regional, no ritmo da operação.", image: "media/distribuicao.jpeg" },
  { title: "Transporte dedicado", line: "Recursos alinhados a uma operação.", image: "media/transporte-dedicado.jpeg" },
  { title: "Logística operacional", line: "Malha com parceiros. Gestão TruckBem.", image: "media/logistica_operacional.jpeg" },
  { title: "Operações sob medida", line: "O modelo nasce da necessidade do cliente.", image: "media/operacao-sob-medida.webp" },
];

export function Solutions({ active, progress }: SlideProps) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const current = hover ?? storyIndex(progress, SOLUTIONS.length);
  const item = SOLUTIONS[current];

  return (
    <Stage tone="light" bleed>
      <div className="grid h-full min-h-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[28vh] overflow-hidden lg:min-h-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={item.image}
              src={asset(item.image)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-paper/0 lg:bg-gradient-to-l lg:from-paper lg:via-paper/20 lg:to-transparent" />
        </div>
        <div className="flex min-h-0 flex-col justify-center px-[var(--pad-x)] pt-[var(--pad-top)] pr-[calc(var(--pad-x)+1.4rem)] pb-[var(--pad-bot)]">
          <Reveal active={active} i={0}>
            <p className="kicker text-muted">Soluções</p>
          </Reveal>
          <Reveal active={active} i={1} className="mt-3">
            <h2 className="h-slide text-navy">Uma operação. Diferentes necessidades.</h2>
          </Reveal>
          <ul className="mt-6 space-y-1">
            {SOLUTIONS.map((solution, index) => {
              const on = index === current;
              return (
                <li key={solution.title}>
                  <button
                    type="button"
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(index)}
                    onBlur={() => setHover(null)}
                    onClick={() => setHover(index)}
                    className="group w-full py-1 text-left"
                  >
                    <span className="inline-block max-w-full">
                      <span
                        className={`block font-display text-[clamp(1.45rem,2.3vw,2.35rem)] leading-none font-extrabold tracking-[-0.02em] transition-transform duration-300 ${
                          on ? "translate-x-2 text-navy" : "text-navy/35 group-hover:text-navy/70"
                        }`}
                      >
                        {solution.title}
                      </span>
                      <span
                        className={`mt-1 block h-[2px] bg-green transition-all duration-300 ${
                          on ? "w-full" : "w-0"
                        }`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 max-w-[36ch] text-sm text-muted">{item.line}</p>
        </div>
      </div>
    </Stage>
  );
}
