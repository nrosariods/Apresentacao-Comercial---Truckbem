import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { asset } from "../lib/asset";
import { EASE, Reveal } from "../lib/motion";
import { Stage } from "../components/Stage";
import { BlurTitle } from "../components/ui/BlurTitle";
import type { SlideProps } from "./types";

const WORDS = ["Estrutura", "Frota", "Malha", "Gestão"];

export function About({ active }: SlideProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    if (active) {
      const play = video.play();
      if (play && typeof play.catch === "function") play.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <Stage tone="light">
      <div className="grid min-h-0 flex-1 items-center gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="flex min-h-0 flex-col justify-center self-center pr-2">
          <Reveal active={active} i={0}>
            <p className="kicker text-muted">QUEM SOMOS</p>
          </Reveal>
          <div className="mt-4">
            <BlurTitle className="h-slide text-navy" active={active} text="Mais do que transportar." />
            <Reveal active={active} i={2} className="mt-3">
              <p className="font-display text-[clamp(1.25rem,2vw,1.95rem)] font-semibold tracking-[-0.02em] text-navy/75">
                Nós fazemos a operação acontecer.
              </p>
            </Reveal>
          </div>
          <Reveal active={active} i={3} className="mt-6">
            <p className="max-w-[42ch] text-justify font-sans text-[clamp(0.95rem,1.1vw,1.1rem)] leading-relaxed text-muted hyphens-auto">
              A TruckBem estrutura e acompanha operações de transporte e distribuição, combinando recursos próprios,
              agregados e parceiros regionais de acordo com a necessidade de cada cliente.
            </p>
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 items-center gap-x-5 gap-y-3 border-t border-navy/10 pt-5 sm:grid-cols-4">
            {WORDS.map((word, index) => (
              <motion.li
                key={word}
                className="flex items-center gap-2 font-display text-[clamp(1.15rem,1.7vw,1.65rem)] leading-none font-extrabold tracking-[-0.02em] text-navy"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={active ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.45, delay: reduce ? 0 : 0.4 + index * 0.1, ease: EASE }}
              >
                <span className="h-[2px] w-3.5 shrink-0 bg-green" aria-hidden />
                <span className="leading-none">{word}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <Reveal
          active={active}
          i={2}
          className="relative min-h-[200px] self-center overflow-hidden rounded-2xl border border-navy/10 bg-navy shadow-[0_22px_50px_-28px_rgba(1,49,107,0.35)] max-lg:aspect-[16/10] lg:min-h-[min(58vh,520px)] lg:max-h-[min(64vh,560px)]"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full bg-[#001b3a] object-cover"
            src={asset("media/hero.mp4")}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-label="Operação TruckBem em vídeo"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-navy/10" />
        </Reveal>
      </div>
    </Stage>
  );
}
