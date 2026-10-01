import { motion, useReducedMotion } from "motion/react";
import { BrazilMap } from "../components/BrazilMap";
import { Stage } from "../components/Stage";
import { AuroraHeading } from "../components/ui/step-flow";
import { EASE, Reveal } from "../lib/motion";
import type { SlideProps } from "./types";

const ROWS = [
  { uf: "SP", place: "São Paulo — Capital", prazo: ["D+1", "D+2"] },
  { uf: "SP", place: "Interior de São Paulo", prazo: ["D+1", "D+5"] },
  { uf: "ES", place: "Espírito Santo", prazo: ["D+3", "D+5"] },
  { uf: "PR", place: "Paraná", prazo: ["D+4", "D+9"] },
  { uf: "SC", place: "Santa Catarina", prazo: ["D+4", "D+9"] },
  { uf: "RS", place: "Rio Grande do Sul", prazo: ["D+4", "D+9"] },
] as const;

export function LeadTimes({ active }: SlideProps) {
  const reduce = useReducedMotion();

  return (
    <Stage tone="dark">
      <AuroraHeading
        active={active}
        kicker="Lead time"
        title="Prazos previsíveis por região"
      />

      <div className="mt-[clamp(0.75rem,1.8vh,1.5rem)] grid min-h-0 flex-1 items-center gap-6 lg:grid-cols-[1.14fr_0.86fr] lg:gap-10">
        <div className="min-h-0">
          <div className="mb-2 hidden grid-cols-[1fr_auto] gap-4 px-[18px] sm:grid">
            <p className="font-display text-[10.5px] font-bold tracking-[0.2em] text-on-dark/55 uppercase">
              Região
            </p>
            <p className="text-right font-display text-[10.5px] font-bold tracking-[0.2em] text-on-dark/55 uppercase">
              Prazo de entrega
            </p>
          </div>

          <ul className="flex flex-col gap-1.5">
            {ROWS.map((row, index) => (
              <motion.li
                key={`${row.uf}-${row.place}`}
                className="group grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-[clamp(0.9rem,1.4vw,1.15rem)] py-[clamp(0.65rem,1.5vh,0.95rem)] transition-all duration-300 hover:translate-x-1 hover:border-green/40 hover:bg-white/[0.08] even:bg-white/[0.07]"
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : 0.15 + index * 0.06, ease: EASE }}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-green/30 bg-green/15 font-display text-[11.5px] font-extrabold text-green">
                    {row.uf}
                  </span>
                  <span className="truncate font-display text-[clamp(0.85rem,1.05vw,1.2rem)] font-bold tracking-[-0.02em] text-white">
                    {row.place}
                  </span>
                </div>
                <p className="whitespace-nowrap font-display text-[clamp(0.95rem,1.4vw,1.55rem)] font-extrabold tracking-[-0.01em] text-green">
                  {row.prazo[0]}
                  <span className="mx-1 text-[0.6em] font-semibold tracking-[0.06em] text-green/60">a</span>
                  {row.prazo[1]}
                </p>
              </motion.li>
            ))}
          </ul>

          <Reveal active={active} i={10} className="mt-3.5">
            <p className="max-w-[70ch] font-sans text-[clamp(0.72rem,0.85vw,0.88rem)] leading-relaxed text-on-dark/60">
              Os prazos podem sofrer ajustes conforme o destino, a programação de coleta e as particularidades
              operacionais de cada região.
            </p>
          </Reveal>
        </div>

        <Reveal active={active} i={4} className="hidden h-full min-h-[240px] lg:block">
          <div className="grid h-full max-h-[min(58vh,460px)] place-items-center">
            <BrazilMap active={active} scope="lead" />
          </div>
        </Reveal>
      </div>
    </Stage>
  );
}
