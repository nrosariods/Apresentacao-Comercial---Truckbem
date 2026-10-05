import {
  Boxes,
  MapPinned,
  PackageCheck,
  Route,
  Truck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Stage } from "../components/Stage";
import { AuroraHeading } from "../components/ui/step-flow";
import { EASE } from "../lib/motion";
import type { SlideProps } from "./types";

const FLOW = [
  { title: "Coleta", line: "Entrada dos pedidos no hub.", icon: PackageCheck },
  { title: "Triagem", line: "Conferência e classificação.", icon: Boxes },
  { title: "Roteirização", line: "Organização por zona e janela.", icon: Route },
  { title: "Distribuição", line: "Saída em ondas de alto volume.", icon: Truck },
  { title: "Última milha", line: "Entrega ao consumidor final.", icon: MapPinned },
] as const;

const glass =
  "relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[12px]";

export function Regional({ active }: SlideProps) {
  const reduce = useReducedMotion();

  return (
    <Stage tone="dark">
      <AuroraHeading
        active={active}
        kicker="Praça operacional"
        title="São Paulo / Anju Express - Last Mile"
        subtitle="Base operacional para distribuição de encomendas no e-commerce."
        subtitleNowrap
      />

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-3 lg:mt-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-5">
        {/* Esquerda — destaque estratégico */}
        <motion.article
          className={`${glass} flex min-h-0 flex-col p-[clamp(1.2rem,2.4vh,1.75rem)]`}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.15, ease: EASE }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(203,230,15,0.12),transparent_55%)]" />

          <div className="relative flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-green/35 bg-green/10 px-2.5 py-1 font-sans text-[10px] font-bold tracking-[0.16em] text-green uppercase">
              Operação dedicada ao e-commerce
            </span>
            <span className="rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.12em] text-on-dark/70 uppercase">
              Anju Express
            </span>
          </div>

          <h3 className="relative mt-5 font-display text-[clamp(1.6rem,2.8vw,2.75rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-white">
            São Paulo
            <span className="text-green"> - </span>
            SP
          </h3>
          <p className="relative mt-2 font-sans text-[clamp(0.85rem,1vw,1rem)] text-on-dark/70">
            Last mile de alto volume para marketplaces.
          </p>

          <div className="relative mt-[clamp(1.4rem,3vh,2.2rem)]">
            <p className="font-display text-[clamp(3.2rem,7vw,6.2rem)] leading-none font-extrabold tracking-[-0.05em] text-green tabular-nums">
              3.000+
            </p>
            <p className="mt-2 font-display text-[clamp(1.05rem,1.5vw,1.45rem)] font-bold tracking-[-0.02em] text-white">
              pacotes por dia
            </p>
            <p className="mt-2 max-w-[42ch] font-sans text-[clamp(0.8rem,0.95vw,0.95rem)] leading-relaxed text-on-dark/65">
              Operação de distribuição para grandes marketplaces, com atendimento a Shopee, Temu e Shein.
            </p>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-5">
            {["Shopee", "Temu", "Shein"].map((brand, index) => (
              <span key={brand} className="flex items-center gap-3">
                {index > 0 ? <span className="text-green/50" aria-hidden>•</span> : null}
                <span className="font-display text-[clamp(0.95rem,1.2vw,1.2rem)] font-bold tracking-[-0.02em] text-white">
                  {brand}
                </span>
              </span>
            ))}
          </div>

          <p className="relative mt-auto pt-6 max-w-[48ch] font-sans text-[clamp(0.78rem,0.9vw,0.92rem)] leading-relaxed text-on-dark/60">
            Uma operação estruturada para alto volume diário, com foco na distribuição rápida e organizada de
            pedidos até o consumidor final.
          </p>
        </motion.article>

        {/* Direita — fluxo operacional */}
        <motion.aside
          className={`${glass} flex min-h-0 flex-col p-[clamp(1.1rem,2vh,1.45rem)]`}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.28, ease: EASE }}
        >
          <p className="font-sans text-[10.5px] font-semibold tracking-[0.18em] text-on-dark/55 uppercase">
            Fluxo operacional
          </p>
          <p className="mt-1.5 font-display text-[clamp(1.05rem,1.4vw,1.35rem)] font-bold tracking-[-0.02em] text-white">
            Da coleta à última milha
          </p>

          <ol className="relative mt-6 flex min-h-0 flex-1 flex-col justify-between gap-1">
            <div
              className="pointer-events-none absolute top-3 bottom-3 left-[15px] w-px bg-gradient-to-b from-green/50 via-white/15 to-green/35"
              aria-hidden
            />

            {FLOW.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  className="relative flex items-start gap-3.5 pl-0"
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={active ? { opacity: 1, x: 0 } : { opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduce ? 0 : 0.4 + index * 0.08,
                    ease: EASE,
                  }}
                >
                  <span className="relative z-[1] grid size-[30px] shrink-0 place-items-center rounded-full border border-green/40 bg-[#001229] shadow-[0_0_0_4px_rgba(0,27,58,0.85)]">
                    <Icon className="h-3.5 w-3.5 text-green" strokeWidth={1.8} aria-hidden />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-[11px] font-extrabold text-green tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-display text-[clamp(0.95rem,1.15vw,1.15rem)] font-bold tracking-[-0.02em] text-white">
                        {step.title}
                      </h4>
                    </div>
                    <p className="mt-0.5 font-sans text-[clamp(0.72rem,0.85vw,0.88rem)] leading-snug text-on-dark/65">
                      {step.line}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </motion.aside>
      </div>
    </Stage>
  );
}
