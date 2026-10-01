import { useReducedMotion } from "motion/react";
import { CONTACT } from "../data/slides";
import { asset } from "../lib/asset";
import { Reveal } from "../lib/motion";
import { BlurTitle } from "../components/ui/BlurTitle";
import { BorderBeam } from "../components/ui/BorderBeam";
import NeuralBackground from "../components/ui/flow-field-background";
import type { SlideProps } from "./types";

export function Close({ active }: SlideProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-full w-full overflow-hidden bg-navy text-white" aria-label="Encerramento">
      <div className="absolute inset-0 z-0">
        {active ? (
          <NeuralBackground
            className="h-full w-full"
            color="#cbe60f"
            background="#001b3a"
            trailOpacity={0.14}
            particleCount={reduce ? 180 : 420}
            speed={0.95}
          />
        ) : (
          <div className="h-full w-full bg-navy" />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#001327]/55 via-navy/45 to-navy/80" />

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-[var(--pad-x)] pt-[var(--pad-top)] pr-[calc(var(--pad-x)+1.5rem)] pb-[clamp(4.5rem,10vh,7rem)] text-center">
        <Reveal active={active} i={2}>
          <img
            src={asset("brand/52-logo-truckbem-on-dark.svg")}
            alt="TruckBem Transportes"
            className="mx-auto mb-8 h-[clamp(102px,16vh,192px)] w-auto max-w-[min(78vw,512px)] object-contain"
          />
        </Reveal>
        <div className="mx-auto max-w-full overflow-x-auto text-center">
          <BlurTitle
            as="h2"
            className="h-hero text-[clamp(28px,4.2vw,72px)] whitespace-nowrap"
            active={active}
            nowrap
            text="Vamos entender a sua operação?"
          />
        </div>
        <Reveal active={active} i={4} className="mt-5">
          <p className="lede mx-auto text-on-dark">
            Conte para a TruckBem o que sua operação precisa. A partir daí, estruturamos o modelo adequado.
          </p>
        </Reveal>
        <Reveal active={active} i={5} className="mt-7">
          <a
            href={CONTACT.whatsapp}
            className="pointer-events-auto relative inline-flex overflow-hidden bg-green px-6 py-3 font-display text-lg font-bold tracking-[-0.02em] text-navy"
          >
            Falar com a TruckBem
            <BorderBeam active={active && !reduce} />
          </a>
        </Reveal>
        <Reveal active={active} i={6} className="mt-6">
          <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-on-dark">
            <a className="pointer-events-auto" href={CONTACT.phoneHref}>
              {CONTACT.phoneLabel}
            </a>
            <a className="pointer-events-auto" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <a className="pointer-events-auto" href={CONTACT.site}>
              {CONTACT.siteLabel}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
