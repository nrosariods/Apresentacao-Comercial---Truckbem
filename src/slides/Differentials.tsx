import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { asset } from "../lib/asset";
import { storyIndex } from "../lib/gsap";
import { EASE, Reveal } from "../lib/motion";
import { Stage } from "../components/Stage";
import type { SlideProps } from "./types";

const DIFFERENTIALS = [
  {
    n: "01",
    title: "Entendimento",
    line: "Diagnóstico Prévio — Imersão total nos gargalos, janelas e sazonalidade antes de qualquer proposta.",
    image: "media/entendimento.webp",
  },
  {
    n: "02",
    title: "Adequação",
    line: "Engenharia Sob Medida — A malha e os recursos ajustam-se ao seu negócio, sem engessamento.",
    image: "media/adequacao.jpg",
  },
  {
    n: "03",
    title: "Proximidade",
    line: "Gestão Dedicada e Presente — Atendimento próximo, ágil e canais diretos sem burocracia.",
    image: "media/proximidade.png",
  },
  {
    n: "04",
    title: "Controle",
    line: "Visibilidade em Tempo Real — Acompanhamento ponta a ponta da carga com tecnologia e mitigação de riscos.",
    image: "media/controle.webp",
  },
  {
    n: "05",
    title: "Capilaridade",
    line: "Atendimento Regional Estratégico — Frota própria, agregados e parceiros homologados em rotas críticas.",
    image: "media/capilaridade.jpg",
  },
  {
    n: "06",
    title: "Flexibilidade",
    line: "Resposta a Picos de Demanda — Capacidade elástica de absorção de volume sem atrasos no SLA.",
    image: "media/flexibilidade.webp",
  },
  {
    n: "07",
    title: "Responsabilidade",
    line: "Segurança Jurídica e Operacional — Rigor absoluto no cumprimento de leis, gestão de riscos e integridade.",
    image: "media/responsabilidade.jpg",
  },
] as const;

export function Differentials({ active, progress }: SlideProps) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const current = hover ?? storyIndex(progress, DIFFERENTIALS.length);
  const item = DIFFERENTIALS[current];

  return (
    <Stage tone="light" bleed>
      <div className="grid h-full min-h-0 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Esquerda: imagem do item ativo */}
        <div className="relative min-h-[28vh] overflow-hidden bg-navy lg:min-h-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={`${item.n}-${item.image}`}
              src={asset(item.image)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-paper/0 lg:bg-gradient-to-l lg:from-paper lg:via-paper/25 lg:to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/50 to-transparent lg:hidden" />
        </div>

        {/* Direita: lista interativa */}
        <div className="flex min-h-0 flex-col justify-center bg-paper px-[var(--pad-x)] pt-[var(--pad-top)] pr-[calc(var(--pad-x)+1.4rem)] pb-[var(--pad-bot)]">
          <Reveal active={active} i={0}>
            <p className="kicker text-muted">Diferenciais</p>
          </Reveal>
          <Reveal active={active} i={1} className="mt-3">
            <h2 className="h-slide text-navy">O que diferencia nossa operação.</h2>
          </Reveal>

          <ul className="mt-5 space-y-0.5">
            {DIFFERENTIALS.map((diff, index) => {
              const on = index === current;
              return (
                <li key={diff.n}>
                  <button
                    type="button"
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(index)}
                    onBlur={() => setHover(null)}
                    onClick={() => setHover(index)}
                    className="group flex w-full items-baseline gap-3 py-[0.35rem] text-left"
                  >
                    <span
                      className={`shrink-0 font-display text-[clamp(0.75rem,0.9vw,0.9rem)] font-bold tabular-nums transition-colors duration-300 ${
                        on ? "text-green" : "text-navy/30"
                      }`}
                    >
                      {diff.n}
                    </span>
                    <span className="inline-block min-w-0 max-w-full">
                      <span
                        className={`block font-display text-[clamp(1.2rem,1.9vw,2rem)] leading-none font-extrabold tracking-[-0.02em] transition-transform duration-300 ${
                          on ? "translate-x-1.5 text-navy" : "text-navy/35 group-hover:text-navy/70"
                        }`}
                      >
                        {diff.title}
                      </span>
                      <span
                        className={`mt-1 block h-[2px] bg-green transition-all duration-300 ${
                          on ? "w-full" : "w-0"
                        }`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            <motion.p
              key={item.n}
              className="mt-4 max-w-[40ch] text-sm leading-relaxed text-muted"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              {item.line}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}
