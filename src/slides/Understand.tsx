import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  MapPinned,
  Package,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Stage } from "../components/Stage";
import { AuroraHeading } from "../components/ui/step-flow";
import { Reveal } from "../lib/motion";
import type { SlideProps } from "./types";

type Pillar = {
  id: string;
  n: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const PILLARS: Pillar[] = [
  {
    id: "volume",
    n: "01",
    title: "Volume & Sazonalidade",
    description: "Picos, constância e capacidade",
    icon: Package,
  },
  {
    id: "malha",
    n: "02",
    title: "Malha & Rotas",
    description: "Distribuição geográfica e capilaridade",
    icon: MapPinned,
  },
  {
    id: "janelas",
    n: "03",
    title: "Janelas & SLA",
    description: "Rigor de horários e compromissos",
    icon: CalendarClock,
  },
  {
    id: "carga",
    n: "04",
    title: "Perfil da Carga",
    description: "Exigências e gerenciamento de risco",
    icon: ClipboardList,
  },
  {
    id: "homologacao",
    n: "05",
    title: "Homologação & Fricção",
    description: "Velocidade de liberação e cadastro",
    icon: BadgeCheck,
  },
  {
    id: "embarcador",
    n: "06",
    title: "Exigências do Embarcador",
    description: "Padrões do cliente final",
    icon: ShieldCheck,
  },
  {
    id: "processo",
    n: "07",
    title: "Processo & Gargalos",
    description: "Identificação de falhas operacionais",
    icon: AlertTriangle,
  },
  {
    id: "servico",
    n: "08",
    title: "Nível de Serviço",
    description: "KPIs e assertividade de entrega",
    icon: Activity,
  },
];

const CX = 50;
const CY = 50;
const RX = 38;
const RY = 36;

function polar(index: number, total: number) {
  const angle = ((-90 + (360 / total) * index) * Math.PI) / 180;
  return {
    x: CX + RX * Math.cos(angle),
    y: CY + RY * Math.sin(angle),
  };
}

/** Curva orgânica do hub até o nó (coordenadas viewBox 0–100). */
function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const bend = 7.5;
  const ox = (-dy / len) * bend;
  const oy = (dx / len) * bend;
  return `M ${x1} ${y1} Q ${mx + ox} ${my + oy} ${x2} ${y2}`;
}

