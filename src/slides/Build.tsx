import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Layers3,
  Radar,
  RefreshCw,
  Route,
  Truck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Stage } from "../components/Stage";
import { AuroraHeading } from "../components/ui/step-flow";
import { EASE } from "../lib/motion";
import type { SlideProps } from "./types";

const glass =
  "group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[12px] transition-colors duration-300 hover:border-green/40";

function BentoShell({
  active,
  delay,
  className,
  children,
}: {
  active: boolean;
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`${glass} ${className ?? ""}`.trim()}
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.5, delay: reduce ? 0 : delay, ease: EASE }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(203,230,15,0.08),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}

function StepBadge({ n }: { n: string }) {
  return (
    <span className="font-display text-[clamp(1.1rem,1.8vw,1.55rem)] leading-none font-extrabold tracking-[-0.04em] text-green">
      {n}
    </span>
  );
}

function IconChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-green/30 bg-green/10">
      <Icon className="h-4 w-4 text-green" strokeWidth={1.8} aria-hidden />
    </span>
  );
}

function BentoGrid({ active }: { active: boolean }) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-[1fr_0.85fr] md:gap-3.5">
      {/* Hero: 01 Diagnóstico & Engenharia */}
      <BentoShell
        active={active}
        delay={0.18}
        className="group flex flex-col p-[clamp(1.1rem,2.2vh,1.6rem)] md:col-span-5 md:row-span-2"
      >
        <div className="flex items-start justify-between gap-3">
          <StepBadge n="01" />
          <span className="rounded-full border border-green/35 bg-green/10 px-2.5 py-1 font-sans text-[9.5px] font-bold tracking-[0.14em] text-green uppercase">
            Início da jornada
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <IconChip icon={ClipboardList} />
          <IconChip icon={Route} />
        </div>

        <h3 className="mt-5 font-display text-[clamp(1.2rem,2vw,1.85rem)] leading-[1.15] font-extrabold tracking-[-0.03em] text-white">
          Diagnóstico & Engenharia de Rota
        </h3>
        <p className="mt-3 max-w-[36ch] font-sans text-[clamp(0.82rem,0.95vw,1rem)] leading-relaxed text-on-dark/70">
          Imersão profunda nos gargalos e na malha atual do cliente. Em seguida, dimensionamos prazos,
          janelas e recursos para desenhar o modelo operacional certo — antes de qualquer alocação.
        </p>

        <ul className="mt-5 space-y-2.5">
          {[
            "Leitura de volume, SLA e perfil de carga",
            "Mapeamento de malha, hubs e restrições",
            "Engenharia de rota com capacidade real",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 font-sans text-[clamp(0.75rem,0.88vw,0.9rem)] text-on-dark/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </BentoShell>

      {/* 02 Alocação — médio */}
      <BentoShell
        active={active}
        delay={0.28}
        className="group flex flex-col p-[clamp(1rem,1.8vh,1.25rem)] md:col-span-4 md:row-span-1"
      >
        <div className="flex items-start justify-between gap-2">
          <StepBadge n="02" />
          <IconChip icon={Layers3} />
        </div>
        <h3 className="mt-4 font-display text-[clamp(1rem,1.25vw,1.25rem)] font-bold tracking-[-0.02em] text-white">
          Alocação Ativa
        </h3>
        <p className="mt-2 font-sans text-[clamp(0.72rem,0.85vw,0.88rem)] leading-snug text-on-dark/70">
          Frota dedicada, agregados e parceiros homologados.
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {["Frota", "Agregados", "Parceiros"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/12 bg-white/[0.06] px-2 py-1 font-sans text-[9.5px] font-semibold tracking-[0.06em] text-on-dark/75 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </BentoShell>

      {/* 03 Execução — compacto */}
      <BentoShell
        active={active}
        delay={0.34}
        className="group flex flex-col p-[clamp(1rem,1.8vh,1.25rem)] md:col-span-3 md:row-span-1"
      >
        <div className="flex items-start justify-between gap-2">
          <StepBadge n="03" />
          <span className="rounded-full border border-green/30 bg-green/10 px-2 py-0.5 font-sans text-[9px] font-bold tracking-[0.12em] text-green uppercase">
            Ao vivo
          </span>
        </div>
        <div className="mt-3">
          <IconChip icon={Truck} />
        </div>
        <h3 className="mt-3 font-display text-[clamp(0.95rem,1.15vw,1.15rem)] font-bold tracking-[-0.02em] text-white">
          Execução em Campo
        </h3>
        <p className="mt-2 font-sans text-[clamp(0.7rem,0.82vw,0.85rem)] leading-snug text-on-dark/70">
          Transporte com visibilidade e controle total.
        </p>
      </BentoShell>

      {/* 04 Governança — com métrica */}
      <BentoShell
        active={active}
        delay={0.4}
        className="group flex flex-col p-[clamp(1rem,1.8vh,1.25rem)] md:col-span-4 md:row-span-1"
      >
        <div className="flex items-start justify-between gap-2">
          <StepBadge n="04" />
          <IconChip icon={Radar} />
        </div>
        <h3 className="mt-3 font-display text-[clamp(1rem,1.2vw,1.2rem)] font-bold tracking-[-0.02em] text-white">
          Governança & SLA
        </h3>
        <p className="mt-2 font-sans text-[clamp(0.72rem,0.85vw,0.88rem)] leading-snug text-on-dark/70">
          Monitoramento rigoroso de OTD e indicadores.
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-none font-extrabold tracking-[-0.04em] text-green">
              OTD
            </p>
            <p className="mt-1 font-sans text-[10px] tracking-[0.08em] text-on-dark/55 uppercase">
              Indicador central
            </p>
          </div>
          <div className="flex h-10 items-end gap-1" aria-hidden>
            {[16, 24, 18, 32, 26, 36].map((h, i) => (
              <span key={i} className="w-1.5 rounded-sm bg-green/70" style={{ height: h }} />
            ))}
          </div>
        </div>
      </BentoShell>

      {/* 05 Evolução */}
      <BentoShell
        active={active}
        delay={0.46}
        className="group flex flex-col p-[clamp(1rem,1.8vh,1.25rem)] md:col-span-3 md:row-span-1"
      >
        <div className="flex items-start justify-between gap-2">
          <StepBadge n="05" />
          <span className="rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 font-sans text-[9px] font-bold tracking-[0.12em] text-on-dark/70 uppercase">
            Contínuo
          </span>
        </div>
        <div className="mt-3">
          <IconChip icon={RefreshCw} />
        </div>
        <h3 className="mt-3 font-display text-[clamp(0.95rem,1.15vw,1.15rem)] font-bold tracking-[-0.02em] text-white">
          Evolução Contínua
        </h3>
        <p className="mt-2 font-sans text-[clamp(0.7rem,0.82vw,0.85rem)] leading-snug text-on-dark/70">
          Ajustes dinâmicos conforme o crescimento do negócio.
        </p>
        <div className="mt-auto pt-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-green/25 bg-green/10 px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" aria-hidden />
            <span className="font-sans text-[10px] font-semibold tracking-[0.08em] text-green uppercase">
              Ciclo ativo
            </span>
          </div>
        </div>
      </BentoShell>
    </div>
  );
}

export function Build({ active }: SlideProps) {
  return (
    <Stage tone="dark">
      <AuroraHeading
        active={active}
        kicker="Como estruturamos"
        title="Entender. Planejar. Estruturar. Operar."
        subtitle="Jornada de valor da operação, do diagnóstico à evolução contínua."
        subtitleNowrap
      />
      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <BentoGrid active={active} />
      </div>
    </Stage>
  );
}
