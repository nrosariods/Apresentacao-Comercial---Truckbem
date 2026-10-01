import { Eye, Target, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NumberTicker } from "../components/NumberTicker";
import { Stage } from "../components/Stage";
import { AuroraHeading } from "../components/ui/step-flow";
import { EASE, Reveal } from "../lib/motion";
import type { SlideProps } from "./types";

const KPIS = [
  { value: 92, suffix: "%", label: "Média semestral OTD", Icon: Target },
  { value: 95, suffix: "%", label: "Melhor mês", Icon: Zap },
  { value: 6, suffix: "", label: "Meses monitorados", Icon: Eye },
] as const;

const YEARS = [
  ["2024", "Início da operação"],
  ["2025", "Expansão regional"],
  ["2026", "Operação consolidada"],
] as const;

const MONTHS = [
  ["Jan", 93],
  ["Fev", 95],
  ["Mar", 87],
  ["Abr", 93],
  ["Mai", 95],
  ["Jun", 93],
] as const;

export function AuroraCase({ active }: SlideProps) {
  const reduce = useReducedMotion();

  return (
    <Stage tone="dark">
      <AuroraHeading
        active={active}
        kicker="Experiência"
        title="Experiência que pode ser medida."
        subtitle="OTD Mensal · Aurora 2026"
        subtitleClassName="!text-green font-display font-semibold tracking-[-0.02em]"
      />

      <div className="mt-[clamp(0.85rem,2vh,1.4rem)] grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3.5">
        {KPIS.map(({ value, suffix, label, Icon }, index) => (
          <Reveal key={label} active={active} i={3 + index}>
            <article className="flex items-center gap-4 overflow-hidden rounded-2xl border border-zinc-800/80 bg-white/[0.055] px-[clamp(1rem,1.5vw,1.35rem)] py-[clamp(0.95rem,2vh,1.25rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[12px]">
              <span className="grid size-[clamp(2.25rem,3vw,2.85rem)] shrink-0 place-items-center rounded-xl border border-green/30 bg-green/10">
                <Icon className="h-[18px] w-[18px] text-green" strokeWidth={1.8} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[clamp(1.7rem,2.8vw,2.85rem)] leading-none font-extrabold tracking-[-0.03em] text-white tabular-nums">
                  <NumberTicker value={value} active={active} suffix={suffix} />
                </p>
                <p className="mt-1.5 font-sans text-[clamp(0.72rem,0.88vw,0.9rem)] leading-snug text-on-dark/70">
                  {label}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-[clamp(0.9rem,2.2vh,1.5rem)] grid max-w-3xl grid-cols-3 gap-3 sm:gap-5">
        {YEARS.map(([year, label], index) => (
          <motion.div
            key={year}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.45, delay: reduce ? 0 : 0.35 + index * 0.09, ease: EASE }}
          >
            <p className="font-display text-[clamp(1.45rem,2.4vw,2.35rem)] leading-none font-extrabold tracking-[-0.03em] text-green">
              {year}
            </p>
            <p className="mt-2 font-sans text-[clamp(0.75rem,0.9vw,0.92rem)] leading-snug text-on-dark/70">
              {label}
            </p>
          </motion.div>
        ))}
      </div>

      <div
        className="mt-auto grid min-h-0 flex-1 grid-cols-3 items-end gap-2 pt-[clamp(0.85rem,2vh,1.35rem)] sm:grid-cols-6 sm:gap-3"
        aria-label="Gráfico de OTD mensal Aurora 2026"
      >
        {MONTHS.map(([month, value], index) => (
          <motion.div
            key={month}
            className="flex min-w-0 flex-col items-center gap-2"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.45, delay: reduce ? 0 : 0.4 + index * 0.06, ease: EASE }}
          >
            <p className="font-display text-[clamp(0.9rem,1.35vw,1.35rem)] font-extrabold tracking-[-0.02em] text-green tabular-nums">
              {value}%
            </p>
            <div className="flex h-[clamp(100px,20vh,190px)] w-full max-w-[72px] items-end overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.04] p-1.5">
              <motion.div
                className="w-full rounded-[10px] bg-gradient-to-b from-green to-green/50 shadow-[0_10px_24px_-14px_rgba(203,230,15,0.75)]"
                initial={reduce ? false : { height: 0 }}
                animate={active ? { height: `${value}%` } : { height: 0 }}
                transition={{ duration: 1, delay: reduce ? 0 : 0.45 + index * 0.07, ease: EASE }}
              />
            </div>
            <p className="font-sans text-[10px] font-bold tracking-[0.14em] text-on-dark/65 uppercase">
              {month}
            </p>
          </motion.div>
        ))}
      </div>

      <Reveal active={active} i={14} className="mt-3">
        <p className="max-w-[58ch] font-sans text-[clamp(0.75rem,0.88vw,0.9rem)] leading-relaxed text-on-dark/65">
          Indicadores exclusivos da operação Aurora Fine Brands. Não representam o resultado geral da TruckBem.
        </p>
      </Reveal>
    </Stage>
  );
}
