import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  PackageCheck,
  Route,
  Split,
  Truck,
} from "lucide-react";
import { Stage } from "../components/Stage";
import { AuroraHeading, StepFlow, type StepItem } from "../components/ui/step-flow";
import { Reveal } from "../lib/motion";
import type { SlideProps } from "./types";

const FLOWS: {
  n: string;
  title: string;
  line: string;
  steps: StepItem[];
}[] = [
  {
    n: "01",
    title: "Distribuição fracionada",
    line: "Da coleta à entrega, com separação por rota.",
    steps: [
      { title: "Coleta", description: "A carga entra na operação.", icon: PackageCheck },
      { title: "Transferência", description: "Consolidação até o centro operacional.", icon: Truck },
      { title: "Separação", description: "Conferência e organização por rota.", icon: Split },
      { title: "Distribuição", description: "Saída conforme o plano do dia.", icon: Route },
      { title: "Entrega", description: "Confirmação ao cliente final.", icon: CheckCircle2 },
    ],
  },
  {
    n: "02",
    title: "Distribuição dedicada",
    line: "Recursos exclusivos alinhados a uma operação.",
    steps: [
      { title: "Coleta", description: "Retirada sob a demanda do cliente.", icon: PackageCheck },
      { title: "Alocação", description: "Frota dedicada à operação.", icon: Building2 },
      { title: "Roteirização", description: "Plano exclusivo da rota.", icon: Route },
      { title: "Distribuição", description: "Execução com recurso dedicado.", icon: Truck },
      { title: "Entrega", description: "Confirmação ao destinatário.", icon: CheckCircle2 },
    ],
  },
];

export function Models({ active }: SlideProps) {
  const [current, setCurrent] = useState(0);
  const flow = FLOWS[current];

  return (
    <Stage tone="dark">
      <AuroraHeading
        active={active}
        kicker="Modelos de operação"
        title="Diferentes modelos. Uma só gestão."
        subtitle="Cada fluxo atende uma necessidade logística diferente, com a TruckBem no centro."
        subtitleNowrap
      />

      <div className="mt-5 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2">
        {FLOWS.map((item, index) => {
          const on = index === current;
          return (
            <Reveal key={item.n} active={active} i={3 + index} className="h-full min-h-0">
              <button
                type="button"
                onClick={() => setCurrent(index)}
                onFocus={() => setCurrent(index)}
                onMouseEnter={() => setCurrent(index)}
                className={`relative flex h-full min-h-[112px] w-full flex-col overflow-hidden rounded-2xl border p-4 text-left transition-colors lg:min-h-[148px] lg:p-5 ${
                  on
                    ? "border-green/40 bg-white/10"
                    : "border-white/15 bg-white/[0.055] hover:border-white/25"
                }`}
              >
                <span className={`font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-none font-extrabold tracking-[-0.04em] ${on ? "text-green" : "text-white/25"}`}>
                  {item.n}
                </span>
                <span className="mt-auto font-display text-[clamp(0.95rem,1.2vw,1.2rem)] font-bold tracking-[-0.02em] text-white">
                  {item.title}
                </span>
                <span className="mt-2 min-h-[2.5rem] font-sans text-xs leading-snug text-on-dark/70">{item.line}</span>
                <span className={`mt-3 block h-[3px] origin-left bg-green transition-transform ${on ? "scale-x-100" : "scale-x-0"}`} />
              </button>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-7 min-h-0 flex-1">
        <Reveal active={active} i={6} className="mb-3">
          <p className="kicker text-on-dark">
            <span>Fluxo · {flow.title}</span>
          </p>
        </Reveal>
        <StepFlow key={flow.n} active={active} steps={flow.steps} startDelay={7} />
      </div>
    </Stage>
  );
}
