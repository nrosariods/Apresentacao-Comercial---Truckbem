import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BellRing,
  MessageSquare,
  Radar,
  Share2,
  Target,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Stage } from "../components/Stage";
import { AuroraHeading } from "../components/ui/step-flow";
import { EASE } from "../lib/motion";
import type { SlideProps } from "./types";

type BentoCard = {
  n: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className: string;
};

const PILLARS: BentoCard[] = [
  {
    n: "01",
    title: "Planejamento",
    description: "Recursos e janelas alinhados à operação.",
    icon: Target,
    className: "md:col-span-4 md:row-span-1",
  },
  {
    n: "02",
    title: "Monitoramento",
    description: "Acompanhamento contínuo das entregas.",
    icon: Radar,
    className: "md:col-span-3 md:row-span-1",
  },
  {
    n: "03",
    title: "Comunicação",
    description: "Cliente, frota e parceiros no mesmo fio.",
    icon: MessageSquare,
    className: "md:col-span-5 md:row-span-1",
  },
  {
    n: "04",
    title: "Ocorrências",
    description: "Tratativa centralizada e rastreável.",
    icon: BellRing,
    className: "md:col-span-3 md:row-span-1",
  },
  {
    n: "05",
    title: "Indicadores",
    description: "Leitura clara do nível de serviço.",
    icon: Activity,
    className: "md:col-span-4 md:row-span-1",
  },
  {
    n: "06",
    title: "Tratativas",
    description: "Ajustes com um ponto de responsabilidade.",
    icon: Share2,
    className: "md:col-span-5 md:row-span-1",
  },
];

const glass =
  "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white/80 shadow-[0_16px_40px_-28px_rgba(1,49,107,0.28)] backdrop-blur-[10px]";

export function Control({ active }: SlideProps) {
  const reduce = useReducedMotion();

  return (
    <Stage tone="light">
      <AuroraHeading
        active={active}
        tone="light"
        kicker="Gestão"
        title="Um ponto central de responsabilidade."
        subtitle="A TruckBem concentra o controle da operação, do planejamento à tratativa"
        subtitleNowrap
      />

      <div className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-[1.35fr_1fr_1fr] md:gap-3">
        {/* Bloco principal */}
        <motion.article
          className={`${glass} p-[clamp(1.15rem,2.2vh,1.6rem)] md:col-span-5 md:row-span-2`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.45, delay: reduce ? 0 : 0.12, ease: EASE }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(203,230,15,0.14),transparent_55%)]" />
          <span className="relative inline-flex rounded-full border border-green/35 bg-green/10 px-2.5 py-1 font-sans text-[10px] font-bold tracking-[0.14em] text-navy uppercase">
            Controle central
          </span>
          <h3 className="relative mt-4 font-display text-[clamp(1.45rem,2.4vw,2.35rem)] leading-[1.08] font-extrabold tracking-[-0.035em] text-navy">
            Um hub. Toda a operação sob a mesma gestão.
          </h3>
          <p className="relative mt-3 max-w-[36ch] font-sans text-[clamp(0.85rem,1vw,1rem)] leading-relaxed text-muted">
            Do planejamento à tratativa, a TruckBem concentra o controle, com proximidade, rastreabilidade e
            decisão rápida.
          </p>
          <ul className="relative mt-5 space-y-2">
            {["Planejar com clareza", "Acompanhar em tempo real", "Tratar com um único ponto"].map((item) => (
              <li key={item} className="flex items-center gap-2.5 font-sans text-[clamp(0.78rem,0.9vw,0.92rem)] text-navy/80">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="relative mt-auto pt-6 font-sans text-[clamp(0.75rem,0.88vw,0.9rem)] leading-snug font-medium text-navy/70">
            Cliente, coleta, frota, motorista, parceiro, CD e entrega sob a mesma gestão.
          </p>
        </motion.article>

        {/* Pilares de suporte */}
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.article
              key={pillar.n}
              className={`${glass} p-[clamp(0.9rem,1.6vh,1.15rem)] ${pillar.className}`}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.2 + index * 0.05, ease: EASE }}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-display text-[clamp(1.1rem,1.6vw,1.45rem)] leading-none font-extrabold tracking-[-0.04em] text-green">
                  {pillar.n}
                </span>
                <span className="grid size-8 place-items-center rounded-xl border border-navy/10 bg-paper">
                  <Icon className="h-3.5 w-3.5 text-navy" strokeWidth={1.8} aria-hidden />
                </span>
              </div>
              <h4 className="mt-3 font-display text-[clamp(0.95rem,1.15vw,1.2rem)] font-bold tracking-[-0.02em] text-navy">
                {pillar.title}
              </h4>
              <p className="mt-1.5 font-sans text-[clamp(0.72rem,0.85vw,0.88rem)] leading-snug text-muted">
                {pillar.description}
              </p>
            </motion.article>
          );
        })}
      </div>
    </Stage>
  );
}
