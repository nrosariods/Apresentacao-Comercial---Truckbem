import type { LucideIcon } from "lucide-react";
import { Reveal } from "../../lib/motion";

export type StepItem = {
  title: string;
  description?: string;
  icon: LucideIcon;
  phase?: string;
};

/** Cabeçalho no padrão Aurora: Manrope + Inter. */
export function AuroraHeading({
  kicker,
  title,
  subtitle,
  active,
  tone = "dark",
  subtitleNowrap = false,
  subtitleClassName = "",
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  active: boolean;
  tone?: "dark" | "light";
  subtitleNowrap?: boolean;
  subtitleClassName?: string;
}) {
  const sub = tone === "dark" ? "text-on-dark/70" : "text-muted";
  const titleColor = tone === "dark" ? "text-white" : "text-navy";

  return (
    <header>
      <Reveal active={active} i={0}>
        <p className="kicker font-sans tracking-[0.16em] text-[11.5px] font-semibold uppercase">
          <span className={tone === "dark" ? "text-on-dark" : "text-muted"}>{kicker}</span>
        </p>
      </Reveal>
      <Reveal active={active} i={1} className="mt-3">
        <h2 className={`h-slide ${titleColor}`}>{title}</h2>
      </Reveal>
      {subtitle ? (
        <Reveal active={active} i={2} className={`mt-3 ${subtitleNowrap ? "max-w-full overflow-x-auto" : "max-w-[52rem]"}`}>
          <p
            className={`lede text-left font-sans ${sub} ${subtitleNowrap ? "whitespace-nowrap" : ""} ${subtitleClassName}`.trim()}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}

function StepCard({
  index,
  step,
  active,
  delay,
  tone,
}: {
  index: number;
  step: StepItem;
  active: boolean;
  delay: number;
  tone: "dark" | "light";
}) {
  const Icon = step.icon;
  const num = String(index + 1).padStart(2, "0");
  const dark = tone === "dark";

  return (
    <Reveal active={active} i={delay} className="step relative z-[1] flex h-full min-w-0 flex-1 flex-col">
      <div className="step-top mb-[clamp(0.75rem,2vh,1.5rem)] flex justify-center">
        <span
          className={`step-num grid place-items-center rounded-full border-[1.6px] border-green/40 font-display text-[12.5px] font-extrabold text-green transition-transform duration-300 ${
            dark ? "bg-navy shadow-[0_0_0_6px_#001b3a]" : "bg-paper shadow-[0_0_0_6px_#f6f8fb]"
          }`}
          style={{ width: "clamp(38px,4vw,52px)", height: "clamp(38px,4vw,52px)" }}
        >
          {num}
        </span>
      </div>
      <article
        className={`step-card flex min-h-[140px] flex-1 flex-col rounded-2xl border p-[clamp(0.85rem,2.4vh,1.6rem)_clamp(0.8rem,1.4vw,1.35rem)] transition-all duration-300 ${
          dark
            ? "border-white/15 bg-white/[0.055] hover:border-green/45 hover:bg-white/10"
            : "border-navy/15 bg-white hover:border-green/50"
        }`}
      >
        <Icon className={`mb-2.5 h-[22px] w-[22px] ${dark ? "text-green" : "text-navy"}`} strokeWidth={1.75} aria-hidden />
        {step.phase ? (
          <p className="mb-1.5 font-sans text-[clamp(9px,0.7vw,11px)] font-bold tracking-[0.12em] text-green uppercase">
            {step.phase}
          </p>
        ) : null}
        <h3 className={`font-display text-[clamp(13px,1.15vw,1.35rem)] leading-snug font-bold tracking-[-0.02em] ${dark ? "text-white" : "text-navy"}`}>
          {step.title}
        </h3>
        {step.description ? (
          <p className={`mt-2 font-sans text-[clamp(11.5px,0.88vw,0.95rem)] leading-snug ${dark ? "text-on-dark/70" : "text-muted"}`}>
            {step.description}
          </p>
        ) : null}
      </article>
    </Reveal>
  );
}

/**
 * Fluxograma no padrão Aurora: rail + números circulares + step cards.
 */
export function StepFlow({
  steps,
  active,
  className = "",
  startDelay = 3,
  layout = "row",
  tone = "dark",
}: {
  steps: StepItem[];
  active: boolean;
  className?: string;
  startDelay?: number;
  layout?: "row" | "grid";
  tone?: "dark" | "light";
}) {
  const cols =
    layout === "grid"
      ? "grid grid-cols-2 gap-3 md:grid-cols-4"
      : steps.length <= 4
        ? "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4"
        : steps.length === 5
          ? "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5"
          : "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6";

  return (
    <ol className={`steps relative ${cols} ${className}`.trim()}>
      {layout === "row" && steps.length >= 3 ? (
        <div
          className={`rail pointer-events-none absolute top-[clamp(19px,2vw,26px)] right-[10%] left-[10%] z-0 hidden h-0.5 rounded-sm md:block ${
            tone === "dark" ? "bg-white/15" : "bg-navy/15"
          }`}
          aria-hidden
        >
          <i
            className={`absolute inset-0 origin-left rounded-sm bg-green transition-transform duration-[1.6s] ${
              active ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
      ) : null}

      {steps.map((step, index) => (
        <li key={`${step.title}-${index}`} className="flex h-full min-h-0 min-w-0 flex-col">
          <StepCard index={index} step={step} active={active} delay={startDelay + index} tone={tone} />
        </li>
      ))}
    </ol>
  );
}
