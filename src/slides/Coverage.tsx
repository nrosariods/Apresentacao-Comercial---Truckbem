import { Reveal } from "../lib/motion";
import { BrazilMap } from "../components/BrazilMap";
import { Stage } from "../components/Stage";
import { BlurTitle } from "../components/ui/BlurTitle";
import type { SlideProps } from "./types";

const STATES = [
  ["SP", "São Paulo", "Operação e gestão"],
  ["GO", "Goiás", "Anápolis — last mile"],
  ["ES", "Espírito Santo", "Distribuição"],
  ["PR", "Paraná", "Parceiros regionais"],
  ["SC", "Santa Catarina", "Parceiros regionais"],
  ["RS", "Rio Grande do Sul", "Parceiros regionais"],
];

export function Coverage({ active }: SlideProps) {
  return (
    <Stage tone="dark">
      <div className="grid min-h-0 flex-1 items-center gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <Reveal active={active} i={0}>
            <p className="kicker text-on-dark">Cobertura</p>
          </Reveal>
          <div className="mt-4">
            <BlurTitle active={active} text="Uma operação conectada ao Sul e Sudeste." />
          </div>
          <Reveal active={active} i={2} className="mt-6">
            <ul className="space-y-3">
              {STATES.map(([uf, name, role]) => (
                <li key={uf} className="grid grid-cols-[2.2rem_1fr] items-baseline gap-3">
                  <span className="font-display text-xl font-extrabold text-green">{uf}</span>
                  <span>
                    <span className="block font-display text-[clamp(1.05rem,1.4vw,1.35rem)] leading-none font-bold tracking-[-0.02em]">
                      {name}
                    </span>
                    <span className="mt-1 block text-sm text-on-dark">{role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="h-[min(64vh,700px)] min-h-0">
          <BrazilMap active={active} scope="coverage" />
        </div>
      </div>
    </Stage>
  );
}
