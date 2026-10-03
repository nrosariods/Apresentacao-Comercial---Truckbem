import {
  Building2,
  Headphones,
  Map,
  Navigation,
  Radio,
  Truck,
  UserRound,
  Warehouse,
} from "lucide-react";
import { Stage } from "../components/Stage";
import { AuroraHeading, StepFlow, type StepItem } from "../components/ui/step-flow";
import { Reveal } from "../lib/motion";
import type { SlideProps } from "./types";

const TRANSPORTADORA: StepItem[] = [
  { title: "Frota própria", description: "Recursos sob gestão direta.", icon: Truck },
  { title: "Agregados", description: "Capacidade complementar alinhada.", icon: UserRound },
  { title: "Parceiros regionais", description: "Capilaridade local homologada.", icon: Map },
  { title: "Centros de distribuição", description: "Pontos de consolidação e saída.", icon: Warehouse },
  { title: "Clientes", description: "Entrega com responsabilidade central.", icon: Building2 },
];

const MOTORISTA: StepItem[] = [
  { title: "Escala", description: "Programação conforme o volume do dia.", icon: Navigation },
  { title: "Roteiro", description: "Rotas definidas pela operação.", icon: Map },
  { title: "Acompanhamento", description: "Status e comunicação em tempo real.", icon: Radio },
  { title: "Suporte", description: "Torre de controle próxima da execução.", icon: Headphones },
];

export function Extended({ active }: SlideProps) {
  return (
    <Stage tone="dark">
      <AuroraHeading
        active={active}
        kicker="Malha estendida"
        title="Capacidade local com gestão integrada."
        subtitle="Parceiros regionais ampliam o atendimento sem tirar da TruckBem a responsabilidade pela gestão."
        subtitleNowrap
      />

      <div className="mt-5 flex min-h-0 flex-1 flex-col justify-center gap-6 lg:mt-6 lg:gap-8">
        <div>
          <Reveal active={active} i={3}>
            <p className="kicker text-on-dark">
              <span>Jornada da transportadora</span>
            </p>
          </Reveal>
          <div className="mt-4">
            <StepFlow active={active} steps={TRANSPORTADORA} startDelay={4} />
          </div>
        </div>
        <div>
          <Reveal active={active} i={9}>
            <p className="kicker text-on-dark">
              <span>Jornada do motorista</span>
            </p>
          </Reveal>
          <div className="mt-4">
            <StepFlow active={active} steps={MOTORISTA} startDelay={10} />
          </div>
        </div>
      </div>
    </Stage>
  );
}
