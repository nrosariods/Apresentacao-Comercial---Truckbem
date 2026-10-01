import { AetherFlowHero } from "../components/ui/aether-flow-hero";
import type { SlideProps } from "./types";

/** Slide de abertura — capa institucional. */
export function Hero({ active }: SlideProps) {
  return (
    <section className="relative h-full w-full overflow-hidden" aria-label="Abertura">
      <AetherFlowHero
        active={active}
        title="Apresentação Comercial"
        tagline="Sua operação logística, sob controle."
        description="Transporte, distribuição e gestão logística para operações que precisam de proximidade, controle e flexibilidade."
      />
    </section>
  );
}
