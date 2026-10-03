import { motion, useReducedMotion } from "motion/react";
import { Head } from "../components/Head";
import { Stage } from "../components/Stage";
import { asset } from "../lib/asset";
import { EASE, Reveal } from "../lib/motion";
import type { SlideProps } from "./types";

const METRICS = [
  {
    value: "+150",
    unit: "Veículos",
    label: "Total em operação",
    nowrap: true,
  },
  {
    value: "+10",
    unit: "Veículos",
    label: "Frota própria dedicada",
    nowrap: false,
  },
  {
    value: "+25",
    unit: "Veículos",
    label: "Agregados homologados",
    nowrap: false,
  },
] as const;

/** Destaques visuais com imagens fixas do projeto. */
const FEATURED = [
  {
    name: "Fiorino",
    role: "Last mile",
    image: "media/fiorino.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Van",
    role: "Urbano",
    image: "media/van.jpg",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Truck",
    role: "Maior volume",
    image: "media/truck.jpg",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    name: "3/4",
    role: "Transferência",
    image: "media/tres-quartos.jpg",
    span: "md:col-span-2 md:row-span-1",
  },
] as const;

/** Frota completa — todos os 8 tipos citados na interface. */
const FLEET_ROSTER = [
  { name: "Fiorino", role: "Last mile" },
  { name: "Van", role: "Urbano" },
  { name: "HR", role: "Fracionado" },
  { name: "VUC", role: "Urbano" },
  { name: "3/4", role: "Transferência" },
  { name: "Toco", role: "Transferência" },
  { name: "Truck", role: "Maior volume" },
  { name: "Carreta", role: "Maior volume" },
] as const;

export function Fleet({ active }: SlideProps) {
  const reduce = useReducedMotion();

  return (
    <Stage tone="light">
      <Head
        active={active}
        kicker="Recursos"
        title="Recursos dimensionados"
        accent="para cada operação."
        tone="light"
      />

      {/* Métricas SP — 1º card com label em linha única */}
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-[1.2fr_1fr_1fr] sm:gap-3">
        {METRICS.map((metric, index) => (
          <Reveal key={metric.label} active={active} i={2 + index}>
            <article className="flex h-full min-h-[5.5rem] flex-col justify-center rounded-2xl border border-navy/10 bg-white/80 px-[clamp(0.85rem,1.3vw,1.15rem)] py-[clamp(0.8rem,1.6vh,1.05rem)] shadow-[0_14px_36px_-28px_rgba(1,49,107,0.32)] backdrop-blur-[10px]">
              <p className="font-display text-[clamp(1.45rem,2.4vw,2.15rem)] leading-none font-extrabold tracking-[-0.04em] text-navy tabular-nums">
                {metric.value}
                <span className="ml-1.5 text-[0.42em] font-bold tracking-[-0.02em] text-navy/55">
                  {metric.unit}
                </span>
              </p>
              <p
                className={`mt-2 font-sans text-[clamp(0.7rem,0.82vw,0.86rem)] leading-snug text-muted ${
                  metric.nowrap ? "whitespace-nowrap" : "max-w-[22ch]"
                }`}
              >
                {metric.label}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Bento grid assimétrico — imagens fixas */}
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-2.5 md:grid-cols-4 md:grid-rows-[1.15fr_0.85fr] md:gap-3">
        {FEATURED.map((item, index) => (
          <motion.article
            key={item.name}
            className={`group relative min-h-[120px] overflow-hidden rounded-2xl border border-navy/10 bg-navy shadow-[0_18px_40px_-28px_rgba(1,49,107,0.35)] ${item.span}`}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.2 + index * 0.06, ease: EASE }}
          >
            <img
              src={asset(item.image)}
              alt={`${item.name} — frota TruckBem em São Paulo`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3.5">
              <p className="font-display text-[clamp(1.05rem,1.5vw,1.45rem)] leading-none font-extrabold tracking-[-0.02em] text-white">
                {item.name}
              </p>
              <p className="mt-1.5 font-sans text-[10.5px] font-semibold tracking-[0.12em] text-green uppercase">
                {item.role}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Frota completa — 8 tipos citados */}
      <Reveal active={active} i={8} className="mt-3">
        <div className="rounded-2xl border border-navy/10 bg-white/70 px-3 py-3 backdrop-blur-[8px] sm:px-4">
          <p className="mb-2.5 font-sans text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
            Frota completa · São Paulo
          </p>
          <ul className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {FLEET_ROSTER.map((item, index) => (
              <motion.li
                key={item.name}
                className="rounded-xl border border-navy/8 bg-paper/80 px-1.5 py-2 text-center"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: reduce ? 0 : 0.35 + index * 0.03, ease: EASE }}
              >
                <span className="block font-display text-[clamp(0.75rem,0.95vw,0.95rem)] leading-none font-bold tracking-[-0.02em] text-navy">
                  {item.name}
                </span>
                <span className="mt-1 block font-sans text-[9px] tracking-[0.06em] text-muted uppercase">
                  {item.role}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Stage>
  );
}