function MindMap({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  const nodes = useMemo(
    () =>
      PILLARS.map((pillar, index) => {
        const pos = polar(index, PILLARS.length);
        return {
          ...pillar,
          ...pos,
          path: curvePath(CX, CY, pos.x, pos.y),
        };
      }),
    [],
  );

  return (
    <div
      className="relative mx-auto h-full min-h-[320px] w-full max-w-[1100px]"
      onMouseLeave={() => setHovered(null)}
    >
      {/* SVG connections */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="mind-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbe60f" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#cbe60f" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#cbe60f" stopOpacity="0.25" />
          </linearGradient>
          <filter id="mind-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nodes.map((node, index) => {
          const lit = hovered === node.id || hovered === "hub";
          const dimmed = hovered !== null && !lit;
          return (
            <motion.path
              key={node.id}
              d={node.path}
              fill="none"
              stroke={lit ? "#cbe60f" : "url(#mind-line)"}
              strokeWidth={lit ? 0.55 : 0.35}
              strokeDasharray={lit ? "0" : "1.2 1.6"}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              filter={lit ? "url(#mind-glow)" : undefined}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={
                active
                  ? {
                      pathLength: 1,
                      opacity: dimmed ? 0.18 : lit ? 1 : 0.55,
                    }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: reduce ? 0.01 : 0.75, delay: reduce ? 0 : 0.35 + index * 0.06 },
                opacity: { duration: 0.25 },
              }}
            />
          );
        })}
      </svg>

      {/* Hub central */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-20 w-[min(42vw,220px)] -translate-x-1/2 -translate-y-1/2"
        initial={reduce ? false : { opacity: 0, scale: 0.82 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: reduce ? 0.01 : 0.55, ease: [0.19, 0.86, 0.31, 1] }}
        onMouseEnter={() => setHovered("hub")}
      >
        <div
          className={`relative overflow-hidden rounded-[1.35rem] border px-4 py-5 text-center shadow-[0_0_0_1px_rgba(203,230,15,0.12),0_22px_50px_-24px_rgba(203,230,15,0.35)] backdrop-blur-md transition-all duration-300 ${
            hovered === "hub" || hovered === null
              ? "border-green/45 bg-[#001327]/75"
              : "border-zinc-800/80 bg-[#001327]/55"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,230,15,0.16),transparent_65%)]" />
          <p className="relative font-sans text-[9.5px] font-semibold tracking-[0.2em] text-green uppercase">
            Diagnóstico
          </p>
          <h3 className="relative mt-1.5 font-display text-[clamp(1rem,1.7vw,1.35rem)] leading-tight font-extrabold tracking-[-0.03em] text-white">
            Dinâmica Operacional
          </h3>
          <p className="relative mt-1.5 font-sans text-[10.5px] leading-snug text-on-dark/65">
            8 pilares de leitura
          </p>
        </div>
      </motion.div>

      {/* Nós periféricos */}
      {nodes.map((node, index) => {
        const Icon = node.icon;
        const lit = hovered === node.id;
        const dimmed = hovered !== null && hovered !== "hub" && !lit;

        return (
          <motion.button
            key={node.id}
            type="button"
            className="absolute z-10 w-[min(28vw,168px)] -translate-x-1/2 -translate-y-1/2 text-left"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={reduce ? false : { opacity: 0, scale: 0.86, y: 10 }}
            animate={
              active
                ? {
                    opacity: dimmed ? 0.35 : 1,
                    scale: lit ? 1.04 : 1,
                    y: 0,
                  }
                : { opacity: 0, scale: 0.9, y: 8 }
            }
            transition={{
              duration: reduce ? 0.01 : 0.5,
              delay: reduce ? 0 : 0.28 + index * 0.07,
              ease: [0.19, 0.86, 0.31, 1],
            }}
            onMouseEnter={() => setHovered(node.id)}
            onFocus={() => setHovered(node.id)}
            onBlur={() => setHovered(null)}
          >
            <article
              className={`relative overflow-hidden rounded-2xl border p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[10px] transition-colors duration-300 ${
                lit
                  ? "border-green/50 bg-white/[0.12] shadow-[0_0_0_1px_rgba(203,230,15,0.2),0_16px_36px_-22px_rgba(203,230,15,0.45)]"
                  : "border-zinc-800/80 bg-white/[0.055] hover:border-green/40 hover:bg-white/[0.09]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-display text-[1.05rem] leading-none font-extrabold tracking-[-0.04em] text-green">
                  {node.n}
                </span>
                <Icon className="h-3.5 w-3.5 shrink-0 text-green/75" strokeWidth={1.75} aria-hidden />
              </div>
              <h4 className="mt-2 font-display text-[clamp(0.72rem,0.95vw,0.92rem)] leading-snug font-bold tracking-[-0.02em] text-white">
                {node.title}
              </h4>
              <p className="mt-1 hidden font-sans text-[10px] leading-snug text-on-dark/65 xl:block">
                {node.description}
              </p>
            </article>
          </motion.button>
        );
      })}
    </div>
  );
}

function CompactList({ active }: { active: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {PILLARS.map((pillar, index) => {
        const Icon = pillar.icon;
        return (
          <Reveal key={pillar.id} active={active} i={4 + index}>
            <article className="rounded-2xl border border-zinc-800/80 bg-white/[0.055] p-3 backdrop-blur-[8px]">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-extrabold text-green">{pillar.n}</span>
                <Icon className="h-3.5 w-3.5 text-green/75" strokeWidth={1.75} aria-hidden />
              </div>
              <h4 className="mt-2 font-display text-[0.85rem] leading-snug font-bold text-white">{pillar.title}</h4>
              <p className="mt-1 font-sans text-[10.5px] leading-snug text-on-dark/65">{pillar.description}</p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Understand({ active }: SlideProps) {
  return (
    <Stage tone="dark">
      <AuroraHeading
        active={active}
        kicker="Entender a operação"
        title="Cada operação tem uma dinâmica diferente."
        subtitle="A solução logística deve se adaptar à operação, e não o contrário."
        subtitleNowrap
      />

      <div className="mt-3 min-h-0 flex-1">
        <div className="hidden h-full md:block">
          <MindMap active={active} />
        </div>
        <div className="md:hidden">
          <CompactList active={active} />
        </div>
      </div>

      <Reveal active={active} i={14} className="mt-2">
        <p className="lede whitespace-nowrap text-green">Leitura da operação antes de qualquer proposta.</p>
      </Reveal>
    </Stage>
  );
}
