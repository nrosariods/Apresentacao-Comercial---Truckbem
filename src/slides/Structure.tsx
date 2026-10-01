import {
  Boxes,
  Building2,
  Check,
  Clock3,
  Layers,
  MapPin,
  Route,
  Warehouse,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Stage } from "../components/Stage";
import { AuroraHeading } from "../components/ui/step-flow";
import { asset } from "../lib/asset";
import { EASE, Reveal } from "../lib/motion";
import type { SlideProps } from "./types";

type UnitCard = {
  image: string;
  alt: string;
  badge: string;
  BadgeIcon: typeof Building2;
  place: string;
  region: string;
  duties: string[];
  meta: { label: string; Icon: typeof Clock3; highlight?: boolean }[];
};

const UNITS: UnitCard[] = [
  {
    image: "media/escritorio.jpg",
    alt: "Escritório administrativo TruckBem em Santana de Parnaíba",
    badge: "Escritório administrativo",
    BadgeIcon: Building2,
    place: "Santana de Parnaíba",
    region: "São Paulo — SP",
    duties: ["Financeiro", "Torre de Controle", "Operação", "Gestão administrativa"],
    meta: [{ label: "Seg a sex · 08h às 18h", Icon: Clock3 }],
  },
  {
    image: "media/galpao.jpg",
    alt: "Centro operacional TruckBem em Itapevi",
    badge: "Centro operacional",
    BadgeIcon: Warehouse,
    place: "Itapevi",
    region: "São Paulo — SP",
    duties: ["Recebimento de cargas", "Separação e Picking", "Expedição", "Apoio operacional"],
    meta: [
      { label: "3.500 m² de área operacional", Icon: Layers, highlight: true },
      { label: "3.000+ posições-palete", Icon: Boxes, highlight: true },
    ],
  },
];

function UnitCardView({
  unit,
  active,
  delay,
}: {
  unit: UnitCard;
  active: boolean;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const BadgeIcon = unit.BadgeIcon;

  return (
    <Reveal active={active} i={delay} className="min-h-0">
      <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/[0.045] shadow-[0_24px_60px_-36px_rgba(0,0,0,0.65)] backdrop-blur-[12px]">
        <div className="relative h-[clamp(96px,15vh,180px)] shrink-0 overflow-hidden">
          <motion.img
            src={asset(unit.image)}
            alt={unit.alt}
            className="h-full w-full object-cover saturate-[0.85] contrast-[1.03]"
            initial={reduce ? false : { scale: 1.06 }}
            animate={active ? { scale: 1 } : undefined}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/45 to-navy/90" />
          <span className="absolute bottom-3.5 left-4 z-[1] inline-flex items-center gap-2 font-sans text-[10.5px] font-bold tracking-[0.18em] text-green uppercase">
            <BadgeIcon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
            {unit.badge}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-[clamp(1rem,2vw,1.75rem)] pt-[clamp(1rem,2.4vh,1.6rem)] pb-[clamp(1rem,2vh,1.35rem)]">
          <h3 className="font-display text-[clamp(1.15rem,1.6vw,1.85rem)] leading-none font-extrabold tracking-[-0.03em] text-white">
            {unit.place}
            <span className="text-green">.</span>
          </h3>
          <p className="mt-2 flex items-center gap-1.5 font-sans text-[clamp(0.78rem,0.9vw,0.95rem)] text-on-dark/70">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-green" strokeWidth={1.8} aria-hidden />
            {unit.region}
          </p>

          <p className="mt-[clamp(0.9rem,2vh,1.35rem)] mb-2.5 font-sans text-[10px] font-bold tracking-[0.18em] text-on-dark/55 uppercase">
            Responsável por
          </p>

          <ul className="min-h-0 flex-1">
            {unit.duties.map((duty) => (
              <li
                key={duty}
                className="flex items-center gap-2.5 border-b border-white/10 py-[clamp(0.45rem,1.1vh,0.7rem)] font-sans text-[clamp(0.85rem,1vw,1.05rem)] text-white last:border-b-0"
              >
                <Check className="h-3.5 w-3.5 shrink-0 text-green" strokeWidth={2.4} aria-hidden />
                {duty}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {unit.meta.map(({ label, Icon, highlight }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-sans text-[10px] font-semibold tracking-[0.04em] uppercase ${
                  highlight
                    ? "border-green/35 bg-green/10 text-green"
                    : "border-white/15 bg-white/[0.06] text-on-dark/80"
                }`}
              >
                <Icon className="h-3 w-3 shrink-0" strokeWidth={1.8} aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Bridge({ active }: { active: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative hidden w-[clamp(3.5rem,6vw,6.5rem)] shrink-0 place-items-center md:grid" aria-hidden>
      <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-white/15">
        <motion.span
          className="absolute inset-0 origin-left bg-gradient-to-r from-transparent via-green to-transparent"
          initial={reduce ? false : { scaleX: 0 }}
          animate={active ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
        />
      </div>
      <Reveal active={active} i={5}>
        <div className="relative z-[2] grid size-[clamp(2.6rem,4vw,3.6rem)] place-items-center rounded-full border border-green/40 bg-[#001229] shadow-[0_0_0_8px_rgba(0,27,58,0.65),0_0_28px_rgba(203,230,15,0.18)]">
          <Route className="h-5 w-5 text-green" strokeWidth={1.8} aria-hidden />
        </div>
      </Reveal>
    </div>
  );
}

export function Structure({ active }: SlideProps) {
  return (
    <Stage tone="dark">
      <AuroraHeading
        active={active}
        kicker="Nossa estrutura"
        title="Estrutura física e administrativa integradas"
        subtitle="Escritório e centro operacional conectados na mesma gestão."
        subtitleNowrap
      />

      <div className="mt-[clamp(1rem,2.4vh,1.75rem)] grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-0 md:items-stretch">
        <UnitCardView unit={UNITS[0]} active={active} delay={3} />
        <Bridge active={active} />
        {/* Mobile connector */}
        <div className="relative flex h-10 items-center justify-center md:hidden" aria-hidden>
          <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/15" />
          <span className="relative z-[1] grid size-9 place-items-center rounded-full border border-green/40 bg-navy">
            <Route className="h-4 w-4 text-green" strokeWidth={1.8} />
          </span>
        </div>
        <UnitCardView unit={UNITS[1]} active={active} delay={4} />
      </div>
    </Stage>
  );
}
